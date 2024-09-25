const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./bikes.db');

// Create tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS bikes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      model TEXT,
      status TEXT
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      memberSince TEXT
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS borrowings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      bikeId INTEGER,
      borrowDate TEXT,
      returnDate TEXT,
      FOREIGN KEY (userId) REFERENCES users(id),
      FOREIGN KEY (bikeId) REFERENCES bikes(id)
    );
  `);

  // Seed data
  db.run(`
    INSERT INTO bikes (model, status) VALUES
    ('Erdgeschoss Pang! Pink', 'available'),
    ('Erdgeschoss Yeah! Yellow', 'available'),
    ('Kettensäge | Team', 'not available');
  `);

  db.run(`
    INSERT INTO users (name, email, memberSince) VALUES
    ('Kgotso Bapela', 'kgotso.bapela@gmail.com', '2022-01-15');
  `);
});

module.exports = db;
