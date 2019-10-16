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

const useTypes = {
  ALL_LEAFLET_LAYERS: 'ALL_LEAFLET_LAYERS',
  GEOMAN_LAYERS_ONLY: 'GEOMAN_LAYERS_ONLY',
};

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
  addInitHooks(options) {
    // eslint-disable-next-line func-names
    L.Map.addInitHook(function() {
      this.pm = new L.PM.Map(this);
    });

    if (options.useType === useTypes.GEOMAN_LAYERS_ONLY) {
      return;
    }

    // eslint-disable-next-line func-names
    L.LayerGroup.addInitHook(function() {
      this.pm = new L.PM.Edit.LayerGroup(this);
    });

    // eslint-disable-next-line func-names
    L.Marker.addInitHook(function() {
      this.pm = new L.PM.Edit.Marker(this);
    });

    // eslint-disable-next-line func-names
    L.CircleMarker.addInitHook(function() {
      this.pm = new L.PM.Edit.CircleMarker(this);
    });

    // eslint-disable-next-line func-names
    L.Polyline.addInitHook(function() {
      this.pm = new L.PM.Edit.Line(this);
    });

    // eslint-disable-next-line func-names
    L.Polygon.addInitHook(function() {
      this.pm = new L.PM.Edit.Polygon(this);
    });

    // eslint-disable-next-line func-names
    L.Rectangle.addInitHook(function() {
      this.pm = new L.PM.Edit.Rectangle(this);
    });

    // eslint-disable-next-line func-names
    L.Circle.addInitHook(function() {
      this.pm = new L.PM.Edit.Circle(this);
    });
  },
};
