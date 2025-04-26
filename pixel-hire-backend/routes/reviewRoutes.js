const express = require('express');
const { leaveReview, getReviewsForUser, deleteReview } = require('../controllers/reviewController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Leave a review (protected)
router.post('/', protect, leaveReview);

// Get all reviews for a user (public)
router.get('/:userId', getReviewsForUser);

// Delete a review (protected)
router.delete('/:reviewId', protect, deleteReview);

module.exports = router;
