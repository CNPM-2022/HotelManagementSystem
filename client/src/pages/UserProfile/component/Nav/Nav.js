import React from 'react';
import './Nav.scss';
//import logo from "./images/LogoHotel1.png"
import { Link } from 'react-router-dom';

function Nav() {
    return (
        <header className="header-area1">
            <div className="main-header-area2">
                <div className="classy-nav-container breakpoint-off">
                    <div className="container">
                        <nav className="classy-navbar justify-content-between" id="robertoNav">
                            <a className="nav-brand" href="index.html">
                                <img src="" alt="" />
                            </a>

                            <div className="classy-navbar-toggler">
                                <span className="navbarToggler">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </span>
                            </div>

                            <div className="classy-menu">
                                <div className="classycloseIcon">
                                    <div className="cross-wrap">
                                        <span className="top"></span>
                                        <span className="bottom"></span>
                                    </div>
                                </div>

                                <div className="classynav d-flex align-items-center">
                                    <ul id="nav">
                                        <li className="active">
                                            <Link to="/">Home</Link>
                                        </li>
                                        <li>
                                            <Link to="/rooms/1">Rooms</Link>
                                        </li>
                                        <li>
                                            <a href="./about.html">About Us</a>
                                        </li>
                                        <li>
                                            <a href="./blog.html">News</a>
                                        </li>
                                    </ul>

                                    <div className="search-btn ms-4  mb-4">
                                        <i className="bi bi-search"></i>
                                    </div>

                                    <div className="book-now-btn ms-3 ms-lg-5">
                                        <a href="#" id="bookNow">
                                            Book<span> Now</span>
                                            <i className="bi bi-arrow-right-circle ml-2" aria-hidden="true"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Nav;
