import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './Pages/MainPage/MainPage';
import CreateHuntPage from './Pages/CreateHuntPage/CreateHunt';  // Assuming you have this component
import MapPage from './Pages/MapPage/MapPage';
// import NotFoundPage from './Pages/NotFoundPage/NotFoundPage';  // Optional: for undefined routes

function App() {
  return (
    <Router>
      <Routes>
        {/* Define routes here */}
        <Route path="/" element={<MainPage />} />
        <Route path="/create-hunt" element={<CreateHuntPage />} />
        <Route path="/map" element={<MapPage />} />
        
        {/* Catch-all route for undefined pages */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
