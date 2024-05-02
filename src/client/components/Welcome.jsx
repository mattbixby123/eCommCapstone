import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@mui/material'
import { useWelcomeQuery } from '../../api_calls/api'
import '../style.css'
import Categories from './Categories';
import Logout from './Logout';

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
        
        <p>Already a member?  Login here:</p>
        <Button 
        variant="contained" 
        className="loginButton" 
        onClick={() => navigate('/login')}
        style={{ fontFamily: 'monospace' }}
        >
          Login Here!
          </Button>
        
      </div>
      {/* <img className=''
        src=''
        alt=''>
      </img> */}
      <Logout/>
      
    </div>
  )
}

export default Welcome;