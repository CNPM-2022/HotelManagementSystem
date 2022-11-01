import React, { useEffect, useCallback } from 'react';
import './RoomScreen.scss';
import { roomsActions } from '../../store/roomsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { DatePicker, Space } from 'antd';
import Loader from '../../components/Loader';
import 'antd/dist/antd.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();
const { RangePicker } = DatePicker;

const RoomsScreen = () => {
    const dispatch = useDispatch();
    const { loading, rooms, error } = useSelector((state) => state.rooms);

    const getRooms = useCallback(async () => {
        try {
            dispatch(roomsActions.allRoomsRequest());
            const res = await fetch('http://localhost:5000/api/rooms/allrooms');
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message);
            }
            dispatch(roomsActions.allRoomsSuccess(data));
        } catch (error) {
            dispatch(roomsActions.allRoomsFail(error.message));
        }
    }, [dispatch]);

    useEffect(() => {
        getRooms();
    }, [getRooms]);

    return (
        <>
            <div className="container">
                <div className="row bs p-3 m-5 dark" data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                    <div className="col-md-4">
                        <RangePicker style={{ height: '38px' }} format="DD-MM-YYYY" className="m-2" />
                    </div>

                    <div className="col-md-4">
                        <input
                            type="text"
                            className="form-control i2 m-2"
                            placeholder="Search Rooms"
                            // value={searchkey}
                            // onKeyUp={filterBySearch}
                            // onChange={(e) => { setsearchkey(e.target.value) }}
                        />
                    </div>
                    <div className="col-md-4">
                        <select className="form-control m-2">
                            <option value="all">All</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="row justify-content-center mt-5">
                {loading ? (
                    <Loader />
                ) : error ? (
                    <h1>Error...</h1>
                ) : (
                    <div className="col-md-9 mt-2">
                        {rooms.map((room) => (
                            <div className="row bs" key={room._id}>
                                <div className="col-md-4">
                                    <img src={room.imageurls[0]} className="smallimg"></img>
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
                )}
            </div>
        </>
    );
};

export default RoomsScreen;