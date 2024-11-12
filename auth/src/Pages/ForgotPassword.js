import React, {  useState } from 'react';
import { NavLink } from 'react-router-dom';
import axiosInstance from '../utils/axios';

const ForgotPassword = () => {
    const[email,setEmail]=useState('');
    const [message,setMessage]=useState('');


const handleSubmit=async()=>{
   try {
     const response=await axiosInstance.post('/sendResetEmail',{email});
     console.log(response);
     if(response.data.status===200){
        setMessage(response.data.message);
        setTimeout(()=>{
            setMessage('');
        },3000);
     }
   } catch (error) {
     console.log(error);
     setEmail(error);
   }
}


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-lg">
        
        <h5 className="text font-bold text-center text-gray-900">{message}</h5>

        <h2 className="text-3xl font-bold text-center text-gray-900">Forgot Password</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Enter your email"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <button
              onClick={handleSubmit}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Send Reset Link
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">Remembered your password?</span>
          <NavLink 
            to="/login" 
            className="text-indigo-600 font-medium hover:text-indigo-500 ml-2"
          >
            Login
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
