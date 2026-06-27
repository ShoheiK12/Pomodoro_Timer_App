import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import App from './App.jsx'
import Timer from './components/Timer.jsx'
import Settings from './pages/Settings.jsx'
import Review from './pages/Review.jsx'
import NotFound from './pages/NotFound.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        
        {/* Use App as the parent frame and nest the child components within it. */}
        {/* Display the timer on the top page */}
        <Route path="/" element={<App />}>
          
          {/* Route index: Specify the default screen to be displayed when accessing the parent URL (/). */}
          <Route index element={<Timer />} />
          
          {/* Display a setting page and review page */}
          <Route path="settings" element={<Settings />} />
          <Route path="review" element={<Review />} />
          
        </Route> 

        {/* The 404 page is placed outside the main app structure not to display it in the global navigation. */}
        {/* If no URL matches, this will be called. */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
