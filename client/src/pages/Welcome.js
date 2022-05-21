import React from 'react';
import '../styles/layout.css';
import '../styles/welcome.css';
import useMedia from '../hooks/useMedia'
import { Link, Navigate } from "react-router-dom";
import ethylPic from "../assets/ethyl.jpg";

import Auth from '../utils/auth';


export default function Welcome() {
  
  const isDesktop = useMedia('(min-width: 998px)');

  if(Auth.loggedIn()){
    return <Navigate to="/home" />
  } else {

  return (
    <section className="main-content">
      <div id="greeting">
        <h2>Hello there, I'm Ethyl!</h2>
        <img src= {ethylPic} alt="Ethyl" />
      </div>
        <p>
          I used to always lose track of my things, but then I learned to organize everything by keeping lists. Now I'm the most efficient granny around, and I can help you whippersnappers do the same! 
        </p>
        <p>
          Sign in to create your own lists and share them with your friends. Or if this is your first time here, click on the Demo button to see how I keep track of all my things. And can I interest you in a hard butterscotch candy?
        </p>
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
          <Link to="/demo">
            <button className="btn-primary">
              Demo
            </button>
          </Link>
          </div>
     </section>
  );
}
