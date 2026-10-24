const mongoose = require('mongoose');
require('dotenv').config();

async function connectToMongoDB() {
    try {
        await mongoose.connect(process.env.ATLASDB);
        console.log('Connected to MongoDB Atlas!');
    } catch (error) {
        console.log('MongoDB connection error:', error.message);
        throw error;
    }
}

module.exports = connectToMongoDB;
