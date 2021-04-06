const EventMixinEdit = {
  // also fired in EventMixinDraw
  _fireEdit() {
    L.PM.Utils._fireEvent(this._layer,'pm:edit', { layer: this._layer, shape: this.getShape() });
    this._layerEdited = true;
  },
  _fireEnable(){
    L.PM.Utils._fireEvent(this._layer,'pm:enable', { layer: this._layer, shape: this.getShape() });
  },
  _fireDisable(){
    L.PM.Utils._fireEvent(this._layer,'pm:disable', { layer: this._layer, shape: this.getShape() });
  },
  _fireUpdate(){
    L.PM.Utils._fireEvent(this._layer,'pm:update', { layer: this._layer, shape: this.getShape() });
  },
  _fireCenterPlaced(){
    L.PM.Utils._fireEvent(this._layer,'pm:centerplaced', {
      layer: this._layer,
      latlng: this._layer.getLatLng(),
      shape: this.getShape()
    });
  },
  _fireMarkerDragStart(e, indexPath = undefined){
    L.PM.Utils._fireEvent(this._layer,'pm:markerdragstart', {
      layer: this._layer,
      markerEvent: e,
      shape: this.getShape(),
      indexPath
    });
  },
  _fireMarkerDrag(e, indexPath = undefined){
    L.PM.Utils._fireEvent(this._layer,'pm:markerdrag', {
      layer: this._layer,
      markerEvent: e,
      shape: this.getShape(),
      indexPath
    });
  },
  _fireMarkerDragEnd(e, indexPath = undefined, intersectionReset = undefined){
    L.PM.Utils._fireEvent(this._layer,'pm:markerdragend', {
      layer: this._layer,
      markerEvent: e,
      shape: this.getShape(),
      indexPath,
      intersectionReset
    });
  },
  _fireDragStart() {
    L.PM.Utils._fireEvent(this._layer,'pm:dragstart', {
      layer: this._layer,
      shape: this.getShape()
    });
  },
  _fireDrag(e) {
    L.PM.Utils._fireEvent(this._layer,'pm:drag', Object.assign({}, e, {shape:this.getShape()}));
  },
  _fireDragEnd() {
    L.PM.Utils._fireEvent(this._layer,'pm:dragend', {
      layer: this._layer,
      shape: this.getShape()
    });
  },
  // also fired in EventMixinGlobal
  _fireRemove(fireLayer,refLayer = fireLayer){
    L.PM.Utils._fireEvent(fireLayer,'pm:remove', { layer: refLayer, shape: this.getShape() });
  },
  _fireVertexAdded(marker, indexPath, latlng){
    L.PM.Utils._fireEvent(this._layer,'pm:vertexadded', {
      layer: this._layer,
      marker,
      indexPath,
      latlng,
      shape: this.getShape()
    });
  },
  _fireVertexRemoved(marker, indexPath){
    L.PM.Utils._fireEvent(this._layer,'pm:vertexremoved', {
      layer: this._layer,
      marker,
      indexPath,
      shape: this.getShape()
      // TODO: maybe add latlng as well?
    });
  },
  _fireVertexClick(e, indexPath){
    L.PM.Utils._fireEvent(this._layer,'pm:vertexclick', {
      layer: this._layer,
      markerEvent: e,
      indexPath,
      shape: this.getShape()
    });
  },
  _fireIntersect(intersection){
    L.PM.Utils._fireEvent(this._layer,'pm:intersect', {
      layer: this._layer,
      intersection,
      shape: this.getShape()
    });
  },
  _fireLayerReset(e, indexPath){
    L.PM.Utils._fireEvent(this._layer,'pm:layerreset', {
      layer: this._layer,
      markerEvent: e,
      indexPath,
      shape: this.getShape()
    });
  }
};

const EventMixinDraw = {
  _fireDrawStart(){
    L.PM.Utils._fireEvent(this._map,'pm:drawstart', {
      shape: this._shape,
      workingLayer: this._layer,
    });
  },
  _fireDrawEnd(){
    L.PM.Utils._fireEvent(this._map,'pm:drawend', {
      shape: this._shape,
    });
  },
  _fireCreate(layer){
    L.PM.Utils._fireEvent(this._map,'pm:create', {
      shape: this._shape,
      layer,
    });
  },
  _fireCenterPlaced() {
    L.PM.Utils._fireEvent(this._layer,'pm:centerplaced', {
      shape: this._shape,
      workingLayer: this._layer,
      latlng: this._layer.getLatLng(),
    });
  },
  _fireVertexAdded(marker, latlng) {
    L.PM.Utils._fireEvent(this._layer,'pm:vertexadded', {
      shape: this._shape,
      workingLayer: this._layer,
      marker,
      latlng,
    });
  },
  _fireCut(fireLayer, layer, originalLayer){
    L.PM.Utils._fireEvent(fireLayer,'pm:cut', {
      shape: this._shape,
      layer,
      originalLayer,
    });
  },
  // also fired in EventMixinEdit
  _fireEdit(layer){
    L.PM.Utils._fireEvent(layer,'pm:edit', {
      layer,
      shape: layer.pm.getShape()
    });
  },
  _fireGlobalCutModeToggled(){
    L.PM.Utils._fireEvent(this._map,'pm:globalcutmodetoggled', {
      enabled: !!this._enabled,
      map: this._map,
    });
  },
  _fireGlobalDrawModeToggled(){
    L.PM.Utils._fireEvent(this._map,'pm:globaldrawmodetoggled', {
      enabled: this._enabled,
      shape: this._shape,
      map: this._map,
    });
  }
};

const EventMixinSnapping = {
  _fireSnapDrag(fireLayer, eventInfo){
    L.PM.Utils._fireEvent(fireLayer,'pm:snapdrag', eventInfo);
  },
  _fireSnap(fireLayer, eventInfo){
    L.PM.Utils._fireEvent(fireLayer,'pm:snap', eventInfo);
  },
  _fireUnsnap(fireLayer, eventInfo){
    L.PM.Utils._fireEvent(fireLayer,'pm:unsnap', eventInfo);
  }
};

const EventMixinGlobal = {
  _fireActionClick(action, btnName, button){
    // this._map is used because this is fired from L.Controls (PMButton)
    L.PM.Utils._fireEvent(this._map,'pm:actionclick', {
      text: action.text,
      action,
      btnName,
      button
    });
  },
  _fireButtonClick(btnName, button){
    // this._map is used because this is fired from L.Controls (PMButton)
    L.PM.Utils._fireEvent(this._map,'pm:buttonclick', {btnName, button});
  },
  _fireLangChange(oldLang, activeLang, fallback, translations ){
    L.PM.Utils._fireEvent(this.map,"pm:langchange", {
      oldLang,
      activeLang,
      fallback,
      translations
    });
  },
  _fireGlobalDragModeToggled(enabled) {
    L.PM.Utils._fireEvent(this.map,'pm:globaldragmodetoggled', {
      enabled,
      map: this.map,
    });
  },
  _fireGlobalEditModeToggled(enabled) {
    L.PM.Utils._fireEvent(this.map,'pm:globaleditmodetoggled', {
      enabled,
      map: this.map,
    });
  },
  _fireGlobalRemovalModeToggled(enabled) {
    L.PM.Utils._fireEvent(this.map,'pm:globalremovalmodetoggled', {
      enabled,
      map: this.map,
    });
  },
  // Called when LayerGroup is removed, also fired in EventMixinEdit
  _fireRemoveLayerGroup(fireLayer, refLayer = fireLayer) {
    L.PM.Utils._fireEvent(fireLayer,'pm:remove', { layer: refLayer, shape: undefined });
  }
};

// TODO: is it possible to merge EventMixinEdit / EventMixinDraw with EventMixinSnapping
export {
  EventMixinEdit,
  EventMixinDraw,
  EventMixinSnapping,
  EventMixinGlobal
}
