import { useState } from 'react';

interface SurveyStep1Props {
  data: any;
  onNext: (data: any) => void;
}

const SurveyStep1: React.FC<SurveyStep1Props> = ({ data, onNext }) => {
  const [purpose, setPurpose] = useState(data.purpose || '');
  const [topic, setTopic] = useState(data.topic || '');
  const [subTopic, setSubTopic] = useState(data.subTopic || '');
  
  const purposes = [
    { id: 'job', label: '求职/就业' },
    { id: 'skill', label: '技能提升' },
    { id: 'hobby', label: '兴趣爱好' },
    { id: 'school', label: '学校课程' },
    { id: 'certification', label: '资格认证' },
  ];
  
  const topics = [
    { id: 'frontend', label: '前端开发', 
      subTopics: ['HTML/CSS', 'JavaScript', 'React', 'Vue', 'Angular', '小程序开发'] },
    { id: 'backend', label: '后端开发', 
      subTopics: ['Node.js', 'Python', 'Java', 'Go', 'PHP', 'C#', '数据库'] },
    { id: 'datascience', label: '数据科学', 
      subTopics: ['数据分析', '机器学习', '深度学习', '数据可视化', '大数据'] },
    { id: 'mobile', label: '移动开发', 
      subTopics: ['Android', 'iOS', 'React Native', 'Flutter'] },
    { id: 'devops', label: 'DevOps', 
      subTopics: ['Docker', 'Kubernetes', 'CI/CD', '云服务', '网络安全'] },
  ];
  
  const selectedTopicObj = topics.find(t => t.id === topic);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ purpose, topic, subTopic });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">您学习的目的是什么？</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {purposes.map(item => (
              <div 
                key={item.id}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  purpose === item.id 
                    ? 'bg-blue-50 border-blue-500 dark:bg-blue-900 dark:border-blue-400' 
                    : 'border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800'
                }`}
                onClick={() => setPurpose(item.id)}
              >
                <span className="block text-center">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">您想学习的主题领域是？</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {topics.map(item => (
              <div 
                key={item.id}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  topic === item.id 
                    ? 'bg-blue-50 border-blue-500 dark:bg-blue-900 dark:border-blue-400' 
                    : 'border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800'
                }`}
                onClick={() => {
                  setTopic(item.id);
                  setSubTopic(''); // 清空子主题
                }}
              >
                <span className="block text-center">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        {topic && selectedTopicObj?.subTopics && (
          <div>
            <h3 className="text-lg font-medium mb-4">更具体的领域是？</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {selectedTopicObj.subTopics.map(item => (
                <div 
                  key={item}
                  className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                    subTopic === item 
                      ? 'bg-blue-50 border-blue-500 dark:bg-blue-900 dark:border-blue-400' 
                      : 'border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setSubTopic(item)}
                >
                  <span className="block text-center">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="pt-4">
          <button 
            type="submit"
            className="btn-primary w-full"
            disabled={!purpose || !topic}
          >
            下一步
          </button>
        </div>
      </div>
    </form>
  );
};

export default SurveyStep1;