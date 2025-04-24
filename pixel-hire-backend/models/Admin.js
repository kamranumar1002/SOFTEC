const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  username: { type: String, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);
