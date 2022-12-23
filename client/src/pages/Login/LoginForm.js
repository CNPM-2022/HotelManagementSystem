import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

const LoginForm = (props) => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const submitHandler = (event) => {
        event.preventDefault();
        props.onLogin(emailRef.current.value, passwordRef.current.value);
    };

    return (
        <React.Fragment>
            <div className="maincontainer">
                <div className="container-fluid">
                    <div className="row no-gutter">
                        <div className="col-md-6 d-none d-md-flex bg-image"></div>

                        <div className="col-md-6 bg-light bg-opacity-50">
                            <div className="login d-flex align-items-center py-5">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-10 col-xl-7 mx-auto">
                                            <h3 className="display-5 font-weight-bold">Đăng Nhập</h3>
                                            <p className="text-muted mb-4 ">Đăng nhập để trải nghiệm tốt hơn</p>
                                            <form onSubmit={submitHandler}>
                                                <div className="form-group mb-3">
                                                    <input
                                                        id="inputEmail"
                                                        type="text"
                                                        placeholder="Tài khoản"
                                                        required=""
                                                        autoFocus=""
                                                        className="form-control rounded-pill border-0 shadow-sm px-4"
                                                        ref={emailRef}
                                                    />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <input
                                                        id="inputPassword"
                                                        type="password"
                                                        placeholder="Mật khẩu"
                                                        required=""
                                                        className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                                                        ref={passwordRef}
                                                    />
                                                </div>
                                                <p>
                                                    Chưa có tài khoản?
                                                    <Link to="/register" className="px-2 text-primary">
                                                        Đăng kí ngay
                                                    </Link>
                                                </p>
                                                <button
                                                    type="submit"
                                                    className="btn btn_login btn-outline-warning btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                                                >
                                                    Đăng nhập
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

export default LoginForm;
