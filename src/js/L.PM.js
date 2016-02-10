/**
*
* A Leaflet Plugin For Editing Geometry Layers in Leaflet 1.0
* by Sumit Kumar (@TweetsOfSumit)
* Github Repo: https://github.com/codeofsumit/leaflet.pm
*/

L.PM = L.PM || {
    initialize: function() {

        var initLayerGroup = function() {
            this.pm = new L.PM.Edit.LayerGroup(this);
        };
        L.LayerGroup.addInitHook(initLayerGroup);


        var initPolygon = function() {
            this.pm = new L.PM.Edit.Poly(this);
        };
        L.Polygon.addInitHook(initPolygon);



    },
    addControls: function(map) {

        var drawPolyButton = {
              'iconUrl': 'assets/icons/polygon.png',
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
              'doToggle': true,
              'toggleStatus': false
        };

        var myButton = new L.Control.PMButton(drawPolyButton).addTo(map);

        map.on('pm:create', function() {
            // fire button click to toggle / disable
            myButton._clicked();
        });

        return [myButton];

    },
    Edit: {},
    Draw: {}
};
