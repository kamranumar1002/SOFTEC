const mongoose = require('mongoose');

const mediaItemSchema = new mongoose.Schema({
  url: { type: String, required: true },
  type: { type: String, enum: ['image', 'video'], required: true }, // Helps frontend render accordingly
});

const catalogueSchema = new mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'Creator' },
  title: { type: String, required: true },
  description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  media: [mediaItemSchema], // List of mixed media items
}, { timestamps: true });

module.exports = mongoose.model('Catalogue', catalogueSchema);
