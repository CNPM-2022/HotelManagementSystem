import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const RegisterForm = (props) => {
    const formik = useFormik({
        initialValues: {
            userName: '',
            name: '',
            email: '',
            phone: '',
            password: '',
            confirmedPassword: '',
        },

        validationSchema: Yup.object({
            name: Yup.string().required('Vui lòng điền vào ô này').min(3, 'Tên có ít nhất 3 chữ cái'),
            userName: Yup.string()
                .required('Vui lòng điền vào ô này')
                .matches(/^[a-zA-Z0-9_]{3,}$/, 'Tài khoản không chứa khoảng trắng và ít nhất 3 kí tự'),
            email: Yup.string()
                .required('Vui lòng điền vào ô này')
                .matches(
                    /^[A-Za-z0-9]{1,30}@[a-z0-9]{2,10}(\.[a-z0-9]{2,10}){1,3}$/,
                    'Vui lòng điền email hợp lệ',
                ),
            phone: Yup.string()
                .required('Vui lòng điền vào ô này')
                .matches(/^0[0-9]{9}$/, 'Vui lòng điền số điện thoại hợp lệ'),
            password: Yup.string()
                .required('Vui lòng điền vào ô này')
                .matches(
                    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
                    'Mật khẩu phải từ 7-19 kí tự và có ít nhất 1 chữ cái, 1 số và 1 kí tự đặc biệt',
                ),

            confirmedPassword: Yup.string()
                .required('Vui lòng nhập lại mật khẩu')
                .oneOf([Yup.ref('password'), null], 'Mật khẩu không trùng nhau'),
        }),

        onSubmit: (userInfor) => {
            props.onRegister(userInfor);
        },
    });

    const handleFocus = (e) => {
        document.getElementsByClassName(e.target.id)[0].classList.remove('errorMsg');
    };

    /* const hiddenPassword = (e) => {
        const passField = document.getElementById('password');
        if (passField.type === 'password') {
            passField.type = 'text';
            e.target.classList.add('hide-btn');
        } else {
            passField.type = 'password';
            e.target.classList.remove('hide-btn');
        }
    };

    const hiddenConfirmedPassword = (e) => {
        const passField = document.getElementById('confirmedPassword');
        if (passField.type === 'password') {
            passField.type = 'text';
            e.target.classList.add('hide-btn');
        } else {
            passField.type = 'password';
            e.target.classList.remove('hide-btn');
        }
    }; */

    return (
        <React.Fragment>
            <div className="maincontainer">
                <div className="container-fluid">
                    <div className="row no-gutter">
                        <div className="col-md-6 d-none d-md-flex bg-image"></div>
                        <div className="col-md-6 bg-light">
                            <div className="login d-flex align-items-center">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-10 col-xl-7 mx-auto">
                                            <h3 className="display-5 font-weight-bold ">Đăng kí</h3>
                                            <p className="text-muted mb-4 ">Đăng kí tài khoản mới</p>
                                            <form onSubmit={formik.handleSubmit}>
                                                <div className="form-group mb-3">
                                                    <input
                                                        id="name"
                                                        name="name"
                                                        type="text"
                                                        value={formik.values.name}
                                                        onChange={formik.handleChange}
                                                        placeholder="Nhập tên"
                                                        required=""
                                                        autoFocus
                                                        className="form-control rounded-pill border-0 shadow-sm px-4"
                                                        maxLength="30"
                                                        onFocus={handleFocus}
                                                    />
                                                </div>
                                                <div className="errorMsg name">
                                                    {formik.errors.name && (
                                                        <p className="text-danger ms-4"> {formik.errors.name} </p>
                                                    )}
                                                </div>
                                                <div className="form-group mb-3">
                                                    <input
                                                        id="userName"
                                                        name="userName"
                                                        type="text"
                                                        value={formik.values.userName}
                                                        onChange={formik.handleChange}
                                                        placeholder="Nhập tài khoản"
                                                        required=""
                                                        className="form-control rounded-pill border-0 shadow-sm px-4"
                                                        maxLength="25"
                                                        onFocus={handleFocus}
                                                    />
                                                </div>
                                                <div className="errorMsg userName">
                                                    {formik.errors.userName && (
                                                        <p className="text-danger ms-4"> {formik.errors.userName} </p>
                                                    )}
                                                </div>
                                                <div className="form-group mb-3">
                                                    <input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        value={formik.values.email}
                                                        onChange={formik.handleChange}
                                                        placeholder="Nhập email"
                                                        required=""
                                                        className="form-control rounded-pill border-0 shadow-sm px-4"
                                                        onFocus={handleFocus}
                                                    />
                                                </div>
                                                <div className="errorMsg email">
                                                    {formik.errors.email && (
                                                        <p className="text-danger ms-4"> {formik.errors.email} </p>
                                                    )}
                                                </div>
                                                <div className="form-group mb-3">
                                                    <input
                                                        id="phone"
                                                        name="phone"
                                                        type="text"
                                                        value={formik.values.phone}
                                                        onChange={formik.handleChange}
                                                        placeholder="Nhập số điện thoại"
                                                        required=""
                                                        className="form-control rounded-pill border-0 shadow-sm px-4"
                                                        onFocus={handleFocus}
                                                    />
                                                </div>
                                                <div className="errorMsg phone">
                                                    {formik.errors.phone && (
                                                        <p className="text-danger ms-4"> {formik.errors.phone} </p>
                                                    )}
                                                </div>
                                                <div className="container2">
                                                    <div className="form-group mb-3">
                                                        <input
                                                            id="password"
                                                            name="password"
                                                            type="password"
                                                            value={formik.values.password}
                                                            onChange={formik.handleChange}
                                                            placeholder="Nhập mật khẩu"
                                                            required=""
                                                            className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                                                            maxLength="25"
                                                            onFocus={handleFocus}
                                                        />
                                                    </div>
                                                    {/* <span className="show-btn pass">
                                                        <i className="fas fa-eye" onClick={hiddenPassword}></i>
                                                    </span> */}
                                                    <div className="errorMsg password">
                                                        {formik.errors.password && (
                                                            <p className="text-danger ms-4">
                                                                {' '}
                                                                {formik.errors.password}{' '}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="container2">
                                                    <div className="form-group mb-3">
                                                        <input
                                                            id="confirmedPassword"
                                                            name="confirmedPassword"
                                                            type="password"
                                                            value={formik.values.confirmedPassword}
                                                            onChange={formik.handleChange}
                                                            placeholder="Nhập lại mật khẩu"
                                                            required=""
                                                            className="form-control rounded-pill border-0 shadow-sm px-4"
                                                            maxLength="25"
                                                            onFocus={handleFocus}
                                                        />
                                                    </div>
                                                    {/* <span className="show-btn conf_pass">
                                                        <i className="fas fa-eye" onClick={hiddenConfirmedPassword}></i>
                                                    </span> */}
                                                    <div className="errorMsg confirmedPassword">
                                                        {formik.errors.confirmedPassword && (
                                                            <p className="text-danger ms-4">
                                                                {' '}
                                                                {formik.errors.confirmedPassword}{' '}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>

                                                <button
                                                    type="submit"
                                                    className="btn btn_Register btn-outline-warning btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                                                >
                                                    Đăng kí
                                                </button>

                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default RegisterForm;
