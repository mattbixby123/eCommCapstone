import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Box, List, ListItem, ListItemText, Typography, TextField } from '@mui/material'
import { useWelcomeQuery } from '../../api_calls/api'



function Welcome() {

  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token);

  return (
    <div>
      <div className='welcome-container'>
        <h2>Welcome to page title!!</h2>
        <p>Not a member? No problem, you can register for an account here:</p>
        { token ? <Link to='/customer'>Go to Profile</Link> : <Link to='/register'>Register Here!</Link>}
        <p>Already a member?  Login here:</p>
        <Button variant="contained" className="loginButton" onClick={() => navigate('/login')}>Login Here!</Button>
        <Button variant="contained" className="products" onClick={() => navigate('/product')}>Products</Button>
      </div>
      {/* <img className=''
        src=''
        alt=''>
      </img> */}
    </div>
  )
}

export default Welcome;