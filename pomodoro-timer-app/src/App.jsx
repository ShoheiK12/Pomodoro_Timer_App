// cd pomodoro-timer-app -> npm run dev

import React from 'react'
import { Link, Outlet } from 'react-router';
import Timer from './components/Timer'
import './App.css'

function App() {
  return (
    
    <div className="app-container">
      <h1>Pomodoro Timer</h1>
      
      <nav className="app-nav">
        <Link to="/" className="app-nav-link">⏱️ Timer</Link>
        <Link to="/settings" className="app-nav-link">⚙️ Settings</Link>
        <Link to="/review" className="app-nav-link">📝 Review</Link>
      </nav>
      
      <Outlet />
    </div>
  )
}

export default App
