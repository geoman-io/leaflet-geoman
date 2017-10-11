/**
*
* A Leaflet Plugin For Editing Geometry Layers in Leaflet 1.0
* by Sumit Kumar (@TweetsOfSumit)
* Github Repo: https://github.com/codeofsumit/leaflet.pm
*/

import './polyfills.js';
import { version } from '../../package.json';

import Map from './L.PM.Map';
import Toolbar from './Toolbar/L.PM.Toolbar';

import Draw from './Draw/L.PM.Draw';
import './Draw/L.PM.Draw.Marker';
import './Draw/L.PM.Draw.Line';
import './Draw/L.PM.Draw.Poly';
import './Draw/L.PM.Draw.Rectangle';
import './Draw/L.PM.Draw.Circle';
import './Draw/L.PM.Draw.Cut';

import Edit from './Edit/L.PM.Edit';
import './Edit/L.PM.Edit.LayerGroup';
import './Edit/L.PM.Edit.Marker';
import './Edit/L.PM.Edit.Line';
import './Edit/L.PM.Edit.Poly';
import './Edit/L.PM.Edit.Rectangle';
import './Edit/L.PM.Edit.Circle';

import '../css/layers.css';
import '../css/controls.css';

L.PM = L.PM || {
    Map,
    Toolbar,
    Draw,
    Edit,
    version,
    initialize() {
        this.addInitHooks();
    },
    addInitHooks() {
        function initMap() {
            if (!this.options.pmIgnore) {
                this.pm = new L.PM.Map(this);
            }
        }

        L.Map.addInitHook(initMap);

        function initLayerGroup() {
            this.pm = new L.PM.Edit.LayerGroup(this);
        }

        L.LayerGroup.addInitHook(initLayerGroup);

        function initMarker() {
            if (!this.options.pmIgnore) {
                this.pm = new L.PM.Edit.Marker(this);
            }
        }

        L.Marker.addInitHook(initMarker);

        function initPolyline() {
            if (!this.options.pmIgnore) {
                this.pm = new L.PM.Edit.Line(this);
            }
        }

        L.Polyline.addInitHook(initPolyline);

        function initPolygon() {
            if (!this.options.pmIgnore) {
                this.pm = new L.PM.Edit.Poly(this);
            }
        }

        L.Polygon.addInitHook(initPolygon);

        function initRectangle() {
            if (!this.options.pmIgnore) {
                this.pm = new L.PM.Edit.Rectangle(this);
            }
        }

        L.Rectangle.addInitHook(initRectangle);

        function initCircle() {
            if (!this.options.pmIgnore) {
                this.pm = new L.PM.Edit.Circle(this);
            }
        }

        L.Circle.addInitHook(initCircle);
    },
};

// initialize leaflet.pm
L.PM.initialize();
