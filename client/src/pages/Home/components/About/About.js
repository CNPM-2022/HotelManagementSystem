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
                                <h6 data-aos="fade-up">Về chúng tôi</h6>
                                <h2 data-aos="fade-up">
                                    Chào mừng đến với
                                    <br />
                                    Roberto Hotel Luxury
                                </h2>
                            </div>

                            <div className="body">
                                <h5 data-aos="fade-up">
                                    Với hơn 340 khách sạn trên toàn thế giới, NH Hotel Group mang đến nhiều lựa chọn
                                    khách sạn đa dạng nhằm mang đến một kỳ nghỉ hoàn hảo cho dù bạn đến bất cứ đâu.
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
                            <div className="row">
                                <div className="col-md-2-4 col-6">
                                    <div className="service" data-aos="fade-up" data-aos-duration="800">
                                        <img src={images.icon1} alt="service-1" />
                                        <h5>Vận chuyển</h5>
                                    </div>
                                </div>
                                <div className="col-md-2-4 col-6">
                                    <div className="service" data-aos="fade-up" data-aos-duration="1000">
                                        <img src={images.icon2} alt="service-2" />
                                        <h5>Dịch vụ du lịch</h5>
                                    </div>
                                </div>
                                <div className="col-md-2-4 col-6">
                                    <div className="service" data-aos="fade-up" data-aos-duration="1200">
                                        <img src={images.icon3} alt="service-3" />
                                        <h5>Spa thư giãn</h5>
                                    </div>
                                </div>
                                <div className="col-md-2-4 col-6">
                                    <div className="service" data-aos="fade-up" data-aos-duration="1400">
                                        <img src={images.icon4} alt="service-4" />
                                        <h5>Nhà hàng</h5>
                                    </div>
                                </div>
                                <div className="col-md-2-4 col-6">
                                    <div className="service" data-aos="fade-up" data-aos-duration="1600">
                                        <img src={images.icon5} alt="service-5" />
                                        <h5>Quầy bar & Đồ uống</h5>
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
