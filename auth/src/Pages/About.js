import React from 'react';

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-green-500 text-white">
      {/* Hero Section */}
      <div className="container px-6 mx-auto text-center py-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">About Us</h1>
        <p className="text-xl mb-8">
          We are committed to delivering the best services and experiences for our customers.
        </p>
      </div>

      {/* About Content Section */}
      <div className="container px-6 mx-auto mt-8 text-center md:text-left">
        <div className="flex flex-wrap -mx-4">
          {/* Company Story */}
          <div className="w-full md:w-1/3 px-4 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-8 text-gray-800">
              <h2 className="text-2xl font-bold mb-4">Our Story</h2>
              <p>
                Founded in 2023, we have dedicated ourselves to providing high-quality products and excellent customer service. Our journey started with a small team passionate about making a difference.
              </p>
            </div>
          </div>
          {/* Our Mission */}
          <div className="w-full md:w-1/3 px-4 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-8 text-gray-800">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p>
                Our mission is to empower our customers by delivering innovative solutions and personalized experiences. We aim to exceed expectations and create lasting value in every interaction.
              </p>
            </div>
          </div>
          {/* Our Team */}
          <div className="w-full md:w-1/3 px-4 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-8 text-gray-800">
              <h2 className="text-2xl font-bold mb-4">Our Team</h2>
              <p>
                Our team consists of talented professionals from diverse backgrounds, all working together to bring you the best in technology, design, and service.
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

export default About;
