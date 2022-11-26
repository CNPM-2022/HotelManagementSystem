import React, { useEffect, useState } from 'react';


import { useParams } from 'react-router-dom';
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


const DetailRoom = () => {
    const params = useParams();
    const [room, setRoom] = useState({});
    const [loading, setLoading] = useState(true)
    let autoIncrease = 0

    const GetDetailRoom = async (roomId) => {
        try {

            const res = await getRoomById(roomId);
            const data = res.data
            if (res.status !== 200) {
                throw new Error(data.message);
            }
            setRoom(data)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setLoading(true)
        GetDetailRoom(params.id);
        setLoading(false)
        document.documentElement.scrollTop = 0
    }, []);

    if (loading || room._id === undefined) {
        return (
            <div className="d-flex justify-content-center align-items-center " style={{ minHeight: "300px" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }
    else {
        return (
            <>
                <div className="breadcrumb-area bg-img bg-overlay jarallax">
                    <div className="container h-100">
                        <div className="row h-100 align-items-end">
                            <div className="col-12">
                                <div className="breadcrumb-content d-flex align-items-center justify-content-between pb-5">
                                    <h2 className="room-title">Room #{room.roomNumber}</h2>
                                    <h2 className="room-price">${room.price} <span>/ Day</span></h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="roberto-rooms-area section-padding-100-0">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-lg-8">

                                <div className="single-room-details-area mb-50">

                                    <div className="room-thumbnail-slides mb-50">
                                        <div id="room-thumbnail--slide" className="carousel slide" data-bs-ride="carousel" >
                                            <div className="carousel-inner">
                                                <div className="carousel-item active">
                                                    <img src={`http://localhost:5000/${room.imageUrls[0].filePath}`} className="d-block w-100" alt="" />
                                                </div>
                                                {
                                                    room.imageUrls.slice(1).map(room => (
                                                        <div className="carousel-item" key={room.fileName}>
                                                            <img src={`http://localhost:5000/${room.filePath}`} className="d-block w-100" alt="" />
                                                        </div>
                                                    ))
                                                }
                                            </div>

                                            <ol className="carousel-indicators">
                                                <li data-bs-target="#room-thumbnail--slide" data-bs-slide-to="0" className="active">
                                                    <img src={`http://localhost:5000/${room.imageUrls[0].filePath}`} className="d-block w-100" alt="" />
                                                </li>
                                                {
                                                    room.imageUrls.slice(1).map(room => (
                                                        <li data-bs-target="#room-thumbnail--slide" key={room.fileName} data-bs-slide-to={autoIncrease += 1}>
                                                            <img src={`http://localhost:5000/${room.filePath}`} className="d-block w-100" alt="" />
                                                        </li>
                                                    ))
                                                }
                                            </ol>
                                        </div>
                                    </div>

                                    <div className="room-features-area d-flex flex-wrap mb-50">
                                        <h6>Type: <span>{room.type}</span></h6>
                                        <h6>Capacity: <span>Max persion {room.maxCount}</span></h6>
                                        <h6>Status: <span>King beds</span></h6>
                                        <h6>Services: <span>{room.note}</span></h6>
                                    </div>

                                    <p>{room.description}</p>

                                    <p>If you live in New York City or travel to and from New York City a lot, you know all about the traffic there. Getting places is often next to impossible, even with the gazillion yellow cabs. If you’re like me you often look with envy at those shiny limousines with their unformed drivers and wish you could sit in one. Well, you can. New York limo service is more affordable than you think, whether it’s for Newark airport transportation, LaGuardia airport transportation, or to drive wherever you wish to go.</p>

                                    <p>Every time I hail a cab in New York City or wait for one at the airports, I hope I’ll be lucky enough to get one that’s halfway decent and that the driver actually speaks English. I have spent many anxious moments wondering if I ever get to my destination. Or whether I’d get ripped off. Even if all goes well, I can’t say I can remember many rides in New York cabs that were very pleasant. And given how much they cost by now, going with a limo makes ever more sense.</p>
                                </div>


                                <div className="room-service mb-50">
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


                                <div className="room-review-area mb-100">
                                    <h4>Room Review</h4>


                                    <div className="single-room-review-area d-flex align-items-center">
                                        <div className="reviwer-thumbnail">
                                            <img src={avt1} alt="" />
                                        </div>
                                        <div className="reviwer-content">
                                            <div className="reviwer-title-rating d-flex align-items-center justify-content-between">
                                                <div className="reviwer-title">
                                                    <span>27 Aug 2019</span>
                                                    <h6>Brandon Kelley</h6>
                                                </div>
                                                <div className="reviwer-rating">
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                </div>
                                            </div>
                                            <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora.</p>
                                        </div>
                                    </div>


                                    <div className="single-room-review-area d-flex align-items-center">
                                        <div className="reviwer-thumbnail">
                                            <img src={avt2} alt="" />
                                        </div>
                                        <div className="reviwer-content">
                                            <div className="reviwer-title-rating d-flex align-items-center justify-content-between">
                                                <div className="reviwer-title">
                                                    <span>27 Aug 2019</span>
                                                    <h6>Sounron Masha</h6>
                                                </div>
                                                <div className="reviwer-rating">
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                </div>
                                            </div>
                                            <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora.</p>
                                        </div>
                                    </div>


                                    <div className="single-room-review-area d-flex align-items-center">
                                        <div className="reviwer-thumbnail">
                                            <img src={avt3} alt="" />
                                        </div>
                                        <div className="reviwer-content">
                                            <div className="reviwer-title-rating d-flex align-items-center justify-content-between">
                                                <div className="reviwer-title">
                                                    <span>27 Aug 2019</span>
                                                    <h6>Amada Lyly</h6>
                                                </div>
                                                <div className="reviwer-rating">
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
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
            </>
        );
    }

};

export default DetailRoom;
