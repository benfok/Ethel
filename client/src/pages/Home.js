import React from 'react';
import '../styles/layout.css';
import '../styles/home.css'
import UserHome from './UserHome';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';

export default function Home() {

  return (
    <section className="main-content">
        {Auth.loggedIn() ? (
            <>
                <h2 className="home-h2">My Lists</h2>
                <UserHome />
            </>
        ) : (
            <>
                <h2 className="home-h2">You must be logged in to view this page</h2>
                <div className="btn-container-center">
                    <Link to="/login">
                        <button className="btn-primary">
                        Login
                        </button>
                    </Link>
                    <Link to="/signup">
                        <button className="btn-primary">
                        Signup
                        </button>
                    </Link>
                </div>
            </>
        )}
    </section>
  );
}
