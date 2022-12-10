import React, { useEffect, useCallback, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useLocation } from 'react-router-dom';

import $ from "jquery";



import './Booking.scss'
import { getRoomById } from '../../services/apiServices';

window.jQuery = $;
require('../../../node_modules/jquery-steps/build/jquery.steps')



const BookingScreen = () => {


    return (
        <div className="m-0 booking">
            <div className="main">

                <div className="container-booking">
                    <h2>Nhập thông tin chi tiết của bạn </h2>
                    <form method="POST" id="booking-form" className="booking-form">
                        <h3>
                            <span className="title_text">Nhập thông tin</span>
                        </h3>
                        <fieldset>
                            <div className="fieldset-content">

                                <div className="form-group-booking">
                                    <label htmlFor="checkIn">Check In</label>
                                    <input type="date" className="form-control" id="checkIn" name="checkin-date" />
                                    <label htmlFor="checkIn">Check In</label>

                                    {/* 1 */}

                                </div>
                            </div>
                            <div className="fieldset-footer">
                                <span>Step 1 of 3</span>
                            </div>
                        </fieldset>

                        <h3>
                            <span className="title_text">Xác nhận</span>
                        </h3>
                        <fieldset>

                            <div className="fieldset-content">




                                <div className="form-radio-booking">
                                    <label htmlFor="gender" className="form-label">Gender</label>
                                    <div className="form-radio-booking-item">
                                        <input type="radio" name="gender" value="male" id="male" checked />
                                        <label htmlFor="male">Male</label>

                                        <input type="radio" name="gender" value="female" id="female" />
                                        <label htmlFor="female">Female</label>
                                    </div>
                                </div>

                            </div>

                            <div className="fieldset-footer">
                                <span>Step 2 of 3</span>
                            </div>

                        </fieldset>

                        <h3>
                            <span className="title_text">Đã xong</span>
                        </h3>
                        <fieldset>
                            <div className="fieldset-content">



                                <div className="form-group-booking">

                                </div>
                            </div>

                            <div className="fieldset-footer">
                                <span>Step 3 of 3</span>
                            </div>
                        </fieldset>
                    </form>
                </div>

            </div>

        </div>
    );
};



export default BookingScreen;
