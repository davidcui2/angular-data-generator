// set up ================

var express = require('express');
var app     = express();
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var util = require('util');
// configuration =================

app.use(express.static(__dirname + '/app'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// For the time now
Date.prototype.timeNow = function () {
     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}

// listen (start app with node server.js) ======================================
app.listen(8000);
console.log(new Date().timeNow() + " App listening on port 8000");

// routes ======================================================================

// api ---------------------------------------------------------------------
// get all data
app.get('/api/data', function(req, res) {
    console.log("server get called");
    var data = randomData();
    console.log(data.generatedDate + " server GET data.x: " + data.x);
    res.json(data); // return all data in JSON format
});

app.post('/api/data', function(req, res) {
    console.log("server post requested: %o", req.body.command);
    res.send(req.body.command + " command received!");
});

function randomData() {
    var data = {};
    data.generatedDate = new Date().timeNow();
    data.x = Math.random();
    data.y = Math.random();
    data.z = Math.random();
    // console.log("server randomData data.x = " + data.x );

    return data;
}