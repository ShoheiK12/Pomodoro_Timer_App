import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import App from './App.jsx'
import Settings from './pages/Settings.jsx'
import Review from './pages/Review.jsx'
import NotFound from './pages/NotFound.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Display the timer on the top page */}
        <Route path="/" element={<App />} />

        {/* Display a setting page */}
        <Route path="/settings" element={<Settings />} />

        {/* Display a review page */}
        <Route path="/review" element={<Review />} />
        
        {/* If no URL matches, this will be called. */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
