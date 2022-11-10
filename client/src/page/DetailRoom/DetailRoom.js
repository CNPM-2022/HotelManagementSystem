import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { roomActions } from '../../store/roomSlice';
import { useLocation } from 'react-router-dom';
import { Carousel, Row, Col, ListGroup } from 'react-bootstrap';
import Loader from '../../components/Loader/Loader';
import './DetailRoom.scss';
import { getRoomById } from '../../services/apiServices';

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

    return (
        <>
            <div>
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
            </div>
        </>
    );
};

export default DetailRoom;
