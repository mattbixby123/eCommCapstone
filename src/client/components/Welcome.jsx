import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Box, List, ListItem, ListItemText, Typography, TextField } from '@mui/material'
import { useWelcomeQuery } from '../../api_calls/api'
import '../style.css'
import Categories from './Categories';

function Welcome() {

  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token);

  return (
    <div className='welcome-screen'>
      
      <Categories />
      <div className='welcome-container'>
        <p>Not a member? No problem, you can register for an account here:</p>
        <Button 
        variant="contained" 
        className="registerButton" 
        onClick={() => navigate('/register')}
        style={{ fontFamily: 'monospace' }}
        >
          Register Here!
          </Button>
        {/* { token ? <Button to='/customer'>Go to Profile</Button> : <Link to='/register'>Register Here!</Link>} */}
        <p>Already a member?  Login here:</p>
        <Button 
        variant="contained" 
        className="loginButton" 
        onClick={() => navigate('/login')}
        style={{ fontFamily: 'monospace' }}
        >
          Login Here!
          </Button>
        {/* <Button variant="contained" className="products" onClick={() => navigate('/product')}>Products</Button> */}
      </div>
      {/* <img className=''
        src=''
        alt=''>
      </img> */}
    </div>
  )
}

export default Welcome;