var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'us-cdbr-east-02.cleardb.com',
  user            : 'bb7c32d165ca39',
  password        : '302f9dce',
  // database        : 'cs290_joyke'
});

module.exports.pool = pool;
