import React from 'react';
import { useSelector } from 'react-redux';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Home.scss';
import Slider from './components/Slider/Slider';

AOS.init({
    duration: '2000',
});

const Home = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);

    return (
        <div className="home-container">
            <Slider />
        </div>
    );
};

export default Home;
