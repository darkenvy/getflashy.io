'use strict';
const express = require('express');
const app = express();
const compression = require('compression');
const fs = require('fs');
const path = require('path');
const async = require('async');
const bodyParser = require('body-parser');
const Database = require('better-sqlite3');
const decks = {};
const deckDir = path.join(__dirname, 'decks');
const files = fs.readdirSync(deckDir);
const db = new Database('flashy.db');
//const livereload = require('express-livereload');

prepareDatabase(); // creates tables if needed
app.use(compression());
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: false }));
db.pragma('foreign_keys', true);

function prepareDatabase() {
  /* ================= No database exists ==================== */
  db.prepare(`
    CREATE TABLE IF NOT EXISTS "users" (
      "id"	INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
      "admin"	INTEGER,
      "name"	TEXT NOT NULL,
      "password"  TEXT
    );`
  ).run();
  db.prepare(`
    CREATE TABLE IF NOT EXISTS "decks" (
      "id"	INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
      "name"	TEXT NOT NULL
    );`
  ).run();
  db.prepare(`
    CREATE TABLE IF NOT EXISTS "scores" (
      "id"	INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
      "score"	INTEGER,
      "time"	INTEGER,
      "user_id"	INTEGER NOT NULL,
      "deck_id"	INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (deck_id) REFERENCES decks(id)
    );`
  ).run();

  /* ================= No admin account exists ==================== */
  const adminExists = db.prepare("SELECT name FROM users WHERE name = 'admin'").get();
  if (!adminExists) {
    db.prepare('insert into users ("name", "admin") values ("admin", "1")').run();
    console.log('Alert: No admin account detected. Added admin account')
  }

  /* ================= Look for new decks ==================== */
  files.forEach((file, index) => {
    const id = file.substring(0, file.lastIndexOf('.'));
    const deckInDB = db.prepare(`select name from decks where name = '${id}'`).get();
    if (!deckInDB) {
      db.prepare(`insert into decks ("name") values ('${id}');`).run();
      console.log('Found a new deck', id, '. Added  it to the deck table');
    }

    decks[id] = require(path.join(deckDir, id));
    decks[id].id = id;
    decks[id].modified = fs.statSync(path.join(deckDir, file)).mtime;
  });
}

const createDeckMetadata = decks => {
  const metadata = {};
  for (let deckId in decks) {
    let deck = decks[deckId];
    metadata[deckId] = {
      name: deck.name,
      icon: deck.icon,
      id: deck.id,
      modified: deck.modified,
      size: deck.cards.length
    };
  }
  return metadata;
};

// -------------------------- Routes ---------------------------------------- //

// User Routes
app.get('/api/users', (req, res) => {
  res.type('application/json');
  let users = db.prepare("SELECT name FROM users").all();
  users = users.map(user => user.name);
  res.json(users);
});

app.get('/api/user/id/:id', (req, res) => {
  const id = req.params.id;
  const user = db.prepare(`SELECT id, name, admin FROM users WHERE id = '${id}'`).get();
  res.json(user || {});
});

app.get('/api/user/scores/:deckId/:id', (req, res) => {
  const { id, deckId } = req.params;
  const user = db.prepare(`
    SELECT score, time
    FROM scores
    WHERE user_id = ${id} AND deck_id = ${deckId}
    ORDER by date("time")
    DESC limit 25`
  ).all();
  res.json(user || []);
});

app.get('/api/user/:name', (req, res) => {
  const name = req.params.name;
  const user = db.prepare(`SELECT id, name, admin FROM users WHERE name = '${name}'`).get();
  res.json(user || {});
});

// Score Routes
app.post('/api/score/', (req, res) => {
  console.log('adding new score to db', req.body);
  const time = Date.now() / 1000 | 0;
  let { score, user_id, deck_id } = req.body;
  score = score || 0;
  score = Math.random() * 100 | 0;

  try {
    db.prepare(`
      insert into scores
        (time, score, user_id, deck_id)
      values
        (${time}, ${score}, ${user_id}, ${deck_id})`
    ).run();
    res.status(200);
    res.send('OK')
  } catch (e) {
    res.status(500);
    res.send('Error adding score: ' + e);
  }
  
});

// Deck Routes
app.get('/api/decks', (req, res) => {
  res.type('application/json');
  res.json(createDeckMetadata(decks));
});

app.get('/api/decks/:deckId', (req, res) => {
  res.type('application/json');

  let deck = decks[req.params.deckId];
  if (deck) {
    res.json(deck);
  } else {
    res.statusCode = 404;
    res.json({ error: 'Deck not found: ' + req.params.deckId });
  }
});


// Single-page app; always route to index.html for non-static content URLs
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.listen(process.env.PORT || 8080);
//livereload(app);
