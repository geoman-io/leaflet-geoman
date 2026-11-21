import * as L from 'leaflet';
import { PM } from '../PM';
import { applyMixins, defineOptions } from '../helpers/classes';
import { checkOptions } from '../helpers/options';
import type { MixinMembers } from '../helpers/classes';
import type EditMarker from './L.PM.Edit.Marker';
import type EditCircleMarker from './L.PM.Edit.CircleMarker';
import type EditCircle from './L.PM.Edit.Circle';
import type EditImageOverlay from './L.PM.Edit.ImageOverlay';
import type EditLayerGroup from './L.PM.Edit.LayerGroup';
import type EditLine from './L.PM.Edit.Line';
import type EditPolygon from './L.PM.Edit.Polygon';
import type EditRectangle from './L.PM.Edit.Rectangle';
import type EditText from './L.PM.Edit.Text';

import type {
  EditOptions,
  VertexValidationArgs,
  VertexValidationFn,
} from '../../types/options';
export type { EditOptions } from '../../types/options';

/**
 * Extended marker with validation chain
 */
interface ExtendedMarker extends L.Marker {
  _cancelDragEventChain?: L.LatLng | null;
  _latlng: L.LatLng;
  update(): this;
}

/**
 * Extended layer with PM and map - using type intersection to avoid protected property issues
 */

/**
 * Extended map with PM
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
    removeLayer: (e: { target: L.Layer }) => void;
  };
};

/** The layer interactions that can be on together. */
export type Interaction = 'edit' | 'drag' | 'rotate';

// What the sync below needs from the subclasses and the rotate mixin.
type SyncContext = Edit & {
  enabled(): boolean;
  rotateEnabled(): boolean;
  _rotatePoly?: { pm: { _markerGroup?: L.FeatureGroup } };
  _syncRotation(): void;
};
import SnapMixin from '../Mixins/Snapping';
import DragMixin from '../Mixins/Dragging';
import RotateMixin from '../Mixins/Rotating';
import EventMixin from '../Mixins/Events';

class Edit {
  declare options: EditOptions;
  declare _map?: ExtendedMap;
  declare _layer: L.Layer & { _map?: L.Map };
  declare _shape?: string;
  declare _ownOptions?: EditOptions;

  // The editor classes, registered by their modules.
  declare static Marker: typeof EditMarker;
  declare static CircleMarker: typeof EditCircleMarker;
  declare static Circle: typeof EditCircle;
  declare static ImageOverlay: typeof EditImageOverlay;
  declare static LayerGroup: typeof EditLayerGroup;
  declare static Line: typeof EditLine;
  declare static Polygon: typeof EditPolygon;
  declare static Rectangle: typeof EditRectangle;
  declare static Text: typeof EditText;

  constructor(_layer: L.Layer) {
    // an empty own options object, as the Leaflet 1 style class factory made
    L.Util.setOptions(this, undefined as never);
  }
  setOptions(o: EditOptions) {
    const options = checkOptions(o, 'layer.pm.setOptions()');
    // Only an explicit setOptions/enable(options) is a lock. Global enable and
    // draw finish must not store those values as the layer's own choice.
    if (options && Object.keys(options).length) {
      this._ownOptions = {
        ...(this._ownOptions || {}),
        ...options,
      };
    }
    this._applyOptions(options);
  }
  _applyOptions(options?: EditOptions) {
    L.Util.setOptions(this, options);
  }
  // Resolves the layer's options as defaults < `options` (the map's global
  // options) < the layer's own setOptions. Re-applying the own options also
  // replaces values that enableGlobalEditMode(options) set earlier.
  _applyInheritedOptions(options?: EditOptions) {
    if (!options) return;
    const own = this._ownOptions || {};
    const inherited: EditOptions = {};
    for (const key of Object.keys(options)) {
      if (!Object.prototype.hasOwnProperty.call(own, key)) {
        inherited[key] = options[key];
      }
    }
    this._applyOptions({ ...inherited, ...own });
  }
  getOptions() {
    return this.options;
  }
  applyOptions() {}
  // Edit and rotate can stay on while another interaction changes the layer,
  // such as a body drag while editing. Their helpers hide while it runs and
  // are rebuilt from the new coordinates when it ends.
  _suspendInteractions(this: SyncContext, changedBy: Interaction) {
    if (changedBy !== 'edit' && this.enabled()) {
      this._hideEditHelpers();
    }
    if (changedBy !== 'rotate' && this.rotateEnabled()) {
      this._rotatePoly?.pm._markerGroup?.remove();
    }
  }
  _syncInteractions(this: SyncContext, changedBy: Interaction) {
    // removed from the map while the interaction ran
    if (!this._layer._map) {
      return;
    }
    if (changedBy !== 'edit' && this.enabled()) {
      this._refreshEditHelpers();
    }
    if (changedBy !== 'rotate' && this.rotateEnabled()) {
      this._syncRotation();
    }
  }
  // Editors with vertex or radius markers override these two.
  _hideEditHelpers() {}
  _editDrags() {
    return false;
  }
  _refreshEditHelpers() {}
  isPolygon() {
    // if it's a polygon, it means the coordinates array is multi dimensional
    return this._layer instanceof L.Polygon;
  }
  getShape() {
    return this._shape;
  }
  _setPane(layer: L.Layer, type: 'layerPane' | 'vertexPane' | 'markerPane') {
    if (type === 'layerPane') {
      layer.options.pane =
        (this._map!.pm.globalOptions.panes &&
          this._map!.pm.globalOptions.panes.layerPane) ||
        'overlayPane';
    } else if (type === 'vertexPane') {
      layer.options.pane =
        (this._map!.pm.globalOptions.panes &&
          this._map!.pm.globalOptions.panes.vertexPane) ||
        'markerPane';
    } else if (type === 'markerPane') {
      layer.options.pane =
        (this._map!.pm.globalOptions.panes &&
          this._map!.pm.globalOptions.panes.markerPane) ||
        'markerPane';
    }
  }
  remove() {
    const map = this._map || this._layer._map;
    map!.pm.removeLayer({ target: this._layer });
  }
  _vertexValidation(
    type: 'move' | 'add' | 'remove',
    e: L.LeafletEvent & { target: ExtendedMarker }
  ) {
    const marker = e.target;
    const args: VertexValidationArgs = { layer: this._layer, marker, event: e };

    let validationFnc: keyof EditOptions = '';
    if (type === 'move') {
      validationFnc = 'moveVertexValidation';
    } else if (type === 'add') {
      validationFnc = 'addVertexValidation';
    } else if (type === 'remove') {
      validationFnc = 'removeVertexValidation';
    }

    // if validation goes wrong, we return false
    if (
      this.options[validationFnc] &&
      typeof this.options[validationFnc] === 'function' &&
      !(this.options[validationFnc] as VertexValidationFn)(args)
    ) {
      if (type === 'move') {
        marker._cancelDragEventChain = marker.getLatLng();
      }
      return false;
    }

    marker._cancelDragEventChain = null;
    return true;
  }
  _vertexValidationDrag(marker: ExtendedMarker) {
    // we reset the marker to the place before it was dragged. We need this, because we can't stop the drag process in a `dragstart` | `movestart` listener
    if (marker._cancelDragEventChain) {
      marker._latlng = marker._cancelDragEventChain;
      marker.update();
      return false;
    }
    return true;
  }
  _vertexValidationDragEnd(marker: {
    _cancelDragEventChain?: L.LatLng | null;
  }) {
    if (marker._cancelDragEventChain) {
      marker._cancelDragEventChain = null;
      return false;
    }
    return true;
  }
}

defineOptions(Edit, {
  snappable: true, // TODO: next major Release, rename it to allowSnapping
  snapDistance: 20,
  allowSelfIntersection: true,
  allowSelfIntersectionEdit: false,
  preventMarkerRemoval: false,
  removeLayerBelowMinVertexCount: true,
  limitMarkersToCount: -1,
  hideMiddleMarkers: false,
  snapSegment: true,
  syncLayersOnDrag: false,
  draggable: true, // TODO: next major Release, rename it to allowDragging
  allowEditing: true, // disable all interactions on a layer which are activated with `enable()`. For example a Circle can't be dragged in Edit-Mode
  allowRemoval: true,
  allowCutting: true,
  allowRotation: true,
  addVertexOn: 'click',
  removeVertexOn: 'contextmenu',
  removeVertexValidation: undefined,
  addVertexValidation: undefined,
  moveVertexValidation: undefined,
  resizeableCircleMarker: false,
  resizeableCircle: true,
  snapMiddle: false,
  snapVertex: true,
});

// The mixins' members, merged into the class's type.
type EditMixins = MixinMembers<
  [typeof DragMixin, typeof SnapMixin, typeof RotateMixin, typeof EventMixin]
>;
// Marker and Text override these two, so they are typed as methods.
type OverriddenMixinMembers = '_initSnappableMarkers' | '_disableSnapping';
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
interface Edit extends Omit<EditMixins, OverriddenMixinMembers> {
  _initSnappableMarkers(): void;
  _disableSnapping(): void;
}
applyMixins(Edit, DragMixin, SnapMixin, RotateMixin, EventMixin);

export { Edit };
export default Edit;
