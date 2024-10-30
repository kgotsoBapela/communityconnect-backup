// Load environment variables from .env file
require('dotenv').config();
const { MongoClient } = require('mongodb');

// Read the MongoDB URI and database name from environment variables
const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

let dbInstance;

async function connectToDatabase() {
    if (dbInstance) return dbInstance; // Return cached instance

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Connect to the MongoDB server
        await client.connect();
        // console.log('Connected to the database');

        // Access the specified database
        dbInstance = client.db(dbName);
        console.log(`Connected to the database: ${dbName}`); // Log the connected database name
        return dbInstance;
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error; // Propagate the error
    }
}

module.exports = { connectToDatabase };
