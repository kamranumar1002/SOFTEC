// models/Creator.js (same logic with additional fields)
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const creatorSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: { type: String, unique: true },
  phone_no: String,
  cnic: String,
  link_tree: String,
  camera_gear_desc: String,
  budget_range: String,
  profile_type: String,
  profile_img: String,
  username: { type: String, unique: true },
  password: String,
  rating: Number,
  bio: String
}, { timestamps: true });

creatorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

creatorSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Creator', creatorSchema);
