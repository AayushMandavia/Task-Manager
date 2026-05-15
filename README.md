# QueueNest Dashboard

![QueueNest Banner](https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)

QueueNest is a beautiful, responsive, and real-time task management and productivity dashboard built with React and Vite. It features a modern, glassmorphic UI, interactive calendars, statistical tracking, and an intuitive Kanban-style workflow.

**Live Demo:** [https://queuenest.netlify.app/](https://queuenest.netlify.app/)

## ✨ Features

- **Real-Time Task Management:** Create, track, and complete tasks seamlessly.
- **Interactive Calendar:** A fully integrated monthly calendar view with event tracking.
- **Smart Analytics:** Visual statistics and progress tracking for team productivity.
- **Persistent Sessions:** Local caching engine to preserve your session and data without a backend.
- **Modern UI/UX:** Built with Tailwind CSS, featuring subtle animations, glassmorphism, and a polished aesthetic.
- **Responsive Design:** Fully optimized for desktop, tablet, and mobile viewing.

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js installed on your machine.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AayushMandavia/Task-Manager.git
   cd Task-Manager
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the dashboard.

## 🛠️ Technology Stack

- **Frontend Framework:** React + Vite
- **Styling:** Tailwind CSS + Vanilla CSS
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Deployment:** Netlify
- **Backend (Optional):** FastAPI, PostgreSQL, Redis (Configured via Docker)

## 🏗️ Project Structure

```text
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI elements (Header, Sidebar, Modals)
│   │   ├── pages/         # Core views (Dashboard, CalendarPage)
│   │   ├── context/       # State management (AuthContext)
│   │   └── services/      # API integrations and mock persistence
│   ├── package.json
│   └── vite.config.js
├── backend/               # Optional FastAPI backend structure
└── docker-compose.yml     # Infrastructure configuration
```

## 📝 License

This project is licensed under the MIT License.
