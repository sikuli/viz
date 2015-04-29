var dat = require("dat");
var express = require("express");
var app = express();
var http = require("http").Server(app);
var bodyParser = require("body-parser");
var io = require('socket.io')(http);

app.use(bodyParser.text({type: "*/*"}))

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
  console.log(req.body);
  var datOptions = createDatOptions(req.headers["content-type"]);
  var writer = db.createWriteStream({format: datOptions});
  var result = writer.end(req.body);
  res.send(result);

});
  
io.on("connection", function(socket){
  
  socket.on("getDataStream", function() {
    
    db.createReadStream()
    .on('data', function (data) {
      
      socket.emit("dataStream", data);
      
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
  
})

http.listen(3000, function() {

  console.log("listening on port 3000");

});

});
