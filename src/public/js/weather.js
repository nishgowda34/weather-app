/*googleMap function to display map*/
/*Referenced to https://www.youtube.com/watch?v=obOa8fdJ9aQ - youtube link*/

function googleMap() {
    var address = (document.getElementById('location'));
    var autocomplete = new google.maps.places.Autocomplete(address);
    autocomplete.setTypes(['geocode']);
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            return;
        }

    var address = '';
    if (place.address_components) {
        address = [
            (place.address_components[0] && place.address_components[0].short_name || ''),
            (place.address_components[1] && place.address_components[1].short_name || ''),
            (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
    }

    var x = place.geometry.location.lat();
    var y = place.geometry.location.lng();

    //Getting longitude and Latitude
    document.getElementById('lat').innerHTML = x;
    document.getElementById('long').innerHTML = y;

    var coords = new google.maps.LatLng(x,y);
    var mapOptions = {
        zoom: 16,
        center: coords,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    //Displaying map
    var map = new google.maps.Map(document.getElementById("map"),mapOptions);

    //Placing marker on google map
    var marker = new google.maps.Marker({map: map, position: coords});
    });

}

function weatherData(){
    //Displaying weather data in Metric units
    if(document.getElementById('metric').checked){
        $.getJSON("http://api.openweathermap.org/data/2.5/forecast/daily?q="+document.getElementById("location").value+"&appid=0622129fbb6a8de59795ce299bf50940&units=metric&cnt="+document.getElementById("days").value, function(parameter){
            //Displaying heading
            $('#heading').html('<h3>Weather Forecast</h3>');
                if(document.getElementById("days").value >= 1){
                    for(i=0; i<document.getElementById("days").value; i++){
                        //Display weather features
                        $('#feature').append('<h4><a class="3hour" href="#" onclick="dateFunction()"> Day ' + (i+1) + ' Forecast'+'</a><br/></h4>');
                        $('#feature').append('<p><strong> Description:</strong> ' + parameter.list[i].weather[0].description + '</p>');
                        $('#feature').append('<p><img src="https://openweathermap.org/img/w/'+parameter.list[i].weather[0].icon+'.png" alt="abcd"></p>');
                        $('#feature').append('<p> <strong>Minimum Temperature:</strong> ' + parameter.list[i].temp.min + ' deg c</p>');
                        $('#feature').append('<p> <strong>Maximum Temperature:</strong> ' + parameter.list[i].temp.max + ' deg c</p>');
                        $('#feature').append('<p> <strong>Rainfall: </strong>' + parameter.list[i].rain + ' mm</p>');
                        $('#feature').append('<strong>Pressure:</strong> <input type="checkbox" id="pressure"> <p id="pre">'+ parameter.list[i].pressure +'h Pa</p>');
                        $('#pressure').click(function(){
                            $('#pre').toggle();
                        });
                        $('#feature').append('<p><strong>Humidity:</strong> <input type="checkbox" id="humidity"> <p id="hum">'+ parameter.list[i].humidity +' %</p></p>');
                        $('#humidity').click(function(){
                            $('#hum').toggle();
                        });
                        $('#feature').append('<strong>Wind Speed: </strong><input type="checkbox" id="speed"> <p id="wind">'+ parameter.list[i].speed +' meter/sec</p><br/>');
                        $('#speed').click(function(){
                            $('#wind').toggle();
                        });

                    }

                }
            });
    }

    //Displaying weather data in imperial units
    if(document.getElementById('imperial').checked){
        $.getJSON("http://api.openweathermap.org/data/2.5/forecast/daily?q="+document.getElementById("location").value+"&appid=0622129fbb6a8de59795ce299bf50940&units=imperial&cnt="+document.getElementById("days").value, function(parameter){
            $('#feature').html('<h3>Weather Forecast</h3>');
                if(document.getElementById("days").value >= 1){
                    for(i=0; i<document.getElementById("days").value; i++){
                        //Display weather features
                        $('#feature').append('<h4><a class="3hour" href="#" onclick="dateFunction()"> Day ' + (i+1) + ' Forecast'+'</a><br/></h4>');
                        $('#feature').append('<p><strong> Description:</strong> ' + parameter.list[i].weather[0].description + '</p>');
                        $('#feature').append('<p><img src="https://openweathermap.org/img/w/'+parameter.list[i].weather[0].icon+'.png" alt="abcd"></p>');
                        $('#feature').append('<p> <strong>Minimum Temperature:</strong> ' + parameter.list[i].temp.min + ' deg F</p>');
                        $('#feature').append('<p> <strong>Maximum Temperature:</strong> ' + parameter.list[i].temp.max + ' deg F</p>');
                        $('#feature').append('<p> <strong>Rainfall: </strong>' + parameter.list[i].rain + ' mm</p>');
                        $('#feature').append('<strong>Pressure:</strong> <input type="checkbox" id="pressure"> <p id="pre">'+ parameter.list[i].pressure +'h Pa</p>');
                        $('#pressure').click(function(){
                            $('#pre').toggle();
                        });
                        $('#feature').append('<p><strong>Humidity:</strong> <input type="checkbox" id="humidity"> <p id="hum">'+ parameter.list[i].humidity +' %</p></p>');
                        $('#humidity').click(function(){
                            $('#hum').toggle();
                        });
                        $('#feature').append('<strong>Wind Speed: </strong><input type="checkbox" id="speed"> <p id="wind">'+ parameter.list[i].speed +' miles/hour</p><br/>');
                        $('#speed').click(function(){
                            $('#wind').toggle();
                        });
                    }
                }
            });
        }

    }

//To get the weather data in three hour format. And display date and time.
function dateFunction(){
        $.getJSON("http://api.openweathermap.org/data/2.5/forecast?q="+document.getElementById("days").value+"&appid=0622129fbb6a8de59795ce299bf50940", function(den){
                    for(i=0; i<document.getElementById("days").value; i++){
                        $('#feature').append('<p> <strong> Date and Time:</strong> ' + den.list[i].dt_txt + '</p>');

                }
            })
    }




google.maps.event.addDomListener(window, 'load', googleMap);
