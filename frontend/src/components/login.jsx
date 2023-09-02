import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Grid,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

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

        setUserRole(userRole);
        navigate(userRole === 'admin' ? '/admin/Dashboard' : '/');
        window.location.reload();
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
    <Container>
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: '24px' }}>
            {isSignedIn ? (
              <div>
                <Typography variant="h5" gutterBottom>
                  Welcome, {signInEmail}
                </Typography>
                <Button variant="contained" color="secondary" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="auth-form">
                {isSignInVisible ? (
                  <div>
                    <Typography variant="h5" gutterBottom>
                      Sign In
                    </Typography>
                    <TextField
                      label="Email"
                      variant="outlined"
                      fullWidth
                      value={signInEmail}
                      onChange={e => setSignInEmail(e.target.value)}
                      margin="normal"
                    />
                    <TextField
                      label="Password"
                      type="password"
                      variant="outlined"
                      fullWidth
                      value={signInPassword}
                      onChange={e => setSignInPassword(e.target.value)}
                      margin="normal"
                    />
                    <Button variant="contained" color="primary" onClick={handleSignIn} fullWidth>
                      Sign In
                    </Button>
                    <Typography variant="body2">
                      Don't have an account?{' '}
                      <Button color="primary" onClick={toggleSignIn}>
                        Sign Up
                      </Button>
                    </Typography>
                  </div>
                ) : (
                  <div>
                    <Typography variant="h5" gutterBottom>
                      Sign Up
                    </Typography>
                    {signUpErrorMessage && (
                      <Typography variant="body2" color="error">
                        {signUpErrorMessage}
                      </Typography>
                    )}
                    <TextField
                      label="Name"
                      variant="outlined"
                      fullWidth
                      value={signUpName}
                      onChange={e => setSignUpName(e.target.value)}
                      margin="normal"
                    />
                    <TextField
                      label="Email"
                      type="email"
                      variant="outlined"
                      fullWidth
                      value={signUpEmail}
                      onChange={e => setSignUpEmail(e.target.value)}
                      margin="normal"
                    />
                    <TextField
                      label="Password"
                      type="password"
                      variant="outlined"
                      fullWidth
                      value={signUpPassword}
                      onChange={e => setSignUpPassword(e.target.value)}
                      margin="normal"
                    />
                    <FormControl variant="outlined" fullWidth margin="normal">
                      <InputLabel>Role</InputLabel>
                      <Select
                        value={signUpRole}
                        onChange={e => setSignUpRole(e.target.value)}
                        label="Role"
                      >
                        <MenuItem value="user">User</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                      </Select>
                    </FormControl>
                    {isSigningUp ? (
                      <Typography variant="body2">Signing up...</Typography>
                    ) : (
                      <Button variant="contained" color="primary" onClick={handleSignUp} fullWidth>
                        Sign Up
                      </Button>
                    )}
                    <Typography variant="body2">
                      Already have an account?{' '}
                      <Button color="primary" onClick={toggleSignIn}>
                        Sign In
                      </Button>
                    </Typography>
                  </div>
                )}
              </div>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
