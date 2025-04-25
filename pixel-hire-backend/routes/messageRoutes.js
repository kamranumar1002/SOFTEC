const express = require('express');
const { sendMessage, getConversation } = require('../controllers/messageController');
const { protect } = require('../middlewares/authMiddleware');
const { getAllConversations } = require('../controllers/messageController');



const router = express.Router();

router.post('/', protect, sendMessage); // send message
router.get('/:userId', protect, getConversation); // fetch conversation
router.get('/', protect, getAllConversations);

module.exports = router;
