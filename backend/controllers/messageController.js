import Message from "../models/Message.js";
import Friends from "../models/Friends.js";


export const saveMessage = async (req, res) => {
    const { senderEmail, message, receiverEmail } = req.body;

    if (!senderEmail || !message || !receiverEmail) {
        return res.status(400).send({ status: "Failed", message: "Missing data" });
    }
    try {
        const isFriend = await Friends.findOne({email:receiverEmail},{ friends: { requestEmail: senderEmail } });

        if (isFriend) {
            let userMessages = await Message.findOne({ user: receiverEmail });
            if (!userMessages) {
                userMessages = new Message({
                    user: receiverEmail,
                    messages: [],
                });
            }

            userMessages.messages.push({ sender: senderEmail, message });
            await userMessages.save();

            return res.status(200).send({ status: "success", message: "Message sent successfully" });
        }

        return res.status(400).send({ status: "Failed", message: "Sender is not a friend of the receiver" });
    } catch (error) {
        console.error("Error saving message:", error);
        return res.status(500).send({ status: "Failed", message: "Server error" });
    }
};


export const getMessages=async(req,res)=>{
    const {email}=req.body;
    if(!email){
        return res.status(400).send({ status: "Failed", message: "missing user field" });
    }
    try {
        const messages=await Message.findOne({user:email});
        if(!messages){
            return res.status(400).send({ status: "Failed", message: "no message found" });
        }
        return res.status(200).send({ status: "success", message: "Data fetched successfully",data:messages });

    } catch (error) {
       console.error("error:",error)
       return res.status(500).send({ status: "Failed", message: "internal server error",error });
    }
}

export const deleteMessage=async(req,res)=>{
    const {email,messageId}=req.body;
    if(!messageId || !email){
        return res.status(400).send({ status: "Failed", message: "missing user field" });
    }
    try {
        const message=await Message.findOneAndUpdate({user:email},{$pull:{messages:{_id:messageId}}},{new:true});
        if(!message){
            return res.status(404).send({ status: "Failed", message: "no message found" });
        }
        return res.status(200).send({ status: "success", message: "Data fetched successfully",message });

    } catch (error) {
        console.error("error:",error)
        return res.status(500).send({ status: "Failed", message: "internal server error",error });    
    }
}