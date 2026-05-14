import React, { useState, useEffect } from 'react';
import { Search, Bell, Plus, Share2, MoreVertical, CheckCircle2, Circle, Edit3, Trash2, Pin, Download, Calendar as CalendarIcon, Play, RefreshCw, BarChart2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';

// Mock Data for Charts
const weeklyData = [
  { name: 'M', sport: 4000, study: 2400 },
  { name: 'T', sport: 3000, study: 1398 },
  { name: 'W', sport: 2000, study: 9800 },
  { name: 'T', sport: 2780, study: 3908 },
  { name: 'F', sport: 1890, study: 4800 },
  { name: 'S', sport: 2390, study: 3800 },
  { name: 'S', sport: 3490, study: 4300 },
];

const monthData = [
  { name: 'Completed', value: 120 },
  { name: 'Remaining', value: 20 },
];
const COLORS = ['#222222', '#f3f4f6'];

export default function Dashboard() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Buy Susan a gift for Bitherday', date: 'Today' },
    { id: 2, title: 'Doctor\'s appointment on Tuesday', date: '02.09.2023' }
  ]);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Hi, Dilan!</h2>
        <div className="flex items-center gap-4">
          <button className="bg-dashboard-dark text-white px-5 py-2.5 rounded-full flex items-center gap-2 text-sm font-medium hover:bg-black transition-colors">
            <Plus size={16} /> Create
          </button>
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-600 hover:text-dashboard-dark">
            <Search size={20} />
          </button>
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-600 hover:text-dashboard-dark relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-dashboard-dark rounded-full"></span>
          </button>
          <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden border-2 border-white shadow-sm">
            <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        
        {/* Overall Information */}
        <div className="col-span-12 md:col-span-4 bg-dashboard-dark rounded-[30px] p-6 text-white relative overflow-hidden">
          {/* Subtle glow effect */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
          
          <div className="flex justify-between items-start mb-6">
            <h3 className="font-semibold text-lg">Overall Information</h3>
            <div className="flex gap-2">
              <button className="text-gray-400 hover:text-white"><Share2 size={18} /></button>
              <button className="text-gray-400 hover:text-white"><MoreVertical size={18} /></button>
            </div>
          </div>
          
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-5xl font-bold block leading-none">43</span>
              <span className="text-xs text-gray-400 mt-2 block">Tasks done<br/>for all time</span>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold block leading-none">2</span>
              <span className="text-xs text-gray-400 mt-2 block">projects are<br/>stopped</span>
            </div>
          </div>

          <div className="flex gap-3">
            {[{num: 28, label: 'Projects'}, {num: 14, label: 'In Progress'}, {num: 11, label: 'Completed'}].map((stat, i) => (
              <div key={i} className="flex-1 bg-white text-dashboard-dark rounded-2xl py-3 px-2 text-center shadow-lg">
                <span className="text-xl font-bold block">{stat.num}</span>
                <span className="text-[10px] text-gray-500 font-medium">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Progress */}
        <div className="col-span-12 md:col-span-5 bg-white/60 backdrop-blur-md rounded-[30px] p-6 shadow-sm border border-white/40">
           <div className="flex justify-between items-center mb-6">
             <div>
               <h3 className="font-semibold text-lg">Weekly progress</h3>
               <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                 <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-dashboard-dark"></div> Sport</span>
                 <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-gray-300"></div> Study</span>
               </div>
             </div>
             <button className="text-gray-400 hover:text-dashboard-dark"><RefreshCw size={18} /></button>
           </div>
           
           <div className="h-40 w-full relative">
              <div className="absolute top-0 right-10 bg-dashboard-dark text-white text-[10px] py-1 px-2 rounded-lg z-10">+24%</div>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorStudy" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f3f4f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#f3f4f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}/>
                  <Area type="monotone" dataKey="study" stroke="#d1d5db" strokeWidth={2} fillOpacity={1} fill="url(#colorStudy)" />
                  <Area type="monotone" dataKey="sport" stroke="#222222" strokeWidth={2} fill="none" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} dy={10} />
                </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Month Progress */}
        <div className="col-span-12 md:col-span-3 bg-white rounded-[30px] p-6 shadow-sm flex flex-col justify-between">
           <div>
             <div className="flex justify-between items-start mb-2">
               <h3 className="font-semibold text-lg">Month progress</h3>
               <button className="text-gray-400"><BarChart2 size={18} /></button>
             </div>
             <p className="text-[10px] text-gray-500 font-medium">+20% compared to last month</p>
           </div>
           
           <div className="flex items-center justify-between">
              <div className="space-y-2">
                 <span className="flex items-center gap-2 text-xs font-medium text-gray-600"><div className="w-1.5 h-1.5 rounded-full bg-dashboard-dark"></div> Sport</span>
                 <span className="flex items-center gap-2 text-xs font-medium text-gray-600"><div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div> Study</span>
                 <span className="flex items-center gap-2 text-xs font-medium text-gray-600"><div className="w-1.5 h-1.5 rounded-full bg-gray-200"></div> Project</span>
              </div>
              <div className="w-24 h-24 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={monthData}
                      innerRadius={30}
                      outerRadius={40}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {monthData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center font-bold text-sm">120%</div>
              </div>
           </div>
           
           <div className="flex items-center gap-2 mt-4">
              <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
                <Share2 size={16} />
              </button>
              <button className="flex-1 border border-gray-200 rounded-full py-2 flex items-center justify-center gap-2 text-sm font-medium hover:bg-gray-50 transition-colors">
                Download Report <Download size={14} />
              </button>
           </div>
        </div>

      </div>

      <div className="grid grid-cols-12 gap-6 mt-6">
        {/* Month Goals */}
        <div className="col-span-12 md:col-span-3 bg-white rounded-[30px] p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg">Month goals:</h3>
            <div className="flex gap-2">
               <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-xs font-bold">14</button>
               <button className="text-gray-400"><Edit3 size={16} /></button>
            </div>
          </div>
          
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <CheckCircle2 className="text-dashboard-dark" size={20} />
              <span className="text-sm font-medium text-dashboard-dark line-through decoration-gray-300">Read 2 books</span>
            </li>
            <li className="flex items-center gap-3">
              <Circle className="text-gray-300" size={20} />
              <span className="text-sm font-medium text-gray-500">Sports every day</span>
            </li>
            <li className="flex items-center gap-3">
              <Circle className="text-gray-300" size={20} />
              <span className="text-sm font-medium text-gray-500">Complete the course</span>
            </li>
            <li className="flex items-center gap-3">
              <Circle className="text-gray-300" size={20} />
              <span className="text-sm font-medium text-gray-500">Bend down with a parachute</span>
            </li>
          </ul>
        </div>

        {/* Task in Process */}
        <div className="col-span-12 md:col-span-9">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg flex items-center gap-2">Task In process <span className="text-gray-400 font-normal">(2)</span></h3>
            <button className="text-sm text-gray-500 hover:text-dashboard-dark font-medium flex items-center gap-1">Open archive &gt;</button>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4">
            {tasks.map((task) => (
              <motion.div 
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[30px] p-6 shadow-sm min-w-[240px] flex flex-col justify-between relative group cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-10 h-10 border border-gray-100 rounded-2xl flex items-center justify-center">
                    <CalendarIcon size={18} className="text-gray-400" />
                  </div>
                  <button className="text-gray-400 group-hover:text-dashboard-dark"><MoreVertical size={18} /></button>
                  
                  {/* Hover Menu Simulation */}
                  <div className="absolute top-12 right-4 bg-dashboard-dark text-white rounded-xl p-2 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity z-10 text-xs w-28">
                    <button className="flex items-center justify-between w-full p-2 hover:bg-white/10 rounded">Pin Note <Pin size={12}/></button>
                    <button className="flex items-center justify-between w-full p-2 hover:bg-white/10 rounded">Edit <Edit3 size={12}/></button>
                    <button className="flex items-center justify-between w-full p-2 hover:bg-white/10 rounded text-red-400">Delete <Trash2 size={12}/></button>
                  </div>
                </div>
                
                <h4 className="font-semibold text-lg mb-6 pr-4 leading-tight">{task.title}</h4>
                
                <div className="flex justify-between items-end mt-auto">
                  <span className="text-xs text-gray-400 font-medium">{task.date}</span>
                  <button className="w-10 h-10 bg-dashboard-dark rounded-2xl flex items-center justify-center text-white hover:bg-black transition-colors">
                    <Bell size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
            
            <button className="min-w-[240px] border-2 border-dashed border-gray-300 rounded-[30px] flex flex-col items-center justify-center text-gray-500 hover:text-dashboard-dark hover:border-dashboard-dark transition-colors gap-2 bg-transparent">
              <Plus size={24} />
              <span className="font-medium">Add task</span>
            </button>
          </div>
        </div>
      </div>

      {/* Last Projects */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-lg">Last Projects</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort by</span>
            <select className="bg-transparent text-sm font-medium outline-none">
               <option>Recent</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-dashboard-dark text-white rounded-[30px] p-6 relative overflow-hidden">
             <div className="flex justify-between items-start mb-8">
               <div>
                 <h4 className="font-semibold text-lg">New Schedule</h4>
                 <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                   <div className="w-1.5 h-1.5 rounded-full bg-white"></div> In progress
                 </div>
               </div>
               <div className="w-10 h-10 border-2 border-gray-600 rounded-full flex items-center justify-center text-[10px] font-bold">2/6</div>
             </div>
             <p className="text-xs text-gray-400 line-clamp-2">Done: Develop a new plan for Alina's education; Print a new timetable; Buy...</p>
          </div>
          
          <div className="bg-dashboard-dark text-white rounded-[30px] p-6 relative overflow-hidden flex flex-col justify-between">
             <div className="flex justify-between items-start">
               <div>
                 <h4 className="font-semibold text-lg">Prototype animation</h4>
                 <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                   <div className="w-1.5 h-1.5 rounded-full bg-white"></div> Completed
                 </div>
               </div>
               <div className="w-10 h-10 border-2 border-gray-600 rounded-full flex items-center justify-center text-[10px] font-bold">1/1</div>
             </div>
          </div>
          
          <div className="bg-dashboard-dark text-white rounded-[30px] p-6 relative overflow-hidden flex flex-col justify-between">
             <div className="flex justify-between items-start">
               <div>
                 <h4 className="font-semibold text-lg">Ai Project 2 part</h4>
                 <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                   <div className="w-1.5 h-1.5 rounded-full bg-white"></div> In progress
                 </div>
               </div>
               <div className="w-10 h-10 border-2 border-gray-600 rounded-full flex items-center justify-center text-[10px] font-bold">2/3</div>
             </div>
          </div>
        </div>
      </div>

    </div>
  );
}
