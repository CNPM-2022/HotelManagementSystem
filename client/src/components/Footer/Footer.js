import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <>
            <footer className="mt-4">
                <div className="container">
                    <div className="sec aboutus">
                        <h4>About Us</h4>
                        <p>
                            In terms of harmony in the city's architectural ensemble, along with the Municipal theatre
                            (1898), Notre Dame Cathedral (1880), City Post Office (1891), People's Committee of Ho Chi
                            Minh City (1898), ReunificationPalace (1966) and Ben Thanh Market (1914) the Hotel
                            Continental Saigon is a focal point in the architecture of the downtown area, maintaining
                            the past historical pe
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
                        <h4>USEFUL LINKS</h4>
                        <ul>
                            <li>
                                <a href="#">Rooms & suites</a>
                            </li>
                            <li>
                                <a href="#">Restaurants & Bars</a>
                            </li>
                            <li>
                                <a href="#">Facilities</a>
                            </li>
                            <li>
                                <a href="#">Discover hotel</a>
                            </li>
                            <li>
                                <a href="#">City Highlight</a>
                            </li>
                        </ul>
                    </div>
                    <div className="sec contact">
                        <h4>CONTACT INFO</h4>
                        <ul className="info">
                            <li>
                                <span>
                                    <i class="fas fa-map-marker-alt"></i>
                                </span>
                                <span>
                                    132 - 134 Dong Khoi St., Dist 1,
                                    <br></br> Ho Chi Minh City, Vietnam
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
                                <span>Email: continentalhotel@vnn.vn</span>
                            </li>
                            <li>
                                <span>
                                    <i class="fas fa-envelope"></i>
                                </span>
                                <span> Web: www.continentalsaigon.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
