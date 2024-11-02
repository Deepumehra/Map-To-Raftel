import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './Pages/MainPage/MainPage';
import CreateHuntPage from './Pages/CreateHuntPage/CreateHunt';  // Assuming you have this component
import MapPage from './Pages/MapPage/MapPage';
import PageNotFound from './Pages/PageNotFound/';
import ProfilePage from './Pages/ProfilePage/Profile';
import HuntPage from './Pages/HuntsPage/HuntsPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Define routes here */}
        <Route path="/" element={<MainPage />} />
        <Route path="/create-hunt" element={<CreateHuntPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path='/hunts' element={<HuntPage/>} />
        
        {/* Catch-all route for undefined pages */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
