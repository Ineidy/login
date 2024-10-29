const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    provider: String,
    providerId: String,
    profilePicture: String,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('user', UserSchema);
