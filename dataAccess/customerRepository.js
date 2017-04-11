var dbConnection = require('../lib/dbConnection');


module.exports = {
   getCustomers: getCustomers,
   getCustomerByPhoneNumber: getCustomerByPhoneNumber,
   getCustomerByID: getCustomerByID,
   insertCustomer : insertCustomer,
   getServiceTypes: getServiceTypes,
   getQueue: getQueue,
   insertCustomerToQueue: insertCustomerToQueue
};

function getServiceTypes(req, res, next) {
    var sqlStatement = "SELECT * FROM ??";
    var parameters = ["Customer_Reception_Database.Service"];

    dbConnection.executeQuery(sqlStatement, parameters, function(error, results) {
        if(error) {
            return next(error);
        } else {
            res.json(results);
        }
    });
}

function getQueue(req, res, next) {
	dbConnection.executeQuery("select * from ??",
		["Customer_Reception_Database.Queue"],
		function (error, results) {
			if (error) {
				return next(error);
			} else {
				res.json(results);
			}
		}
	)
}

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

function insertCustomer(req, res, next) {
    var newCustomer = req.body;
    dbConnection.executeQuery(
        "CALL Customer_Reception_Database.InsertCustomer(?,?,?,?,?,?,?,?,?,?,?)",
        [newCustomer.p_first_name, newCustomer.p_last_name, newCustomer.p_email, newCustomer.p_phone, newCustomer.p_address,
            newCustomer.p_address_2, newCustomer.p_city, newCustomer.p_state, newCustomer.p_postal_code,
             newCustomer.p_alert_email, newCustomer.p_alert_sms
        ],
        function(err, results) {
            if(err) {
                return next(err);
            } else {
                res.json(results);
            }
        });
}

function insertCustomerToQueue(req, res, next) {
    var customerToQueue = req.body;
}

