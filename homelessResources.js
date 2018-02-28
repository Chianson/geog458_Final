// JavaScript File
"use strict";
(function () {
    var map; //mapbox map object
    
    window.onload = function() {
        //Token to allow a request to the mapbox api
        mapboxgl.accessToken = 'pk.eyJ1IjoiY2hpYW5zb24iLCJhIjoiY2pkeXVkM3pwMnZ0bDMydDM5ZTdvMnFrMSJ9.tkK3NgjXaLtmcilvC4RH3Q';
        map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v9', //replace with the style made in class
            center: [-122.3321, 47.5], //centered on King County
            zoom: 9
        });
    }
})();