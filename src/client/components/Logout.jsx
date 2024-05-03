import { useDispatch } from "react-redux";
import { clearToken } from '../redux/authslice';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearToken());
    navigate('/')
  }, []);

    return <h1>Logging out...</h1>
};

export default Logout;