var express = require('express');
var app = express();

var compression = require('compression');
app.use(compression());

var fs = require('fs');
var async = require('async');

var decks = require('./decks').decks;

app.get('/api/decks', function(req, res) {
    res.type('application/json');
    res.json(decks);
});

app.get('/api/decks/:deckId', function(req, res) {

    res.type('application/json');

    res.json(decks[req.params.deckId]);
    // if (!airportData) {
    //     res.statusCode = 404;
    //     res.json({ error: 'Airport not found: ' + airportCode });
    //     return;
    // }
});

app.use(express.static(__dirname));
app.listen(process.env.PORT || 8080);
