import React from 'react';

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Profile = () => {
  const {user}=useSelector(state=>state.user);
 console.log("user",user)

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-red-500">Error: Unable to fetch user data.</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900">Your Profile</h2>

        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium text-gray-700">Name</label>
            <div className="text-lg text-gray-900 mt-1">{user.name}</div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <div className="text-lg text-gray-900 mt-1">{user.email}</div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Role</label>
            <div className="text-lg text-gray-900 mt-1">{user.role}</div>
          </div>
        

          <div>
            <label className="text-sm font-medium text-gray-700">Contact</label>
            <div className="text-lg text-gray-900 mt-1">{user.contact}</div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Address</label>
            <div className="text-lg text-gray-900 mt-1">{user.address}</div>
          </div>
        </div>

        <div className="text-center mt-4">
          <NavLink
            to={`/updateUser/${user.userId}`}
            className="text-indigo-600 font-medium hover:text-indigo-500 ml-2"
          >
            Edit Profile
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Profile;
