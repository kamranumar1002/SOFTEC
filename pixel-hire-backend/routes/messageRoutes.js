const express = require('express');
const { sendMessage, getConversation } = require('../controllers/messageController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', protect, sendMessage); // send message
router.get('/:userId', protect, getConversation); // fetch conversation

module.exports = router;
