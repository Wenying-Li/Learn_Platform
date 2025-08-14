'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import CalendarView from '@/components/calendar/CalendarView';
import EventForm from '@/components/calendar/EventForm';
import EventDetail from '@/components/calendar/EventDetail';

export default function CalendarPage() {
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  // 加载日历事件
  useEffect(() => {
    const savedEvents = localStorage.getItem('calendarEvents');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);
  
  // 处理添加事件
  const handleAddEvent = (newEvent) => {
    const updatedEvents = [...events, {
      id: `event-${Date.now()}`,
      ...newEvent
    }];
    
    setEvents(updatedEvents);
    localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
    setShowEventForm(false);
  };
  
  // 处理更新事件
  const handleUpdateEvent = (updatedEvent) => {
    const updatedEvents = events.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    );
    
    setEvents(updatedEvents);
    localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
    setSelectedEvent(null);
  };
  
  // 处理删除事件
  const handleDeleteEvent = (eventId) => {
    const updatedEvents = events.filter(event => event.id !== eventId);
    
    setEvents(updatedEvents);
    localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
    setSelectedEvent(null);
  };
  
  // 处理选择事件
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };
  
  // 处理选择日期
  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setShowEventForm(true);
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">日历安排</h1>
        <p className="text-gray-600 dark:text-gray-300">
          查看和管理您的学习日程
        </p>
      </div>
      
      <div className="card mb-6">
        <div className="flex flex-wrap items-center justify-between mb-6">
          <div className="flex space-x-2 mb-4 sm:mb-0">
            <button 
              className={`px-3 py-1 rounded-md ${
                view === 'month' 
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200' 
                  : 'bg-gray-100 dark:bg-gray-800'
              }`}
              onClick={() => setView('month')}
            >
              月视图
            </button>
            <button 
              className={`px-3 py-1 rounded-md ${
                view === 'week' 
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200' 
                  : 'bg-gray-100 dark:bg-gray-800'
              }`}
              onClick={() => setView('week')}
            >
              周视图
            </button>
            <button 
              className={`px-3 py-1 rounded-md ${
                view === 'day' 
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200' 
                  : 'bg-gray-100 dark:bg-gray-800'
              }`}
              onClick={() => setView('day')}
            >
              日视图
            </button>
          </div>
          
          <button 
            className="btn-primary"
            onClick={() => {
              setSelectedEvent(null);
              setSelectedDate(new Date());
              setShowEventForm(true);
            }}
          >
            添加事件
          </button>
        </div>
        
        <CalendarView 
          view={view}
          events={events}
          selectedDate={selectedDate}
          onSelectDate={handleSelectDate}
          onSelectEvent={handleSelectEvent}
        />
      </div>
      
      {showEventForm && !selectedEvent && (
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">添加事件</h2>
            <button 
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setShowEventForm(false)}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <EventForm 
            initialDate={selectedDate}
            onSubmit={handleAddEvent}
            onCancel={() => setShowEventForm(false)}
          />
        </div>
      )}
      
      {selectedEvent && (
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">事件详情</h2>
            <button 
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedEvent(null)}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              