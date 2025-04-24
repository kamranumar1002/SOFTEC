// models/Client.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const clientSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: { type: String, unique: true },
  phone_no: String,
  cnic: String,
  profile_img: String,
  username: { type: String, unique: true },
  password: String,
  rating: Number,
}, { timestamps: true });

clientSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

clientSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Client', clientSchema);
