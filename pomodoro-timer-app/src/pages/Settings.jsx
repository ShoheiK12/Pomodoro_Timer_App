import React from 'react';
import { useState } from 'react';
import '../App.css';

/*
 Settings - User Configuration Management Component
  
 [Core Features]
 - Configure customised time metrics.
 - Synchronise updated parameters safely into LocalStorage for persistent app settings.
 
 [Data Layer]
 - Lazily hydrates initial input states from LocalStorage with fallback defaults (120 min target / 25 min study).
 
 [Form Submission]
 - `handleSubmit`: 
 1. Neutralises native form reload side-effects via `e.preventDefault()`
 2. Commit updated states to storage
 3. Dispatch a detailed confirmation alert.
 */
function Settings() {
  const [target, setTarget] = useState(() => {
    const targetRec = localStorage.getItem('pomodoro_target_time');
    return targetRec ? Number(targetRec) : 120;
  });
  
  const [studyTime, setStudyTime] = useState(() => {
    const studyRec = localStorage.getItem('pomodoro_study_time');
    return studyRec ? Number(studyRec) : 25; 
  });
  
  const handleSubmit = (e) => {
    // Prevent the default browser reload on form submission. -> By default, forms reload the page, which would wipe out the React state and timer count.
    e.preventDefault();
    
    localStorage.setItem('pomodoro_target_time', target);
    
    localStorage.setItem('pomodoro_study_time', studyTime);
    
    alert(`Saved your target time successfully.\nToday's target: ${target} mins（${(target / 60).toFixed(1)} hours), Study time per session: ${studyTime} mins`)
  }
  
  return (
    <div className="settings-wrapper">
      <h2 className="settings-title">Study Time Setting</h2>

      <form onSubmit={handleSubmit} className="settings-form">
        <div className="settings-field-group">
          <label className="settings-label-text">
            Total target time by mins: 
            <input 
            type="number" 
            value={target} 
            onChange={(e) => setTarget(Number(e.target.value))}
            min="1"
            className="time-input"
            />
          </label>
        </div>
        
        <div className="settings-field-group">
          <label className="settings-label-text">
            Session time by mins: 
            <input 
              type="number" 
              value={studyTime} 
              onChange={(e) => setStudyTime(Number(e.target.value))}
              min="1"
              className="time-input"
            />
          </label>
          <div className="help-text">
            * Default is 25 mins.
          </div> 
        </div>

        <button type="submit" className="settings-save-btn">
          Save the setting
        </button>
      </form>
    </div>
  );
}

export default Settings;