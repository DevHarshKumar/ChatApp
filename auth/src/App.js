import './App.css';
import { useEffect } from 'react';
import Register from './Pages/Register';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import Login from './Pages/Login';
import ProtectedRoutes from './Routes/ProtectedRoutes';
import { BrowserRouter, Route, Routes, Navigate, } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ForgotPassword from './Pages/ForgotPassword';
import SetNewPassword from './Pages/SetNewPassword';
import ErrorPage from './Pages/ErrorPage';
import { checkAuth } from './Redux/userSlice';

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

 

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const AuthRoute = ({ element }) => (user ? <Navigate to="/" /> : element);

  return (
    <BrowserRouter> {/* Ensure BrowserRouter is wrapping the entire app */}
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path='/login' element={<AuthRoute element={<Login />} />} />
        <Route path='/register' element={<AuthRoute element={<Register />} />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path='/setNewPassword/:userId/:token' element={<SetNewPassword />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path='/' element={<Home />} />
        </Route>

        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
