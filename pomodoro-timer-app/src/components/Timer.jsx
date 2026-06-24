import React, { useState, useEffect } from 'react';

function Timer() {
  // Manage remaining time. Set up 25 mins(1500 seconds) as an initial value.
  const [remainingTime, setRemainingTime] = useState(1500);
  // Manage if timer is active or not.
  const [isActive, setIsActive] = useState(false);
  
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
    setRemainingTime(1500); 
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
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