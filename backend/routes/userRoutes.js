import express from 'express'
import { register, upload ,login,getUserDetail,getAllUsers,deleteUser,updateProfileImage,updateUser,initializeFriendsForUser ,sendResetEmail,setNewPassword} from '../controllers/authController.js';
const router=express.Router();

router.post("/register",upload.single('profileImage'),register);
router.put("/updateProfileImage/:userId", upload.single('profileImage'), updateProfileImage);
router.post("/login",login);
router.get("/getUser/:userId",getUserDetail);
router.get("/allUsers",getAllUsers);
router.delete("/deleteUser/:userId",deleteUser);
router.post("/sendResetEmail",sendResetEmail);
router.put("/setNewPassword/:userId/:token",setNewPassword);
router.put("/updateUser/:userId",updateUser);
router.post("/createFriends/:userId",initializeFriendsForUser);



export default router;  