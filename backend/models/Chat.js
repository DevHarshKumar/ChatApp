import mongoose from 'mongoose';

const chatSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        trim:true,
        unique:true
    },
    messages:[
        {
            message: {
               type: String,
               required: true,
            },
            userType: {
                type: String,
                enum: ['user', 'admin'],
                required: true,
            },
            timestamp: {
                type: Date,
                default: Date.now,
            },
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

const Chat=mongoose.model('chats',chatSchema);
export default Chat;