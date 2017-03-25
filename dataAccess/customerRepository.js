var dbConnection = require('../lib/dbConnection');


module.exports = {
   getCustomers: getCustomers,
   getCustomerByPhoneNumber: getCustomerByPhoneNumber,
   getCustomerByID: getCustomerByID,
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

function getCustomerByID(req, res, next) {
	var customerSearchCriteria = req.body;
	
	dbConnection.executeQuery(
		"select * from ?? where customer_id = ?",
		["Customer_Reception_Database.Customer", customerSearchCriteria.customer_id],
		function(err, results) {
			if(err) {
				return next(err);
			} else {
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

//
