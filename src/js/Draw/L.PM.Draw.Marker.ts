/**
 * Extended hint marker with snapping properties
 */
interface HintMarker extends L.Marker {
  _pmTempLayer?: boolean;
  _snapped?: boolean;
}

/**
 * Extended PM layer
 */
interface PMLayer extends L.Layer {
  pm?: {
    enable: () => void;
    disable: () => void;
    _initTextMarker?: boolean;
  };
  _pmTempLayer?: boolean;
  dragging?: {
    disable: () => void;
  };
}

/**
 * Extended map with PM - using type intersection to avoid property conflicts
 */
type ExtendedMap = L.Map & {
  pm: {
    Toolbar: {
      toggleButton: (name: string, state: boolean) => void;
    };
    _getContainingLayer: () => L.LayerGroup | L.Map;
  };
};

/**
 * Draw Marker options
 */
interface DrawMarkerOptions {
  markerStyle: {
    icon?: L.Icon;
    draggable?: boolean;
  };
  tooltips?: boolean;
  snappable?: boolean;
  markerEditable?: boolean;
  requireSnapToFinish?: boolean;
  continueDrawing?: boolean;
  [key: string]: unknown;
}

/**
 * Mouse/Touch event with latlng
 */
interface MapMouseEvent extends L.LeafletMouseEvent {
  target: HintMarker;
}

/**
 * Draw Marker interface
 */
export interface IDrawMarker {
  _map: ExtendedMap;
  _shape: string;
  _enabled: boolean;
  _layer: L.Layer;
  _hintMarker: HintMarker | null;
  _touchHint?: HTMLElement | null;
  _layerIsDragging: boolean;
  _isTouchDevice: boolean;
  toolbarButtonName: string;
  options: DrawMarkerOptions;

  initialize(map: L.Map): void;
  enable(options?: DrawMarkerOptions): void;
  disable(): void;
  enabled(): boolean;
  toggle(options?: DrawMarkerOptions): void;
  isRelevantMarker(layer: L.Layer): boolean;
  _syncHintMarker(e: L.LeafletMouseEvent): void;
  _createMarker(e: L.LeafletMouseEvent): void;
  setStyle(): void;
  _createTouchHint(): void;
  _removeTouchHint(): void;
  // From base Draw class
  _setPane: (layer: L.Layer, type: string) => void;
  _finishLayer: (layer: L.Layer) => void;
  _fireDrawStart: () => void;
  _fireDrawEnd: () => void;
  _fireCreate: (layer: L.Layer) => void;
  _fireChange: (latlng: L.LatLng, source: string) => void;
  _setGlobalDrawMode: () => void;
  _cleanupSnapping: () => void;
  _handleSnapping: (e: L.LeafletMouseEvent) => void;
  _isFirstLayer: () => boolean;
}
import Draw from './L.PM.Draw';
import { getTranslation, hasFinePointer } from '../helpers';

Draw.Marker = Draw.extend<IDrawMarker, [L.Map]>({
  initialize(this: IDrawMarker, map: L.Map) {
    this._map = map as typeof this._map;
    this._shape = 'Marker';
    this.toolbarButtonName = 'drawMarker';
    // with _layerIsDragging we check if a marker is currently dragged and disable marker creation
    this._layerIsDragging = false;
  },
  enable(this: IDrawMarker, options?: DrawMarkerOptions) {
    // TODO: Think about if these options could be passed globally for all
    // instances of L.PM.Draw. So a dev could set drawing style one time as some kind of config
    L.Util.setOptions(this, options);

    // change enabled state
    this._enabled = true;

    // Detect if device has a fine pointer (mouse) vs coarse pointer (touch)
    this._isTouchDevice = !hasFinePointer();

    // change map cursor
    this._map.getContainer().classList.add('geoman-draw-cursor');

    // create a marker on click on the map
    this._map.on('click', this._createMarker, this);

    // toggle the draw button of the Toolbar in case drawing mode got enabled without the button
    this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, true);

    if (this._isTouchDevice) {
      // Touch device: Create fixed-position hint instead of cursor-following marker
      this._createTouchHint();

      // Create a minimal hidden hint marker to satisfy the snappable mixin interface.
      // Note: Snapping is effectively disabled on touch devices since there's no
      // continuous cursor position to snap. The marker exists only for API compatibility.
      this._hintMarker = L.marker(this._map.getCenter(), {
        ...this.options.markerStyle,
        opacity: 0,
        interactive: false,
      });
      this._setPane(this._hintMarker, 'markerPane');
      this._hintMarker!._pmTempLayer = true;
    } else {
      // Desktop: Use existing hint marker behavior
      this._hintMarker = L.marker(
        this._map.getCenter(),
        this.options.markerStyle
      );
      this._setPane(this._hintMarker, 'markerPane');
      this._hintMarker!._pmTempLayer = true;
      this._hintMarker!.addTo(this._map);

      // add tooltip to hintmarker
      if (this.options.tooltips) {
        this._hintMarker
          .bindTooltip(getTranslation('tooltips.placeMarker'), {
            permanent: true,
            offset: L.point(0, 10),
            direction: 'bottom',
            opacity: 0.8,
          })
          .openTooltip();
      }

      // sync hint marker with mouse cursor
      this._map.on('mousemove', this._syncHintMarker, this);
    }

    // this is just to keep the snappable mixin happy
    this._layer = this._hintMarker;

    // enable edit mode for existing markers
    if (this.options.markerEditable) {
      this._map.eachLayer((layer) => {
        if (this.isRelevantMarker(layer)) {
          (layer as L.Marker).pm.enable();
        }
      });
    }

    // fire drawstart event
    this._fireDrawStart();
    this._setGlobalDrawMode();
  },
  disable(this: IDrawMarker) {
    // cancel, if drawing mode isn't even enabled
    if (!this._enabled) {
      return;
    }

    // change enabled state
    this._enabled = false;

    // reset cursor
    this._map.getContainer().classList.remove('geoman-draw-cursor');

    // undbind click event, don't create a marker on click anymore
    this._map.off('click', this._createMarker, this);

    // cleanup based on device type
    if (this._isTouchDevice) {
      this._removeTouchHint();
      this._hintMarker = null;
    } else {
      this._hintMarker!.remove();
      this._map.off('mousemove', this._syncHintMarker, this);
    }

    // disable dragging and removing for all markers
    this._map.eachLayer((layer) => {
      if (this.isRelevantMarker(layer)) {
        (layer as L.Marker).pm.disable();
      }
    });

    // toggle the draw button of the Toolbar in case drawing mode got disabled without the button
    this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, false);

    // cleanup snapping
    if (this.options.snappable) {
      this._cleanupSnapping();
    }

    // fire drawend event
    this._fireDrawEnd();
    this._setGlobalDrawMode();
  },
  enabled(this: IDrawMarker) {
    return this._enabled;
  },
  toggle(this: IDrawMarker, options?: DrawMarkerOptions) {
    if (this.enabled()) {
      this.disable();
    } else {
      this.enable(options);
    }
  },
  isRelevantMarker(this: IDrawMarker, layer: L.Layer) {
    return (
      layer instanceof L.Marker &&
      layer.pm &&
      !layer._pmTempLayer &&
      !layer.pm._initTextMarker
    );
  },
  _syncHintMarker(this: IDrawMarker, e: L.LeafletMouseEvent) {
    // move the cursor marker
    this._hintMarker!.setLatLng(e.latlng);

    // if snapping is enabled, do it
    if (this.options.snappable) {
      const fakeDragEvent = e;
      fakeDragEvent.target = this._hintMarker;
      this._handleSnapping(fakeDragEvent);
    }

    this._fireChange(this._hintMarker!.getLatLng(), 'Draw');
  },
  _createMarker(this: IDrawMarker, e: L.LeafletMouseEvent) {
    if (!e.latlng || this._layerIsDragging) {
      return;
    }

    // If snap finish is required but the last marker wasn't snapped, do not finish the shape!
    if (
      this.options.requireSnapToFinish &&
      !this._hintMarker!._snapped &&
      !this._isFirstLayer()
    ) {
      return;
    }

    // assign the coordinate of the click to the hintMarker, that's necessary for
    // mobile where the marker can't follow a cursor
    if (!this._hintMarker!._snapped) {
      this._hintMarker!.setLatLng(e.latlng);
    }

    // get coordinate for new vertex by hintMarker (cursor marker)
    const latlng = this._hintMarker!.getLatLng();

    // create marker
    const marker = new L.Marker(latlng, this.options.markerStyle);
    this._setPane(marker, 'markerPane');
    this._finishLayer(marker);

    if (!marker.pm) {
      // if pm is not create we don't apply dragging to the marker (draggable is applied to the marker, when it is added to the map )
      marker.options.draggable = false;
    }
    // add marker to the map
    marker.addTo(this._map.pm._getContainingLayer());

    if (marker.pm && this.options.markerEditable) {
      // enable editing for the marker
      marker.pm.enable();
    } else if (marker.dragging) {
      marker.dragging.disable();
    }

    // fire the pm:create event and pass shape and marker
    this._fireCreate(marker);

    this._cleanupSnapping();

    if (!this.options.continueDrawing) {
      this.disable();
    }
  },
  setStyle(this: IDrawMarker) {
    if (this.options.markerStyle?.icon) {
      this._hintMarker?.setIcon(this.options.markerStyle.icon);
    }
  },
  _createTouchHint(this: IDrawMarker) {
    if (!this.options.tooltips) {
      return;
    }
    this._touchHint = L.DomUtil.create('div', 'leaflet-pm-touch-hint');
    this._touchHint.textContent = getTranslation('tooltips.placeMarkerTouch');
    this._map.getContainer().appendChild(this._touchHint);
  },
  _removeTouchHint(this: IDrawMarker) {
    if (this._touchHint && this._touchHint.parentNode) {
      this._touchHint.parentNode.removeChild(this._touchHint);
      this._touchHint = null;
    }
  },
});
