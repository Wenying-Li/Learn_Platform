'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PlanGenerator from '@/components/plans/PlanGenerator';
import PlanTimeline from '@/components/plans/PlanTimeline';
import PlanDetail from '@/components/plans/PlanDetail';
import { callAgent } from '@/lib/ai-agents';

export default function PlansPage() {
  const [userProfile, setUserProfile] = useState(null);
  const [learningOutline, setLearningOutline] = useState(null);
  const [learningPlan, setLearningPlan] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState(null);
  
  // 加载用户配置和学习大纲
  useEffect(() => {
    const profile = localStorage.getItem('userProfile');
    const outline = localStorage.getItem('learningOutline');
    const plan = localStorage.getItem('learningPlan');
    
    if (profile) {
      setUserProfile(JSON.parse(profile));
    }
    
    if (outline) {
      setLearningOutline(JSON.parse(outline));
    }
    
    if (plan) {
      setLearningPlan(JSON.parse(plan));
      if (JSON.parse(plan).phases.length > 0) {
        setSelectedPhase(JSON.parse(plan).phases[0]);
      }
    }
  }, []);
  
  // 生成学习计划
  const generateLearningPlan = async (planData) => {
    setIsGenerating(true);
    
    try {
      // 获取用户学习主题
      const topic = userProfile?.topic || 'frontend';
      
      // 调用AI智能体生成学习计划
      const response = await callAgent(topic, {
        action: 'generatePlan',
        profile: userProfile,
        outline: learningOutline,
        planData
      });
      
      if (response.plan) {
        setLearningPlan(response.plan);
        setSelectedPhase(response.plan.phases[0]);
        
        // 保存到本地存储
        localStorage.setItem('learningPlan', JSON.stringify(response.plan));
        
        // 同时将学习计划添加到日历
        const calendarEvents = [];
        
        response.plan.phases.forEach(phase => {
          phase.activities.forEach(activity => {
            calendarEvents.push({
              id: `plan-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              title: activity.title,
              description: activity.description,
              start: activity.startDate,
              end: activity.endDate || activity.startDate,
              type: 'learning-activity',
              phase: phase.title,
              completed: false
            });
          });
        });
        
        // 保存日历事件
        const existingEvents = JSON.parse(localStorage.getItem('calendarEvents') || '[]');
        localStorage.setItem('calendarEvents', JSON.stringify([...existingEvents, ...calendarEvents]));
      }
    } catch (error) {
      console.error('生成学习计划失败:', error);
      
      // 模拟生成的学习计划
      const startDate = new Date();
      const today = startDate.toISOString().split('T')[0];
      
      let nextDate = new Date(startDate);
      nextDate.setDate(nextDate.getDate() + 7);
      const weekLater = nextDate.toISOString().split('T')[0];
      
      nextDate = new Date(startDate);
      nextDate.setDate(nextDate.getDate() + 14);
      const twoWeeksLater = nextDate.toISOString().split('T')[0];
      
      nextDate = new Date(startDate);
      nextDate.setDate(nextDate.getDate() + 21);
      const threeWeeksLater = nextDate.toISOString().split('T')[0];
      
      const plan = {
        title: "前端开发学习计划",
        description: "从基础到进阶的React开发学习路径",
        startDate: today,
        endDate: threeWeeksLater,
        phases: [
          {
            id: "phase1",
            title: "HTML/CSS基础",
            description: "掌握网页结构和样式的基础知识",
            startDate: today,
            endDate: weekLater,
            progress: 0,
            activities: [
              {
                id: "activity1",
                title: "HTML基础学习",
                description: "学习HTML标签、属性和文档结构",
                type: "学习",
                resources: ["MDN Web文档 - HTML基础"],
                startDate: today,
                duration: "2小时",
                completed: false
              },
              {
                id: "activity2",
                title: "CSS基础学习",
                description: "学习CSS选择器、属性和布局基础",
                type: "学习",
                resources: ["MDN Web文档 - CSS基础"],
                startDate: today,
                duration: "2小时",
                completed: false
              },
              {
                id: "activity3",
                title: "构建简单网页",
                description: "综合运用HTML和CSS构建简单页面",
                type: "实践",
                resources: ["练习材料"],
                startDate: weekLater,
                duration: "3小时",
                completed: false
              }
            ]
          },
          {
            id: "phase2",
            title: "JavaScript基础",
            description: "掌握JavaScript语言基础和DOM操作",
            startDate: weekLater,
            endDate: twoWeeksLater,
            progress: 0,
            activities: [
              {
                id: "activity4",
                title: "JavaScript语法基础",
                description: "学习变量、数据类型、函数和控制流",
                type: "学习",
                resources: ["MDN Web文档 - JavaScript基础"],
                startDate: weekLater,
                duration: "3小时",
                completed: false
              },
              {
                id: "activity5",
                title: "DOM操作",
                description: "学习如何使用JavaScript操作DOM元素",
                type: "学习",
                resources: ["JavaScript DOM操作教程"],
                startDate: weekLater,
                duration: "2小时",
                completed: false
              },
              {
                id: "activity6",
                title: "交互式网页项目",
                description: "创建简单的交互式网页",
                type: "项目",
                resources: ["项目指南"],
                startDate: twoWeeksLater,
                duration: "5小时",
                completed: false
              }
            ]
          },
          {
            id: "phase3",
            title: "React基础",
            description: "学习React框架的核心概念和组件开发",
            startDate: twoWeeksLater,
            endDate: threeWeeksLater,
            progress: 0,
            activities: [
              {
                id: "activity7",
                title: "React基础概念",
                description: "学习React的核心概念和JSX语法",
                type: "学习",
                resources: ["React官方文档"],
                startDate: twoWeeksLater,
                duration: "3小时",
                completed: false
              },
              {
                id: "activity8",
                title: "组件开发",
                description: "学习React组件的创建和使用",
                type: "学习",
                resources: ["React组件教程"],
                startDate: twoWeeksLater,
                duration: "3小时",
                completed: false
              },
              {
                id: "activity9",
                title: "React项目实战",
                description: "构建一个简单的React应用",
                type: "项目",
                resources: ["React项目指南"],
                startDate: threeWeeksLater,
                duration: "6小时",
                completed: false
              }
            ]
          }
        ]
      };
      
      setLearningPlan(plan);
      setSelectedPhase(plan.phases[0]);
      
      // 保存到本地存储
      localStorage.setItem('learningPlan', JSON.stringify(plan));
      
      // 同时将学习计划添加到日历
      const calendarEvents = [];
      
      plan.phases.forEach(phase => {
        phase.activities.forEach(activity => {
          calendarEvents.push({
            id: `plan-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            title: activity.title,
            description: activity.description,
            start: activity.startDate,
            end: activity.startDate,
            type: 'learning-activity',
            phase: phase.title,
            completed: activity.completed
          });
        });
      });
      
      // 保存日历事件
      const existingEvents = JSON.parse(localStorage.getItem('calendarEvents') || '[]');
      localStorage.setItem('calendarEvents', JSON.stringify([...existingEvents, ...calendarEvents]));
    } finally {
      setIsGenerating(false);
    }
  };
  
  // 更新活动完成状态
  const updateActivityStatus = (phaseId, activityId, completed) => {
    const updatedPlan = { ...learningPlan };
    
    const phaseIndex = updatedPlan.phases.findIndex(p => p.id === phaseId);
    if (phaseIndex !== -1) {
      const activityIndex = updatedPlan.phases[phaseIndex].activities.findIndex(a => a.id === activityId);
      if (activityIndex !== -1) {
        updatedPlan.phases[phaseIndex].activities[activityIndex].completed = completed;
        
        // 更新阶段进度
        const phaseActivities = updatedPlan.phases[phaseIndex].activities;
        const completedActivities = phaseActivities.filter(a => a.completed).length;
        updatedPlan.phases[phaseIndex].progress = Math.round((completedActivities / phaseActivities.length) * 100);
        
        setLearningPlan(updatedPlan);
        
        // 如果当前选中的是被更新的阶段，更新选中的阶段
        if (selectedPhase && selectedPhase.id === phaseId) {
          setSelectedPhase(updatedPlan.phases[phaseIndex]);
        }
        
        // 保存到本地存储
        localStorage.setItem('learningPlan', JSON.stringify(updatedPlan));
        
        // 更新日历事件
        const calendarEvents = JSON.parse(localStorage.getItem('calendarEvents') || '[]');
        const updatedEvents = calendarEvents.map(event => {
          if (event.type === 'learning-activity' && 
              event.title === updatedPlan.phases[phaseIndex].activities[activityIndex].title) {
            return { ...event, completed };
          }
          return event;
        });
        localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">学习计划</h1>
        <p className="text-gray-600 dark:text-gray-300">
          根据您的目标和时间安排生成个性化学习计划
        </p>
      </div>
      
      {!learningPlan ? (
        <div className="card">
          <h2 className="text-xl font-bold mb-6">创建学习计划</h2>
          <PlanGenerator 
            userProfile={userProfile} 
            learningOutline={learningOutline}
            onGenerate={generateLearningPlan}
            isGenerating={isGenerating}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="card sticky top-6">
              <h2 className="text-xl font-bold mb-4">{learningPlan.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{learningPlan.description}</p>
              
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-1">
                  <span>开始: {new Date(learningPlan.startDate).toLocaleDateString()}</span>
                  <span>结束: {new Date(learningPlan.endDate).toLocaleDateString()}</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ 
                      width: `${Math.round(
                        learningPlan.phases.reduce((acc, phase) => acc + phase.progress, 0) / 
                        learningPlan.phases.length
                      )}%` 
                    }}
                  ></div>
                </div>
              </div>
              
              <PlanTimeline 
                phases={learningPlan.phases}
                selectedPhaseId={selectedPhase?.id}
                onSelectPhase={(phase) => setSelectedPhase(phase)}
              />
            </div>
          </div>
          
          <div className="lg:col-span-2">
            {selectedPhase && (
              <PlanDetail 
                phase={selectedPhase}
                onUpdateActivity={(activityId, completed) => 
                  updateActivityStatus(selectedPhase.id, activityId, completed)
                }
              />
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}