'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Logo 组件
const Logo = () => (
  <a href="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
    isproxy.io
  </a>
);

// 图标包裹组件
const IconWrapper = ({ children, className = "w-5 h-5" }) => <div className={className}>{children}</div>;

// 定义各种图标 (保持不变)
const OverviewIcon = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.25 2.25v3.75a2.25 2.25 0 01-2.25 2.25H2.25v-8.25zM12 15.75v3.75a2.25 2.25 0 002.25 2.25H18v-8.25h-3.86a2.25 2.25 0 00-2.25 2.25zM21.75 13.5h-3.86a2.25 2.25 0 00-2.25 2.25v3.75a2.25 2.25 0 002.25 2.25H21.75V13.5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M4.125 6.375A2.25 2.25 0 016.375 4.125h11.25c1.243 0 2.25 1.007 2.25 2.25v3.75c0 .412-.168.79-.468 1.075H4.593a2.248 2.248 0 01-1.075-.468V6.375z" /></svg></IconWrapper>;
const ProxiesIcon = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.056A7.5 7.5 0 0112 15c1.924 0 3.707.728 5.028 1.948m-5.028-1.948V4.5m0 10.5C8.111 16.056 4.5 15.688 4.5 12V7.5C4.5 5.015 7.875 3 12 3s7.5 2.015 7.5 4.5V12c0 3.688-3.611 4.056-7.5 4.500v0zM12 4.5V2.25m0 18V15m0-10.5v0" /></svg></IconWrapper>;
const ProfileIcon = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg></IconWrapper>;
const BillingIcon = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" /></svg></IconWrapper>;
const ApiKeysIcon = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" /></svg></IconWrapper>;
const LogoutIcon = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg></IconWrapper>;
const HomeIcon = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" /></svg></IconWrapper>;
const PlusCircleIcon = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></IconWrapper>;
const ConstructionIcon = () => <IconWrapper className="w-12 h-12 mx-auto text-base-content/30 mb-3"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.11v1.093c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.27.96-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.78.93l-.15.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.149-.894c-.07-.424-.384-.764-.78-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-.96.27-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.272.806.108-1.204-.166-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.11v-1.094c0-.55.398-1.019.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505-.78-.93l.15-.893z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg></IconWrapper>;

export default function UserDashboardPage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [isSectionVisible, setIsSectionVisible] = useState(true);
  const router = useRouter();

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const purchasedProxies = [
    { id: 'res123', type: '住宅代理', region: '美国 - 纽约', usage: '15.5 GB / 50 GB', expiry: '2025-06-30', status: 'active' },
    { id: 'isp456', type: 'ISP代理', region: '日本 - 东京', usage: '5.2 GB / 20 GB', expiry: '2025-07-15', status: 'active' },
    { id: 'dc789', type: '数据中心代理', region: '德国 - 法兰克福', usage: 'N/A', expiry: '2025-05-20', status: 'expired' },
  ];

  // 统一字体大小定义
  const TEXT_SIZE_SECTION_TITLE = "text-xl font-semibold"; // 用于各区域主标题 (如 "账户概览")
  const TEXT_SIZE_CARD_TITLE = "text-base font-medium";   // 用于卡片内标题 (如 "剩余点数")
  const TEXT_SIZE_STANDARD = "text-sm";                  // 用于标准文本、按钮文字、标签、输入框文字
  const TEXT_SIZE_SMALL = "text-xs";                     // 用于辅助性、描述性小字

  const btnBaseClass = "btn transition-all duration-150 ease-in-out transform hover:scale-[1.02] active:scale-95"; // 统一按钮动画

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return 'N/A';
    try {
      const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateTimeString).toLocaleString(undefined, options);
    } catch (e) {
      console.error("Error formatting date:", e);
      return dateTimeString;
    }
  };

  useEffect(() => {
    const fetchCurrentUserData = async () => {
      setIsLoading
      setError('');
      const token = localStorage.getItem('authToken');

      if (!token) {
        setError('用户未登录，请先登录。');
        setIsLoading(false);
        // router.push('/login');
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
          const errorData = await response.json().catch(() => ({ message: `获取用户信息失败 (状态码: ${response.status})` }));
          if (response.status === 401 || response.status === 403) {
            setError('认证失败或令牌已过期，请重新登录。');
            localStorage.removeItem('authToken');
            // router.push('/login');
          } else {
            setError(errorData.message || '获取用户信息时发生未知错误。');
          }
          return;
        }

        const data = await response.json();
        if (data.user) {
          setUserData(data.user);
        } else {
          setError('API未返回有效的用户信息');
        }
      } catch (err) {
        console.error('获取用户信息时出错:', err);
        if (!error) {
            setError(err.message || '获取用户信息时发生客户端错误。');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentUserData();
  }, [router]);

  const handleSectionChange = (newSection) => {
    setIsSectionVisible(false);
    setTimeout(() => {
      setActiveSection(newSection);
      setIsSectionVisible(true);
      const drawerCheckbox = document.getElementById('user-dashboard-drawer');
      if (drawerCheckbox && window.innerWidth < 1024) {
        drawerCheckbox.checked = false;
      }
    }, 150); // 缩短动画时间
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUserData(null);
    // router.push('/login');
  };

  if (isLoading) {
    return (
      <div data-theme="corporate" className="bg-base-200 min-h-screen flex items-center justify-center font-sans antialiased text-base-content">
        <span className={`loading loading-lg loading-spinner text-primary ${TEXT_SIZE_STANDARD}`}>加载中...</span>
      </div>
    );
  }

  if (error && !userData) {
    return (
      <div data-theme="corporate" className="bg-base-200 min-h-screen flex flex-col items-center justify-center font-sans antialiased text-base-content p-6">
        <p className={`text-error mb-4 ${TEXT_SIZE_SECTION_TITLE}`}>{error}</p>
        <Link href="/login" className={`${btnBaseClass} btn-primary btn-md ${TEXT_SIZE_STANDARD}`}>
          前往登录
        </Link>
      </div>
    );
  }

  if (!userData && !isLoading) {
     return (
        <div data-theme="corporate" className="bg-base-200 min-h-screen flex flex-col items-center justify-center font-sans antialiased text-base-content p-6">
            <p className={`text-warning mb-4 ${TEXT_SIZE_SECTION_TITLE}`}>无法加载用户信息，请尝试重新登录。</p>
            <Link href="/login" className={`${btnBaseClass} btn-primary btn-md ${TEXT_SIZE_STANDARD}`}>
            前往登录
            </Link>
        </div>
     );
  }

  const renderSection = () => {
    const sectionContent = () => {
        switch (activeSection) {
        case 'overview':
            return (
            <div className="space-y-6"> {/* 统一区块间距 */}
                <h2 className={`${TEXT_SIZE_SECTION_TITLE} text-base-content`}>账户概览</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"> {/* 调整卡片间距 */}
                
                <div className="card bg-base-100 shadow-md border border-base-300/20 rounded-lg hover:shadow-lg transition-shadow duration-200">
                    <div className="card-body p-5">
                        <h3 className={`${TEXT_SIZE_CARD_TITLE} text-base-content/90 mb-1.5`}>剩余点数</h3>
                        <div className="text-3xl font-bold text-primary">{(parseFloat(userData?.credit) || 0).toFixed(2)}</div>
                        <p className={`${TEXT_SIZE_SMALL} text-base-content/70 mt-0.5 mb-3`}>Credits</p>
                        <p className={`${TEXT_SIZE_SMALL} text-base-content/70 leading-relaxed`}>当前可用点数，可用于购买或续费代理服务。</p> {/* 确保此描述文字大小合适 */}
                        <div className="card-actions justify-start mt-auto pt-3">
                            <button className={`${btnBaseClass} btn-primary btn-sm ${TEXT_SIZE_STANDARD}`}>立即充值</button> {/* 确保按钮文字为 TEXT_SIZE_STANDARD (text-sm) */}
                        </div>
                    </div>
                </div>
                
                <div className="card bg-base-100 shadow-md border border-base-300/20 rounded-lg hover:shadow-lg transition-shadow duration-200">
                    <div className="card-body p-5">
                        <h3 className={`${TEXT_SIZE_CARD_TITLE} text-base-content/90 mb-1.5`}>有效代理</h3>
                        <p className="text-4xl font-bold text-secondary">{purchasedProxies.filter(p => p.status === 'active').length}</p>
                        <p className={`${TEXT_SIZE_SMALL} text-base-content/70 mt-1 leading-relaxed`}>当前正在运行的代理服务数量。</p>
                         <div className="card-actions justify-start mt-auto pt-3">
                            <button className={`${btnBaseClass} btn-outline btn-secondary btn-sm ${TEXT_SIZE_STANDARD}`} onClick={() => handleSectionChange('proxies')}>查看详情</button>
                        </div>
                    </div>
                </div>
                
                <div className="card bg-base-100 shadow-md border border-base-300/20 rounded-lg hover:shadow-lg transition-shadow duration-200">
                    <div className="card-body p-5 space-y-1">
                        <h3 className={`${TEXT_SIZE_CARD_TITLE} text-base-content/90`}>欢迎回来, {userData?.username || '用户'}!</h3>
                        <p className={`${TEXT_SIZE_SMALL} text-base-content/70`}><span className="font-medium">邮箱:</span> {userData?.email || 'N/A'}</p>
                        <p className={`${TEXT_SIZE_SMALL} text-base-content/70`}><span className="font-medium">上次登录IP:</span> {userData?.last_login_ip || '首次登录'}</p>
                        <p className={`${TEXT_SIZE_SMALL} text-base-content/70`}><span className="font-medium">上次登录时间:</span> {formatDateTime(userData?.last_login_at)}</p>
                        <div className="card-actions justify-start mt-auto pt-2">
                            <button className={`${btnBaseClass} btn-ghost btn-sm text-primary hover:bg-primary/10 ${TEXT_SIZE_SMALL}`} onClick={() => handleSectionChange('profile')}>账户设置</button> {/* 确保按钮文字为 TEXT_SIZE_SMALL */}
                        </div>
                    </div>
                </div>
                </div>

                <div>
                    <h3 className={`${TEXT_SIZE_CARD_TITLE} text-base-content mb-3 mt-2`}>快速操作</h3> {/* 调整为与卡片标题一致 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <button className={`${btnBaseClass} btn-primary btn-md ${TEXT_SIZE_STANDARD} flex items-center justify-center gap-2`} onClick={() => handleSectionChange('proxies')}>
                            <ProxiesIcon /> 管理我的代理
                        </button>
                        <button className={`${btnBaseClass} btn-secondary btn-md ${TEXT_SIZE_STANDARD} flex items-center justify-center gap-2`}>
                            <PlusCircleIcon /> 购买新代理
                        </button>
                        <button className={`${btnBaseClass} btn-outline btn-md ${TEXT_SIZE_STANDARD} flex items-center justify-center gap-2`} onClick={() => handleSectionChange('billing')}>
                            <BillingIcon /> 查看账单
                        </button>
                    </div>
                </div>
            </div>
            );
        case 'proxies':
             return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className={`${TEXT_SIZE_SECTION_TITLE} text-base-content`}>我的代理服务</h2>
                    <button className={`${btnBaseClass} btn-primary btn-sm ${TEXT_SIZE_STANDARD} flex items-center gap-1.5 inline-flex`}>
                        <PlusCircleIcon /> 购买新代理
                    </button>
                </div>
                <div className="overflow-x-auto bg-base-100 rounded-lg shadow-md border border-base-300/20">
                <table className="table table-zebra w-full"> {/* 使用 table-zebra 增加可读性 */}
                    <thead>
                    <tr>
                        <th className={`p-3 ${TEXT_SIZE_SMALL} font-semibold text-base-content/80 text-left`}>ID/备注</th>
                        <th className={`p-3 ${TEXT_SIZE_SMALL} font-semibold text-base-content/80 text-left`}>类型</th>
                        <th className={`p-3 ${TEXT_SIZE_SMALL} font-semibold text-base-content/80 text-left`}>地区</th>
                        <th className={`p-3 ${TEXT_SIZE_SMALL} font-semibold text-base-content/80 text-left`}>用量</th>
                        <th className={`p-3 ${TEXT_SIZE_SMALL} font-semibold text-base-content/80 text-left`}>到期时间</th>
                        <th className={`p-3 ${TEXT_SIZE_SMALL} font-semibold text-base-content/80 text-center`}>状态</th> {/* 状态居中 */}
                        <th className={`p-3 ${TEXT_SIZE_SMALL} font-semibold text-base-content/80 text-center`}>操作</th> {/* 操作居中 */}
                    </tr>
                    </thead>
                    <tbody>
                    {purchasedProxies.map(proxy => (
                        <tr key={proxy.id} className="hover">
                        <td className={`p-3 ${TEXT_SIZE_SMALL}`}><span className={`font-mono text-base-content/70`}>{proxy.id}</span></td>
                        <td className={`p-3 ${TEXT_SIZE_SMALL}`}>{proxy.type}</td>
                        <td className={`p-3 ${TEXT_SIZE_SMALL}`}>{proxy.region}</td>
                        <td className={`p-3 ${TEXT_SIZE_SMALL}`}>{proxy.usage}</td>
                        <td className={`p-3 ${TEXT_SIZE_SMALL}`}>{proxy.expiry}</td>
                        <td className="p-3 text-center">
                            <span className={`badge ${proxy.status === 'active' ? 'badge-success' : 'badge-error'} badge-sm ${TEXT_SIZE_SMALL}`}>{proxy.status === 'active' ? '有效' : '已过期'}</span>
                        </td>
                        <td className="p-3">
                            <div className="flex items-center justify-center gap-x-2">
                                <button className={`${btnBaseClass} btn-xs btn-ghost text-primary hover:bg-primary/10 ${TEXT_SIZE_SMALL}`}>详情</button>
                                <button className={`${btnBaseClass} btn-xs btn-ghost text-secondary hover:bg-secondary/10 ${TEXT_SIZE_SMALL}`}>续费</button>
                            </div>
                        </td>
                        </tr>
                    ))}
                    {purchasedProxies.length === 0 && (
                        <tr><td colSpan="7" className={`text-center py-10 ${TEXT_SIZE_STANDARD} text-base-content/60`}>
                            <div className="flex flex-col items-center">
                                <IconWrapper className="w-10 h-10 text-base-content/30 mb-2"><ProxiesIcon /></IconWrapper>
                                暂无已购买的代理服务。
                            </div>
                        </td></tr>
                    )}
                    </tbody>
                </table>
                </div>
            </div>
            );
        case 'profile':
            return (
            <div className="space-y-6">
                <h2 className={`${TEXT_SIZE_SECTION_TITLE} text-base-content`}>账户设置</h2>
                <div className="card bg-base-100 shadow-md border border-base-300/20 rounded-lg">
                    <div className="card-body p-6 space-y-5">
                        <div>
                            <h3 className={`${TEXT_SIZE_CARD_TITLE} text-base-content/90 mb-3`}>个人信息</h3>
                            <form className="space-y-4">
                                <div className="form-control w-full max-w-md">
                                    <label className="label pb-1"><span className={`${TEXT_SIZE_STANDARD} font-medium`}>用户名</span></label>
                                    <input type="text" defaultValue={userData?.username || ''} className={`input input-bordered input-sm w-full rounded-md ${TEXT_SIZE_STANDARD}`} />
                                </div>
                                <div className="form-control w-full max-w-md">
                                    <label className="label pb-1"><span className={`${TEXT_SIZE_STANDARD} font-medium`}>邮箱地址 (不可修改)</span></label>
                                    <input type="email" defaultValue={userData?.email || ''} className={`input input-bordered input-sm w-full rounded-md ${TEXT_SIZE_STANDARD} bg-base-200/60 cursor-not-allowed`} disabled />
                                </div>
                                <div className="form-control pt-3 w-full max-w-md">
                                    <button type="submit" className={`${btnBaseClass} btn-primary btn-sm ${TEXT_SIZE_STANDARD}`}>保存更改</button>
                                </div>
                            </form>
                        </div>
                        <div className="divider"></div>
                        <div>
                            <h3 className={`${TEXT_SIZE_CARD_TITLE} text-base-content/90 mb-3`}>修改密码</h3>
                            <form className="space-y-4">
                                <div className="form-control w-full max-w-md">
                                    <label className="label pb-1"><span className={`${TEXT_SIZE_STANDARD} font-medium`}>当前密码</span></label>
                                    <input type="password" placeholder="请输入当前密码" className={`input input-bordered input-sm w-full rounded-md ${TEXT_SIZE_STANDARD}`} />
                                </div>
                                <div className="form-control w-full max-w-md">
                                    <label className="label pb-1"><span className={`${TEXT_SIZE_STANDARD} font-medium`}>新密码</span></label>
                                    <input type="password" placeholder="请输入新密码 (至少6位)" className={`input input-bordered input-sm w-full rounded-md ${TEXT_SIZE_STANDARD}`} />
                                </div>
                                <div className="form-control w-full max-w-md">
                                    <label className="label pb-1"><span className={`${TEXT_SIZE_STANDARD} font-medium`}>确认新密码</span></label>
                                    <input type="password" placeholder="请再次输入新密码" className={`input input-bordered input-sm w-full rounded-md ${TEXT_SIZE_STANDARD}`} />
                                </div>
                                <div className="form-control pt-3 w-full max-w-md">
                                    <button type="submit" className={`${btnBaseClass} btn-primary btn-sm ${TEXT_SIZE_STANDARD}`}>更新密码</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            );
        case 'billing':
        case 'api_keys':
            const title = activeSection === 'billing' ? '账单与充值' : 'API密钥管理';
            const description = activeSection === 'billing' ? '我们正在努力完善账单与充值功能。' : 'API密钥管理功能正在紧张开发中。';
            return (
                <div className="text-center py-16">
                    <ConstructionIcon />
                    <h2 className={`${TEXT_SIZE_SECTION_TITLE} mt-4 mb-2 text-base-content`}>{title}</h2>
                    <p className={`${TEXT_SIZE_STANDARD} max-w-sm mx-auto text-base-content/70`}>{description}感谢您的耐心等待！</p>
                </div>
            );
        default:
            return <div className={`${TEXT_SIZE_STANDARD} py-10 text-center text-base-content/85`}>请从左侧选择一个菜单项。</div>;
        }
    };
    return (
        <div key={activeSection} className={`transition-opacity duration-200 ease-in-out ${isSectionVisible ? 'opacity-100' : 'opacity-0'}`}>
            {sectionContent()}
        </div>
    );
  };

  return (
    <div data-theme="corporate" className="bg-base-200 min-h-screen flex flex-col font-sans antialiased text-base-content selection:bg-primary selection:text-primary-content">
      <header className="navbar bg-base-100/95 backdrop-blur-sm border-b border-base-300/30 sticky top-0 z-50 shadow-sm"> {/* 微调透明度和阴影 */}
        <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 max-w-screen-xl"> {/* 调整最大宽度 */}
            <div className="navbar-start flex-shrink-0">
              <label htmlFor="user-dashboard-drawer" className="btn btn-ghost btn-sm lg:hidden p-1 mr-1.5 drawer-button"> {/* 调整间距 */}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path></svg>
              </label>
              <Logo />
            </div>
            <div className="navbar-end space-x-2 flex-shrink-0">
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className={`${btnBaseClass} btn-ghost btn-sm rounded-md flex items-center px-2 py-1 h-auto hover:bg-base-300/20`}>
                  <div className="avatar placeholder btn-xs mr-2 online"> {/* 增加头像右边距 */}
                    <div className={`bg-neutral-focus text-neutral-content rounded-full w-6 h-6 ring-1 ring-base-300 flex items-center justify-center`}>
                      <span className={TEXT_SIZE_SMALL}>{userData?.username ? userData.username.charAt(0).toUpperCase() : 'U'}</span>
                    </div>
                  </div>
                  <span className={`hidden sm:inline ${TEXT_SIZE_STANDARD} font-medium`}>{userData?.username || '我的账户'}</span>
                  <svg className="w-4 h-4 ml-1.5 fill-current opacity-70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                </label>
                <ul tabIndex={0} className={`menu menu-sm dropdown-content mt-3 p-2 shadow-xl bg-base-100 rounded-lg w-56 border border-base-300/40 z-[1] ${TEXT_SIZE_STANDARD}`}>
                  <li><a className={`py-2 px-3 flex items-center justify-start gap-2.5 hover:bg-base-200/70 rounded-md active:bg-primary/10 active:text-primary`} onClick={() => {handleSectionChange('profile');}}>
                      <ProfileIcon /> 账户设置
                  </a></li>
                  <li><a className={`py-2 px-3 flex items-center justify-start gap-2.5 hover:bg-base-200/70 rounded-md active:bg-primary/10 active:text-primary`}>
                      <IconWrapper className="w-4 h-4"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg></IconWrapper> 帮助中心
                  </a></li>
                  <li className="mt-1 px-1"> {/* 调整上边距 */}
                    <button
                      onClick={handleLogout}
                      className={`${btnBaseClass} btn-sm btn-ghost text-error hover:bg-error/10 w-full justify-start gap-2.5 py-2 h-auto font-normal ${TEXT_SIZE_STANDARD}`}>
                        <LogoutIcon /> 退出登录
                    </button>
                  </li>
                </ul>
              </div>
            </div>
        </div>
      </header>

      <div className="drawer lg:drawer-open flex-grow container mx-auto max-w-screen-xl mt-5 mb-5 lg:mt-6 lg:mb-6"> {/* 调整最大宽度和上下边距 */}
        <input id="user-dashboard-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col p-5 lg:p-6"> {/* 调整内边距 */}
          {renderSection()}
        </div>
        <div className="drawer-side lg:rounded-lg lg:shadow-md z-40 lg:z-auto lg:sticky lg:top-[calc(var(--navbar-height,64px)+1.5rem)] lg:max-h-[calc(100vh-var(--navbar-height,64px)-3rem-env(safe-area-inset-bottom))] overflow-y-auto bg-base-100 border-r border-base-300/20"> {/* 调整背景和边框 */}
          <label htmlFor="user-dashboard-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className={`menu p-4 w-64 min-h-full text-base-content space-y-1.5`}> {/* 调整宽度和菜单项间距 */}
            <li className={`px-3 pt-1 pb-2`}> {/* 调整内边距 */}
                <span className={`${TEXT_SIZE_STANDARD} font-semibold text-base-content/80 tracking-wide`}>导航菜单</span> {/* 调整字体大小和样式 */}
            </li>
            {[
              { label: '账户概览', section: 'overview', icon: <OverviewIcon /> },
              { label: '我的代理', section: 'proxies', icon: <ProxiesIcon /> },
              { label: '账户设置', section: 'profile', icon: <ProfileIcon /> },
              { label: '账单与充值', section: 'billing', icon: <BillingIcon /> },
              { label: 'API密钥', section: 'api_keys', icon: <ApiKeysIcon /> },
            ].map(item => (
              <li key={item.section}>
                <a
                  className={`py-2.5 px-4 rounded-md flex items-center gap-3 ${TEXT_SIZE_STANDARD} ${activeSection === item.section ? 'active bg-primary/10 text-primary font-medium' : 'hover:bg-base-200/70'}`} // 调整padding和active样式
                  onClick={() => handleSectionChange(item.section)}
                >
                  {item.icon} {item.label}
                </a>
              </li>
            ))}
            <div className="divider my-2"></div> {/* 调整divider间距 */}
             <li><Link href="/" className={`${btnBaseClass} py-2.5 px-4 rounded-md flex items-center gap-3 ${TEXT_SIZE_STANDARD} hover:bg-base-200/70 justify-start font-normal w-full h-auto`}> <HomeIcon />返回首页</Link></li>
             <li>
                <a onClick={handleLogout}
                   className={`${btnBaseClass} py-2.5 px-4 rounded-md flex items-center gap-3 ${TEXT_SIZE_STANDARD} hover:bg-error/10 text-error justify-start font-normal w-full h-auto`}>
                    <LogoutIcon />退出登录
                </a>
            </li>
          </ul>
        </div>
      </div>

       <footer className={`footer footer-center p-5 bg-base-100 text-base-content border-t border-base-300/30 mt-auto ${TEXT_SIZE_STANDARD}`}> {/* 调整padding和边框 */}
        <div className="container mx-auto px-4 sm:px-6 max-w-screen-xl">
            <aside>
                <p className={`${TEXT_SIZE_SMALL} text-base-content/70`}>© {new Date().getFullYear()} isproxy.io - 版权所有。</p> {/* 调整字体大小 */}
            </aside>
        </div>
      </footer>
    </div>
  );
}
