const GlobalRevertingMode = {
  _removedLayersForReverting: [],
  _globalChangedLayers: [],
  _globalChangePos: 0,
  _cancelMode(mode){
    if(mode.toLowerCase() === "edit"){
      this.cancelGlobalEditMode();
    }else if(mode.toLowerCase() === "drag"){
      this.cancelGlobalDragMode();
    }else if(mode.toLowerCase() === "delete" || mode.toLowerCase() === "removal" ){
      this.cancelGlobalRemovalMode();
    }else{ // Fallback
      this.cancelGlobalEditMode();
      this.cancelGlobalDragMode();
      this.cancelGlobalRemovalMode();
    }
  },
  // GlobalModes: All layers that are removed, have to be stored, else we have no way to know which layers needs to be reverted on cancel
  _addRemovedLayerToRevertList(layer){
    if(this._removedLayersForReverting.indexOf(layer) === -1) {
      this._removedLayersForReverting.push(layer);
    }
  },
  _clearRemovedLayersToRevert(){
    this._removedLayersForReverting = [];
  },
  _getRemovedLayersToRevert(){
    return this._removedLayersForReverting;
  },
  _clearGlobalChanges(){
    this._globalChangedLayers = [];
    this._globalChangePos = 0;
  },
  _addGlobalChangeLayer(layer){
    // The _globalChangePos is not on the last position, so the new change have to inserted after the _globalChangePos and all other changes after have to be removed
    if(this._globalChangePos !== this._globalChangedLayers.length-1){
      // remove all next steps, but keep the current one (+1)
      this._globalChangedLayers = this._globalChangedLayers.slice(0,this._globalChangePos+1);
    }
    this._globalChangedLayers.push(layer);
    this._globalChangePos = this._globalChangedLayers.length-1;
  },
  undoGlobalChange(){
    // Undo on the current layer and then go back in the position
    const layer = this._globalChangedLayers[this._globalChangePos];
    if(layer) {
      layer.pm.undoChange();
    }
    this._setPos(-1);
  },
  redoGlobalChange(){
    // Get the next layer and then redo on the layer
    this._setPos(1);
    const layer = this._globalChangedLayers[this._globalChangePos];
    if(layer) {
      layer.pm.redoChange();
    }
  },
  _setPos(step){
    let pos = this._globalChangePos + step;
    // the pos is -1 when all layers are reverted
    if(pos < -1){
      pos = -1;
    }else if(pos > this._globalChangedLayers.length-1){
      pos = this._globalChangedLayers.length-1;
    }
    this._globalChangePos = pos;
    return pos;
  }
};

export default GlobalRevertingMode;
