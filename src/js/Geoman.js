/* A Leaflet Plugin For Editing Geometry Layers in Leaflet 1.0
 * Copyright (C) Geoman.io and Sumit Kumar - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Sumit Kumar <sumit@geoman.io>, January 2020
 * Twitter: @TweetsOfSumit
 * OSS Repo: https://github.com/geoman-io/leaflet-geoman
 * Get Pro: https://geoman.io
 */

import {
  Canvas,
  Circle,
  CircleMarker,
  DomEvent,
  ImageOverlay,
  LayerGroup,
  LeafletMap,
  Marker,
  Polygon,
  Polyline,
  Rectangle,
} from 'leaflet';

import packageInfo from '../../package.json';

import GeomanMap from './GeomanMap';
import Toolbar from './Toolbar/GeomanToolbar';

import Draw from './Draw/Draw';
import GeomanDrawCircleMarker from './Draw/Draw.CircleMarker';
import GeomanDrawCircle from './Draw/Draw.Circle';
import GeomanDrawPolyline from './Draw/Draw.Polyline';
import GeomanDrawMarker from './Draw/Draw.Marker';
import GeomanDrawPolygon from './Draw/Draw.Polygon';
import GeomanDrawRectangle from './Draw/Draw.Rectangle';
import GeomanCut from './Draw/Draw.Cut';
import GeomanDrawText from './Draw/Draw.Text';

Draw.CircleMarker = GeomanDrawCircleMarker;
Draw.Circle = GeomanDrawCircle;
Draw.Polyline = GeomanDrawPolyline;
Draw.Marker = GeomanDrawMarker;
Draw.Polygon = GeomanDrawPolygon;
Draw.Rectangle = GeomanDrawRectangle;
Draw.Cut = GeomanCut;
Draw.Text = GeomanDrawText;

import Edit from './Edit/Edit';
import GeomanEditCircleMarker from './Edit/Edit.CircleMarker';
import GeomanEditCircle from './Edit/Edit.Circle';
import GeomanEditImageOverlay from './Edit/Edit.ImageOverlay';
import GeomanEditLayerGroup from './Edit/Edit.LayerGroup';
import GeomanEditPolyline from './Edit/Edit.Polyline';
import GeomanEditMarker from './Edit/Edit.Marker';
import GeomanEditPolygon from './Edit/Edit.Polygon';
import GeomanEditRectangle from './Edit/Edit.Rectangle';
import GeomanEditText from './Edit/Edit.Text';

Edit.CircleMarker = GeomanEditCircleMarker;
Edit.Circle = GeomanEditCircle;
Edit.ImageOverlay = GeomanEditImageOverlay;
Edit.LayerGroup = GeomanEditLayerGroup;
Edit.Polyline = GeomanEditPolyline;
Edit.Marker = GeomanEditMarker;
Edit.Polygon = GeomanEditPolygon;
Edit.Rectangle = GeomanEditRectangle;
Edit.Text = GeomanEditText;

import '../css/controls.css';
import '../css/layers.css';

import Matrix from './helpers/Matrix';
import * as helpers from './helpers';

import Utils from './GeomanUtils';

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
      this.geoman = undefined;

      if (Geoman.optIn) {
        if (this.options.geomanIgnore === false) {
          this.geoman = new GeomanMap(this);
        }
      } else if (!this.options.geomanIgnore) {
        this.geoman = new GeomanMap(this);
      }

      if (this.geoman) {
        this.geoman.setGlobalOptions({});
      }
    }

    LeafletMap.addInitHook(initMap);

    function initLayerGroup() {
      this.geoman = undefined;
      if (Geoman.optIn) {
        if (this.options.geomanIgnore === false) {
          this.geoman = new Edit.LayerGroup(this);
        }
      } else if (!this.options.geomanIgnore) {
        this.geoman = new Edit.LayerGroup(this);
      }
    }

    LayerGroup.addInitHook(initLayerGroup);

    function initMarker() {
      this.geoman = undefined;

      if (Geoman.optIn) {
        if (this.options.geomanIgnore === false) {
          if (this.options.textMarker) {
            this.geoman = new Edit.Text(this);
            if (!this.options._textMarkerOverGeoman) {
              this.geoman._initTextMarker();
            }
            delete this.options._textMarkerOverGeoman;
          } else {
            this.geoman = new Edit.Marker(this);
          }
        }
      } else if (!this.options.geomanIgnore) {
        if (this.options.textMarker) {
          this.geoman = new Edit.Text(this);
          if (!this.options._textMarkerOverGeoman) {
            this.geoman._initTextMarker();
          }
          delete this.options._textMarkerOverGeoman;
        } else {
          this.geoman = new Edit.Marker(this);
        }
      }
    }
    Marker.addInitHook(initMarker);

    function initCircleMarker() {
      this.geoman = undefined;

      if (Geoman.optIn) {
        if (this.options.geomanIgnore === false) {
          this.geoman = new Edit.CircleMarker(this);
        }
      } else if (!this.options.geomanIgnore) {
        this.geoman = new Edit.CircleMarker(this);
      }
    }
    CircleMarker.addInitHook(initCircleMarker);

    function initPolyline() {
      this.geoman = undefined;

      if (Geoman.optIn) {
        if (this.options.geomanIgnore === false) {
          this.geoman = new Edit.Polyline(this);
        }
      } else if (!this.options.geomanIgnore) {
        this.geoman = new Edit.Polyline(this);
      }
    }

    Polyline.addInitHook(initPolyline);

    function initPolygon() {
      this.geoman = undefined;

      if (Geoman.optIn) {
        if (this.options.geomanIgnore === false) {
          this.geoman = new Edit.Polygon(this);
        }
      } else if (!this.options.geomanIgnore) {
        this.geoman = new Edit.Polygon(this);
      }
    }

    Polygon.addInitHook(initPolygon);

    function initRectangle() {
      this.geoman = undefined;

      if (Geoman.optIn) {
        if (this.options.geomanIgnore === false) {
          this.geoman = new Edit.Rectangle(this);
        }
      } else if (!this.options.geomanIgnore) {
        this.geoman = new Edit.Rectangle(this);
      }
    }

    Rectangle.addInitHook(initRectangle);

    function initCircle() {
      this.geoman = undefined;

      if (Geoman.optIn) {
        if (this.options.geomanIgnore === false) {
          this.geoman = new Edit.Circle(this);
        }
      } else if (!this.options.geomanIgnore) {
        this.geoman = new Edit.Circle(this);
      }
    }

    Circle.addInitHook(initCircle);

    function initImageOverlay() {
      this.geoman = undefined;

      if (Geoman.optIn) {
        if (this.options.geomanIgnore === false) {
          this.geoman = new Edit.ImageOverlay(this);
        }
      } else if (!this.options.geomanIgnore) {
        this.geoman = new Edit.ImageOverlay(this);
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
    if (layer.geoman) {
      // Geoman is already added to the layer
    } else if (Geoman.optIn && layer.options.geomanIgnore !== false) {
      // Opt-In is true and geomanIgnore is not false
    } else if (layer.options.geomanIgnore) {
      // geomanIgnore is true
    } else if (layer instanceof LeafletMap) {
      layer.geoman = new Geoman.Map(layer);
    } else if (layer instanceof Marker) {
      if (layer.options.textMarker) {
        layer.geoman = new Edit.Text(layer);
        layer.geoman._initTextMarker();
        layer.geoman._createTextMarker(false);
      } else {
        layer.geoman = new Edit.Marker(layer);
      }
    } else if (layer instanceof Circle) {
      layer.geoman = new Edit.Circle(layer);
    } else if (layer instanceof CircleMarker) {
      layer.geoman = new Edit.CircleMarker(layer);
    } else if (layer instanceof Rectangle) {
      layer.geoman = new Edit.Rectangle(layer);
    } else if (layer instanceof Polygon) {
      layer.geoman = new Edit.Polygon(layer);
    } else if (layer instanceof Polyline) {
      layer.geoman = new Edit.Polyline(layer);
    } else if (layer instanceof LayerGroup) {
      layer.geoman = new Edit.LayerGroup(layer);
    } else if (layer instanceof ImageOverlay) {
      layer.geoman = new Edit.ImageOverlay(layer);
    }
  },
};

// initialize leaflet-geoman
// Geoman.initialize();
export default Geoman;
