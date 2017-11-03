var styles = [
          {
            elementType: 'geometry',
            stylers: [{color: '#f5f5f5'}]
          },
          {
            elementType: 'labels.icon',
            stylers: [{visibility: 'off'}]
          },
          {
            elementType: 'labels.text.fill',
            stylers: [{color: '#616161'}]
          },
          {
            elementType: 'labels.text.stroke',
            stylers: [{color: '#f5f5f5'}]
          },
          {
            featureType: 'administrative.land_parcel',
            elementType: 'labels.text.fill',
            stylers: [{color: '#bdbdbd'}]
          },
          {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [{color: '#eeeeee'}]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: '#757575'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{color: '#e5e5e5'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9e9e9e'}]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#ffffff'}]
          },
          {
            featureType: 'road.arterial',
            elementType: 'labels.text.fill',
            stylers: [{color: '#757575'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#dadada'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{color: '#616161'}]
          },
          {
            featureType: 'road.local',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9e9e9e'}]
          },
          {
            featureType: 'transit.line',
            elementType: 'geometry',
            stylers: [{color: '#e5e5e5'}]
          },
          {
            featureType: 'transit.station',
            elementType: 'geometry',
            stylers: [{color: '#eeeeee'}]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{color: '#c9c9c9'}]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9e9e9e'}]
          }
        ];
        
var local = 'rua cincinato braga, 10 - sao paulo';
var image = '/images/google-location-icon-p.png'
var map;

function initMap() {
	
  console.log('initMap');

	var ponto;
  var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + local + "&key=AIzaSyDH_OlEmgC4e5vZ4a9X8rRugVVs1sczCSg";

	var xhr = new XMLHttpRequest();

	xhr.open("get", url , true);
	
	xhr.onreadystatechange = function(res) {

    if (this.readyState == 4 ) {

      
    	var res = JSON.parse(this.response);
    	ponto = res.results[0].geometry.location;


    	map = new google.maps.Map($('.mapa')[0], {
          center: ponto,
          zoom: 17,
          styles: styles,
          disableDefaultUI: true
        });

        var marker = new google.maps.Marker({
          position: ponto,
          map: map,
          animation: google.maps.Animation.DROP,
          icon: image
        });
    }
  };

	xhr.send();

}