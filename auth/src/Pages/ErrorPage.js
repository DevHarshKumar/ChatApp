import React from 'react';
import { NavLink } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-green-500 text-white">
      <div className="text-center bg-white text-gray-900 p-8 rounded-lg shadow-lg">
        <h1 className="text-5xl font-bold">404</h1>
        <p className="text-xl mt-4">Oops! The page you're looking for doesn't exist.</p>
        <NavLink
          to="/"
          className="mt-6 inline-block bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          Go to Home
        </NavLink>
      </div>
    </div>
  );
};

export default ErrorPage;
