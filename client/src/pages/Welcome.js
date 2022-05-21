import React from 'react';
import '../styles/layout.css';
import '../styles/welcome.css';
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
          <div className="btn-container-center">
                <Link to="/login">
                    <button class="btn-primary">
                      Login
                    </button>
                </Link>
                <Link to="/signup">
                    <button class="btn-primary">
                      Signup
                    </button>
                </Link>
          </div>
    </section>
  );
}
