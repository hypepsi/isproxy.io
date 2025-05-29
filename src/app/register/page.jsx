'use client';
import Link from 'next/link';
import { useState } from 'react';

// Placeholder for a Logo component or simple text
const Logo = () => (
  <a href="/" className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
    isproxy.io
  </a>
);

// Placeholder for Social Media Icons if needed in footer
const SocialIconPlaceholder = ({ platform }) => (
    <div className="w-5 h-5 bg-base-content/20 rounded-full flex items-center justify-center text-xs text-base-content/70">
      {platform.charAt(0)}
    </div>
);

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    if (password !== confirmPassword) {
      setError('密码和确认密码不匹配');
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError('密码长度至少为6位');
      setLoading(false);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('无效的邮箱格式');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            username: username || undefined,
            email, 
            password 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `注册失败 (状态码: ${response.status})`);
      }
      
      setSuccessMessage(data.message || '注册成功！您可以尝试登录了。');
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-theme="corporate" className="bg-base-200 min-h-screen flex flex-col font-sans antialiased text-base-content selection:bg-primary selection:text-primary-content">
      <header className="navbar bg-base-100/90 backdrop-blur-md border-b border-base-300/40 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="navbar-start flex-shrink-0">
              <div className="dropdown">
                  <label tabIndex={0} className="btn btn-ghost btn-sm lg:hidden p-1 mr-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path></svg>
                  </label>
                  <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow-lg bg-base-100 rounded-lg w-52 border border-base-300/50">
                    <li><Link href="/" className="text-base py-2">首页</Link></li>
                    <li><Link href="/#products" className="text-base py-2">产品服务</Link></li>
                    <li><Link href="/pricing" className="text-base py-2">定价方案</Link></li>
                    <li><Link href="/docs" className="text-base py-2">帮助文档</Link></li>
                  </ul>
              </div>
              <Logo />
            </div>
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1 space-x-1">
                  <li><Link href="/" className="btn btn-ghost btn-sm text-sm font-medium">首页</Link></li>
                  <li><Link href="/#products" className="btn btn-ghost btn-sm text-sm font-medium">产品服务</Link></li>
                  <li><Link href="/pricing" className="btn btn-ghost btn-sm text-sm font-medium">定价方案</Link></li>
                  <li><Link href="/docs" className="btn btn-ghost btn-sm text-sm font-medium">帮助文档</Link></li>
              </ul>
            </div>
            <div className="navbar-end space-x-2 flex-shrink-0">
              <Link href="/login" className="btn btn-ghost btn-sm rounded-md text-sm font-medium">登录</Link>
              <Link href="/register" className="btn btn-primary btn-sm rounded-md text-sm font-medium shadow-sm hover:shadow-md transition-shadow">注册</Link>
            </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-10 lg:py-16 flex items-center justify-center">
        <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300/40 rounded-lg">
          <div className="card-body p-6 sm:p-8">
            <h1 className="text-2xl font-bold text-center mb-6 text-base-content">创建您的账户</h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label py-1.5"> {/* Adjusted label padding */}
                  {/* 修改：标签文字颜色加深，字号调整 */}
                  <span className="label-text text-sm font-medium text-base-content/90">用户名 (可选)</span> 
                </label>
                <input 
                  type="text" 
                  placeholder="例如: user123" 
                  className="input input-bordered input-sm w-full rounded-md"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div>
                <label className="label py-1.5">
                  {/* 修改：标签文字颜色加深，字号调整 */}
                  <span className="label-text text-sm font-medium text-base-content/90">邮箱地址</span>
                </label>
                <input 
                  type="email" 
                  placeholder="例如: your@email.com" 
                  className="input input-bordered input-sm w-full rounded-md" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="label py-1.5">
                  {/* 修改：标签文字颜色加深，字号调整 */}
                  <span className="label-text text-sm font-medium text-base-content/90">密码</span>
                </label>
                <input 
                  type="password" 
                  placeholder="请输入密码 (至少6位)" 
                  className="input input-bordered input-sm w-full rounded-md" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <label className="label py-1.5">
                  {/* 修改：标签文字颜色加深，字号调整 */}
                  <span className="label-text text-sm font-medium text-base-content/90">确认密码</span>
                </label>
                <input 
                  type="password" 
                  placeholder="请再次输入密码" 
                  className="input input-bordered input-sm w-full rounded-md" 
                  required 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              
              {/* 修改：提示信息样式调整 */}
              {error && <p className="text-sm font-semibold text-error text-center py-2">{error}</p>}
              {successMessage && <p className="text-sm font-semibold text-success text-center py-2">{successMessage}</p>}

              <div className="form-control pt-4">
                <button 
                  type="submit" 
                  className={`btn btn-primary btn-block btn-sm rounded-md ${loading ? 'loading' : ''}`} 
                  disabled={loading}
                >
                  {loading ? '处理中...' : '立即注册'}
                </button>
              </div>
            </form>

            <div className="text-center mt-6">
              <p className="text-sm text-base-content/70"> {/* 调整了这里的字号 */}
                已有账户? 
                <Link href="/login" className="link link-primary hover:link-secondary ml-1 font-medium">
                  立即登录
                </Link>
              </p>
            </div>
            
             <p className="text-xs text-base-content/60 text-center mt-8"> {/* 调整了这里的字号 */}
                注册即代表您同意我们的 
                <a href="/terms" className="link link-hover text-xs hover:text-primary">服务条款</a> 和 
                <a href="/privacy" className="link link-hover text-xs hover:text-primary">隐私政策</a>。
            </p>
          </div>
        </div>
      </main>

      <footer className="footer p-10 bg-base-200 text-base-content border-t border-base-300/40">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 px-4 sm:px-6 lg:px-8 max-w-6xl">
            <aside className="space-y-2.5 md:col-span-1 lg:col-span-1">
                <Logo />
                <p className="text-sm text-base-content/75 leading-relaxed">
                    专业的全球代理服务提供商，为您的业务提供可靠网络解决方案。
                </p>
                <div className="flex space-x-3.5 pt-1.5">
                    <a href="#" className="text-base-content/60 hover:text-primary transition-colors"><SocialIconPlaceholder platform="Gh" /></a>
                    <a href="#" className="text-base-content/60 hover:text-primary transition-colors"><SocialIconPlaceholder platform="Tw" /></a>
                    <a href="#" className="text-base-content/60 hover:text-primary transition-colors"><SocialIconPlaceholder platform="Fb" /></a>
                </div>
            </aside>
            <nav className="space-y-2">
                <h6 className="footer-title opacity-90 text-sm font-semibold">产品服务</h6> 
                <a className="link link-hover text-sm hover:text-primary py-1 block">住宅代理</a>
                <a className="link link-hover text-sm hover:text-primary py-1 block">ISP 代理</a>
                <a className="link link-hover text-sm hover:text-primary py-1 block">数据中心代理</a>
                <a className="link link-hover text-sm hover:text-primary py-1 block">价格方案</a>
            </nav>
            <nav className="space-y-2">
                <h6 className="footer-title opacity-90 text-sm font-semibold">公司信息</h6>
                <a className="link link-hover text-sm hover:text-primary py-1 block">关于我们</a>
                <a className="link link-hover text-sm hover:text-primary py-1 block">联系方式</a>
                <a className="link link-hover text-sm hover:text-primary py-1 block">博客资讯</a>
                <a className="link link-hover text-sm hover:text-primary py-1 block">加入我们</a>
            </nav>
            <nav className="space-y-2">
                <h6 className="footer-title opacity-90 text-sm font-semibold">法律与支持</h6>
                <a className="link link-hover text-sm hover:text-primary py-1 block">服务条款</a>
                <a className="link link-hover text-sm hover:text-primary py-1 block">隐私政策</a>
                <a className="link link-hover text-sm hover:text-primary py-1 block">帮助中心</a>
                <a className="link link-hover text-sm hover:text-primary py-1 block">API文档</a>
            </nav>
        </div>
      </footer>
       <footer className="footer footer-center p-4 bg-base-200 text-base-content border-t border-base-300/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <aside>
                <p className="text-sm text-base-content/75">© {new Date().getFullYear()} isproxy.io - 版权所有。邮箱: support@isproxy.io</p>
            </aside>
        </div>
      </footer>
    </div>
  );
}
