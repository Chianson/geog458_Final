// JavaScript File
"use strict";
(function () {
    var map; //mapbox map object
    //set's the first active shelter in the scroll box
    var activesheltersName = 'Catholic-Community-Services:Seattle';
    var shelters = { //map of shelters and their location
        'DefaultView':{
            bearing: 0,
            center: [-122.3321, 47.5],
            zoom: 9,
            pitch: 0,
            duration: 5000
        },
        'Catholic-Community-Services:Seattle': {
            bearing: 135,
            center: [-122.30156565, 47.6011886],
            zoom: 16,
            pitch: 90,
            duration: 4000
        },
        'Multi-Service-Center:Federal-Way': {

            bearing: 105,
            center: [-122.318042154362, 47.3007686442953],
            zoom: 16,
            pitch: 90,
            duration: 4000
        },
        'YWCA:Renton': {
            bearing: -95,
            center: [-122.203563458549, 47.4814093],
            zoom: 16,
            pitch: 90,
            duration: 4000
        },
        'Solid-Ground:North-Seattle': {
            bearing: -90,
            center: [-122.332551801326, 47.69870805],
            zoom: 15,
            pitch: 90,
            duration: 4000
        },
        'YMCA-Young-Adult-Services-Drop-in-Center': {
            bearing: 235,
            center: [-122.301253, 47.5841884],
            zoom: 16,
            pitch: 90,
            duration: 4000
        },
        'YouthCare’s-James-W.-Ray-Orion-Center': {
            bearing: -45,
            center: [-122.3303895, 47.6182332],
            zoom: 16,
            pitch: 90,
            duration: 4000
        },
        'Peace-for-the-Streets-by-Kids-from-the-Streets': {
            bearing: -90,
            center: [-122.3077338, 47.6155844],
            zoom: 17,
            pitch: 90,
            duration: 4000
        },
        'Nexus-Youth-&-Families': {
            bearing: 0,
            center: [-122.218837787879, 47.2995776464646],
            zoom: 14,
            pitch: 90,
            duration: 4000
        },
        'Teen-Feed': {
            bearing: 90,
            center: [-122.31273440028, 47.66432385],
            zoom: 19,
            pitch: 90,
            duration: 4000
        },
        'University-District-Youth-Center': {
            bearing: -10,
            center: [-122.311670474999, 47.66185935],
            zoom: 18,
            pitch: 90,
            duration: 4000
        },
        'Catholic-Community-Services:Bellevue': {
            bearing: -95,
            center: [-122.192249916315, 47.6114129],
            zoom: 16,
            pitch: 90,
            duration: 4000
        },
        'New-Bethlehem-Day-Center:Kirkland': {
            bearing: 0,
            center: [-122.18098627459, 47.6758031],
            zoom: 18,
            pitch: 0,
            duration: 4000
        },
        'New-Horizons': {
            bearing: 235,
            center: [-122.349536087159, 47.6171479],
            zoom: 18,
            pitch: 90,
            duration: 4000
        },
        'Friends-of-Youth-Redmond': {
            bearing: 0,
            center: [-122.122910653061, 47.6797058163265],
            zoom: 18,
            pitch: 0,
            duration: 4000
        },
        'VA-Puget-Sound’s-Community-Housing-and-Outreach-Services': {
            bearing: 90,
            center: [-122.2109979, 47.4810182],
            zoom: 16,
            pitch: 90,
            duration: 4000
        }
    };
    
    window.onload = function() {
        //Token to allow a request to the mapbox api
        mapboxgl.accessToken = 'pk.eyJ1IjoiY2hpYW5zb24iLCJhIjoiY2pkeXVkM3pwMnZ0bDMydDM5ZTdvMnFrMSJ9.tkK3NgjXaLtmcilvC4RH3Q';
        map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/hongc7/cje7hqpqi28xl2rnpyz5necrx', //replace with the style made in class
            //style:'mapbox://styles/mapbox/light-v9',
            center: [-122.3321, 47.5], //centered on King County
            zoom: 9,
            bearing: 0,
            pitch: 0,
            hash: true
        });
        //waits until map loads before adding features
        map.on("load", function() {
            
            //Create 3D buildings and add to the bottom layer
            var layers = map.getStyle().layers;

            var labelLayerId;
            
            for (var i = 0; i < layers.length; i++) {
                if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
                    labelLayerId = layers[i].id;
                    break;
                }
            }
            
            //Add 3d building layer
            map.addLayer({
                'id': '3d-buildings',
                'source': 'composite',
                'source-layer': 'building',
                'filter': ['==', 'extrude', 'true'],
                'type': 'fill-extrusion',
                'minzoom': 15,
                'paint': {
                    'fill-extrusion-color': '#aaa',
        
                    // use an 'interpolate' expression to add a smooth transition effect to the
                    // buildings as the user zooms in
                    'fill-extrusion-height': [
                        "interpolate", ["linear"], ["zoom"],
                        15, 0,
                        15.05, ["get", "height"]
                    ],
                    'fill-extrusion-base': [
                        "interpolate", ["linear"], ["zoom"],
                        15, 0,
                        15.05, ["get", "min_height"]
                    ],
                    'fill-extrusion-opacity': .6
                }
            }, labelLayerId);
        });
        loadLegend();
        loadPopUps();
    };
    
    /**
     * This function loads the legend's text in the bottom right corner.
     * Takes no parameters and returns void.
     * @return void.
     */
    function loadLegend(){
        // add location legend 
    	var item = document.createElement('div'); 
      	var value = document.createElement('span');
      	value.innerHTML = "<strong>Homeless Resources</strong>";
      	item.appendChild(value);
      	var legend = document.getElementById("legend");
      	legend.appendChild(item);
      
        var layers = [" Food Bank", " Homeless Shelters"];
        var images = ["./data/food_icon.png", "./data/shelter_icon.png"];
        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            var thisItem = document.createElement('div');
            var thisKey = document.createElement('span');
            var myImage = document.createElement('img');
            myImage.src = images[i];
            myImage.style.height = "17px";
            myImage.style.width = "17px";
            thisKey.appendChild(myImage);            
            thisKey.className = 'legend-key';
            var thisValue = document.createElement('span');
            thisValue.innerHTML = layer;
            thisValue.style.margin = "0 0 10px 3px";

            thisItem.appendChild(thisKey);
            thisItem.appendChild(thisValue);
            legend.appendChild(thisItem);
        }

    
      	var item = document.createElement('div'); 
      	var value = document.createElement('span');
      	value.innerHTML = "<br><strong>Population Density</strong>";
      	item.appendChild(value);
      	legend.appendChild(item);
    
      	// add population density legend 
      	var pop_density = ['2355/mi', '3922/mi', '5388/mi', '8676/mi', '53437/mi'];
      	var pop_colors = ['#FFEDA0', '#FED976', '#FEB24C', '#FD8D3C', '#E31A1C'];
      	for (var i = 0; i < pop_density.length; i++) {
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
    //checks the active section on every scroll
    window.onscroll = function() {
        //get the names of the shelters from the keys
        var sheltersNames = Object.keys(shelters);
        
        //for each shelter, checks if it is active
        for (var i = 0; i < sheltersNames.length; i++) {
            var sheltersName = sheltersNames[i]; //get shelter name
            //if active, set as the activie shelter
            if (isElementOnScreen(sheltersName)) {
                setActiveshelters(sheltersName);
                break; //exit loop since active shelter found
            }
        }
    };
    
    /**
     * This function takes a case-sensistive string name of the active shelter
     * and sets the activesheltersName varaible to it. It also
     * takes the current map view and flys to the active shelter.
     * @param sheltersName is the case-sensitive string of the active shelter
     * @return void
     */
    function setActiveshelters(sheltersName) {
        if (sheltersName === activesheltersName) return;
    
        map.flyTo(shelters[sheltersName]);
    
        document.getElementById(sheltersName).setAttribute('class', 'active');
        document.getElementById(activesheltersName).setAttribute('class', '');
    
        activesheltersName = sheltersName;
    }
    
    /**
     * This function tests whether or not the current element on
     * screen is active.
     * @param id is the element being tested
     * @return true is the element is active, false otherwise
     */
    function isElementOnScreen(id) {
        var element = document.getElementById(id); 
        var bounds = element.getBoundingClientRect(); 
        return bounds.top < window.innerHeight && bounds.bottom > 0;
    }
    
    function loadPopUps(){
        // add pop up for homeless shelters 
        map.on('click', 'homeless-shelters', function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var address = e.features[0].properties.address;
        var address_no_space = address.replace(/ /gi, '+');
        var name = e.features[0].properties.name;
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML('<div align = "center">' + '<h3>' + name + '</h3>' + '<p> Address: '+ 
            	'<a href = "http://www.google.com/maps/place/' + address_no_space + '/">' + address + '</a>' + '</p>' + '</div>')
            .addTo(map);
     });

        // add popup for foodbank
        map.on('click', 'food-banks', function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var address = e.features[0].properties.Address;
        var address_no_space = address.replace(/ /gi, '+');
        var name = e.features[0].properties.Name;
        var website = e.features[0].properties.Website;
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML('<div align = "center">' + '<h3>' + name + '</h3>' + '<p> Address: '+ '<a href = "http://www.google.com/maps/place/' + address_no_space + '/">' + address + '</a>' + '<br> Website: ' + '<a href = ' + website + '>' + website + '<a/>' + '</p>' + '</div>')
            .addTo(map);
        });

        // change cursor when its at a marker 
        map.on('mouseenter', 'homeless-shelters', function () {map.getCanvas().style.cursor = 'pointer';});
        map.on('mouseenter', 'food-banks', function () {map.getCanvas().style.cursor = 'pointer';});
        // change it back to a pointer when it leaves.
        map.on('mouseleave', 'homeless-shelters', function () {map.getCanvas().style.cursor = '';});
        map.on('mouseleave', 'food-banks', function () {map.getCanvas().style.cursor = '';});

    }
})();

