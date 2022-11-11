import React from "react";
import './Footer.scss'

function Footer() {
    return (
        <footer className="footer-area section-padding-80-0">

            <div className="main-footer-area">
                <div className="container">
                    <div className="row align-items-baseline justify-content-between">

                        <div className="col-12 col-sm-6 col-lg-3">
                            <div className="single-footer-widget mb-80">

                                <a href="#" className="footer-logo"><img src="img/core-img/logo2.png" alt="" /></a>

                                <h4>+12 345-678-9999</h4>
                                <span>Info.colorlib@gmail.com</span>
                                <span>856 Cordia Extension Apt. 356, Lake Deangeloburgh, South Africa</span>
                            </div>
                        </div>


                        <div className="col-12 col-sm-6 col-lg-3 mt-4">
                            <div className="single-footer-widget mb-80">

                                <h5 className="widget-title">Blogs</h5>


                                <div className="latest-blog-area">
                                    <a href="#" className="post-title">Freelance Design Tricks How</a>
                                    <span className="post-date"><i className="fa fa-clock-o" aria-hidden="true"></i> Jan 02, 2019</span>
                                </div>


                                <div className="latest-blog-area">
                                    <a href="#" className="post-title">Free Advertising For Your Online</a>
                                    <span className="post-date"><i className="fa fa-clock-o" aria-hidden="true"></i> Jan 02, 2019</span>
                                </div>
                            </div>
                        </div>


                        <div className="col-12 col-sm-8 col-lg-4">
                            <div className="single-footer-widget mb-80">

                                <h5 className="widget-title">Subscribe Newsletter</h5>
                                <span>Subscribe our newsletter gor get notification about new updates.</span>


                                <form action="index.html" className="nl-form">
                                    <input type="email" className="form-control" placeholder="Enter your email..." />
                                    <button type="submit"><i className="bi bi-send-fill"></i></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="container">
                <div className="copywrite-content">
                    <div className="row align-items-center">
                        <div className="col-12 col-md-8">

                            <div className="copywrite-text">
                                <p>
                                    Copyright &copy; 2022 All rights reserved | This website is made by team 16
                                </p>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">

                            <div className="social-info">
                                <a href="#"><i className="bi bi-facebook"></i></a>
                                <a href="#"><i className="bi bi-twitter"></i></a>
                                <a href="#"><i className="bi bi-instagram"></i></a>
                                <a href="#"><i className="bi bi-github"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer