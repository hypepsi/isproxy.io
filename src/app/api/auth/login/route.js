// src/app/api/auth/login/route.js
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// 数据库连接池
let pool;
function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
}

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ message: '邮箱和密码不能为空' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const dbPool = getPool();
    const connection = await dbPool.getConnection();

    try {
      const [users] = await connection.execute(
        'SELECT id, email, password_hash, username FROM users WHERE email = ?',
        [email]
      );

      if (users.length === 0) {
        return new Response(JSON.stringify({ message: '邮箱或密码错误' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const user = users[0];
      const isPasswordMatch = await bcrypt.compare(password, user.password_hash);

      if (!isPasswordMatch) {
        return new Response(JSON.stringify({ message: '邮箱或密码错误' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // 登录成功，生成 JWT
      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          username: user.username,
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      // 获取当前IP地址和时间
      // 注意：在Vercel等平台，IP地址通常从 'x-forwarded-for' 获取
      // 对于本地开发，request.ip (如果可用) 或其他头部可能提供IP
      // Next.js App Router 中，可以直接从 request.headers 使用 get('x-forwarded-for')
      const currentIp = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
                        request.headers.get('x-real-ip') ||
                        // 对于Node.js的http模块，可能是 request.socket.remoteAddress
                        // 但在Next.js API路由中，上述头部更常见
                        'IP获取失败'; // 默认值或错误处理

      const currentLoginTime = new Date();

      // 更新用户的 last_login_ip 和 last_login_at
      try {
        await connection.execute(
          'UPDATE users SET last_login_ip = ?, last_login_at = ? WHERE id = ?',
          [currentIp, currentLoginTime, user.id]
        );
      } catch (updateError) {
        // 即便更新上次登录信息失败，也应该继续登录流程，但需要记录错误
        console.error('更新用户上次登录信息失败:', updateError);
      }

      return new Response(JSON.stringify({
        message: '登录成功',
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
        },
        token: token,
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });

    } catch (dbError) {
      console.error('数据库操作失败:', dbError);
      return new Response(JSON.stringify({ message: '登录过程中发生内部错误' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    } finally {
      if (connection) connection.release();
    }

  } catch (error) {
    console.error('请求处理失败:', error);
    if (error instanceof SyntaxError) {
        return new Response(JSON.stringify({ message: '无效的请求数据格式' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }
    return new Response(JSON.stringify({ message: '服务器内部错误' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
