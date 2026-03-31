const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'veritas.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    // Create the passports table
    const sql = `
      CREATE TABLE IF NOT EXISTS passports (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        contentId TEXT UNIQUE NOT NULL,
        hash TEXT UNIQUE NOT NULL,
        content TEXT NOT NULL,
        trustScore INTEGER NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        aiProbability REAL NOT NULL,
        structuralConsistency REAL NOT NULL,
        originVerification REAL NOT NULL
      )
    `;
    db.run(sql, (err) => {
      if (err) console.error("Error creating passports table", err);
    });

    // Create the users table
    const usersSql = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;
    db.run(usersSql, (err) => {
       if (err) console.error("Error creating users table", err);
    });
  }
});

// Helper for promise
const dbRun = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      resolve(this);
    });
  });
};

const dbGet = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
};

module.exports = { db, dbRun, dbGet };
