import React from 'react';
// import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';



function Welcome() {

  const navigate = useNavigate();
  // const token = useSelector(state => state.auth.token);

  return (
    <div>
      <div className='welcome-container'>
        <h2>Welcome to page title!!</h2>
        <p>Not a member? No problem, you can register for an account here:</p>
        {/* { token ? <Link to='/customer'>Go to Profile</Link> : <Link to='/customer/register'>Register Here!</Link>} */}
        <p>Already a member?  Login here:</p>
        <button className="loginButton" onClick={() => navigate('/customer/login')}>Login Here!</button>
        <button className="products" onClick={() => navigate('/product')}>Products</button>
      </div>
      {/* <img className=''
        src=''
        alt=''>
      </img> */}
    </div>
  )
}

export default Welcome;