import React from 'react';
import { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../App.css';

function Review() {
  const [history, setHistory] = useState(() => {
    const studyHistory = localStorage.getItem('pomodoro_history');
    return studyHistory ? JSON.parse(studyHistory) : [];
  });

  const [target, setTarget] = useState(() => {
    const targetRec = localStorage.getItem('pomodoro_target_time');
    return targetRec ? Number(targetRec) : 120;
  });

  // Formula to calculate study data.
  const studyTotal = history.reduce((sum, current) => sum + current, 0);
  const achievementRate = Math.min(Math.round((studyTotal / target) * 100), 100);

  // Reset histories
  const clearHistory = () => {
    // windows.confirm: Confirmation pop-up -> If clicking OK, return true, which means implementing sentence. If clicking cancel, return false, which means not meeting condition.
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
      
      <div className="summary-container">
        <div>
          <span className="summary-label">Today's Target</span>
          <h3 className="summary-value">{target} mins</h3>
        </div>
        <div className="summary-divider"></div>
        <div>
          <span className="summary-label">Total Study Time</span>
          <h3 className="summary-value-green">{studyTotal} mins</h3>
        </div>
        <div className="summary-divider"></div>
        <div>
          <span className="summary-label">Achievement Rate</span>
          <h3 className="summary-value-blue">{achievementRate}%</h3>
        </div>
      </div>
      
      <h2>### Study session history ### </h2>
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
      
      {history.length > 0 && (
        <button onClick={clearHistory} className="history-reset-btn">
          Reset study histories.
        </button>
      )}
    </div>
  );
}

export default Review;