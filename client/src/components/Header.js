import React from 'react';
import '../styles/header.css';
import { FaRegSmile } from 'react-icons/fa'
import { IoMdLogIn } from 'react-icons/io';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';
import { GiTeapot } from 'react-icons/gi'


class Header extends React.Component {
    render () {
        return (
            <header>
                <IconContext.Provider value={{ className: "header-icon" }}>
                    <Link to="/home">
                        <GiTeapot />
                    </Link>
                </IconContext.Provider>
                <h1>Ethyl</h1>
                <IconContext.Provider value={{ className: "header-icon" }}>
                    <IoMdLogIn />
                </IconContext.Provider>
            </header>
        )
    }
}

export default Header;