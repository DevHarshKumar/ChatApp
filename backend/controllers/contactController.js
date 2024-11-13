import Contact from "../models/Contact.js";

export const contact=async(req,res)=>
{
    const {name,email,message}=req.body;
    if(!name || !email || !message){
        return res.status(400).send({"status":"failed","message":"missing fields"});
    }
    try {
        const contact=new Contact({
            name,email,message
        });
        await contact.save();
        return res.status(200).send({"status":"success","message":"Contact saved",data:contact})
    } catch (error) {
        return res.status(500).send({"status":"failed","message":"internal server error",error})
    }
}