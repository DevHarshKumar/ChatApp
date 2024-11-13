import React from 'react';

const DefaultHomePage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-500 to-yellow-500 text-white">
      <div className="container px-6 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        {/* Left Column */}
        <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
          <p className="uppercase tracking-wide text-lg mb-4">What business are you?</p>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
            Main Hero Message to sell yourself!
          </h1>
          <p className="text-2xl mb-8">
            Sub-hero message, not too long and not too short. Make it just right!
          </p>
          <button className="bg-white text-gray-800 font-bold rounded-full py-4 px-8 shadow-lg focus:outline-none transform transition hover:scale-105 duration-300 ease-in-out">
            Subscribe
          </button>
        </div>
        {/* Right Column */}
        <div className="w-full md:w-3/5 py-6 text-center">
          <img className="w-full md:w-4/5" src="hero.png" alt="Hero" />
        </div>
      </div>
    </div>
  );
};

export default DefaultHomePage;
