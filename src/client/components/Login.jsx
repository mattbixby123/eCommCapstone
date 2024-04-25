import React, { useState } from 'react';
// import { useLoginMutation } from '../../api_calls/'
import { Button, Box, List, ListItem, ListItemText, Typography, TextField } from '@mui/material';

const Login = () => {
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
        const response = await fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            }, 
            body: JSON.stringify({
                email,
                password
            })
        });
        const result = await response.json();
        setMessage(result.message);
        if(!response.ok) {
          throw(result)
        }
        setEmail('');
        setPassword('');
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
