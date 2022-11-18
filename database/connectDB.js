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
    var sqlquery = "INSERT INTO Reservation VALUES(\'" + data.body.ReservationName + "\'," + data.body.GroupSize + 
    ",\'" + data.body.ReservationDate + "\',\'" + data.body.ReservationMessages + "\');";

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

async function fetchOneReserveData (data){
  var con = await mysql.createConnection({
    host: "localhost",
    user: "user",
    password: "password",
    database: "db"
  });

  return new Promise(function(resolve, reject){
    var sqlquery = "SELECT * FROM Reservation WHERE (ReservationName=\'" + data.query.ReservationName + 
                  "\' AND GroupSize=" + data.query.GroupSize + 
                  " AND ReservationDate=\'" + data.query.ReservationDate + "\');";
    console.log(sqlquery);
    con.query(
        sqlquery, 
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

async function fetchReserveDataByDate (data){
  var con = await mysql.createConnection({
    host: "localhost",
    user: "user",
    password: "password",
    database: "db"
  });

  return new Promise(function(resolve, reject){
    var sqlquery = "SELECT * FROM Reservation WHERE ReservationDate LIKE \'" + data.query.ReservationDate + "%\';";
    console.log(sqlquery);
    con.query(
        sqlquery, 
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
  fetchAllReserveData,
  fetchOneReserveData,
  fetchReserveDataByDate
};