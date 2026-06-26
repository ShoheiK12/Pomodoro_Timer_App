// cd pomodoro-timer-app -> npm run dev

import React from 'react'
import { Link, Outlet } from 'react-router';
import Timer from './components/Timer'
import './App.css'

function App() {
  return (
    
    <div className="app-container">
      <h1>Pomodoro Timer</h1>
      
      {/* Nav */}
      <nav style={{ marginBottom: '30px', padding: '10px', backgroundColor: '#f0f0f0' }}>
        <Link to="/" style={{ marginRight: '15px' }}>⏱️ Timer</Link>
        <Link to="/settings" style={{ marginRight: '15px' }}>⚙️ Settings</Link>
        <Link to="/review">📝 Review</Link>
      </nav>
      
      <Outlet />
    </div>
  )
}

export default App
