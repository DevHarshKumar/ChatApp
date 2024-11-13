// import React, { useState, useEffect, useRef } from 'react';
// import io from 'socket.io-client';

// const socket = io('http://localhost:50000'); // Change to your backend URL

// const VideoChat = () => {
//   const [roomId, setRoomId] = useState('');
//   const [isInRoom, setIsInRoom] = useState(false);
//   const [localStream, setLocalStream] = useState(null);
//   const [peerConnection, setPeerConnection] = useState(null);
//   const userVideo = useRef(null);
//   const partnerVideo = useRef(null);

//   useEffect(() => {
//     // Get user's media stream (video and audio)
//     const getUserMediaStream = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//         setLocalStream(stream);
//         if (userVideo.current) {
//           userVideo.current.srcObject = stream;
//         }
//       } catch (error) {
//         console.error("Error accessing media devices.", error);
//       }
//     };

//     getUserMediaStream();

//     return () => {
//       if (localStream) {
//         localStream.getTracks().forEach(track => track.stop());
//       }
//     };
//   }, [localStream]);

//   const joinRoom = () => {
//     socket.emit('joinRoom', roomId);
//     setIsInRoom(true);
//   };

//   const createPeerConnection = () => {
//     const pc = new RTCPeerConnection({
//       iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] // STUN server for NAT traversal
//     });

//     // Add local media stream to the connection
//     localStream.getTracks().forEach(track => pc.addTrack(track, localStream));

//     pc.onicecandidate = (event) => {
//       if (event.candidate) {
//         socket.emit('candidate', { room: roomId, candidate: event.candidate });
//       }
//     };

//     pc.ontrack = (event) => {
//       partnerVideo.current.srcObject = event.streams[0];
//     };

//     return pc;
//   };

//   const handleOffer = async (offer) => {
//     const pc = createPeerConnection();
//     await pc.setRemoteDescription(new RTCSessionDescription(offer));
//     const answer = await pc.createAnswer();
//     await pc.setLocalDescription(answer);
//     socket.emit('answer', { room: roomId, answer });
//   };

//   const handleAnswer = (answer) => {
//     peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
//   };

//   const handleCandidate = (candidate) => {
//     peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
//   };

//   useEffect(() => {
//     socket.on('offer', handleOffer);
//     socket.on('answer', handleAnswer);
//     socket.on('candidate', handleCandidate);

//     return () => {
//       socket.off('offer', handleOffer);
//       socket.off('answer', handleAnswer);
//       socket.off('candidate', handleCandidate);
//     };
//   }, [peerConnection]);

//   const startVideoCall = () => {
//     const pc = createPeerConnection();
//     setPeerConnection(pc);
//     pc.createOffer().then(async (offer) => {
//       await pc.setLocalDescription(offer);
//       socket.emit('offer', { room: roomId, offer });
//     });
//   };

//   return (
//     <div className="h-screen flex flex-col items-center justify-center bg-gray-100 relative">
//       <h1 className="text-3xl font-bold mb-6">Video Chat</h1>

//       {!isInRoom ? (
//         <div className="space-y-4">
//           <input
//             type="text"
//             placeholder="Enter Room ID"
//             value={roomId}
//             onChange={(e) => setRoomId(e.target.value)}
//             className="px-4 py-2 border rounded-md text-lg"
//           />
//           <button
//             onClick={joinRoom}
//             className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition"
//           >
//             Join Room
//           </button>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           <button
//             onClick={startVideoCall}
//             className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 transition"
//           >
//             Start Video Call
//           </button>

//           <div className="flex justify-center space-x-4 mt-8">
//             <div className="flex flex-col items-center">
//               <video
//                 ref={partnerVideo}
//                 autoPlay
//                 className="w-full h-full object-cover border-2 border-gray-400 rounded-md"
//               />
//               <span className="mt-2 text-lg font-semibold">Partner</span>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* User video in the bottom right corner */}
//       <div className="absolute bottom-4 right-4 z-10">
//         <video
//           ref={userVideo}
//           autoPlay
//           muted
//           className="w-24 sm:w-32 md:w-40 lg:w-48 xl:w-56 border-2 border-gray-400 rounded-md"
//         />
//         <span className="mt-2 text-sm font-semibold">You</span>
//       </div>
//     </div>
//   );
// };

// export default VideoChat;
