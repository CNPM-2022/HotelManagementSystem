import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import bookingSlice from '../../store/bookingSlice';
import { toast } from 'react-toastify';

import { Link, useParams } from 'react-router-dom';
import './DetailRoom.scss';
import { getRoomById } from '../../services/apiServices';
import { addFavoriteRoom } from '../../services/apiServices';

import icon1 from '../../assets/images/detailRoom/icon1.png';
import icon2 from '../../assets/images/detailRoom/icon2.png';
import icon3 from '../../assets/images/detailRoom/icon3.png';
import icon4 from '../../assets/images/detailRoom/icon4.png';
import icon5 from '../../assets/images/detailRoom/icon5.png';
import icon6 from '../../assets/images/detailRoom/icon6.png';
import avt1 from '../../assets/images/detailRoom/53.jpg';
import avt2 from '../../assets/images/detailRoom/54.jpg';
import avt3 from '../../assets/images/detailRoom/55.jpg';

const DetailRoom = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const [room, setRoom] = useState({});
    const [loading, setLoading] = useState(true);
    let autoIncrease = 0;

    const handleAddFavorite = async () => {
        const res = await addFavoriteRoom(params.id);
        const { success, message } = res.data;
        if (success) {
            toast.success(message);
        } else {
            toast.error(message);
        }
    };

    const GetDetailRoom = async (roomId) => {
        try {
            const res = await getRoomById(roomId);
            const data = res.data;
            if (res.status !== 200) {
                throw new Error(data.message);
            }
            setRoom(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setLoading(true);
        GetDetailRoom(params.id);
        setLoading(false);
        document.documentElement.scrollTop = 0;
    }, []);

    const handleBookNow = () => {
        dispatch(
            bookingSlice.actions.setMaxPeople({
                maxPeopel: room.maxCount,
            }),
        );
    };

    if (loading || room._id === undefined) {
        return (
            <div className="d-flex justify-content-center align-items-center " style={{ minHeight: '300px' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    } else {
        return (
            <>
                <div className="breadcrumb-area bg-img bg-overlay jarallax">
                    <div className="container h-100">
                        <div className="row h-100 align-items-end">
                            <div className="col-12">
                                <div className="breadcrumb-content d-flex align-items-center justify-content-between pb-5">
                                    <h2 className="room-title">Room #{room.roomNumber}</h2>
                                    <h2 className="room-price">
                                        {room.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VNĐ{' '}
                                        <span>/ Ngày</span>
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="roberto-rooms-area section-padding-100-0">
                    <div className="container-fluid" style={{ maxWidth: '1400px' }}>
                        <div className="row">
                            <div className="col-12 col-lg-8">
                                <div className="single-room-details-area mb-50">
                                    <div className="room-thumbnail-slides mb-3">
                                        <div
                                            id="room-thumbnail--slide"
                                            className="carousel slide"
                                            data-bs-ride="carousel"
                                        >
                                            <div className="carousel-inner">
                                                <div className="carousel-item active">
                                                    <img
                                                        src={`http://localhost:5000/${room.imageUrls[0].filePath}`}
                                                        className="d-block w-100"
                                                        alt=""
                                                    />
                                                </div>
                                                {room.imageUrls.slice(1).map((room) => (
                                                    <div className="carousel-item" key={room.fileName}>
                                                        <img
                                                            src={`http://localhost:5000/${room.filePath}`}
                                                            className="d-block w-100"
                                                            alt=""
                                                        />
                                                    </div>
                                                ))}
                                            </div>

                                            <ol className="carousel-indicators">
                                                <li
                                                    data-bs-target="#room-thumbnail--slide"
                                                    data-bs-slide-to="0"
                                                    className="active"
                                                >
                                                    <img
                                                        src={`http://localhost:5000/${room.imageUrls[0].filePath}`}
                                                        className="d-block w-100"
                                                        alt=""
                                                    />
                                                </li>
                                                {room.imageUrls.slice(1).map((room) => (
                                                    <li
                                                        data-bs-target="#room-thumbnail--slide"
                                                        key={room.fileName}
                                                        data-bs-slide-to={(autoIncrease += 1)}
                                                    >
                                                        <img
                                                            src={`http://localhost:5000/${room.filePath}`}
                                                            className="d-block w-100"
                                                            alt=""
                                                        />
                                                    </li>
                                                ))}
                                            </ol>
                                        </div>
                                    </div>

                                    <div className="mb-3 d-flex justify-content-evenly">
                                        <Link to={`/booking/${room._id}`} onClick={handleBookNow}>
                                            <button className="button-detail-room book-btn">Book now</button>
                                        </Link>
                                        <button
                                            className="button-detail-room  favorite-btn"
                                            onClick={handleAddFavorite}
                                        >
                                            Add to favorite
                                        </button>
                                    </div>

                                    <div className="room-features-area d-flex flex-wrap mb-50">
                                        <h6>
                                            Type: <span>{room.type}</span>
                                        </h6>
                                        <h6>
                                            Capacity: <span>Max persion {room.maxCount}</span>
                                        </h6>
                                        <h6>
                                            Status: <span>King beds</span>
                                        </h6>
                                        <h6>
                                            Services: <span>{room.note}</span>
                                        </h6>
                                    </div>

                                    <p>{room.description}</p>

                                    <p>
                                        If you live in New York City or travel to and from New York City a lot, you know
                                        all about the traffic there. Getting places is often next to impossible, even
                                        with the gazillion yellow cabs. If you’re like me you often look with envy at
                                        those shiny limousines with their unformed drivers and wish you could sit in
                                        one. Well, you can. New York limo service is more affordable than you think,
                                        whether it’s for Newark airport transportation, LaGuardia airport
                                        transportation, or to drive wherever you wish to go.
                                    </p>

                                    <p>
                                        Every time I hail a cab in New York City or wait for one at the airports, I hope
                                        I’ll be lucky enough to get one that’s halfway decent and that the driver
                                        actually speaks English. I have spent many anxious moments wondering if I ever
                                        get to my destination. Or whether I’d get ripped off. Even if all goes well, I
                                        can’t say I can remember many rides in New York cabs that were very pleasant.
                                        And given how much they cost by now, going with a limo makes ever more sense.
                                    </p>
                                </div>

                                <div className="room-service mb-50">
                                    <h4>Room Services</h4>

                                    <ul>
                                        <li>
                                            <img src={icon1} alt="" /> Air Conditioning
                                        </li>
                                        <li>
                                            <img src={icon2} alt="" /> Free drinks
                                        </li>
                                        <li>
                                            <img src={icon3} alt="" /> Restaurant quality
                                        </li>
                                        <li>
                                            <img src={icon4} alt="" /> Cable TV
                                        </li>
                                        <li>
                                            <img src={icon5} alt="" /> Unlimited Wifi
                                        </li>
                                        <li>
                                            <img src={icon6} alt="" /> Service 24/24
                                        </li>
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
                                            <p>
                                                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
                                                consectetur, adipisci velit, sed quia non numquam eius modi tempora.
                                            </p>
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
                                            <p>
                                                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
                                                consectetur, adipisci velit, sed quia non numquam eius modi tempora.
                                            </p>
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
                                            <p>
                                                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
                                                consectetur, adipisci velit, sed quia non numquam eius modi tempora.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-4">
                                <div className="hotel-reservation--area-detail mb-100">
                                    <form action="#" method="post" className="p-3">
                                        <div className="fw-bolder fs-5 mb-3">Search</div>
                                        <div className="form-group mb-30">
                                            <div className="input-daterange" id="datepicker">
                                                <div className="row no-gutters">
                                                    <div className="col-6">
                                                        <label htmlFor="checkIn">Check In</label>
                                                        <input
                                                            type="date"
                                                            className="form-control"
                                                            id="checkIn"
                                                            name="checkin-date"
                                                        />
                                                    </div>
                                                    <div className="col-6">
                                                        <label htmlFor="checkOut">Check Out</label>
                                                        <input
                                                            type="date"
                                                            className="form-control"
                                                            id="checkOut"
                                                            name="checkout-date"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group mb-30">
                                            <label htmlFor="room">Type</label>
                                            <div className="row">
                                                <div className="col-6">
                                                    <select name="room" id="room" className="form-control form-select">
                                                        <option value="all">All</option>
                                                        <option value="A">A</option>
                                                        <option value="B">B</option>
                                                        <option value="C">C</option>
                                                    </select>
                                                </div>
                                                <div className="col-6">
                                                    <select name="children" id="children" className="form-control">
                                                        <option value="children">Children</option>
                                                        <option value="01">01</option>
                                                        <option value="02">02</option>
                                                        <option value="03">03</option>
                                                        <option value="04">04</option>
                                                        <option value="05">05</option>
                                                        <option value="06">06</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <button type="submit" className="btn roberto-btn-detail roberto-btn w-100">
                                                Check Available
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                {/* các phòng liên quan */}
                                <div className="accordion mb-5" id="accordionExample">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingOne">
                                            <button
                                                className="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseOne"
                                                aria-expanded="false"
                                                aria-controls="collapseOne"
                                                style={{ color: 'red' }}
                                            >
                                                <b>Similar rooms</b>
                                            </button>
                                        </h2>
                                        <div
                                            id="collapseOne"
                                            className="accordion-collapse collapse"
                                            aria-labelledby="headingOne"
                                            data-bs-parent="#accordionExample"
                                        >
                                            <div className="accordion-body">chưa có gì đâu mà xem</div>
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
