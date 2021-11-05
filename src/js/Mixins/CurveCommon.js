
const CurveCommon = {
	initVars() {
		this._markers = [];
		this._instructions = []; 	// array of SVG instructions (['M', 'Q', ...])
		this._latlngs = [];				// array of corresponding lat/lng coordinates, varying in size depending on the instruction
	},

	delete() {
		delete this._markers;
		delete this._instructions;
		delete this._latlngs;	 
	},

	_getLastPoint() {
		const lastCoords = this._getLastLatLngs();
		return lastCoords[lastCoords.length - 1];
	},

	_getLastPointFromLatLngs(latLngIndex) {
		const coords = this._latlngs[latLngIndex];
		return coords[coords.length - 1];
	},

	_getLastLatLngs() {
		return this._latlngs[this._latlngs.length - 1];
	},

	_getReconstructed() {
		const reconstructed = [];
		for (let i = 0; i < this._instructions.length; i += 1) {
			reconstructed.push(this._instructions[i]);
			reconstructed.push(...this._latLngToArray(this._latlngs[i]));
		}
		return reconstructed;
	},

	_updatePath() {
		this._layer.setPath(this._getReconstructed());
	},

	_removeInstruction(index) {
		if (index >= this._latlngs.length) return;
		// replace next control point as the first one (M)
		if (index === 0) {
      this._instructions[1] = 'M';
      this._latlngs[1] = [this._getLastPointFromLatLngs(1)];
    }
		this._instructions.splice(index, 1);
		this._latlngs.splice(index, 1);
	},


	_latLngToArray(latlngArray) {
		const asArrays = [];
		for (let i = 0; i < latlngArray.length; i += 1) {
			let latlng = latlngArray[i];
			if (!Array.isArray(latlng)) { latlng = [latlng.lat, latlng.lng];}
			asArrays.push(latlng);
		}
		return asArrays;
	},

};

export default CurveCommon;