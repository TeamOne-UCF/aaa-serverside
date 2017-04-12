var dbConnection = require('../lib/dbConnection');


module.exports = {
   getCustomers: getCustomers,
   getCustomerByPhoneNumber: getCustomerByPhoneNumber,
   getCustomerByID: getCustomerByID,
   insertCustomer : insertCustomer,
   getServiceTypes: getServiceTypes,
   getQueue: getQueue,
   insertCustomerToQueue: insertCustomerToQueue,
   updateCustomer: updateCustomer
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
	dbConnection.executeQuery("CALL Customer_Reception_Database.GetQueue",
		[],
		function (error, results) {
			if (error) {
				return next(error);
			} else {
				res.json(results);
			}
		});
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
        });
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
		});
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
        });
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

function updateCustomer(req, res, next) {
		var updatedCustomer = req.body;
		
		dbConnection.executeQuery("UPDATE ?? SET first_name = ?, last_name = ?, email = ?, phone = ?, address = ?, city = ?, state = ?, postal_code = ?, alert_email = ?, alert_sms = ? WHERE customer_id = ?;",
			["Customer_Reception_Database.Customer",
				updatedCustomer.p_first_name, 
				updatedCustomer.p_last_name, 
				updatedCustomer.p_email, 
				updatedCustomer.p_phone, 
				updatedCustomer.p_address,
				updatedCustomer.p_city, 
				updatedCustomer.p_state, 
				updatedCustomer.p_postal_code,
				updatedCustomer.p_alert_email, 
				updatedCustomer.p_alert_sms,
				updateCustomer.p_customer_id, 
			],
			function(err, results) {
				if(err)
					return next(err);
				else
					res.json(results);
			}
		);
}

function insertCustomerToQueue(req, res, next) {
    var customerToQueue = req.body;
    dbConnection.executeQuery(
        "CALL Customer_Reception_Database.InsertQueue(?,?,?)",
        [customerToQueue.p_customer_id, customerToQueue.p_service_id, customerToQueue.p_note],
        function(err, results) {
            if(err) {
                return next(err);
            } else {
                res.json(results);
            }
        });
}

