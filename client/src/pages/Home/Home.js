import './Home.scss';
import Slider from './components/Slider/Slider';
import About from './components/About/About';

const Home = () => {
    return (
        <div className="home-container">
            <Slider />
            <About />
        </div>
    );
};

export default Home;
