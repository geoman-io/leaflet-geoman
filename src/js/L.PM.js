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
    enableDraw: function(options) {

        L.PM.Draw.Poly.enable(options.map);

    },
    disableDraw: function(map) {

        if(map.disableDraw) {
            map.disableDraw();
        }

    },
    addControls: function(map) {

        var drawPolyButton = {
              'iconUrl': 'assets/icons/polygon.png',
              'onClick': function() {

              },
              'afterClick': function(e) {

                  if(this.toggled()) {
                      L.PM.enableDraw({
                          map: map
                      });
                  } else {
                      L.PM.disableDraw(map);
                  }
              },
              'doToggle': true,
              'toggleStatus': false
        };

        var myButton = new L.Control.PMButton(drawPolyButton).addTo(map);

        map.on('pm:drawstart', function() {
            if(!myButton.toggled()) {
                myButton._clicked();
            }
        });

        map.on('pm:drawend', function() {
            if(myButton.toggled()) {
                myButton._clicked();
            }
        });

        return [myButton];

    },
    Edit: {},
    Draw: {}
};
