var dat = require("dat");
var express = require("express");
var app = express();
var http = require("http").Server(app);

var db = dat("/Users/peyman/Desktop/Database", {}, function(err) {

  if(err)
    console.log("Error: " + err);
  else
    console.log("Dat initialized.");

//  db.put({"name":"Mike", "lastName": "Skirpan"}, function(error, newVersion){
//
//    if(error)
//      console.log("Error: " + err);
//    else
//      console.log("SUCCESS: " + newVersion);
//
//  });

app.post("/file", function(req, res) {

  console.log(req);
  res.send("YO");

});

http.listen(3000, function() {

  console.log("listening on port 3000");

});

db.createReadStream()
  .on('data', function (data) {
    console.log(data.key, '=', data.name)
  })
  .on('error', function (err) {
    console.log('Oh my!', err)
  })
  .on('close', function () {
    console.log('Stream closed')
  })
  .on('end', function () {
    console.log('Stream closed')
  })

});
