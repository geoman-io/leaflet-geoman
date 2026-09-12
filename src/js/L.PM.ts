// During initialization pm is deliberately absent until opt-in rules allow it.
// The published declarations assume initialization has already completed.
type InitTarget<T> = Omit<T, 'pm'> & { pm?: unknown };
type PMLayer = (L.Layer | L.Map) & { pm?: unknown };

/**
 * Canvas layer order
 */
interface CanvasLayerOrder {
  next?: CanvasLayerOrder;
  layer: {
    options: { interactive?: boolean };
    _containsPoint: (point: L.Point) => boolean;
  };
}

/**
 * Extended Canvas renderer
 */
interface ExtendedCanvas {
  _map: L.Map & {
    mouseEventToLayerPoint: (e: Event) => L.Point;
    _draggableMoved: (layer: object) => boolean;
  };
  _drawFirst?: CanvasLayerOrder;
  _fireEvent: (layers: object[], e: Event) => void;
}

/**
 * Leaflet-Geoman main interface
 */
interface LeafletPM {
  version: string;
  Map: typeof Map;
  Toolbar: typeof Toolbar;
  Draw: typeof Draw;
  Edit: typeof Edit;
  Utils: typeof Utils;
  Matrix: typeof Matrix;
  activeLang: string;
  optIn: boolean;
  initialize: (options?: object) => void;
  setOptIn: (value: boolean) => void;
  addInitHooks: (options?: object) => void;
  reInitLayer: (layer: PMLayer) => void;
}
/* A Leaflet Plugin For Editing Geometry Layers in Leaflet 1.0
 * OSS Repo: https://github.com/geoman-io/leaflet-geoman
 * Get Pro: https://geoman.io
 */

import './polyfills';
import packageInfo from '../../package.json';

import Map from './L.PM.Map';
import Toolbar from './Toolbar/L.PM.Toolbar';

import Draw from './Draw/L.PM.Draw';
import './Draw/L.PM.Draw.Marker';
import './Draw/L.PM.Draw.Line';
import './Draw/L.PM.Draw.Polygon';
import './Draw/L.PM.Draw.Rectangle';
import './Draw/L.PM.Draw.CircleMarker';
import './Draw/L.PM.Draw.Circle';
import './Draw/L.PM.Draw.Cut';
import './Draw/L.PM.Draw.Text';

import Edit from './Edit/L.PM.Edit';
import './Edit/L.PM.Edit.LayerGroup';
import './Edit/L.PM.Edit.Marker';
import './Edit/L.PM.Edit.Line';
import './Edit/L.PM.Edit.Polygon';
import './Edit/L.PM.Edit.Rectangle';
import './Edit/L.PM.Edit.CircleMarker';
import './Edit/L.PM.Edit.Circle';
import './Edit/L.PM.Edit.ImageOverlay';
import './Edit/L.PM.Edit.Text';

import '../css/layers.css';
import '../css/controls.css';

import Matrix from './helpers/Matrix';

import Utils from './L.PM.Utils';

L.PM = L.PM || {
  version: packageInfo.version,
  Map,
  Toolbar,
  Draw,
  Edit,
  Utils,
  Matrix,
  activeLang: 'en',
  optIn: false,
  initialize(this: LeafletPM, options?: object) {
    this.addInitHooks(options);
  },
  setOptIn(this: LeafletPM, value: boolean) {
    this.optIn = !!value;
  },
  addInitHooks(this: LeafletPM) {
    function initMap(this: InitTarget<L.Map>) {
      this.pm = undefined;

      if (L.PM.optIn) {
        if (this.options.pmIgnore === false) {
          this.pm = new L.PM.Map(this as unknown as L.Map);
        }
      } else if (!this.options.pmIgnore) {
        this.pm = new L.PM.Map(this as unknown as L.Map);
      }

      if (this.pm) {
        (this.pm as InstanceType<typeof Map>).setGlobalOptions({});
      }
    }

    L.Map.addInitHook(initMap);

    function initLayerGroup(this: InitTarget<L.LayerGroup>) {
      this.pm = undefined;
      if (L.PM.optIn) {
        if (this.options.pmIgnore === false) {
          this.pm = new L.PM.Edit.LayerGroup(this as unknown as L.LayerGroup);
        }
      } else if (!this.options.pmIgnore) {
        this.pm = new L.PM.Edit.LayerGroup(this as unknown as L.LayerGroup);
      }
    }

    L.LayerGroup.addInitHook(initLayerGroup);

    function initMarker(this: InitTarget<L.Marker>) {
      this.pm = undefined;

      if (L.PM.optIn) {
        if (this.options.pmIgnore === false) {
          if (this.options.textMarker) {
            this.pm = new L.PM.Edit.Text(this as unknown as L.Marker);
            if (!this.options._textMarkerOverPM) {
              (this.pm as InstanceType<typeof Edit.Text>)._initTextMarker();
            }
            delete this.options._textMarkerOverPM;
          } else {
            this.pm = new L.PM.Edit.Marker(this as unknown as L.Marker);
          }
        }
      } else if (!this.options.pmIgnore) {
        if (this.options.textMarker) {
          this.pm = new L.PM.Edit.Text(this as unknown as L.Marker);
          if (!this.options._textMarkerOverPM) {
            (this.pm as InstanceType<typeof Edit.Text>)._initTextMarker();
          }
          delete this.options._textMarkerOverPM;
        } else {
          this.pm = new L.PM.Edit.Marker(this as unknown as L.Marker);
        }
      }
    }
    L.Marker.addInitHook(initMarker);

    function initCircleMarker(this: InitTarget<L.CircleMarker>) {
      this.pm = undefined;

      if (L.PM.optIn) {
        if (this.options.pmIgnore === false) {
          this.pm = new L.PM.Edit.CircleMarker(
            this as unknown as L.CircleMarker
          );
        }
      } else if (!this.options.pmIgnore) {
        this.pm = new L.PM.Edit.CircleMarker(this as unknown as L.CircleMarker);
      }
    }
    L.CircleMarker.addInitHook(initCircleMarker);

    function initPolyline(this: InitTarget<L.Polyline>) {
      this.pm = undefined;

      if (L.PM.optIn) {
        if (this.options.pmIgnore === false) {
          this.pm = new L.PM.Edit.Line(this as unknown as L.Polyline);
        }
      } else if (!this.options.pmIgnore) {
        this.pm = new L.PM.Edit.Line(this as unknown as L.Polyline);
      }
    }

    L.Polyline.addInitHook(initPolyline);

    function initPolygon(this: InitTarget<L.Polygon>) {
      this.pm = undefined;

      if (L.PM.optIn) {
        if (this.options.pmIgnore === false) {
          this.pm = new L.PM.Edit.Polygon(this as unknown as L.Polygon);
        }
      } else if (!this.options.pmIgnore) {
        this.pm = new L.PM.Edit.Polygon(this as unknown as L.Polygon);
      }
    }

    L.Polygon.addInitHook(initPolygon);

    function initRectangle(this: InitTarget<L.Rectangle>) {
      this.pm = undefined;

      if (L.PM.optIn) {
        if (this.options.pmIgnore === false) {
          this.pm = new L.PM.Edit.Rectangle(this as unknown as L.Rectangle);
        }
      } else if (!this.options.pmIgnore) {
        this.pm = new L.PM.Edit.Rectangle(this as unknown as L.Rectangle);
      }
    }

    L.Rectangle.addInitHook(initRectangle);

    function initCircle(this: InitTarget<L.Circle>) {
      this.pm = undefined;

      if (L.PM.optIn) {
        if (this.options.pmIgnore === false) {
          this.pm = new L.PM.Edit.Circle(this as unknown as L.Circle);
        }
      } else if (!this.options.pmIgnore) {
        this.pm = new L.PM.Edit.Circle(this as unknown as L.Circle);
      }
    }

    L.Circle.addInitHook(initCircle);

    function initImageOverlay(this: InitTarget<L.ImageOverlay>) {
      this.pm = undefined;

      if (L.PM.optIn) {
        if (this.options.pmIgnore === false) {
          this.pm = new L.PM.Edit.ImageOverlay(
            this as unknown as L.ImageOverlay
          );
        }
      } else if (!this.options.pmIgnore) {
        this.pm = new L.PM.Edit.ImageOverlay(this as unknown as L.ImageOverlay);
      }
    }

    L.ImageOverlay.addInitHook(initImageOverlay);
  },
  reInitLayer(this: LeafletPM, layer: PMLayer) {
    if (layer instanceof L.LayerGroup) {
      layer.eachLayer((_layer: PMLayer) => {
        this.reInitLayer(_layer);
      });
    }
    if (layer.pm) {
      // PM is already added to the layer
    } else if (L.PM.optIn && layer.options.pmIgnore !== false) {
      // Opt-In is true and pmIgnore is not false
    } else if (layer.options.pmIgnore) {
      // pmIgnore is true
    } else if (layer instanceof L.Map) {
      layer.pm = new L.PM.Map(layer) as unknown as typeof layer.pm;
    } else if (layer instanceof L.Marker) {
      if (layer.options.textMarker) {
        layer.pm = new L.PM.Edit.Text(layer) as unknown as typeof layer.pm;
        layer.pm._initTextMarker();
        layer.pm._createTextMarker(false);
      } else {
        layer.pm = new L.PM.Edit.Marker(layer) as unknown as typeof layer.pm;
      }
    } else if (layer instanceof L.Circle) {
      layer.pm = new L.PM.Edit.Circle(layer) as unknown as typeof layer.pm;
    } else if (layer instanceof L.CircleMarker) {
      layer.pm = new L.PM.Edit.CircleMarker(
        layer
      ) as unknown as typeof layer.pm;
    } else if (layer instanceof L.Rectangle) {
      layer.pm = new L.PM.Edit.Rectangle(layer) as unknown as typeof layer.pm;
    } else if (layer instanceof L.Polygon) {
      layer.pm = new L.PM.Edit.Polygon(layer) as unknown as typeof layer.pm;
    } else if (layer instanceof L.Polyline) {
      layer.pm = new L.PM.Edit.Line(layer) as unknown as typeof layer.pm;
    } else if (layer instanceof L.LayerGroup) {
      layer.pm = new L.PM.Edit.LayerGroup(layer) as unknown as typeof layer.pm;
    } else if (layer instanceof L.ImageOverlay) {
      layer.pm = new L.PM.Edit.ImageOverlay(
        layer
      ) as unknown as typeof layer.pm;
    }
  },
};

if (L.version === '1.7.1') {
  // Canvas Mode: After dragging the map the target layer can't be dragged anymore until it is clicked
  // https://github.com/Leaflet/Leaflet/issues/7775 a fix is already merged for the Leaflet 1.8.0 version
  L.Canvas.include({
    _onClick(this: ExtendedCanvas, e: MouseEvent) {
      const point = this._map.mouseEventToLayerPoint(e);
      let layer: CanvasLayerOrder['layer'] | undefined;
      let clickedLayer: CanvasLayerOrder['layer'] | undefined;

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
        L.DomEvent.fakeStop(e);
        this._fireEvent([clickedLayer], e);
      }
    },
  });
}

// initialize leaflet-geoman
L.PM.initialize();
