const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  request: { type: mongoose.Schema.Types.ObjectId, ref: 'Request' },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'Creator' },
  proposed_amount: Number,
  message: String,
  isAccepted: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Quote', quoteSchema);
