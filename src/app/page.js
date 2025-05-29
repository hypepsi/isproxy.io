'use client';
import Link from 'next/link'; // 导入 Link 组件

// Helper function to generate SVG checkmark icon
const CheckIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
  </svg>
);

// Helper function for social media icons (placeholders)
const SocialIconPlaceholder = ({ platform }) => (
  <div className="w-5 h-5 bg-base-content/20 rounded-full flex items-center justify-center text-xs text-base-content/70">
    {platform.charAt(0)}
  </div>
);


export default function Home() {
  const products = [
    {
      id: 'residential',
      title: '住宅代理',
      description: '适用于社交媒体、电商运营、市场调研等场景，提供高度匿名的真实家庭住宅IP。',
      tags: ['90M+ IP资源', '高匿名性', '动态/静态可选'],
      price: '¥0.75 / GB',
      icon: '🏠',
      features: ['99.9%在线率', '全球主流国家覆盖', '多种协议支持'],
      recommended: false,
      colorTheme: 'info',
    },
    {
      id: 'isp',
      title: 'ISP 专属代理',
      description: '适用于品牌保护、广告验证、电商直播等需要长期稳定连接的业务，提供ISP直接分配的IP。',
      tags: ['真实ISP ASN', '带宽稳定', '低延迟'],
      price: '¥0.70 / GB',
      icon: '🌐',
      features: ['独享静态IP资源', '高速网络连接', '适用于TikTok等平台'],
      recommended: true,
      colorTheme: 'primary',
    },
    {
      id: 'datacenter',
      title: '数据中心代理',
      description: '高性价比之选，适用于大规模数据采集、搜索引擎优化、网站测试等高并发场景。',
      tags: ['不限带宽', '高并发处理', 'API白名单'],
      price: '¥2.89 / IP',
      icon: '🏢',
      features: ['极速响应时间', '成本效益显著', '支持HTTP/SOCKS5'],
      recommended: false,
      colorTheme: 'success',
    },
  ];

  const stats = [
    { value: '200+', label: '覆盖国家/地区', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 stroke-current text-blue-500"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> },
    { value: '90M+', label: '全球IP资源池', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current text-teal-500"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.737 16.263L6.263 14.79A2 2 0 004.85 14H3M16.263 16.263L17.737 14.79A2 2 0 0119.15 14H21M12 20.928A8 8 0 0019.15 14.85M12 20.928A8 8 0 014.85 14.85"></path></svg> },
    { value: '99.9%', label: '服务在线率', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current text-green-500"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg> },
    { value: '24/7', label: '专业技术支持', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current text-purple-500"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg> }
  ];

  const whyChooseUsPoints = [
    { title: '卓越性能与稳定性', description: '自研技术架构，确保99.9%的在线率和低延迟响应。', icon: '⚡️', theme: 'primary' },
    { title: '全球广泛覆盖', description: 'IP资源遍布全球200+国家和地区，满足您的全球化业务需求。', icon: '🌍', theme: 'secondary' },
    { title: '灵活计费方案', description: '提供多种套餐选择和API定制化服务，按需付费，有效节约成本。', icon: '💰', theme: 'accent' },
    { title: '专业客户服务', description: '经验丰富的技术团队7x24小时在线，随时提供专业、快速的技术支持。', icon: '🛠️', theme: 'neutral' },
  ];

  return (
    <div data-theme="corporate" className="bg-base-100 min-h-screen font-sans antialiased text-base-content selection:bg-primary selection:text-primary-content">
      <header className="navbar bg-base-100/90 backdrop-blur-md border-b border-base-300/40 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="navbar-start flex-shrink-0">
              <div className="dropdown">
                  <label tabIndex={0} className="btn btn-ghost btn-sm lg:hidden p-1 mr-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path></svg>
                  </label>
                  <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow-lg bg-base-100 rounded-lg w-52 border border-base-300/50">
                  <li><Link href="/#products" className="text-base py-2">产品服务</Link></li>
                  <li><Link href="/pricing" className="text-base py-2">定价方案</Link></li>
                  <li><Link href="/docs" className="text-base py-2">帮助文档</Link></li>
                  <li><Link href="/about" className="text-base py-2">关于我们</Link></li>
                  </ul>
              </div>
              <a href="/" className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  isproxy.io
              </a>
            </div>
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1 space-x-1">
                  <li><Link href="/#products" className="btn btn-ghost btn-sm text-sm font-medium">产品服务</Link></li>
                  <li><Link href="/pricing" className="btn btn-ghost btn-sm text-sm font-medium">定价方案</Link></li>
                  <li><Link href="/docs" className="btn btn-ghost btn-sm text-sm font-medium">帮助文档</Link></li>
                  <li><Link href="/about" className="btn btn-ghost btn-sm text-sm font-medium">关于我们</Link></li>
              </ul>
            </div>
            <div className="navbar-end space-x-2 flex-shrink-0">
              <Link href="/login" className="btn btn-ghost btn-sm rounded-md text-sm font-medium">登录</Link>
              <Link href="/register" className="btn btn-primary btn-sm rounded-md text-sm font-medium shadow-sm hover:shadow-md transition-shadow">注册</Link>
            </div>
        </div>
      </header>

    <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-6 lg:py-10">
      {/* Hero Section - 高度和标题字号调整 */}
      <section className="hero min-h-[30vh] lg:min-h-[35vh] bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 py-6 lg:py-10 rounded-xl shadow-lg mb-6 lg:mb-10">
        <div className="hero-content text-center px-4">
          <div className="max-w-lg">
            {/* 主标题字号调整为 text-3xl sm:text-4xl，确保一行显示 */}
            <h1 className="text-3xl sm:text-4xl font-bold mb-5 text-base-content leading-tight">
              全球领先的企业级代理网络
            </h1>
            <p className="text-base lg:text-lg text-base-content/80 mb-8 max-w-md mx-auto leading-relaxed">
              为您的各类业务场景提供高匿名、高稳定、高并发的住宅、ISP及数据中心代理解决方案。
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <button className="btn btn-primary btn-md rounded-lg px-6 text-sm font-semibold shadow-md hover:shadow-primary/30 transition-all transform hover:scale-105">
                立即免费试用
              </button>
              <button className="btn btn-outline btn-md rounded-lg px-6 text-sm font-medium hover:bg-base-content hover:text-base-100 transition-all transform hover:scale-105">
                查看产品文档
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mb-6 lg:mb-10">
          <div className="stats stats-vertical lg:stats-horizontal shadow-xl w-full bg-base-100 rounded-2xl border border-base-300/25 overflow-hidden">
            {stats.map((stat, idx) => (
              <div key={idx} className="stat p-5 lg:p-6 place-items-center hover:bg-base-200/25 transition-colors duration-300">
                <div className={`stat-figure mb-1.5 text-${idx % 4 === 0 ? 'blue-500' : idx % 4 === 1 ? 'teal-500' : idx % 4 === 2 ? 'green-500' : 'purple-500'}`}>{stat.icon}</div>
                <div className="stat-value text-2xl lg:text-3xl font-bold text-base-content">{stat.value}</div>
                <div className="stat-desc text-base-content/75 text-xs mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
      </section>

      {/* Products Section */}
      <section id="products" className="mb-6 lg:mb-10">
          <div className="text-center mb-10 lg:mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold mb-3 text-base-content">选择适合您的代理方案</h2>
            <p className="text-base text-base-content/75 max-w-lg mx-auto">
              我们提供多样化的代理服务，满足您不同的业务需求，灵活计费，高性价比。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className={`card bg-base-100 shadow-lg hover:shadow-xl border ${
                  product.recommended ? `border-2 border-${product.colorTheme} ring-2 ring-${product.colorTheme}/10` : 'border-base-300/30 hover:border-base-300/60'
                } flex flex-col rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105`}
              >
                {product.recommended && (
                  <div className={`badge badge-md badge-${product.colorTheme} font-semibold absolute top-3 right-3 py-2.5 px-3 text-xs z-10 shadow`}>推荐</div>
                )}
                <div className={`p-5 bg-${product.colorTheme}/10 text-4xl text-center text-${product.colorTheme} rounded-t-xl`}>
                  {product.icon}
                </div>
                <div className="card-body p-5 flex flex-col flex-grow">
                  <h3 className={`card-title text-xl font-semibold mb-2 text-center text-${product.colorTheme}`}>{product.title}</h3>
                  <p className="text-base-content/80 mb-4 text-sm flex-grow min-h-[50px] leading-relaxed text-center sm:text-left">{product.description}</p>

                  <ul className="mb-4 space-y-1.5">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-base-content/85 text-sm leading-tight">
                        <CheckIcon className={`w-4 h-4 text-${product.colorTheme} mr-2 flex-shrink-0`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                   <div className="flex flex-wrap gap-1.5 mb-5 justify-center sm:justify-start">
                      {product.tags.map((tag, i) => (
                        <div key={i} className={`badge badge-sm badge-outline badge-${product.recommended ? product.colorTheme : 'neutral'} font-medium rounded-md`}>{tag}</div>
                      ))}
                    </div>

                  <div className="mt-auto pt-4 border-t border-base-300/40">
                    <div className="text-center mb-3">
                      <div className="text-xs text-base-content/60">起步价</div>
                      <div className={`text-2xl font-bold text-${product.colorTheme}`}>{product.price}</div>
                    </div>
                    <button className={`btn btn-md w-full rounded-lg text-sm font-medium btn-${product.recommended ? product.colorTheme : `outline btn-${product.colorTheme}`} hover:opacity-90 transition-opacity`}>
                      了解详情
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="mb-6 lg:mb-10 py-10 lg:py-14 bg-base-200/50 rounded-2xl shadow-lg">
          <div className="text-center mb-10 lg:mb-14 px-4">
            <h2 className="text-3xl lg:text-4xl font-bold mb-3 text-base-content">为什么选择 isproxy.io?</h2>
            <p className="text-base text-base-content/75 max-w-lg mx-auto">
              我们致力于提供稳定、高效、安全的代理服务，凭借领先技术与卓越服务为您的业务保驾护航。
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 px-4">
            {whyChooseUsPoints.map((point, index) => (
              <div key={index} className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl p-6 border border-base-300/30 transform hover:scale-105">
                <div className="flex flex-col items-center text-center">
                   <div className={`text-3xl mb-4 p-3 bg-${point.theme}/10 text-${point.theme} rounded-full inline-flex`}>{point.icon}</div>
                   <h3 className={`card-title text-lg font-semibold text-base-content mb-2 text-${point.theme}`}>{point.title}</h3>
                   <p className="text-base-content/80 text-sm leading-relaxed">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="mb-6 lg:mb-8 py-12 lg:py-16 bg-gradient-to-r from-primary to-secondary text-primary-content rounded-2xl shadow-xl">
          <div className="text-center px-4">
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-6">准备好开始了吗？</h2>
            <p className="text-lg lg:text-xl mb-8 max-w-xl mx-auto leading-relaxed opacity-90">
              立即注册免费试用，体验 isproxy.io 高质量的代理服务，或联系我们的销售团队获取专属方案。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-neutral btn-lg rounded-xl px-8 text-base font-semibold shadow-md hover:shadow-lg transition-all text-neutral-content transform hover:scale-105">
                免费试用
              </button>
              <button className="btn btn-outline btn-lg border-2 border-primary-content text-primary-content hover:bg-primary-content hover:text-primary rounded-xl px-8 text-base font-semibold transition-all transform hover:scale-105">
                联系销售
              </button>
            </div>
          </div>
      </section>
    </main>

      <footer className="footer p-10 bg-base-200 text-base-content border-t border-base-300/40">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 px-4 sm:px-6 lg:px-8 max-w-6xl">
            <aside className="space-y-2.5 md:col-span-1 lg:col-span-1">
                <a href="#" className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    isproxy.io
                </a>
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
