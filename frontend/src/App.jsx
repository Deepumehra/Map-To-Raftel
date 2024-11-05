import { GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AboutUs from './Pages/AboutUsPage/AboutUsPage';
import CreateHuntPage from './Pages/CreateHuntPage/CreateHunt';
import GoogleLogin from './Pages/GoogleLogin';
import HuntPage from './Pages/HuntsPage/HuntsPage';
import Login from './Pages/LoginPage/LoginPage';
import MainPage from './Pages/MainPage/MainPage';
import MapPage from './Pages/MapPage/MapPage';
import PageNotFound from './Pages/PageNotFound/';
import ProfilePage from './Pages/ProfilePage/Profile';
import Signup from './Pages/SignupPage/SignupPage';
import SinglePlayer from './Pages/SinglePlayer/SinglePlayer';
import { getUser } from './State/Authentication/Action';
function App() {
  const dispatch=useDispatch();
  // const {auth}=useSelector((store)=>store);
  const jwt=localStorage.getItem('JWT');
  // console.log("JWT :",jwt);
  useEffect(()=>{
    if(jwt){
      dispatch(getUser(jwt));
    }
  })
  return (
    <Router>
        <Routes>
          {/* Define routes here */}
          <Route path="/" element={<MainPage />} />
          <Route path='/about' element={<AboutUs/>}/>
          <Route path="/create-hunt" element={<CreateHuntPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path='/hunts' element={<HuntPage/>} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/map/:huntid' element={<SinglePlayer/>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
  );
}

export default App;
