import merge from 'lodash/merge';
import Utils from '../GeomanUtils';

const EventMixin = {
  // Draw Events
  // Fired when enableDraw() is called -> draw start
  _fireDrawStart(source = 'Draw', customPayload = {}) {
    this.__fire(
      this._map,
      'geoman:drawstart',
      {
        shape: this._shape,
        workingLayer: this._layer,
      },
      source,
      customPayload
    );
  },
  // Fired when disableDraw() is called -> draw stop
  _fireDrawEnd(source = 'Draw', customPayload = {}) {
    this.__fire(
      this._map,
      'geoman:drawend',
      {
        shape: this._shape,
      },
      source,
      customPayload
    );
  },
  // Fired when layer is created while drawing
  _fireCreate(layer, source = 'Draw', customPayload = {}) {
    this.__fire(
      this._map,
      'geoman:create',
      {
        shape: this._shape,
        layer,
      },
      source,
      customPayload
    );
  },
  // Fired when Circle / CircleMarker center is placed
  // if source == "Draw" then `workingLayer` is passed else `layer`
  _fireCenterPlaced(source = 'Draw', customPayload = {}) {
    const workingLayer = source === 'Draw' ? this._layer : undefined;
    const layer = source !== 'Draw' ? this._layer : undefined;

    this.__fire(
      this._layer,
      'geoman:centerplaced',
      {
        shape: this._shape,
        workingLayer,
        layer,
        latlng: this._layer.getLatLng(),
      },
      source,
      customPayload
    );
  },
  // Fired when layer is cutted
  // TODO: is Cut "Draw" or "Edit"? The event `geoman:edit` in the same scope is called as source "Edit"
  _fireCut(
    fireLayer,
    layer,
    originalLayer,
    source = 'Draw',
    customPayload = {}
  ) {
    this.__fire(
      fireLayer,
      'geoman:cut',
      {
        shape: this._shape,
        layer,
        originalLayer,
      },
      source,
      customPayload
    );
  },

  // Edit Events
  // Fired when layer is edited / changed
  _fireEdit(fireLayer = this._layer, source = 'Edit', customPayload = {}) {
    this.__fire(
      fireLayer,
      'geoman:edit',
      { layer: this._layer, shape: this.getShape() },
      source,
      customPayload
    );
  },
  // Fired when layer is enabled for editing
  _fireEnable(source = 'Edit', customPayload = {}) {
    this.__fire(
      this._layer,
      'geoman:enable',
      { layer: this._layer, shape: this.getShape() },
      source,
      customPayload
    );
  },
  // Fired when layer is disabled for editing
  _fireDisable(source = 'Edit', customPayload = {}) {
    this.__fire(
      this._layer,
      'geoman:disable',
      { layer: this._layer, shape: this.getShape() },
      source,
      customPayload
    );
  },
  // Fired when layer is disabled and was edited / changed
  _fireUpdate(source = 'Edit', customPayload = {}) {
    this.__fire(
      this._layer,
      'geoman:update',
      { layer: this._layer, shape: this.getShape() },
      source,
      customPayload
    );
  },
  // Fired when a vertex-marker is started dragging
  // indexPath is only passed from Polyline / Polygon
  _fireVertexDragStart(
    e,
    indexPath = undefined,
    source = 'Edit',
    customPayload = {}
  ) {
    this.__fire(
      this._layer,
      'geoman:vertexdragstart',
      {
        layer: this._layer,
        markerEvent: e,
        shape: this.getShape(),
        indexPath,
      },
      source,
      customPayload
    );
  },
  // Fired while dragging a vertex-marker
  // indexPath is only passed from Polyline / Polygon
  _fireVertexDrag(
    e,
    indexPath = undefined,
    source = 'Edit',
    customPayload = {}
  ) {
    this.__fire(
      this._layer,
      'geoman:vertexdrag',
      {
        layer: this._layer,
        markerEvent: e,
        shape: this.getShape(),
        indexPath,
      },
      source,
      customPayload
    );
  },
  // Fired when a vertex-marker is stopped dragging
  // indexPath and intersectionReset is only passed from Polyline / Polygon
  _fireVertexDragEnd(
    e,
    indexPath = undefined,
    intersectionReset = undefined,
    source = 'Edit',
    customPayload = {}
  ) {
    this.__fire(
      this._layer,
      'geoman:vertexdragend',
      {
        layer: this._layer,
        markerEvent: e,
        shape: this.getShape(),
        indexPath,
        intersectionReset,
      },
      source,
      customPayload
    );
  },
  // Fired when a layer is started dragging
  _fireDragStart(source = 'Edit', customPayload = {}) {
    this.__fire(
      this._layer,
      'geoman:dragstart',
      {
        layer: this._layer,
        shape: this.getShape(),
      },
      source,
      customPayload
    );
  },
  // Fired while dragging a layer
  _fireDrag(e, source = 'Edit', customPayload = {}) {
    this.__fire(
      this._layer,
      'geoman:drag',
      { ...e, shape: this.getShape() },
      source,
      customPayload
    );
  },
  // Fired when a layer is stopped dragging
  _fireDragEnd(source = 'Edit', customPayload = {}) {
    this.__fire(
      this._layer,
      'geoman:dragend',
      {
        layer: this._layer,
        shape: this.getShape(),
      },
      source,
      customPayload
    );
  },
  // Fired when layer is enabled for editing
  _fireDragEnable(source = 'Edit', customPayload = {}) {
    this.__fire(
      this._layer,
      'geoman:dragenable',
      { layer: this._layer, shape: this.getShape() },
      source,
      customPayload
    );
  },
  // Fired when layer is disabled for editing
  _fireDragDisable(source = 'Edit', customPayload = {}) {
    this.__fire(
      this._layer,
      'geoman:dragdisable',
      { layer: this._layer, shape: this.getShape() },
      source,
      customPayload
    );
  },
  // Fired when a layer is removed
  _fireRemove(
    fireLayer,
    refLayer = fireLayer,
    source = 'Edit',
    customPayload = {}
  ) {
    this.__fire(
      fireLayer,
      'geoman:remove',
      { layer: refLayer, shape: this.getShape() },
      source,
      customPayload
    );
  },
  // Fired when a vertex-marker is created
  _fireVertexAdded(
    marker,
    indexPath,
    latlng,
    source = 'Edit',
    customPayload = {}
  ) {
    this.__fire(
      this._layer,
      'geoman:vertexadded',
      {
        layer: this._layer,
        workingLayer: this._layer,
        marker,
        indexPath,
        latlng,
        shape: this.getShape(),
      },
      source,
      customPayload
    );
  },
  // Fired when a vertex-marker is removed
  _fireVertexRemoved(marker, indexPath, source = 'Edit', customPayload = {}) {
    this.__fire(
      this._layer,
      'geoman:vertexremoved',
      {
        layer: this._layer,
        marker,
        indexPath,
        shape: this.getShape(),
        // TODO: maybe add latlng as well?
      },
      source,
      customPayload
    );
  },
  // Fired when a vertex-marker is clicked
  _fireVertexClick(e, indexPath, source = 'Edit', customPayload = {}) {
    this.__fire(
      this._layer,
      'geoman:vertexclick',
      {
        layer: this._layer,
        markerEvent: e,
        indexPath,
        shape: this.getShape(),
      },
      source,
      customPayload
    );
  },
  // Fired when a Polyline / Polygon has self intersection
  _fireIntersect(
    intersection,
    fireLayer = this._layer,
    source = 'Edit',
    customPayload = {}
  ) {
    this.__fire(
      fireLayer,
      'geoman:intersect',
      {
        layer: this._layer,
        intersection,
        shape: this.getShape(),
      },
      source,
      customPayload
    );
  },
  // Fired when coords of a layer are reset. E.g. by self-intersection
  _fireLayerReset(e, indexPath, source = 'Edit', customPayload = {}) {
    this.__fire(
      this._layer,
      'geoman:layerreset',
      {
        layer: this._layer,
        markerEvent: e,
        indexPath,
        shape: this.getShape(),
      },
      source,
      customPayload
    );
  },

  // Fired coordinates of the layer changed
  _fireChange(latlngs, source = 'Edit', customPayload = {}) {
    this.__fire(
      this._layer,
      'geoman:change',
      {
        layer: this._layer,
        latlngs,
        shape: this.getShape(),
      },
      source,
      customPayload
    );
  },

  // Fired when text of a text layer changed
  _fireTextChange(text, source = 'Edit', customPayload = {}) {
    this.__fire(
      this._layer,
      'geoman:textchange',
      {
        layer: this._layer,
        text,
        shape: this.getShape(),
      },
      source,
      customPayload
    );
  },

  // Fired when text layer focused
  _fireTextFocus(source = 'Edit', customPayload = {}) {
    this.__fire(
      this._layer,
      'geoman:textfocus',
      {
        layer: this._layer,
        shape: this.getShape(),
      },
      source,
      customPayload
    );
  },
  // Fired when text layer blurred
  _fireTextBlur(source = 'Edit', customPayload = {}) {
    this.__fire(
      this._layer,
      'geoman:textblur',
      {
        layer: this._layer,
        shape: this.getShape(),
      },
      source,
      customPayload
    );
  },

  // Snapping Events
  // Fired during a marker move/drag and other layers are existing
  _fireSnapDrag(fireLayer, eventInfo, source = 'Snapping', customPayload = {}) {
    this.__fire(fireLayer, 'geoman:snapdrag', eventInfo, source, customPayload);
  },
  // Fired when a vertex is snapped
  _fireSnap(fireLayer, eventInfo, source = 'Snapping', customPayload = {}) {
    this.__fire(fireLayer, 'geoman:snap', eventInfo, source, customPayload);
  },
  // Fired when a vertex is unsnapped
  _fireUnsnap(fireLayer, eventInfo, source = 'Snapping', customPayload = {}) {
    this.__fire(fireLayer, 'geoman:unsnap', eventInfo, source, customPayload);
  },

  // Rotation Events
  // Fired when rotation is enabled
  _fireRotationEnable(
    fireLayer,
    helpLayer,
    source = 'Rotation',
    customPayload = {}
  ) {
    this.__fire(
      fireLayer,
      'geoman:rotateenable',
      {
        layer: this._layer,
        helpLayer: this._rotatePoly,
        shape: this.getShape(),
      },
      source,
      customPayload
    );
  },
  // Fired when rotation is disabled
  _fireRotationDisable(fireLayer, source = 'Rotation', customPayload = {}) {
    this.__fire(
      fireLayer,
      'geoman:rotatedisable',
      {
        layer: this._layer,
        shape: this.getShape(),
      },
      source,
      customPayload
    );
  },
  // Fired when rotation starts
  _fireRotationStart(
    fireLayer,
    originLatLngs,
    source = 'Rotation',
    customPayload = {}
  ) {
    this.__fire(
      fireLayer,
      'geoman:rotatestart',
      {
        layer: this._rotationLayer,
        helpLayer: this._layer,
        startAngle: this._startAngle,
        originLatLngs,
      },
      source,
      customPayload
    );
  },
  // Fired while rotation
  _fireRotation(
    fireLayer,
    angleDiff,
    oldLatLngs,
    rotationLayer = this._rotationLayer,
    source = 'Rotation',
    customPayload = {}
  ) {
    this.__fire(
      fireLayer,
      'geoman:rotate',
      {
        layer: rotationLayer,
        helpLayer: this._layer,
        startAngle: this._startAngle,
        angle: rotationLayer.geoman.getAngle(),
        angleDiff,
        oldLatLngs,
        newLatLngs: rotationLayer.getLatLngs(),
      },
      source,
      customPayload
    );
  },
  // Fired when rotation ends
  _fireRotationEnd(
    fireLayer,
    startAngle,
    originLatLngs,
    source = 'Rotation',
    customPayload = {}
  ) {
    this.__fire(
      fireLayer,
      'geoman:rotateend',
      {
        layer: this._rotationLayer,
        helpLayer: this._layer,
        startAngle,
        angle: this._rotationLayer.geoman.getAngle(),
        originLatLngs,
        newLatLngs: this._rotationLayer.getLatLngs(),
      },
      source,
      customPayload
    );
  },

  // Global Events
  // Fired when a Toolbar action is clicked
  _fireActionClick(
    action,
    btnName,
    button,
    source = 'Toolbar',
    customPayload = {}
  ) {
    // this._map is used because this is fired from Controls (GeomanControl)
    this.__fire(
      this._map,
      'geoman:actionclick',
      {
        text: action.text,
        action,
        btnName,
        button,
      },
      source,
      customPayload
    );
  },
  // Fired when a Toolbar button is clicked
  _fireButtonClick(btnName, button, source = 'Toolbar', customPayload = {}) {
    // this._map is used because this is fired from Controls (GeomanControl)
    this.__fire(
      this._map,
      'geoman:buttonclick',
      { btnName, button },
      source,
      customPayload
    );
  },
  // Fired when language is changed
  _fireLangChange(
    oldLang,
    activeLang,
    fallback,
    translations,
    source = 'Global',
    customPayload = {}
  ) {
    this.__fire(
      this.map,
      'geoman:langchange',
      {
        oldLang,
        activeLang,
        fallback,
        translations,
      },
      source,
      customPayload
    );
  },
  // Fired when Drag Mode is toggled.
  _fireGlobalDragModeToggled(enabled, source = 'Global', customPayload = {}) {
    this.__fire(
      this.map,
      'geoman:globaldragmodetoggled',
      {
        enabled,
        map: this.map,
      },
      source,
      customPayload
    );
  },
  // Fired when Edit Mode is toggled.
  _fireGlobalEditModeToggled(enabled, source = 'Global', customPayload = {}) {
    this.__fire(
      this.map,
      'geoman:globaleditmodetoggled',
      {
        enabled,
        map: this.map,
      },
      source,
      customPayload
    );
  },
  // Fired when Removal Mode is toggled.
  _fireGlobalRemovalModeToggled(
    enabled,
    source = 'Global',
    customPayload = {}
  ) {
    this.__fire(
      this.map,
      'geoman:globalremovalmodetoggled',
      {
        enabled,
        map: this.map,
      },
      source,
      customPayload
    );
  },
  // Fired when Cut Mode is toggled.
  _fireGlobalCutModeToggled(source = 'Global', customPayload = {}) {
    this.__fire(
      this._map,
      'geoman:globalcutmodetoggled',
      {
        enabled: !!this._enabled,
        map: this._map,
      },
      source,
      customPayload
    );
  },
  // Fired when Draw Mode is toggled.
  _fireGlobalDrawModeToggled(source = 'Global', customPayload = {}) {
    this.__fire(
      this._map,
      'geoman:globaldrawmodetoggled',
      {
        enabled: this._enabled,
        shape: this._shape,
        map: this._map,
      },
      source,
      customPayload
    );
  },
  // Fired when Rotation Mode is toggled.
  _fireGlobalRotateModeToggled(source = 'Global', customPayload = {}) {
    this.__fire(
      this.map,
      'geoman:globalrotatemodetoggled',
      {
        enabled: this.globalRotateModeEnabled(),
        map: this.map,
      },
      source,
      customPayload
    );
  },
  // Fired when LayerGroup is removed
  _fireRemoveLayerGroup(
    fireLayer,
    refLayer = fireLayer,
    source = 'Edit',
    customPayload = {}
  ) {
    this.__fire(
      fireLayer,
      'geoman:remove',
      { layer: refLayer, shape: undefined },
      source,
      customPayload
    );
  },
  // Fired when `keydown` or `keyup` on the document is fired.
  _fireKeyeventEvent(
    event,
    eventType,
    focusOn,
    source = 'Global',
    customPayload = {}
  ) {
    this.__fire(
      this.map,
      'geoman:keyevent',
      {
        event,
        eventType,
        focusOn,
      },
      source,
      customPayload
    );
  },

  // private (very private) fire function
  __fire(fireLayer, type, payload, source, customPayload = {}) {
    payload = merge(payload, customPayload, { source });
    Utils._fireEvent(fireLayer, type, payload);
  },
};

export default EventMixin;
