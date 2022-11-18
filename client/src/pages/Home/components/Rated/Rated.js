import SlickSlider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { AiFillStar } from 'react-icons/ai';
import './Rated.scss';
import images from '../../../../assets/images';

function Rated() {
    const listRators = [
        {
            thumbnail: images.ratorThumb1,
        },
        {
            thumbnail: images.ratorThumb2,
        },
    ];

    const listComments = [
        {
            content:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore sequi laboriosam fugit suscipit aspernatur, minima minus voluptatum, id ab atque similique ex earum. Magni.',
            rating: 5,
            user: 'Robert Brown',
            user_info: 'CEO Deercreative',
        },
        {
            content:
                'This can be achieved by applying search engine optimization or popularly known as SEO. This is a marketing strategy which increases the quality and quantity of traffic flow to a particular website via search engines.',
            rating: 4,
            user: 'Robert Brown',
            user_info: 'CEO Deercreative',
        },
        {
            content:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus delectus facilis molestias, error vitae praesentium quos eaque qui ea, tempore blanditiis sint reprehenderit, quaerat. Commodi ab architecto sit suscipit exercitationem!',
            rating: 5,
            user: 'Askash Downey',
            user_info: 'CEO Deercreative',
        },
        {
            content:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, ex quos. Alias a rem maiores, possimus dicta sit distinctio quis iusto!',
            rating: 4,
            user: 'Downey Sarah',
            user_info: 'CEO Deercreative',
        },
    ];

    const thumbSettings = {
        dots: false,
        infinite: true,
        arrows: true,
        speed: 1600,
        autoplay: true,
        autoplaySpeed: 4000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const contentSettings = {
        dots: true,
        infinite: true,
        arrows: true,
        speed: 1600,
        autoplay: true,
        autoplaySpeed: 4000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(<AiFillStar key={i} />);
        }
        return stars;
    };

    return (
        <div className="home-rated-container container">
            <div className="row align-items-center">
                <div className="col-12 col-md-6">
                    <div className="thumbnail">
                        <SlickSlider {...thumbSettings}>
                            {listRators.map((rator, index) => (
                                <div key={index}>
                                    <div className="single-thumb">
                                        <img src={rator.thumbnail} alt={`Rator ${index + 1}`} />
                                    </div>
                                </div>
                            ))}
                        </SlickSlider>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="content">
                        <h6>TESTIMONIALS</h6>
                        <h2>Our Guests Love Us</h2>
                        <SlickSlider {...contentSettings}>
                            {listComments.map((comment, index) => (
                                <div key={index}>
                                    <div className="single-comment">
                                        <h5>“{comment.content}”</h5>

                                        <div className="rating-title">
                                            <div className="rating">{renderStars(comment.rating)}</div>
                                            <p>
                                                {comment.user}
                                                <span> - {comment.user_info}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </SlickSlider>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Rated;
