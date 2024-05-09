import { useDispatch } from "react-redux";
import { clearToken } from '../redux/authslice';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLogoutMutation } from '../redux/api';

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout, {isLoading, isSuccess, isError }] = useLogoutMutation();

  useEffect(() => {
    dispatch(clearToken());
    navigate('/')
  }, []);

    return <h1>Logging out...</h1>
};

export default useLogout;