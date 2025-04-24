const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'Creator' }, // creator-specific categories
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
