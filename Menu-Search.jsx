Tasks=new Mongo.Collection("tasks")

if (Meteor.isClient) {
  var lat,
    lng;
  var menus = [];
  var menus2 = [];
  var searchFilter = [];
  var venue;
  var counter = 0;
  Meteor.startup(function() {
    GoogleMaps.load();
    Mapbox.load({plugins: ['locate']});

    React.render(<App />,document.getElementById('list'));


  });

  //create the map
  Deps.autorun(function() {

    navigator.geolocation.watchPosition(render);

    function render(pos) {
      lat = pos.coords.latitude;
      lng = pos.coords.longitude;
      return yolo();
    }

    //renders the map, only after coordinates have been found
    function yolo() {
      if (Mapbox.loaded()) {

        console.log(lat);
        L.mapbox.accessToken = 'pk.eyJ1IjoiZXJrYW5zZW4xNCIsImEiOiJjaWtkOGxjbzAwMDE5dmZsenh5M3docWVqIn0.t-CPo9LbkqclOeIDHaUzSw';
        var map = L.mapbox.map('map', "mapbox.streets");
        var lc = L.control.locate({follow: true, setView: true, showPopup: true, keepCurrentZoomLevel: true}).addTo(map);
        console.log("THIRD" + lat);
        lc.start();
        map.setView([
          lat, lng
        ], 13);
        // Credit Foursquare for their wonderful data
        map.attributionControl.addAttribution('<a href="https://foursquare.com/">Places data from Foursquare</a>');
        var CLIENT_ID = '2SPUX20KMHVCAOYFLKHQ3HG5VUV0EAQEWLRM4F2JYQRB0ERP';
        var CLIENT_SECRET = '1SUR3C1F43EO3GAWTHODWAN5NIABV0OG1SH0OFGRZ3PILMIW';
        var API_ENDPOINT = 'https://api.foursquare.com/v2/venues/explore' +
        '?client_id=CLIENT_ID' +
        '&client_secret=CLIENT_SECRET' +
        '&v=20130815' +
        '&ll=LATLON' +
        '&radius=50000' +
        '&section=food' +
        '&limit=50' +
        '&callback=?';

        var foursquarePlaces = L.layerGroup().addTo(map);
        // Use jQuery to make an AJAX request to Foursquare to load markers data.
        $.getJSON(API_ENDPOINT.replace('CLIENT_ID', CLIENT_ID).replace('CLIENT_SECRET', CLIENT_SECRET).replace('LATLON', map.getCenter().lat + ',' + map.getCenter().lng), function(result, status) {

          if (status !== 'success')
            return alert('Request to Foursquare failed');

          // Transform each venue result into a marker on the map.
          for (var i = 0; i < result.response.groups.length; i++) {
            for (var j = 0; j < result.response.groups['0'].items.length; j++) {
              venue = {
                percent: '0',
                place: result.response.groups['0'].items[j]
              }
              menus[j] = venue;
            }
            console.log(menus);
            for (var x = 0; x < result.response.groups[i].items.length; x++) {
              var venue = result.response.groups[i].items[x].venue;
              var latlng = L.latLng(venue.location.lat, venue.location.lng);
              var marker = L.marker(latlng, {
                icon: L.mapbox.marker.icon({'marker-color': '#ff0000', 'marker-symbol': 'restaurant', 'marker-size': 'large'})
              }).bindPopup('<strong><a href="https://foursquare.com/v/' + venue.id + '">' + venue.name + '</a></strong>').addTo(foursquarePlaces);
            }
          }

        })

        var venueid = "4b3bf596f964a520437f25e3";
        var API_ENDPOINT = 'https://api.foursquare.com/v2/venues/' + venueid + '/menu?oauth_token=MYMLE5NHKL3YLE2A3U40MKIO0HTKOOR4IGUXFHHO4WKUMXUB&v=20160214';
        //get menus from venues and put into array
        $.getJSON(API_ENDPOINT.replace('CLIENT_ID', CLIENT_ID).replace('CLIENT_SECRET', CLIENT_SECRET), function(result, status) {
          console.log(result);
          console.log(result.response.menu);
          console.log(result.response.menu.menus.items[0].entries.items[0]);

        })

      }
    }
  })

  Template.body.events({
  /*  "submit .new-task": function(event) {
      // Prevent default browser form submit
      event.preventDefault();
      // Get value from form element
      var text = event.target.text.value;
      searchFilter[counter] = text;
      Filters.insert(searchFilter[counter]);
      counter++;
      console.log(searchFilter);
    }*/

  })
};
if (Meteor.isServer) {
  Meteor.startup(function() {
    // code to run on server at startup
  });
}
