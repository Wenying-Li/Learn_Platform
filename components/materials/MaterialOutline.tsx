interface MaterialOutlineProps {
  outline: {
    title: string;
    description: string;
    sections: {
      title: string;
      topics: string[];
    }[];
    estimatedTime: string;
    difficulty: string;
  };
}

export default function MaterialOutline({ outline }: MaterialOutlineProps) {
  return (
    <div>
      <h3 className="text-xl font-bold mb-2">{outline.title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{outline.description}</p>
      
      <div className="flex justify-between mb-4">
        <div className="bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full text-sm">
          难度: {outline.difficulty}
        </div>
        <div className="bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full text-sm">
          预计时间: {outline.estimatedTime}
        </div>
      </div>
      
      <div className="space-y-4">
        {outline.sections.map((section, index) => (
          <div key={index} className="border-l-4 border-blue-500 pl-4 py-1">
            <h4 className="font-bold mb-2">{section.title}</h4>
            <ul className="space-y-1 list-disc list-inside ml-2">
              {section.topics.map((topic, topicIndex) => (
                <li key={topicIndex} className="text-gray-700 dark:text-gray-300">
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="mt-6 flex justify-end">
        <button className="btn-primary">
          创建学习计划
        </button>
      </div>
    </div>
  );
}