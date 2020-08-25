
// Express, mysql, and Cors requirements.
var express = require('express');
var mysql = require('./dbcon.js');
var CORS = require('cors');

// Setting up file for using express, the port, json, urlencoded, and Cors.
var app = express();
app.set('port', 8080);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(CORS());

// Variables storing static mysql commands in mysql syntax.
const getAllQuery = 'SELECT * FROM workout';
const insertQuery = 'INSERT INTO workout (`name`, `reps`, `weight`, `unit`, `date`) VALUES (?, ?, ?, ?, ?)';
const deleteQuery = 'DELETE FROM workout WHERE id=?';
const updateQuery = 'UPDATE workout SET name=?, reps=?, weight=?, unit=?, date=? WHERE id=?';
const dropTableQuery = 'DROP TABLE IF EXISTS workout';
const makeTableQuery = `CREATE TABLE workout(
                        id INT PRIMARY KEY AUTO_INCREMENT,
                        name VARCHAR(255) NOT NULL,
                        reps INT,
                        weight INT,
                        unit BOOLEAN,
                        date DATE);`

// Send getAllQuery to the mysql database, collect the current table data in json format for response to client.
const getAllData = (res) => {
  mysql.pool.query(getAllQuery, (err, rows, fields) => {
    if(err) {
      next(err);
      return;
    } 
    res.json({rows: rows});
  }); 
};

// Upon a get request, respond with current table data 
app.get('/',function(req,res,next){
  getAllData(res);
});

// Collect data in body of post request, send it to my sql in proper format for intertQuery, respond to req with the current table data.
app.post('/',function(req,res,next){
  var {name, reps, weight, unit, date} = req.body;
  mysql.pool.query(insertQuery, [name, reps, weight, unit, date], (err, result) => {
    if(err){
      next(err);
      return;
    }
    getAllData(res);
  });
});

// Upon delete request, send mysql a deleteQuery with rowId, respond to req with current table data.
app.delete('/', (req,res,next) => {
  var {id} = req.body;
  mysql.pool.query(deleteQuery, [id], (err, result) => {
    if(err){
      next(err);
      return;
    }
    getAllData(res);
  });
});

// Collect data in body of put request, send it to my sql in proper format for updateQuery, respond to req with the current table data.
app.put('/', (req,res,next) => {
  var {name, reps, weight, unit, date, id} = req.body;
  mysql.pool.query(updateQuery, [name, reps, weight, unit, date, id], (err, result) => {
    if(err){
      next(err);
      return;
    }
    getAllData(res);
  });
});

// When /reset-table is visited, drop the table and make a new one to reset the table.
app.get('/reset-table',function(req,res,next){
  var context = {};
  mysql.pool.query(dropTableQuery, function(err){
    mysql.pool.query(makeTableQuery, function(err){
      context.results = "Table reset";
      res.send(context);
    })
  });
});

// Prints server address when node server successfully runs.
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});