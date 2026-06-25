import React, { useState, useEffect } from 'react';

// workTime = 1500 secs (25 times x 60 secs), breakTime = 300 secs (5 times x 60 secs)
const workTime = 25 * 60;
const breakTime = 5 * 60;

function Timer() {
  // Manage remaining time. Set up workTime (1500 secs) as an initial value.
  const [remainingTime, setRemainingTime] = useState(workTime);
  // Manage if timer is active or not.
  const [isActive, setIsActive] = useState(false);
  
  const [mode, setMode] = useState('work');
  
  useEffect(() => {
    let intervalId = null;
    
    if(isActive && remainingTime > 0) {
      intervalId = setInterval(() => {
        // Decrease remainingTime by 1 every second
        setRemainingTime((prevSecond) => prevSecond -1);
      }, 1000);
    } else if (isActive && remainingTime === 0) {
      // if timer is active but remaining time is 0, stop timer. 
      setIsActive(false);
    }
    
    // Clean up to prevent memory leak
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isActive, remainingTime]);
  
  // Mode control between work or break
  useEffect(() => {
    // if Timer is 0 and timer is active, mode will change.
    if (remainingTime === 0 && isActive) {
      if (mode === 'work') {
        // Once work is done, switch to break mode.
        setMode('break');
        setRemainingTime(breakTime);
      } else {
        // Once break is done, switch to work mode.
        setMode('work');
        setRemainingTime(workTime);
      }
      
      // Once mode is changed, timer automatically restarts (5 mins(break) or 25 mis(work)).  -> If don't want automatic start, then set setIsActive(false).
      setIsActive(true);
      alert("Time's up!");
    }
  }, [remainingTime, isActive, mode]);
  
  // Display time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // eventHandler for button-click
  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setRemainingTime(mode === 'work' ? workTime : breakTime); 
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <strong className='mode-label' style={{color: mode === 'work' ? '#ff6b6b' : '#34ebae'}}>
        {mode === 'work' ? '💻 Work Time' : '☕ Break time'}
      </strong>
      
      <h1>{formatTime(remainingTime)}</h1>
      
      {/* 1. When opening this app, isActive:false
          2. When clicking button, toggleTimer will be active, which means isActive:true  
          3. When isActive:true, 'Pause' will appear.*/}
      <button onClick={toggleTimer} style={{ marginRight: '10px', padding: '10px 20px' }}>
        {isActive ? 'Pause' : 'Start'}
      </button>
      
      <button onClick={resetTimer} style={{ padding: '10px 20px' }}>
        Reset
      </button>
    </div>
  );
}

export default Timer;