import React from 'react';
import '../styles/layout.css';
import '../styles/home.css';
import useMedia from '../hooks/useMedia'
import { Link } from "react-router-dom";

export default function Home() {

  const isDesktop = useMedia('(min-width: 998px)');

  return (
    <section className="main-content">
          <h2>Welcome</h2>
          <p>
            This is the home screen
          </p>
          <div className="home-buttons">
              <button class="btn-primary">
                  <Link to="/login">
                      Login
                  </Link>
              </button>
              <button class="btn-primary">
                  <Link to="/signup">
                      Signup
                  </Link>
              </button>
          </div>
    </section>
  );
}
