const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    let uri= "mongodb://root:campus2023@localhost:27017/login?authSource=admin"
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
