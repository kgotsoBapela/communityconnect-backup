// config/db.js
const { MongoClient } = require('mongodb');
require('dotenv').config();

// let db = "CCxStandert";
// process.env.DB_NAME

async function connectDB() {
    try {
        const client = new MongoClient(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await client.connect();
        process.env.DB_NAME = client.db(); // Default database from URI
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Exit process with failure
    }
}

const getDB = () => {
    if (!process.env.DB_NAME) {
        throw new Error('Database not initialized. Call connectDB first.');
    }
    return process.env.DB_NAME;
};

module.exports = { connectDB, getDB };
