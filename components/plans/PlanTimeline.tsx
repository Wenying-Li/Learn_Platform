interface PlanTimelineProps {
  phases: any[];
  selectedPhaseId: string;
  onSelectPhase: (phase: any) => void;
}

export default function PlanTimeline({ 
  phases, 
  selectedPhaseId, 
  onSelectPhase 
}: PlanTimelineProps) {
  return (
    <div className="space-y-3">
      <h3 className="font-medium">学习阶段</h3>
      
      {phases.map((phase, index) => (
        <div 
          key={phase.id}
          className={`border rounded-lg p-3 cursor-pointer transition-colors ${
            selectedPhaseId === phase.id 
              ? 'bg-blue-50 border-blue-500 dark:bg-blue-900/40 dark:border-blue-400' 
              : 'border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800'
          }`}
          onClick={() => onSelectPhase(phase)}
        >
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium">
              {index + 1}. {phase.title}
            </h4>
            <span className="text-sm text-gray-500">
              {phase.progress}%
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
            <div 
              className="bg-blue-600 h-1.5 rounded-full" 
              style={{ width: `${phase.progress}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>{new Date(phase.startDate).toLocaleDateString()}</span>
            <span>{new Date(phase.endDate).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
}