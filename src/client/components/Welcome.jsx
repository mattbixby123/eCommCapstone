import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@mui/material'
import { useWelcomeQuery } from '../redux/api'
import '../style.css'
import Categories from './Categories';



function Welcome() {

  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token);
  

  return (
    <div>
      {/* <h2 className='welcome-title'>Retro Rag Reads</h2> */}
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
        <Button 
        variant="contained" 
        className="logoutButton" 
        onClick={() => navigate('/logout')}
        style={{ fontFamily: 'monospace' }}
        >
          Logout Here!
          </Button>
        {/* <Button variant="contained" className="products" onClick={() => navigate('/product')}>Products</Button> */}
      </div>

      
    </div>
  )
}

export default Welcome;