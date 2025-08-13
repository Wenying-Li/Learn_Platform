import Link from 'next/link';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import RecentActivities from '@/components/dashboard/RecentActivities';
import UpcomingTasks from '@/components/dashboard/UpcomingTasks';
import LearningProgress from '@/components/dashboard/LearningProgress';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">学习仪表盘</h1>
        <p className="text-gray-600 dark:text-gray-300">
          欢迎回来！这里是您的学习概览和最新进展。
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          title="学习时长" 
          value="32小时" 
          change="+5小时" 
          changeType="positive" 
          period="本周"
          icon="clock"
        />
        <StatCard 
          title="完成任务" 
          value="12/15" 
          change="80%" 
          changeType="neutral" 
          period="本周计划"
          icon="check-circle"
        />
        <StatCard 
          title="测验成绩" 
          value="85分" 
          change="+10分" 
          changeType="positive" 
          period="较上次"
          icon="star"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="card h-full">
            <h2 className="text-lg font-bold mb-4">学习进度</h2>
            <LearningProgress />
          </div>
        </div>
        <div>
          <div className="card h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">即将到期</h2>
              <Link href="/dashboard/tasks" className="text-blue-600 text-sm hover:underline">
                查看全部
              </Link>
            </div>
            <UpcomingTasks />
          </div>
        </div>
      </div>
      
      <div className="card mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">近期活动</h2>
          <button className="text-blue-600 text-sm hover:underline">
            查看全部
          </button>
        </div>
        <RecentActivities />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-bold mb-4">推荐学习资源</h2>
          <ul className="space-y-3">
            <li className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <h3 className="font-medium">React Hooks 完全指南</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">高效使用React Hooks的最佳实践和示例</p>
            </li>
            <li className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <h3 className="font-medium">Next.js 项目实战</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">从零开始构建一个完整的Next.js应用</p>
            </li>
            <li className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <h3 className="font-medium">TypeScript 高级技巧</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">提升TypeScript开发效率的实用技巧</p>
            </li>
          </ul>
        </div>
        
        <div className="card">
          <h2 className="text-lg font-bold mb-4">学习建议</h2>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg mb-4">
            <h3 className="font-medium mb-2">优化学习计划</h3>
            <p className="text-sm">
              根据您的学习数据，建议增加实践项目的时间，有助于巩固理论知识。
            </p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
            <h3 className="font-medium mb-2">强项：组件设计</h3>
            <p className="text-sm">
              您在React组件设计方面表现出色，可以尝试更复杂的状态管理挑战。
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}