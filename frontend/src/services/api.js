import { collection, addDoc, getDocs, deleteDoc, doc, query, where, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

export const authAPI = {
  login: async (email, password) => {
    return { access_token: 'fake-token' };
  },
  register: async (email, password) => {
    return { access_token: 'fake-token' };
  }
};

export const taskAPI = {
  getTasks: async () => {
    const user = auth.currentUser;
    if (!user) return [];

    const q = query(collection(db, "tasks"), where("userEmail", "==", user.email));
    const querySnapshot = await getDocs(q);
    const tasks = [];
    querySnapshot.forEach((doc) => {
      tasks.push({ id: doc.id, ...doc.data() });
    });
    
    // Sort by created_at descending
    return tasks.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  },
  
  createTask: async (taskData) => {
    const user = auth.currentUser;
    if (!user) throw new Error("Not authenticated");

    const newTaskData = {
      title: taskData.title,
      description: taskData.description,
      status: 'pending',
      created_at: new Date().toISOString(),
      userEmail: user.email
    };

    const docRef = await addDoc(collection(db, "tasks"), newTaskData);
    const newTask = { id: docRef.id, ...newTaskData };

    // Auto-update to completed
    setTimeout(async () => {
      try {
        const taskRef = doc(db, "tasks", docRef.id);
        await updateDoc(taskRef, { status: 'completed' });
      } catch (e) {
        console.error("Failed to auto-update task", e);
      }
    }, 5000);

    return newTask;
  },
  
  deleteTask: async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
      return { success: true };
    } catch (error) {
      console.error("Error deleting task:", error);
      return { success: false };
    }
  }
};

export default {};
