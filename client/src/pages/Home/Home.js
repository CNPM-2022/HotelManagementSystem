import './Home.scss';
import About from './components/About/About';
import Rooms from './components/Rooms/Rooms';
import Slider from './components/Slider/Slider';

const Home = () => {
    return (
        <div className="home-container">
            <Slider />
            <About />

            <div className="home-rooms-container">
                <Rooms />
            </div>
        </div>
    );
};

export default Home;
