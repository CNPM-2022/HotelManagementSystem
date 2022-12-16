import images from '../../../../assets/images';
import Button from '../../../../components/Button/Button';
import './Contact.scss';

function Contact() {
    return (
        <div className="home-contact-container">
            <div className="container">
                <div className="content" style={{ backgroundImage: `url(${images.contactBg})` }}>
                    <div className="info">
                        <h2>Liên lạc với chúng tôi ngay!</h2>
                        <h6>Liên hệ (+12) 345-678-9999 để đặt trực tiếp hoặc để được tư vấn</h6>
                    </div>
                    <div className="contact">
                        <Button primary className="contact-btn">
                            Liên hệ ngay
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
