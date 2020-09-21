
const express = require('express');
const app = express();
const sqlConnection = require("./database/db_connection");

var bodyParser = require('body-parser')

app.use(bodyParser.json())


//CORS 
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authrization');
  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Header', 'PUT, GET, POST, PATCH, DELETE');
    return res.status(200).json({});
  }
  next();
});

//Get All Momment 
app.get('/moments', (req, res, next) => {

  let movements = [];
  sqlConnection.query("SELECT * FROM moments", function (err, result, fields) {
    if (err) throw err;
    console.log(result);

    res.send(result);

  });

})

//Insert Mouse Momemnt
app.post('/moments', (req, res, next) => {
  let movements = req.body;
  movements.forEach((item) => {

    var sql = `INSERT INTO 	moments (x, y) VALUES (${item.x}, ${item.y})`;
    sqlConnection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Record inserted");
    });
  })
});

//Delete all record
app.post('/reset', (req, res, next) => {

  var sql = `TRUNCATE moments`;
  sqlConnection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Record Flused");
  });
});

module.exports = app;