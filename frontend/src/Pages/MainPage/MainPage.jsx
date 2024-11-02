import React from 'react';
import MainPageBody from '../../Components/Body/Body';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import './MainPage.css';

const MainPage = () => {

    return (
        <div>
            <Header/>
            <MainPageBody/>
            <Footer/>
        </div>
    )
    
}
export default MainPage;