import React, { useState, useEffect } from 'react';
import { Search, Bell, Plus, Share2, MoreVertical, CheckCircle2, Circle, Edit3, Trash2, Pin, Download, Calendar as CalendarIcon, Play, RefreshCw, BarChart2, X } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { taskAPI } from '../services/api';
import { socket } from '../services/socket';
import { useAuth } from '../context/AuthContext';

const weeklyData = [
  { name: 'M', sport: 4000, study: 2400 },
  { name: 'T', sport: 3000, study: 1398 },
  { name: 'W', sport: 2000, study: 9800 },
  { name: 'T', sport: 2780, study: 3908 },
  { name: 'F', sport: 1890, study: 4800 },
  { name: 'S', sport: 2390, study: 3800 },
  { name: 'S', sport: 3490, study: 4300 },
];
const COLORS = ['#222222', '#f3f4f6'];

export default function Dashboard() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const fetchTasks = async () => {
    if (!user) return;
    try {
      const data = await taskAPI.getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    
    // Polling simulation since mock api updates internally after 5s
    const interval = setInterval(() => {
      fetchTasks();
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [user]);

  // Month goals state for interactivity
  const [goals, setGoals] = useState([
    { id: 1, text: "Deploy to Netlify", done: true },
    { id: 2, text: "Finish Frontend UI", done: false },
    { id: 3, text: "Connect Database", done: false },
    { id: 4, text: "Test API Endpoints", done: false },
  ]);

  const toggleGoal = (id) => {
    setGoals(goals.map(g => g.id === id ? { ...g, done: !g.done } : g));
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle) return;
    try {
      const newTask = await taskAPI.createTask({ title: newTaskTitle, description: '', priority: 'medium' });
      setTasks([newTask, ...tasks]);
      setNewTaskTitle('');
      setShowCreateModal(false);
      
      // We removed auto-refresh since socket.io handles it natively now.
    } catch (error) {
      console.error("Failed to create task", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await taskAPI.deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Calculate metrics
  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const inProgressCount = tasks.filter(t => t.status === 'in_progress').length;
  const pendingCount = tasks.filter(t => t.status === 'pending').length;
  const monthData = [
    { name: 'Completed', value: completedCount || 1 },
    { name: 'Remaining', value: (tasks.length - completedCount) || 1 },
  ];
  const percentComplete = tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="w-full relative" onClick={() => { setShowProfileMenu(false); setShowNotifications(false); setShowShareMenu(false); }}>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Hi, Aayush!</h2>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-dashboard-dark text-white px-5 py-2.5 rounded-full flex items-center gap-2 text-sm font-medium hover:bg-black transition-colors"
          >
            <Plus size={16} /> Create
          </button>
          
          {isSearching ? (
             <div className="relative flex items-center">
               <input 
                 type="text" 
                 autoFocus 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 onBlur={() => {
                   if (!searchQuery) setIsSearching(false);
                 }} 
                 placeholder="Search tasks..." 
                 className="pl-10 pr-4 py-2 w-48 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-dashboard-dark text-sm" 
               />
               <Search size={16} className="absolute left-4 text-gray-400" />
             </div>
          ) : (
            <button onClick={(e) => { e.stopPropagation(); setIsSearching(true); }} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-600 hover:text-dashboard-dark">
              <Search size={20} />
            </button>
          )}

          <div className="relative">
            <button onClick={(e) => { e.stopPropagation(); setShowNotifications(!showNotifications); setShowProfileMenu(false); }} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-600 hover:text-dashboard-dark relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-dashboard-dark rounded-full"></span>
            </button>
            {showNotifications && (
              <div className="absolute top-12 right-0 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50" onClick={e => e.stopPropagation()}>
                <h4 className="font-bold text-sm mb-3">Notifications</h4>
                <div className="text-xs text-gray-500 py-2 border-b border-gray-100 flex items-center gap-2"><div className="w-2 h-2 bg-dashboard-dark rounded-full"></div> System updated successfully</div>
                <div className="text-xs text-gray-500 py-2 flex items-center gap-2"><div className="w-2 h-2 bg-dashboard-dark rounded-full"></div> 2 tasks pending review</div>
              </div>
            )}
          </div>

          <div className="relative">
            <button onClick={(e) => { e.stopPropagation(); setShowProfileMenu(!showProfileMenu); setShowNotifications(false); }} className="w-10 h-10 bg-dashboard-dark text-white rounded-full flex items-center justify-center font-bold border-2 border-white shadow-sm hover:ring-2 hover:ring-gray-200 transition-all">
              A
            </button>
            {showProfileMenu && (
              <div className="absolute top-12 right-0 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50" onClick={e => e.stopPropagation()}>
                <div className="px-4 py-2 border-b border-gray-50">
                  <p className="text-sm font-bold">Aayush Mandavia</p>
                  <p className="text-xs text-gray-500">aayush@demo.com</p>
                </div>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Profile Settings</button>
                <button className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50">Log Out</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Overall Information */}
        <div className="col-span-12 md:col-span-4 bg-dashboard-dark rounded-[30px] p-6 text-white relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
          
          <div className="flex justify-between items-start mb-6 relative z-10">
            <h3 className="font-semibold text-lg">Overall Information</h3>
            <div className="flex gap-2 relative">
              <button onClick={(e) => { e.stopPropagation(); setShowShareMenu(!showShareMenu); }} className="text-gray-400 hover:text-white"><Share2 size={18} /></button>
              <button className="text-gray-400 hover:text-white"><MoreVertical size={18} /></button>
              
              {showShareMenu && (
                 <div className="absolute top-6 right-0 w-32 bg-white text-gray-800 rounded-xl shadow-xl py-2 z-50" onClick={e => e.stopPropagation()}>
                    <button className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50 flex items-center gap-2"><Share2 size={12}/> Copy Link</button>
                    <button className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50 flex items-center gap-2"><Download size={12}/> Export CSV</button>
                 </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-between items-end mb-8 relative z-10">
            <div>
              <span className="text-5xl font-bold block leading-none">{completedCount}</span>
              <span className="text-xs text-gray-400 mt-2 block">Tasks done<br/>for all time</span>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold block leading-none">{pendingCount}</span>
              <span className="text-xs text-gray-400 mt-2 block">projects are<br/>pending</span>
            </div>
          </div>

          <div className="flex gap-3">
            {[{num: tasks.length, label: 'Projects'}, {num: inProgressCount, label: 'In Progress'}, {num: completedCount, label: 'Completed'}].map((stat, i) => (
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
             <button onClick={fetchTasks} className="text-gray-400 hover:text-dashboard-dark"><RefreshCw size={18} /></button>
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
             <p className="text-[10px] text-gray-500 font-medium">Task Completion Ratio</p>
           </div>
           
           <div className="flex items-center justify-between">
              <div className="space-y-2">
                 <span className="flex items-center gap-2 text-xs font-medium text-gray-600"><div className="w-1.5 h-1.5 rounded-full bg-dashboard-dark"></div> Done</span>
                 <span className="flex items-center gap-2 text-xs font-medium text-gray-600"><div className="w-1.5 h-1.5 rounded-full bg-gray-200"></div> Left</span>
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
                <div className="absolute inset-0 flex items-center justify-center font-bold text-sm">{percentComplete}%</div>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 mt-6">
        {/* Month Goals */}
        <div className="col-span-12 md:col-span-3 bg-white rounded-[30px] p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg">Month goals:</h3>
            <div className="flex gap-2">
               <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-xs font-bold">{goals.length}</button>
               <button className="text-gray-400"><Edit3 size={16} /></button>
            </div>
          </div>
          
          <ul className="space-y-4">
            {goals.map(goal => (
              <li key={goal.id} className="flex items-center gap-3 cursor-pointer" onClick={() => toggleGoal(goal.id)}>
                {goal.done ? (
                  <CheckCircle2 className="text-dashboard-dark" size={20} />
                ) : (
                  <Circle className="text-gray-300" size={20} />
                )}
                <span className={`text-sm font-medium ${goal.done ? 'text-dashboard-dark line-through decoration-gray-300' : 'text-gray-500'}`}>
                  {goal.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Task in Process */}
        <div className="col-span-12 md:col-span-9">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg flex items-center gap-2">All Tasks <span className="text-gray-400 font-normal">({tasks.length})</span></h3>
            <button className="text-sm text-gray-500 hover:text-dashboard-dark font-medium flex items-center gap-1">Open archive &gt;</button>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4">
            {tasks.filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase())).map((task) => (
              <motion.div 
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[30px] p-6 shadow-sm min-w-[260px] flex flex-col justify-between relative group cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-10 h-10 border border-gray-100 rounded-2xl flex items-center justify-center">
                    <CalendarIcon size={18} className="text-gray-400" />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`text-[10px] px-2 py-1 rounded-full font-semibold uppercase tracking-wide
                      ${task.status === 'completed' ? 'bg-green-100 text-green-700' : 
                        task.status === 'in_progress' ? 'bg-blue-100 text-blue-700' : 
                        task.status === 'failed' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                      {task.status.replace('_', ' ')}
                    </span>
                  </div>
                  
                  {/* Hover Menu */}
                  <div className="absolute top-12 right-4 bg-dashboard-dark text-white rounded-xl p-2 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity z-10 text-xs w-28">
                    <button onClick={() => handleDeleteTask(task.id)} className="flex items-center justify-between w-full p-2 hover:bg-white/10 rounded text-red-400">Delete <Trash2 size={12}/></button>
                  </div>
                </div>
                
                <h4 className="font-semibold text-lg mb-6 pr-4 leading-tight">{task.title}</h4>
                
                <div className="flex justify-between items-end mt-auto">
                  <span className="text-xs text-gray-400 font-medium">{new Date(task.created_at).toLocaleDateString()}</span>
                  <button className="w-10 h-10 bg-dashboard-dark rounded-2xl flex items-center justify-center text-white hover:bg-black transition-colors">
                    <Bell size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
            
            <button 
              onClick={() => setShowCreateModal(true)}
              className="min-w-[260px] border-2 border-dashed border-gray-300 rounded-[30px] flex flex-col items-center justify-center text-gray-500 hover:text-dashboard-dark hover:border-dashboard-dark transition-colors gap-2 bg-transparent">
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
          {tasks.slice(0, 3).map((task, i) => (
            <div key={task.id} className="bg-dashboard-dark text-white rounded-[30px] p-6 relative overflow-hidden flex flex-col justify-between">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h4 className="font-semibold text-lg pr-4">{task.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                    <div className={`w-1.5 h-1.5 rounded-full ${task.status === 'completed' ? 'bg-green-400' : task.status === 'in_progress' ? 'bg-blue-400' : 'bg-white'}`}></div> 
                    {task.status.replace('_', ' ')}
                  </div>
                </div>
                <div className="w-10 h-10 border-2 border-gray-600 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">
                  {task.status === 'completed' ? '1/1' : '0/1'}
                </div>
              </div>
              <p className="text-xs text-gray-400 line-clamp-2 mt-4">
                Task created on {new Date(task.created_at).toLocaleDateString()}. Currently {task.status.replace('_', ' ')}.
              </p>
            </div>
          ))}
          {tasks.length === 0 && (
            <div className="col-span-3 text-center text-gray-400 py-10">No tasks created yet.</div>
          )}
        </div>
      </div>

      {/* Create Task Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[30px] p-8 w-full max-w-md shadow-2xl relative"
          >
            <button onClick={() => setShowCreateModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-black">
              <X size={20} />
            </button>
            <h2 className="text-2xl font-bold mb-6">Create New Task</h2>
            <form onSubmit={handleCreateTask}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Task Title</label>
                <input 
                  autoFocus
                  type="text" 
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-dashboard-dark"
                  placeholder="e.g., Deploy to Netlify"
                />
              </div>
              <button 
                type="submit" 
                disabled={!newTaskTitle}
                className="w-full bg-dashboard-dark text-white py-3 rounded-full font-medium hover:bg-black transition-colors disabled:opacity-50"
              >
                Dispatch Task to Workers
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
