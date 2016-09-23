var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var volleyball = require('volleyball');
var db = require('./db');
var FlashCard = db.model('flashcard');

var app = express();
module.exports = app;

// logging middleware for HTTP requests and responses (https://www.npmjs.com/package/volleyball) -- similar to Morgan (https://github.com/expressjs/morgan)
app.use(volleyball)

// paths to static resources we will establish routes for further down
var nodeModulesPath = path.join(__dirname, '../node_modules');
var publicPath = path.join(__dirname, '../browser');

// __dirname: http://nodejs.org/docs/latest/api/globals.html#globals_dirname
// path.join: http://nodejs.org/api/path.html#path_path_join_path1_path2

// When our server gets a request and the url matches something in our browser
// folder, serve up that file (e.g. app.js, style.css).
// NOTE: this also automatically maps `GET /` to `GET /index.html`!
app.use(express.static(publicPath));

// If we request the angular source code, serve it up from node_modules
app.use(express.static(nodeModulesPath));

//body parsing from json or urlencoded into object (req.body)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// our main JSON data route
app.get('/api/cards', function (req, res, next) {

    var modelParams = req.query.category ? { category: req.query.category } : {};

    FlashCard.findAll({ where: modelParams })
    .then(function (cards) {
        // deliberately throttling response to simulate slow network
        setTimeout(function () {
            res.json(cards);
        }, Math.random() * 700 + 300);
    })
    .catch(next);

});

app.post('/api/cards', function (req, res, next) {
    var card = req.body;

    FlashCard.create(card).then(function (card) {
        // deliberately throttling response to simulate slow network
        setTimeout(function () {
            res.send(card);
        }, 2000);
    })
    .catch(function (err) {
        console.log('not created')
        console.error(err);
        res.status(500).send(err);
    });

});

//in order to refresh on a page that is a state that has no hash because of html5 mode of true, we need to serve up index.html which will load angular which will match the url with a states url if possible
var indexHtmlPath = path.join(__dirname, '../browser/index.html')
app.get('/*', function (req, res) {
    console.log('about to send index', indexHtmlPath)
    res.sendFile(indexHtmlPath);
});
