import { useState } from 'react';
import SlickSlider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Slider.scss';
import images from '../../../../assets/images';
import SlideNextArrow from './SlideNextArrow';
import SlidePrevArrow from './SlidePrevArrow';
import Button from '../../../../components/Button/Button';

function Slider() {
    const [prevSlideImageSrc, setPrevSlideImageSrc] = useState(images.room3);
    const [nextSlideImageSrc, setNextSlideImageSrc] = useState(images.room2);

    const listSlides = [
        {
            image: images.room1,
        },
        {
            image: images.room2,
        },
        {
            image: images.room3,
        },
    ];

    const settings = {
        dots: false,
        infinite: true,
        arrows: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SlideNextArrow imageSrc={nextSlideImageSrc} />,
        prevArrow: <SlidePrevArrow imageSrc={prevSlideImageSrc} />,
        afterChange: (current) => {
            const listSlidesLength = listSlides.length;
            if (current === 0) {
                setNextSlideImageSrc(listSlides[current + 1].image);
                setPrevSlideImageSrc(listSlides[listSlidesLength - 1].image);
            } else if (current === listSlidesLength - 1) {
                setNextSlideImageSrc(listSlides[0].image);
                setPrevSlideImageSrc(listSlides[current - 1].image);
            } else {
                setNextSlideImageSrc(listSlides[current + 1].image);
                setPrevSlideImageSrc(listSlides[current - 1].image);
            }
        },
    };
    return (
        <div className="home-slider-container">
            <SlickSlider {...settings}>
                {listSlides.map((slide, index) => (
                    <div key={index} className="slide-item">
                        <img src={slide.image} alt={`Slide ${index + 1}`} />

                        <div className="welcome">
                            <p>Hotel & Resort</p>
                            <h3>Welcome To Roberto</h3>
                            <Button className="discover-btn">Discover Now</Button>
                        </div>
                    </div>
                ))}
            </SlickSlider>
        </div>
    );
}

export default Slider;
