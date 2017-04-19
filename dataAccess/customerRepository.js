var dbConnection = require('../lib/dbConnection');
var twilio = require('../lib/twilio');

module.exports = {
   getCustomers: getCustomers,
   getCustomerByPhoneNumber: getCustomerByPhoneNumber,
   getCustomerByID: getCustomerByID,
   insertCustomer : insertCustomer,
   getServiceTypes: getServiceTypes,
   getQueue: getQueue,
   insertCustomerToQueue: insertCustomerToQueue,
   updateCustomer: updateCustomer,
   deleteQueueByCustomerId: deleteQueueByCustomerId,
   getQueueByServiceId: getQueueByServiceId,
    getQueueByCustomerId: getQueueByCustomerId
   
};


function getQueueByCustomerId(req,res,next) {
    var queryParam = req.params;
    var customerId = queryParam.id;

    var sqlStatement =
        "SELECT Q.queue_id, Q.customer_id, C.first_name, C.last_name, C.phone, S.type, Q.position " +
        "FROM Customer_Reception_Database.Queue Q INNER JOIN Customer_Reception_Database.Service S ON Q.service_id = S.service_id " +
        "INNER JOIN Customer_Reception_Database.Customer C ON Q.customer_id = C.customer_id " +
        "WHERE Q.customer_id = ? ";

    var parameters = [customerId];

    dbConnection.executeQuery(sqlStatement, parameters, function(error, results) {
        if(error) {
            return next(error);
        } else {
            res.json(results);
        }
    });
}

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

function getQueueByServiceId(req, res, next) {
	var service = req.body;
    var sqlStatement = "SELECT a.type, COUNT(b.service_id) AS QueueCount FROM ?? a, ?? b WHERE a.service_id = b.service_id AND a.service_id = ?;";
    var parameters = ["Customer_Reception_Database.Service", "Customer_Reception_Database.Queue", service.service_id];

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
        [newCustomer.p_first_name,
            newCustomer.p_last_name,
            newCustomer.p_email,
            newCustomer.p_phone,
            newCustomer.p_address,
            newCustomer.p_address_2,
            newCustomer.p_city,
            newCustomer.p_state,
            newCustomer.p_postal_code,
            newCustomer.p_alert_email,
            newCustomer.p_alert_sms
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
		
		dbConnection.executeQuery(
            "CALL Customer_Reception_Database.UpdateCustomer(?,?,?,?,?,?,?,?,?,?,?,?)",
			[   updatedCustomer.p_customer_id,
                updatedCustomer.p_first_name,
				updatedCustomer.p_last_name, 
				updatedCustomer.p_email,
                updatedCustomer.p_phone,
                updatedCustomer.p_address,
                "",
                updatedCustomer.p_city,
                updatedCustomer.p_state,
                updatedCustomer.p_postal_code,
                updatedCustomer.p_alert_email,
                updatedCustomer.p_alert_sms,
			],
			function(err, results) {
				if(err)
					return next(err);
				else
					res.json(results);
			}
		);
}

function deleteQueueByCustomerId(req, res, next) {
	var deleteQueue = req.body;
	
	dbConnection.executeQuery(
        "CALL Customer_Reception_Database.DeleteQueueByCustomerID(?)",
        [deleteQueue.customer_id],
        function(err, results) {
            if(err) {
                return next(err);
            } else {
				sendAgentReadySms(deleteQueue.customer, deleteQueue.phone);
                res.json(results);
            }
        });
}

function insertCustomerToQueue(req, res, next) {
    var customerToQueue = req.body;
    dbConnection.executeQuery(
        "CALL Customer_Reception_Database.InsertQueue(?,?,?)",
        [   customerToQueue.p_customer_id,
            customerToQueue.p_service_id,
            customerToQueue.p_note],
        function(err, results) {
            if(err) {
                return next(err);
            } else {
                res.json(results);
                return;
				// Notifies the customer via sms message
				sendCustomerSms(customerToQueue.p_first_name, customerToQueue.p_phone, customerToQueue.p_customer_id);
                res.json(results);
            }
        });
}

function sendCustomerSms(firstName, phone, customerId) {
	var smsBody = 'Hello ' + firstName + '\n\nWe will notify you when an agent is ready. ' +
		'Please click the link to view the wait details www.aaa.com/appLayout/customerQueue/' + customerId + " .";
	var sms = new twilio(phone, firstName, smsBody);
	sms.sendSms();
}

function sendAgentReadySms(customerName, phone) {
	var firstName = customerName.split(" ");
	
	var smsBody = 'Hello ' + firstName[0] + '\n\nAn agent is ready to see you.';
	
	var sms = new twilio(phone, firstName, smsBody);
	sms.sendSms();
}
