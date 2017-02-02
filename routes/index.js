var app = require('express')();

/**
 * Defines simple GET Request, ensures server is up and running :)
 */

app.get('/', function(req, res, next) {res.send('Page is down!');});

/**
 * Define APP Endpoints here
 */

//NO APIS ADDED SO FAR

//expose function result here
module.exports = app;