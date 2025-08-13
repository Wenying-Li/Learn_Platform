interface SurveyProgressProps {
  currentStep: number;
  totalSteps: number;
}

const SurveyProgress: React.FC<SurveyProgressProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">问卷进度</span>
        <span className="text-sm font-medium">{currentStep}/{totalSteps}</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div 
          className="h-2 bg-blue-600 rounded-full transition-all duration-300 ease-in-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SurveyProgress;