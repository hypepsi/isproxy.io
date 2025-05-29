// src/app/api/auth/login/route.js
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // 导入 jsonwebtoken

// 数据库连接池 (与注册API共享或类似配置)
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

    // 1. 基本数据校验
    if (!email || !password) {
      return new Response(JSON.stringify({ message: '邮箱和密码不能为空' }), {
        status: 400, // Bad Request
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 2. 连接数据库并查询用户
    const dbPool = getPool();
    const connection = await dbPool.getConnection();

    try {
      const [users] = await connection.execute(
        'SELECT id, email, password_hash, username FROM users WHERE email = ?',
        [email]
      );

      if (users.length === 0) {
        return new Response(JSON.stringify({ message: '邮箱或密码错误' }), { // 注意：不要明确提示是邮箱不存在还是密码错误，以防信息泄露
          status: 401, // Unauthorized
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const user = users[0];

      // 3. 验证密码
      const isPasswordMatch = await bcrypt.compare(password, user.password_hash);

      if (!isPasswordMatch) {
        return new Response(JSON.stringify({ message: '邮箱或密码错误' }), {
          status: 401, // Unauthorized
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // 4. 登录成功, 生成 JWT token
      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          username: user.username,
        },
        process.env.JWT_SECRET, // 从环境变量中获取 JWT 密钥
        { expiresIn: '24h' } // Token 有效期，例如24小时
      );

      // 返回成功信息、用户信息（不含密码）和 token
      return new Response(JSON.stringify({
        message: '登录成功',
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
        },
        token: token // 在响应中包含 token
      }), {
        status: 200, // OK
        headers: { 'Content-Type': 'application/json' },
      });

    } catch (dbError) {
      console.error('数据库操作失败:', dbError);
      return new Response(JSON.stringify({ message: '登录过程中发生内部错误' }), {
        status: 500, // Internal Server Error
        headers: { 'Content-Type': 'application/json' },
      });
    } finally {
      if (connection) connection.release(); // 释放连接回连接池
    }

  } catch (error) {
    console.error('请求处理失败:', error);
    if (error instanceof SyntaxError) { // 通常是 request.json() 解析失败
        return new Response(JSON.stringify({ message: '无效的请求数据格式' }), {
            status: 400, // Bad Request
            headers: { 'Content-Type': 'application/json' },
        });
    }
    return new Response(JSON.stringify({ message: '服务器内部错误' }), {
      status: 500, // Internal Server Error
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
