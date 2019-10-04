/**
 *
 * A Leaflet Plugin For Editing Geometry Layers in Leaflet 1.0
 * by Sumit Kumar (@TweetsOfSumit)
 * Github Repo: https://github.com/geoman-io/leaflet-geoman
 */

import './polyfills';
import { version } from '../../package.json';

import Map from './L.PM.Map';
import Toolbar from './Toolbar/L.PM.Toolbar';

import Draw from './Draw/L.PM.Draw';
import './Draw/L.PM.Draw.Marker';
import './Draw/L.PM.Draw.Line';
import './Draw/L.PM.Draw.Polygon';
import './Draw/L.PM.Draw.Rectangle';
import './Draw/L.PM.Draw.Circle';
import './Draw/L.PM.Draw.CircleMarker';
import './Draw/L.PM.Draw.Cut';

import Edit from './Edit/L.PM.Edit';
import './Edit/L.PM.Edit.LayerGroup';
import './Edit/L.PM.Edit.Marker';
import './Edit/L.PM.Edit.Line';
import './Edit/L.PM.Edit.Polygon';
import './Edit/L.PM.Edit.Rectangle';
import './Edit/L.PM.Edit.Circle';
import './Edit/L.PM.Edit.CircleMarker';

import '../css/layers.css';
import '../css/controls.css';

L.PM = L.PM || {
  version,
  Map,
  Toolbar,
  Draw,
  Edit,
  activeLang: 'en',
  initialize(options) {
    this.addInitHooks(options);
  },
  addInitHooks(options = {}) {

    function initMap() {
      this.pm = undefined;

      if (options.optIn) {
        if (this.options.pmIgnore === false) {
          this.pm = new L.PM.Map(this);
        }
      } else if (!this.options.pmIgnore) {
        this.pm = new L.PM.Map(this);
      }
    }

    L.Map.addInitHook(initMap);

    function initLayerGroup() {
      // doesn't need pmIgnore condition as the init hook of the individual layers will check it
      this.pm = new L.PM.Edit.LayerGroup(this);
    }

    L.LayerGroup.addInitHook(initLayerGroup);

    function initMarker() {
      this.pm = undefined;

      if (options.optIn) {
        if (this.options.pmIgnore === false) {
          this.pm = new L.PM.Edit.Marker(this);
        }
      } else if (!this.options.pmIgnore) {
        this.pm = new L.PM.Edit.Marker(this);
      }
    }

    L.Marker.addInitHook(initMarker);

    function initCircleMarker() {
      this.pm = undefined;

      if (options.optIn) {
        if (this.options.pmIgnore === false) {
          this.pm = new L.PM.Edit.CircleMarker(this);
        }
      } else if (!this.options.pmIgnore) {
        this.pm = new L.PM.Edit.CircleMarker(this);
      }
    }
    L.CircleMarker.addInitHook(initCircleMarker);


    function initPolyline() {
      this.pm = undefined;

      if (options.optIn) {
        if (this.options.pmIgnore === false) {
          this.pm = new L.PM.Edit.Line(this);
        }
      } else if (!this.options.pmIgnore) {
        this.pm = new L.PM.Edit.Line(this);
      }
    }

    L.Polyline.addInitHook(initPolyline);

    function initPolygon() {
      this.pm = undefined;

      if (options.optIn) {
        if (this.options.pmIgnore === false) {
          this.pm = new L.PM.Edit.Polygon(this);
        }
      } else if (!this.options.pmIgnore) {
        this.pm = new L.PM.Edit.Polygon(this);
      }

    }

    L.Polygon.addInitHook(initPolygon);

    function initRectangle() {
      this.pm = undefined;

      if (options.optIn) {
        if (this.options.pmIgnore === false) {
          this.pm = new L.PM.Edit.Rectangle(this);
        }
      } else if (!this.options.pmIgnore) {
        this.pm = new L.PM.Edit.Rectangle(this);
      }
    }

    L.Rectangle.addInitHook(initRectangle);

    function initCircle() {
      this.pm = undefined;

      if (options.optIn) {
        if (this.options.pmIgnore === false) {
          this.pm = new L.PM.Edit.Circle(this);
        }
      } else if (!this.options.pmIgnore) {
        this.pm = new L.PM.Edit.Circle(this);
      }
    }

    L.Circle.addInitHook(initCircle);
  },
};

// initialize leaflet-geoman
L.PM.initialize();
