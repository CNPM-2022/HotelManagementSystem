import { FaBars } from 'react-icons/fa';
import { AiOutlineMail, AiFillBell } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import UserMenu from '../../components/UserMenu/UserMenu';
import { useTranslation } from 'react-i18next';

function Header({ handleToggleSidebar }) {
    const { t } = useTranslation();

    return (
        <header className="header-container container-fluid">
            <div className="left-content">
                <div className="item">
                    <i className="icon" onClick={handleToggleSidebar}>
                        <FaBars />
                    </i>
                </div>
                <div className="item">
                    <Link to="/">{t('home')}</Link>
                </div>
            </div>

            <div className="right-content">
                <div className="item">
                    <i className="icon">
                        <AiOutlineMail />
                    </i>
                </div>
                <div className="item">
                    <i className="icon">
                        <AiFillBell />
                    </i>
                </div>
                <div className="user-menu">
                    <UserMenu />
                </div>
            </div>
        </header>
    );
}

export default Header;
