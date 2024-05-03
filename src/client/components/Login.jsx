import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../redux/api';
import { setToken } from '../redux/authslice';
import { useDispatch } from 'react-redux';
import { Button, Box, List, ListItem, ListItemText, Typography, TextField } from '@mui/material';

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginUser, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const login = async() => {
    try {
      const response = await loginUser({email, password}).unwrap();

      if (response.token) {
        dispatch(setToken(response.token));
      }
        
        setEmail('');
        setPassword('');
        navigate('/');
    } catch (err) {
        console.error(`${err.name}: ${err.message}`);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField 
          id="email" 
          label="email" 
          variant="filled"
            type='email'
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <TextField 
          id="password" 
          label="password" 
          variant="filled"
            type='password'
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <Button variant="outlined" type='submit'>Login</Button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Login;
