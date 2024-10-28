// server.js
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User'); // Import the User model

const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.use(bodyParser.json());
app.use(cors());  // Enable CORS

// mongodb+srv://<db_username>:<db_password>@communityconnectapi.lmu84.mongodb.net/?retryWrites=true&w=majority&appName=communityconnectAPI
// MongoDB connection
// user - qSlLxmv1UhtoPFxV

mongoose.connect('mongodb+srv://root:qSlLxmv1UhtoPFxV@communityconnectapi.lmu84.mongodb.net/?retryWrites=true&w=majority&appName=communityconnectAPI', { // Change to your MongoDB connection string
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Sample route to create a new user
app.post('CCxStandert/users', async (req, res) => {
    const { name, email, age } = req.body;
    try {
        const newUser = new User({ name, email, age });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Sample route to get all users
app.get('CCxStandert/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
