const express = require('express');
const { leaveReview, getReviewsForUser } = require('../controllers/reviewController');
const { protect } = require('../middlewares/authMiddleware');

const { deleteReview } = require('../controllers/reviewController');



const router = express.Router();

router.post('/', protect, leaveReview);
router.get('/:userId', protect, getReviewsForUser);
router.delete('/:reviewId', protect, deleteReview);

module.exports = router;
