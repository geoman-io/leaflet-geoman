import cloneDeep from "lodash/cloneDeep";
import Utils from "../L.PM.Utils";

const RevertMixin = {
  _changesOnLayer: [],
  _changePos: 0,
  _reverting: false,
  undoChange(step = 1){
    if(!this._reverting) {
      this._goToChange(this._changePos - step);
    }
  },
  redoChange(step = 1){
    if(!this._reverting) {
      this._goToChange(this._changePos + step);
    }
  },
  revert(mode = 'edit'){
    this._goToChange(0);

    if(this._changesOnLayer.length >= 2) {
      // Needs two changes => init and an additional
      const oldChange = this._getCurrentChange();
      const newChange = this._changesOnLayer[0];

      Utils._fireEvent(this._layer, 'pm:revert', {
        layer: this._layer,
        shape: this.getShape(),
        oldChange,
        newChange,
        mode
      });
      Utils._fireEvent(this._map, 'pm:revert', {
        layer: this._layer,
        shape: this.getShape(),
        oldChange,
        newChange,
        mode
      });
    }
  },
  _getLastChange(){
    return this._changesOnLayer[this._changesOnLayer.length-1] || {mode: null, latlng: null};
  },
  _getCurrentChange(){
    return this._changesOnLayer[this._changePos] || {mode: null, latlng: null};
  },
  _clearChangesOnLayer(){
    if(!this._reverting) {
      this._changesOnLayer = [];
      this._changePos = 0;
      this._reverting = false;
    }
  },
  createChangeOnLayer(change = {}){
    if(!change || !change.mode || this._layer._pmTempLayer || this._reverting){
      return;
    }

    if(!this._map){
      this.setMap();
      if(!this._map){
        return;
      }
    }

    if(this._getLastChange().mode === "vertexRemoveLayer" && change.mode === "removeLayer") {
      return;
    }

    // GlobalModes: All layers that are removed, have to be stored, else we have no way to know which layers needs to be reverted on cancel on a global mode
    if(change.mode === "removeLayer" || change.mode === "vertexRemoveLayer"){
      this._map.pm._addRemovedLayerToRevertList(this._layer);
    }

    if(this._layer._latlngs) {
      change.latlng = cloneDeep(this._layer.getLatLngs());
    }else if(this._layer._latlng){
      change.latlng = cloneDeep(this._layer.getLatLng());
    }else if (this._layer instanceof L.ImageOverlay) {
      change.latlng = cloneDeep(this._findCorners());
    }

    if(this._layer._radius){
      change.radius = cloneDeep(this._layer.getRadius());
    }

    change.isEnabled = this.enabled();

    // The changePos is not on the last position, so the new change have to inserted after the changePos and all other changes after have to be removed
    if(this._changePos !== this._changesOnLayer.length-1){
      // remove all next steps, but keep the current one (+1)
      this._changesOnLayer = this._changesOnLayer.slice(0,this._changePos+1);
    }
    this._changesOnLayer.push(change);
    this._changePos = this._changesOnLayer.length-1;
    // init changes are not added to the global changes, else there where a lot of changes with no action in the global history
    if(change.mode !== "init") {
      this._map.pm._addGlobalChangeLayer(this._layer);
    }

    Utils._fireEvent(this._layer, 'pm:addhistory', {
      layer: this._layer,
      shape: this.getShape(),
      change,
      position: this._changePos
    });
    Utils._fireEvent(this._map, 'pm:addhistory', {
      layer: this._layer,
      shape: this.getShape(),
      change,
      position: this._changePos
    });
  },
  _goToChange(pos){
    this._reverting = true;
    if(pos < 0){
      pos = 0;
    }else if(pos > this._changesOnLayer.length-1){
      pos = this._changesOnLayer.length-1;
    }
    this._changePos = pos;

    const change = this._changesOnLayer[this._changePos];
    if(!change){
      return;
    }

    // _pmTempLayer is needed so that Mode.Edit._layerAdded is not called --> would be reset the changes through enable (only happens when undo is to fast clicked and the layer is removed / added)
    this._layer._pmTempLayer = true;

    // all remove modes have to be added here
    if(change.mode === "removeLayer" || change.mode === "vertexRemoveLayer"){
      this.removeLayer();
    }else if(!this._layer._map){ // if the layer is not added to the map, it have to be added
      // While executing addTo, the function enable() can be called and this clears the changes. So we store the changes temporary
      const temp = {changes: this._changesOnLayer, pos: this._changePos};

      this.addLayer();

      if(change.isEnabled) {
        this.enable();
      }
      this._changesOnLayer = temp.changes;
      this._changePos = temp.pos;
      // set reverting true a second time, because it can happens that while addTo the reverting will be set to false
      this._reverting = true;
    }
    this._layer._pmTempLayer = false;

    this._changeByPos();
    this._reverting = false;
  },
  _changeByPos(){
    const change = this._changesOnLayer[this._changePos];

    if(this._layer._latlngs) {
      this._layer.setLatLngs(cloneDeep(change.latlng));
    }else if(this._layer._latlng){
      this._layer.setLatLng(cloneDeep(change.latlng));
    }else if (this._layer instanceof L.ImageOverlay) {
      this._layer.setBounds(cloneDeep(change.latlng));
    }

    if(change.radius) {
      this._layer.setRadius(change.radius);
    }

    if(change.isEnabled) {
      // Executing initMarkers only if it exists for all layers, excluding CircleMarkers with not the option "editable"
      if(this._initMarkers && !(this._layer instanceof L.CircleMarker && !(this._layer instanceof L.Circle) && !this.options.editable)) {
        this._initMarkers();
      }
    }else if (this._markerGroup) {
      this._markerGroup.clearLayers();
    }

    Utils._fireEvent(this._layer, 'pm:changehistory', {
      layer: this._layer,
      shape: this.getShape(),
      change,
      position: this._changePos
    });
    Utils._fireEvent(this._map, 'pm:changehistory', {
      layer: this._layer,
      shape: this.getShape(),
      change,
      position: this._changePos
    });
  },
};

export default RevertMixin;
