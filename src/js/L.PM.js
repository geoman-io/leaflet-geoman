/**
*
* A Leaflet Plugin For Editing Geometry Layers in Leaflet 1.0
* by Sumit Kumar (@TweetsOfSumit)
* Github Repo: https://github.com/codeofsumit/leaflet.pm
*/

L.PM = L.PM || {
    initialize() {
        function initLayerGroup() {
            this.pm = new L.PM.Edit.LayerGroup(this);
        }

        L.LayerGroup.addInitHook(initLayerGroup);


        function initPolygon() {
            this.pm = new L.PM.Edit.Poly(this);
        }

        L.Polygon.addInitHook(initPolygon);


        function initPolyline() {
            this.pm = new L.PM.Edit.Line(this);
        }

        L.Polyline.addInitHook(initPolyline);


        function initMap() {
            this.pm = new L.PM.Map(this);
        }

        L.Map.addInitHook(initMap);
    },
};

// initialize leaflet.pm
L.PM.initialize();
