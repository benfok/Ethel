import React from 'react';
import '../styles/header.css';
import { FaRegSmile } from 'react-icons/fa'
import { IoMdLogIn } from 'react-icons/io';
import { IoMdLogOut } from 'react-icons/io';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';
import { GiTeapot } from 'react-icons/gi'
import { FaHome } from 'react-icons/fa';

import Auth from '../utils/auth';

const Header = () => {

    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };

    return (
        <header>
            {Auth.loggedIn() ? (
            <IconContext.Provider value={{ className: "header-icon" }}>
                <Link to="/">
                    <FaHome />
                </Link>
            </IconContext.Provider>
            ) : (
            <IconContext.Provider value={{ className: "header-icon" }}>
                <Link to="/">
                    <GiTeapot />
                </Link>
            </IconContext.Provider>
            )}
            <h1>Ethel</h1>
            {Auth.loggedIn() ? (
                <IconContext.Provider value={{ className: "header-icon" }}>
                    <a href="/" onClick={logout}>
                        <IoMdLogOut />
                    </a>
                </IconContext.Provider>
            ) : (
                <IconContext.Provider value={{ className: "header-icon" }}>
                    <Link to="/login">
                        <IoMdLogIn />
                    </Link>
                </IconContext.Provider>
            )}
        </header>
    )
}


export default Header;