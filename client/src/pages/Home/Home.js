import './Home.scss';
import About from './components/About/About';
import Rooms from './components/Rooms/Rooms';
import Slider from './components/Slider/Slider';
import Rated from './components/Rated/Rated';

const Home = () => {
    return (
        <div className="home-container">
            <Slider />
            <About />
            <Rooms />
            <Rated />
        </div>
    );
};

export default Home;
