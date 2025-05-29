'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react'; // 移除了 useEffect 因为暂时未使用获取用户逻辑

// Logo 组件 - 与其他页面保持一致
const Logo = () => (
  <a href="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
    isproxy.io
  </a>
);

// 图标包裹组件
const IconWrapper = ({ children, className = "w-5 h-5" }) => <div className={className}>{children}</div>;

// 定义各种图标
const OverviewIcon = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.25 2.25v3.75a2.25 2.25 0 01-2.25 2.25H2.25v-8.25zM12 15.75v3.75a2.25 2.25 0 002.25 2.25H18v-8.25h-3.86a2.25 2.25 0 00-2.25 2.25zM21.75 13.5h-3.86a2.25 2.25 0 00-2.25 2.25v3.75a2.25 2.25 0 002.25 2.25H21.75V13.5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M4.125 6.375A2.25 2.25 0 016.375 4.125h11.25c1.243 0 2.25 1.007 2.25 2.25v3.75c0 .412-.168.79-.468 1.075H4.593a2.248 2.248 0 01-1.075-.468V6.375z" /></svg></IconWrapper>;
const ProxiesIcon = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.056A7.5 7.5 0 0112 15c1.924 0 3.707.728 5.028 1.948m-5.028-1.948V4.5m0 10.5C8.111 16.056 4.5 15.688 4.5 12V7.5C4.5 5.015 7.875 3 12 3s7.5 2.015 7.5 4.5V12c0 3.688-3.611 4.056-7.5 4.500v0zM12 4.5V2.25m0 18V15m0-10.5v0" /></svg></IconWrapper>;
const ProfileIcon = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg></IconWrapper>;
const BillingIcon = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" /></svg></IconWrapper>;
const ApiKeysIcon = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" /></svg></IconWrapper>;
const LogoutIcon = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg></IconWrapper>;
const HomeIcon = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" /></svg></IconWrapper>;
const PlusCircleIcon = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></IconWrapper>;
const ConstructionIcon = () => <IconWrapper className="w-16 h-16 mx-auto text-base-content/30 mb-4"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.11v1.093c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.27.96-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.78.93l-.15.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.149-.894c-.07-.424-.384-.764-.78-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-.96.27-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.272.806.108-1.204-.166-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.11v-1.094c0-.55.398-1.019.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.93l.15-.893z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg></IconWrapper>;


export default function UserDashboardPage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [isSectionVisible, setIsSectionVisible] = useState(true);

  // 模拟用户数据，后续会从API获取
  const user = {
    email: 'user@example.com', // 示例邮箱
    username: 'TestUser',      // 示例用户名
    credit: 100.50,            // 示例点数
  };

  // 模拟已购买代理数据，后续会从API获取
  const purchasedProxies = [
    { id: 'res123', type: '住宅代理', region: '美国 - 纽约', usage: '15.5 GB / 50 GB', expiry: '2025-06-30', status: 'active' },
    { id: 'isp456', type: 'ISP代理', region: '日本 - 东京', usage: '5.2 GB / 20 GB', expiry: '2025-07-15', status: 'active' },
    { id: 'dc789', type: '数据中心代理', region: '德国 - 法兰克福', usage: 'N/A', expiry: '2025-05-20', status: 'expired' },
  ];

  // 定义主要的字体大小类别 (与您之前的定义保持一致)
  const FONT_STANDARD = "text-base"; // 标准/正文 (1rem / 16px) - 用于常规文本、描述、表格内容等
  const FONT_SMALL = "text-sm";     // 较小/辅助 (0.875rem / 14px) - 用于表单标签、按钮内文字、表格ID、状态标签等
  const FONT_LARGE = "text-xl";     // 大号/区域标题 (1.25rem / 20px) - 用于各主要功能区的标题

  // 卡片内标题的统一样式
  const cardTitleClass = `card-title ${FONT_STANDARD} font-semibold`; // 卡片标题使用标准字体大小，加粗
  // 卡片内描述性文本的统一样式
  const descriptiveTextClass = `${FONT_STANDARD} text-base-content/85`; // 描述文本使用标准字体，颜色稍浅

  // 按钮基础样式，用于统一样式和过渡效果
  const btnBaseClass = "btn transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95";

  // 切换内容区域的函数
  const handleSectionChange = (newSection) => {
    setIsSectionVisible(false); // 先隐藏，制造切换效果
    setTimeout(() => {
      setActiveSection(newSection);
      setIsSectionVisible(true); // 再显示新内容
      // 如果是移动端，关闭抽屉菜单
      const drawerCheckbox = document.getElementById('user-dashboard-drawer');
      if (drawerCheckbox && window.innerWidth < 1024) { // lg 断点
        drawerCheckbox.checked = false;
      }
    }, 200); // 延迟时间可以调整
  };


  // 根据 activeSection 渲染不同的内容组件
  const renderSection = () => {
    const sectionContent = () => {
        switch (activeSection) {
        case 'overview': // 账户概览
            return (
            <div>
                {/* 区域主标题: FONT_LARGE (text-xl) */}
                <h2 className={`${FONT_LARGE} font-semibold mb-6 text-base-content`}>账户概览</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
                {/* 剩余点数卡片 */}
                <div className="card bg-base-100 shadow-lg border border-base-300/30 rounded-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out">
                    <div className="card-body p-5">
                    <div className="flex items-center justify-between mb-1">
                        {/* 卡片标题: FONT_STANDARD (text-base) */}
                        <h3 className={cardTitleClass}>剩余点数</h3>
                    </div>
                    {/* 关键指标: text-3xl，突出显示 */}
                    <div className="text-3xl font-bold text-primary mt-1">{user.credit.toFixed(2)} <span className="text-lg font-normal text-base-content/70">Credits</span></div>
                    {/* 描述文本: FONT_STANDARD (text-base) */}
                    <p className={`${descriptiveTextClass} mt-2`}>当前可用点数，可用于购买或续费代理服务。</p>
                    <div className="card-actions justify-end mt-4">
                        {/* 按钮内文字: FONT_SMALL (text-sm) */}
                        <button className={`${btnBaseClass} btn-primary btn-sm rounded-md ${FONT_SMALL}`}>立即充值</button>
                    </div>
                    </div>
                </div>
                {/* 有效代理卡片 */}
                <div className="card bg-base-100 shadow-lg border border-base-300/30 rounded-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out">
                    <div className="card-body p-5">
                        <div className="flex items-center justify-between mb-1">
                            <h3 className={cardTitleClass}>有效代理</h3>
                        </div>
                        {/* 关键指标: text-4xl，突出显示 */}
                        <p className="text-4xl font-bold text-secondary mt-1 mb-1">{purchasedProxies.filter(p => p.status === 'active').length}</p>
                        <p className={`${descriptiveTextClass} mt-2`}>当前正在运行的代理服务数量。</p>
                    </div>
                </div>
                {/* 欢迎信息卡片 */}
                <div className="card bg-base-100 shadow-lg border border-base-300/30 rounded-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out">
                    <div className="card-body p-5">
                        <h3 className={cardTitleClass}>欢迎回来, {user.username}!</h3>
                        <p className={`${descriptiveTextClass} mt-2`}>邮箱: {user.email}</p>
                        <p className={`${descriptiveTextClass} mt-1`}>上次登录IP: 127.0.0.1 (占位)</p>
                        <div className="card-actions justify-end mt-4">
                            <button className={`${btnBaseClass} btn-outline btn-xs rounded-md ${FONT_SMALL}`} onClick={() => handleSectionChange('profile')}>账户设置</button>
                        </div>
                    </div>
                </div>
                </div>

                {/* 快速操作区域标题: FONT_STANDARD (text-base) */}
                <h3 className={`${FONT_STANDARD} font-semibold mb-4 text-base-content`}>快速操作</h3>
                <div className="flex flex-wrap gap-3">
                    {/* 快速操作按钮内文字: FONT_SMALL (text-sm) */}
                    <button className={`${btnBaseClass} btn-secondary btn-sm rounded-md ${FONT_SMALL} flex items-center gap-1.5`} onClick={() => handleSectionChange('proxies')}>
                        <ProxiesIcon /> 管理我的代理
                    </button>
                    <button className={`${btnBaseClass} btn-accent btn-sm rounded-md ${FONT_SMALL} flex items-center gap-1.5`}>
                        <PlusCircleIcon /> 购买新代理
                    </button>
                    <button className={`${btnBaseClass} btn-outline btn-sm rounded-md ${FONT_SMALL} flex items-center gap-1.5`} onClick={() => handleSectionChange('billing')}>
                        <BillingIcon /> 查看账单
                    </button>
                </div>
            </div>
            );
        case 'proxies': // 我的代理服务
            return (
            <div>
                <div className="flex justify-between items-center mb-5">
                    <h2 className={`${FONT_LARGE} font-semibold text-base-content`}>我的代理服务</h2>
                    <button className={`${btnBaseClass} btn-primary btn-sm rounded-md ${FONT_SMALL} flex items-center gap-1.5`}>
                        <PlusCircleIcon /> 购买新代理
                    </button>
                </div>
                <div className="overflow-x-auto bg-base-100 rounded-lg shadow-md border border-base-300/30">
                <table className="table w-full">
                    <thead>
                    <tr>
                        {/* 表头: FONT_STANDARD (text-base) */}
                        <th className={`${FONT_STANDARD} font-medium text-base-content/90 px-3 py-3 text-left`}>ID/备注</th>
                        <th className={`${FONT_STANDARD} font-medium text-base-content/90 px-3 py-3 text-left`}>类型</th>
                        <th className={`${FONT_STANDARD} font-medium text-base-content/90 px-3 py-3 text-left`}>地区</th>
                        <th className={`${FONT_STANDARD} font-medium text-base-content/90 px-3 py-3 text-left`}>用量</th>
                        <th className={`${FONT_STANDARD} font-medium text-base-content/90 px-3 py-3 text-left`}>到期时间</th>
                        <th className={`${FONT_STANDARD} font-medium text-base-content/90 px-3 py-3 text-left`}>状态</th>
                        <th className={`${FONT_STANDARD} font-medium text-base-content/90 px-3 py-3 text-left`}>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {purchasedProxies.map(proxy => (
                        <tr key={proxy.id} className="hover:bg-base-200/50 transition-colors duration-150">
                        {/* 表格ID: FONT_SMALL (text-sm) */}
                        <td className={`px-3 py-3`}><span className={`font-mono ${FONT_SMALL} text-base-content/80`}>{proxy.id}</span></td>
                        {/* 其他表格内容: FONT_STANDARD (text-base) */}
                        <td className={`${FONT_STANDARD} px-3 py-3`}>{proxy.type}</td>
                        <td className={`${FONT_STANDARD} px-3 py-3`}>{proxy.region}</td>
                        <td className={`${FONT_STANDARD} px-3 py-3`}>{proxy.usage}</td>
                        <td className={`${FONT_STANDARD} px-3 py-3`}>{proxy.expiry}</td>
                        <td className="px-3 py-3">
                            {/* 状态标签内文字: FONT_SMALL (text-sm) */}
                            <span className={`badge badge-sm ${proxy.status === 'active' ? 'badge-success' : 'badge-error'} ${FONT_SMALL} font-medium`}>
                            {proxy.status === 'active' ? '有效' : '已过期'}
                            </span>
                        </td>
                        <td className="px-3 py-3">
                            <div className="flex items-center gap-x-2">
                                {/* 表格操作按钮内文字: FONT_SMALL (text-sm) */}
                                <button className={`${btnBaseClass} btn-xs btn-ghost text-primary hover:bg-primary/10 ${FONT_SMALL}`}>详情</button>
                                <button className={`${btnBaseClass} btn-xs btn-ghost text-orange-500 hover:bg-orange-500/10 ${FONT_SMALL}`}>续费</button>
                            </div>
                        </td>
                        </tr>
                    ))}
                    {purchasedProxies.length === 0 && (
                        <tr><td colSpan="7" className={`text-center py-10 ${FONT_STANDARD} text-base-content/60`}>
                            <div className="flex flex-col items-center">
                                <IconWrapper className="w-12 h-12 text-base-content/30 mb-3"><ProxiesIcon /></IconWrapper>
                                暂无已购买的代理服务。
                            </div>
                        </td></tr>
                    )}
                    </tbody>
                </table>
                </div>
            </div>
            );
        case 'profile': // 账户设置
            return (
            <div>
                <h2 className={`${FONT_LARGE} font-semibold text-base-content`}>账户设置</h2>
                <div className="card bg-base-100 shadow-lg border border-base-300/30 rounded-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out">
                    <div className="card-body p-6">
                        {/* 子区域标题: FONT_STANDARD (text-base) */}
                        <h3 className={`${FONT_STANDARD} font-semibold mb-5 text-base-content`}>个人信息</h3>
                        <form className="space-y-4">
                            <div className="form-control w-full max-w-md">
                                {/* 表单标签: FONT_STANDARD (text-base) */}
                                <label className="label pb-1 pt-0"><span className={FONT_STANDARD}>用户名</span></label>
                                {/* 输入框内部文字: FONT_SMALL (text-sm) 以匹配 input-sm */}
                                <input type="text" defaultValue={user.username} className={`input input-bordered input-sm w-full rounded-md ${FONT_SMALL} focus:border-primary focus:ring-1 focus:ring-primary transition-shadow duration-200`} />
                            </div>
                            <div className="form-control w-full max-w-md">
                                <label className="label pb-1 pt-0"><span className={FONT_STANDARD}>邮箱地址 (不可修改)</span></label>
                                <input type="email" defaultValue={user.email} className={`input input-bordered input-sm w-full rounded-md ${FONT_SMALL}`} disabled />
                            </div>
                            <div className="form-control mt-6 w-full max-w-md">
                                <button type="submit" className={`${btnBaseClass} btn-primary btn-sm rounded-md ${FONT_SMALL}`}>更新信息</button>
                            </div>
                        </form>
                        <div className="divider my-8"></div>
                        <h3 className={`${FONT_STANDARD} font-semibold mb-5 text-base-content`}>修改密码</h3>
                        <form className="space-y-4">
                            <div className="form-control w-full max-w-md">
                                <label className="label pb-1 pt-0"><span className={FONT_STANDARD}>当前密码</span></label>
                                <input type="password" placeholder="请输入当前密码" className={`input input-bordered input-sm w-full rounded-md ${FONT_SMALL} focus:border-primary focus:ring-1 focus:ring-primary transition-shadow duration-200`} />
                            </div>
                            <div className="form-control w-full max-w-md">
                                <label className="label pb-1 pt-0"><span className={FONT_STANDARD}>新密码</span></label>
                                <input type="password" placeholder="请输入新密码 (至少6位)" className={`input input-bordered input-sm w-full rounded-md ${FONT_SMALL} focus:border-primary focus:ring-1 focus:ring-primary transition-shadow duration-200`} />
                            </div>
                            <div className="form-control w-full max-w-md">
                                <label className="label pb-1 pt-0"><span className={FONT_STANDARD}>确认新密码</span></label>
                                <input type="password" placeholder="请再次输入新密码" className={`input input-bordered input-sm w-full rounded-md ${FONT_SMALL} focus:border-primary focus:ring-1 focus:ring-primary transition-shadow duration-200`} />
                            </div>
                            <div className="form-control mt-6 w-full max-w-md">
                                <button type="submit" className={`${btnBaseClass} btn-primary btn-sm rounded-md ${FONT_SMALL}`}>修改密码</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            );
        case 'billing': // 账单与充值 (占位)
            return (
                <div className="text-center py-16">
                    <ConstructionIcon />
                    <h2 className={`${FONT_LARGE} font-semibold mb-2 text-base-content`}>账单与充值</h2>
                    <p className={`${FONT_STANDARD} max-w-md mx-auto text-base-content/85`}>我们正在努力完善账单与充值功能，很快就会和您见面。感谢您的耐心等待！</p>
                </div>
            );
        case 'api_keys': // API密钥管理 (占位)
            return (
                <div className="text-center py-16">
                    <ConstructionIcon />
                    <h2 className={`${FONT_LARGE} font-semibold mb-2 text-base-content`}>API密钥管理</h2>
                    <p className={`${FONT_STANDARD} max-w-md mx-auto text-base-content/85`}>API密钥管理功能正在紧张开发中，旨在为您提供更便捷的程序化访问。敬请期待！</p>
                </div>
            );
        default: // 默认提示
            return <div className={`${FONT_STANDARD} py-10 text-center text-base-content/85`}>请从左侧选择一个菜单项。</div>;
        }
    };
    // 内容区域的淡入淡出效果
    return (
        <div key={activeSection} className={`transition-opacity duration-300 ease-in-out ${isSectionVisible ? 'opacity-100' : 'opacity-0'}`}>
            {sectionContent()}
        </div>
    );
  };

  return (
    <div data-theme="corporate" className="bg-base-200 min-h-screen flex flex-col font-sans antialiased text-base-content selection:bg-primary selection:text-primary-content">
      {/* 顶部导航栏 */}
      <header className="navbar bg-base-100/90 backdrop-blur-md border-b border-base-300/40 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 max-w-7xl"> {/* 使用 max-w-7xl 适配更宽内容区 */}
            <div className="navbar-start flex-shrink-0">
              <label htmlFor="user-dashboard-drawer" className="btn btn-ghost btn-sm lg:hidden p-1 mr-1 drawer-button">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path></svg>
              </label>
              <Logo /> {/* Logo 使用 text-2xl */}
            </div>
            <div className="navbar-end space-x-2 flex-shrink-0">
              <div className="dropdown dropdown-end">
                {/* 用户名: FONT_STANDARD (text-base) */}
                <label tabIndex={0} className={`${btnBaseClass} btn-ghost btn-sm rounded-md flex items-center px-2 py-1 h-auto hover:bg-base-300/20`}>
                  <div className="avatar placeholder btn-xs mr-1.5 online">
                    {/* 头像内文字: FONT_SMALL (text-sm) */}
                    <div className={`bg-neutral-focus text-neutral-content rounded-full w-6 h-6 ring-1 ring-base-300 flex items-center justify-center`}>
                      <span className={FONT_SMALL}>{user.username ? user.username.charAt(0).toUpperCase() : 'U'}</span>
                    </div>
                  </div>
                  <span className={`hidden sm:inline ${FONT_STANDARD} font-medium`}>{user.username || '我的账户'}</span>
                  <svg className="w-4 h-4 ml-1 fill-current opacity-70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                </label>
                {/* 下拉菜单项: FONT_STANDARD (text-base) 应用于ul, 内部a标签继承或可单独指定 */}
                <ul tabIndex={0} className={`menu menu-sm dropdown-content mt-3 p-2 shadow-xl bg-base-100 rounded-lg w-56 border border-base-300/50 z-[1] ${FONT_STANDARD}`}>
                  <li><a className={`py-2.5 px-3 flex items-center justify-start gap-2.5 hover:bg-base-200/70 rounded-md active:bg-primary/10 active:text-primary transition-colors duration-150`} onClick={() => {handleSectionChange('profile');}}>
                      <ProfileIcon /> 账户设置
                  </a></li>
                  <li><a className={`py-2.5 px-3 flex items-center justify-start gap-2.5 hover:bg-base-200/70 rounded-md active:bg-primary/10 active:text-primary transition-colors duration-150`}>
                      <IconWrapper className="w-4 h-4"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg></IconWrapper> 帮助中心
                  </a></li>
                  <li className="mt-1.5 px-1">
                    {/* 退出登录按钮内文字: FONT_STANDARD (text-base)，但因是btn-sm，实际视觉会略小 */}
                    <button className={`${btnBaseClass} btn-sm btn-ghost text-error hover:bg-error/10 w-full justify-start gap-2.5 py-2 h-auto font-normal ${FONT_STANDARD}`}>
                        <LogoutIcon /> 退出登录
                    </button>
                  </li>
                </ul>
              </div>
            </div>
        </div>
      </header>

      {/* 主体内容区域，包含侧边栏和内容面板 */}
      <div className="drawer lg:drawer-open flex-grow container mx-auto max-w-7xl mt-4 mb-4 lg:mt-6 lg:mb-6"> {/* 使用 max-w-7xl */}
        <input id="user-dashboard-drawer" type="checkbox" className="drawer-toggle" />
        {/* 内容面板 */}
        <div className="drawer-content flex flex-col p-4 sm:p-5 lg:p-0 lg:pl-8">
          {renderSection()}
        </div>
        {/* 侧边栏 */}
        <div className="drawer-side lg:rounded-xl lg:shadow-lg z-40 lg:z-auto lg:sticky lg:top-[calc(var(--navbar-height,64px)+1.5rem)] lg:max-h-[calc(100vh-var(--navbar-height,64px)-3rem-env(safe-area-inset-bottom))] overflow-y-auto">
          <label htmlFor="user-dashboard-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          {/* 侧边栏菜单项和标题: FONT_STANDARD (text-base) */}
          <ul className={`menu p-3 w-60 sm:w-64 min-h-full bg-base-100 text-base-content border-r border-base-300/50 lg:border-none space-y-1.5 ${FONT_STANDARD}`}>
            <li className={`menu-title px-3 pt-2 pb-1.5 font-semibold text-base-content/90 ${FONT_STANDARD}`}><span>导航菜单</span></li>
            {[
              { label: '账户概览', section: 'overview', icon: <OverviewIcon /> },
              { label: '我的代理', section: 'proxies', icon: <ProxiesIcon /> },
              { label: '账户设置', section: 'profile', icon: <ProfileIcon /> },
              { label: '账单与充值', section: 'billing', icon: <BillingIcon /> },
              { label: 'API密钥', section: 'api_keys', icon: <ApiKeysIcon /> },
            ].map(item => (
              <li key={item.section}>
                <a
                  className={`py-3 px-3 rounded-lg flex items-center gap-3 transition-all duration-200 ease-in-out transform hover:translate-x-1 ${activeSection === item.section ? 'active font-semibold bg-primary/10 text-primary shadow-sm scale-105' : 'hover:bg-base-200/70 hover:shadow-sm'}`}
                  onClick={() => handleSectionChange(item.section)}
                >
                  {item.icon} {item.label}
                </a>
              </li>
            ))}
            <div className="divider my-3"></div>
             <li><Link href="/" className={`${btnBaseClass} py-3 px-3 rounded-lg flex items-center gap-3 hover:bg-base-200/70 justify-start font-normal w-full h-auto ${FONT_STANDARD}`}> <HomeIcon />返回首页</Link></li>
             <li><a className={`${btnBaseClass} py-3 px-3 rounded-lg flex items-center gap-3 hover:bg-error/10 text-error justify-start font-normal w-full h-auto ${FONT_STANDARD}`}><LogoutIcon />退出登录</a></li> {/* 实际的退出登录逻辑后续添加 */}
          </ul>
        </div>
      </div>

       {/* 页脚版权信息: FONT_STANDARD (text-base) */}
       <footer className={`footer footer-center p-4 bg-base-100 text-base-content border-t border-base-300/40 mt-auto ${FONT_STANDARD}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl"> {/* 使用 max-w-7xl */}
            <aside>
                <p className="text-base-content/75">© {new Date().getFullYear()} isproxy.io - 版权所有。</p>
            </aside>
        </div>
      </footer>
    </div>
  );
}
