'use strict';

var express = require("express");
var router = express.Router();

router.get("city/:cityName",function(req,res){
  res.getJSON("http://api.openweathermap.org/data/2.5/forecast/daily?q=Montpellier&mode=json&units=metric&cnt=10",function(result){
    alert("City: "+result.city.cityName);
    alert("Weather: "+ result.list[0].weather[0].description);
    });
});
module.exports = router;
