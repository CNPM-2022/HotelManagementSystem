import { useEffect, useState } from 'react';
import './RoomScreen.scss';

function AllRoom() {

    return (
        <div class="roberto-rooms-area mt-4">
            <div class="container">
                <div class="row ">
                    <div class="col-12">

                        <div class="single-room-area d-flex align-items-center mb-5 justify-content-center "
                            data-aos="fade-up" data-aos-anchor-placement="center-bottom"
                        >

                            <div class="room-thumbnail">
                                <img src="https://technext.github.io/roberto/img/bg-img/43.jpg" alt="" />
                            </div>

                            <div class="room-content">
                                <h2>Room View Sea</h2>
                                <h4>400$ <span>/ Day</span></h4>
                                <div class="room-feature">
                                    <h6>Size: <span>30 ft</span></h6>
                                    <h6>Capacity: <span>Max persion 5</span></h6>
                                    <h6>Bed: <span>King beds</span></h6>
                                    <h6>Services: <span>Wifi, television ...</span></h6>
                                </div>
                                <a href="#" class="btn view-detail-btn"
                                >View Details
                                    <i class="fa fa-long-arrow-right" aria-hidden="true"></i
                                    ></a>
                            </div>
                        </div>
                        <hr className="mt-0 mb-4" />

                        <div
                            class="single-room-area d-flex align-items-center mb-5 wow fadeInUp"
                            data-wow-delay="300ms"
                            data-aos="fade-up" data-aos-anchor-placement="center-bottom"
                        >

                            <div class="room-thumbnail">
                                <img src="https://technext.github.io/roberto/img/bg-img/44.jpg" alt="" />
                            </div>

                            <div class="room-content">
                                <h2>Small Room</h2>
                                <h4>400$ <span>/ Day</span></h4>
                                <div class="room-feature">
                                    <h6>Size: <span>30 ft</span></h6>
                                    <h6>Capacity: <span>Max persion 5</span></h6>
                                    <h6>Bed: <span>King beds</span></h6>
                                    <h6>Services: <span>Wifi, television ...</span></h6>
                                </div>
                                <a href="#" class="btn view-detail-btn"
                                >View Details
                                    <i class="fa fa-long-arrow-right" aria-hidden="true"></i
                                    ></a>
                            </div>
                        </div>

                        <div
                            class="single-room-area d-flex align-items-center mb-5 wow fadeInUp"
                            data-wow-delay="300ms"
                            data-aos="fade-up" data-aos-anchor-placement="center-bottom"
                        >

                            <div class="room-thumbnail">
                                <img src="https://technext.github.io/roberto/img/bg-img/44.jpg" alt="" />
                            </div>

                            <div class="room-content">
                                <h2>Small Room</h2>
                                <h4>400$ <span>/ Day</span></h4>
                                <div class="room-feature">
                                    <h6>Size: <span>30 ft</span></h6>
                                    <h6>Capacity: <span>Max persion 5</span></h6>
                                    <h6>Bed: <span>King beds</span></h6>
                                    <h6>Services: <span>Wifi, television ...</span></h6>
                                </div>
                                <a href="#" class="btn view-detail-btn"
                                >View Details
                                    <i class="fa fa-long-arrow-right" aria-hidden="true"></i
                                    ></a>
                            </div>
                        </div><div
                            class="single-room-area d-flex align-items-center mb-5 wow fadeInUp"
                            data-wow-delay="300ms"
                            data-aos="fade-up" data-aos-anchor-placement="center-bottom"
                        >

                            <div class="room-thumbnail">
                                <img src="https://technext.github.io/roberto/img/bg-img/44.jpg" alt="" />
                            </div>

                            <div class="room-content">
                                <h2>Small Room</h2>
                                <h4>400$ <span>/ Day</span></h4>
                                <div class="room-feature">
                                    <h6>Size: <span>30 ft</span></h6>
                                    <h6>Capacity: <span>Max persion 5</span></h6>
                                    <h6>Bed: <span>King beds</span></h6>
                                    <h6>Services: <span>Wifi, television ...</span></h6>
                                </div>
                                <a href="#" class="btn view-detail-btn"
                                >View Details
                                    <i class="fa fa-long-arrow-right" aria-hidden="true"></i
                                    ></a>
                            </div>
                        </div><div
                            class="single-room-area d-flex align-items-center mb-5 wow fadeInUp"
                            data-wow-delay="300ms"
                            data-aos="fade-up" data-aos-anchor-placement="center-bottom"
                        >

                            <div class="room-thumbnail">
                                <img src="https://technext.github.io/roberto/img/bg-img/44.jpg" alt="" />
                            </div>

                            <div class="room-content">
                                <h2>Small Room</h2>
                                <h4>400$ <span>/ Day</span></h4>
                                <div class="room-feature">
                                    <h6>Size: <span>30 ft</span></h6>
                                    <h6>Capacity: <span>Max persion 5</span></h6>
                                    <h6>Bed: <span>King beds</span></h6>
                                    <h6>Services: <span>Wifi, television ...</span></h6>
                                </div>
                                <a href="#" class="btn view-detail-btn"
                                >View Details
                                    <i class="fa fa-long-arrow-right" aria-hidden="true"></i
                                    ></a>
                            </div>
                        </div>



                    </div>
                </div>
            </div>
            <nav
                class="roberto-pagination d-flex justify-content-center"
                data-wow-delay="1000ms"
            >
                <ul class="pagination">
                    <li class="page-item">
                        <a class="page-link" href="#"><i class="fa fa-angle-left"></i>Previous </a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item">
                        <a class="page-link" href="#">Next <i class="fa fa-angle-right"></i></a>
                    </li>
                </ul>
            </nav>
        </div>


    )
}

export default AllRoom;