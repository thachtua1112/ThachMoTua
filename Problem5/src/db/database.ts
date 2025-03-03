// src/database.ts

import sqlite3 from 'sqlite3';
import path from 'path';

// Initialize SQLite Database
const dbPath = path.resolve(__dirname, 'db.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Could not connect to the database:', err);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create a simple table for resources
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS resources (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT
    );
  `);
});

// Function to close the database connection (Optional, to be used during server shutdown)
export const closeDb = () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing the database:', err);
    } else {
      console.log('Database connection closed.');
    }
  });
};

// Export database instance for use
export default db;
