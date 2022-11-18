import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../../store/authSlice';
import { Link, useNavigate } from 'react-router-dom';

import { FaPhoneAlt } from 'react-icons/fa';
import { AiFillCaretDown } from 'react-icons/ai';
import { HiMail } from 'react-icons/hi';
import { RiAdminFill, RiLogoutBoxRLine, RiUserFill } from 'react-icons/ri';
import Tippy from '@tippyjs/react/headless';
import Swal from 'sweetalert2';

import images from '../../../assets/images';
import './Header.scss';

const TopContent = () => {
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.user);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const handleLogout = () => {
        localStorage.removeItem('user');
        dispatch(authActions.logout());
        Swal.fire('Successful', 'Successfully Logged Out ', 'success').then(() => {
            navigate('/login');
        });
    };

    return (
        <>
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
                            {isAuthenticated ? (
                                <Tippy
                                    visible={visible}
                                    interactive
                                    onClickOutside={() => setVisible(false)}
                                    render={(attrs) => (
                                        <div {...attrs} className="menu">
                                            <div className="item" onClick={() => navigate('/User')}>
                                                <RiUserFill className="icon" />
                                                <span>Account</span>
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
                                    <div className="user" onClick={() => setVisible((prevState) => !prevState)}>
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
