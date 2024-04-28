const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Make sure bcrypt is required

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (this.isModified('password') || this.isNew) {
    this.password = await bcrypt.hash(this.password, 12); // Using bcrypt to hash the password
    next();
  } else {
    next();
  }
});

// Method to compare password for login
UserSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password); // Using bcrypt to compare the password
};



module.exports = mongoose.model('User', UserSchema);
