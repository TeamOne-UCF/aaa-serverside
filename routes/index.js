var app = require('express')(),
    customerRepository = require("../dataAccess/customerRepository");

/**
 * Defines simple GET Request, ensures server is up and running :)
 */

app.get('/', function(req, res, next) {
    res.send('Page is down');

});

app.get('/GetCustomer', customerRepository.getCustomers);
app.post('/GetCustomerByPhoneNumber', customerRepository.getCustomerByPhoneNumber);
app.post('/InsertCustomer', customerRepository.insertCustomer);


/**
 * Define APP Endpoints here
 */

//NO APIS ADDED SO FAR

//expose function result here
module.exports = app;



//