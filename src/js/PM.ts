import * as L from 'leaflet';
// During initialization pm is deliberately absent until opt-in rules allow it.
// The published declarations assume initialization has already completed.
type InitTarget<T> = Omit<T, 'pm'> & { pm?: unknown };
type PMLayer = (L.Layer | L.Map) & { pm?: unknown };

/**
 * Leaflet-Geoman main interface
 */
interface LeafletPM {
  version: string;
  Map: typeof Map;
  Toolbar: typeof Toolbar;
  Draw: typeof Draw;
  DrawTool: typeof DrawTool;
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
import packageInfo from '../../package.json';
import Map from './L.PM.Map';
import Toolbar from './Toolbar/L.PM.Toolbar';
import Draw from './Draw/L.PM.Draw';
import DrawTool from './Draw/L.PM.DrawTool';
import Edit from './Edit/L.PM.Edit';
import Matrix from './helpers/Matrix';
import Utils from './L.PM.Utils';
import { setOptionClasses } from './helpers/options';

/** The Leaflet-Geoman namespace, `L.PM` in the global build. */
export const PM: LeafletPM = {
  version: packageInfo.version,
  Map,
  Toolbar,
  Draw,
  DrawTool,
  Edit,
  Utils,
  Matrix,
  activeLang: 'en',
  optIn: false,
  initialize(this: LeafletPM, options?: object) {
    setOptionClasses(() => [
      PM.DrawTool,
      PM.Edit,
      ...Object.values(PM.Draw),
      ...Object.values(PM.Edit),
    ]);
    this.addInitHooks(options);
  },
  setOptIn(this: LeafletPM, value: boolean) {
    this.optIn = !!value;
  },
  addInitHooks(this: LeafletPM) {
    function initMap(this: InitTarget<L.Map>) {
      this.pm = undefined;

      if (PM.optIn) {
        if (this.options.pmIgnore === false) {
          this.pm = new PM.Map(this as unknown as L.Map);
        }
      } else if (!this.options.pmIgnore) {
        this.pm = new PM.Map(this as unknown as L.Map);
      }

      if (this.pm) {
        (this.pm as InstanceType<typeof Map>).setGlobalOptions({});
      }
    }

    L.Map.addInitHook(initMap);

    function initLayerGroup(this: InitTarget<L.LayerGroup>) {
      this.pm = undefined;
      if (PM.optIn) {
        if (this.options.pmIgnore === false) {
          this.pm = new PM.Edit.LayerGroup(this as unknown as L.LayerGroup);
        }
      } else if (!this.options.pmIgnore) {
        this.pm = new PM.Edit.LayerGroup(this as unknown as L.LayerGroup);
      }
    }

    L.LayerGroup.addInitHook(initLayerGroup);

    function initMarker(this: InitTarget<L.Marker>) {
      this.pm = undefined;

      if (PM.optIn) {
        if (this.options.pmIgnore === false) {
          if (this.options.textMarker) {
            this.pm = new PM.Edit.Text(this as unknown as L.Marker);
            if (!this.options._textMarkerOverPM) {
              (this.pm as InstanceType<typeof Edit.Text>)._initTextMarker();
            }
            delete this.options._textMarkerOverPM;
          } else {
            this.pm = new PM.Edit.Marker(this as unknown as L.Marker);
          }
        }
      } else if (!this.options.pmIgnore) {
        if (this.options.textMarker) {
          this.pm = new PM.Edit.Text(this as unknown as L.Marker);
          if (!this.options._textMarkerOverPM) {
            (this.pm as InstanceType<typeof Edit.Text>)._initTextMarker();
          }
          delete this.options._textMarkerOverPM;
        } else {
          this.pm = new PM.Edit.Marker(this as unknown as L.Marker);
        }
      }
    }
    L.Marker.addInitHook(initMarker);

    function initCircleMarker(this: InitTarget<L.CircleMarker>) {
      this.pm = undefined;

      if (PM.optIn) {
        if (this.options.pmIgnore === false) {
          this.pm = new PM.Edit.CircleMarker(this as unknown as L.CircleMarker);
        }
      } else if (!this.options.pmIgnore) {
        this.pm = new PM.Edit.CircleMarker(this as unknown as L.CircleMarker);
      }
    }
    L.CircleMarker.addInitHook(initCircleMarker);

    function initPolyline(this: InitTarget<L.Polyline>) {
      this.pm = undefined;

      if (PM.optIn) {
        if (this.options.pmIgnore === false) {
          this.pm = new PM.Edit.Line(this as unknown as L.Polyline);
        }
      } else if (!this.options.pmIgnore) {
        this.pm = new PM.Edit.Line(this as unknown as L.Polyline);
      }
    }

    L.Polyline.addInitHook(initPolyline);

    function initPolygon(this: InitTarget<L.Polygon>) {
      this.pm = undefined;

      if (PM.optIn) {
        if (this.options.pmIgnore === false) {
          this.pm = new PM.Edit.Polygon(this as unknown as L.Polygon);
        }
      } else if (!this.options.pmIgnore) {
        this.pm = new PM.Edit.Polygon(this as unknown as L.Polygon);
      }
    }

    L.Polygon.addInitHook(initPolygon);

    function initRectangle(this: InitTarget<L.Rectangle>) {
      this.pm = undefined;

      if (PM.optIn) {
        if (this.options.pmIgnore === false) {
          this.pm = new PM.Edit.Rectangle(this as unknown as L.Rectangle);
        }
      } else if (!this.options.pmIgnore) {
        this.pm = new PM.Edit.Rectangle(this as unknown as L.Rectangle);
      }
    }

    L.Rectangle.addInitHook(initRectangle);

    function initCircle(this: InitTarget<L.Circle>) {
      this.pm = undefined;

      if (PM.optIn) {
        if (this.options.pmIgnore === false) {
          this.pm = new PM.Edit.Circle(this as unknown as L.Circle);
        }
      } else if (!this.options.pmIgnore) {
        this.pm = new PM.Edit.Circle(this as unknown as L.Circle);
      }
    }

    L.Circle.addInitHook(initCircle);

    function initImageOverlay(this: InitTarget<L.ImageOverlay>) {
      this.pm = undefined;

      if (PM.optIn) {
        if (this.options.pmIgnore === false) {
          this.pm = new PM.Edit.ImageOverlay(this as unknown as L.ImageOverlay);
        }
      } else if (!this.options.pmIgnore) {
        this.pm = new PM.Edit.ImageOverlay(this as unknown as L.ImageOverlay);
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
    } else if (PM.optIn && layer.options.pmIgnore !== false) {
      // Opt-In is true and pmIgnore is not false
    } else if (layer.options.pmIgnore) {
      // pmIgnore is true
    } else if (layer instanceof L.Map) {
      layer.pm = new PM.Map(layer) as unknown as typeof layer.pm;
    } else if (layer instanceof L.Marker) {
      if (layer.options.textMarker) {
        layer.pm = new PM.Edit.Text(layer) as unknown as typeof layer.pm;
        layer.pm._initTextMarker();
        layer.pm._createTextMarker(false);
      } else {
        layer.pm = new PM.Edit.Marker(layer) as unknown as typeof layer.pm;
      }
    } else if (layer instanceof L.Circle) {
      layer.pm = new PM.Edit.Circle(layer) as unknown as typeof layer.pm;
    } else if (layer instanceof L.CircleMarker) {
      layer.pm = new PM.Edit.CircleMarker(layer) as unknown as typeof layer.pm;
    } else if (layer instanceof L.Rectangle) {
      layer.pm = new PM.Edit.Rectangle(layer) as unknown as typeof layer.pm;
    } else if (layer instanceof L.Polygon) {
      layer.pm = new PM.Edit.Polygon(layer) as unknown as typeof layer.pm;
    } else if (layer instanceof L.Polyline) {
      layer.pm = new PM.Edit.Line(layer) as unknown as typeof layer.pm;
    } else if (layer instanceof L.LayerGroup) {
      layer.pm = new PM.Edit.LayerGroup(layer) as unknown as typeof layer.pm;
    } else if (layer instanceof L.ImageOverlay) {
      layer.pm = new PM.Edit.ImageOverlay(layer) as unknown as typeof layer.pm;
    }
  },
};
