import images from '../../../../assets/images';
import './Partner.scss';

function Partner() {
    return (
        <div className="home-partner-container">
            <div className="container">
                <div className="list" data-aos="fade-up">
                    <div className="item">
                        <img src={images.partner1} alt="Partner 1" />
                    </div>
                    <div className="item">
                        <img src={images.partner2} alt="Partner 2" />
                    </div>
                    <div className="item">
                        <img src={images.partner3} alt="Partner 3" />
                    </div>
                    <div className="item">
                        <img src={images.partner4} alt="Partner 4" />
                    </div>
                    <div className="item">
                        <img src={images.partner5} alt="Partner 5" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Partner;
