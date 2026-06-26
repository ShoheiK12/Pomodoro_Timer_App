import React from 'react';
import { Link } from 'react-router';

function NotFound() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>🚫 404 - Page Not Found</h2>
      <p>The page you are looking for might have been removed or moved.</p>
      
      {/* Link to Timer page. */}
      <Link to="/" style={{ color: '#007bff', textDecoration: 'underline' }}>
        Back to Pomodoro Timer page.
      </Link>
    </div>
  );
}

export default NotFound;