import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const Services = () => {

  const {userId}=useSelector(state=>state.user)
  const navigate=useNavigate();

  const handleNavigation=(e)=>{
     e.stopPropagation();
     userId ? navigate('/chat'):navigate('/login');
  }
  const handleVideoChat=(e)=>{
    e.stopPropagation();
    userId? navigate('/videoChat'):navigate('/login');
  }
  const handleFile=(e)=>{
    e.stopPropagation();
    userId? navigate('/fileShare'):navigate('/login');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
      {/* Hero Section */}
      <div className="container px-6 mx-auto text-center py-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Services</h1>
        <p className="text-xl mb-8">
          Enhance your communication experience with our range of services.
        </p>
      </div>

      {/* Services Section */}
      <div className="container px-6 mx-auto mt-8 text-center md:text-left" >
        <div className="flex flex-wrap -mx-4">
          {/* Chat Service */}
          <div className="w-full md:w-1/3 px-4 mb-8" onClick={(e)=>handleNavigation(e)}>
            <div className="bg-white rounded-lg shadow-lg p-8 text-gray-800">
              <h2 className="text-2xl font-bold mb-4">Instant Chat</h2>
              <p>
                Communicate in real-time with our seamless chat service. Connect with friends, family, or colleagues anytime and anywhere.
              </p>
            </div>
          </div>
          {/* Video Chat Service */}
          <div className="w-full md:w-1/3 px-4 mb-8" onClick={(e)=>handleVideoChat(e)}>
            <div className="bg-white rounded-lg shadow-lg p-8 text-gray-800">
              <h2 className="text-2xl font-bold mb-4">Video Chat</h2>
              <p>
                Experience high-quality video calls that bring you closer, no matter the distance. Perfect for meetings, family calls, and more.
              </p>
            </div>
          </div>
          {/* File Sharing Service */}
          <div className="w-full md:w-1/3 px-4 mb-8" onClick={(e)=>handleFile(e)}>
            <div className="bg-white rounded-lg shadow-lg p-8 text-gray-800">
              <h2 className="text-2xl font-bold mb-4">File Sharing</h2>
              <p>
                Easily share files with friends or team members. Our secure file-sharing service supports quick uploads and downloads.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="w-full bg-gray-800 text-gray-300 py-4 mt-12 text-center">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Services;
