// routes/example.js
const express = require('express');
const { getDB } = require('../config/db');

const router = express.Router();

// Example route to fetch documents from a collection
router.get('/', async (req, res) => {
    try {
        const db = getDB();
        const collection = db.collection('bikes'); // Replace with your collection name
        const data = await collection.find({}).toArray();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
