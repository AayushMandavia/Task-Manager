import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LayoutDashboard, Calendar, CheckSquare, BarChart2, FileText, Settings, Users, Plug } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './context/AuthContext';
import LoginModal from './components/LoginModal';

function Sidebar() {
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, active: true },
    { name: 'Calendar', icon: <Calendar size={20} /> },
    { name: 'My Tasks', icon: <CheckSquare size={20} /> },
    { name: 'Statistics', icon: <BarChart2 size={20} /> },
    { name: 'Documents', icon: <FileText size={20} /> },
  ];

  const integrationItems = [
    { name: 'Slack', icon: <Plug size={20} /> },
    { name: 'Notion', icon: <Plug size={20} /> },
    { name: 'Add new plugin', icon: <Plug size={20} /> },
  ];

  const teamItems = [
    { name: 'SEO', color: 'bg-black' },
    { name: 'Marketing', color: 'bg-gray-400' },
  ];

  return (
    <div className="w-64 bg-white h-screen fixed left-0 top-0 border-r border-gray-100 flex flex-col py-6 px-4">
      <div className="flex items-center gap-2 mb-10 px-2">
        <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
          <span className="text-white font-bold text-xs">QN</span>
        </div>
        <h1 className="text-xl font-bold">QueueNest</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-1 mb-8">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link 
                to="#" 
                className={`flex items-center gap-3 px-4 py-3 rounded-full text-sm font-medium transition-colors ${item.active ? 'bg-dashboard-dark text-white' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mb-8 px-4">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Integrations</h3>
          <ul className="space-y-3">
            {integrationItems.map((item) => (
              <li key={item.name}>
                <Link to="#" className="flex items-center gap-3 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-8 px-4">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Teams</h3>
          <ul className="space-y-3">
            {teamItems.map((item) => (
              <li key={item.name}>
                <Link to="#" className="flex items-center gap-3 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                  <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-auto px-4">
        <Link to="#" className="flex items-center gap-3 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
          <Settings size={20} />
          Settings
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex min-h-screen bg-dashboard-light relative">
          <LoginModal />
          {/* Background gradient effects typical in premium designs */}
          <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
             <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-white opacity-40 blur-[100px]"></div>
             <div className="absolute top-[20%] right-[-10%] w-[30%] h-[50%] rounded-full bg-gray-200 opacity-20 blur-[120px]"></div>
          </div>
          
          <div className="z-10 relative flex w-full max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8">
             {/* Modern App Container */}
             <div className="bg-dashboard-light/80 backdrop-blur-xl border border-white/50 w-full rounded-[40px] shadow-2xl flex overflow-hidden relative">
                <Sidebar />
                <div className="flex-1 ml-64 p-8 overflow-y-auto">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                  </Routes>
                </div>
             </div>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
