import React, { useRef } from "react";

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
        <div class="container-fluid">
          <div class="row no-gutter">
            <div class="col-md-6 d-none d-md-flex bg-image"></div>

            <div class="col-md-6 bg-light">
              <div class="login d-flex align-items-center py-5">
                <div class="container">
                  <div class="row">
                    <div class="col-lg-10 col-xl-7 mx-auto">
                      <h3 class="display-5 font-weight-bold">Register Page</h3>
                      <p class="text-muted mb-4 ">
                        Register to your account to continue
                      </p>
                      <form onSubmit={submitHandler}>
                        <div class="form-group mb-3">
                          <input
                            id="inputEmail"
                            type="text"
                            placeholder="Username"
                            required=""
                            autofocus=""
                            class="form-control rounded-pill border-0 shadow-sm px-4"
                            ref={emailRef}
                          />
                        </div>
                        <div class="form-group mb-3">
                          <input
                            id="inputPassword"
                            type="password"
                            placeholder="Password"
                            required=""
                            class="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                            ref={passwordRef}
                          />
                        </div>
                        <div class="custom-control custom-checkbox mb-3">
                          <input
                            id="customCheck1"
                            type="checkbox"
                            checked
                            class="custom-control-input"
                          />
                          <label
                            for="customCheck1"
                            class="custom-control-label mx-2"
                          >
                            Remember password
                          </label>
                        </div>
                        <button
                          type="submit"
                          class="btn btn-outline-warning btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                        >
                          Register
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
