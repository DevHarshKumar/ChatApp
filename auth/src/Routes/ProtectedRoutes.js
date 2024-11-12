import { Navigate, Outlet } from 'react-router-dom';
import { useSelector ,useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { checkAuth } from '../Redux/userSlice';

const ProtectedRoutes = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(checkAuth());
  },[dispatch])

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
