import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { roomActions } from '../../store/roomSlice';
import { Form, useLocation, useParams } from 'react-router-dom';
import { Carousel, Row, Col, ListGroup } from 'react-bootstrap';
import Loader from '../../components/Loader/Loader';
import './DetailRoom.scss';
import { getRoomById } from '../../services/apiServices';

import icon1 from "../../assets/images/detailRoom/icon1.png"
import icon2 from "../../assets/images/detailRoom/icon2.png"
import icon3 from "../../assets/images/detailRoom/icon3.png"
import icon4 from "../../assets/images/detailRoom/icon4.png"
import icon5 from "../../assets/images/detailRoom/icon5.png"
import icon6 from "../../assets/images/detailRoom/icon6.png"
import avt1 from "../../assets/images/detailRoom/53.jpg"
import avt2 from "../../assets/images/detailRoom/54.jpg"
import avt3 from "../../assets/images/detailRoom/55.jpg"

import t1 from "../../assets/images/detailRoom/48.jpg"
import t2 from "../../assets/images/detailRoom/49.jpg"
import t3 from "../../assets/images/detailRoom/50.jpg"
import t4 from "../../assets/images/detailRoom/51.jpg"
import t5 from "../../assets/images/detailRoom/52.jpg"


const DetailRoom = () => {
    const dispatch = useDispatch();
    const { loading, room, error } = useSelector((state) => state.room);
    const location = useLocation();
    const roomId = location.pathname.split('/')[2];

    const GetDetailRoom = async () => {
        try {
            dispatch(roomActions.RoomByIdRequest());
            const res = await getRoomById(roomId);
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message);
            }
            dispatch(roomActions.RoomByIdSuccess(data));
        } catch (error) {
            dispatch(roomActions.RoomByIdFail(error.message));
        }
    };

    useEffect(() => {
        GetDetailRoom();
    }, []);

    const params = useParams();

    console.log(params.id);


    return (
        <>
            <div class="breadcrumb-area bg-img bg-overlay jarallax">
                <div class="container h-100">
                    <div class="row h-100 align-items-end">
                        <div class="col-12">
                            <div class="breadcrumb-content d-flex align-items-center justify-content-between pb-5">
                                <h2 class="room-title">Room View Sea</h2>
                                <h2 class="room-price">$180 <span>/ Per Night</span></h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="roberto-rooms-area section-padding-100-0">
                <div class="container">
                    <div class="row">
                        <div class="col-12 col-lg-8">

                            <div class="single-room-details-area mb-50">

                                <div class="room-thumbnail-slides mb-50">
                                    <div id="room-thumbnail--slide" class="carousel slide" data-bs-ride="carousel" >
                                        <div class="carousel-inner">
                                            <div class="carousel-item active">
                                                <img src={t1} class="d-block w-100" alt="" />
                                            </div>
                                            <div class="carousel-item">
                                                <img src={t2} class="d-block w-100" alt="" />
                                            </div>
                                            <div class="carousel-item">
                                                <img src={t3} class="d-block w-100" alt="" />
                                            </div>
                                            <div class="carousel-item">
                                                <img src={t4} class="d-block w-100" alt="" />
                                            </div>
                                            <div class="carousel-item">
                                                <img src={t5} class="d-block w-100" alt="" />
                                            </div>
                                        </div>

                                        <ol class="carousel-indicators">
                                            <li data-bs-target="#room-thumbnail--slide" data-bs-slide-to="0" class="active">
                                                <img src={t1} class="d-block w-100" alt="" />
                                            </li>
                                            <li data-bs-target="#room-thumbnail--slide" data-bs-slide-to="1">
                                                <img src={t2} class="d-block w-100" alt="" />
                                            </li>
                                            <li data-bs-target="#room-thumbnail--slide" data-bs-slide-to="2">
                                                <img src={t3} class="d-block w-100" alt="" />
                                            </li>
                                            <li data-bs-target="#room-thumbnail--slide" data-bs-slide-to="3">
                                                <img src={t4} class="d-block w-100" alt="" />
                                            </li>
                                            <li data-bs-target="#room-thumbnail--slide" data-bs-slide-to="4">
                                                <img src={t5} class="d-block w-100" alt="" />
                                            </li>
                                        </ol>
                                    </div>
                                </div>

                                <div class="room-features-area d-flex flex-wrap mb-50">
                                    <h6>Size: <span>350-425sqf</span></h6>
                                    <h6>Capacity: <span>Max persion 5</span></h6>
                                    <h6>Bed: <span>King beds</span></h6>
                                    <h6>Services: <span>Wifi, television ...</span></h6>
                                </div>

                                <p>If you live in New York City or travel to and from New York City a lot, you know all about the traffic there. Getting places is often next to impossible, even with the gazillion yellow cabs. If you’re like me you often look with envy at those shiny limousines with their unformed drivers and wish you could sit in one. Well, you can. New York limo service is more affordable than you think, whether it’s for Newark airport transportation, LaGuardia airport transportation, or to drive wherever you wish to go.</p>

                                <p>Every time I hail a cab in New York City or wait for one at the airports, I hope I’ll be lucky enough to get one that’s halfway decent and that the driver actually speaks English. I have spent many anxious moments wondering if I ever get to my destination. Or whether I’d get ripped off. Even if all goes well, I can’t say I can remember many rides in New York cabs that were very pleasant. And given how much they cost by now, going with a limo makes ever more sense.</p>
                            </div>


                            <div class="room-service mb-50">
                                <h4>Room Services</h4>

                                <ul>
                                    <li><img src={icon1} alt="" /> Air Conditioning</li>
                                    <li><img src={icon2} alt="" /> Free drinks</li>
                                    <li><img src={icon3} alt="" /> Restaurant quality</li>
                                    <li><img src={icon4} alt="" /> Cable TV</li>
                                    <li><img src={icon5} alt="" /> Unlimited Wifi</li>
                                    <li><img src={icon6} alt="" /> Service 24/24</li>
                                </ul>
                            </div>


                            <div class="room-review-area mb-100">
                                <h4>Room Review</h4>


                                <div class="single-room-review-area d-flex align-items-center">
                                    <div class="reviwer-thumbnail">
                                        <img src={avt1} alt="" />
                                    </div>
                                    <div class="reviwer-content">
                                        <div class="reviwer-title-rating d-flex align-items-center justify-content-between">
                                            <div class="reviwer-title">
                                                <span>27 Aug 2019</span>
                                                <h6>Brandon Kelley</h6>
                                            </div>
                                            <div class="reviwer-rating">
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                            </div>
                                        </div>
                                        <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora.</p>
                                    </div>
                                </div>


                                <div class="single-room-review-area d-flex align-items-center">
                                    <div class="reviwer-thumbnail">
                                        <img src={avt2} alt="" />
                                    </div>
                                    <div class="reviwer-content">
                                        <div class="reviwer-title-rating d-flex align-items-center justify-content-between">
                                            <div class="reviwer-title">
                                                <span>27 Aug 2019</span>
                                                <h6>Sounron Masha</h6>
                                            </div>
                                            <div class="reviwer-rating">
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                            </div>
                                        </div>
                                        <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora.</p>
                                    </div>
                                </div>


                                <div class="single-room-review-area d-flex align-items-center">
                                    <div class="reviwer-thumbnail">
                                        <img src={avt3} alt="" />
                                    </div>
                                    <div class="reviwer-content">
                                        <div class="reviwer-title-rating d-flex align-items-center justify-content-between">
                                            <div class="reviwer-title">
                                                <span>27 Aug 2019</span>
                                                <h6>Amada Lyly</h6>
                                            </div>
                                            <div class="reviwer-rating">
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                            </div>
                                        </div>
                                        <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora.</p>
                                    </div>
                                </div>

                            </div>
                        </div>


                    </div>
                </div>
            </div>
            {/* <div className="detail-room-container">
                {loading ? (
                    <Loader />
                ) : error ? (
                    <h1>{error}</h1>
                ) : (
                    <>
                        <div className="container">
                            <div className="bn">
                                <Row>
                                    <Col md={12}>
                                        <Carousel nextLabel="" prevLabel="">
                                            {room.imageurls &&
                                                room.imageurls.map((url, index) => {
                                                    return (
                                                        <Carousel.Item key={index}>
                                                            <img
                                                                src={url}
                                                                className="img-fluid d-block w-100"
                                                                style={{ height: '500px' }}
                                                            />
                                                        </Carousel.Item>
                                                    );
                                                })}
                                        </Carousel>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <br></br>
                                        <div className="vl">
                                            <h6 className="hj">Shangri-La Colombo</h6>
                                            <h1 className="hj">{room.name}</h1>
                                        </div>{' '}
                                        <hr></hr>
                                        <h6>Amenities</h6>
                                        <hr></hr>
                                        <h6>About The Room</h6>
                                        <p>{room.description}</p>
                                        <h6>Features</h6>
                                        <h6>Bath & Personal Care</h6>
                                        <ul className="b">
                                            <li>Walk-in shower and/or separate bathtub</li>
                                            <li>Bathroom mirror</li>
                                            <li>Plush bathrobes and slippers</li>
                                            <li>300 thread count linen</li>
                                            <li>Pillow menu with hypoallergenic options</li>
                                            <li>Iron and ironing board</li>
                                        </ul>
                                        <h6>Media & Entertainment</h6>
                                        <ul className="b">
                                            <li>High-speed Internet access</li>
                                            <li>Flatscreen TV</li>
                                            <li>Wide selection of international and local television channels</li>
                                        </ul>
                                        <h6>Refreshments</h6>
                                        <ul className="b">
                                            <li>Minibar</li>
                                            <li>Water</li>
                                            <li>Tea and coffee making facilities</li>
                                        </ul>
                                    </Col>

                                    <Col>
                                        <p className="km">
                                            <b>For reservation, please call (+94) 11 357 1446</b>
                                        </p>
                                        <ListGroup as="ul" align="center">
                                            <ListGroup.Item as="li" variant="secondary">
                                                <b>Details</b>
                                            </ListGroup.Item>
                                            <ListGroup.Item as="li" disabled>
                                                <b>Max Count: </b> {room.maxcount}
                                            </ListGroup.Item>
                                            <ListGroup.Item as="li" disabled>
                                                <b>Room Type: </b> {room.type}
                                            </ListGroup.Item>
                                            <ListGroup.Item as="li" disabled>
                                                From <b>LKR {room.rentperday}/= </b>Average Per Night
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <h6>Children's meal plan for guests staying at the hotel.</h6>
                                    <p>
                                        The following children’s meal plan is applicable for all Golden Circle members.
                                        When accompanied by a dine-in adult, up to 2 children of registered in-house
                                        hotel guests at the age of 6 and below can enjoy buffet meals at the all-day
                                        dining venues at no additional charge. Additional children at the age of 6 and
                                        below and all children who are above 6 years of age but under 12 years of age
                                        will receive a 50% discount on the adult buffet price. Registered in-house hotel
                                        guests can also join Golden Circle at any time during their stay to enjoy the
                                        meal plan. Children of non-registered walk-in guests under the age of 12 will
                                        receive a 50% discount on buffet meals at the all-day dining outlets.
                                    </p>
                                </Row>
                            </div>
                        </div>
                    </>
                )}
            </div> */}

        </>
    );
};

export default DetailRoom;
