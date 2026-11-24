import * as L from 'leaflet';
import { PM } from '../PM';
import { applyMixins, defineOptions } from '../helpers/classes';
import type { MixinMembers } from '../helpers/classes';
import { mergeOptions as mergeInto } from '../helpers/options';
import SnapMixin from '../Mixins/Snapping';
import EventMixin from '../Mixins/Events';

import type { DrawOptions } from '../../types/options';

/**
 * Extended layer with PM properties
 */
interface PMLayer extends L.Layer {
  pm?: {
    setOptions: (options: DrawOptions) => void;
    _applyOptions?: (options: DrawOptions) => void;
    _shape?: string;
    _map?: L.Map;
  };
  _pmTempLayer?: boolean;
  _drawnByGeoman?: boolean;
}

/**
 * Extended map with PM - using type intersection to avoid property conflicts
 */
type ExtendedMap = L.Map & {
  pm: {
    globalOptions: {
      panes?: {
        layerPane?: string;
        vertexPane?: string;
        markerPane?: string;
      };
    };
    getGeomanLayers: () => L.Layer[];
  };
};

/**
 * The base of the draw tools: drawing one shape on one map. `L.PM.Draw`, the
 * map's registry of tools, creates one instance of each tool class.
 */
abstract class DrawTool {
  declare options: DrawOptions;
  declare _map: ExtendedMap;
  declare _shape?: string;
  declare _enabled?: boolean;
  declare _layer?: L.Layer & { _map?: L.Map };
  declare toolbarButtonName?: string;

  constructor(map: L.Map) {
    // an own options object, as the Leaflet 1 style class factory made
    L.Util.setOptions(this, undefined as never);
    this._map = map as typeof this._map;
  }
  abstract enable(options?: DrawOptions): void;
  abstract disable(): void;
  abstract enabled(): boolean;
  abstract toggle(options?: DrawOptions): void;
  setOptions(options: DrawOptions) {
    L.Util.setOptions(this, options);
    this.setStyle(this.options);
  }
  setStyle(_options?: DrawOptions) {}
  getOptions() {
    return this.options;
  }
  setPathOptions(options: L.PathOptions, mergeOptions = false) {
    if (!mergeOptions) {
      this.options.pathOptions = options;
    } else {
      // A new object: merging into the current one would also change the
      // object passed to an earlier setPathOptions.
      this.options.pathOptions = mergeInto(
        mergeInto({}, this.options.pathOptions),
        options
      );
    }
  }
  getShape() {
    // return the shape of the current drawing layer
    return this._shape;
  }
  /**
   * The marker that follows the pointer while the tool draws, or null when
   * the tool is off or has none. For @geoman-io packages.
   */
  unstable_hintMarker(): L.Marker | L.CircleMarker | null {
    const { _hintMarker } = this as { _hintMarker?: L.Marker | L.CircleMarker };
    return (this._enabled && _hintMarker) || null;
  }
  /**
   * Fires the event of the tool's mode turning on or off. A tool of an
   * @geoman-io package overrides it to fire its own event.
   */
  unstable_fireModeToggled() {
    if (this._shape === 'Cut') {
      this._fireGlobalCutModeToggled();
    } else {
      this._fireGlobalDrawModeToggled();
    }
  }
  _setGlobalDrawMode() {
    // extended to all PM.Draw shapes
    this.unstable_fireModeToggled();

    const layers: PMLayer[] = [];
    this._map.eachLayer((layer) => {
      if (
        layer instanceof L.Polyline ||
        layer instanceof L.Marker ||
        layer instanceof L.Circle ||
        layer instanceof L.CircleMarker ||
        layer instanceof L.ImageOverlay
      ) {
        // filter out everything that's leaflet-geoman specific temporary stuff
        if (!layer._pmTempLayer) {
          layers.push(layer);
        }
      }
    });

    if (this._enabled) {
      layers.forEach((layer) => {
        PM.Utils.disablePopup(layer);
      });
    } else {
      layers.forEach((layer) => {
        PM.Utils.enablePopup(layer);
      });
    }
  }
  _finishLayer(layer: PMLayer) {
    if (layer.pm) {
      // Copy draw options onto the new layer without treating them as a lock.
      if (layer.pm._applyOptions) {
        layer.pm._applyOptions(this.options);
      } else {
        layer.pm.setOptions(this.options);
      }
      // set the shape (can be a custom shape)
      layer.pm._shape = this._shape;
      // apply the map to the new created layer in the pm object
      layer.pm._map = this._map;
    }
    this._addDrawnLayerProp(layer);
  }
  _addDrawnLayerProp(layer: PMLayer) {
    layer._drawnByGeoman = true;
  }
  _setPane(layer: PMLayer, type: 'layerPane' | 'vertexPane' | 'markerPane') {
    if (type === 'layerPane') {
      layer.options.pane =
        (this._map.pm.globalOptions.panes &&
          this._map.pm.globalOptions.panes.layerPane) ||
        'overlayPane';
    } else if (type === 'vertexPane') {
      layer.options.pane =
        (this._map.pm.globalOptions.panes &&
          this._map.pm.globalOptions.panes.vertexPane) ||
        'markerPane';
    } else if (type === 'markerPane') {
      layer.options.pane =
        (this._map.pm.globalOptions.panes &&
          this._map.pm.globalOptions.panes.markerPane) ||
        'markerPane';
    }
  }
  _isFirstLayer() {
    const map = this._map || this._layer!._map!;
    return map.pm.getGeomanLayers().length === 0;
  }
}

defineOptions(DrawTool, {
  snappable: true, // TODO: next major Release, rename it to allowSnapping
  snapDistance: 20,
  snapMiddle: false,
  allowSelfIntersection: true,
  tooltips: true,
  templineStyle: {},
  hintlineStyle: {
    color: '#3388ff',
    dashArray: '5,5',
  },
  pathOptions: null,
  cursorMarker: true,
  finishOn: null,
  markerStyle: {
    draggable: true,
    icon: new L.Icon({} as L.IconOptions),
  },
  hideMiddleMarkers: false,
  minRadiusCircle: null,
  maxRadiusCircle: null,
  minRadiusCircleMarker: null,
  maxRadiusCircleMarker: null,
  resizeableCircleMarker: false,
  resizeableCircle: true,
  markerEditable: true,
  continueDrawing: false,
  snapSegment: true,
  requireSnapToFinish: false,
  rectangleAngle: 0,
  textOptions: {
    text: null,
    focusAfterDraw: null,
    removeIfEmpty: null,
    className: null,
  },
  snapVertex: true,
});

// The mixins' members, merged into the class's type.
type DrawToolMixins = MixinMembers<[typeof SnapMixin, typeof EventMixin]>;
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
interface DrawTool extends DrawToolMixins {}
applyMixins(DrawTool, SnapMixin, EventMixin);

export { DrawTool };
export default DrawTool;
