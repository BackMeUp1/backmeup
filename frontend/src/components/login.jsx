import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpRole, setSignUpRole] = useState('user');
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [isSignInVisible, setIsSignInVisible] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [signUpErrorMessage, setSignUpErrorMessage] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);

  const navigate = useNavigate();


  const handleSignUp = () => {
    setIsSigningUp(true);

    axios
      .post('http://localhost:4000/api/users/signup', {
        name: signUpName,
        email: signUpEmail,
        password: signUpPassword,
        role: signUpRole,
      })
      .then(response => {
        setIsSigningUp(false);
        setIsSignInVisible(true);
      })
      .catch(error => {
        setIsSigningUp(false);

        if (error.response) {
          const message = error.response.data.message;
          setSignUpErrorMessage(message);
        } else {
          setSignUpErrorMessage('An error occurred while signing up. Please try again later.');
        }
      });
  };

  // Inside handleSignIn function
  const handleSignIn = () => {
    axios
      .post('http://localhost:4000/api/users/signin', {
        email: signInEmail,
        password: signInPassword,
      })
      .then(response => {
        const token = response.data.token;
        const userRole = response.data.role;
        Cookies.set('token', token);

        setIsSignedIn(true);
        setUserRole(userRole);
        navigate(userRole === 'user' ? '/home' : '/admin/Dashboard');
      })
      .catch(error => {
        console.error('Error signing in:', error);
      });
  };

  const handleSignOut = () => {
    Cookies.remove('token');
    setIsSignedIn(false);
    navigate('/login');
  };

  const toggleSignIn = () => {
    setIsSignInVisible(!isSignInVisible);
  };

  return (
    <div className="home">
      <div className="form-container">
        {isSignedIn ? (
          <div>
            <p>Welcome, {signInEmail}</p>
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        ) : (
          <div className="auth-form">
            {isSignInVisible ? (
              <div>
                <h3>Sign In</h3>
                <input
                  type="email"
                  placeholder="Email"
                  value={signInEmail}
                  onChange={e => setSignInEmail(e.target.value)}
                  className="form-input"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={signInPassword}
                  onChange={e => setSignInPassword(e.target.value)}
                  className="form-input"
                />
                <button onClick={handleSignIn} className="form-button">Sign In</button>
                <p>Don't have an account? <button onClick={toggleSignIn} className="arrow-wrapper">Sign Up</button></p>
              </div>
            ) : (
              <div>
                <h3>Sign Up</h3>
                {signUpErrorMessage && <p className="error-message">{signUpErrorMessage}</p>}
                <input
                  type="text"
                  placeholder="Name"
                  value={signUpName}
                  onChange={e => setSignUpName(e.target.value)}
                  className="form-input"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={signUpEmail}
                  onChange={e => setSignUpEmail(e.target.value)}
                  className="form-input"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={signUpPassword}
                  onChange={e => setSignUpPassword(e.target.value)}
                  className="form-input"
                />
                <select
                  value={signUpRole}
                  onChange={e => setSignUpRole(e.target.value)}
                  className="form-input"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                {isSigningUp ? (
                  <p>Signing up...</p>
                ) : (
                  <button onClick={handleSignUp} className="form-button">Sign Up</button>
                )}
                <p>Already have an account? <button onClick={toggleSignIn} className="arrow-wrapper">Sign In</button></p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;