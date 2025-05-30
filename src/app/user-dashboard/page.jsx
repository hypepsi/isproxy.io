'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// 首页风格常量
const CARD = 'card bg-base-100 shadow-lg hover:shadow-xl border border-base-300/30 flex flex-col rounded-xl transition-all duration-300 transform hover:scale-105';
const BTN_PRIMARY = 'btn btn-primary btn-md rounded-lg px-6 text-sm font-semibold shadow-md hover:shadow-primary/30 transition-all hover:scale-105';
const BTN_OUTLINE = 'btn btn-outline btn-md rounded-lg px-6 text-sm font-medium hover:bg-base-content hover:text-base-100 transition-all hover:scale-105';
const BTN_GHOST = 'btn btn-ghost btn-md rounded-lg px-6 text-sm font-medium transition-all hover:scale-105';
const NAV_BTN = 'py-2.5 px-4 rounded-md flex items-center gap-3 text-base font-medium transition-all duration-150 hover:bg-primary/10 hover:text-primary hover:scale-105 active:scale-95';
const NAV_BTN_DANGER = 'py-2.5 px-4 rounded-md flex items-center gap-3 text-base font-medium transition-all duration-150 hover:bg-error/10 text-error hover:scale-105 active:scale-95';
const MAIN = "container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-6 lg:py-10";
const TITLE = "text-3xl lg:text-4xl font-bold mb-7 text-base-content";
const CARD_TITLE = "text-xl font-semibold text-base-content/90 mb-2";
const SMALL = "text-sm";
const STANDARD = "text-base";

// 图标
const ProfileIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 21a8.25 8.25 0 0115 0"/></svg>
);
const ProxiesIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v6.75M9.75 3h4.5a2.25 2.25 0 012.25 2.25v13.5A2.25 2.25 0 0114.25 21h-4.5A2.25 2.25 0 017.5 18.75V5.25A2.25 2.25 0 019.75 3z" /></svg>
);
const BillingIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3m0 0c0 1.657 1.343 3 3 3m-3-3h6m6 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
);
const ApiKeysIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 7a4 4 0 11-8 0 4 4 0 018 0zm6 10.5a3.5 3.5 0 00-7 0v.75a1.25 1.25 0 001.25 1.25h4.5A1.25 1.25 0 0021 18.25v-.75z"/></svg>
);
const LogoutIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m0 0L21 12m0 0l-3.75-3m3.75 3H9" /></svg>
);
const HomeIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6"/></svg>
);
const PlusCircleIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
);
const ConstructionIcon = () => (
  <svg className="w-12 h-12 mx-auto text-base-content/30 mb-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 2.25v2.25M12 21.75v-2.25m9-7.5h-2.25m-15 0H2.25m15.364-6.364l-1.591 1.591m-8.486 8.486l-1.591 1.591m12.728 0l-1.591-1.591m-8.486-8.486l-1.591-1.591" /></svg>
);

export default function UserDashboardPage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [isSectionVisible, setIsSectionVisible] = useState(true);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCurrentUserData = async () => {
      setIsLoading(true);
      setError('');
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('用户未登录，请先登录。');
        setIsLoading(false);
        return;
      }
      try {
        const response = await fetch('/api/user/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          setError('认证失败或令牌已过期，请重新登录。');
          localStorage.removeItem('authToken');
          return;
        }
        const data = await response.json();
        if (data.user) setUserData(data.user);
        else setError('API未返回有效的用户信息');
      } catch (err) {
        setError(err.message || '获取用户信息时发生客户端错误。');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCurrentUserData();
  }, []);

  const handleSectionChange = (newSection) => {
    setIsSectionVisible(false);
    setTimeout(() => {
      setActiveSection(newSection);
      setIsSectionVisible(true);
      const drawerCheckbox = document.getElementById('user-dashboard-drawer');
      if (drawerCheckbox && window.innerWidth < 1024) drawerCheckbox.checked = false;
    }, 200);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUserData(null);
    window.location.href = '/login';
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return 'N/A';
    try {
      const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateTimeString).toLocaleString(undefined, options);
    } catch (e) { return dateTimeString; }
  };

  const getIPv4 = (ip) => {
    if (!ip) return '首次登录';
    const match = ip.match(/(\d{1,3}\.){3}\d{1,3}/);
    return match ? match[0] : ip;
  };

  if (isLoading) {
    return (
      <div className="bg-base-100 min-h-screen flex items-center justify-center font-sans antialiased text-base-content">
        <span className="loading loading-lg loading-spinner text-primary text-base">加载中...</span>
      </div>
    );
  }
  if (error && !userData) {
    return (
      <div className="bg-base-100 min-h-screen flex flex-col items-center justify-center font-sans antialiased text-base-content p-6">
        <p className="text-error mb-4 text-2xl font-bold">{error}</p>
        <Link href="/login" className={BTN_PRIMARY}>前往登录</Link>
      </div>
    );
  }
  if (!userData && !isLoading) {
    return (
      <div className="bg-base-100 min-h-screen flex flex-col items-center justify-center font-sans antialiased text-base-content p-6">
        <p className="text-warning mb-4 text-2xl font-bold">无法加载用户信息，请尝试重新登录。</p>
        <Link href="/login" className={BTN_PRIMARY}>前往登录</Link>
      </div>
    );
  }

  // section内容
  const renderSection = () => {
    const baseAnim = "transition-opacity duration-300 ease-in-out";
    switch (activeSection) {
      case 'overview':
        return (
          <div key="overview" className={baseAnim + " " + (isSectionVisible ? "opacity-100" : "opacity-0")}>
            <h2 className={TITLE}>账户概览</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-8">
              {/* 剩余点数卡片 */}
              <div className={CARD + " animate-fadein"} style={{ animationDelay: '0.1s' }}>
                <div className="card-body p-6">
                  <h3 className={CARD_TITLE}>剩余点数</h3>
                  <div className="text-4xl font-bold text-primary">{(parseFloat(userData?.credit) || 0).toFixed(2)}</div>
                  <p className={SMALL + " text-base-content/70 mt-0.5 mb-3"}>Credits</p>
                  <p className={SMALL + " text-base-content/70 leading-relaxed mb-4"}>当前可用点数，可用于购买或续费代理服务。</p>
                  <div className="card-actions pt-3">
                    <button className={BTN_PRIMARY + " w-full"}>立即充值</button>
                  </div>
                </div>
              </div>
              {/* 欢迎/账户信息卡片 */}
              <div className={CARD + " animate-fadein"} style={{ animationDelay: '0.2s' }}>
                <div className="card-body p-6">
                  <h3 className={CARD_TITLE}>欢迎回来, {userData?.username || '用户'}!</h3>
                  <p className={SMALL + " text-base-content/70"}><span className="font-medium">邮箱:</span> {userData?.email || 'N/A'}</p>
                  <p className={SMALL + " text-base-content/70"}><span className="font-medium">上次登录IP:</span> {getIPv4(userData?.last_login_ip)}</p>
                  <p className={SMALL + " text-base-content/70 mb-3"}><span className="font-medium">上次登录时间:</span> {formatDateTime(userData?.last_login_at)}</p>
                  <div className="card-actions pt-2">
                    <button className={BTN_GHOST + " text-primary w-full"} onClick={() => handleSectionChange('profile')}>账户设置</button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-base-content mb-4">快速操作</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button className={BTN_PRIMARY + " flex items-center gap-2"} onClick={() => handleSectionChange('proxies')}>
                  <ProxiesIcon /> 管理我的代理
                </button>
                <button className={BTN_OUTLINE + " flex items-center gap-2"}>
                  <PlusCircleIcon /> 购买新代理
                </button>
              </div>
            </div>
          </div>
        );
      case 'proxies':
        return (
          <div key="proxies" className={baseAnim + " " + (isSectionVisible ? "opacity-100" : "opacity-0")}>
            <div className="flex justify-between items-center mb-6">
              <h2 className={TITLE}>我的代理服务</h2>
              <button className={BTN_PRIMARY + " flex items-center gap-2"}>
                <PlusCircleIcon /> 购买新代理
              </button>
            </div>
            <div className="overflow-x-auto bg-base-100 rounded-xl shadow-lg border border-base-300/20">
              <table className="table table-zebra w-full">
                <thead>
                <tr>
                  <th className={SMALL + " font-semibold text-left"}>ID/备注</th>
                  <th className={SMALL + " font-semibold text-left"}>类型</th>
                  <th className={SMALL + " font-semibold text-left"}>地区</th>
                  <th className={SMALL + " font-semibold text-left"}>用量</th>
                  <th className={SMALL + " font-semibold text-left"}>到期时间</th>
                  <th className={SMALL + " font-semibold text-center"}>状态</th>
                  <th className={SMALL + " font-semibold text-center"}>操作</th>
                </tr>
                </thead>
                <tbody>
                {/* TODO: 对接真实数据 */}
                <tr>
                  <td className={SMALL}>res123</td>
                  <td className={SMALL}>住宅代理</td>
                  <td className={SMALL}>美国 - 纽约</td>
                  <td className={SMALL}>15.5 GB / 50 GB</td>
                  <td className={SMALL}>2025-06-30</td>
                  <td className="text-center"><span className="badge badge-success badge-sm w-14">有效</span></td>
                  <td className="text-center">
                    <button className={BTN_GHOST + " text-primary btn-xs"}>详情</button>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div key="profile" className={baseAnim + " " + (isSectionVisible ? "opacity-100" : "opacity-0")}>
            <h2 className={TITLE + " mb-7"}>账户设置</h2>
            <div className={CARD}>
              <div className="card-body p-6">
                <h3 className={CARD_TITLE + " mb-3"}>个人信息</h3>
                <form className="space-y-4">
                  <div>
                    <label className="label pb-1"><span className={STANDARD + " font-medium"}>用户名</span></label>
                    <input type="text" defaultValue={userData?.username || ''} className="input input-bordered input-md w-full rounded-lg" />
                  </div>
                  <div>
                    <label className="label pb-1"><span className={STANDARD + " font-medium"}>邮箱 (不可修改)</span></label>
                    <input type="email" defaultValue={userData?.email || ''} className="input input-bordered input-md w-full rounded-lg bg-base-200/60 cursor-not-allowed" disabled />
                  </div>
                  <div className="pt-3">
                    <button type="submit" className={BTN_PRIMARY + " w-full"}>保存更改</button>
                  </div>
                </form>
                <div className="divider"></div>
                <h3 className={CARD_TITLE + " mb-3"}>修改密码</h3>
                <form className="space-y-4">
                  <input type="password" placeholder="当前密码" className="input input-bordered input-md w-full rounded-lg" />
                  <input type="password" placeholder="新密码 (6位以上)" className="input input-bordered input-md w-full rounded-lg" />
                  <input type="password" placeholder="确认新密码" className="input input-bordered input-md w-full rounded-lg" />
                  <div className="pt-3">
                    <button type="submit" className={BTN_PRIMARY + " w-full"}>更新密码</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
      case 'billing':
      case 'api_keys': {
        const title = activeSection === 'billing' ? '账单与充值' : 'API密钥管理';
        const description = activeSection === 'billing'
          ? '我们正在努力完善账单与充值功能。'
          : 'API密钥管理功能正在紧张开发中。';
        return (
          <div key={activeSection} className={baseAnim + " " + (isSectionVisible ? "opacity-100" : "opacity-0") + " text-center py-16"}>
            <ConstructionIcon />
            <h2 className={TITLE + " mt-4 mb-2"}>{title}</h2>
            <p className={STANDARD + " max-w-sm mx-auto text-base-content/70"}>{description}感谢您的耐心等待！</p>
          </div>
        );
      }
      default:
        return <div className={STANDARD + " py-10 text-center text-base-content/85"}>请从左侧选择一个菜单项。</div>;
    }
  };

  return (
    <div data-theme="corporate" className="bg-base-100 min-h-screen font-sans antialiased text-base-content selection:bg-primary selection:text-primary-content">
      {/* 顶部导航 */}
      <header className="navbar bg-base-100/90 backdrop-blur-md border-b border-base-300/40 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="navbar-start flex-shrink-0">
            <label htmlFor="user-dashboard-drawer" className="btn btn-ghost btn-sm lg:hidden p-1 mr-1.5 drawer-button">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7"></path></svg>
            </label>
            <a href="/" className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">isproxy.io</a>
          </div>
          <div className="navbar-end space-x-2 flex-shrink-0">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-sm rounded-md flex items-center px-2 py-1 h-auto hover:bg-base-300/20">
                <div className="avatar placeholder btn-xs mr-2 online">
                  <div className="bg-neutral-focus text-neutral-content rounded-full w-6 h-6 ring-1 ring-base-300 flex items-center justify-center">
                    <span className={SMALL}>{userData?.username ? userData.username.charAt(0).toUpperCase() : 'U'}</span>
                  </div>
                </div>
                <span className="hidden sm:inline text-base font-medium">{userData?.username || '我的账户'}</span>
                <svg className="w-4 h-4 ml-1.5 fill-current opacity-70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow-xl bg-base-100 rounded-lg w-56 border border-base-300/40 z-[1] text-base">
                <li>
                  <a className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-base-200/70" onClick={() => handleSectionChange('profile')}>
                    <ProfileIcon /> 账户设置
                  </a>
                </li>
                <li className="mt-1 px-1">
                  <button onClick={handleLogout} className="flex items-center gap-2 w-full py-2 px-3 rounded-md text-error hover:bg-error/10 font-normal">
                    <LogoutIcon /> 退出登录
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      {/* 主体区域 */}
      <div className="drawer lg:drawer-open flex-grow container mx-auto max-w-6xl mt-5 mb-5 lg:mt-6 lg:mb-6">
        <input id="user-dashboard-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col p-5 lg:p-6">
          {renderSection()}
        </div>
        {/* 侧边栏 */}
        <div className="drawer-side lg:rounded-xl lg:shadow-lg z-40 lg:z-auto lg:sticky lg:top-[calc(var(--navbar-height,64px)+1.5rem)] lg:max-h-[calc(100vh-var(--navbar-height,64px)-3rem-env(safe-area-inset-bottom))] lg:overflow-y-auto">
          <label htmlFor="user-dashboard-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 w-64 min-h-full text-base-content space-y-1.5">
            <li className="flex justify-center pt-1 pb-2">
              <span className="text-lg font-bold text-base-content/90 tracking-wide">导航菜单</span>
            </li>
            <li>
              <a className={NAV_BTN + (activeSection === 'overview' ? ' bg-primary/10 text-primary font-bold' : '')} onClick={() => handleSectionChange('overview')}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6"/></svg>
                账户概览
              </a>
            </li>
            <li>
              <a className={NAV_BTN + (activeSection === 'proxies' ? ' bg-primary/10 text-primary font-bold' : '')} onClick={() => handleSectionChange('proxies')}>
                <ProxiesIcon /> 我的代理
              </a>
            </li>
            <li>
              <a className={NAV_BTN + (activeSection === 'profile' ? ' bg-primary/10 text-primary font-bold' : '')} onClick={() => handleSectionChange('profile')}>
                <ProfileIcon /> 账户设置
              </a>
            </li>
            <li>
              <a className={NAV_BTN + (activeSection === 'billing' ? ' bg-primary/10 text-primary font-bold' : '')} onClick={() => handleSectionChange('billing')}>
                <BillingIcon /> 账单与充值
              </a>
            </li>
            <li>
              <a className={NAV_BTN + (activeSection === 'api_keys' ? ' bg-primary/10 text-primary font-bold' : '')} onClick={() => handleSectionChange('api_keys')}>
                <ApiKeysIcon /> API密钥
              </a>
            </li>
            <div className="divider my-2"></div>
            <li>
              <Link href="/" className={NAV_BTN + " " + "hover:bg-primary/10 hover:text-primary"}>
                <HomeIcon /> 返回首页
              </Link>
            </li>
            <li>
              <a onClick={handleLogout} className={NAV_BTN_DANGER}>
                <LogoutIcon /> 退出登录
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* 底部 */}
      <footer className="footer footer-center p-6 bg-base-200 text-base-content border-t border-base-300/40 mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <aside>
            <p className={SMALL + " text-base-content/75"}>© {new Date().getFullYear()} isproxy.io - 版权所有。</p>
          </aside>
        </div>
      </footer>
      {/* 动画效果样式 */}
      <style>{`
        .animate-fadein { animation: fadeInUp 0.5s both;}
        @keyframes fadeInUp {from { opacity:0; transform:translateY(24px);} to { opacity:1; transform:translateY(0);}}
      `}</style>
    </div>
  );
}