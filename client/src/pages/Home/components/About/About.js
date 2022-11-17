import './About.scss';
import images from '../../../../assets/images';

function About() {
    return (
        <div className="home-about-container">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-6">
                        <div className="content">
                            <div className="heading">
                                <h6 data-aos="fade-up">About Us</h6>
                                <h2 data-aos="fade-up">
                                    Welcome to
                                    <br />
                                    Roberto Hotel Luxury
                                </h2>
                            </div>

                            <div className="body">
                                <h5 data-aos="fade-up">
                                    With over 340 hotels worldwide, NH Hotel Group offers a wide variety of hotels
                                    catering for a perfect stay no matter where your destination.
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6">
                        <div className="thumbnail">
                            <div className="row g-2">
                                <div className="col-6">
                                    <div className="left-content">
                                        <div className="single-thumb" data-aos="fade-up" data-aos-delay="80">
                                            <img src={images.thumb1} alt="thumb-1" />
                                        </div>
                                        <div className="single-thumb" data-aos="fade-up" data-aos-delay="80">
                                            <img src={images.thumb2} alt="thumb-2" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="single-thumb" data-aos="fade-up" data-aos-delay="80">
                                        <img src={images.thumb3} alt="thumb-3" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="services">
                            <div className="row g-5">
                                <div className="col-lg-2-4 col-6">
                                    <div className="service" data-aos="fade-up" data-aos-duration="800">
                                        <img src={images.icon1} alt="service-1" />
                                        <h5>Transportion</h5>
                                    </div>
                                </div>
                                <div className="col-lg-2-4 col-6">
                                    <div className="service" data-aos="fade-up" data-aos-duration="1000">
                                        <img src={images.icon2} alt="service-2" />
                                        <h5>Reiseservice</h5>
                                    </div>
                                </div>
                                <div className="col-lg-2-4 col-6">
                                    <div className="service" data-aos="fade-up" data-aos-duration="1200">
                                        <img src={images.icon3} alt="service-3" />
                                        <h5>Spa Relaxtion</h5>
                                    </div>
                                </div>
                                <div className="col-lg-2-4 col-6">
                                    <div className="service" data-aos="fade-up" data-aos-duration="1400">
                                        <img src={images.icon4} alt="service-4" />
                                        <h5>Restaurant</h5>
                                    </div>
                                </div>
                                <div className="col-lg-2-4 col-6">
                                    <div className="service" data-aos="fade-up" data-aos-duration="1600">
                                        <img src={images.icon5} alt="service-5" />
                                        <h5>Bar & Drink</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
