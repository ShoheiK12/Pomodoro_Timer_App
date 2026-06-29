import React from 'react';
import { useState } from 'react';
import '../App.css';

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
  
  // Pie chart parameters
  const radius = 50; 
  const strokeWidth = 10; 
  const circumference = radius * 2 * Math.PI;
  // Calculate how many much of the line is hidden based on achievement rate.
  // SVG strokeDashoffset can only control how much of the line is "hidden" (pushed out). To show the actual progress, we inversely calculate the hidden amount.
  const strokeDashoffset = circumference - (achievementRate / 100) * circumference;

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
      
      {/* Pie chart */}
      <div className="chart-wrapper">
        
        <svg className="chart-svg">
          {/* Base circle */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="transparent"
            stroke="#e6e6e6"
            strokeWidth={strokeWidth}
          />
          {/* Blue circle showing progress */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="transparent"
            stroke="#007bff"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round" 
            className="chart-progress-circle"
          />
        </svg>

        {/* Display achievement rate inside circle */}
        <div className="chart-center-text">
          <span className="chart-rate-num">{achievementRate}%</span>
          <span sclassName="chart-rate-label">Achievement Rate</span>
        </div>
      </div>
      
      {/* Summary */}
      <div className="summary-container">
        <div>
          <span className="summary-label">Today's Target</span>
          <h3 className="summary-value">{targetTime} mins</h3>
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