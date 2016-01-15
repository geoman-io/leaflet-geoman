/**
*
* A Leaflet Plugin For Editing Geometry Layers in Leaflet 1.0
* by Sumit Kumar (@TweetsOfSumit)
* Github Repo: https://github.com/codeofsumit/leaflet.pm
*/

L.PM = L.PM || {
    initialize: function(map) {

        var initLayerGroup = function() {
            this.pm = new L.PM.Edit.LayerGroup(this);
        };
        L.LayerGroup.addInitHook(initLayerGroup);


        var initPolygon = function() {
            this.pm = new L.PM.Edit.Poly(this);
        };
        L.Polygon.addInitHook(initPolygon);

        var newPoly
        var drawPolyButton = {
              'text': '',
              'iconUrl': 'images/myButton.png',
              'onClick': function() {

              },
              'afterClick': function(e) {
                  if(this.toggled()) {
                      newPoly = new L.PM.Draw.Poly(map);
                      newPoly.enable();
                  } else {
                      newPoly.disable();
                  }
              },
              'hideText': true,
              'maxWidth': 30,
              'doToggle': true,
              'toggleStatus': false
        };

        var myButton = new L.Control.PMButton(drawPolyButton).addTo(map);
    },
    Edit: {},
    Draw: {}
};
