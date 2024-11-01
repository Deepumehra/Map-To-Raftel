import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import GoogleLogin from './Pages/GoogleLogin';
import HomePage from './Pages/HomePage';
import MapPage from './Pages/MapPage/MapPage';
import PageNotFound from './Pages/PageNotFound';
import ProfilePage from './Pages/ProfilePage';
function App() {
  const GoogleWrapper = ()=>(
		<GoogleOAuthProvider clientId="936397188536-td038qi0a3vi0h12kgipp8lsphq2ianq.apps.googleusercontent.com">
			<GoogleLogin></GoogleLogin>
		</GoogleOAuthProvider>
	)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/map' element={<MapPage/>}/>
        <Route path='/login' element={<GoogleWrapper/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}
export default App
