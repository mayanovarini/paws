function initMap() {

  $('#animated-text').hide();
  var sf = {lat: 37.759621, lng: -122.4290925};
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat:37.776259, lng:-122.432758},
    zoom: 14
  });

  var park_request = {
    location: sf,
    radius: '10000',
    query: 'park'
  };

  var service = new google.maps.places.PlacesService(map);
  service.textSearch(park_request, callback);

  // autocomplete search function
  var placeInput = document.getElementById('place-input');
  var autocomplete = new google.maps.places.Autocomplete(placeInput);
  autocomplete.bindTo('bounds', map);
  autocomplete.addListener('place_changed', function() {
    var place = autocomplete.getPlace();
  });

  // geolocate users and attach user-icons
  var image_user = "https://s26.postimg.org/jipu86irt/girl.png";
  var infoWindow = new google.maps.InfoWindow;

  //  HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Maya is here.');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  }

  function createMarker(place) {
    var infoWindow = new google.maps.InfoWindow;

    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      animation:google.maps.Animation.BOUNCE,
      icon: "https://s26.postimg.org/6zqv8ms95/Webp.net-resizeimage_1.png",
      map: map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.setContent(place.name);
      infoWindow.open(map, this);
    });
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }


} // map init close tag


