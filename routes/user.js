const express = require('express');
const { connectToDatabase } = require('../config/db');
const { ObjectId } = require('mongodb'); // Import ObjectId to handle MongoDB IDs

const router = express.Router();

// GET /users - Fetch all users
router.get('/', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const users = await db.collection('users').find({}).toArray(); // Fetch all users
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// POST /users - Create a new user
router.post('/', async (req, res) => {
    const newUser = req.body;

    try {
        const db = await connectToDatabase();
        const result = await db.collection('users').insertOne(newUser); // Insert new user
        res.status(201).json({ message: 'User created', userId: result.insertedId });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// GET /users/id - Fetch a user by ID
router.get('/:id', async (req, res) => {
    const userId = req.params.id;

    // Validate ObjectId format
    if (!ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID format' });
    }

    try {
        const db = await connectToDatabase();
        const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// GET /users/cellphone/:cellphone - Fetch a user by cellphone
router.get('/cellphone/:cellphone', async (req, res) => {
    const { cellphone } = req.params;

    try {
        const db = await connectToDatabase();
        const user = await db.collection('users').findOne({ cellphone });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user by cellphone:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// PUT /users/cellphone/:cellphone - Update a user by cellphone
router.put('/cellphone/:cellphone', async (req, res) => {
    const { cellphone } = req.params;
    const updatedUser = req.body;

    try {
        const db = await connectToDatabase();
        const result = await db.collection('users').updateOne(
            { cellphone }, // Filter by cellphone
            { $set: updatedUser } // Update fields
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: 'User not found or no changes made' });
        }

        res.status(200).json({ message: 'User updated' });
    } catch (error) {
        console.error('Error updating user by cellphone:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// GET /users/email/:email - Fetch a user by email
router.get('/email/:email', async (req, res) => {
    const { email } = req.params;

    try {
        const db = await connectToDatabase();
        const user = await db.collection('users').findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user by email:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// PUT /users/email/:email - Update a user by email
router.put('/email/:email', async (req, res) => {
    const { email } = req.params;
    const updatedUser = req.body;

    try {
        const db = await connectToDatabase();
        const result = await db.collection('users').updateOne(
            { email }, // Filter by email
            { $set: updatedUser } // Update fields
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: 'User not found or no changes made' });
        }

        res.status(200).json({ message: 'User updated' });
    } catch (error) {
        console.error('Error updating user by email:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

module.exports = router;
