import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { RiGroupFill } from 'react-icons/ri';
import { MdOutlineSubject } from 'react-icons/md';


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
                                <RiGroupFill className="icon" />
                                <span>Team 16</span>
                            </span>
                            <span className="contact">
                                <MdOutlineSubject className="icon" />
                                <span>Nhập môn Công nghệ phần mềm</span>
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
