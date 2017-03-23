
var mySql = require('mysql'),
    poolConnection = undefined;


module.exports = {
    executeQuery: executeQuery,
    executeInsertStatement: executeInsertStatement
};

function executeQuery(sqlStatement, values, callback) {
    var pool = getPoolConnection();
    pool.getConnection(function(err,connection) {
        if(err) {
            callback(err, null);
        } else {
            connection.query({
                sql: sqlStatement,
                timeout: 40000,
                values: values
            }, function(error, results, fields) {
                //done with the connection
                connection.release();
                //Handle error/success after the release
                callback(error, results);
                //dont use the connection here, it has been returned to the pool.
            });
        }
    });
}

function executeInsertStatement(sqlStatement, insertValues, callback) {
    var pool = getPoolConnection();
    pool.getConnection(function(err,connection) {
        if(err) {
            callback(err, null);
        } else {
            connection.query( sqlStatement, insertValues, function(error, results, fields) {
                //done with the connection
                connection.release();
                //Handle error/success after the release
                callback(error, results);
                //dont use the connection here, it has been returned to the pool.
            });
        }
    });
}


function getPoolConnection() {
    if(!poolConnection) {
        poolConnection = mySql.createPool({
            host: "customer-reception-db.ctiwsh5u8qsu.us-west-2.rds.amazonaws.com",
            user: "TeamOne_UCF",
            password: "TeamOneUCF",
            port: 3306
        });
    }
    return poolConnection;
}