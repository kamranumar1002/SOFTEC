const Review = require('../models/Review');
const Booking = require('../models/Booking');

// Leave a Review
exports.leaveReview = async (req, res) => {
  try {
    const { bookingId, rating, comment } = req.body;

    const booking = await Booking.findById(bookingId).populate('client creator');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    let reviewer, reviewerType, target, targetType;

    if (req.user.role === 'client') {
      if (booking.client.toString() !== req.user._id) {
        return res.status(403).json({ message: 'Not your booking' });
      }
      reviewer = booking.client;
      target = booking.creator;
      reviewerType = 'Client';
      targetType = 'Creator';
    } else {
      if (booking.creator.toString() !== req.user._id) {
        return res.status(403).json({ message: 'Not your booking' });
      }
      reviewer = booking.creator;
      target = booking.client;
      reviewerType = 'Creator';
      targetType = 'Client';
    }

    const newReview = new Review({
      reviewer,
      reviewerType,
      target,
      targetType,
      booking: booking._id,
      rating,
      comment
    });

    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    console.error("Error in leaveReview:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get all Reviews for a User
exports.getReviewsForUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const reviews = await Review.find({ target: userId }).populate('reviewer', 'username fname lname profile_img');
    res.json(reviews);
  } catch (err) {
    console.error("Error in getReviewsForUser:", err);
    res.status(500).json({ message: err.message });
  }
};

// Delete a Review
exports.deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.reviewer.toString() !== req.user._id) {
      return res.status(403).json({ message: 'Not authorized to delete this review' });
    }

    await review.remove();
    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    console.error("Error in deleteReview:", err);
    res.status(500).json({ message: err.message });
  }
};
