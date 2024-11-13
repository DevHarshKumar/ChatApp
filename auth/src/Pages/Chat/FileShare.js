import React, { useState } from 'react';

const FileShare = ({ users }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmail, setSelectedEmail] = useState('');

  // Filter users based on search query
  const filteredUsers = users?.filter(user =>
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSelectUser = (email) => {
    setSelectedEmail(email);
  };

  const handleFileUpload = () => {
    if (!selectedFile || !selectedEmail) {
      alert('Please select a file and a recipient email');
      return;
    }

    // Here, you can handle the logic to send the file to the selected email
    console.log('File ready to be sent to:', selectedEmail);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">File Sharing</h2>

        {/* Search and User Selection */}
        <div className="w-full mb-4">
          <input
            type="text"
            placeholder="Search for email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
          />
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {filteredUsers?.map((user) => (
              <div
                key={user.email}
                onClick={() => handleSelectUser(user.email)}
                className={`p-2 border border-gray-300 rounded-md cursor-pointer hover:bg-blue-100 transition ${
                  user.email === selectedEmail ? 'bg-blue-200' : ''
                }`}
              >
                {user.email}
              </div>
            ))}
          </div>
        </div>

        {/* Display selected email in a square */}
        {selectedEmail && (
          <div className="mb-4">
            <div className="p-4 bg-gray-200 w-48 text-center rounded-lg mx-auto">
              <p className="text-sm font-medium text-gray-700">Sending to:</p>
              <p className="font-semibold text-gray-800">{selectedEmail}</p>
            </div>
          </div>
        )}

        {/* File selection */}
        <input
          type="file"
          onChange={handleFileChange}
          className="mb-4 px-4 py-2 border border-gray-300 rounded-md w-full"
        />

        {/* Upload Button */}
        <button
          onClick={handleFileUpload}
          className="w-full px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition"
        >
          Upload File
        </button>
      </div>
    </div>
  );
};

export default FileShare;
