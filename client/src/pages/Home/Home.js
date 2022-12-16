import About from './components/About/About';
import Rooms from './components/Rooms/Rooms';
import Slider from './components/Slider/Slider';
import Contact from './components/Contact/Contact';

const Home = () => {
    return (
        <div className="home-container">
            <Slider />
            <About />
            <Rooms />
            <Contact />
        </div>
    );
};

export default Home;
