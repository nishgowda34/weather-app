'use strict';

var express = require("express");
var app = express();
var routes = require("./routes");

var jsonParser = require("body-parser").json;

app.use(jsonParser());
app.use("/city",routes);

app.use('/static', express.static(__dirname + '/public'))

app.set('view engine', 'jade');
app.set('views',__dirname + '/templates')

app.get('/', function(req,res){
  res.render('index');
});

app.get('/about', function(req,res){
  res.render('about');
});

app.listen(3000,function(){
  console.log("The server is running at port 3000");
});
