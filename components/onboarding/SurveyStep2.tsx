import { useState } from 'react';

interface SurveyStep2Props {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

const SurveyStep2: React.FC<SurveyStep2Props> = ({ data, onNext, onBack }) => {
  const [currentLevel, setCurrentLevel] = useState(data.currentLevel || '');
  const [dailyTime, setDailyTime] = useState(data.dailyTime || '');
  const [totalPeriod, setTotalPeriod] = useState(data.totalPeriod || '');
  
  const levels = [
    { id: 'beginner', label: '初学者（完全没有基础）' },
    { id: 'novice', label: '新手（有一些基础知识）' },
    { id: 'intermediate', label: '中级（能够解决简单问题）' },
    { id: 'advanced', label: '高级（有一定项目经验）' },
    { id: 'expert', label: '专家（有丰富经验）' },
  ];
  
  const timeOptions = [
    { id: 'less1', label: '少于1小时/天' },
    { id: '1to2', label: '1-2小时/天' },
    { id: '2to4', label: '2-4小时/天' },
    { id: 'more4', label: '4小时以上/天' },
  ];
  
  const periodOptions = [
    { id: 'less1m', label: '少于1个月' },
    { id: '1to3m', label: '1-3个月' },
    { id: '3to6m', label: '3-6个月' },
    { id: '6to12m', label: '6-12个月' },
    { id: 'more12m', label: '1年以上' },
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ currentLevel, dailyTime, totalPeriod });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">您当前的水平是？</h3>
          <div className="grid grid-cols-1 gap-3">
            {levels.map(item => (
              <div 
                key={item.id}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  currentLevel === item.id 
                    ? 'bg-blue-50 border-blue-500 dark:bg-blue-900 dark:border-blue-400' 
                    : 'border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800'
                }`}
                onClick={() => setCurrentLevel(item.id)}
              >
                <span className="block">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">您每天可以投入多少时间学习？</h3>
          <div className="grid grid-cols-2 gap-3">
            {timeOptions.map(item => (
              <div 
                key={item.id}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  dailyTime === item.id 
                    ? 'bg-blue-50 border-blue-500 dark:bg-blue-900 dark:border-blue-400' 
                    : 'border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800'
                }`}
                onClick={() => setDailyTime(item.id)}
              >
                <span className="block text-center">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">您计划的总学习周期是？</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {periodOptions.map(item => (
              <div 
                key={item.id}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  totalPeriod === item.id 
                    ? 'bg-blue-50 border-blue-500 dark:bg-blue-900 dark:border-blue-400' 
                    : 'border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800'
                }`}
                onClick={() => setTotalPeriod(item.id)}
              >
                <span className="block text-center">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="pt-4 flex space-x-4">
          <button 
            type="button"
            className="btn-secondary w-1/2"
            onClick={onBack}
          >
            上一步
          </button>
          <button 
            type="submit"
            className="btn-primary w-1/2"
            disabled={!currentLevel || !dailyTime || !totalPeriod}
          >
            下一步
          </button>
        </div>
      </div>
    </form>
  );
};

export default SurveyStep2;