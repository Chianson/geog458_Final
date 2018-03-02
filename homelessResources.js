// JavaScript File
<<<<<<< HEAD
"use strict";
(function () {
    var map; //mapbox map object
    var shelters = {
        'Catholic Community Services - Seattle': {
            bearing: 1,
            center: [-122.30156565, 47.6011886],
            zoom: 1,
            pitch: 1 
        },
        'Multi-Service Center- Federal Way': {
            bearing: 1,
            center: [-122.318042154362, 47.3007686442953],
            zoom: 1,
            pitch: 1
        },
        'YWCA- Renton': {
            bearing: 1,
            center: [-122.203563458549, 47.4814093],
            zoom: 1,
            pitch: 1
        },
        'Solid Ground - North Seattle': {
            bearing: 1,
            center: [-122.332551801326, 47.69870805],
            zoom: 1,
            pitch: 1
        },
        'YMCA Young Adult Services Drop in Center': {
            bearing: 1,
            center: [-122.3303895, 47.6182332],
            zoom: 1,
            pitch: 1
        },
        'YouthCare’s James W. Ray Orion Center': {
            bearing: 1,
            center: [-122.3303895, 47.6182332],
            zoom: 1,
            pitch: 1
        },
        'Peace for the Streets by Kids from the Streets': {
            bearing: 1,
            center: [-122.3077338, 47.6155844],
            zoom: 1,
            pitch: 1
        },
        'Nexus Youth & Families': {
            bearing: 1,
            center: [-122.218837787879, 47.2995776464646],
            zoom: 1,
            pitch: 1
        },
        'Teen Feed': {
            bearing: 1,
            center: [-122.31273440028, 47.66432385],
            zoom: 1,
            pitch: 1
        },
        'University District Youth Center': {
            bearing: 1,
            center: [-122.311670474999, 47.66185935],
            zoom: 1,
            pitch: 1
        },
        'Catholic Community Services - Bellevue': {
            bearing: 1,
            center: [-122.192249916315, 47.6114129],
            zoom: 1,
            pitch: 1 
        },
        'New Bethlehem Day Center Kirkland': {
            bearing: 1,
            center: [-122.18098627459, 47.6758031],
            zoom: 1,
            pitch: 1
        },
        'New Horizons': {
            bearing: 1,
            center: [-122.349536087159, 47.6171479],
            zoom: 1,
            pitch: 1
        },
        'Friends of Youth Redmond': {
            bearing: 1,
            center: [-122.122910653061, 47.6797058163265],
            zoom: 1,
            pitch: 1
        },
        'VA Puget Sound’s Community Housing and Outreach Services ': {
            bearing: 1,
            center: [-122.2109979, 47.4810182],
            zoom: 1,
            pitch: 1
        }
    }
    window.onload = function() {
        //Token to allow a request to the mapbox api
        mapboxgl.accessToken = 'pk.eyJ1IjoiY2hpYW5zb24iLCJhIjoiY2pkeXVkM3pwMnZ0bDMydDM5ZTdvMnFrMSJ9.tkK3NgjXaLtmcilvC4RH3Q';
        map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/hongc7/cje7hqpqi28xl2rnpyz5necrx', //replace with the style made in class
            center: [-122.3321, 47.5], //centered on King County
            zoom: 9
        });
    
        // map.on('click', 'homeless-marker', function (e) {
        //     var coordinates = e.features[0].geometry.coordinates.slice();
        //     var address = e.features[0].properties.Address;
        //     var name = e.features[0].properties.Name;
        //     while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        //         coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        //     }
        //     new mapboxgl.Popup()
        //         .setLngLat(coordinates)
        //         .setHTML('<h3>' + name + '</h3>')
        //         .addTo(map);
        // });
        // map.on('mouseenter', 'homeless-marker', function () {map.getCanvas().style.cursor = 'pointer';});
        // map.on('mouseleave', 'homeless-marker', function () {map.getCanvas().style.cursor = '';});
        //loadHomeless();
        
        map.on("load", function() {
           map.addSource("homeless_shelters", { //add homeless data source
               "type": "geojson", //reads it in as a geojson file
               "data": "./homeless_shelters.geojson"
            });
           
           map.on('click', function(e) {
              var features = map.querySourceFeatures(e.point, {
                layers: ['homeless_shelters']
              });
            
              if (!features.length) {
                return;
              }
            
              var feature = features[0];
            
              var popup = new mapboxgl.Popup({ offset: [0, -15] })
                .setLngLat(feature.geometry.coordinates)
                .setHTML('<h3>' + feature.properties.title + '</h3><p>' + feature.properties.description + '</p>')
                .setLngLat(feature.geometry.coordinates)
                .addTo(map);
            });
        });
    };
    
    function loadHomeless(){
        map.on("load", function() { //ensures map loads before adding layers
            map.addSource("homeless_shelters", { //add homeless data source
               "type": "geojson", //reads it in as a geojson file
               "data": "./homeless_shelters.geojson"
            });
        });
    }
})();
=======

var map; //mapbox map object
    
window.onload = function() {
//Token to allow a request to the mapbox api
	mapboxgl.accessToken = 'pk.eyJ1IjoiY2hpYW5zb24iLCJhIjoiY2pkeXVkM3pwMnZ0bDMydDM5ZTdvMnFrMSJ9.tkK3NgjXaLtmcilvC4RH3Q';
	map = new mapboxgl.Map({
	    container: 'map',
	    style: 'mapbox://styles/hongc7/cje7hqpqi28xl2rnpyz5necrx', //replace with the style made in class
	    center: [-122.3321, 47.5], //centered on King County
	    zoom: 9
	});
	// add location legend 
	 var item = document.createElement('div'); 
  	var value = document.createElement('span');
  	value.innerHTML = "<strong>Homeless Resources</strong>";
  	item.appendChild(value);
  	legend.appendChild(item);

	var layers = ['Food Bank', 'Homeless Shelters'];
	var colors = ['#FF0A0E', '#0986FB'];
    for (i = 0; i < layers.length; i++) {
      var layer = layers[i];
      var color = colors[i];
      var item = document.createElement('div');
      var key = document.createElement('span');
      key.className = 'legend-key';
      key.style.backgroundColor = color;
      var value = document.createElement('span');
      value.innerHTML = layer;
      item.appendChild(key);
      item.appendChild(value);
      legend.appendChild(item);
  	}

  	var item = document.createElement('div'); 
  	var value = document.createElement('span');
  	value.innerHTML = "<br><strong>Population Density</strong>";
  	item.appendChild(value);
  	legend.appendChild(item);

  	// add population density legend 
  	var pop_density = ['2355/mi', '3922/mi', '5388/mi', '8676/mi', '53437/mi'];
  	var pop_colors = ['#FFEDA0', '#FED976', '#FEB24C', '#FD8D3C', '#E31A1C'];
  	    for (i = 0; i < pop_density.length; i++) {
      var pop_d = pop_density[i];
      var pop_c = pop_colors[i];
      var item = document.createElement('div');
      var key = document.createElement('span');
      key.className = 'legend-pop';
      key.style.backgroundColor = pop_c;
      var value = document.createElement('span');
      value.innerHTML = pop_d;
      item.appendChild(key);
      item.appendChild(value);
      legend.appendChild(item);
  	}
}


>>>>>>> 3e3dd948819fe57990e7332f833215b9d709d903
