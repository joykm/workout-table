var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'us-cdbr-east-02.cleardb.com',
  user            : 'bb7c32d165ca39',
  password        : '302f9dce',
  database        : 'heroku_157efba39ed7be4'
});

pool.getConnection(function(err, connection){
    if(err){
        console.log("Could not connect to database.")
    }
    else {
    	console.log("Successfully connected to database.")
    }
});

module.exports.pool = pool;
