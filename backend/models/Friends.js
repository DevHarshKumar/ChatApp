import mongoose from 'mongoose';

const friendSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    },
  requests: [
    {
      requestEmail: {
        type: String,
        required: true,
      },
      userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
      },
      name:{
        type:String,
        required:true,
      },
      profileImage:{
        type:String,
        required:true,
      }
      ,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    }
  ],
  friends: [
    {
      requestEmail: {
        type: String,
        required: true,
      },
      userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
      },
      name:{
        type:String,
        required:true,
      },
      profileImage:{
        type:String,
        required:true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    }
  ],
}, { timestamps: true }); 

friendSchema.index({ email: 1 }); 
friendSchema.index({ 'requests.requestEmail': 1 }); 
friendSchema.index({ 'friends.friendEmail': 1 }); 
const Friends = mongoose.model('FriendList', friendSchema);
export default Friends;
