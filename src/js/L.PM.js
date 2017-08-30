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
import './Draw/L.PM.Draw.Circle';
import './Draw/L.PM.Draw.Line';
import './Draw/L.PM.Draw.Poly';
import './Draw/L.PM.Draw.Cut';
import './Draw/L.PM.Draw.Marker';

import Edit from './Edit/L.PM.Edit';
import './Edit/L.PM.Edit.Line';
import './Edit/L.PM.Edit.Poly';
import './Edit/L.PM.Edit.Circle';
import './Edit/L.PM.Edit.Marker';
import './Edit/L.PM.Edit.LayerGroup';

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
        function initLayerGroup() {
            this.pm = new L.PM.Edit.LayerGroup(this);
        }

        L.LayerGroup.addInitHook(initLayerGroup);


        function initMarker() {
            if(!this.options.pmIgnore) {
                this.pm = new L.PM.Edit.Marker(this);
            }
        }

        L.Marker.addInitHook(initMarker);


        function initPolygon() {
            if(!this.options.pmIgnore) {
                this.pm = new L.PM.Edit.Poly(this);
            }
        }

        L.Polygon.addInitHook(initPolygon);


        function initPolyline() {
            if(!this.options.pmIgnore) {
                this.pm = new L.PM.Edit.Line(this);
            }
        }

        L.Polyline.addInitHook(initPolyline);


        function initCircle() {
            if(!this.options.pmIgnore) {
                this.pm = new L.PM.Edit.Circle(this);
            }
        }

        L.Circle.addInitHook(initCircle);


        function initMap() {
            if(!this.options.pmIgnore) {
                this.pm = new L.PM.Map(this);
            }
        }

        L.Map.addInitHook(initMap);
    },
};

// initialize leaflet.pm
L.PM.initialize();
