import React from "react";
import { useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import "./Landing.css";

AOS.init({
  duration: "2000",
});

const Landing = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="">
      <div className="landing row justify-content-center text-center bg-image">
        <div
          className="col-md-9 my-auto"
          style={{ borderRight: "8px solid white" }}
        >
          {isAuth && (
            <p
              className="text-white display-6 font-weight-bold"
              data-aos="zoom-in"
              style={{ fontWeight: "bold" }}
            >
              Wellcome {user.username} to
            </p>
          )}
          <h2 style={{ color: "white", fontSize: "100px" }} data-aos="zoom-in">
            HOTEL CONTINENTAL SAIGON
          </h2>
          <h1 style={{ color: "white" }} data-aos="zoom-out">
            “There is only one boss. The Guest.
          </h1>
          <Link to="/home">
            <button className="btn btn-outline-warning">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
