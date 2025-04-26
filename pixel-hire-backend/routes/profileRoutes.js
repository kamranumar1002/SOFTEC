const express = require('express');
const { getProfile, updateProfile, getProfilebyId } = require('../controllers/ProfileController');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multer');

const router = express.Router();

// Protected routes (for logged-in user)
router.get('/me', protect, getProfile);
router.put('/me', protect, upload.single('profile_img'), updateProfile);

// Public route (no protect middleware)
router.get('/:id', getProfilebyId);

module.exports = router;
