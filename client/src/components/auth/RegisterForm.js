import React, { useRef } from 'react';

const RegisterForm = (props) => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const submitHandler = (event) => {
        event.preventDefault();
        props.onRegister(emailRef.current.value, passwordRef.current.value);
    };

    return (
        <React.Fragment>
            <div className="maincontainer">
                <div className="container-fluid">
                    <div className="row no-gutter">
                        <div className="col-md-6 d-none d-md-flex bg-image"></div>

                        <div className="col-md-6 bg-light">
                            <div className="login d-flex align-items-center py-5">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-10 col-xl-7 mx-auto">
                                            <h3 className="display-5 font-weight-bold ">Register</h3>
                                            <p className="text-muted mb-4 ">Register to your account to continue</p>
                                            <form onSubmit={submitHandler}>
                                                <div className="form-group mb-3">
                                                    <input
                                                        id="inputEmail"
                                                        type="text"
                                                        placeholder="Username"
                                                        required=""
                                                        autofocus=""
                                                        className="form-control rounded-pill border-0 shadow-sm px-4"
                                                        ref={emailRef}
                                                    />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <input
                                                        id="inputPassword"
                                                        type="password"
                                                        placeholder="Password"
                                                        required=""
                                                        className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                                                        ref={passwordRef}
                                                    />
                                                </div>
                                                <div className="custom-control custom-checkbox mb-3">
                                                    <input
                                                        id="customCheck1"
                                                        type="checkbox"
                                                        checked
                                                        className="custom-control-input"
                                                    />
                                                    <label for="customCheck1" className="custom-control-label mx-2">
                                                        Remember password
                                                    </label>
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="btn btn_Register btn-outline-warning btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                                                >
                                                    Register
                                                </button>
                                                <p className="text-muted my-2">Create a Account using Social Links.</p>

                                                <div className="social-media">
                                                    <a href="#" className="social-icon">
                                                        <i className="fab fa-twitter"></i>
                                                    </a>
                                                    <a href="#" className="social-icon">
                                                        <i className="fab fa-google"></i>
                                                    </a>
                                                    <a href="#" className="social-icon">
                                                        <i className="fab fa-facebook"></i>
                                                    </a>
                                                    <a href="#" className="social-icon">
                                                        <i className="fab fa-linkedin-in"></i>
                                                    </a>
                                                </div>
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
