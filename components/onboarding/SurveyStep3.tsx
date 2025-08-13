import { useState } from 'react';

interface SurveyStep3Props {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

const SurveyStep3: React.FC<SurveyStep3Props> = ({ data, onNext, onBack }) => {
  const [deadline, setDeadline] = useState(data.deadline || '');
  const [targetLevel, setTargetLevel] = useState(data.targetLevel || '');
  const [quizPreference, setQuizPreference] = useState(data.quizPreference || []);
  
  const targetLevels = [
    { id: 'basic', label: '掌握基础知识' },
    { id: 'applied', label: '能够应用解决问题' },
    { id: 'project', label: '能够独立完成项目' },
    { id: 'expert', label: '成为该领域专家' },
    { id: 'teach', label: '能够教授他人' },
  ];
  
  const quizTypes = [
    { id: 'multiple', label: '选择题' },
    { id: 'written', label: '问答题' },
    { id: 'coding', label: '编程题' },
    { id: 'project', label: '项目实战' },
    { id: 'presentation', label: '演示汇报' },
  ];
  
  const handleQuizPreferenceChange = (id: string) => {
    if (quizPreference.includes(id)) {
      setQuizPreference(quizPreference.filter(item => item !== id));
    } else {
      setQuizPreference([...quizPreference, id]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ deadline, targetLevel, quizPreference });
  };
  
  // 生成3个月内的日期选项
  const generateDateOptions = () => {
    const options = [];
    const today = new Date();
    const endDate = new Date();
    endDate.setMonth(today.getMonth() + 3);
    
    for (let date = new Date(today); date <= endDate; date.setDate(date.getDate() + 7)) {
      const dateStr = date.toISOString().split('T')[0];
      const displayDate = new Date(dateStr).toLocaleDateString('zh-CN');
      options.push({ value: dateStr, label: displayDate });
    }
    
    return options;
  };
  
  const dateOptions = generateDateOptions();
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">您希望在什么时间完成学习？</h3>
          <select
            className="input-field"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          >
            <option value="">请选择预计完成日期</option>
            {dateOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">您希望达到什么水平？</h3>
          <div className="grid grid-cols-1 gap-3">
            {targetLevels.map(item => (
              <div 
                key={item.id}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  targetLevel === item.id 
                    ? 'bg-blue-50 border-blue-500 dark:bg-blue-900 dark:border-blue-400' 
                    : 'border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800'
                }`}
                onClick={() => setTargetLevel(item.id)}
              >
                <span className="block">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">您偏好哪些测验类型？（可多选）</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {quizTypes.map(item => (
              <div 
                key={item.id}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  quizPreference.includes(item.id) 
                    ? 'bg-blue-50 border-blue-500 dark:bg-blue-900 dark:border-blue-400' 
                    : 'border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800'
                }`}
                onClick={() => handleQuizPreferenceChange(item.id)}
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
            disabled={!deadline || !targetLevel || quizPreference.length === 0}
          >
            下一步
          </button>
        </div>
      </div>
    </form>
  );
};

export default SurveyStep3;