// JavaScript File
"use strict";
(function () {
    var map; //mapbox map object
    //set's the first active shelter in the scroll box
    var activesheltersName = 'Catholic-Community-Services:Seattle';
    var shelters = { //map of shelters and their location
        'Catholic-Community-Services:Seattle': {
            bearing: 270,
            center: [-122.30156565, 47.6011886],
            zoom: 16,
            pitch: 120,
            duration: 5000
        },
        'Multi-Service-Center:Federal-Way': {
            bearing: 90,
            center: [-122.318042154362, 47.3007686442953],
            zoom: 13,
            pitch: 30,
            duration: 5000
        },
        'YWCA:Renton': {
            bearing: 1,
            center: [-122.203563458549, 47.4814093],
            zoom: 18,
            pitch: 1,
            duration: 1
        },
        'Solid-Ground:North-Seattle': {
            bearing: 1,
            center: [-122.332551801326, 47.69870805],
            zoom: 18,
            pitch: 1,
            duration: 1
        },
        'YMCA-Young-Adult-Services-Drop-in-Center': {
            bearing: 1,
            center: [-122.3303895, 47.6182332],
            zoom: 18,
            pitch: 1,
            duration: 1
        },
        'YouthCare’s-James-W.-Ray-Orion-Center': {
            bearing: 1,
            center: [-122.3303895, 47.6182332],
            zoom: 18,
            pitch: 1,
            duration: 1
        },
        'Peace-for-the-Streets-by-Kids-from-the-Streets': {
            bearing: 1,
            center: [-122.3077338, 47.6155844],
            zoom: 18,
            pitch: 1,
            duration: 1
        },
        'Nexus-Youth-&-Families': {
            bearing: 1,
            center: [-122.218837787879, 47.2995776464646],
            zoom: 18,
            pitch: 1,
            duration: 1
        },
        'Teen-Feed': {
            bearing: 1,
            center: [-122.31273440028, 47.66432385],
            zoom: 18,
            pitch: 1,
            duration: 1
        },
        'University-District-Youth-Center': {
            bearing: 1,
            center: [-122.311670474999, 47.66185935],
            zoom: 18,
            pitch: 1,
            duration: 1
        },
        'Catholic Community Services:Bellevue': {
            bearing: 1,
            center: [-122.192249916315, 47.6114129],
            zoom: 18,
            pitch: 1,
            duration: 1
        },
        'New-Bethlehem-Day-Center:Kirkland': {
            bearing: 1,
            center: [-122.18098627459, 47.6758031],
            zoom: 18,
            pitch: 1,
            duration: 1
        },
        'New-Horizons': {
            bearing: 1,
            center: [-122.349536087159, 47.6171479],
            zoom: 18,
            pitch: 1,
            duration: 1
        },
        'Friends-of-Youth-Redmond': {
            bearing: 1,
            center: [-122.122910653061, 47.6797058163265],
            zoom: 18,
            pitch: 1,
            duration: 1
        },
        'VA-Puget-Sound’s-Community-Housing-and-Outreach-Services': {
            bearing: 1,
            center: [-122.2109979, 47.4810182],
            zoom: 18,
            pitch: 1,
            duration: 1
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
            bearing: 27,
            pitch: 45,
            hash: true
        });
        //waits until map loads before adding features
        map.on("load", function() {
            loadLegend();
            
            //3d building code here///////////////////////
            var layers = map.getStyle().layers;

            var labelLayerId;
            for (var i = 0; i < layers.length; i++) {
                if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
                    labelLayerId = layers[i].id;
                    break;
                }
            }
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
            //////////////////////////////////////////////
        });
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
      	legend.appendChild(item);
    
    	var layers = ['Food Bank', 'Homeless Shelters'];
    	var colors = ['#FF0A0E', '#0986FB'];
        for (var i = 0; i < layers.length; i++) {
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
})();

