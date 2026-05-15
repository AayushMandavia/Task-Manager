import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, Search, Filter, Plus, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getTasks } from '../services/api';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchTasks();
  }, [user]);

  const fetchTasks = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const data = await getTasks(user.email);
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-500 bg-green-50';
      case 'in_progress': return 'text-blue-500 bg-blue-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle2 size={16} />;
      case 'in_progress': return <Clock size={16} />;
      default: return <AlertCircle size={16} />;
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold">My Tasks</h2>
          <p className="text-gray-500 mt-1">Manage and track your ongoing projects</p>
        </div>
        <button className="bg-dashboard-dark text-white px-5 py-2.5 rounded-full flex items-center gap-2 text-sm font-medium hover:bg-black transition-colors">
          <Plus size={16} /> New Task
        </button>
      </div>

      <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-dashboard-dark transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-gray-100 hover:bg-gray-50 transition-colors font-medium">
            <Filter size={18} /> Filter
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-dashboard-dark"></div>
          </div>
        ) : filteredTasks.length > 0 ? (
          <div className="space-y-4">
            {filteredTasks.map((task, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                key={task.id} 
                className="flex items-center justify-between p-4 rounded-2xl border border-gray-50 hover:border-dashboard-dark/20 hover:bg-gray-50/50 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${getStatusColor(task.status)}`}>
                    {getStatusIcon(task.status)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{task.title}</h4>
                    <p className="text-sm text-gray-500">{task.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right hidden md:block">
                    <p className="text-xs font-semibold text-gray-400 uppercase">Deadline</p>
                    <p className="text-sm font-medium text-gray-700">{task.deadline || 'No deadline'}</p>
                  </div>
                  <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(task.status)}`}>
                    {task.status.replace('_', ' ')}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckSquare size={32} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No tasks found</h3>
            <p className="text-gray-500">Try adjusting your search or create a new task</p>
          </div>
        )}
      </div>
    </div>
  );
}
