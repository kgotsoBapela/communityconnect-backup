const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS
const db = require('./db');
const app = express();
const PORT = process.env.PORT || 5000;
const mysql = require('mysql');

// Middleware
app.use(bodyParser.json());
app.use(cors());  // Enable CORS


// Create a MySQL connection
const connection = mysql.createConnection({
  host     : 'm7wltxurw8d2n21q.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user     : 'fqhiq5kpxxkd2kk2',
  password : 'e6j2p44f9a5rpdot',
  database : 'a1ezksehptl095xk'
})

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
      console.error('Error connecting to the database: ' + err.stack);
      return;
}
  console.log('Connected to the database as ID ' + connection.threadId);
});

// Fetch bikes from the database
app.get('/api/bikes', (req, res) => {
    
    connection.query('SELECT * FROM bikes', (error, results) => {
      if (error) {
          console.error('Error fetching users from the database: ' + error.stack);
          return res.status(500).json({ error: 'Failed to fetch users' });
    }
    res.json(results);
    console.log("/api/bikes Data Fetched");
});
});



app.listen(PORT, () => {  
  console.log(`Local server is running on http://localhost:${PORT}`);
});

