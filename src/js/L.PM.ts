/* A Leaflet Plugin For Editing Geometry Layers in Leaflet 1.0
 * Copyright (C) Geoman.io and Sumit Kumar - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Sumit Kumar <sumit@geoman.io>, January 2020
 * Twitter: @TweetsOfSumit
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

// Type declarations for extended Leaflet
declare const L: typeof import('leaflet') & {
  PM: LeafletPM;
  Map: typeof import('leaflet').Map & {
    addInitHook: (fn: () => void) => void;
  };
  LayerGroup: typeof import('leaflet').LayerGroup & {
    addInitHook: (fn: () => void) => void;
  };
  Marker: typeof import('leaflet').Marker & {
    addInitHook: (fn: () => void) => void;
  };
  CircleMarker: typeof import('leaflet').CircleMarker & {
    addInitHook: (fn: () => void) => void;
  };
  Polyline: typeof import('leaflet').Polyline & {
    addInitHook: (fn: () => void) => void;
  };
  Polygon: typeof import('leaflet').Polygon & {
    addInitHook: (fn: () => void) => void;
  };
  Rectangle: typeof import('leaflet').Rectangle & {
    addInitHook: (fn: () => void) => void;
  };
  Circle: typeof import('leaflet').Circle & {
    addInitHook: (fn: () => void) => void;
  };
  ImageOverlay: typeof import('leaflet').ImageOverlay & {
    addInitHook: (fn: () => void) => void;
  };
  Canvas: {
    include: (props: object) => void;
  };
  DomEvent: {
    fakeStop: (e: Event) => void;
  };
  version: string;
};

/**
 * Layer with PM options - use unknown for pm to avoid strict type issues
 */
interface PMLayer extends L.Layer {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pm?: any;
  options: L.LayerOptions & {
    pmIgnore?: boolean;
    textMarker?: boolean;
    _textMarkerOverPM?: boolean;
  };
  eachLayer?: (callback: (layer: PMLayer) => void) => void;
}

/**
 * PM Edit interface
 */
interface PMEdit {
  _initTextMarker?: () => void;
  _createTextMarker?: (focus: boolean) => void;
  setGlobalOptions?: (options: object) => void;
}

/**
 * Extended Map type - use any for pm to avoid strict type issues
 */
type ExtendedMap = L.Map & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pm?: any;
  options: L.MapOptions & {
    pmIgnore?: boolean;
  };
};

/**
 * PM Map instance
 */
interface PMMapInstance {
  setGlobalOptions: (options: object) => void;
}

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
 * Edit classes
 */
interface EditClasses {
  LayerGroup: new (layer: L.Layer) => PMEdit;
  Text: new (layer: L.Layer) => PMEdit;
  Marker: new (layer: L.Layer) => PMEdit;
  CircleMarker: new (layer: L.Layer) => PMEdit;
  Line: new (layer: L.Layer) => PMEdit;
  Polygon: new (layer: L.Layer) => PMEdit;
  Rectangle: new (layer: L.Layer) => PMEdit;
  Circle: new (layer: L.Layer) => PMEdit;
  ImageOverlay: new (layer: L.Layer) => PMEdit;
}

/**
 * Leaflet-Geoman main interface
 */
interface LeafletPM {
  version: string;
  Map: typeof Map;
  Toolbar: typeof Toolbar;
  Draw: typeof Draw;
  Edit: typeof Edit & EditClasses;
  Utils: typeof Utils;
  Matrix: typeof Matrix;
  activeLang: string;
  optIn: boolean;
  initialize: (options?: object) => void;
  setOptIn: (value: boolean) => void;
  addInitHooks: () => void;
  reInitLayer: (layer: PMLayer) => void;
}

L.PM = L.PM || {
  version: packageInfo.version,
  Map,
  Toolbar,
  Draw,
  Edit: Edit as typeof Edit & EditClasses,
  Utils,
  Matrix,
  activeLang: 'en',
  optIn: false,
  initialize(this: LeafletPM, _options?: object) {
    this.addInitHooks();
  },
  setOptIn(this: LeafletPM, value: boolean) {
    this.optIn = !!value;
  },
  addInitHooks(this: LeafletPM) {
    function initMap(this: ExtendedMap) {
      this.pm = undefined;

      if (L.PM.optIn) {
        if (this.options.pmIgnore === false) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          this.pm = new (L.PM.Map as any)(this);
        }
      } else if (!this.options.pmIgnore) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.pm = new (L.PM.Map as any)(this);
      }

      if (this.pm) {
        this.pm.setGlobalOptions({});
      }
    }

    L.Map.addInitHook(initMap as () => void);

    function initLayerGroup(this: PMLayer) {
      this.pm = undefined;
      if (L.PM.optIn) {
        if (this.options.pmIgnore === false) {
          this.pm = new L.PM.Edit.LayerGroup(this as unknown as L.Layer);
        }
      } else if (!this.options.pmIgnore) {
        this.pm = new L.PM.Edit.LayerGroup(this as unknown as L.Layer);
      }
    }

    L.LayerGroup.addInitHook(initLayerGroup as () => void);

    function initMarker(this: PMLayer) {
      this.pm = undefined;

      if (L.PM.optIn) {
        if (this.options.pmIgnore === false) {
          if (this.options.textMarker) {
            this.pm = new L.PM.Edit.Text(this as unknown as L.Layer);
            if (!this.options._textMarkerOverPM) {
              this.pm._initTextMarker?.();
            }
            delete this.options._textMarkerOverPM;
          } else {
            this.pm = new L.PM.Edit.Marker(this as unknown as L.Layer);
          }
        }
      } else if (!this.options.pmIgnore) {
        if (this.options.textMarker) {
          this.pm = new L.PM.Edit.Text(this as unknown as L.Layer);
          if (!this.options._textMarkerOverPM) {
            this.pm._initTextMarker?.();
          }
          delete this.options._textMarkerOverPM;
        } else {
          this.pm = new L.PM.Edit.Marker(this as unknown as L.Layer);
        }
      }
    }
    L.Marker.addInitHook(initMarker as () => void);

    function initCircleMarker(this: PMLayer) {
      this.pm = undefined;

      if (L.PM.optIn) {
        if (this.options.pmIgnore === false) {
          this.pm = new L.PM.Edit.CircleMarker(this as unknown as L.Layer);
        }
      } else if (!this.options.pmIgnore) {
        this.pm = new L.PM.Edit.CircleMarker(this as unknown as L.Layer);
      }
    }
    L.CircleMarker.addInitHook(initCircleMarker as () => void);

    function initPolyline(this: PMLayer) {
      this.pm = undefined;

      if (L.PM.optIn) {
        if (this.options.pmIgnore === false) {
          this.pm = new L.PM.Edit.Line(this as unknown as L.Layer);
        }
      } else if (!this.options.pmIgnore) {
        this.pm = new L.PM.Edit.Line(this as unknown as L.Layer);
      }
    }

    L.Polyline.addInitHook(initPolyline as () => void);

    function initPolygon(this: PMLayer) {
      this.pm = undefined;

      if (L.PM.optIn) {
        if (this.options.pmIgnore === false) {
          this.pm = new L.PM.Edit.Polygon(this as unknown as L.Layer);
        }
      } else if (!this.options.pmIgnore) {
        this.pm = new L.PM.Edit.Polygon(this as unknown as L.Layer);
      }
    }

    L.Polygon.addInitHook(initPolygon as () => void);

    function initRectangle(this: PMLayer) {
      this.pm = undefined;

      if (L.PM.optIn) {
        if (this.options.pmIgnore === false) {
          this.pm = new L.PM.Edit.Rectangle(this as unknown as L.Layer);
        }
      } else if (!this.options.pmIgnore) {
        this.pm = new L.PM.Edit.Rectangle(this as unknown as L.Layer);
      }
    }

    L.Rectangle.addInitHook(initRectangle as () => void);

    function initCircle(this: PMLayer) {
      this.pm = undefined;

      if (L.PM.optIn) {
        if (this.options.pmIgnore === false) {
          this.pm = new L.PM.Edit.Circle(this as unknown as L.Layer);
        }
      } else if (!this.options.pmIgnore) {
        this.pm = new L.PM.Edit.Circle(this as unknown as L.Layer);
      }
    }

    L.Circle.addInitHook(initCircle as () => void);

    function initImageOverlay(this: PMLayer) {
      this.pm = undefined;

      if (L.PM.optIn) {
        if (this.options.pmIgnore === false) {
          this.pm = new L.PM.Edit.ImageOverlay(this as unknown as L.Layer);
        }
      } else if (!this.options.pmIgnore) {
        this.pm = new L.PM.Edit.ImageOverlay(this as unknown as L.Layer);
      }
    }

    L.ImageOverlay.addInitHook(initImageOverlay as () => void);
  },
  reInitLayer(this: LeafletPM, layer: PMLayer) {
    if (layer instanceof L.LayerGroup) {
      layer.eachLayer?.((_layer: PMLayer) => {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (layer as ExtendedMap).pm = new (L.PM.Map as any)(layer);
    } else if (layer instanceof L.Marker) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const markerLayer = layer as any;
      if (layer.options.textMarker) {
        markerLayer.pm = new L.PM.Edit.Text(layer);
        markerLayer.pm?._initTextMarker?.();
        markerLayer.pm?._createTextMarker?.(false);
      } else {
        markerLayer.pm = new L.PM.Edit.Marker(layer);
      }
    } else if (layer instanceof L.Circle) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (layer as any).pm = new L.PM.Edit.Circle(layer);
    } else if (layer instanceof L.CircleMarker) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (layer as any).pm = new L.PM.Edit.CircleMarker(layer);
    } else if (layer instanceof L.Rectangle) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (layer as any).pm = new L.PM.Edit.Rectangle(layer);
    } else if (layer instanceof L.Polygon) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (layer as any).pm = new L.PM.Edit.Polygon(layer);
    } else if (layer instanceof L.Polyline) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (layer as any).pm = new L.PM.Edit.Line(layer);
    } else if (layer instanceof L.LayerGroup) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (layer as any).pm = new L.PM.Edit.LayerGroup(layer);
    } else if (layer instanceof L.ImageOverlay) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (layer as any).pm = new L.PM.Edit.ImageOverlay(layer);
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
