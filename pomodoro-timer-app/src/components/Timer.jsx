import React, { useState, useEffect } from 'react';

function Timer() {
  // Manage remaining time. Set up 25 mins as an initial value.
  const [remainingTime, setRemainingTime] = useState(2500);
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
}