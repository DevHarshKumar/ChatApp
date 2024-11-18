import express from 'express';

import { saveMessage ,getMessages,deleteMessage} from '../controllers/messageController.js';

const router=express.Router();

router.post('/sendMessage',saveMessage);
router.get('/getMessages',getMessages);
router.put('/deleteMessage',deleteMessage)

export default router;