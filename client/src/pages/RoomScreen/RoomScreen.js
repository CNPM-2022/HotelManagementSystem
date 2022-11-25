import { useEffect, useState } from 'react';
import './RoomScreen.scss';
import { LinkContainer } from 'react-router-bootstrap';
import { getAllRooms } from '../../services/apiServices';
import AllRoom from './AllRoom';

// import { roomsActions } from '../../store/roomsSlice';
// import { useDispatch, useSelector } from 'react-redux';

//import { DatePicker, Space } from 'antd';
// import Loader from '../../components/Loader';


/* const { RangePicker } = DatePicker; */

const RoomsScreen = () => {
    // const dispatch = useDispatch();
    // const { loading, rooms, error } = useSelector((state) => state.rooms);

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        getRooms();
    }, []);

    const getRooms = async () => {
        try {
            // dispatch(roomsActions.allRoomsRequest());
            const res = await getAllRooms();
            const data = res.data;

            if (res.status !== 200) {
                throw new Error(data.message);
            }

            setRooms(data);
            // dispatch(roomsActions.allRoomsSuccess(data));
        } catch (error) {
            // dispatch(roomsActions.allRoomsFail(error.message));
        }
    };

    return (
        <>
            <div className="breadcrumb-area bg-img bg-overlay jarallax">
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="breadcrumb-content text-center">
                                <h2 className="page-title">Our Room</h2>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb justify-content-center">
                                        <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Room</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="roberto-about-area section-padding-100-0">
                <div className="hotel-search-form-area" data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                    <div className="container-fluid">
                        <div className="hotel-search-form">
                            <form action="#" method="post">
                                <div className="row justify-content-between align-items-end">
                                    <div className="col-6 col-md-2 col-lg-3">
                                        <label htmlFor="checkIn">Check In</label>
                                        <input type="date" className="form-control" id="checkIn" name="checkin-date" />
                                    </div>
                                    <div className="col-6 col-md-2 col-lg-3">
                                        <label htmlFor="checkOut">Check Out</label>
                                        <input type="date" className="form-control" id="checkOut" name="checkout-date" />
                                    </div>
                                    <div className="col-4 col-md-1">
                                        <label htmlFor="room">Type</label>
                                        <select name="room" id="room" className="form-control form-select">
                                            <option value="all">All</option>
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="C">C</option>
                                        </select>
                                    </div>
                                    <div className="col-4 col-md-1">
                                        <label htmlFor="number">Number</label>
                                        <input
                                            type="text"
                                            className="form-control i2"
                                            placeholder="Ex: 123"
                                            name="number"
                                        />
                                    </div>
                                    <div className="col-12 col-md-3">
                                        <button type="submit" className="form-control btn roberto-btn w-100">Check Availability</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <AllRoom />

            <div className="row justify-content-center mt-5">
                <div className="col-md-9 mt-2">
                    {rooms &&
                        rooms.length > 0 &&
                        rooms.map((room) => (
                            <div className="row bs" key={room._id}>
                                <div className="col-md-4">
                                    <img src={room.imageurls[0]} className="smallimg" alt="room"></img>
                                </div>
                                <div className="col-md-7">
                                    <h1>{room.name}</h1>
                                    <b>
                                        <p>Max Count: {room.maxcount}</p>
                                        <p>Phone Number: {room.phonenumber}</p>
                                        <p>Type of Room: {room.type}</p>
                                    </b>

                                    <div style={{ float: 'right' }} className="vb">
                                        <LinkContainer to={`/roombook/${room._id}`}>
                                            <button className="btn btn-outline-warning">Book Now</button>
                                        </LinkContainer>
                                    </div>
                                    <div style={{ float: 'right' }} className="vb px-2">
                                        <LinkContainer to={`/room/${room._id}`}>
                                            <button className="btn btn-outline-warning">View Details</button>
                                        </LinkContainer>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
};

export default RoomsScreen;
