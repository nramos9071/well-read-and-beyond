import React, { useState } from 'react';
import './Login.css'; // Importing the CSS stayle
// import Auth from '../../../server/utils/auth';
import { gql, useMutation } from '@apollo/client';




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
   //to switch bweteen sign up and sign in
   const [isSignUp, setIsSignUp] = useState(true);
   const [formState , setFormState] = useState ({ 
       username:'',
       email:'', 
       password: ''});

   const [login, { error, data }] = useMutation(LOGIN_USER);
  const[signUp, { error:signupError, data: signupData }] = useMutation(SIGNUP_USER);
  
   
//handleChange function to update the formState object with the data entered into the form fields
   const handleChange = (event) => {
       const { name, value } = event.target;
       setFormState({
           ...formState,
           [name]: value,
       });
    };
//handleFormSubmit function to submit the form data to the server
   const handleFormSubmit = async event => {
       event.preventDefault();

       try {
        // Basic client-side validation
        if (!formState.username || !formState.password || (isSignUp && !formState.email)) {
            alert('Please fill out all required fields.');
            return;
        }

        // Debugging: Log formState values
        console.log('Form State:', formState);


        //signup a new user
           if (isSignUp) {
          
               const { data } = await signUp({
                
                   variables: { username: formState.username, email: formState.email, password: formState.password },
               });
               //userlogs in aftersign up
               Auth.login(data.signup.token);
           } else {
            //login an existing user
            const { data } = await login({
              variables: {username: formState.username, password: formState.password },
          });
          Auth.login(data.login.token);
           }
           //clear form values
           setFormState({
               username: '',
               email: '',
               password: '',})

       } catch (e) {
           console.error(e);
       }
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
          
          {isSignUp && (//if isSignUp is true, then display the email input field
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
          <br />
          {!isSignUp && (
            <a href="/forgot-password">
              <p className="signup2">Forgot Password?</p>
            </a>
          )}
        </form>
       </div>
       </div>
     );
};

export default Login;
