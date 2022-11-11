import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import images from '../../../../assets/images';
import './Slider.scss';

function Slider() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <div className="home-slider-container">
            <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
                <Carousel.Item>
                    <img className="d-block w-100" src={images.slide1} alt="First slide" />
                    <Carousel.Caption>
                        <div className="welcome">
                            <p>Hotel & Resort</p>
                            <h3>Welcome To Roberto</h3>
                            <button className="discover-btn">Discover Now</button>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src={images.slide2} alt="Second slide" />

                    <Carousel.Caption>
                        <div className="welcome">
                            <p>Hotel & Resort</p>
                            <h3>Welcome To Roberto</h3>
                            <button className="discover-btn">Discover Now</button>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src={images.slide3} alt="Third slide" />

                    <Carousel.Caption>
                        <div className="welcome">
                            <p>Hotel & Resort</p>
                            <h3>Welcome To Roberto</h3>
                            <button className="discover-btn">Discover Now</button>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default Slider;
