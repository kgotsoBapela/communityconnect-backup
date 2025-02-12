// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS
const app = express();

// Middleware
app.use(express.json()); // for parsing application/json
app.use(cors());


// Routes
app.use('/api/users', require('./routes/user')); // Add user routes here
app.use('/api/bikes', require('./routes/bike')); // Add bike routes here

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
