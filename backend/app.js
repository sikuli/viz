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

var createDatOptions = function(contentType) {

  var options = {};

  if(!contentType) return options;

  switch(contentType) {

      case "text/csv":
        options.format = "csv";
        break;

      case "application/json":
        options.format = "json";
        break;

      case "text/tsv":
        options.format = "csv";
        options.separator = "\t";
        break;

  }

  return options;

}

app.post("/file", function(req, res) {

  console.log(req.headers["content-type"]);
  res.send(createDatOptions(req.headers["content-type"]));

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
