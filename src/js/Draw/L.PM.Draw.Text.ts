import * as L from 'leaflet';
import type { SnappableMarker } from '../Mixins/Snapping';
import { PM } from '../PM';
import type { DrawOptions } from './L.PM.Draw';

/**
 * Extended map with PM
 */
type ExtendedMap = L.Map & {
  pm: {
    Toolbar: {
      toggleButton: (name: string, state: boolean) => void;
    };
    _getContainingLayer: () => L.LayerGroup | L.Map;
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
 * Extended marker with snapped flag and icon
 */
type ExtendedMarker = L.Marker & {
  _pmTempLayer?: boolean;
  _snapped?: boolean;
  pm?: {
    textArea: HTMLTextAreaElement;
    _createTextMarker: (focus: boolean) => void;
    setText: (text: string) => void;
  };
};

/**
 * Text draw options
 */
interface TextDrawOptions extends DrawOptions {
  cursorMarker?: boolean;
  tooltips?: boolean;
  snappable?: boolean;
  requireSnapToFinish?: boolean;
  continueDrawing?: boolean;
  textOptions?: {
    text?: string | null;
    focusAfterDraw?: boolean | null;
    removeIfEmpty?: boolean | null;
    className?: string | null;
  };
}

/**
 * Marker options with text marker flag
 */
interface TextMarkerOptions extends L.MarkerOptions {
  textMarker?: boolean;
  _textMarkerOverPM?: boolean;
}

type TextMarkerPMOptions = { removeIfEmpty?: boolean };

import Draw from './L.PM.Draw';
import { DrawTool } from './L.PM.Draw';
import { defineOptions } from '../helpers/classes';
import { getTranslation } from '../helpers';

const cssClassNames = (className: unknown): string[] => {
  const values = Array.isArray(className) ? className : [className];
  return values
    .filter((name): name is string => typeof name === 'string')
    .flatMap((name) => name.split(' '))
    .filter(Boolean);
};

class DrawText extends DrawTool {
  declare _map: ExtendedMap;
  declare options: TextDrawOptions;
  declare _shape: string;
  declare _enabled: boolean;
  declare toolbarButtonName: string;
  declare _layer: ExtendedMarker;
  declare _hintMarker: ExtendedMarker;
  declare textArea?: HTMLTextAreaElement;

  constructor(map: L.Map) {
    super(map);
    this._shape = 'Text';
    this.toolbarButtonName = 'drawText';
  }
  enable(options?: Partial<TextDrawOptions>) {
    // TODO: Think about if these options could be passed globally for all
    // instances of PM.Draw. So a dev could set drawing style one time as some kind of config
    L.Util.setOptions(this, options);

    // change enabled state
    this._enabled = true;

    // create a marker on click on the map
    this._map.on('click', this._createMarker, this);

    // toggle the draw button of the Toolbar in case drawing mode got enabled without the button
    this._map.pm._modes._exclusive(`draw:${this._shape}`);
    this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, true);

    // this is the hintmarker on the mouse cursor
    this._hintMarker = new L.Marker(this._map.getCenter(), {
      interactive: false,
      zIndexOffset: 100,
      icon: new L.DivIcon({ className: 'marker-icon cursor-marker' }),
    });
    this._setPane(this._hintMarker, 'vertexPane');
    this._hintMarker._pmTempLayer = true;
    this._hintMarker.addTo(this._map);

    // show the hintmarker if the option is set
    if (this.options.cursorMarker) {
      this._hintMarker._icon!.classList.add('visible');
    }

    // add tooltip to hintmarker
    if (this.options.tooltips) {
      this._hintMarker
        .bindTooltip(getTranslation('tooltips.placeText'), {
          permanent: true,
          offset: new L.Point(0, 10),
          direction: 'bottom',

          opacity: 0.8,
        })
        .openTooltip();
    }

    // this is just to keep the snappable mixin happy
    this._layer = this._hintMarker;

    // sync hint marker with mouse cursor
    this._map.on('pointermove', this._syncHintMarker, this);

    this._map.getContainer().classList.add('geoman-draw-cursor');

    // fire drawstart event
    this._fireDrawStart();
    this._setGlobalDrawMode();
  }
  disable() {
    // cancel, if drawing mode isn't even enabled
    if (!this._enabled) {
      return;
    }

    // change enabled state
    this._enabled = false;

    // undbind click event, don't create a marker on click anymore
    this._map.off('click', this._createMarker, this);

    // remove hint marker
    this._hintMarker?.remove();

    this._map.getContainer().classList.remove('geoman-draw-cursor');

    // remove event listener to sync hint marker
    this._map.off('pointermove', this._syncHintMarker, this);

    this._map.off('pointermove', this._showHintMarkerAfterMoving, this);

    // toggle the draw button of the Toolbar in case drawing mode got disabled without the button
    this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, false);

    // cleanup snapping
    if (this.options.snappable) {
      this._cleanupSnapping();
    }

    // fire drawend event
    this._fireDrawEnd();
    this._setGlobalDrawMode();
  }
  enabled() {
    return this._enabled;
  }
  toggle(options?: Partial<TextDrawOptions>) {
    if (this.enabled()) {
      this.disable();
    } else {
      this.enable(options);
    }
  }
  _syncHintMarker(e: L.LeafletPointerEvent) {
    // move the cursor marker
    this._hintMarker.setLatLng(e.latlng);

    // if snapping is enabled, do it
    if (this.options.snappable) {
      this._handleSnapping(
        Object.assign(e, { target: this._hintMarker as SnappableMarker })
      );
    }
  }
  _createMarker(e: L.LeafletPointerEvent) {
    if (!e.latlng) {
      return;
    }

    // If snap finish is required but the last marker wasn't snapped, do not finish the shape!
    if (
      this.options.requireSnapToFinish &&
      !this._hintMarker._snapped &&
      !this._isFirstLayer()
    ) {
      return;
    }

    // assign the coordinate of the click to the hintMarker, that's necessary for
    // mobile where the marker can't follow a cursor
    if (!this._hintMarker._snapped) {
      this._hintMarker.setLatLng(e.latlng);
    }

    // get coordinate for new vertex by hintMarker (cursor marker)
    const latlng = this._hintMarker.getLatLng();

    this.textArea = this._createTextArea();

    const cssClasses = cssClassNames(this.options.textOptions?.className);
    if (cssClasses.length) {
      this.textArea.classList.add(...cssClasses);
    }

    const textAreaIcon = this._createTextIcon(this.textArea);

    const marker = new L.Marker(latlng, {
      textMarker: true,
      _textMarkerOverPM: true, // we need to put this into the options, else we can't catch this in the init method
      icon: textAreaIcon,
    });
    this._setPane(marker, 'markerPane');
    this._finishLayer(marker);

    if (!marker.pm) {
      // if pm is not create we don't apply dragging to the marker (draggable is applied to the marker, when it is added to the map )
      marker.options.draggable = false;
    }
    // add marker to the map
    marker.addTo(this._map.pm._getContainingLayer());
    if (marker.pm) {
      marker.pm.textArea = this.textArea;
      L.Util.setOptions(marker.pm as { options?: TextMarkerPMOptions }, {
        removeIfEmpty: this.options.textOptions?.removeIfEmpty ?? true,
      });

      const focusAfterDraw = this.options.textOptions?.focusAfterDraw ?? true;
      marker.pm._createTextMarker(focusAfterDraw);
      if (this.options.textOptions?.text) {
        marker.pm.setText(this.options.textOptions.text);
      }
    }

    // fire the pm:create event and pass shape and marker
    this._fireCreate(marker);

    this._cleanupSnapping();

    // disable drawing
    this.disable();
    if (this.options.continueDrawing) {
      // the user is still typing some text, so we re-enable the layer after moving the mouse
      this._map.once('pointermove', this._showHintMarkerAfterMoving, this);
    }
  }

  _showHintMarkerAfterMoving(e: L.LeafletPointerEvent) {
    this.enable();
    this._hintMarker.setLatLng(e.latlng);
  }

  _createTextArea() {
    const textArea = document.createElement('textarea');
    textArea.readOnly = true;
    textArea.classList.add('pm-textarea', 'pm-disabled');
    return textArea;
  }

  _createTextIcon(textArea: HTMLTextAreaElement) {
    return new L.DivIcon({
      className: 'pm-text-marker',
      html: textArea,
    });
  }
}

defineOptions(DrawText, {});
Draw.Text = DrawText;

export default DrawText;
