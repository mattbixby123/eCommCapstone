import { useDispatch } from "react-redux";
import { clearToken } from '../redux/authslice';
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../api_calls/api";

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout, {isLoading, isSuccess, isError }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(clearToken());
      navigate('/')
    } catch (error) {
      console.error('Logout Failed.', error);
    }
  };
  // return <button onClick={handleLogout}>Logout</button>;
};

export default useLogout;