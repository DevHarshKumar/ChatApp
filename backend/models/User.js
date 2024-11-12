import mongoose from 'mongoose';

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    profileImage:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
    },
    contact:{
        type:Number,
        required:true,
        trim:true,
    },
    password:{
       type:String,
       required:true,
       trim:true,
    },
    address:{
        type:String,
        required:true,
        trim:true,
    },
    role:{
        type:String,
        enum:['admin','customer'],
        default:'customer',
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    }
})

userSchema.pre("save",function(next){
    this.updatedAt=Date.now();
    next();
})

const UserModel=mongoose.model('Users',userSchema);

export default UserModel;