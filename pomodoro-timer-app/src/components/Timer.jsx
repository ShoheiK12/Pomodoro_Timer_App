import React, { useState, useEffect } from 'react';
import '../App.css';

// Test
// const focusTime = 3;
// const breakTime = 5;

function Timer() {
  // Load the default values for focus and break intervals from LocalStorage.
  // If no settings, default values of 25 minutes (1,500 seconds) and 5 minutes (300 seconds) will be used.
  const [focusTime, setFocusTime] = useState(() => {
    // Lazy Initialization: Runs only once on the initial render to avoid reading from LocalStorage on every subsequent re-render.
    const savedFocus = localStorage.getItem('pomodoro_focus_time');
    // Convert time from mins to secs. Because remaianingTime using wfocusTime is secs, so focusTime should be secs.
    return savedFocus ? Number(savedFocus) * 60 : 25 * 60; // 
  });

  const [breakTime, setBreakTime] = useState(() => {
    // If no settings, break time is 5 mins (300 secs).
    // Lazy Initialization.
    const savedBreak = localStorage.getItem('pomodoro_break_time');
    return savedBreak ? Number(savedBreak) * 60 : 5 * 60;
  });
  
  // Manage remaining time. Set up focusTime (1500 secs) as an initial value.
  const [remainingTime, setRemainingTime] = useState(focusTime);
  // Manage if timer is active or not.
  const [isActive, setIsActive] = useState(false);
  
  const [mode, setMode] = useState('focus');
  
  const [isMuted, setIsMuted] = useState(false);
  
  const [targetTime, setTargetTime] = useState(() => {
    // Load the setting saved in Local Storage (or the default of 120 minutes if it does not exist) as an initial value.
    const savedTime = localStorage.getItem('pomodoro_target_time');
    return savedTime ? Number(savedTime) : 120; 
  });
  
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
  
  // Mode control between focus or break
  useEffect(() => {
    // if Timer is 0 and timer is active, mode will change.
    if (remainingTime === 0 && isActive) {
      if (!isMuted) {
       // Alarm audio
       const audio = new Audio('/alarm.mp3')
       // Play audio -> If error occurs, display thia error in console.
       audio.play().catch(error => {
        console.log(error);
       }) 
       
       setTimeout(() => {
        // When alert pops up on the screen, alert function stops JavaScript -> Once clicking OK, the next code (audio.pause) will be implemented.-> audio.currentTime = 0; Reset the playback position to 0 seconds.
        alert("Time's up!");
        audio.pause();
        audio.currentTime = 0;
       }, 100);
      } else {
        // When muted, only alert pop-up (no alarm).
        alert("Time's up!");
      }
      
      // Only when focus is done, record the study time.
      if (mode === 'focus') {
        // Load the previously saved history list. If it does not exist, return an empty array [].
        // -> Since LocalStorage always overwrites existing data, if just save new data every time without loading the previous data first, LocalStorage will only ever contain the most recent entry.
        const existingHistory = localStorage.getItem('pomodoro_history');
        
        // If existingHistory is found, convert it into aarray. Otherwise, return an empty array. 
        // .parse: Convert a string retrieved from Local Storage (which was originally an array turned into a string) back into an array that can be used for calculations in JavaScript.
        const historyArray = existingHistory ? JSON.parse(existingHistory) : [];
        
        // Retrieve the latest target time string that the user saved in the settings screen from LocalStorage.
        const savedFocusMinutes = localStorage.getItem('pomodoro_focus_time');
        
        // If savedFocusMinutes, convert it to number. Otherwise, use default (25 mins).
        const minutesToRecord = savedFocusMinutes ? Number(savedFocusMinutes) : 25;
        
        // Add new study history to array.
        historyArray.push(minutesToRecord);
        
        // Convert array into string, and then Save it in Local Storage.
        // .stringify: convert an array into string -> Local Storage can save only sring. 
        localStorage.setItem('pomodoro_history', JSON.stringify(historyArray));
      }
      
      if (mode === 'focus') {
        // Once focus is done, switch to break mode.
        setMode('break');
        setRemainingTime(breakTime);
      } else {
        // Once break is done, switch to focus mode.
        setMode('focus');
        setRemainingTime(focusTime);
      }
      
      // Once mode is changed, timer automatically restarts (5 mins(break) or 25 mis(focus)).  -> If don't want automatic start, then set setIsActive(false).
      setIsActive(true);  
    }
  }, [remainingTime, isActive, mode, isMuted, focusTime, breakTime]);
  
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
    setRemainingTime(mode === 'focus' ? focusTime : breakTime); 
  };
  
  // Skip function for development
  const handleSkip = () => {
    if (isActive) {
      // If timer is active, skip remaining time (remaining time is gonaa be 0 sec).
      setRemainingTime(0);
    } else {
      alert('Unable to skip the remaining time when timer is not active. Please start timer.');
    }
  };

  return (
    <div className="timer-container">
      <div className="target-badge">
        🎯 Today's Study Target : <strong>{targetTime} mins</strong>（{(targetTime / 60).toFixed(1)} hours）
      </div>

      <br />
      
      <strong className={mode === 'focus' ? 'mode-label-focus' : 'mode-label-break'}>
        {mode === 'focus' ? '💻 Study Time' : '☕ Break time'}
      </strong>
      
      <h1>{formatTime(remainingTime)}</h1>
      
      {/* 1. When opening this app, isActive:false
          2. When clicking button, toggleTimer will be active, which means isActive:true  
          3. When isActive:true, 'Pause' will appear.*/}
      <button onClick={toggleTimer} className="timer-button">
        {isActive ? 'Pause' : 'Start'}
      </button>
      
      <button onClick={resetTimer} className="timer-button-secondary">
        Reset
      </button>
      
      <button onClick={() => setIsMuted(!isMuted)} className="timer-button-secondary">
        {isMuted ? '🔇 Unmute' : '🔊 Mute'}
      </button>
      
      {/* Skip button for development/test. */}
      <div className="dev-skip-container">
        <button 
          onClick={handleSkip} className="dev-skip-button">
          ⏩ [Dev] Skip to 0s
        </button>
        <p className="dev-skip-note">
          *Note: This is skip button for development/test. You can force-quit the timer to test the history-saving feature.
        </p>
      </div>
      
    </div>
  );
}

export default Timer;