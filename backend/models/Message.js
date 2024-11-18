import mongoose from 'mongoose'

const messageSchema=new mongoose.Schema({
    user:{
        type:String,
        required:true,
        unique:true,
    },
    messages:[
        {
            sender:{
                type:String,
                required:true
            },
            message:
                {
                type:String,
                required:true
            },
            SendOn:{
                type:Date,
                default:Date.now(),
                required:true
            }
        }
    ],
    createdOn:{
        type:Date,
        default:Date.now(),
        required:true
    }
   
});

const Message=mongoose.model('messages',messageSchema);
export default Message;