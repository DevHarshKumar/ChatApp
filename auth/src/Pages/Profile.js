import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  console.log("user", user);
  console.log(user.profileImage)

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-green-500 text-white">
        <div className="text-red-500">Error: Unable to fetch user data.</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-green-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900">Your Profile</h2>

        {/* Profile Image */}
        <div className="flex justify-center mt-6">
          <img
            src={`http://localhost:5000/${user.profileImage}`||'/boy.png'} // Default image if no profile image is available
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-indigo-600"
          />
        </div>

        {/* Profile Info */}
        <div className="space-y-6 mt-6">
          {/* Name */}
          <div className="text-center">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <div className="text-lg text-gray-900 mt-1">{user.name}</div>
          </div>

          {/* Email */}
          <div className="text-center">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <div className="text-lg text-gray-900 mt-1">{user.email}</div>
          </div>

          {/* Role */}
          <div className="text-center">
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <div className="text-lg text-gray-900 mt-1">{user.role}</div>
          </div>

          {/* Contact */}
          <div className="text-center">
            <label className="block text-sm font-medium text-gray-700">Contact</label>
            <div className="text-lg text-gray-900 mt-1">{user.contact}</div>
          </div>

          {/* Address */}
          <div className="text-center">
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <div className="text-lg text-gray-900 mt-1">{user.address}</div>
          </div>
        </div>

        {/* Edit Profile Link */}
        <div className="text-center mt-8">
          <NavLink
            to={`/updateUser/${user.userId}`}
            className="inline-block text-indigo-600 font-medium hover:text-indigo-500"
          >
            <button className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200">
              Edit Profile
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Profile;
