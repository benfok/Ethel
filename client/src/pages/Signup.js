import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import '../styles/login.css'
import yarnPic from "../assets/yarn.png";

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await addUser({
        variables: {
          email: formState.email.toLowerCase(),
          password: formState.password,
          firstName: formState.firstName,
          lastName: formState.lastName,
        },
      });
      const token = await response.data.addUser.token;
      Auth.login(token);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <section className="main-content">
      <h2 className="login-h2">Signup</h2>
      <div className="login-content">
        <img className="yarn-pic" src={yarnPic} alt="yarn" />
        <form onSubmit={handleFormSubmit}>
            <label htmlFor="firstName">First Name:</label>
            <input
              className="form-field"
              placeholder="First"
              name="firstName"
              type="firstName"
              id="firstName"
              required
              aria-required="true"
              onChange={handleChange}
            />
            <label htmlFor="lastName">Last Name:</label>
            <input
              className="form-field"
              placeholder="Last"
              name="lastName"
              type="lastName"
              id="lastName"
              required
              aria-required="true"
              onChange={handleChange}
            />
            <label htmlFor="email">Email:</label>
            <input
              className="form-field"
              placeholder="youremail@test.com"
              name="email"
              type="email"
              id="email"
              required
              aria-required="true"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              onChange={handleChange}
            />
            <label htmlFor="pwd">Password:</label>
            <input
              className="form-field"
              placeholder="******"
              name="password"
              type="password"
              id="pwd"
              required
              aria-required="true"
              minLength="6"
              onChange={handleChange}
            />
          <div className="btn-container-left">
            <button className="btn-primary" type="submit">Submit</button>
            <div className="btn-back"><Link to="/login">Login</Link></div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Signup;
