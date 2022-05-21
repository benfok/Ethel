import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
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
      <div className="btn-container-left btn-back">
        <Link to="/login">← Go to Login</Link>
      </div> 
      <h2>Signup</h2>
      <form onSubmit={handleFormSubmit}>
          <label htmlFor="firstName">First Name:</label>
          <input
            className="form-field"
            placeholder="First"
            name="firstName"
            type="firstName"
            id="firstName"
            required
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
            onChange={handleChange}
          />
        <div className="btn-container-left">
          <button className="btn-primary" type="submit">Submit</button>
        </div>
      </form>
    </section>
  );
}

export default Signup;
