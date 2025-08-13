import { useState } from 'react';

interface SurveyStep4Props {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

const SurveyStep4: React.FC<SurveyStep4Props> = ({ data, onNext, onBack }) => {
  const [hasMaterials, setHasMaterials] = useState(data.hasMaterials || false);
  const [resourcePreference, setResourcePreference] = useState(data.resourcePreference || []);
  
  const resourceTypes = [
    { id: 'video', label: '视频教程' },
    { id: 'doc', label: '文档/书籍' },
    { id: 'interactive', label: '交互式教程' },
    { id: 'project', label: '实战项目' },
    { id: 'community', label: '社区讨论' },
    { id: 'mentor', label: '导师辅导' },
  ];
  
  const handleResourcePreferenceChange = (id: string) => {
    if (resourcePreference.includes(id)) {
      setResourcePreference(resourcePreference.filter(item => item !== id));
    } else {
      setResourcePreference([...resourcePreference, id]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ hasMaterials, resourcePreference });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">您是否已有学习资料？</h3>
          <div className="grid grid-cols-2 gap-3">
            <div 
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                hasMaterials === true
                  ? 'bg-blue-50 border-blue-500 dark:bg-blue-900 dark:border-blue-400' 
                  : 'border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800'
              }`}
              onClick={() => setHasMaterials(true)}
            >
              <span className="block text-center">是的，我已有一些资料</span>
            </div>
            <div 
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                hasMaterials === false && hasMaterials !== undefined
                  ? 'bg-blue-50 border-blue-500 dark:bg-blue-900 dark:border-blue-400' 
                  : 'border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800'
              }`}
              onClick={() => setHasMaterials(false)}
            >
              <span className="block text-center">没有，需要帮我收集</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">您喜欢哪种学习资源形式？（可多选）</h3>
          <div className="grid grid-cols-2 gap-3">
            {resourceTypes.map(item => (
              <div 
                key={item.id}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  resourcePreference.includes(item.id) 
                    ? 'bg-blue-50 border-blue-500 dark:bg-blue-900 dark:border-blue-400' 
                    : 'border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800'
                }`}
                onClick={() => handleResourcePreferenceChange(item.id)}
              >
                <span className="block text-center">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <h3 className="font-medium">即将完成！</h3>
          <p>提交后，我们的AI智能体将分析您的偏好并为您生成个性化的学习计划。</p>
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
            disabled={hasMaterials === undefined || resourcePreference.length === 0}
          >
            完成
          </button>
        </div>
      </div>
    </form>
  );
};

export default SurveyStep4;