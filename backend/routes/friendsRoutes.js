import express from 'express';
import { sendFriendRequest,createFriendsList,deleteRequest,deleteFriend ,getUserFriends,acceptRequest} from '../controllers/friendsController.js';
import { upload } from '../controllers/authController.js';

const router=express.Router();

router.post('/sendFriendRequest',sendFriendRequest);
router.post('/createFriendsList',createFriendsList);
router.get("/getUserFriends",getUserFriends);
router.get('/acceptRequest',acceptRequest);
router.delete('/deleteRequest',deleteRequest);
router.delete('/deleteFriend',deleteFriend);



export default router;