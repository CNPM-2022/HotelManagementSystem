import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavDropdown } from 'react-bootstrap';
import { authActions } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import '../Navbar/Nav.css';
import Swal from 'sweetalert2';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.user);

    const logoutHandler = () => {
        localStorage.removeItem('user');
        dispatch(authActions.logout());
        Swal.fire('Successful', 'Successfully Logged Out ', 'success').then((result) => {
            navigate('/login');
        });
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-2 ">
            <div className="container-fluid">
                <NavLink className="navbar-brand d-flex" to="/">
                    <img
                        className="mx-4"
                        src="https://www.continentalsaigon.com/images/logo2021.png"
                        style={{ width: '120px', height: '60px' }}
                    ></img>
                    <h1 className="text-white mx-4">
                        HOTEL CONTINENTAL <br></br>SAIGON
                    </h1>
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                (
                <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <LinkContainer to="/cart">
                            <Nav.Link>
                                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                                Cart
                            </Nav.Link>
                        </LinkContainer>
                        {user ? (
                            <NavDropdown className="link" title={user.username} id="username">
                                <LinkContainer to="/dashboard">
                                    <NavDropdown.Item className="link-dark">Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    <li className="link">Logout</li>
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link active" aria-current="page" to="/login">
                                        <i className="fa fa-user-circle" aria-hidden="true"></i> Login
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link active" aria-current="page" to="/register">
                                        Register
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {user && user.isAdmin && (
                            <NavDropdown className="link" title="Admin">
                                <LinkContainer to="/wedEveMgt">
                                    <NavDropdown.Item className="link-dark">
                                        Wedding & Event Management
                                    </NavDropdown.Item>
                                </LinkContainer>

                                <LinkContainer to="/roomManagement">
                                    <NavDropdown.Item className="link-dark">Room Management</NavDropdown.Item>
                                </LinkContainer>

                                <LinkContainer to="/restaurantManagement">
                                    <NavDropdown.Item className="link-dark">Restaurant Management</NavDropdown.Item>
                                </LinkContainer>

                                <LinkContainer to="/foodManagement">
                                    <NavDropdown.Item className="link-dark">Food Management</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        )}
                    </ul>
                </div>
                )
            </div>
        </nav>
    );
};

export default Navbar;
