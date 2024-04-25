import { useDispatch } from "react-redux";
import { clearToken } from '../redux/authslice';
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearToken());
    navigate('/')
  }
  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;