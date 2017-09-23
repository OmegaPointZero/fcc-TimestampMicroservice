// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/*', function(req,res){
  if(req.method == "GET" && req.url.length > 1){
    var query = req.url.slice(1);
  }
  
  var day;
  var year;
  var month;
  var unixDate;
  var naturalDate;
  var goodDate = false;
  
  var parseNatLanDate = function(time){
    var unixdate = new Date(time);
    var test = query.split("%20");
    var months =[
      "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]

    month = months[unixdate.getMonth()];
    day = unixdate.getDate();
    year = unixdate.getFullYear();
    naturalDate = month + " " + day + ", " + year;
    if(naturalDate=="undefined NaN, NaN"){
      naturalDate = null;
    }
    unixDate = time/1000;
    goodDate = true;
    }

  if(query.split("%20").length == 3){
    var lanDate = Date.parse(query.split("%20").join(" ")); // if 
    if(lanDate != null){
      parseNatLanDate(lanDate)  
    }
  }
  
  if(query.split("%20").length == 1){
    if(Number(query) !=  null){
    parseNatLanDate(query*1000);
    }
  }
  


  if(goodDate == true){
    res.writeHead(200, {'Content-Type':'application/JSON'})
    res.write(JSON.stringify({
      unix: unixDate,
      natural: naturalDate,
    }))
  }else{
    res.writeHead(200, {'Content-Type': 'application/JSON'})
    res.write(JSON.stringify({
      unix: null,
      natural: null
    }))
  }
  
})

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);  
});