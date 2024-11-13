import React from 'react';
import './ChatPage.css';

const ChatPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
      {/* Chat Header Section */}
      <div className="container px-6 mx-auto text-center py-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Chat with Us</h1>
        <p className="text-xl mb-8">
          Experience seamless communication in real-time.
        </p>
      </div>

      {/* Chat Messages Section */}
      <div className="container px-6 mx-auto mt-8 text-center md:text-left text-black">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl mb-8">
            <div className="text-start mb-4">
              <p className="font-bold text-lg">Admin:</p>
              <p>Hello, how can we assist you today?</p>
            </div>
            <div className="text-end mb-4">
              <p className="font-bold text-lg">User:</p>
              <p>I need help with my order.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl mb-8">
            <div className="text-start mb-4">
              <p className="font-bold text-lg">Admin:</p>
              <p>Sure, let me check that for you.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Input Section */}
      <div className="container px-6 mx-auto text-center mt-8 w-full max-w-3xl">
        <div className="bg-white rounded-lg shadow-lg p-8 flex justify-between items-center">
          <input
            type="text"
            placeholder="Type your message..."
            className="p-3 w-full rounded-lg border border-gray-300 text-black"
          />
          <button className="bg-blue-700 text-white p-3 rounded-lg ml-4">
            Send
          </button>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="w-full bg-gray-800 text-gray-300 py-4 mt-12 text-center">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ChatPage;
