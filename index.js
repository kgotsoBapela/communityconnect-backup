const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS
const db = require('./db');
const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());  // Enable CORS

// API Routes
app.get('/api/bikes', (req, res) => {
    db.all('SELECT * FROM bikes', (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    });
  });
  
// Get all bikes
app.get('/api/bikes', (req, res) => {
  db.all('SELECT * FROM bikes', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Borrow a bike
app.post('/api/borrow/:bikeId', (req, res) => {
  const { bikeId } = req.params;
  const { userId } = req.body;

  // Mark the bike as not available
  db.run(
    `UPDATE bikes SET status = 'not available' WHERE id = ?`,
    [bikeId],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Record the borrowing transaction
      db.run(
        `INSERT INTO borrowings (userId, bikeId, borrowDate) VALUES (?, ?, datetime('now'))`,
        [userId, bikeId],
        function (err) {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.json({ message: 'Bike borrowed successfully' });
        }
      );
    }
  );
});

// Return a bike
app.post('/api/return/:bikeId', (req, res) => {
  const { bikeId } = req.params;
  const { userId } = req.body;

  // Mark the bike as available
  db.run(
    `UPDATE bikes SET status = 'available' WHERE id = ?`,
    [bikeId],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Record the return transaction
      db.run(
        `UPDATE borrowings SET returnDate = datetime('now') WHERE bikeId = ? AND userId = ? AND returnDate IS NULL`,
        [bikeId, userId],
        function (err) {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.json({ message: 'Bike returned successfully' });
        }
      );
    }
  );
});

// Get borrowing history
app.get('/api/borrowing-history/:userId', (req, res) => {
  const { userId } = req.params;

  db.all(
    `SELECT bikes.model, borrowings.borrowDate, borrowings.returnDate
     FROM borrowings
     JOIN bikes ON borrowings.bikeId = bikes.id
     WHERE borrowings.userId = ?`,
    [userId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    }
  );
});

// Get user profile
app.get('/api/user-profile/:userId', (req, res) => {
  const { userId } = req.params;

  db.get(`SELECT * FROM users WHERE id = ?`, [userId], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(row);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
