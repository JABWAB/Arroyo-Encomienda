// See post: http://asmaloney.com/2014/01/code/creating-an-interactive-map-with-leaflet-and-openstreetmap/

var bounds = L.latLngBounds([41.60, -4.82], [41.65, -4.75]);

var map = L.map( 'map', {
    center: [41.6261, -4.7734],
    minZoom: 1,
    zoom: 14,
    zoomControl: true,
    maxBounds: bounds
});

var fsControl = L.control.fullscreen();
map.addControl(fsControl);

L.marker([41.6261, -4.7734]).addTo(map);

L.tileLayer( 'http://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'OpenStreetMap',
}).addTo( map );


var geojsonMarkerOptions = {
    radius: 5,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

var capaCities = L.geoJson(geodata, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
    }
}).addTo(map);

var capaHuellaLden =L.geoJson(huellalden);

    function getColor(d) {
        return d > 74 ? '#be054f':
                d > 69 ? '#d80000':
                d > 64 ? '#ef7619':
                d > 59 ? '#efe819':
                d > 54 ? '#02ce4d':
            '#FFEDA0';
    };

    function style(feature) {
        return{
		fillColor: getColor(feature.properties.DB_LO),
		weight: 0.1,
		opacity: 0.1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.9
};
}

L.geoJson(huellalden, {style: style}).addTo(map);



var capaOSM = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

var capaGoogleMaps = L.tileLayer('https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}').addTo(map);
	var capaGoogleEarth = L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}').addTo(map);

L.control.scale().addTo(map);
	
	var capasBase = {

	"Open Street Map": capaOSM,
	"Google Maps": capaGoogleMaps,
	"Google Earth": capaGoogleEarth,
    "Ciudades": capaCities,
    "Huella Lden": capaHuellaLden,
	};
	L.control.layers(capasBase).addTo(map);

	L.marker([41.6261, -4.7734],{draggable: true}).addTo(map);