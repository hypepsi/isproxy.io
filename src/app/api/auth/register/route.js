// src/app/api/auth/register/route.js
import mysql from 'mysql2/promise'; // 使用 promise 版本的 mysql2
import bcrypt from 'bcryptjs';

// 数据库连接池 (推荐用于生产环境，能更有效地管理连接)
// 我们将在函数外部创建它，以便在多个请求之间复用
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
      connectionLimit: 10, // 根据您的服务器配置调整
      queueLimit: 0,
    });
  }
  return pool;
}

export async function POST(request) {
  try {
    const { username, email, password } = await request.json();

    // 1. 基本数据校验 (您可以根据需要添加更复杂的校验)
    if (!email || !password) {
      return new Response(JSON.stringify({ message: '邮箱和密码不能为空' }), {
        status: 400, // Bad Request
        headers: { 'Content-Type': 'application/json' },
      });
    }
    // 简单的邮箱格式校验
    if (!/\S+@\S+\.\S+/.test(email)) {
      return new Response(JSON.stringify({ message: '无效的邮箱格式' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    // 简单的密码长度校验
    if (password.length < 6) {
      return new Response(JSON.stringify({ message: '密码长度至少为6位' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 2. 获取 IP 地址
    // Next.js 中获取 IP 可能需要一些配置，这里提供一个基本尝试
    // 在 Vercel 等平台部署时，通常从 'x-forwarded-for' 获取
    const ip_address = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 
                       request.headers.get('x-real-ip') || 
                       request.socket?.remoteAddress || // 对于本地开发可能有效
                       request.ip; // 一些框架或中间件可能会添加这个

    // 3. 加密密码
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10');
    const password_hash = await bcrypt.hash(password, saltRounds);

    // 4. 连接数据库并插入用户数据
    const dbPool = getPool();
    const connection = await dbPool.getConnection(); // 从连接池获取一个连接

    try {
      // 检查邮箱是否已存在
      const [existingUsers] = await connection.execute(
        'SELECT id FROM users WHERE email = ?',
        [email]
      );

      if (existingUsers.length > 0) {
        return new Response(JSON.stringify({ message: '该邮箱已被注册' }), {
          status: 409, // Conflict
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // 插入新用户
      const [result] = await connection.execute(
        'INSERT INTO users (username, email, password_hash, ip_address) VALUES (?, ?, ?, ?)',
        [username || null, email, password_hash, ip_address || null] // 如果 username 为空，则插入 null
      );

      // 5. 返回成功响应
      return new Response(JSON.stringify({ message: '注册成功', userId: result.insertId }), {
        status: 201, // Created
        headers: { 'Content-Type': 'application/json' },
      });

    } catch (dbError) {
      console.error('数据库操作失败:', dbError);
      // 检查是否是唯一约束冲突（例如用户名，如果 username 也设置为 UNIQUE）
      if (dbError.code === 'ER_DUP_ENTRY') {
         return new Response(JSON.stringify({ message: '用户名或邮箱已存在' }), {
            status: 409, // Conflict
            headers: { 'Content-Type': 'application/json' },
         });
      }
      return new Response(JSON.stringify({ message: '注册过程中发生内部错误' }), {
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
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}