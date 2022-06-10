import React from 'react';
import '../styles/layout.css';
import '../styles/welcome.css';
import useMedia from '../hooks/useMedia'
import { Link, Navigate } from "react-router-dom";
import ethylPic from "../assets/ethyl-radiant.jpg";

import Auth from '../utils/auth';


export default function Welcome() {
  
  const isDesktop = useMedia('(min-width: 998px)');

  if(Auth.loggedIn()){
    return <Navigate to="/home" />
  } else {

  return (
    <section className="main-content">
      <div id="greeting">
        <h2 className="welcome-h2">Hello there, I'm Ethel!</h2>
        <img className="ethyl-pic" src= {ethylPic} alt="Ethyl" />
      </div>
        <p className="welcome-p">
          I used to always lose track of my things, but then I learned to organize everything by keeping lists. Now I'm the most efficient granny around, and I can help you whippersnappers do the same! 
        </p>
        <p className="welcome-p">
          Sign in to create your own lists, and organize them into whatever kinds of categories you like. Then you can share them with your friends and collaborate on them together! And can I interest you in a hard butterscotch candy?
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
          </div>
     </section>
  );
}
}