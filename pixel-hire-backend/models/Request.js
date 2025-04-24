const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  event_type: String,
  description: String,
  location: String,
  budget: Number,
  event_date: Date,
  status: { type: String, enum: ['open', 'quoted', 'booked'], default: 'open' }
}, { timestamps: true });

module.exports = mongoose.model('Request', requestSchema);
