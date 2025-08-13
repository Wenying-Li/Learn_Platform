import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white dark:bg-gray-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">学习助手</h1>
            <div className="space-x-4">
              <Link href="/auth/login" className="btn-secondary">
                登录
              </Link>
              <Link href="/auth/register" className="btn-primary">
                注册
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">打造个性化学习体验</h2>
              <p className="text-lg mb-8">
                利用AI智能助手，根据您的学习风格和目标定制专属学习计划，
                无论您是想学习前端开发、后端技术还是数据科学，我们都能为您提供专业指导。
              </p>
              <Link href="/onboarding" className="btn-primary text-lg px-8 py-3">
                开始学习之旅
              </Link>
            </div>
            <div className="relative h-96">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-10"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 w-4/5">
                  <div className="card transform hover:scale-105 transition-transform">
                    <h3 className="font-bold mb-2">个性化学习计划</h3>
                    <p>根据您的目标和时间安排自动生成学习路径</p>
                  </div>
                  <div className="card transform hover:scale-105 transition-transform">
                    <h3 className="font-bold mb-2">智能测验系统</h3>
                    <p>根据学习内容生成针对性测验，实时评估掌握程度</p>
                  </div>
                  <div className="card transform hover:scale-105 transition-transform">
                    <h3 className="font-bold mb-2">多任务管理</h3>
                    <p>高效管理多个学习项目，合理安排学习时间</p>
                  </div>
                  <div className="card transform hover:scale-105 transition-transform">
                    <h3 className="font-bold mb-2">专业领域AI辅导</h3>
                    <p>各专业领域专属AI智能体提供针对性指导</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">特色功能</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card text-center">
                <div className="mb-4 text-blue-500 flex justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">智能资料收集</h3>
                <p>轻松收集和整理学习资料，自动生成学习大纲</p>
              </div>
              <div className="card text-center">
                <div className="mb-4 text-blue-500 flex justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">日历管理</h3>
                <p>可视化学习日程安排，灵活调整学习计划</p>
              </div>
              <div className="card text-center">
                <div className="mb-4 text-blue-500 flex justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">进度分析与反馈</h3>
                <p>详细的学习进度分析和个性化改进建议</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© 2025 游戏化自学平台 - 让学习更高效</p>
        </div>
      </footer>
    </div>
  );
}