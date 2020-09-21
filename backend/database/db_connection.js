var mysql = require('mysql');

var sqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mouse_task"
});

sqlConnection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

 

module.exports = sqlConnection;