'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SurveyStep1 from '@/components/onboarding/SurveyStep1';
import SurveyStep2 from '@/components/onboarding/SurveyStep2';
import SurveyStep3 from '@/components/onboarding/SurveyStep3';
import SurveyStep4 from '@/components/onboarding/SurveyStep4';
import SurveyProgress from '@/components/onboarding/SurveyProgress';

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [surveyData, setSurveyData] = useState({
    purpose: '',
    topic: '',
    subTopic: '',
    currentLevel: '',
    dailyTime: '',
    totalPeriod: '',
    deadline: '',
    targetLevel: '',
    quizPreference: [],
    hasMaterials: false,
    resourcePreference: [],
  });

  const totalSteps = 4;

  const handleNext = (data: Partial<typeof surveyData>) => {
    setSurveyData({ ...surveyData, ...data });
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // 提交数据并跳转
      console.log('提交数据:', { ...surveyData, ...data });
      router.push('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">欢迎使用学习助手</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            请完成以下问卷，我们将为您定制个性化的学习体验
          </p>
        </div>

        <div className="card mb-8">
          <SurveyProgress currentStep={currentStep} totalSteps={totalSteps} />

          <div className="mt-8">
            {currentStep === 1 && (
              <SurveyStep1 
                data={surveyData} 
                onNext={handleNext} 
              />
            )}
            {currentStep === 2 && (
              <SurveyStep2 
                data={surveyData} 
                onNext={handleNext} 
                onBack={handleBack} 
              />
            )}
            {currentStep === 3 && (
              <SurveyStep3 
                data={surveyData} 
                onNext={handleNext} 
                onBack={handleBack} 
              />
            )}
            {currentStep === 4 && (
              <SurveyStep4 
                data={surveyData} 
                onNext={handleNext} 
                onBack={handleBack} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}