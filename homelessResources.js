// JavaScript File

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
	var images = ["url('https://github.com/Chianson/geog458_Final/blob/master/data/icon/food_icon.svg')", 
					"url('https://github.com/Chianson/geog458_Final/blob/master/data/icon/shelter_icon.svg')"];
    for (i = 0; i < layers.length; i++) {
      var layer = layers[i];
      var image = images[i];
      var item = document.createElement('div');
      var key = document.createElement('span');
      key.className = 'legend-key';
      key.style.backgroundImage = image;
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


