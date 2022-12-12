import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from "react-toastify";

import './EditProfile.scss'
import { putUpdateUser } from '../../../../services/apiServices';
import ChangePassword from './ChangePassword';


function ChangeInfor(props) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const changeInfor = async (id, newInfor) => {
        try {
            const res = await putUpdateUser(id, newInfor);

            const data = res.data;
            console.log(data)

            if (res.status !== 200) {
                throw new Error(res.message || 'Something went wrong');
            }

            if (data.success) {
                toast.success(data.message)
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error(err.message);
        }
    }

    const formik = useFormik({
        initialValues: {
            username: props.userInfor.username,
            Name: props.userInfor.Name,
            email: props.userInfor.email,
            phoneNumber: props.userInfor.phoneNumber,
            CMND: props.userInfor.CMND,
            address: props.userInfor.address,
        },

        validationSchema: Yup.object({
            Name: Yup.string().required('Please fill in the name field').min(3, 'Name with at least 3 character'),
            email: Yup.string()
                .required('Please fill in the email address field')
                .matches(
                    /^[A-Za-z0-9]{1,30}@[a-z0-9]{2,10}(\.[a-z0-9]{2,10}){1,3}$/,
                    'Please enter a valid email address',
                ),
            phoneNumber: Yup.string()
                .required('Please fill in the phone field')
                .matches(/^0[0-9]{9}$/, 'Please enter a valid phone number'),
        }),

        onSubmit: (newInfor) => {
            console.log(newInfor)
            changeInfor(props.userInfor._id, newInfor)
        },
    });

    return (
        <div className="container-xl px-4">

            <nav className="nav nav-borders nav-borders-handle">
                <h2 className="fs-bolder ms-3">Edit profile <i className="bi bi-pencil-square"></i></h2>
            </nav>
            <hr className="mt-0 mb-4" />
            <div className="row">
                <div className="col-xl-4">

                    <div className="card mb-4 mb-xl-0 card-handle">
                        <div className="card-header">Profile Picture</div>
                        <div className="card-body text-center">

                            <img className="img-account-profile rounded-circle mb-2 img-account-profile-handle"
                                src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="" />

                            <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>

                            <button className="btn btn-primary" type="button">Upload new image</button>
                        </div>
                    </div>
                </div>
                <div className="col-xl-8">

                    <div className="card card-handle mb-4">
                        <div className="card-header">Account Details</div>
                        <div className="card-body">
                            <form onSubmit={formik.handleSubmit} className='was-validated' noValidate>
                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="Name">Full name</label>
                                    <input className="form-control form-contro-handle" name="Name" id="Name" type="text"
                                        placeholder="Enter your name" maxLength="30" required
                                        value={formik.values.Name} onChange={formik.handleChange} />
                                </div>

                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="email">Email address</label>
                                    <input className="form-control form-contro-handle" name="email" id="email" type="email"
                                        placeholder="Enter your email address" required
                                        value={formik.values.email} onChange={formik.handleChange} />
                                </div>

                                <div className="row gx-3 mb-3">

                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="phoneNumer">Phone number</label>
                                        <input className="form-control form-contro-handle" name="phoneNumber" id="phoneNumber" type="text"
                                            placeholder="Enter your phone number" required
                                            value={formik.values.phoneNumber} onChange={formik.handleChange} />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="CMND">Identity card</label>
                                        <input className="form-control form-contro-handle" id="CMND" type="text" name="CMND"
                                            placeholder="Enter your identity card"
                                            value={formik.values.CMND} onChange={formik.handleChange} />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="address">Address</label>
                                    <input className="form-control form-contro-handle" id="address" type="text" name="address"
                                        placeholder="Enter your address"
                                        value={formik.values.address} onChange={formik.handleChange} />
                                </div>

                                <div className="mb-3">
                                    <div className="form-radio-changeInfor">
                                        <label htmlFor="typeUser" className="form-label small mb-1">Khách</label>
                                        <div className="form-radio-changeInfor-item">
                                            <input
                                                type="radio"
                                                name="typeUser"
                                                value="Inland"
                                                id="Inland"
                                                checked="checked"
                                            />
                                            <label htmlFor="Inland">Trong nước</label>

                                            <input
                                                type="radio"
                                                name="typeUser"
                                                value="Foreign"
                                                id="Foreign"
                                            />
                                            <label htmlFor="Foreign">Nước ngoài</label>
                                        </div>
                                    </div>






                                    {/* <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                                        <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked />
                                        <label class="btn btn-outline-primary" for="btnradio1">Radio 1</label>

                                        <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" />
                                        <label class="btn btn-outline-primary" for="btnradio2">Radio 2</label>

                                        <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off" />
                                        <label class="btn btn-outline-primary" for="btnradio3">Radio 3</label>
                                    </div> */}


                                </div>

                                <div className="row gx-3 mb-3 mx-0 d-flex justify-content-center">

                                    <Button variant="light" style={{ width: '50%' }} onClick={handleShow}>
                                        <span className='me-5 fw-bold'>Change my password
                                            <i className="fa-solid fa-key ms-2"></i>
                                        </span><i className="bi bi-chevron-right ms-4"></i>
                                    </Button>
                                </div>

                                <button className="btn btn-primary" type="submit" >Save changes</button>


                            </form>
                        </div>
                    </div>
                </div>
                <ChangePassword handleClose={handleClose} show={show} />
            </div>
        </div>
    )
}

export default ChangeInfor