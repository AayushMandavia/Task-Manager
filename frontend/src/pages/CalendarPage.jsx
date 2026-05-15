import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, Search, Bell, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function CalendarPage({ setActiveTab }) {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  // Mock some calendar events based on date
  const getEventsForDay = (day) => {
    const events = [];
    if (day === 4) events.push({ title: "Design Review", time: "10:00 AM", color: "bg-blue-100 text-blue-700" });
    if (day === 12) events.push({ title: "Team Sync", time: "2:00 PM", color: "bg-green-100 text-green-700" });
    if (day === 15) events.push({ title: "Client Pitch", time: "11:30 AM", color: "bg-purple-100 text-purple-700" });
    if (day === 15) events.push({ title: "Lunch", time: "1:00 PM", color: "bg-orange-100 text-orange-700" });
    if (day === 23) events.push({ title: "Deploy Update", time: "4:00 PM", color: "bg-red-100 text-red-700" });
    return events;
  };

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="min-h-[100px] bg-transparent border border-transparent"></div>);
  }
  
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday = i === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear();
    const dayEvents = getEventsForDay(i);
    
    days.push(
      <div key={`day-${i}`} className={`min-h-[120px] p-2 border border-gray-100 bg-white hover:bg-gray-50 transition-colors ${isToday ? 'ring-2 ring-dashboard-dark ring-inset rounded-lg z-10' : 'rounded-lg'}`}>
        <div className={`flex items-center justify-center w-8 h-8 rounded-full mb-1 ${isToday ? 'bg-dashboard-dark text-white font-bold' : 'text-gray-700 font-medium'}`}>
          {i}
        </div>
        <div className="space-y-1 mt-2">
          {dayEvents.map((event, idx) => (
            <div key={idx} className={`px-2 py-1 text-[10px] font-semibold rounded-md flex items-center justify-between ${event.color}`}>
              <span className="truncate">{event.title}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full relative h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Calendar</h2>
        <div className="flex items-center gap-4">
          <button onClick={() => setActiveTab('Dashboard')} className="bg-white text-gray-700 border border-gray-200 px-5 py-2.5 rounded-full flex items-center gap-2 text-sm font-medium hover:bg-gray-50 transition-colors">
            Back to Dashboard
          </button>
          <button className="bg-dashboard-dark text-white px-5 py-2.5 rounded-full flex items-center gap-2 text-sm font-medium hover:bg-black transition-colors">
            <Plus size={16} /> New Event
          </button>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/60 backdrop-blur-md rounded-[30px] p-8 shadow-sm border border-white/40 flex-1 flex flex-col"
      >
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <h3 className="text-2xl font-bold text-gray-800">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <div className="flex gap-2">
              <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 hover:text-dashboard-dark hover:border-dashboard-dark transition-colors">
                <ChevronLeft size={18} />
              </button>
              <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 hover:text-dashboard-dark hover:border-dashboard-dark transition-colors">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
          <div className="flex bg-gray-100 rounded-full p-1">
            <button className="px-4 py-1.5 rounded-full text-sm font-medium bg-white text-dashboard-dark shadow-sm">Month</button>
            <button className="px-4 py-1.5 rounded-full text-sm font-medium text-gray-500 hover:text-gray-700">Week</button>
            <button className="px-4 py-1.5 rounded-full text-sm font-medium text-gray-500 hover:text-gray-700">Day</button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-semibold text-gray-400 py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2 flex-1 auto-rows-fr">
          {days}
        </div>
      </motion.div>
    </div>
  );
}
