const express = require('express');
const { getProfile, updateProfile } = require('../controllers/ProfileController');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multer'); 

const router = express.Router();

router.get('/me', protect, getProfile);
router.put('/me', protect, upload.single('profile_img'), updateProfile);

module.exports = router;
