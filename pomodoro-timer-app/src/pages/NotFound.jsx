import React from 'react';
import { Link } from 'react-router';
import '../App.css';

function NotFound() {
  return (
    <div className="notfound-container">
      <h2 className="notfound-title">🚫 404 - Page Not Found</h2>
      <p className="notfound-text">The page you are looking for might have been removed or moved.</p>
      
      {/* Link to Timer page. */}
      <Link to="/" className="notfound-link">
        Back to Pomodoro Timer page.
      </Link>
    </div>
  );
}

export default NotFound;