var OverlapMixin = {

    _applyPossibleCoordsChanges: function() {

        // after the polygon was dragged and changed it's shape because of unallowed intersecting
        // with another polygon, this function takes the temporarily drawn polygon (during drag) and applies
        // it's coordinates to our main polygon

        if(this._tempPolygon) {

            // get the new coordinates
            var latlngs = this._tempPolygon.getLayers()[0].getLatLngs();

            // reshape our main polygon
            this._poly.setLatLngs(latlngs).redraw();

            // initialize the markers again
            this._initMarkers();
        }

    },

    _drawTemporaryPolygon: function(geoJson) {

        // hide our polygon
        this._poly.setStyle({opacity: 0, fillOpacity: 0});

        // draw a temporary polygon (happens during drag & intersection)
        this._tempPolygon = L.geoJson(geoJson).addTo(this._poly._map).bringToBack();

    },

    _handleOverlap: function() {

        let mainPoly = this._poly;
        let layers = this._layerGroup.getLayers();
        let changed = false;
        let resultingGeoJson = this._poly.toGeoJSON();

        layers
        .filter(layer => !Object.is(layer, mainPoly))
        .map((layer) => {

            let intersect;

            // this needs to be in a try catch block because turf isn't reliable
            // it throws self-intersection errors even if there are none
            try {
                intersect = turf.intersect(resultingGeoJson, layer.toGeoJSON());
            } catch(e) {
                console.warn('Turf Error.');
            }

            if(intersect) {
                resultingGeoJson = turf.difference(resultingGeoJson, layer.toGeoJSON());

                // if the resulting polygon is a MultiPolygon, don't handle it.
                if(resultingGeoJson.geometry.type !== 'MultiPolygon') {
                    changed = true;
                }
            }

        });

        if(this._tempPolygon) {
            this._tempPolygon.remove();
            delete this._tempPolygon;
        }

        if(changed) {
            this._drawTemporaryPolygon(resultingGeoJson);
        } else {
            this._poly.setStyle({opacity: 1, fillOpacity: 0.2});
        }



    }
}
