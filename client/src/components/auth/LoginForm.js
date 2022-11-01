import React, { useRef } from "react";
import { Link } from "react-router-dom";

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
                      <h3 className="display-5 font-weight-bold">Login Page</h3>
                      <p className="text-muted mb-4 ">
                        Login to your account to continue
                      </p>
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
                          <label
                            for="customCheck1"
                            className="custom-control-label mx-2"
                          >
                            Remember password
                          </label>
                        </div>
                        <p>
                          New Customer?
                          <Link to="/register" className="px-2">
                            Register Now
                          </Link>
                        </p>
                        <button
                          type="submit"
                          className="btn btn_login btn-outline-warning btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                        >
                          Sign in
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
