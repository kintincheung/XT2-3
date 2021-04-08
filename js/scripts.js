mapboxgl.accessToken = 'pk.eyJ1Ijoia2ludGluIiwiYSI6ImNramlwc3N1cDExMTYzMHFvMDFjZnEwZ28ifQ.DMxzpF7rJLhPjx3WffNGnQ';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
center: [-79.4512, 43.6568],
zoom: 5
});

var geocoder = new MapboxGeocoder({
accessToken: mapboxgl.accessToken,
mapboxgl: mapboxgl
});

document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
// Get the geocoder results container.
var results = document.getElementById('result');

// Add geocoder result to container.
geocoder.on('result', function (e) {
  console.log(e.result);
var longSpan = e.result.center[0];
var latSpan = e.result.center[1];


  var request = 'https://api.openweathermap.org/data/2.5/weather?lat=' + e.result.center[1] + '&lon=' + e.result.center[0] + '&appid=380c221fabc0a849cff869fce4903dac&units=metric&lang=nl';
  fetch(request)
  .then(function(responseWeather){
      return responseWeather.json();
    })

    .then(function(responseWeather){
      console.log(responseWeather);
      document.getElementById('country').innerHTML = e.result.context[1].text;
      document.getElementById('weather').innerHTML =  responseWeather.weather[0].description;
      document.getElementById('temp').innerHTML = Math.round(responseWeather.main.temp) + "&#8451;";
      document.getElementById('humidity').innerHTML = responseWeather.main.humidity + "%";
      document.getElementById('wind').innerHTML = Math.round(responseWeather.wind.speed) + " km/u";
      document.getElementById('winddeg').innerHTML = Math.round(responseWeather.wind.deg) + "&#176;	";
      document.getElementById("weericon").src = "http://openweathermap.org/img/wn/"+responseWeather.weather[0].icon +"@2x.png";
});



    });
