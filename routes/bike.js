const express = require('express');
const { connectToDatabase } = require('../config/db');
const { ObjectId } = require('mongodb'); // Import ObjectId to handle MongoDB IDs

const router = express.Router();

// GET /bikes - Fetch all bikes
router.get('/', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const bikes = await db.collection('bikes').find({}).toArray(); // Fetch all bikes
        res.status(200).json(bikes);
    } catch (error) {
        console.error('Error fetching bikes:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// POST /bikes - Create a new bike
router.post('/', async (req, res) => {
    const newBike = req.body;

    try {
        const db = await connectToDatabase();
        const result = await db.collection('bikes').insertOne(newBike); // Insert new bike
        res.status(201).json({ message: 'Bike created', bikeId: result.insertedId });
    } catch (error) {
        console.error('Error creating bike:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// GET /bikes/:id - Fetch a bike by ID
router.get('/:id', async (req, res) => {
    const bikeId = req.params.id;

    // Validate ObjectId format
    if (!ObjectId.isValid(bikeId)) {
        return res.status(400).json({ message: 'Invalid bike ID format' });
    }

    try {
        const db = await connectToDatabase();
        const bike = await db.collection('bikes').findOne({ _id: new ObjectId(bikeId) }); // Find bike by ID

        if (!bike) {
            return res.status(404).json({ message: 'Bike not found' });
        }

        res.status(200).json(bike);
    } catch (error) {
        console.error('Error fetching bike by ID:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// PUT /bikes/:id - Update a bike by ID
router.put('/:id', async (req, res) => {
    const bikeId = req.params.id;
    const updatedBike = req.body;

    // Validate ObjectId format
    if (!ObjectId.isValid(bikeId)) {
        return res.status(400).json({ message: 'Invalid bike ID format' });
    }

    try {
        const db = await connectToDatabase();
        const result = await db.collection('bikes').updateOne(
            { _id: new ObjectId(bikeId) }, // Filter by ID
            { $set: updatedBike } // Update fields
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: 'Bike not found or no changes made' });
        }

        res.status(200).json({ message: 'Bike updated' });
    } catch (error) {
        console.error('Error updating bike by ID:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// DELETE /bikes/:id - Delete a bike by ID
router.delete('/:id', async (req, res) => {
    const bikeId = req.params.id;

    // Validate ObjectId format
    if (!ObjectId.isValid(bikeId)) {
        return res.status(400).json({ message: 'Invalid bike ID format' });
    }

    try {
        const db = await connectToDatabase();
        const result = await db.collection('bikes').deleteOne({ _id: new ObjectId(bikeId) }); // Delete bike by ID

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Bike not found' });
        }

        res.status(200).json({ message: 'Bike deleted' });
    } catch (error) {
        console.error('Error deleting bike by ID:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// GET /bikes/status/:status - Filter bikes by status
router.get('/status/:status', async (req, res) => {
    const { status } = req.params; // Get the status from the request parameters

    try {
        const db = await connectToDatabase();
        const bikes = await db.collection('bikes').find({ status }).toArray(); // Fetch bikes with the specified status

        if (bikes.length === 0) {
            return res.status(404).json({ message: 'No bikes found with the specified status' });
        }

        res.status(200).json(bikes);
    } catch (error) {
        console.error('Error fetching bikes by status:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// GET /bikes/filter - Filter bikes based on request parameters
router.get('/filter', async (req, res) => {
    const query = {};

    // Loop through each parameter in req.query and construct the query object
    for (const [key, value] of Object.entries(req.query)) {
        query[key] = value; // Add each query parameter to the query object
    }

    try {
        const db = await connectToDatabase();
        const bikes = await db.collection('bikes').find(query).toArray(); // Fetch bikes matching the query

        res.status(200).json(bikes);
    } catch (error) {
        console.error('Error fetching filtered bikes:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});


module.exports = router;


// Bike Routes:
// Create Bike: POST /api/bikes
// Get All Bikes: GET /api/bikes
// Get Bike by ID: GET /api/bikes/:id
// Update Bike by ID: PUT /api/bikes/:id
// Delete Bike by ID: DELETE /api/bikes/:id