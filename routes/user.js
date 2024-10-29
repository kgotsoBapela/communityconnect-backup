// routes/user.js
const express = require('express');
const { getDB } = require('../config/db');

const router = express.Router();

// Create a new user
router.post('/', async (req, res) => {
    try {
        const db = getDB();
        const user = req.body; // Expecting user data in the request body

        const result = await db.collection('CCxStandert').insertOne(user);
        res.status(201).json({ message: 'User created', userId: result.insertedId });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const db = getDB();
        const users = await db.collection('users').find({}).toArray();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get a user by ID
router.get('/:id', async (req, res) => {
    try {
        const db = getDB();
        const userId = req.params.id;

        const user = await db.collection('users').findOne({ _id: new require('mongodb').ObjectId(userId) });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update a user by ID
router.put('/:id', async (req, res) => {
    try {
        const db = getDB();
        const userId = req.params.id;
        const updatedUser = req.body;

        const result = await db.collection('users').updateOne(
            { _id: new require('mongodb').ObjectId(userId) },
            { $set: updatedUser }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User updated' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
    try {
        const db = getDB();
        const userId = req.params.id;

        const result = await db.collection('users').deleteOne({ _id: new require('mongodb').ObjectId(userId) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
