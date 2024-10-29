// routes/bike.js
const express = require('express');
const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

const router = express.Router();

// Create a new bike
router.post('/', async (req, res) => {
    try {
        const db = getDB();
        const bike = req.body; // Expecting bike data in the request body

        const result = await db.collection('bikes').insertOne(bike);
        res.status(201).json({ message: 'Bike created', bikeId: result.insertedId });
    } catch (error) {
        console.error('Error creating bike:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get all bikes
router.get('/', async (req, res) => {
    try {
        const db = getDB();
        const bikes = await db.collection('bikes').find({}).toArray();
        res.json(bikes);
    } catch (error) {
        console.error('Error fetching bikes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get a bike by ID
router.get('/:id', async (req, res) => {
    try {
        const db = getDB();
        const bikeId = req.params.id;

        const bike = await db.collection('bikes').findOne({ _id: ObjectId(bikeId) });
        if (!bike) {
            return res.status(404).json({ error: 'Bike not found' });
        }
        res.json(bike);
    } catch (error) {
        console.error('Error fetching bike:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update a bike by ID
router.put('/:id', async (req, res) => {
    try {
        const db = getDB();
        const bikeId = req.params.id;
        const updatedBike = req.body;

        const result = await db.collection('bikes').updateOne(
            { _id: ObjectId(bikeId) },
            { $set: updatedBike }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Bike not found' });
        }
        res.json({ message: 'Bike updated' });
    } catch (error) {
        console.error('Error updating bike:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a bike by ID
router.delete('/:id', async (req, res) => {
    try {
        const db = getDB();
        const bikeId = req.params.id;

        const result = await db.collection('bikes').deleteOne({ _id: ObjectId(bikeId) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Bike not found' });
        }
        res.json({ message: 'Bike deleted' });
    } catch (error) {
        console.error('Error deleting bike:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;


// Bike Routes:
// Create Bike: POST /api/bikes
// Get All Bikes: GET /api/bikes
// Get Bike by ID: GET /api/bikes/:id
// Update Bike by ID: PUT /api/bikes/:id
// Delete Bike by ID: DELETE /api/bikes/:id