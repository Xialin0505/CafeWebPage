var mysql = require('mysql');

// know how to integrate components into server file
// know how to connect to a database
// having different query

var con = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "password",
  database: "db"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});