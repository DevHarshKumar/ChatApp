import Friends from "../models/Friends.js";
import UserModel from "../models/User.js";

export const sendFriendRequest = async (req, res) => {
    const { userId, email } = req.body;
  
    if (!userId || !email) {
      return res.status(400).send({
        status: "failed",
        message: "Missing fields",
      });
    }
  
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).send({
          status: "failed",
          message: "User not found",
        });
      }
  
      const userEmail = user.email; 
  
      const requestReceiver = await Friends.findOne({ email });
      if (!requestReceiver) {
        return res.status(404).send({
          status: "failed",
          message: "Receiver not found",
        });
      }
  console.log(requestReceiver)
      // Check if the request is already sent
      const requestFound = requestReceiver.requests.some(request => request.requestEmail === userEmail);
      if (requestFound) {
        return res.status(400).send({
          status: "failed",
          message: "Friend request already sent",
        });
      }
  
      // If no request found, add the request
      requestReceiver.requests.push({ 
        requestEmail: userEmail,
        name:user.name,
        profileImage:user.profileImage,
        userId:user._id

       });
      await requestReceiver.save();
  
      return res.status(200).send({
        status: "success",
        message: "Friend request sent successfully",
      });
    } catch (error) {
      console.error("Error sending friend request:", error);
      return res.status(500).send({
        status: "failed",
        message: "Server error",
      });
    }
  };
  
  

export const createFriendsList = async (req, res) => {
    const { email } = req.body;
  
    try {
      const found = await Friends.findOne({ email:email });
      console.log("found",found)
  
      if (found) {
        return res.status(400).send({
          status: "failed",
          message: "Friends list already created for this email",
        });
      }
  
      const newList = new Friends({
        email: email,
        friends: [],
        requests: [],
      });
  
      await newList.save();
  
      return res.status(200).send({
        status: "success",
        message: "Friends list created successfully",
        List: newList,
      });
    } catch (error) {
      console.error("Error creating friends list:", error);
      return res.status(500).send({
        status: "failed",
        message: "An error occurred while creating the friends list",
        error: error.message || error,
      });
    }
  };

  export const getUserFriends=async(req,res)=>{
    const {email}= req.query;
    
    if(!email){
        return res.status(404).send({"status":"failed","message":"Email not received"})
    }
    try {
        const FriendList=await Friends.findOne({email:email});
        if(FriendList){
            return res.status(200).send({"status":"success","message":"Friend list fetched",FriendList});
        }
        return res.status(404).send({"status":"failed","message":"Friend list not found"})
    } catch (error) {
        return res.status(500).send({"status":"failed","message":"internal server error"})
    }
}

export const acceptRequest = async (req, res) => {
    const { email, userId } = req.query;
    console.log(email,userId)
    if (!email || !userId) {
        return res.status(404).send({ "status": "failed", "message": "Missing fields" });
    }

    try {
        // Find the user by userId
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).send({ "status": "failed", "message": "User not found" });
        }

        const userEmail = user.email;

        const friendList = await Friends.findOne({ email: userEmail });
        if (friendList) {
            // Find the request object based on the request email
            const requestObject = friendList.requests.find(request => request.requestEmail === email);

            if (requestObject) {
                // Add the friendEmail property to the request object
                requestObject.friendEmail = email;

                // Pull the request from 'requests' and push the full request object to 'friends'
                const updatedList = await Friends.findOneAndUpdate(
                    { email: userEmail },
                    {
                        $pull: { requests: { requestEmail: email } },  // Remove the request from the 'requests' array
                        $push: { friends: requestObject }  // Add the full object to the 'friends' array
                    },
                    { new: true }
                );

                return res.status(200).send({
                    "status": "success",
                    "message": "Request accepted",
                    "FriendList": updatedList
                });
            } else {
                return res.status(404).send({ "status": "failed", "message": "Request not found" });
            }
        } else {
            return res.status(404).send({ "status": "failed", "message": "Friend list not found" });
        }
    } catch (error) {
        console.error("Error accepting request:", error);
        return res.status(500).send({ "status": "failed", "message": "Internal server error" });
    }
};

export const deleteRequest=async(req,res)=>{
    const {email,userId}=req.query;

    console.log(email,userId)
    if(!email || !userId){
        return res.status(404).send({"status":"failed","message":"Missing fields"});
    }
    try {
        const userEmail=await UserModel.findById(userId).select('email');
    console.log(userEmail.email)
    const FriendList=await Friends.findOneAndUpdate(
        {email:userEmail.email},
        {$pull : { requests: { requestEmail: email } }},
        {new:true}
    )
    if(FriendList){
        return res.status(200).send({"status":"success","message":"Request removed",FriendList})
    }
    } catch (error) {
        return res.status(500).send({"status":"failed","message":"Internal server error"});

    }

}

export const deleteFriend=async(req,res)=>{
    const {email,userId}=req.query;

    console.log(email,userId)
    if(!email || !userId){
        return res.status(404).send({"status":"failed","message":"Missing fields"});
    }
    try {
        const userEmail=await UserModel.findById(userId).select('email');
    console.log(userEmail.email)
    const FriendList=await Friends.findOneAndUpdate(
        {email:userEmail.email},
        {$pull : { friends: { requestEmail: email } }},
        {new:true}
    )
    if(FriendList){
        return res.status(200).send({"status":"success","message":"Friend removed",FriendList})
    }
    } catch (error) {
        return res.status(500).send({"status":"failed","message":"Internal server error"});

    }

}
