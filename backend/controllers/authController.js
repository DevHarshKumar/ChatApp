import UserModel from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import path from 'path';
import multer from "multer";
import nodemailer from 'nodemailer'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './UserData/userProfileImages');
    },
    filename: (req, file, cb) => {
        const name = req.body.name || req.body.formdata?.username || 'default';
        const fileExtension = path.extname(file.originalname);
        const uniqueFilename = `${name}_profile_${Date.now()}${fileExtension}`;
        cb(null, uniqueFilename);
    }
});

export const upload = multer({ storage });

export const register = async (req, res) => {
    const { name, email, password, contact, address } = req.body; 
    const profileImage = req.file; 

    if (name && email && password && contact && address) {
        try {
            const isFound = await UserModel.findOne({ email });
            if (!isFound) {
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(password, salt);

                const user = new UserModel({
                    name,
                    email,
                    profileImage: profileImage ? profileImage.path : null,
                    password: hashPassword,
                    contact,
                    address,
                });

                await user.save();

                return res.status(200).send({ "status": "Success", "message": "User Registered Successfully" });
            } else {
                return res.status(409).send({ 'status': 'failed', "message": "User already registered" });
            }
        } catch (error) {
            return res.status(500).send({ 'status': 'failed', "message": "Server Error", error });
        }
    } else {
        return res.status(400).send({ 'status': 'failed', "message": "Some fields are missing" });
    }
};

// Login endpoint
export const login = async (req, res) => {
    const { email,password } = req.body;
  console.log(email,password)
    if (!email || !password) {
        return res.status(400).send({ status: 'failed', message: 'Email and password are required' });
    }

    try {
        const user = await UserModel.findOne({ email:email });
        console.log("user:",user)
        if (!user) {
            return res.status(404).send({ 'status': 'failed', "message": "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch)
        if (isMatch) {
            const userResponse = {
                userId: user._id,
                name: user.name,
                email: user.email,
                address: user.address,
                contact:user.contact,
                profileImage: user.profileImage,
                role:user.role
            };
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '30m' });
            console.log(token,userResponse)
            return res.status(200).json({
                "status": "Success",
                "message": "User Logged In Successfully",
                user: userResponse,
                token
            });
        } else {
            return res.status(409).send({ 'status': 'failed', "message": "Wrong email or password" });
        }

    } catch (error) {
        return res.status(500).send({ 'status': 'failed', "message": "Server Error", error });
    }
};

export const getUserDetail = async (req, res) => {
    const { userId } = req.params;
    if (!userId) {
        return res.status(400).send({ status: "failed", message: "Failed to get Params" });
    }

    try {
        const user = await UserModel.findById(userId);
        if (user) {
            return res.status(200).send({ status: "success", message: "User details fetched", user });
        } else {
            return res.status(404).send({ status: "failed", message: "User not found" });
        }
    } catch (error) {
        console.error("Error fetching user details:", error);  // Log error for debugging
        return res.status(500).send({ status: "failed", message: "Server error", error: error.message });
    }
};

export const getAllUsers=async(req,res)=>{
    const limit=parseInt(req.query) || 12;
    const page=parseInt(req.query) || 1;
    const skip=(page-1)*limit;

    const TotalUser=await UserModel.countDocuments();
    const TotalPages=Math.ceil(TotalUser/limit);
    try {
        const users = await UserModel.find({ role: { $ne: 'admin' } }).select('-password').sort({createdAt:-1}).limit(limit).skip(skip);
        if (users) {
            return res.status(200).send({ status: "success", message: "User details fetched", users ,TotalPages});
        } else {
            return res.status(404).send({ status: "failed", message: "Users not found" });
        }
    } catch (error) {
        console.error("Error fetching user details:", error); 
        return res.status(500).send({ status: "failed", message: "Server error", error: error.message });
    }
}

export const deleteUser=async(req,res)=>{
    const {userId}=req.params;
    if(!userId){
        res.status(404).send({ status: "failed", message: "Users not found" })
    }
    try {
        await UserModel.findByIdAndDelete(userId);
        return res.status(200).send({ status: "success", message: "User deleted successfully"});
    } catch (error) {
        return res.status(500).send({ status: "failed", message: "Server error", error});
    }
}


export const sendResetEmail=async(req,res)=>{
    const {email}=req.body;
    if(!email){
        return res.status(404).send({"status":"Failed","message":"email not received"});
    }
    const user=await UserModel.findOne({email:email});
    if(user){
        const secret_key=user._id+process.env.JWT_SECRET_KEY;
        const token=jwt.sign({userId:user._id},secret_key,{expiresIn:'15m'});
        const link=`http://localhost:3000/setNewPassword/${user._id}/${token}`;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from:  process.env.EMAIL_USER, 
            to: email,
            subject: 'Click on Link to Change Your Password',
            text: link
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
    else{
        return res.status(400).send({"status":"failed","message":"email not found"})
    }
}

export const setNewPassword=async(req,res)=>{
    const { newPassword, confirmPassword}=req.body;
    const {userId,token}=req.params;
    
    const user=await UserModel.findById(userId);
    if(user){
        const secret_key=user._id+process.env.JWT_SECRET_KEY;
        jwt.verify(token,secret_key);
        const salt=await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(newPassword,salt);
        try {
            const user=await UserModel.findByIdAndUpdate(userId,{$set :{password:hashPassword}});
            return res.status(200).send({"status":"success","message":"password changed successfully"})
        } catch (error) {
            console.error(error);
            return res.status(500).send({"status":"failed","message":"something went wrong"});
        }
    }
    else{
        return res.status(500).send({"status":"failed","message":"something went wrong"});
    }
}

export const updateUser=async(req,res)=>{
    const {userId}=req.params;
    const {data}=req.body;
console.log("data",userId,data)
    if(!userId){
        return res.status(404).send({"status":"failed","message":"User id not found"});
    }
    if (!data || Object.keys(data).length === 0) {
        return res.status(400).send({ status: "failed", message: "No data provided for update" });
    }
    try {
        const user=await UserModel.findByIdAndUpdate(userId,{$set:data},{new:true});
        console.log(user)
        if(user){
            return res.status(200).send({"status":"Success","message":"User Updated Successfully",user});
        }
        return res.status(404).send({"status":"failed","message":"User not found"})
    } catch (error) {
        return res.status(404).send({"status":"failed","message":"Something went wrong",error});
    }
}


