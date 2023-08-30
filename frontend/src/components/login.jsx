import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpRole, setSignUpRole] = useState('user');
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [isSignInVisible, setIsSignInVisible] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = () => {
    axios
      .post('http://localhost:4000/api/users/signup', {
        name: signUpName,
        email: signUpEmail,
        password: signUpPassword,
        role: signUpRole,
      })
      .then(response => {
        console.log('User signed up:', response.data);
        setIsSignInVisible(true);
        setIsSignedIn(true);
        if (signUpRole === 'user') {
            navigate('/home');
          } else if (signUpRole === 'admin') {
            navigate('/admin/Dashboard');          }
      })
      .catch(error => {
        console.error('Error signing up:', error);
      });
  };

  const handleSignIn = () => {
    axios
      .post('http://localhost:4000/api/users/signin', {
        email: signInEmail,
        password: signInPassword,
      })
      .then(response => {
        console.log('User signed in:', response.data);
        setIsSignedIn(true);
        const userRole = response.data.role;
      if (userRole === 'user') {
        navigate('/home');
      } else if (userRole === 'admin') {
        navigate('/admin/Dashboard');      }
      })
      .catch(error => {
        console.error('Error signing in:', error);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setIsSignedIn(false);
    navigate('/login');
  };

  const toggleSignIn = () => {
    setIsSignInVisible(!isSignInVisible);
  };

  return (
    <div className='home'>
      <div className='form-container'>
        {isSignedIn ? (
          <div>
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        ) : isSignInVisible ? (
          <div className='auth-form'>
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
      <div className="auth-form">
        <h3>Sign Up</h3>
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
        <button onClick={handleSignUp} className="form-button">Sign Up</button>
        <p>Already have an account? <button onClick={toggleSignIn} className="arrow-wrapper">Sign In</button></p>
      </div>
    )}
    </div>
    </div>
  );
};

export default Home;
