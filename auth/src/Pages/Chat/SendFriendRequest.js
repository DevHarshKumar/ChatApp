import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../../utils/axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SendFriendRequest = () => {
    const { user } = useSelector(state => state.user); 
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSendRequest = async () => {
        if (!email) {
            toast.error("Please enter an email address.");
            return;
        }

        setLoading(true);
        try {
            const response = await axiosInstance.post('/sendFriendRequest', { 
                email, 
                userId: user._id 
            });

            if (response.status === 200) {
                toast.success("Friend request sent successfully!");
            } else {
                toast.error("Failed to send friend request.");
            }
        } catch (error) {
            console.error("Error sending friend request:", error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-green-500 flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-lg space-y-8 bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6">Send Friend Request</h2>

                {/* Email Input */}
                <div className="mb-6">
                    <label htmlFor="email" className="block text-lg font-medium text-gray-700">Recipient's Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter friend's email"
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={handleSendRequest}
                        disabled={loading}
                        className={`p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Sending...' : 'Send Friend Request'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SendFriendRequest;
