const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS
const app = express();
const PORT = process.env.PORT || 5000;
// const mysql = require('mysql');

const db = require('./db');

// Middleware
app.use(bodyParser.json());
app.use(cors());  // Enable CORS


// Create a MySQL connection
// const connection = mysql.createConnection({
//   host     : 'm7wltxurw8d2n21q.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
//   user     : 'fqhiq5kpxxkd2kk2',
//   password : 'e6j2p44f9a5rpdot',
//   database : 'a1ezksehptl095xk'
// })

// Connect to the MySQL database
// connection.connect((err) => {
//   if (err) {
//       console.error('Error connecting to the database: ' + err.stack);
//       return;
// }
//   console.log('Connected to the database as ID ' + connection.threadId);
// });



// Fetch USERS from the ONLIINE database
// app.get('/api/users', (req, res) => {
    
//     connection.query('SELECT * FROM users', (error, results) => {
//       if (error) {
//           console.error('Error fetching users from the database: ' + error.stack);
//           return res.status(500).json({ error: 'Failed to fetch users' });
//     }
//     res.json(results);
//     console.log("/api/bikes Data Fetched");
// });
// });

// Get borrowing history from the ONLIINE database
// app.get('/api/borrowing-history/:userId', (req, res) => {
//   const { userId } = req.params;

//   connection.query(`SELECT bikes.model, borrowings.borrowDate, borrowings.returnDate
//      FROM borrowings
//      JOIN bikes ON borrowings.bikeId = bikes.id
//      WHERE borrowings.userId = ?`,
//     [userId],
//     (err, rows) => {
//       if (err) {
//         return res.status(500).json({ error: err.message });
//       }
//       res.json(rows);
//     }
//   );
// });

app.get('/api/bikes', (req, res) => {
  db.all('SELECT * FROM bikes', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.listen(PORT, () => {  
  console.log(`Local server is running on http://localhost:${PORT}`);
});

