import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { roomActions } from '../../store/roomSlice';
import { useLocation } from 'react-router-dom';

import Aos from 'aos';
import 'aos/dist/aos.css';
import { getRoomById } from '../../services/apiServices';
Aos.init();
Aos.refresh();

const BookingScreen = () => {
    const dispatch = useDispatch();
    const { loading, room, error } = useSelector((state) => state.room);
    const location = useLocation();
    const roomId = location.pathname.split('/')[2];

    useEffect(() => {
        GetDetailRoom();
    }, []);

    const GetDetailRoom = async () => {
        try {
            dispatch(roomActions.RoomByIdRequest());
            const res = await getRoomById(roomId);
            const data = await res.json();
            console.log(data);
            if (!res.ok) {
                throw new Error(data.message);
            }
            dispatch(roomActions.RoomByIdSuccess(data));
        } catch (error) {
            dispatch(roomActions.RoomByIdFail(error.message));
        }
    };

    return (
        <div className="m-5">
            <div className="row p-3 mb-5 bs" data-aos="fade-up" duration="1200" data-aos-anchor-placement="top-center">
                <div className="col-md-6 my-auto">
                    <div>
                        {/* <img
              src={`${room.imageurls.shift()} `}
              style={{ height: "400px" }}
              className="w-100"
            /> */}
                    </div>
                </div>
                <div className="col-md-6 text-right">
                    <div>
                        <h1>
                            <b>Booking Details</b>
                        </h1>
                        <hr />

                        <p>
                            <b>Name</b> : #
                        </p>
                        <p>
                            <b>From Date</b> : #
                        </p>
                        <p>
                            <b>To Date</b> : #
                        </p>
                        <p>
                            <b>Max Count </b>:#
                        </p>
                    </div>

                    <div className="mt-5">
                        <h1>
                            <b>Amount</b>
                        </h1>
                        <hr />
                        <p>
                            Total Days : <b>#</b>
                        </p>
                        <p>
                            Rent Per Day : <b>#</b>
                        </p>
                        <h1>
                            <b>Total Amount : # /-</b>
                        </h1>

                        <button className="btn btn-primary">Pay Now</button>

                        {/* </StripeCheckout> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingScreen;
