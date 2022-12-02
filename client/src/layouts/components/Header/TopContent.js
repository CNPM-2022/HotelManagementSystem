import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { FaPhoneAlt } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';

import './Header.scss';
import UserMenu from '../../../components/UserMenu/UserMenu';

const TopContent = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

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
                                <UserMenu />
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
