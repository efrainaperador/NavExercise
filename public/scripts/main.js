//General JSON loader <br/>
//<strong>@callback</strong>: function to be called when the method is complete<br/>
//<strong>@url</strong>: URL of the JSON file to be loaded<br/>
//<strong>@context</strong>: Javascript context for the callback(default context is window object)<br/>

function loadJSON(callback, url, context) {
	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	xobj.open('GET', url, true); // Replace 'my_data' with the path to your file
	xobj.onreadystatechange = function () {
		if (xobj.readyState == 4 && xobj.status == "200") {
			callback.call(context, JSON.parse(xobj.responseText));
		}
	};
	xobj.send(null);  
};

// Determines if the actual device is mobile based on the screen resolution

function isMobile(){
	var width = window.innerWidth;
	if(width <= 768){
		return true;
	}
	return false;
}

// Initialize the page events

function init(config){
	App.initialize(config);
};

// Document ready, load json with the configuration
(function(){
	loadJSON(init, 'config.json', this);
})();