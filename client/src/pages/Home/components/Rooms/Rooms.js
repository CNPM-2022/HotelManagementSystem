import SlickSlider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { TiTick } from 'react-icons/ti';
import './Rooms.scss';
import images from '../../../../assets/images';
import Button from '../../../../components/Button/Button';
import SlideNextArrow from './SlideNextArrow';
import SlidePrevArrow from './SlidePrevArrow';

function Rooms() {
    const settings = {
        dots: false,
        infinite: true,
        arrows: true,
        speed: 1800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        nextArrow: <SlideNextArrow />,
        prevArrow: <SlidePrevArrow />,
    };

    const listRooms = [
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

    return (
        <div className="home-rooms-container">
            <SlickSlider {...settings}>
                {listRooms.map((room, index) => (
                    <div key={index}>
                        <div className="single-room">
                            <div className="thumbnail">
                                <img src={room.image} alt={`Room ${index + 1}`} />
                            </div>

                            <div className="content">
                                <h2>Best King Room</h2>
                                <h3>
                                    125$
                                    <span> / Day</span>
                                </h3>
                                <ul className="features">
                                    <li>
                                        <span>
                                            <TiTick />
                                            Size
                                        </span>
                                        <span>: 30 ft</span>
                                    </li>
                                    <li>
                                        <span>
                                            <TiTick />
                                            Capacity
                                        </span>
                                        <span>: Max persion 5</span>
                                    </li>
                                    <li>
                                        <span>
                                            <TiTick />
                                            Bed
                                        </span>
                                        <span>: King Beds</span>
                                    </li>
                                    <li>
                                        <span>
                                            <TiTick />
                                            Services
                                        </span>
                                        <span>: Wifi, Television, Bathroom</span>
                                    </li>
                                </ul>
                                <div>
                                    <Button primary className="view-btn">
                                        View Details
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </SlickSlider>
        </div>
    );
}

export default Rooms;
