var express = require('express');
var livereload = require('express-livereload');
var app = express();

var compression = require('compression');
app.use(compression());

var fs = require('fs');
var path = require('path');
var async = require('async');

const decks = {};
const deckDir = path.join(__dirname, 'decks');
const files = fs.readdirSync(deckDir);
files.forEach((file, index) => {
    const id = file.substring(0, file.lastIndexOf('.'));
    decks[id] = require(path.join(deckDir, id));
    decks[id].id = id;
    decks[id].modified = fs.statSync(path.join(deckDir, file)).mtime;
});

console.log('Decks:');
console.log(JSON.stringify(decks));
console.log();

const createDeckMetadata = (decks) => {

    const metadata = {};

    for (var deckId in decks) {
        var deck = decks[deckId];
        metadata[deckId] = {
            name: deck.name,
            id: deck.id,
            modified: deck.modified,
            size: deck.cards.length
        };
    }

    return metadata;
};

app.get('/api/decks', (req, res) => {
    res.type('application/json');
    res.json(createDeckMetadata(decks));
});

app.get('/api/decks/:deckId', (req, res) => {

    res.type('application/json');

    var deck = decks[req.params.deckId];
    if (deck) {
        res.json(deck);
    }
    else {
        res.statusCode = 404;
        res.json({ error: 'Deck not found: ' + req.params.deckId });
    }
});

app.use(express.static(path.join(__dirname, 'build')));

// Single-page app; always route to index.html for non-static content URLs
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.listen(process.env.PORT || 8080);
livereload(app);
