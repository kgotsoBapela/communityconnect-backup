// app.js
const express = require('express');
const { connectDB } = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // for parsing application/json

// Routes
app.use('/api/example', require('./routes/example'));
app.use('/api/users', require('./routes/user')); // Add user routes here

//Routes
// Routes
// app.get('/api/users', (req, res) => {
//     db.query('SELECT * FROM users', (err, results) => {
//       if (err) {
//         console.error('Error executing query: ' + err.stack);
//         res.status(500).send('Error fetching users');
//         return;
//       }
//       res.json(results);
//     });
//   });
  

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
