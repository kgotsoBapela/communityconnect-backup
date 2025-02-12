const express = require('express');
const { connectToDatabase } = require('../config/db');
const { ObjectId } = require('mongodb'); // Import ObjectId to handle MongoDB IDs
const router = express.Router();

router.get('/api/login', async (req, res) => {
    const { username, password } = req.body;
    
    // Replace with actual database query and password hashing if applicable
    // const user = await db.findUserByUsernameAndPassword(username, password);
    
    try{
        const db = await connectToDatabase();
        const user = await db.collection('users').findUserByUsernameAndPassword(username, password);

        if (user) {
            res.json({ userID: user.id, role: user.role });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    }
    catch (error) {
        // console.error('Error fetching user by ID:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  });


//   router.get('/:id', async (req, res) => {
//     const userId = req.params.id;

//     try {
//         const db = await connectToDatabase();
//         const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.status(200).json(user);
//     } catch (error) {
//         console.error('Error fetching user by ID:', error);
//         res.status(500).json({ message: 'Internal Server Error', error: error.message });
//     }
// });
  
  module.exports = router;