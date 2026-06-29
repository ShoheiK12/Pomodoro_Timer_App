import React from 'react';
import { useState } from 'react';
import '../App.css';

function Settings() {
  const [targetTime, setTargetTime] = useState(() => {
    // Load the setting saved in Local Storage (or the default of 120 minutes if it does not exist) as an initial value.
    const savedTime = localStorage.getItem('pomodoro_target_time');
    return savedTime ? Number(savedTime) : 120;
  });
  
  // Set up focus time per session (default 25 mins).
  const [focusTime, setFocusTime] = useState(() => {
    const savedFocus = localStorage.getItem('pomodoro_focus_time');
    return savedFocus ? Number(savedFocus) : 25; 
  });
  
  // Process when the form is submitted (the save button is clicked).
  const handleSubmit = (e) => {
    // Prevent the default browser reload on form submission.
    // -> Because, by default, forms reload the page, which would wipe out the React state and timer count.
    // e: event; button clicked and form submitted
    e.preventDefault();
    
    // Save the total study time as 'pomodoro_target_time'.
    localStorage.setItem('pomodoro_target_time', targetTime);
    
    // Save focus time per session as 'pomodoro_focus_time'.
    localStorage.setItem('pomodoro_focus_time', focusTime);
    
    alert(`Saved your target time successfully.\nToday's target: ${targetTime} mins（${(targetTime / 60).toFixed(1)} hours), Focus time per session: ${focusTime} mins`)
  }
  return (
    <div className="settings-wrapper">
      <h2>Study Time Setting</h2>
      <p>Set your total target study time for today.</p>

      <form onSubmit={handleSubmit} className="settings-form">
        <div className="settings-field-group">
          <label className="settings-label-text">
            Target time by mins: 
            <input 
            type="number" 
            value={targetTime} 
            onChange={(e) => setTargetTime(Number(e.target.value))}
            min="1"
            className="settings-number-input"
            />
          </label>
          <div className="settings-help-text">
            ➔ Conversion from mins to hours: <strong>{(targetTime / 60).toFixed(1)} hours</strong>
          </div>
        </div>
        
        <div className="settings-field-group">
          <label className="settings-label-text">
            Focus time by mins: 
            <input 
              type="number" 
              value={focusTime} 
              onChange={(e) => setFocusTime(Number(e.target.value))}
              min="1"
              className="settings-number-input"
            />
          </label>
          <div className="settings-help-text">
            ➔ Default is 25 mins. This will be recorded in your history.
          </div>
        </div>

        <button type="submit" className="settings-save-button">
          Save the setting
        </button>
      </form>
    </div>
  );
}

export default Settings;