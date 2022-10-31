import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="container">
          <div className="sec aboutus">
            <h2>About Us</h2>
            <p>
              HOTEL CONTINENTAL SAIGON AS MONUMENT ARCHITECTURE ARTS OF THE
              CITY. According to the Board of Monuments of the city's review,
              Hotel Continental Saigon was built in 1880, with characteristic
              architectural features, such as, a tile roof, thick brick walls,
              spacious bedrooms and public areas, and four-meter high ceilings
              to avoid the heat of the tropics and to make use of the wind and
              natural light. The design of hotel is in the form of a rectangle,
              in the center is a large garden with three frangipanies planted in
              1880 and still flourishing today, these features create a unique
              feeling of peace and quiet in the midst of this dynamic city that
              can only be found at the Hotel Continental Saigon.
            </p>

            <ul className="sci">
              <li>
                <a href="#">
                  <i className="fab fa-facebook" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-twitter" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-instagram" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-youtube" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="sec quickLinks">
            <h2>Quick Links</h2>
            <ul>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
            </ul>
          </div>
          <div className="sec contact">
            <h2>Contact Us</h2>
            <ul className="info">
              <li>
                <span>
                  <i class="fas fa-map-marker-alt"></i>
                </span>
                <span>
                  132 - 134 Dong Khoi St., Dist 1,<br></br>Ho Chi Minh City,
                  Vietnam
                </span>
              </li>
              <li>
                <span>
                  <i class="fas fa-phone-alt"></i>
                </span>
                <span>Phone: (84.28) 38 299 201</span>
              </li>
              <li>
                <span>
                  <i class="fas fa-envelope"></i>
                </span>
                <span>
                  119/2<br></br>moratuwa
                </span>
              </li>
              <li>
                <span>
                  <i class="fas fa-map-marker-alt"></i>
                </span>
                <span>
                  119/2<br></br>moratuwa
                </span>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
