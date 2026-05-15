export const authAPI = {
  login: async (email, password) => {
    return { access_token: 'fake-token' };
  },
  register: async (email, password) => {
    return { access_token: 'fake-token' };
  }
};

// Initial mock data for first-time users
const initialTasks = [
  { id: 1, title: 'Build QueueNest UI', status: 'completed', description: 'React design', created_at: new Date().toISOString() },
  { id: 2, title: 'Integrate WebSockets', status: 'completed', description: 'Real-time updates', created_at: new Date().toISOString() },
  { id: 3, title: 'Deploy to Netlify', status: 'in_progress', description: 'Hosting', created_at: new Date().toISOString() },
  { id: 4, title: 'Present to Interviewer', status: 'pending', description: 'Nail it!', created_at: new Date().toISOString() }
];

const getLocalTasks = () => {
  const email = localStorage.getItem('userEmail') || 'guest';
  const allData = JSON.parse(localStorage.getItem('userTasks') || '{}');
  if (!allData[email]) {
    allData[email] = [...initialTasks];
    localStorage.setItem('userTasks', JSON.stringify(allData));
  }
  return allData[email];
};

const saveLocalTasks = (tasks) => {
  const email = localStorage.getItem('userEmail') || 'guest';
  const allData = JSON.parse(localStorage.getItem('userTasks') || '{}');
  allData[email] = tasks;
  localStorage.setItem('userTasks', JSON.stringify(allData));
};

export const taskAPI = {
  getTasks: async () => {
    return getLocalTasks();
  },
  createTask: async (taskData) => {
    const newTask = {
      id: Math.floor(Math.random() * 10000),
      title: taskData.title,
      description: taskData.description,
      status: 'pending',
      created_at: new Date().toISOString()
    };
    
    const tasks = getLocalTasks();
    const updatedTasks = [newTask, ...tasks];
    saveLocalTasks(updatedTasks);

    // Simulate completion
    setTimeout(() => {
      const currentTasks = getLocalTasks();
      const finalTasks = currentTasks.map(t => t.id === newTask.id ? { ...t, status: 'completed' } : t);
      saveLocalTasks(finalTasks);
    }, 5000);

    return newTask;
  },
  deleteTask: async (id) => {
    const tasks = getLocalTasks();
    const updatedTasks = tasks.filter(t => t.id !== id);
    saveLocalTasks(updatedTasks);
    return { success: true };
  }
};

export default {};
