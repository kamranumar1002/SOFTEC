const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  reviewer: { type: mongoose.Schema.Types.ObjectId, refPath: 'reviewerType' },
  reviewerType: { type: String, enum: ['Client', 'Creator'] },
  target: { type: mongoose.Schema.Types.ObjectId, refPath: 'targetType' },
  targetType: { type: String, enum: ['Client', 'Creator'] },
  rating: { type: Number, min: 1, max: 5 },
  comment: String,
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
