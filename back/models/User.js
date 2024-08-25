const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define user schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, // Make sure to make username unique
    email: { type: String, required: true, unique: true }, // Ensure email is unique if you need it
    password: { type: String, required: true }
});

// Hash the password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Create the model
const User = mongoose.model('User', userSchema);

module.exports = User;
