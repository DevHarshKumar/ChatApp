import express from 'express'
import { register, upload ,login,getUserDetail,getAllUsers,deleteUser,updateUser ,sendResetEmail,setNewPassword} from '../controllers/authController.js';
const router=express.Router();

router.post("/register",upload.single('profileImage'),register);
router.post("/login",login);
router.get("/getUser/:userId",getUserDetail);
router.get("/allUsers",getAllUsers);
router.delete("/deleteUser/:userId",deleteUser);
router.post("/sendResetEmail",sendResetEmail);
router.put("/setNewPassword/:userId/:token",setNewPassword);
router.put("/updateUser/:userId",updateUser);



export default router;