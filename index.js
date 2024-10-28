//index.js
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB connection URL and client
const uri = 'mongodb+srv://root:qSlLxmv1UhtoPFxV@communityconnectapi.lmu84.mongodb.net/?retryWrites=true&w=majority&appName=communityconnectAPI'; // Change to your MongoDB connection string
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const dbName = 'CCxStandert'; // Change to your database name

// Connect to MongoDB
async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

// Sample route to create a new user
app.post('/users', async (req, res) => {
    const { name, email, age } = req.body;

    try {
        const db = client.db(dbName);
        const usersCollection = db.collection('users');

        const newUser = { name, email, age };
        const result = await usersCollection.insertOne(newUser);

        res.status(201).json(result.ops[0]); // Return the bikes
        console.log('All bikes fetched successfully');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Sample route to get all bikes
app.get('/bikes', async (req, res) => {
    try {
        const db = client.db(dbName);
        const bikesCollection = db.collection('bikes');

        const bikes = await bikesCollection.find().toArray();
        res.json(bikes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(PORT, async () => {
    await connectDB(); // Ensure the database is connected before starting the server
    console.log(`Server is running on http://localhost:${PORT}`);
});
