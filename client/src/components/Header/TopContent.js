import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/authSlice';
import { Link, useNavigate } from 'react-router-dom';

import { FaPhoneAlt } from 'react-icons/fa';
import { AiFillCaretDown } from 'react-icons/ai';
import { HiMail } from 'react-icons/hi';
import { RiAdminFill, RiLogoutBoxRLine, RiUserFill } from 'react-icons/ri';
import Tippy from '@tippyjs/react/headless';
import images from '../../assets/images';

import './Header.scss';
import Swal from 'sweetalert2';

const TopContent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.user);

    console.log(user);

    const handleLogout = () => {
        localStorage.removeItem('user');
        dispatch(authActions.logout());
        Swal.fire('Successful', 'Successfully Logged Out ', 'success').then((result) => {
            navigate('/login');
        });
    };

    return (
        <>
            {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-2 ">
                <div className="container-fluid">
                    <NavLink className="navbar-brand d-flex" to="/">
                        <img
                            className="mr-4"
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
            </nav> */}

            <div className="top-header-area">
                <div className="container">
                    <div className="content">
                        <div className="contact-list">
                            <a className="contact" href="#">
                                <FaPhoneAlt className="icon" />
                                <span>(123) 456-789-1230</span>
                            </a>
                            <a className="contact" href="#">
                                <HiMail className="icon" />
                                <span>info.colorlib@gmail.com</span>
                            </a>
                        </div>

                        <div className="actions">
                            {user ? (
                                <Tippy
                                    interactive
                                    render={(attrs) => (
                                        <div {...attrs} className="menu">
                                            <div className="item" onClick={() => navigate('/dashboard')}>
                                                <RiUserFill className="icon" />
                                                <span>View Profile</span>
                                            </div>
                                            <div className="item" onClick={() => navigate('/admins')}>
                                                <RiAdminFill className="icon" />
                                                <span>Admin</span>
                                            </div>
                                            <div className="item" onClick={handleLogout}>
                                                <RiLogoutBoxRLine className="icon" />
                                                <span>Log out</span>
                                            </div>
                                        </div>
                                    )}
                                >
                                    <div className="user">
                                        <span className="username">{user.username}</span>
                                        <img className="avatar" src={images.defaultUser} alt="avatar" />
                                        <AiFillCaretDown className="caret-down" />
                                    </div>
                                </Tippy>
                            ) : (
                                <Link to="/login" className="btn btn-danger">
                                    Log in
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TopContent;
