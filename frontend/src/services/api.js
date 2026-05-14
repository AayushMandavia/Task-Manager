export const authAPI = {
  login: async (email, password) => {
    return { access_token: 'fake-token' };
  },
  register: async (email, password) => {
    return { access_token: 'fake-token' };
  }
};

let mockTasks = [
  { id: 1, title: 'Build QueueNest UI', status: 'completed', description: 'React design', created_at: new Date().toISOString() },
  { id: 2, title: 'Integrate WebSockets', status: 'completed', description: 'Real-time updates', created_at: new Date().toISOString() },
  { id: 3, title: 'Deploy to Netlify', status: 'in_progress', description: 'Hosting', created_at: new Date().toISOString() },
  { id: 4, title: 'Present to Interviewer', status: 'pending', description: 'Nail it!', created_at: new Date().toISOString() }
];

export const taskAPI = {
  getTasks: async () => {
    return [...mockTasks];
  },
  createTask: async (taskData) => {
    const newTask = {
      id: Math.floor(Math.random() * 10000),
      title: taskData.title,
      description: taskData.description,
      status: 'pending',
      created_at: new Date().toISOString()
    };
    mockTasks.unshift(newTask);
    
    // Simulate background worker finishing task
    setTimeout(() => {
      newTask.status = 'completed';
      // We rely on Dashboard polling or socket, but since this is mocked, we can't emit. 
      // But we can update the array so next fetch gets it.
    }, 5000);

    return newTask;
  },
  deleteTask: async (id) => {
    mockTasks = mockTasks.filter(t => t.id !== id);
    return { success: true };
  }
};

export default {};
