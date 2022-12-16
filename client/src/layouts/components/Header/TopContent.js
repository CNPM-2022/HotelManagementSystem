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
                            <span className="contact">
                                <FaPhoneAlt className="icon" />
                                <span>(123) 456-789-1230</span>
                            </span>
                            <span className="contact">
                                <HiMail className="icon" />
                                <span>info.colorlib@gmail.com</span>
                            </span>
                        </div>

                        <div className="actions">
                            {isAuthenticated ? (
                                <UserMenu />
                            ) : (
                                <Link to="/login" className="btn btn-danger">
                                    Đăng nhập
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
