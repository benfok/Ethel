import React from 'react';
import '../styles/layout.css';
import Welcome from './Welcome';
import UserHome from './UserHome';

import Auth from '../utils/auth';

export default function Home() {

  return (
    <section className="main-content">
        {Auth.loggedIn() ? (
            <UserHome />
        ) : (
            <Welcome />
        )}
    </section>
  );
}
