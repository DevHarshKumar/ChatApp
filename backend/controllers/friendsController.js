import Friends from "../models/Friends";

export const sendFriendRequest=async(req,res)=>{
    const {userId,email}=req.body;
    if(!userId || !email){
        return res.status(404).send({"status":"success","message":"Missing fields"});
    }
    const user=await Friends.findOne({email});
    if(!user){
        return res.status(404).send({"status":"success","message":"User  Not Found"});
    }
    

}