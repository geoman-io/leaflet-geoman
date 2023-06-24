import merge from 'lodash/merge';

const EventMixin = {
  // Draw Events
  // Fired when enableDraw() is called -> draw start
  _fireDrawStart(source = 'Draw', customPayload = {}) {
    this.__fire(
      this._map,
      'pm:drawstart',
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
      'pm:drawend',
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
      'pm:create',
      {
        shape: this._shape,
        marker: layer, // TODO: Deprecated
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
      'pm:centerplaced',
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
  // TODO: is Cut "Draw" or "Edit"? The event `pm:edit` in the same scope is called as source "Edit"
  _fireCut(
    fireLayer,
    layer,
    originalLayer,
    source = 'Draw',
    customPayload = {}
  ) {
    this.__fire(
      fireLayer,
      'pm:cut',
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
      'pm:edit',
      { layer: this._layer, shape: this.getShape() },
      source,
      customPayload
    );
  },
  // Fired when layer is enabled for editing
  _fireEnable(source = 'Edit', customPayload = {}) {
    this.__fire(
      this._layer,
      'pm:enable',
      { layer: this._layer, shape: this.getShape() },
      source,
      customPayload
    );
  },
  // Fired when layer is disabled for editing
  _fireDisable(source = 'Edit', customPayload = {}) {
    this.__fire(
      this._layer,
      'pm:disable',
      { layer: this._layer, shape: this.getShape() },
      source,
      customPayload
    );
  },
  // Fired when layer is disabled and was edited / changed
  _fireUpdate(source = 'Edit', customPayload = {}) {
    this.__fire(
      this._layer,
      'pm:update',
      { layer: this._layer, shape: this.getShape() },
      source,
      customPayload
    );
  },
  // Fired when a vertex-marker is started dragging
  // indexPath is only passed from Line / Polygon
  _fireMarkerDragStart(
    e,
    indexPath = undefined,
    source = 'Edit',
    customPayload = {}
  ) {
    this.__fire(
      this._layer,
      'pm:markerdragstart',
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
  // indexPath is only passed from Line / Polygon
  _fireMarkerDrag(
    e,
    indexPath = undefined,
    source = 'Edit',
    customPayload = {}
  ) {
    this.__fire(
      this._layer,
      'pm:markerdrag',
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
  // indexPath and intersectionReset is only passed from Line / Polygon
  _fireMarkerDragEnd(
    e,
    indexPath = undefined,
    intersectionReset = undefined,
    source = 'Edit',
    customPayload = {}
  ) {
    this.__fire(
      this._layer,
      'pm:markerdragend',
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
      'pm:dragstart',
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
      'pm:drag',
      { ...e, shape: this.getShape() },
      source,
      customPayload
    );
  },
  // Fired when a layer is stopped dragging
  _fireDragEnd(source = 'Edit', customPayload = {}) {
    this.__fire(
      this._layer,
      'pm:dragend',
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
      'pm:dragenable',
      { layer: this._layer, shape: this.getShape() },
      source,
      customPayload
    );
  },
  // Fired when layer is disabled for editing
  _fireDragDisable(source = 'Edit', customPayload = {}) {
    this.__fire(
      this._layer,
      'pm:dragdisable',
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
      'pm:remove',
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
      'pm:vertexadded',
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
      'pm:vertexremoved',
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
      'pm:vertexclick',
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
  // Fired when a Line / Polygon has self intersection
  _fireIntersect(
    intersection,
    fireLayer = this._layer,
    source = 'Edit',
    customPayload = {}
  ) {
    this.__fire(
      fireLayer,
      'pm:intersect',
      {
        layer: this._layer,
        intersection,
        shape: this.getShape(),
      },
      source,
      customPayload
    );
  },
  // Fired when a Line / Polygon is reset because of self intersection
  _fireLayerReset(e, indexPath, source = 'Edit', customPayload = {}) {
    this.__fire(
      this._layer,
      'pm:layerreset',
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
      'pm:change',
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
      'pm:textchange',
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
      'pm:textfocus',
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
      'pm:textblur',
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
    this.__fire(fireLayer, 'pm:snapdrag', eventInfo, source, customPayload);
  },
  // Fired when a vertex is snapped
  _fireSnap(fireLayer, eventInfo, source = 'Snapping', customPayload = {}) {
    this.__fire(fireLayer, 'pm:snap', eventInfo, source, customPayload);
  },
  // Fired when a vertex is unsnapped
  _fireUnsnap(fireLayer, eventInfo, source = 'Snapping', customPayload = {}) {
    this.__fire(fireLayer, 'pm:unsnap', eventInfo, source, customPayload);
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
      'pm:rotateenable',
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
      'pm:rotatedisable',
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
      'pm:rotatestart',
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
      'pm:rotate',
      {
        layer: rotationLayer,
        helpLayer: this._layer,
        startAngle: this._startAngle,
        angle: rotationLayer.pm.getAngle(),
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
      'pm:rotateend',
      {
        layer: this._rotationLayer,
        helpLayer: this._layer,
        startAngle,
        angle: this._rotationLayer.pm.getAngle(),
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
    // this._map is used because this is fired from L.Controls (PMButton)
    this.__fire(
      this._map,
      'pm:actionclick',
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
    // this._map is used because this is fired from L.Controls (PMButton)
    this.__fire(
      this._map,
      'pm:buttonclick',
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
      'pm:langchange',
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
      'pm:globaldragmodetoggled',
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
      'pm:globaleditmodetoggled',
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
      'pm:globalremovalmodetoggled',
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
      'pm:globalcutmodetoggled',
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
      'pm:globaldrawmodetoggled',
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
      'pm:globalrotatemodetoggled',
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
      'pm:remove',
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
      'pm:keyevent',
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
    L.PM.Utils._fireEvent(fireLayer, type, payload);
  },
};

export default EventMixin;
