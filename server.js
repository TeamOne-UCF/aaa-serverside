var express = require('express');

var bodyParser = require('body-parser');

var application = express();

application.use(bodyParser.json({limit: '100mb'}));

application.use('/', require('./routes'));

application.use(function(req, res, next) {
    var err = new Error('Not Found Hello World');
    err.status = 404;
    next(err);
});

application.set('port', process.env.PORT || 3050);

var server = application.listen(application.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});