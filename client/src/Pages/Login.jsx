import React, { useState } from 'react';
import './Login.css'; // Importing the CSS stayle
import Auth from '../../../client/src/utils/auth';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';




const SIGNUP_USER = gql`
  mutation signUp($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

const Login = () => {
  const navigate = useNavigate();
  // to switch between sign up and sign in
  const [isSignUp, setIsSignUp] = useState(true);
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [login, { error: loginError }] = useMutation(LOGIN_USER);
  const [signUp, { error: signUpError }] = useMutation(SIGNUP_USER);

  // handleChange function to update the formState object with the data entered into the form fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // handleFormSubmit function to submit the form data to the server
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted');

    try {
      // Basic client-side validation
      if (!formState.username || !formState.password || (isSignUp && !formState.email)) {
        alert('Please fill out all required fields.');
        return;
      }

      // Debugging: Log formState values
      console.log('Form State:', formState);

      if (isSignUp) {
        console.log('Attempting to sign up');
        const { data } = await signUp({
          variables: { username: formState.username, email: formState.email, password: formState.password },
        });
        // Debugging: Log the response data
        console.log('Sign Up Data:', data);
        if (data && data.signUp && data.signUp.token) {
          // user logs in after sign up
          console.log('Sign up successful, logging in');
          Auth.login(data.signUp.token);
          console.log('Navigating to /home');
          navigate('/Home');
        } else {
          console.error('Sign Up Error: No token returned');
        }
      } else {
        console.log('Attempting to log in');
        // login an existing user
        const { data } = await login({
          variables: { username: formState.username, password: formState.password },
        });
        // Debugging: Log the response data
        console.log('Login Data:', data);
        if (data && data.login && data.login.token) {
          console.log('Login successful, logging in');
          Auth.login(data.login.token);
          console.log('Navigating to /home');
          navigate('/Home');
        } else {
          console.error('Login Error: No token returned');
        }
      }
    } catch (error) {
      console.error('Error during sign up/login:', error);
      alert('Error during sign up/login: ' + error.message);
    }

    // clear form values
    setFormState({
      username: '',
      email: '',
      password: '',
    });
  };

  const handleButtonClick = (event) => {
    event.preventDefault();
    
    console.log('Button clicked');
  };

  return (
    <div className="container" style={{ display: 'block', opacity: 1, transition: 'opacity 1s ease-in' }}>
      <div className="c1">
        <div className="c11">
          <h1 className="mainhead">Hello Well Reader!</h1>
          <p className="mainp">Time to go beyond the book shelf..</p>
        </div>
        <div
          id="left"
          className={`toggle-button ${!isSignUp ? 'left_hover' : ''}`}
          onClick={() => setIsSignUp(false)}
        >
          <h1 className={`s1class ${!isSignUp ? 'active' : ''}`}>
            <span>SIGN</span>
            <span className="su">IN</span>
          </h1>
        </div>
        <div
          id="right"
          className={`toggle-button ${isSignUp ? 'right_hover' : ''}`}
          onClick={() => setIsSignUp(true)}
        >
          <h1 className={`s2class ${isSignUp ? 'active' : ''}`}>
            <span>SIGN</span>
            <span className="su">UP</span>
          </h1>
        </div>
      </div>
      <div className="c2">
        <form className={isSignUp ? 'signup' : 'signin'} onSubmit={handleFormSubmit}>
          <h1 className="signup1">{isSignUp ? 'SIGN UP' : 'SIGN IN'}</h1>
          <br />
          {isSignUp && (
            <input
              name="email"
              type="text"
              placeholder="Email*"
              className="username"
              value={formState.email}
              onChange={handleChange}
            />
          )}
          <input
            name="username"
            type="text"
            placeholder="Username*"
            className="username"
            value={formState.username}
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password*"
            className="username"
            value={formState.password}
            onChange={handleChange}
          />
          <button className="btn" style={{ cursor: 'pointer' }} type="submit">
            {isSignUp ? 'Get Started' : 'Go Beyond'}
          </button>
          <button className="btn" style={{ cursor: 'pointer' }} onClick={handleButtonClick}>
            Test Button
          </button>
          <br />
          {!isSignUp && (
            <a href="/forgot-password">
              <p className="signup2">Forgot Password?</p>
            </a>
          )}
          {loginError && <p>Error logging in: {loginError.message}</p>}
          {signUpError && <p>Error signing up: {signUpError.message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
