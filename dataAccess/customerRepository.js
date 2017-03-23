var dbConnection = require('../lib/dbConnection');


module.exports = {
   getCustomers: getCustomers,
   getCustomerByPhoneNumber: getCustomerByPhoneNumber,
   insertCustomer : insertCustomer
};

function getCustomers(req, res, next) {
    dbConnection.executeQuery("select * from ??",
        ["Customer_Reception_Database.Customer"]
        ,function(error, results) {
            if(error) {
                return next(error);
            }else {
                res.json(results);
            }
        }
    )
}

function getCustomerByPhoneNumber(req, res, next) {
    var customerSearchCriteria = req.body;

    dbConnection.executeQuery(
        "select * from ?? where phone = ?",
        ["Customer_Reception_Database.Customer", customerSearchCriteria.phone],
        function(err, results) {
            if(err) {
                return next(err);
            }else {
                res.json(results);
            }
        }
    )
}

function insertCustomer(req, res, next) {
    var newCustomer = req.body;
    newCustomer.customer_id = "3274";
    //newCustomer.customer_id = "9278";

    dbConnection.executeInsertStatement("INSERT INTO Customer_Reception_Database.Customer SET ?", newCustomer,
        function(err, results) {
            if(err) {
                return next(err);
            }else {
                res.json({statusCode: 200});
            }
        }
    )
}

/**
 * Private function
 */

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + "" +  s4() + "" +  s4() + "" + s4() + "";
}
//