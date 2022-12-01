import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillCaretDown } from 'react-icons/ai';
import { BiWorld } from 'react-icons/bi';
import { RiAdminFill, RiLogoutBoxRLine, RiUserFill } from 'react-icons/ri';
import Tippy from '@tippyjs/react/headless';

import images from '../../../assets/images';

function Menu({ user, handleLogout }) {
    const userMenu = [
        {
            icon: <RiUserFill />,
            title: 'Account',
            onClick: () => navigate('/User'),
        },
        {
            icon: <RiAdminFill />,
            title: 'Admin',
            onClick: () => navigate('/admins'),
        },
        {
            icon: <BiWorld />,
            title: 'English',
            onClick: () => {},
            children: [
                {
                    code: 'vi',
                    locale: 'Tiếng Việt',
                },
                {
                    code: 'en',
                    locale: 'English',
                },
            ],
        },
        {
            icon: <RiLogoutBoxRLine />,
            title: 'Log out',
            onClick: handleLogout,
            separate: true,
        },
    ];

    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();

    return (
        <Tippy
            visible={visible}
            interactive
            onClickOutside={() => setVisible(false)}
            render={(attrs) => (
                <div {...attrs} className="menu">
                    {userMenu.map((item) => (
                        <div
                            key={item.title}
                            className={item.separate ? 'item separate' : 'item'}
                            onClick={item.onClick}
                        >
                            <i className="icon">{item.icon}</i>
                            <span>{item.title}</span>
                        </div>
                    ))}
                </div>
            )}
        >
            <div className="user" onClick={() => setVisible((prevState) => !prevState)}>
                <span className="username">{user.username}</span>
                <img className="avatar" src={images.defaultUser} alt="avatar" />
                <AiFillCaretDown className="caret-down" />
            </div>
        </Tippy>
    );
}

export default Menu;
