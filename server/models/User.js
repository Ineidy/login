const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: false, unique: true },
    provider: { type: String, required: true },
    providerId: { type: String, required: true },
    name: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
