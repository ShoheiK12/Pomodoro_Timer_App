import React, { useState, useEffect } from 'react';
import '../App.css';

function PMDTimer() {
  const [studyTime, setStudyTime] = useState(() => {
    // Lazy Initialization: Runs only once on the initial render to avoid reading from LocalStorage on every subsequent re-render.
    const savedStudy = localStorage.getItem('pomodoro_study_time');
    return savedStudy ? Number(savedStudy) * 60 : 25 * 60; 
  });

  const [breakTime, setBreakTime] = useState(() => {
    // Lazy Initialization.
    const savedBreak = localStorage.getItem('pomodoro_break_time');
    return savedBreak ? Number(savedBreak) * 60 : 5 * 60;
  });
  
  const [remainingTime, setRemainingTime] = useState(studyTime);
  
  const [isActive, setIsActive] = useState(false);
  
  const [mode, setMode] = useState('study');
  
  const [isMuted, setIsMuted] = useState(false);
  
  const [target, setTarget] = useState(() => {
    const targetRec = localStorage.getItem('pomodoro_target_time');
    return targetRec ? Number(targetRec) : 120; 
  });
  
  // Manage the real-time countdown progression and ensures background resources are instantly cleaned up to optimise app performance.
  useEffect(() => {
    let intervalId = null;
    
    if(isActive && remainingTime > 0) {
      intervalId = setInterval(() => {
        setRemainingTime((prevSec) => prevSec -1);
      }, 1000);
    } else if (isActive && remainingTime === 0) {
      setIsActive(false);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isActive, remainingTime]);
  
  // Handle the session completion workflow by triggering audio-visual alerts, keeping study records securely, and transitioning between study and break intervals.
  useEffect(() => {
    if (remainingTime === 0 && isActive) {
      if (!isMuted) {
       const audio = new Audio('/alarm.mp3')
       audio.play();
       
       setTimeout(() => {
        // When alert pops up on the screen, alert function stops JavaScript -> Once clicking OK, the next code (audio.pause) will be implemented.-> audio.currentTime = 0; Reset the playback position to 0 seconds.
        alert("Time's up!");
        audio.pause();
        audio.currentTime = 0;
       }, 100);
      } else {
        alert("Time's up!");
      }
      
      // Only when study is done, record the study time.
      if (mode === 'study') {
        // Load the previously saved history list. If it does not exist, return an empty array []. -> Since LocalStorage always overwrites existing data, if just save new data every time without loading the previous data first, LocalStorage will only ever contain the most recent entry.
        const studyHistory = localStorage.getItem('pomodoro_history');
        
        const historyArr = studyHistory ? JSON.parse(studyHistory) : [];
        
        const savedStudyTime = localStorage.getItem('pomodoro_study_time');

        const studyNum = savedStudyTime ? Number(savedStudyTime) : 25;
        
        historyArr.push(studyNum);
        
        localStorage.setItem('pomodoro_history', JSON.stringify(historyArr));
      }
      
      if (mode === 'study') {
        setMode('break');
        setRemainingTime(breakTime);
      } else {
        setMode('study');
        setRemainingTime(studyTime);
      }
      
      // Once mode is changed, timer automatically restarts (5 mins(break) or 25 mis(study)). -> If don't want automatic start, then set setIsActive(false).
      setIsActive(true);  
    }
  }, [remainingTime, isActive, mode, isMuted, studyTime, breakTime]);
  
  const displayTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetPMD = () => {
    setIsActive(false);
    setRemainingTime(mode === 'study' ? studyTime : breakTime); 
  };
  
  const skipPMD = () => {
    if (isActive) {
      // If timer is active, skip remaining time (remaining time is gonaa be 0 sec).
      setRemainingTime(0);
    } else {
      alert('You cannot skip the remaining time. Please start timer.');
    }
  };

  return (
    <div className="timer-container">
      <div className="target">
        🎯 Today's Study Target : <strong>{target} mins</strong>（{(target / 60).toFixed(1)} hours）
      </div>

      <br />
      
      <strong className={mode === 'study' ? 'study-mode' : 'break-mode'}>
        {mode === 'study' ? '💻 Study Time' : '☕ Break time'}
      </strong>
      
      <h1>{displayTime(remainingTime)}</h1>
      
      <div className="btn-group">
        {/* 1. When opening this app, isActive:false
          2. When clicking button, toggleTimer will be active, which means isActive:true  
          3. When isActive:true, 'Pause' will appear.*/}
        <button onClick={toggleTimer} className="btn">
          {isActive ? 'Pause' : 'Start'}
        </button>
      
        <button onClick={resetPMD} className="btn">
          Reset
        </button>
      
        <button onClick={() => setIsMuted(!isMuted)} className="btn">
          {isMuted ? 'Unmute' : 'Mute'}
        </button>
      </div>
      
      <button onClick={skipPMD} className="skip-button">
        ⏩ Skip to 0s
      </button>

      
    </div>
  );
}

export default PMDTimer;