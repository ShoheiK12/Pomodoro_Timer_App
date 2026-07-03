import React from 'react';
import { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../App.css';

function Review() {
  // Extract study histories from Local Storage and then convert them into array.
  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem('pomodoro_history');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  // Extract today's study target and then convert it into number.
  const [target, setTarget] = useState(() => {
    const savedTarget = localStorage.getItem('pomodoro_target_time');
    return savedTarget ? Number(savedTarget) : 120;
  });

  // Add up all of previous study histories to calculate total study time.
  const totalStudiedMinutes = history.reduce((sum, current) => sum + current, 0);

  // Calculate achievement rate
  const achievementRate = Math.min(Math.round((totalStudiedMinutes / target) * 100), 100);

  // Reset histories
  const handleClearHistory = () => {
    // windows.confirm: Confirmation pop-up -> If clicking OK, return true, which means implementing if sentence. If clicking cancel, return false, which means not meeting condition.
    if (window.confirm('Do you want to delete all study histories?')) {
      localStorage.removeItem('pomodoro_history');
      setHistory([]);
    }
  }
  
  return (
    <div className="review-container">
      <h1>Review</h1>
      
      <div className="chart-wrapper">
        <CircularProgressbar
          value={achievementRate} 
          text={`${achievementRate}%`} 
          styles={buildStyles({
            strokeLinecap: 'round',
            textSize: '16px',
            pathColor: '#007bff',
            textColor: '#333333', 
            trailColor: '#e6e6e6', 
            pathTransitionDuration: 0.5
          })}
        />
      </div>
      
      {/* Summary */}
      <div className="summary-container">
        <div>
          <span className="summary-label">Today's Target</span>
          <h3 className="summary-value">{target} mins</h3>
        </div>
        <div className="summary-divider"></div>
        <div>
          <span className="summary-label">Total Study Time</span>
          <h3 className="summary-value-green">{totalStudiedMinutes} mins</h3>
        </div>
        <div className="summary-divider"></div>
        <div>
          <span className="summary-label">Achievement Rate</span>
          <h3 className="summary-value-blue">{achievementRate}%</h3>
        </div>
      </div>
      
      {/* Display study histories */}
      ### 🕒 Study session history ### 
      <br /><br />
      Pomodoro counts: {history.length}
      {history.length === 0 ? (
        <p className="empty-history-text">There is no study histories for today yet. Let's complete today's session.</p>
      ) : (
        <ul className="history-list">
          {history.map((minutes, index) => (
            <li key={index} className="history-item">
              <span>⏱️ {index + 1} times:</span>
              <strong>{minutes} mins</strong>
            </li>
          ))}
        </ul>
      )}
      
      {/* Reset button */}
      {history.length > 0 && (
        <button onClick={handleClearHistory} className="history-reset-button">
          Reset study histories.
        </button>
      )}
    </div>
  );
}

export default Review;