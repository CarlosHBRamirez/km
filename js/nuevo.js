// This example displays an address form, using the autocomplete feature
// of the Google Places API to help users fill in the information.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var placeSearch, originautocomplete;
var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
};

function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    originautocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */
        (document.getElementById('originautocomplete')), {
            types: ['geocode']
        });
    // Set initial restrict to the greater list of countries.
    originautocomplete.setComponentRestrictions({
        'country': ['mx']
    });

    destinationautocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('destinationautocomplete')), {
            types: ['geocode']
        });

    destinationautocomplete.setComponentRestrictions({
        'country': ['mx']
    });
}


// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
        });
    }
}

function CalculatedRecommededDistance() {
    CalculateDistanceforAllAlternativeRoutes();

    var origin = document.getElementById('originautocomplete').value;
    var destination = document.getElementById('destinationautocomplete').value;

    var geocoder = new google.maps.Geocoder();
    var service = new google.maps.DistanceMatrixService();

    service.getDistanceMatrix({
        origins: [origin],
        destinations: [destination],
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false,
        avoidFerries: false

    }, function (response, status) {
        var originList = response.originAddresses;
        var destinationList = response.destinationAddresses;
        var output = document.getElementById('outputRecommended');
        
        output.innerHTML = '';
        //Display distance recommended value
        for (var i = 0; i < originList.length; i++) {
            var results = response.rows[i].elements;
            for (var j = 0; j < results.length; j++) {
                output.innerHTML += originList[i] + ' to ' + destinationList[j] +
                ': ' + results[j].distance.text + ' in ' +
                results[j].duration.text + '<br>';
        }
    }       
    });
}
function CalculateDistanceforAllAlternativeRoutes() {
    var directionsService = new google.maps.DirectionsService();
    var start = document.getElementById('originautocomplete').value;
    var end = document.getElementById('destinationautocomplete').value;
    var method = 'DRIVING';
    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.DirectionsTravelMode[method],
        provideRouteAlternatives: true,
        unitSystem: google.maps.UnitSystem.METRIC,
        optimizeWaypoints: true
    };
    directionsService.route(request, function (response, status) {
        var routes = response.routes;
        var distances = [];
        for (var i = 0; i < routes.length; i++) {

            var distance = 0;
            for (j = 0; j < routes[i].legs.length; j++) {
                distance = parseInt(routes[i].legs[j].distance.value) + parseInt(distance);
                //for each 'leg'(route between two waypoints) we get the distance and add it to 
            }
            //Convert into kilometer
            distances.push(distance / 1000);
        }
        //Get all the alternative distances
        var maxDistance = distances.sort(function (a, b) {
            return a - b;
        });
        //Display distance having highest value.
       
        var outputcostoDiv = document.getElementById('outputcosto');
        var output = document.getElementById('output');
        output.innerHTML = maxDistance[routes.length - 2] + " KM";

               if(maxDistance[routes.length - 2] == 'undefined' && maxDistance[routes.length - 3] <= 0.499){
            outputcostoDiv.innerHTML = '$25';
        } else if (maxDistance[routes.length - 2] >= 0.500 && maxDistance[routes.length - 3] <= 0.999) {
            outputcostoDiv.innerHTML = '$30';
        } else if (maxDistance[routes.length - 2] >= 1.0 && maxDistance[routes.length - 3] <= 2.9) {
            outputcostoDiv.innerHTML = '$35';
        } else if (maxDistance[routes.length - 2] >= 3.0 && maxDistance[routes.length - 3] <= 4.9) {
            outputcostoDiv.innerHTML = '$40';
        } else if (maxDistance[routes.length - 2] >= 5.0 && maxDistance[routes.length - 2] <= 6.9) {
            outputcostoDiv.innerHTML = '$45';
        } else if (maxDistance[routes.length - 2] >= 7.0 && maxDistance[routes.length - 2] <= 8.9) {
            outputcostoDiv.innerHTML = '$50';
        } else if (maxDistance[routes.length - 2] >= 9.0 && maxDistance[routes.length - 2] <= 10.9) {
            outputcostoDiv.innerHTML = '$55';
        } else if (maxDistance[routes.length - 2] >= 11.0 && maxDistance[routes.length - 2] <= 12.9) {
            outputcostoDiv.innerHTML = '$60';
        } else if (maxDistance[routes.length - 2] >= 13.0 && maxDistance[routes.length - 2] <= 14.9) {
            outputcostoDiv.innerHTML = '$65';
        } else if (maxDistance[routes.length - 2] >= 15.0 && maxDistance[routes.length - 2] <= 16.9) {
            outputcostoDiv.innerHTML = '$70';
        } else if (maxDistance[routes.length - 2] >= 17.0 && maxDistance[routes.length - 2] <= 18.9) {
            outputcostoDiv.innerHTML = '$75';
        } else if (maxDistance[routes.length - 2] >= 19.0 && maxDistance[routes.length - 2] <= 20.9) {
            outputcostoDiv.innerHTML = '$80';
        } else if (maxDistance[routes.length - 2] >= 21.0 && maxDistance[routes.length - 2] <= 22.9) {
            outputcostoDiv.innerHTML = '$85';
        } else if (maxDistance[routes.length - 2] >= 23.0 && maxDistance[routes.length - 2] <= 24.9) {
            outputcostoDiv.innerHTML = '$90';
        } else if (maxDistance[routes.length - 2] >= 25.0 && maxDistance[routes.length - 2] <= 26.9) {
            outputcostoDiv.innerHTML = '$95';
        } else if (maxDistance[routes.length - 2] >= 27.0 && maxDistance[routes.length - 2] <= 27.9) {
            outputcostoDiv.innerHTML = '$100';
        } else if (maxDistance[routes.length - 2] >= 28.0) {
            outputcostoDiv.innerHTML = 'Libre';
        } else {
            outputcostoDiv.innerHTML = "$0";
        }
    });
}