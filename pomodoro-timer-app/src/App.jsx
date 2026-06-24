// cd pomodoro-timer-app -> npm run dev

import React from 'react'
import Timer from './components/Timer'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <h1>Pomodoro Timer</h1>
      
      <Timer />
    </div>
  )
}

export default App
