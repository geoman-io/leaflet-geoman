/**
*
* A Leaflet Plugin For Editing Geometry Layers in Leaflet 1.0
* by Sumit Kumar (@TweetsOfSumit)
* Github Repo: https://github.com/codeofsumit/leaflet.pm
*/

L.PM = L.PM || {
    initialize: function(map) {

        var initLayerGroup = function() {
            this.pm = new L.PM.LayerGroup(this);
        };
        L.LayerGroup.addInitHook(initLayerGroup);


        var initPolygon = function() {
            this.pm = new L.PM.Poly(this);
        };
        L.Polygon.addInitHook(initPolygon);


        var myButtonOptions = {
              'text': '',  // string
              'iconUrl': 'images/myButton.png',  // string
              'onClick': function() {

              },  // callback function
              'hideText': true,  // bool
              'maxWidth': 30,  // number
              'doToggle': true,  // bool
              'toggleStatus': false  // bool
        };

        var myButton = new L.Control.PMButton(myButtonOptions).addTo(map);
    }
};
