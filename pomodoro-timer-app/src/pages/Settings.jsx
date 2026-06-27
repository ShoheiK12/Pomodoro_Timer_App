import React from 'react';
import { useState } from 'react';

function Settings() {
  const [targetTime, setTargetTime] = useState(() => {
    // Load the setting saved in Local Storage (or the default of 120 minutes if it does not exist) as an initial value.
    const savedTime = localStorage.getItem('pomodoro_target_time');
    return savedTime ? Number(savedTime) : 120;
  });
  
  // Process when the form is submitted (the save button is clicked).
  const handleSubmit = (e) => {
    // Prevent the default browser reload on form submission.
    // -> Because, by default, forms reload the page, which would wipe out the React state and timer count.
    // e: event; button clicked and form submitted
    e.preventDefault();
    
    // Save the time as 'pomodoro_target_time'.
    localStorage.setItem('pomodoro_target_time', targetTime);
    
    alert(`Saved your target time: ${targetTime} mins（${(targetTime / 60).toFixed(1)} hours)`)
  }
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
      <h2>Study Time Setting</h2>
      <p>Set your total target study time for today.</p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <label style={{ fontSize: '1.1rem' }}>
          Target time by mins: 
          <input 
            type="number" 
            value={targetTime} 
            onChange={(e) => setTargetTime(Number(e.target.value))}
            min="1"
            style={{ padding: '8px', marginLeft: '10px', width: '80px', fontSize: '1rem' }}
          />
        </label>

        <div style={{ color: '#666', fontSize: '0.9rem' }}>
          ➔ Conversion from mins to hours: <strong>{(targetTime / 60).toFixed(1)} hours</strong>
        </div>

        <button 
          type="submit" 
          style={{ 
            padding: '10px', 
            backgroundColor: '#28a745',
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Save the setting
        </button>
      </form>
    </div>
  );
}

export default Settings;