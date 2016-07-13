'use strict';

var express = require ('express')
    about = require('./lib/about.txt');

var app = express();

app.get('/', function(req,res){
  res.send("i love treehouse");
});

app.get('/about', function(req,res){
  res.send(about);
});

app.listen(3000,function(){
  console.log("The server is running at port 3000");
});
