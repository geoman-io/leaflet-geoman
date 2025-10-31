/* A Leaflet Plugin For Editing Geometry Layers in Leaflet 1.0
 * Copyright (C) Geoman.io and Sumit Kumar - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Sumit Kumar <sumit@geoman.io>, January 2020
 * Twitter: @TweetsOfSumit
 * OSS Repo: https://github.com/geoman-io/leaflet-geoman
 * Get Pro: https://geoman.io
 */

import { Canvas, Circle, CircleMarker, DomEvent, ImageOverlay, LayerGroup, LeafletMap, Marker, Polygon, Polyline, Rectangle, version, Class } from 'leaflet';

import packageInfo from '../../package.json';
import './polyfills';

import GeomanMap from './L.PM.Map';
import Toolbar from './Toolbar/L.PM.Toolbar';

import Draw from './Draw/L.PM.Draw';
import './Draw/L.PM.Draw.CircleMarker';
import './Draw/L.PM.Draw.Circle';
import './Draw/L.PM.Draw.Line';
import './Draw/L.PM.Draw.Marker';
import './Draw/L.PM.Draw.Polygon';
import './Draw/L.PM.Draw.Rectangle';
import './Draw/L.PM.Draw.Cut';
import './Draw/L.PM.Draw.Text';

import Edit from './Edit/L.PM.Edit';
import './Edit/L.PM.Edit.CircleMarker';
import './Edit/L.PM.Edit.Circle';
import './Edit/L.PM.Edit.ImageOverlay';
import './Edit/L.PM.Edit.LayerGroup';
import './Edit/L.PM.Edit.Line';
import './Edit/L.PM.Edit.Marker';
import './Edit/L.PM.Edit.Polygon';
import './Edit/L.PM.Edit.Rectangle';
import './Edit/L.PM.Edit.Text';

import '../css/controls.css';
import '../css/layers.css';

import Matrix from './helpers/Matrix';
import * as helpers from './helpers';

import Utils from './L.PM.Utils';

const Geoman = {
  version: packageInfo.version,
  Map: GeomanMap,
  Toolbar,
  Draw,
  Edit,
  Utils,
  Matrix,
  helpers,
  activeLang: 'en',
  optIn: false,
  initialize(options) {
    this.addInitHooks(options);
  },
  setOptIn(value) {
    this.optIn = !!value;
  },
  addInitHooks() {
    function initMap() {
      this.pm = undefined;

      if (Geoman.optIn) {
        if (this.options.pmIgnore === false) {
          this.pm = new GeomanMap(this);
        }
      } else if (!this.options.pmIgnore) {
        this.pm = new GeomanMap(this);
      }

      if (this.pm) {
        this.pm.setGlobalOptions({});
      }
    }

    LeafletMap.addInitHook(initMap);

    function initLayerGroup() {
      this.pm = undefined;
      if (Geoman.optIn) {
        if (this.options.pmIgnore === false) {
          this.pm = new Edit.LayerGroup(this);
        }
      } else if (!this.options.pmIgnore) {
        this.pm = new Edit.LayerGroup(this);
      }
    }

    LayerGroup.addInitHook(initLayerGroup);

    function initMarker() {
      this.pm = undefined;

      if (Geoman.optIn) {
        if (this.options.pmIgnore === false) {
          if (this.options.textMarker) {
            this.pm = new Edit.Text(this);
            if (!this.options._textMarkerOverPM) {
              this.pm._initTextMarker();
            }
            delete this.options._textMarkerOverPM;
          } else {
            this.pm = new Edit.Marker(this);
          }
        }
      } else if (!this.options.pmIgnore) {
        if (this.options.textMarker) {
          this.pm = new Edit.Text(this);
          if (!this.options._textMarkerOverPM) {
            this.pm._initTextMarker();
          }
          delete this.options._textMarkerOverPM;
        } else {
          this.pm = new Edit.Marker(this);
        }
      }
    }
    Marker.addInitHook(initMarker);

    function initCircleMarker() {
      this.pm = undefined;

      if (Geoman.optIn) {
        if (this.options.pmIgnore === false) {
          this.pm = new Edit.CircleMarker(this);
        }
      } else if (!this.options.pmIgnore) {
        this.pm = new Edit.CircleMarker(this);
      }
    }
    CircleMarker.addInitHook(initCircleMarker);

    function initPolyline() {
      this.pm = undefined;

      if (Geoman.optIn) {
        if (this.options.pmIgnore === false) {
          this.pm = new Edit.Line(this);
        }
      } else if (!this.options.pmIgnore) {
        this.pm = new Edit.Line(this);
      }
    }

    Polyline.addInitHook(initPolyline);

    function initPolygon() {
      this.pm = undefined;

      if (Geoman.optIn) {
        if (this.options.pmIgnore === false) {
          this.pm = new Edit.Polygon(this);
        }
      } else if (!this.options.pmIgnore) {
        this.pm = new Edit.Polygon(this);
      }
    }

    Polygon.addInitHook(initPolygon);

    function initRectangle() {
      this.pm = undefined;

      if (Geoman.optIn) {
        if (this.options.pmIgnore === false) {
          this.pm = new Edit.Rectangle(this);
        }
      } else if (!this.options.pmIgnore) {
        this.pm = new Edit.Rectangle(this);
      }
    }

    Rectangle.addInitHook(initRectangle);

    function initCircle() {
      this.pm = undefined;

      if (Geoman.optIn) {
        if (this.options.pmIgnore === false) {
          this.pm = new Edit.Circle(this);
        }
      } else if (!this.options.pmIgnore) {
        this.pm = new Edit.Circle(this);
      }
    }

    Circle.addInitHook(initCircle);

    function initImageOverlay() {
      this.pm = undefined;

      if (Geoman.optIn) {
        if (this.options.pmIgnore === false) {
          this.pm = new Edit.ImageOverlay(this);
        }
      } else if (!this.options.pmIgnore) {
        this.pm = new Edit.ImageOverlay(this);
      }
    }

    ImageOverlay.addInitHook(initImageOverlay);
  },
  reInitLayer(layer) {
    if (layer instanceof LayerGroup) {
      layer.eachLayer((_layer) => {
        this.reInitLayer(_layer);
      });
    }
    if (layer.pm) {
      // PM is already added to the layer
    } else if (Geoman.optIn && layer.options.pmIgnore !== false) {
      // Opt-In is true and pmIgnore is not false
    } else if (layer.options.pmIgnore) {
      // pmIgnore is true
    } else if (layer instanceof LeafletMap) {
      layer.pm = new Geoman.Map(layer);
    } else if (layer instanceof Marker) {
      if (layer.options.textMarker) {
        layer.pm = new Edit.Text(layer);
        layer.pm._initTextMarker();
        layer.pm._createTextMarker(false);
      } else {
        layer.pm = new Edit.Marker(layer);
      }
    } else if (layer instanceof Circle) {
      layer.pm = new Edit.Circle(layer);
    } else if (layer instanceof CircleMarker) {
      layer.pm = new Edit.CircleMarker(layer);
    } else if (layer instanceof Rectangle) {
      layer.pm = new Edit.Rectangle(layer);
    } else if (layer instanceof Polygon) {
      layer.pm = new Edit.Polygon(layer);
    } else if (layer instanceof Polyline) {
      layer.pm = new Edit.Line(layer);
    } else if (layer instanceof LayerGroup) {
      layer.pm = new Edit.LayerGroup(layer);
    } else if (layer instanceof ImageOverlay) {
      layer.pm = new Edit.ImageOverlay(layer);
    }
  },
};

if (version === '1.7.1') {
  // Canvas Mode: After dragging the map the target layer can't be dragged anymore until it is clicked
  // https://github.com/Leaflet/Leaflet/issues/7775 a fix is already merged for the Leaflet 1.8.0 version
  Canvas.include({
    _onClick(e) {
      const point = this._map.mouseEventToLayerPoint(e);
      let layer;
      let clickedLayer;

      for (let order = this._drawFirst; order; order = order.next) {
        layer = order.layer;
        if (layer.options.interactive && layer._containsPoint(point)) {
          // changing e.type !== 'preclick' to e.type === 'preclick' fix the issue
          if (
            !(e.type === 'click' || e.type === 'preclick') ||
            !this._map._draggableMoved(layer)
          ) {
            clickedLayer = layer;
          }
        }
      }
      if (clickedLayer) {
        DomEvent.fakeStop(e);
        this._fireEvent([clickedLayer], e);
      }
    },
  });
}

// initialize leaflet-geoman
// L.PM.initialize();
export default Geoman;