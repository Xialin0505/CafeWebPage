var mysql = require('mysql2');

// know how to integrate components into server file
// know how to connect to a database
// having different query

function insertReserveData (data) {
  var con = mysql.createConnection({
    host: "localhost",
    user: "user",
    password: "password",
    database: "db"
  });

  con.connect(function(err) {
    if (err) throw err;
    var sqlquery = "INSERT INTO Reservation VALUES(\'" + data.body.Name + "\'," + data.body.People + 
    ",\'" + data.body.date + "\',\'" + data.body.Message + "\');";

    con.query(sqlquery, function (err, result) {
      if (err) throw err;
      console.log("Successfully Inserted");
    });
  });
}

async function fetchAllReserveData (){
  var con = await mysql.createConnection({
    host: "localhost",
    user: "user",
    password: "password",
    database: "db"
  });

  return new Promise(function(resolve, reject){
    con.query(
        "SELECT * FROM Reservation;", 
        function(err, result){                                                
            if(result === undefined){
                reject(new Error("Error rows is undefined"));
            }else{
                resolve(result);
            }
        }
    )}
  );
}

module.exports = {
  insertReserveData,
  fetchAllReserveData
};