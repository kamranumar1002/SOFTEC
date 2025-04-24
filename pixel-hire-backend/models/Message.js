const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    id: { type: mongoose.Schema.Types.ObjectId },
    role: { type: String, enum: ['client', 'creator'] }
  },
  receiver: {
    id: { type: mongoose.Schema.Types.ObjectId },
    role: { type: String, enum: ['client', 'creator'] }
  },
  content: String,
  timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
