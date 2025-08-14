'use client';

import { useState } from 'react';

interface PlanGeneratorProps {
  userProfile: any;
  learningOutline: any;
  onGenerate: (planData: any) => void;
  isGenerating: boolean;
}

export default function PlanGenerator({ 
  userProfile, 
  learningOutline,
  onGenerate,
  isGenerating 
}: PlanGeneratorProps) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dailyHours, setDailyHours] = useState('');
  const [focusAreas, setFocusAreas] = useState<string[]>([]);
  
  // 从大纲中提取潜在的重点领域
  const potentialFocusAreas = learningOutline 
    ? learningOutline.sections.flatMap(section => section.topics) 
    : [];
  
  const handleFocusAreaToggle = (area: string) => {
    if (focusAreas.includes(area)) {
      setFocusAreas(focusAreas.filter(a => a !== area));
    } else {
      setFocusAreas([...focusAreas, area]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onGenerate({
      startDate,
      endDate,
      dailyHours: Number(dailyHours),
      focusAreas
    });
  };
  
  // 生成日期选择器的最小日期（今天）
  const today = new Date().toISOString().split('T')[0];
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {!userProfile && (
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg mb-4">
          <p className="text-yellow-800 dark:text-yellow-200">
            请先完成学习需求问卷，以便我们为您生成更精准的学习计划。
          </p>
        </div>
      )}
      
      {!learningOutline && (
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg mb-4">
          <p className="text-yellow-800 dark:text-yellow-200">
            请先在"学习资料"页面生成学习大纲，以便我们为您制定详细的学习计划。
          </p>
        </div>
      )}
      
      <div>
        <label className="block font-medium mb-2">学习开始日期</label>
        <input
          type="date"
          className="input-field"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          min={today}
          required
        />
      </div>
      
      <div>
        <label className="block font-medium mb-2">计划完成日期</label>
        <input
          type="date"
          className="input-field"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          min={startDate || today}
          required
        />
      </div>
      
      <div>
        <label className="block font-medium mb-2">每日学习时间（小时）</label>
        <input
          type="number"
          className="input-field"
          value={dailyHours}
          onChange={(e) => setDailyHours(e.target.value)}
          min="0.5"
          max="12"
          step="0.5"
          required
        />
      </div>
      
      {potentialFocusAreas.length > 0 && (
        <div>
          <label className="block font-medium mb-2">重点关注领域（可多选）</label>
          <div className="grid grid-cols-2 gap-2">
            {potentialFocusAreas.map((area, index) => (
              <div 
                key={index}
                className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                  focusAreas.includes(area) 
                    ? 'bg-blue-50 border-blue-500 dark:bg-blue-900/40 dark:border-blue-400' 
                    : 'border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800'
                }`}
                onClick={() => handleFocusAreaToggle(area)}
              >
                <span className="block text-center">{area}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="pt-4">
        <button 
          type="submit"
          className="btn-primary w-full"
          disabled={isGenerating || !startDate || !endDate || !dailyHours || (!userProfile && !learningOutline)}
        >
          {isGenerating ? '正在生成学习计划...' : '生成学习计划'}
        </button>
      </div>
    </form>
  );
}