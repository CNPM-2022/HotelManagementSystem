import SlickSlider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Rooms.scss';
import images from '../../../../assets/images';

function Rooms() {
    const settings = {
        dots: false,
        infinite: true,
        arrows: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
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
                <div className="single-room">
                    <div className="thumbnail">
                        <img src={images.room1} alt={`Room `} />
                    </div>

                    <div className="content"></div>
                </div>
            </SlickSlider>
        </div>
    );
}

export default Rooms;
