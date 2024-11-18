import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import axiosInstance from '../../utils/axios';
import { deleteRequest ,deleteFriend,addFriend} from '../../utils/FriendListFunctions';

const FriendList = () => {
  const { user } = useSelector(state => state.user);
  const navigate=useNavigate();
  const [friendsList, setFriendsList] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const email = user.email;

    async function fetchFriends() {
      try {
        const response = await axiosInstance.get('/getUserFriends', { params: { email } });
        if (response.data) {
          setFriendsList(response.data.FriendList.friends);
          setFriendRequests(response.data.FriendList.requests);
        }
      } catch (error) {
        console.log("Error fetching friends:", error);
      }
    }

    if (email) fetchFriends();
  }, [user]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredFriendsList = friendsList?.filter((friend) =>
    friend.requestEmail?.toLowerCase().includes(searchQuery.toLowerCase())
);

console.log("filtered friends",filteredFriendsList)

const filteredFriendRequests = friendRequests?.filter((request) =>
    request.requestEmail?.toLowerCase().includes(searchQuery.toLowerCase())
);

console.log("filtered requests",filteredFriendRequests)

const handleChat=({e,email})=>{
  e.stopPropagation();
  navigate(`/chat/${email}`)
}

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-green-500 flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Friends and Friend Requests</h2>

        {/* Search Bar and Button */}
        <div className="mb-6 flex justify-center items-center space-x-4">
          <input
            type="text"
            placeholder="Search Friends and Requests..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-1/2 p-2 border border-gray-300 rounded-md"
          />
          <button
            className="p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
          >
            Search
          </button>
        </div>

        <div className="flex justify-between space-x-4">
          {/* Friends List */}
          <div className="w-1/2 bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Friends List</h3>
            {filteredFriendsList.length > 0 ? (
              <ul>
                {filteredFriendsList.map((friend) => (
                  <li key={friend.userId} className="flex items-center space-x-3 border-b py-2" onClick={(e)=>handleChat({e,email:friend.requestEmail})}>
                    <img
                      src={`http://localhost:5000/${friend.profileImage}` || '/default-profile.png'}
                      alt="Profile"
                      className="w-10 h-10 rounded-full"
                    />
                     <div className='flex justify-between '>
                    <div>
                    <p className="font-semibold">{friend.name || 'Unnamed'}</p>
                    <p className="text-black">{friend.requestEmail}</p>
                    </div>
                    <div className='my-auto'>
                        <button className='border border-red-600 rounded-xl p-1 bg-red-500' onClick={()=>deleteFriend({email:friend.requestEmail,userId:user._id})}>Remove</button>
                    </div>
                    
                  </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No friends found.</p>
            )}
          </div>

          {/* Friend Requests */}
          <div className="w-1/2 bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Friend Requests</h3>
            {filteredFriendRequests.length > 0 ? (
              <ul>
                {filteredFriendRequests.map((request, index) => (
                  
                  <li key={request.userId} className="flex items-center space-x-3 border-b py-2">
                  <img
                    src={`http://localhost:5000/${request.profileImage}` || '/default-profile.png'}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className='flex justify-between '>
                    <div>
                    <p className="font-semibold">{request.name || 'Unnamed'}</p>
                    </div>

                    <div className='my-auto'>
                       <button className='rounded-xl p-1 bg-blue-600' onClick={()=>addFriend({email:request.requestEmail,userId:user._id})}>Add</button>
                        <button className=' rounded-xl p-1 bg-red-500' onClick={()=>deleteRequest({email:request.requestEmail,userId:user._id})}>Delete</button>
                    </div>
                    
                  </div>
                </li>
                ))}
              </ul>
            ) : (
              <p>No friend requests found.</p>
            )}
          </div>
        </div>
        <div className="mb-6 flex justify-center items-center space-x-4">
        <div className='mb-6 flex justify-center items-center space-x-4'>
        <button className='bg-orange-400 rounded p-2' onClick={()=>navigate('/sendFriendRequest')}>Add Friends</button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default FriendList;
