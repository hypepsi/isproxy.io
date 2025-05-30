// src/app/api/user/me/route.js
import jwt from 'jsonwebtoken';
import mysql from 'mysql2/promise';

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

export async function GET(request) {
  try {
    // 1. 从请求头中获取 Authorization token
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ message: '未提供认证令牌 (No token provided)' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      return new Response(JSON.stringify({ message: '无效的令牌格式 (Invalid token format)' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const token = tokenParts[1];

    // 2. 验证JWT
    let decodedPayload;
    try {
      decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return new Response(JSON.stringify({ message: '令牌已过期 (Token expired)' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      console.error('JWT Verification Error:', err);
      return new Response(JSON.stringify({ message: '无效的令牌 (Invalid token)' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 3. Token有效，从数据库获取用户信息
    const dbPool = getPool();
    const connection = await dbPool.getConnection();
    try {
      // 在查询语句中添加 last_login_ip 和 last_login_at 字段
      const [users] = await connection.execute(
        'SELECT id, username, email, credit, last_login_ip, last_login_at, created_at FROM users WHERE id = ?',
        [decodedPayload.userId]
      );

      if (users.length === 0) {
        return new Response(JSON.stringify({ message: '用户未找到 (User not found)' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      const user = users[0];

      // 格式化 last_login_at (如果存在)
      // MySQL DATETIME 类型通常返回如 '2025-05-30T08:30:00.000Z' (UTC) 或数据库时区的时间
      // 前端可以根据需要自行格式化，这里直接返回数据库原始值或 null
      // 如果需要在此处格式化，可以使用 new Date(user.last_login_at).toLocaleString('zh-CN') 等

      return new Response(JSON.stringify({ user }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (dbError) {
      console.error('数据库操作失败:', dbError);
      return new Response(JSON.stringify({ message: '获取用户信息时发生内部错误' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    } finally {
      if (connection) connection.release();
    }

  } catch (error) {
    console.error('请求处理失败 (Outer Catch):', error);
    return new Response(JSON.stringify({ message: '服务器内部错误' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
