import './Home.scss';
import About from './components/About/About';
import Rooms from './components/Rooms/Rooms';
import Slider from './components/Slider/Slider';
import Rated from './components/Rated/Rated';
import Contact from './components/Contact/Contact';
import Partner from './components/Partner/Partner';

const Home = () => {
    return (
        <div className="home-container">
            <Slider />
            <About />
            <Rooms />
            <Rated />
            <Contact />
            <Partner />
        </div>
    );
};

export default Home;
