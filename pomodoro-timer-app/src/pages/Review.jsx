import React from 'react';
import { useState } from 'react';

function Review() {
  // Extract study histories from Local Storage and then convert them into array.
  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem('pomodoro_history');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  // Extract today's study target and then convert it into number.
  const [targetTime, setTargetTime] = useState(() => {
    const savedTime = localStorage.getItem('pomodoro_target_time');
    return savedTime ? Number(savedTime) : 120;
  });

  // Add up all of previous study histories to calculate total study time.
  const totalStudiedMinutes = history.reduce((sum, current) => sum + current, 0);

  // Calculate achievement rate
  const achievementRate = Math.min(Math.round((totalStudiedMinutes / targetTime) * 100), 100);

  // Reset histories
  const handleClearHistory = () => {
    // windows.confirm: Confirmation pop-up -> If clicking OK, return true, which means implementing if sentence. If clicking cancel, return false, which means not meeting condition.
    if (window.confirm('Do you want to delete all study histories?')) {
      localStorage.removeItem('pomodoro_history');
      setHistory([]);
    }
  }
  
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Review</h1>
      
      {/* Summary */}
      <div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px 0', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <div>
          <span style={{ fontSize: '0.9rem', color: '#666' }}>Today's Target</span>
          <h3 style={{ margin: '5px 0' }}>{targetTime} mins</h3>
        </div>
        <div style={{ borderLeft: '1px solid #ccc' }}></div>
        <div>
          <span style={{ fontSize: '0.9rem', color: '#666' }}>Total Study Time</span>
          <h3 style={{ margin: '5px 0', color: '#28a745' }}>{totalStudiedMinutes} mins</h3>
        </div>
        <div style={{ borderLeft: '1px solid #ccc' }}></div>
        <div>
          <span style={{ fontSize: '0.9rem', color: '#666' }}>Achievement Rate</span>
          <h3 style={{ margin: '5px 0', color: '#007bff' }}>{achievementRate}%</h3>
        </div>
      </div>
      
      {/* Display study histories */}
      ### 🕒 Study session history ### 
      <br /><br />
      Pomodoro counts: {history.length}
      {history.length === 0 ? (
        <p style={{ color: '#888' }}>There is no study histories for today yet. Let's complete today's session.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', maxWidth: '300px', margin: '0 auto' }}>
          {history.map((minutes, index) => (
            <li key={index} style={{ padding: '8px 0', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
              <span>⏱️ {index + 1} times:</span>
              <strong>{minutes} mins</strong>
            </li>
          ))}
        </ul>
      )}
      
      {/* Reset button */}
      {history.length > 0 && (
        <button 
          onClick={handleClearHistory}
          style={{ marginTop: '30px', padding: '8px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem' }}
        >
          Reset study histories.
        </button>
      )}
    </div>
  );
}

export default Review;