var http = require('http');
var url = require('url');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var path = require("path");
var rateLimit = require("express-rate-limit");
var xml2js = require('xml2js');

var db = require('../database/connectDB');
var parser = new xml2js.Parser();

var app = express();
const router = express.Router();

var server = http.createServer(app);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname,"..", "webpage")));
app.use(helmet());
app.use(limiter);

router.get('/', function(req,res){
  var q = url.parse(req.url, true);
  console.log("GET Received request from " + q.pathname);
  res.sendFile(path.join(__dirname, '..', 'webpage', 'home.html'));
  // fs.readFile("../webpage/home.html", function(err, data) {
  //   if (err) {
  //     res.writeHead(404, {'Content-Type': 'text/html'});
  //     return res.end("404 Not Found");
  //   } 

  //   res.writeHead(200, {'Content-Type': 'text/html'});
  //   res.write(data);
  //   return res.end();
  // });
});

router.post('/', function(req,res){
  var q = url.parse(req.url, true);
  console.log("POST Received request from " + q.pathname);
  db.insertReserveData(req);
  res.sendFile(path.join(__dirname, '..', 'webpage', 'home.html'));
  // fs.readFile("../webpage/home.html", function(err, data) {
  //     if (err) {
  //       res.writeHead(404, {'Content-Type': 'text/html'});
  //       return res.end("404 Not Found");
  //     } 

  //     res.writeHead(200, {'Content-Type': 'text/html'});
  //     res.write(data);
  //     return res.end();
  //   });
});

// router.post('/view', function(req,res){
//   // db.serialize(()=>{
//   //   db.each('SELECT id ID, name NAME FROM emp WHERE id =?', [req.body.id], function(err,row){     //db.each() is only one which is funtioning while reading data from the DB
//   //     if(err){
//   //       res.send("Error encountered while displaying");
//   //       return console.error(err.message);
//   //     }
//   //     res.send(` ID: ${row.ID},    Name: ${row.NAME}`);
//   //     console.log("Entry displayed successfully");
//   //   });
//   // });
// });

// //Update
// router.post('/update', function(req,res){
//   // db.serialize(()=>{
//   //   db.run('UPDATE emp SET name = ? WHERE id = ?', [req.body.name,req.body.id], function(err){
//   //     if(err){
//   //       res.send("Error encountered while updating");
//   //       return console.error(err.message);
//   //     }
//   //     res.send("Entry updated successfully");
//   //     console.log("Entry updated successfully");
//   //   });
//   // });
// });

// router.post('/delete', function(req,res){
//   // db.serialize(()=>{
//   //   db.run('DELETE FROM emp WHERE id = ?', req.body.id, function(err) {
//   //     if (err) {
//   //       res.send("Error encountered while deleting");
//   //       return console.error(err.message);
//   //     }
//   //     res.send("Entry deleted");
//   //     console.log("Entry deleted");
//   //   });
//   // });

// });

router.get('/API/allReservation', function(req,res){
  var q = url.parse(req.url, true);
  console.log("Received request from " + q.pathname);
  // var result = db.fetchAllReserveData();
  db.fetchAllReserveData()
  .then(function(results){
    res.writeHead(200, {'Content-Type': 'application/json'});
    //console.log(results);
    
    var data = []
    for (const i of results){
      data.push(i)
    }
    res.write(JSON.stringify(data));
    return res.end();
  })
  .catch(function(err){
    console.log("Promise rejection error: "+err);
  })
});

router.post('/API/makeReservation', function(req,res){
  var q = url.parse(req.url, true);
  console.log("Received request from " + q.pathname);
  try{
    db.insertReserveData(req);
    console.log(req.body());
    res.writeHead(200, {'Content-Type': 'application/json'});
    return res.end();
  }catch(error){
    res.writeHead(505, {'Content-Type': 'application/json'});
    return res.end();
  }
  
});

app.use('/', router);

server.listen(8080, function(){
  console.log("server is listening on port: 8080");
});

// http.createServer(function (req, res) {
//   var q = url.parse(req.url, true);
//   console.log("Received request from " + q.pathname);
//   if (q.pathname == "/reserve/"){
//     console.log("submit the form");
//     const params = new URLSearchParams(q.query);
//     //db.insertReserveData(params);
    
//     fs.readFile("../webpage/home.html", function(err, data) {
//       if (err) {
//         res.writeHead(404, {'Content-Type': 'text/html'});
//         return res.end("404 Not Found");
//       } 
//       res.writeHead(200, {'Content-Type': 'text/html'});
//       res.write(data);
//       return res.end();
//     });
  
//   }else{
//     var filename = "../webpage" + q.pathname;
//     fs.readFile(filename, function(err, data) {
//       if (err) {
//         res.writeHead(404, {'Content-Type': 'text/html'});
//         return res.end("404 Not Found");
//       } 
//       res.writeHead(200, {'Content-Type': 'text/html'});
//       res.write(data);
//       return res.end();
//     });
//   }
// }).listen(8080);