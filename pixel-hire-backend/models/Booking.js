const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  request: { type: mongoose.Schema.Types.ObjectId, ref: 'Request' },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'Creator' },
  quote: { type: mongoose.Schema.Types.ObjectId, ref: 'Quote' },
  status: {
    type: String,
    enum: ['confirmed', 'completed', 'cancelled'],
    default: 'confirmed'
  },
  paymentMethod: {
    type: String,
    enum: ['JazzCash', 'EasyPaisa', 'Stripe'],
    default: 'JazzCash'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
