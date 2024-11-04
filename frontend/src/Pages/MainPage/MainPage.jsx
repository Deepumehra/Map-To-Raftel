import { useSelector } from 'react-redux';
import MainPageBody from '../../Components/Body/Body';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import './MainPage.css';

const MainPage = () => {
    const {auth}=useSelector((store)=>store);
    console.log("Auth :",auth);
    return (
        <div>
            <Header/>
            <MainPageBody/>
            <Footer/>
        </div>
    ) 
}
export default MainPage;