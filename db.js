const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS
// const db = require('./db');
const app = express();
const PORT = process.env.PORT || 5000;

// const sqlite3 = require('sqlite3').verbose();
// const mysql = require('mysql');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./bikes.db');

// Middleware
app.use(bodyParser.json());
app.use(cors());  // Enable CORS

//Supabase DB Pass = lJL1KjHhP6QK1L41

// const connection = mysql.createConnection({
//     host     : 'm7wltxurw8d2n21q.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
//     user     : 'fqhiq5kpxxkd2kk2',
//     password : 'e6j2p44f9a5rpdot',
//     database : 'a1ezksehptl095xk'
//   })



  // connection.connect((err) => {
  //   if (err) {
  //       console.error('Error connecting to the database: ' + err.stack);
  //       return;
  // }
  //   console.log('Connected to the database as ID ' + connection.threadId);
  // });


  // db.serialize(() => {
    
  // });
module.exports = db;
