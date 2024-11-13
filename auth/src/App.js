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
import About from './Pages/About';
import ScrollToTop from './utils/ScrollToTop';
import Contact from './Pages/Contact';
import Services from './Pages/Services';
import DefaultHomePage from './Pages/DefaultHomePage';
import Footer from './Components/Footer';
import { checkAuth } from './Redux/userSlice';
import Profile from './Pages/Profile';
import UpdateUser from './Pages/UpdateUser';
import { ToastContainer } from 'react-toastify';
// Chat Imports
import ChatPage from './Pages/Chat/ChatPage';

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
      <ToastContainer/>
      <ScrollToTop/>
      <Routes>
        {/* Public Routes */}
        <Route path='/about' element={<About/>}/>
        <Route path='/services' element={<Services/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/home' element={<AuthRoute element={<DefaultHomePage/>}/>}/>
        <Route path='/login' element={<AuthRoute element={<Login />} />} />
        <Route path='/register' element={<AuthRoute element={<Register />} />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path='/setNewPassword/:userId/:token' element={<SetNewPassword />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path='/' element={<Home />} />
          <Route path='/chat' element={<ChatPage/>}/>
          <Route path='/profile/:userId' element={<Profile />} />
          <Route path='/updateUser/:userId' element={<UpdateUser/>} />
        </Route>

        <Route path='*' element={<ErrorPage />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
