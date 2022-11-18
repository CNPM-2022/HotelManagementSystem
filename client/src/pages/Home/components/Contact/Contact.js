import images from '../../../../assets/images';
import Button from '../../../../components/Button/Button';
import './Contact.scss';

function Contact() {
    return (
        <div className="home-contact-container">
            <div className="container">
                <div className="content" style={{ backgroundImage: `url(${images.contactBg})` }}>
                    <div className="info">
                        <h2>Contact us now!</h2>
                        <h6>Contact (+12) 345-678-9999 to book directly or for advice</h6>
                    </div>
                    <div className="contact">
                        <Button primary className="contact-btn">
                            Contact Now
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
