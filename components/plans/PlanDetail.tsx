interface PlanDetailProps {
  phase: any;
  onUpdateActivity: (activityId: string, completed: boolean) => void;
}

export default function PlanDetail({ phase, onUpdateActivity }: PlanDetailProps) {
  // 根据活动类型返回不同的图标
  const getActivityIcon = (type: string) => {
    switch (type) {
      case '学习':
        return (
          <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case '实践':
        return (
          <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        );
      case '项目':
        return (
          <svg className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      case '测验':
        return (
          <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      default:
        return (
          <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        );
    }
  };

  return (
    <div className="card">
      <div className="mb-6">
        <h2 className="text-xl font-bold">{phase.title}</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-1">{phase.description}</p>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>进度: {phase.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-4">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${phase.progress}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between text-sm">
            <span>开始: {new Date(phase.startDate).toLocaleDateString()}</span>
            <span>结束: {new Date(phase.endDate).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      
      <h3 className="font-bold mb-4">学习活动</h3>
      
      <div className="space-y-4">
        {phase.activities.map(activity => (
          <div 
            key={activity.id}
            className={`border rounded-lg p-4 ${
              activity.completed 
                ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' 
                : 'bg-white dark:bg-gray-800'
            }`}
          >
            <div className="flex items-start">
              <div className="mr-3 mt-0.5">
                {getActivityIcon(activity.type)}
              </div>
              
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">{activity.title}</h4>
                  <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded-full">
                    {activity.type}
                  </span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                  {activity.description}
                </p>
                
                {activity.resources && activity.resources.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-1">学习资源:</p>
                    <ul className="text-sm space-y-1">
                      {activity.resources.map((resource, index) => (
                        <li key={index} className="text-blue-600 dark:text-blue-400 hover:underline">
                          {resource}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="flex justify-between items-center mt-3">
                  <div className="text-sm text-gray-500">
                    <span>日期: {new Date(activity.startDate).toLocaleDateString()}</span>
                    <span className="ml-3">时长: {activity.duration}</span>
                  </div>
                  
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={activity.completed}
                        onChange={(e) => onUpdateActivity(activity.id, e.target.checked)}
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      <span className="ms-3 text-sm font-medium">
                        {activity.completed ? '已完成' : '标记为完成'}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}