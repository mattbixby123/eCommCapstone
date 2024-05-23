import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const sessionId = params.get('session_id');
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>Order Success</h1>
      {/* <p>Your session ID: {sessionId}</p> */}
      <p>Thank you for shopping with Retro Rag Reads!!</p>
      <button onClick={handleNavigate}>Back to Welcome Page</button>
    </div>
  );
};

export default OrderSuccess;
