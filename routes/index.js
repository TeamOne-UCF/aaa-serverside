var app = require('express')(),
    customerRepository = require("../dataAccess/customerRepository");

/**
 * Defines simple GET Request, ensures server is up and running :)
 */

app.get('/', function(req, res, next) {
    res.send('Page is down');

});


/**
 * Define APP Endpoints here
 */

app.get('/GetCustomer', customerRepository.getCustomers);
app.post('/GetCustomerByPhoneNumber', customerRepository.getCustomerByPhoneNumber);
app.post('/GetCustomerByID', customerRepository.getCustomerByID);
app.post('/InsertCustomer', customerRepository.insertCustomer);
app.get('/GetServiceTypes', customerRepository.getServiceTypes);
app.get('/GetQueue',customerRepository.getQueue);
app.post('/InsertCustomerToQueue', customerRepository.insertCustomerToQueue);
app.post('/UpdateCustomer', customerRepository.updateCustomer);

//expose function result here
module.exports = app;



