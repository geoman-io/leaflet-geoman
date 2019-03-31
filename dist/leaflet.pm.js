/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Mixins_Snapping__ = __webpack_require__(12);

var Draw = L.Class.extend({
  includes: [__WEBPACK_IMPORTED_MODULE_0__Mixins_Snapping__["a" /* default */]],
  options: {
    snappable: true,
    snapDistance: 20,
    tooltips: true,
    cursorMarker: true,
    finishOnDoubleClick: false,
    finishOn: null,
    allowSelfIntersection: true,
    templineStyle: {},
    hintlineStyle: {
      color: '#3388ff',
      dashArray: '5,5'
    },
    markerStyle: {
      draggable: true
    }
  },
  initialize: function initialize(map) {
    var _this = this;

    // save the map
    this._map = map; // define all possible shapes that can be drawn

    this.shapes = ['Marker', 'Line', 'Poly', 'Rectangle', 'Circle', 'Cut']; // initiate drawing class for our shapes

    this.shapes.forEach(function (shape) {
      _this[shape] = new L.PM.Draw[shape](_this._map);
    });
  },
  setPathOptions: function setPathOptions(options) {
    this.options.pathOptions = options;
  },
  getShapes: function getShapes() {
    // if somebody wants to know what shapes are available
    return this.shapes;
  },
  enable: function enable(shape, options) {
    if (!shape) {
      throw new Error("Error: Please pass a shape as a parameter. Possible shapes are: ".concat(this.getShapes().join(',')));
    } // disable drawing for all shapes


    this.disable(); // enable draw for a shape

    this[shape].enable(options);
  },
  disable: function disable() {
    var _this2 = this;

    // there can only be one drawing mode active at a time on a map
    // so it doesn't matter which one should be disabled.
    // just disable all of them
    this.shapes.forEach(function (shape) {
      _this2[shape].disable();
    });
  },
  addControls: function addControls() {
    var _this3 = this;

    // add control buttons for our shapes
    this.shapes.forEach(function (shape) {
      _this3[shape].addButton();
    });
  }
});
/* harmony default export */ __webpack_exports__["a"] = (Draw);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Mixins_Snapping__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Mixins_Drag__ = __webpack_require__(36);


var Edit = L.Class.extend({
  includes: [__WEBPACK_IMPORTED_MODULE_1__Mixins_Drag__["a" /* default */], __WEBPACK_IMPORTED_MODULE_0__Mixins_Snapping__["a" /* default */]],
  options: {
    snappable: true,
    snapDistance: 20,
    allowSelfIntersection: true,
    draggable: true
  },
  isPolygon: function isPolygon() {
    // if it's a polygon, it means the coordinates array is multi dimensional
    return this._layer instanceof L.Polygon;
  }
});
/* harmony default export */ __webpack_exports__["a"] = (Edit);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module helpers
 */
/**
 * Earth Radius used with the Harvesine formula and approximates using a spherical (non-ellipsoid) Earth.
 *
 * @memberof helpers
 * @type {number}
 */
exports.earthRadius = 6371008.8;
/**
 * Unit of measurement factors using a spherical (non-ellipsoid) earth radius.
 *
 * @memberof helpers
 * @type {Object}
 */
exports.factors = {
    centimeters: exports.earthRadius * 100,
    centimetres: exports.earthRadius * 100,
    degrees: exports.earthRadius / 111325,
    feet: exports.earthRadius * 3.28084,
    inches: exports.earthRadius * 39.370,
    kilometers: exports.earthRadius / 1000,
    kilometres: exports.earthRadius / 1000,
    meters: exports.earthRadius,
    metres: exports.earthRadius,
    miles: exports.earthRadius / 1609.344,
    millimeters: exports.earthRadius * 1000,
    millimetres: exports.earthRadius * 1000,
    nauticalmiles: exports.earthRadius / 1852,
    radians: 1,
    yards: exports.earthRadius / 1.0936,
};
/**
 * Units of measurement factors based on 1 meter.
 *
 * @memberof helpers
 * @type {Object}
 */
exports.unitsFactors = {
    centimeters: 100,
    centimetres: 100,
    degrees: 1 / 111325,
    feet: 3.28084,
    inches: 39.370,
    kilometers: 1 / 1000,
    kilometres: 1 / 1000,
    meters: 1,
    metres: 1,
    miles: 1 / 1609.344,
    millimeters: 1000,
    millimetres: 1000,
    nauticalmiles: 1 / 1852,
    radians: 1 / exports.earthRadius,
    yards: 1 / 1.0936,
};
/**
 * Area of measurement factors based on 1 square meter.
 *
 * @memberof helpers
 * @type {Object}
 */
exports.areaFactors = {
    acres: 0.000247105,
    centimeters: 10000,
    centimetres: 10000,
    feet: 10.763910417,
    inches: 1550.003100006,
    kilometers: 0.000001,
    kilometres: 0.000001,
    meters: 1,
    metres: 1,
    miles: 3.86e-7,
    millimeters: 1000000,
    millimetres: 1000000,
    yards: 1.195990046,
};
/**
 * Wraps a GeoJSON {@link Geometry} in a GeoJSON {@link Feature}.
 *
 * @name feature
 * @param {Geometry} geometry input geometry
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature} a GeoJSON Feature
 * @example
 * var geometry = {
 *   "type": "Point",
 *   "coordinates": [110, 50]
 * };
 *
 * var feature = turf.feature(geometry);
 *
 * //=feature
 */
function feature(geom, properties, options) {
    if (options === void 0) { options = {}; }
    var feat = { type: "Feature" };
    if (options.id === 0 || options.id) {
        feat.id = options.id;
    }
    if (options.bbox) {
        feat.bbox = options.bbox;
    }
    feat.properties = properties || {};
    feat.geometry = geom;
    return feat;
}
exports.feature = feature;
/**
 * Creates a GeoJSON {@link Geometry} from a Geometry string type & coordinates.
 * For GeometryCollection type use `helpers.geometryCollection`
 *
 * @name geometry
 * @param {string} type Geometry Type
 * @param {Array<any>} coordinates Coordinates
 * @param {Object} [options={}] Optional Parameters
 * @returns {Geometry} a GeoJSON Geometry
 * @example
 * var type = "Point";
 * var coordinates = [110, 50];
 * var geometry = turf.geometry(type, coordinates);
 * // => geometry
 */
function geometry(type, coordinates, options) {
    if (options === void 0) { options = {}; }
    switch (type) {
        case "Point": return point(coordinates).geometry;
        case "LineString": return lineString(coordinates).geometry;
        case "Polygon": return polygon(coordinates).geometry;
        case "MultiPoint": return multiPoint(coordinates).geometry;
        case "MultiLineString": return multiLineString(coordinates).geometry;
        case "MultiPolygon": return multiPolygon(coordinates).geometry;
        default: throw new Error(type + " is invalid");
    }
}
exports.geometry = geometry;
/**
 * Creates a {@link Point} {@link Feature} from a Position.
 *
 * @name point
 * @param {Array<number>} coordinates longitude, latitude position (each in decimal degrees)
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<Point>} a Point feature
 * @example
 * var point = turf.point([-75.343, 39.984]);
 *
 * //=point
 */
function point(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "Point",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
exports.point = point;
/**
 * Creates a {@link Point} {@link FeatureCollection} from an Array of Point coordinates.
 *
 * @name points
 * @param {Array<Array<number>>} coordinates an array of Points
 * @param {Object} [properties={}] Translate these properties to each Feature
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north]
 * associated with the FeatureCollection
 * @param {string|number} [options.id] Identifier associated with the FeatureCollection
 * @returns {FeatureCollection<Point>} Point Feature
 * @example
 * var points = turf.points([
 *   [-75, 39],
 *   [-80, 45],
 *   [-78, 50]
 * ]);
 *
 * //=points
 */
function points(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    return featureCollection(coordinates.map(function (coords) {
        return point(coords, properties);
    }), options);
}
exports.points = points;
/**
 * Creates a {@link Polygon} {@link Feature} from an Array of LinearRings.
 *
 * @name polygon
 * @param {Array<Array<Array<number>>>} coordinates an array of LinearRings
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<Polygon>} Polygon Feature
 * @example
 * var polygon = turf.polygon([[[-5, 52], [-4, 56], [-2, 51], [-7, 54], [-5, 52]]], { name: 'poly1' });
 *
 * //=polygon
 */
function polygon(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    for (var _i = 0, coordinates_1 = coordinates; _i < coordinates_1.length; _i++) {
        var ring = coordinates_1[_i];
        if (ring.length < 4) {
            throw new Error("Each LinearRing of a Polygon must have 4 or more Positions.");
        }
        for (var j = 0; j < ring[ring.length - 1].length; j++) {
            // Check if first point of Polygon contains two numbers
            if (ring[ring.length - 1][j] !== ring[0][j]) {
                throw new Error("First and last Position are not equivalent.");
            }
        }
    }
    var geom = {
        type: "Polygon",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
exports.polygon = polygon;
/**
 * Creates a {@link Polygon} {@link FeatureCollection} from an Array of Polygon coordinates.
 *
 * @name polygons
 * @param {Array<Array<Array<Array<number>>>>} coordinates an array of Polygon coordinates
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the FeatureCollection
 * @returns {FeatureCollection<Polygon>} Polygon FeatureCollection
 * @example
 * var polygons = turf.polygons([
 *   [[[-5, 52], [-4, 56], [-2, 51], [-7, 54], [-5, 52]]],
 *   [[[-15, 42], [-14, 46], [-12, 41], [-17, 44], [-15, 42]]],
 * ]);
 *
 * //=polygons
 */
function polygons(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    return featureCollection(coordinates.map(function (coords) {
        return polygon(coords, properties);
    }), options);
}
exports.polygons = polygons;
/**
 * Creates a {@link LineString} {@link Feature} from an Array of Positions.
 *
 * @name lineString
 * @param {Array<Array<number>>} coordinates an array of Positions
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<LineString>} LineString Feature
 * @example
 * var linestring1 = turf.lineString([[-24, 63], [-23, 60], [-25, 65], [-20, 69]], {name: 'line 1'});
 * var linestring2 = turf.lineString([[-14, 43], [-13, 40], [-15, 45], [-10, 49]], {name: 'line 2'});
 *
 * //=linestring1
 * //=linestring2
 */
function lineString(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    if (coordinates.length < 2) {
        throw new Error("coordinates must be an array of two or more positions");
    }
    var geom = {
        type: "LineString",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
exports.lineString = lineString;
/**
 * Creates a {@link LineString} {@link FeatureCollection} from an Array of LineString coordinates.
 *
 * @name lineStrings
 * @param {Array<Array<Array<number>>>} coordinates an array of LinearRings
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north]
 * associated with the FeatureCollection
 * @param {string|number} [options.id] Identifier associated with the FeatureCollection
 * @returns {FeatureCollection<LineString>} LineString FeatureCollection
 * @example
 * var linestrings = turf.lineStrings([
 *   [[-24, 63], [-23, 60], [-25, 65], [-20, 69]],
 *   [[-14, 43], [-13, 40], [-15, 45], [-10, 49]]
 * ]);
 *
 * //=linestrings
 */
function lineStrings(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    return featureCollection(coordinates.map(function (coords) {
        return lineString(coords, properties);
    }), options);
}
exports.lineStrings = lineStrings;
/**
 * Takes one or more {@link Feature|Features} and creates a {@link FeatureCollection}.
 *
 * @name featureCollection
 * @param {Feature[]} features input features
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {FeatureCollection} FeatureCollection of Features
 * @example
 * var locationA = turf.point([-75.343, 39.984], {name: 'Location A'});
 * var locationB = turf.point([-75.833, 39.284], {name: 'Location B'});
 * var locationC = turf.point([-75.534, 39.123], {name: 'Location C'});
 *
 * var collection = turf.featureCollection([
 *   locationA,
 *   locationB,
 *   locationC
 * ]);
 *
 * //=collection
 */
function featureCollection(features, options) {
    if (options === void 0) { options = {}; }
    var fc = { type: "FeatureCollection" };
    if (options.id) {
        fc.id = options.id;
    }
    if (options.bbox) {
        fc.bbox = options.bbox;
    }
    fc.features = features;
    return fc;
}
exports.featureCollection = featureCollection;
/**
 * Creates a {@link Feature<MultiLineString>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name multiLineString
 * @param {Array<Array<Array<number>>>} coordinates an array of LineStrings
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<MultiLineString>} a MultiLineString feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var multiLine = turf.multiLineString([[[0,0],[10,10]]]);
 *
 * //=multiLine
 */
function multiLineString(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "MultiLineString",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
exports.multiLineString = multiLineString;
/**
 * Creates a {@link Feature<MultiPoint>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name multiPoint
 * @param {Array<Array<number>>} coordinates an array of Positions
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<MultiPoint>} a MultiPoint feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var multiPt = turf.multiPoint([[0,0],[10,10]]);
 *
 * //=multiPt
 */
function multiPoint(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "MultiPoint",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
exports.multiPoint = multiPoint;
/**
 * Creates a {@link Feature<MultiPolygon>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name multiPolygon
 * @param {Array<Array<Array<Array<number>>>>} coordinates an array of Polygons
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<MultiPolygon>} a multipolygon feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var multiPoly = turf.multiPolygon([[[[0,0],[0,10],[10,10],[10,0],[0,0]]]]);
 *
 * //=multiPoly
 *
 */
function multiPolygon(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "MultiPolygon",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
exports.multiPolygon = multiPolygon;
/**
 * Creates a {@link Feature<GeometryCollection>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name geometryCollection
 * @param {Array<Geometry>} geometries an array of GeoJSON Geometries
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<GeometryCollection>} a GeoJSON GeometryCollection Feature
 * @example
 * var pt = turf.geometry("Point", [100, 0]);
 * var line = turf.geometry("LineString", [[101, 0], [102, 1]]);
 * var collection = turf.geometryCollection([pt, line]);
 *
 * // => collection
 */
function geometryCollection(geometries, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "GeometryCollection",
        geometries: geometries,
    };
    return feature(geom, properties, options);
}
exports.geometryCollection = geometryCollection;
/**
 * Round number to precision
 *
 * @param {number} num Number
 * @param {number} [precision=0] Precision
 * @returns {number} rounded number
 * @example
 * turf.round(120.4321)
 * //=120
 *
 * turf.round(120.4321, 2)
 * //=120.43
 */
function round(num, precision) {
    if (precision === void 0) { precision = 0; }
    if (precision && !(precision >= 0)) {
        throw new Error("precision must be a positive number");
    }
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(num * multiplier) / multiplier;
}
exports.round = round;
/**
 * Convert a distance measurement (assuming a spherical Earth) from radians to a more friendly unit.
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @name radiansToLength
 * @param {number} radians in radians across the sphere
 * @param {string} [units="kilometers"] can be degrees, radians, miles, or kilometers inches, yards, metres,
 * meters, kilometres, kilometers.
 * @returns {number} distance
 */
function radiansToLength(radians, units) {
    if (units === void 0) { units = "kilometers"; }
    var factor = exports.factors[units];
    if (!factor) {
        throw new Error(units + " units is invalid");
    }
    return radians * factor;
}
exports.radiansToLength = radiansToLength;
/**
 * Convert a distance measurement (assuming a spherical Earth) from a real-world unit into radians
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @name lengthToRadians
 * @param {number} distance in real units
 * @param {string} [units="kilometers"] can be degrees, radians, miles, or kilometers inches, yards, metres,
 * meters, kilometres, kilometers.
 * @returns {number} radians
 */
function lengthToRadians(distance, units) {
    if (units === void 0) { units = "kilometers"; }
    var factor = exports.factors[units];
    if (!factor) {
        throw new Error(units + " units is invalid");
    }
    return distance / factor;
}
exports.lengthToRadians = lengthToRadians;
/**
 * Convert a distance measurement (assuming a spherical Earth) from a real-world unit into degrees
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, centimeters, kilometres, feet
 *
 * @name lengthToDegrees
 * @param {number} distance in real units
 * @param {string} [units="kilometers"] can be degrees, radians, miles, or kilometers inches, yards, metres,
 * meters, kilometres, kilometers.
 * @returns {number} degrees
 */
function lengthToDegrees(distance, units) {
    return radiansToDegrees(lengthToRadians(distance, units));
}
exports.lengthToDegrees = lengthToDegrees;
/**
 * Converts any bearing angle from the north line direction (positive clockwise)
 * and returns an angle between 0-360 degrees (positive clockwise), 0 being the north line
 *
 * @name bearingToAzimuth
 * @param {number} bearing angle, between -180 and +180 degrees
 * @returns {number} angle between 0 and 360 degrees
 */
function bearingToAzimuth(bearing) {
    var angle = bearing % 360;
    if (angle < 0) {
        angle += 360;
    }
    return angle;
}
exports.bearingToAzimuth = bearingToAzimuth;
/**
 * Converts an angle in radians to degrees
 *
 * @name radiansToDegrees
 * @param {number} radians angle in radians
 * @returns {number} degrees between 0 and 360 degrees
 */
function radiansToDegrees(radians) {
    var degrees = radians % (2 * Math.PI);
    return degrees * 180 / Math.PI;
}
exports.radiansToDegrees = radiansToDegrees;
/**
 * Converts an angle in degrees to radians
 *
 * @name degreesToRadians
 * @param {number} degrees angle between 0 and 360 degrees
 * @returns {number} angle in radians
 */
function degreesToRadians(degrees) {
    var radians = degrees % 360;
    return radians * Math.PI / 180;
}
exports.degreesToRadians = degreesToRadians;
/**
 * Converts a length to the requested unit.
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @param {number} length to be converted
 * @param {Units} [originalUnit="kilometers"] of the length
 * @param {Units} [finalUnit="kilometers"] returned unit
 * @returns {number} the converted length
 */
function convertLength(length, originalUnit, finalUnit) {
    if (originalUnit === void 0) { originalUnit = "kilometers"; }
    if (finalUnit === void 0) { finalUnit = "kilometers"; }
    if (!(length >= 0)) {
        throw new Error("length must be a positive number");
    }
    return radiansToLength(lengthToRadians(length, originalUnit), finalUnit);
}
exports.convertLength = convertLength;
/**
 * Converts a area to the requested unit.
 * Valid units: kilometers, kilometres, meters, metres, centimetres, millimeters, acres, miles, yards, feet, inches
 * @param {number} area to be converted
 * @param {Units} [originalUnit="meters"] of the distance
 * @param {Units} [finalUnit="kilometers"] returned unit
 * @returns {number} the converted distance
 */
function convertArea(area, originalUnit, finalUnit) {
    if (originalUnit === void 0) { originalUnit = "meters"; }
    if (finalUnit === void 0) { finalUnit = "kilometers"; }
    if (!(area >= 0)) {
        throw new Error("area must be a positive number");
    }
    var startFactor = exports.areaFactors[originalUnit];
    if (!startFactor) {
        throw new Error("invalid original units");
    }
    var finalFactor = exports.areaFactors[finalUnit];
    if (!finalFactor) {
        throw new Error("invalid final units");
    }
    return (area / startFactor) * finalFactor;
}
exports.convertArea = convertArea;
/**
 * isNumber
 *
 * @param {*} num Number to validate
 * @returns {boolean} true/false
 * @example
 * turf.isNumber(123)
 * //=true
 * turf.isNumber('foo')
 * //=false
 */
function isNumber(num) {
    return !isNaN(num) && num !== null && !Array.isArray(num) && !/^\s*$/.test(num);
}
exports.isNumber = isNumber;
/**
 * isObject
 *
 * @param {*} input variable to validate
 * @returns {boolean} true/false
 * @example
 * turf.isObject({elevation: 10})
 * //=true
 * turf.isObject('foo')
 * //=false
 */
function isObject(input) {
    return (!!input) && (input.constructor === Object);
}
exports.isObject = isObject;
/**
 * Validate BBox
 *
 * @private
 * @param {Array<number>} bbox BBox to validate
 * @returns {void}
 * @throws Error if BBox is not valid
 * @example
 * validateBBox([-180, -40, 110, 50])
 * //=OK
 * validateBBox([-180, -40])
 * //=Error
 * validateBBox('Foo')
 * //=Error
 * validateBBox(5)
 * //=Error
 * validateBBox(null)
 * //=Error
 * validateBBox(undefined)
 * //=Error
 */
function validateBBox(bbox) {
    if (!bbox) {
        throw new Error("bbox is required");
    }
    if (!Array.isArray(bbox)) {
        throw new Error("bbox must be an Array");
    }
    if (bbox.length !== 4 && bbox.length !== 6) {
        throw new Error("bbox must be an Array of 4 or 6 numbers");
    }
    bbox.forEach(function (num) {
        if (!isNumber(num)) {
            throw new Error("bbox must only contain numbers");
        }
    });
}
exports.validateBBox = validateBBox;
/**
 * Validate Id
 *
 * @private
 * @param {string|number} id Id to validate
 * @returns {void}
 * @throws Error if Id is not valid
 * @example
 * validateId([-180, -40, 110, 50])
 * //=Error
 * validateId([-180, -40])
 * //=Error
 * validateId('Foo')
 * //=OK
 * validateId(5)
 * //=OK
 * validateId(null)
 * //=Error
 * validateId(undefined)
 * //=Error
 */
function validateId(id) {
    if (!id) {
        throw new Error("id is required");
    }
    if (["string", "number"].indexOf(typeof id) === -1) {
        throw new Error("id must be a number or a string");
    }
}
exports.validateId = validateId;
// Deprecated methods
function radians2degrees() {
    throw new Error("method has been renamed to `radiansToDegrees`");
}
exports.radians2degrees = radians2degrees;
function degrees2radians() {
    throw new Error("method has been renamed to `degreesToRadians`");
}
exports.degrees2radians = degrees2radians;
function distanceToDegrees() {
    throw new Error("method has been renamed to `lengthToDegrees`");
}
exports.distanceToDegrees = distanceToDegrees;
function distanceToRadians() {
    throw new Error("method has been renamed to `lengthToRadians`");
}
exports.distanceToRadians = distanceToRadians;
function radiansToDistance() {
    throw new Error("method has been renamed to `radiansToLength`");
}
exports.radiansToDistance = radiansToDistance;
function bearingToAngle() {
    throw new Error("method has been renamed to `bearingToAzimuth`");
}
exports.bearingToAngle = bearingToAngle;
function convertDistance() {
    throw new Error("method has been renamed to `convertLength`");
}
exports.convertDistance = convertDistance;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(17);

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(69);

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var isKeyable = __webpack_require__(75);

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * martinez v0.4.3
 * Martinez polygon clipping algorithm, does boolean operation on polygons (multipolygons, polygons with holes etc): intersection, union, difference, xor
 *
 * @author Alex Milevski <info@w8r.name>
 * @license MIT
 * @preserve
 */

(function (global, factory) {
   true ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.martinez = {})));
}(this, (function (exports) { 'use strict';

  function DEFAULT_COMPARE (a, b) { return a > b ? 1 : a < b ? -1 : 0; }

  var SplayTree = function SplayTree(compare, noDuplicates) {
    if ( compare === void 0 ) compare = DEFAULT_COMPARE;
    if ( noDuplicates === void 0 ) noDuplicates = false;

    this._compare = compare;
    this._root = null;
    this._size = 0;
    this._noDuplicates = !!noDuplicates;
  };

  var prototypeAccessors = { size: { configurable: true } };


  SplayTree.prototype.rotateLeft = function rotateLeft (x) {
    var y = x.right;
    if (y) {
      x.right = y.left;
      if (y.left) { y.left.parent = x; }
      y.parent = x.parent;
    }

    if (!x.parent)              { this._root = y; }
    else if (x === x.parent.left) { x.parent.left = y; }
    else                        { x.parent.right = y; }
    if (y) { y.left = x; }
    x.parent = y;
  };


  SplayTree.prototype.rotateRight = function rotateRight (x) {
    var y = x.left;
    if (y) {
      x.left = y.right;
      if (y.right) { y.right.parent = x; }
      y.parent = x.parent;
    }

    if (!x.parent)             { this._root = y; }
    else if(x === x.parent.left) { x.parent.left = y; }
    else                       { x.parent.right = y; }
    if (y) { y.right = x; }
    x.parent = y;
  };


  SplayTree.prototype._splay = function _splay (x) {
      var this$1 = this;

    while (x.parent) {
      var p = x.parent;
      if (!p.parent) {
        if (p.left === x) { this$1.rotateRight(p); }
        else            { this$1.rotateLeft(p); }
      } else if (p.left === x && p.parent.left === p) {
        this$1.rotateRight(p.parent);
        this$1.rotateRight(p);
      } else if (p.right === x && p.parent.right === p) {
        this$1.rotateLeft(p.parent);
        this$1.rotateLeft(p);
      } else if (p.left === x && p.parent.right === p) {
        this$1.rotateRight(p);
        this$1.rotateLeft(p);
      } else {
        this$1.rotateLeft(p);
        this$1.rotateRight(p);
      }
    }
  };


  SplayTree.prototype.splay = function splay (x) {
      var this$1 = this;

    var p, gp, ggp, l, r;

    while (x.parent) {
      p = x.parent;
      gp = p.parent;

      if (gp && gp.parent) {
        ggp = gp.parent;
        if (ggp.left === gp) { ggp.left= x; }
        else               { ggp.right = x; }
        x.parent = ggp;
      } else {
        x.parent = null;
        this$1._root = x;
      }

      l = x.left; r = x.right;

      if (x === p.left) { // left
        if (gp) {
          if (gp.left === p) {
            /* zig-zig */
            if (p.right) {
              gp.left = p.right;
              gp.left.parent = gp;
            } else { gp.left = null; }

            p.right = gp;
            gp.parent = p;
          } else {
            /* zig-zag */
            if (l) {
              gp.right = l;
              l.parent = gp;
            } else { gp.right = null; }

            x.left  = gp;
            gp.parent = x;
          }
        }
        if (r) {
          p.left = r;
          r.parent = p;
        } else { p.left = null; }

        x.right= p;
        p.parent = x;
      } else { // right
        if (gp) {
          if (gp.right === p) {
            /* zig-zig */
            if (p.left) {
              gp.right = p.left;
              gp.right.parent = gp;
            } else { gp.right = null; }

            p.left = gp;
            gp.parent = p;
          } else {
            /* zig-zag */
            if (r) {
              gp.left = r;
              r.parent = gp;
            } else { gp.left = null; }

            x.right = gp;
            gp.parent = x;
          }
        }
        if (l) {
          p.right = l;
          l.parent = p;
        } else { p.right = null; }

        x.left = p;
        p.parent = x;
      }
    }
  };


  SplayTree.prototype.replace = function replace (u, v) {
    if (!u.parent) { this._root = v; }
    else if (u === u.parent.left) { u.parent.left = v; }
    else { u.parent.right = v; }
    if (v) { v.parent = u.parent; }
  };


  SplayTree.prototype.minNode = function minNode (u) {
      if ( u === void 0 ) u = this._root;

    if (u) { while (u.left) { u = u.left; } }
    return u;
  };


  SplayTree.prototype.maxNode = function maxNode (u) {
      if ( u === void 0 ) u = this._root;

    if (u) { while (u.right) { u = u.right; } }
    return u;
  };


  SplayTree.prototype.insert = function insert (key, data) {
    var z = this._root;
    var p = null;
    var comp = this._compare;
    var cmp;

    if (this._noDuplicates) {
      while (z) {
        p = z;
        cmp = comp(z.key, key);
        if (cmp === 0) { return; }
        else if (comp(z.key, key) < 0) { z = z.right; }
        else { z = z.left; }
      }
    } else {
      while (z) {
        p = z;
        if (comp(z.key, key) < 0) { z = z.right; }
        else { z = z.left; }
      }
    }

    z = { key: key, data: data, left: null, right: null, parent: p };

    if (!p)                        { this._root = z; }
    else if (comp(p.key, z.key) < 0) { p.right = z; }
    else                           { p.left= z; }

    this.splay(z);
    this._size++;
    return z;
  };


  SplayTree.prototype.find = function find (key) {
    var z  = this._root;
    var comp = this._compare;
    while (z) {
      var cmp = comp(z.key, key);
      if    (cmp < 0) { z = z.right; }
      else if (cmp > 0) { z = z.left; }
      else            { return z; }
    }
    return null;
  };

  /**
   * Whether the tree contains a node with the given key
   * @param{Key} key
   * @return {boolean} true/false
   */
  SplayTree.prototype.contains = function contains (key) {
    var node     = this._root;
    var comparator = this._compare;
    while (node){
      var cmp = comparator(key, node.key);
      if    (cmp === 0) { return true; }
      else if (cmp < 0) { node = node.left; }
      else              { node = node.right; }
    }

    return false;
  };


  SplayTree.prototype.remove = function remove (key) {
    var z = this.find(key);

    if (!z) { return false; }

    this.splay(z);

    if (!z.left) { this.replace(z, z.right); }
    else if (!z.right) { this.replace(z, z.left); }
    else {
      var y = this.minNode(z.right);
      if (y.parent !== z) {
        this.replace(y, y.right);
        y.right = z.right;
        y.right.parent = y;
      }
      this.replace(z, y);
      y.left = z.left;
      y.left.parent = y;
    }

    this._size--;
    return true;
  };


  SplayTree.prototype.removeNode = function removeNode (z) {
    if (!z) { return false; }

    this.splay(z);

    if (!z.left) { this.replace(z, z.right); }
    else if (!z.right) { this.replace(z, z.left); }
    else {
      var y = this.minNode(z.right);
      if (y.parent !== z) {
        this.replace(y, y.right);
        y.right = z.right;
        y.right.parent = y;
      }
      this.replace(z, y);
      y.left = z.left;
      y.left.parent = y;
    }

    this._size--;
    return true;
  };


  SplayTree.prototype.erase = function erase (key) {
    var z = this.find(key);
    if (!z) { return; }

    this.splay(z);

    var s = z.left;
    var t = z.right;

    var sMax = null;
    if (s) {
      s.parent = null;
      sMax = this.maxNode(s);
      this.splay(sMax);
      this._root = sMax;
    }
    if (t) {
      if (s) { sMax.right = t; }
      else { this._root = t; }
      t.parent = sMax;
    }

    this._size--;
  };

  /**
   * Removes and returns the node with smallest key
   * @return {?Node}
   */
  SplayTree.prototype.pop = function pop () {
    var node = this._root, returnValue = null;
    if (node) {
      while (node.left) { node = node.left; }
      returnValue = { key: node.key, data: node.data };
      this.remove(node.key);
    }
    return returnValue;
  };


  /* eslint-disable class-methods-use-this */

  /**
   * Successor node
   * @param{Node} node
   * @return {?Node}
   */
  SplayTree.prototype.next = function next (node) {
    var successor = node;
    if (successor) {
      if (successor.right) {
        successor = successor.right;
        while (successor && successor.left) { successor = successor.left; }
      } else {
        successor = node.parent;
        while (successor && successor.right === node) {
          node = successor; successor = successor.parent;
        }
      }
    }
    return successor;
  };


  /**
   * Predecessor node
   * @param{Node} node
   * @return {?Node}
   */
  SplayTree.prototype.prev = function prev (node) {
    var predecessor = node;
    if (predecessor) {
      if (predecessor.left) {
        predecessor = predecessor.left;
        while (predecessor && predecessor.right) { predecessor = predecessor.right; }
      } else {
        predecessor = node.parent;
        while (predecessor && predecessor.left === node) {
          node = predecessor;
          predecessor = predecessor.parent;
        }
      }
    }
    return predecessor;
  };
  /* eslint-enable class-methods-use-this */


  /**
   * @param{forEachCallback} callback
   * @return {SplayTree}
   */
  SplayTree.prototype.forEach = function forEach (callback) {
    var current = this._root;
    var s = [], done = false, i = 0;

    while (!done) {
      // Reach the left most Node of the current Node
      if (current) {
        // Place pointer to a tree node on the stack
        // before traversing the node's left subtree
        s.push(current);
        current = current.left;
      } else {
        // BackTrack from the empty subtree and visit the Node
        // at the top of the stack; however, if the stack is
        // empty you are done
        if (s.length > 0) {
          current = s.pop();
          callback(current, i++);

          // We have visited the node and its left
          // subtree. Now, it's right subtree's turn
          current = current.right;
        } else { done = true; }
      }
    }
    return this;
  };


  /**
   * Walk key range from `low` to `high`. Stops if `fn` returns a value.
   * @param{Key}    low
   * @param{Key}    high
   * @param{Function} fn
   * @param{*?}     ctx
   * @return {SplayTree}
   */
  SplayTree.prototype.range = function range (low, high, fn, ctx) {
      var this$1 = this;

    var Q = [];
    var compare = this._compare;
    var node = this._root, cmp;

    while (Q.length !== 0 || node) {
      if (node) {
        Q.push(node);
        node = node.left;
      } else {
        node = Q.pop();
        cmp = compare(node.key, high);
        if (cmp > 0) {
          break;
        } else if (compare(node.key, low) >= 0) {
          if (fn.call(ctx, node)) { return this$1; } // stop if smth is returned
        }
        node = node.right;
      }
    }
    return this;
  };

  /**
   * Returns all keys in order
   * @return {Array<Key>}
   */
  SplayTree.prototype.keys = function keys () {
    var current = this._root;
    var s = [], r = [], done = false;

    while (!done) {
      if (current) {
        s.push(current);
        current = current.left;
      } else {
        if (s.length > 0) {
          current = s.pop();
          r.push(current.key);
          current = current.right;
        } else { done = true; }
      }
    }
    return r;
  };


  /**
   * Returns `data` fields of all nodes in order.
   * @return {Array<Value>}
   */
  SplayTree.prototype.values = function values () {
    var current = this._root;
    var s = [], r = [], done = false;

    while (!done) {
      if (current) {
        s.push(current);
        current = current.left;
      } else {
        if (s.length > 0) {
          current = s.pop();
          r.push(current.data);
          current = current.right;
        } else { done = true; }
      }
    }
    return r;
  };


  /**
   * Returns node at given index
   * @param{number} index
   * @return {?Node}
   */
  SplayTree.prototype.at = function at (index) {
    // removed after a consideration, more misleading than useful
    // index = index % this.size;
    // if (index < 0) index = this.size - index;

    var current = this._root;
    var s = [], done = false, i = 0;

    while (!done) {
      if (current) {
        s.push(current);
        current = current.left;
      } else {
        if (s.length > 0) {
          current = s.pop();
          if (i === index) { return current; }
          i++;
          current = current.right;
        } else { done = true; }
      }
    }
    return null;
  };

  /**
   * Bulk-load items. Both array have to be same size
   * @param{Array<Key>}  keys
   * @param{Array<Value>}[values]
   * @param{Boolean}     [presort=false] Pre-sort keys and values, using
   *                                       tree's comparator. Sorting is done
   *                                       in-place
   * @return {AVLTree}
   */
  SplayTree.prototype.load = function load (keys, values, presort) {
      if ( keys === void 0 ) keys = [];
      if ( values === void 0 ) values = [];
      if ( presort === void 0 ) presort = false;

    if (this._size !== 0) { throw new Error('bulk-load: tree is not empty'); }
    var size = keys.length;
    if (presort) { sort(keys, values, 0, size - 1, this._compare); }
    this._root = loadRecursive(null, keys, values, 0, size);
    this._size = size;
    return this;
  };


  SplayTree.prototype.min = function min () {
    var node = this.minNode(this._root);
    if (node) { return node.key; }
    else    { return null; }
  };


  SplayTree.prototype.max = function max () {
    var node = this.maxNode(this._root);
    if (node) { return node.key; }
    else    { return null; }
  };

  SplayTree.prototype.isEmpty = function isEmpty () { return this._root === null; };
  prototypeAccessors.size.get = function () { return this._size; };


  /**
   * Create a tree and load it with items
   * @param{Array<Key>}        keys
   * @param{Array<Value>?}      [values]

   * @param{Function?}          [comparator]
   * @param{Boolean?}           [presort=false] Pre-sort keys and values, using
   *                                             tree's comparator. Sorting is done
   *                                             in-place
   * @param{Boolean?}           [noDuplicates=false] Allow duplicates
   * @return {SplayTree}
   */
  SplayTree.createTree = function createTree (keys, values, comparator, presort, noDuplicates) {
    return new SplayTree(comparator, noDuplicates).load(keys, values, presort);
  };

  Object.defineProperties( SplayTree.prototype, prototypeAccessors );


  function loadRecursive (parent, keys, values, start, end) {
    var size = end - start;
    if (size > 0) {
      var middle = start + Math.floor(size / 2);
      var key    = keys[middle];
      var data   = values[middle];
      var node   = { key: key, data: data, parent: parent };
      node.left    = loadRecursive(node, keys, values, start, middle);
      node.right   = loadRecursive(node, keys, values, middle + 1, end);
      return node;
    }
    return null;
  }


  function sort(keys, values, left, right, compare) {
    if (left >= right) { return; }

    var pivot = keys[(left + right) >> 1];
    var i = left - 1;
    var j = right + 1;

    while (true) {
      do { i++; } while (compare(keys[i], pivot) < 0);
      do { j--; } while (compare(keys[j], pivot) > 0);
      if (i >= j) { break; }

      var tmp = keys[i];
      keys[i] = keys[j];
      keys[j] = tmp;

      tmp = values[i];
      values[i] = values[j];
      values[j] = tmp;
    }

    sort(keys, values,  left,     j, compare);
    sort(keys, values, j + 1, right, compare);
  }

  var NORMAL               = 0;
  var NON_CONTRIBUTING     = 1;
  var SAME_TRANSITION      = 2;
  var DIFFERENT_TRANSITION = 3;

  var INTERSECTION = 0;
  var UNION        = 1;
  var DIFFERENCE   = 2;
  var XOR          = 3;

  /**
   * @param  {SweepEvent} event
   * @param  {SweepEvent} prev
   * @param  {Operation} operation
   */
  function computeFields (event, prev, operation) {
    // compute inOut and otherInOut fields
    if (prev === null) {
      event.inOut      = false;
      event.otherInOut = true;

    // previous line segment in sweepline belongs to the same polygon
    } else {
      if (event.isSubject === prev.isSubject) {
        event.inOut      = !prev.inOut;
        event.otherInOut = prev.otherInOut;

      // previous line segment in sweepline belongs to the clipping polygon
      } else {
        event.inOut      = !prev.otherInOut;
        event.otherInOut = prev.isVertical() ? !prev.inOut : prev.inOut;
      }

      // compute prevInResult field
      if (prev) {
        event.prevInResult = (!inResult(prev, operation) || prev.isVertical())
          ? prev.prevInResult : prev;
      }
    }

    // check if the line segment belongs to the Boolean operation
    event.inResult = inResult(event, operation);
  }


  /* eslint-disable indent */
  function inResult(event, operation) {
    switch (event.type) {
      case NORMAL:
        switch (operation) {
          case INTERSECTION:
            return !event.otherInOut;
          case UNION:
            return event.otherInOut;
          case DIFFERENCE:
            // return (event.isSubject && !event.otherInOut) ||
            //         (!event.isSubject && event.otherInOut);
            return (event.isSubject && event.otherInOut) ||
                    (!event.isSubject && !event.otherInOut);
          case XOR:
            return true;
        }
        break;
      case SAME_TRANSITION:
        return operation === INTERSECTION || operation === UNION;
      case DIFFERENT_TRANSITION:
        return operation === DIFFERENCE;
      case NON_CONTRIBUTING:
        return false;
    }
    return false;
  }
  /* eslint-enable indent */

  var SweepEvent = function SweepEvent (point, left, otherEvent, isSubject, edgeType) {

    /**
     * Is left endpoint?
     * @type {Boolean}
     */
    this.left = left;

    /**
     * @type {Array.<Number>}
     */
    this.point = point;

    /**
     * Other edge reference
     * @type {SweepEvent}
     */
    this.otherEvent = otherEvent;

    /**
     * Belongs to source or clipping polygon
     * @type {Boolean}
     */
    this.isSubject = isSubject;

    /**
     * Edge contribution type
     * @type {Number}
     */
    this.type = edgeType || NORMAL;


    /**
     * In-out transition for the sweepline crossing polygon
     * @type {Boolean}
     */
    this.inOut = false;


    /**
     * @type {Boolean}
     */
    this.otherInOut = false;

    /**
     * Previous event in result?
     * @type {SweepEvent}
     */
    this.prevInResult = null;

    /**
     * Does event belong to result?
     * @type {Boolean}
     */
    this.inResult = false;


    // connection step

    /**
     * @type {Boolean}
     */
    this.resultInOut = false;

    this.isExteriorRing = true;
  };


  /**
   * @param{Array.<Number>}p
   * @return {Boolean}
   */
  SweepEvent.prototype.isBelow = function isBelow (p) {
    var p0 = this.point, p1 = this.otherEvent.point;
    return this.left
      ? (p0[0] - p[0]) * (p1[1] - p[1]) - (p1[0] - p[0]) * (p0[1] - p[1]) > 0
      // signedArea(this.point, this.otherEvent.point, p) > 0 :
      : (p1[0] - p[0]) * (p0[1] - p[1]) - (p0[0] - p[0]) * (p1[1] - p[1]) > 0;
      //signedArea(this.otherEvent.point, this.point, p) > 0;
  };


  /**
   * @param{Array.<Number>}p
   * @return {Boolean}
   */
  SweepEvent.prototype.isAbove = function isAbove (p) {
    return !this.isBelow(p);
  };


  /**
   * @return {Boolean}
   */
  SweepEvent.prototype.isVertical = function isVertical () {
    return this.point[0] === this.otherEvent.point[0];
  };


  SweepEvent.prototype.clone = function clone () {
    var copy = new SweepEvent(
      this.point, this.left, this.otherEvent, this.isSubject, this.type);

    copy.inResult     = this.inResult;
    copy.prevInResult = this.prevInResult;
    copy.isExteriorRing = this.isExteriorRing;
    copy.inOut        = this.inOut;
    copy.otherInOut   = this.otherInOut;

    return copy;
  };

  function equals(p1, p2) {
    if (p1[0] === p2[0]) {
      if (p1[1] === p2[1]) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  // const EPSILON = 1e-9;
  // const abs = Math.abs;
  // TODO https://github.com/w8r/martinez/issues/6#issuecomment-262847164
  // Precision problem.
  //
  // module.exports = function equals(p1, p2) {
  //   return abs(p1[0] - p2[0]) <= EPSILON && abs(p1[1] - p2[1]) <= EPSILON;
  // };

  /**
   * Signed area of the triangle (p0, p1, p2)
   * @param  {Array.<Number>} p0
   * @param  {Array.<Number>} p1
   * @param  {Array.<Number>} p2
   * @return {Number}
   */
  function signedArea(p0, p1, p2) {
    return (p0[0] - p2[0]) * (p1[1] - p2[1]) - (p1[0] - p2[0]) * (p0[1] - p2[1]);
  }

  /**
   * @param  {SweepEvent} e1
   * @param  {SweepEvent} e2
   * @return {Number}
   */
  function compareEvents(e1, e2) {
    var p1 = e1.point;
    var p2 = e2.point;

    // Different x-coordinate
    if (p1[0] > p2[0]) { return 1; }
    if (p1[0] < p2[0]) { return -1; }

    // Different points, but same x-coordinate
    // Event with lower y-coordinate is processed first
    if (p1[1] !== p2[1]) { return p1[1] > p2[1] ? 1 : -1; }

    return specialCases(e1, e2, p1, p2);
  }


  /* eslint-disable no-unused-vars */
  function specialCases(e1, e2, p1, p2) {
    // Same coordinates, but one is a left endpoint and the other is
    // a right endpoint. The right endpoint is processed first
    if (e1.left !== e2.left)
      { return e1.left ? 1 : -1; }

    // const p2 = e1.otherEvent.point, p3 = e2.otherEvent.point;
    // const sa = (p1[0] - p3[0]) * (p2[1] - p3[1]) - (p2[0] - p3[0]) * (p1[1] - p3[1])
    // Same coordinates, both events
    // are left endpoints or right endpoints.
    // not collinear
    if (signedArea(p1, e1.otherEvent.point, e2.otherEvent.point) !== 0) {
      // the event associate to the bottom segment is processed first
      return (!e1.isBelow(e2.otherEvent.point)) ? 1 : -1;
    }

    return (!e1.isSubject && e2.isSubject) ? 1 : -1;
  }
  /* eslint-enable no-unused-vars */

  /**
   * @param  {SweepEvent} se
   * @param  {Array.<Number>} p
   * @param  {Queue} queue
   * @return {Queue}
   */
  function divideSegment(se, p, queue)  {
    var r = new SweepEvent(p, false, se,            se.isSubject);
    var l = new SweepEvent(p, true,  se.otherEvent, se.isSubject);

    /* eslint-disable no-console */
    if (equals(se.point, se.otherEvent.point)) {

      console.warn('what is that, a collapsed segment?', se);
    }
    /* eslint-enable no-console */

    r.contourId = l.contourId = se.contourId;

    // avoid a rounding error. The left event would be processed after the right event
    if (compareEvents(l, se.otherEvent) > 0) {
      se.otherEvent.left = true;
      l.left = false;
    }

    // avoid a rounding error. The left event would be processed after the right event
    // if (compareEvents(se, r) > 0) {}

    se.otherEvent.otherEvent = l;
    se.otherEvent = r;

    queue.push(l);
    queue.push(r);

    return queue;
  }

  //const EPS = 1e-9;

  /**
   * Finds the magnitude of the cross product of two vectors (if we pretend
   * they're in three dimensions)
   *
   * @param {Object} a First vector
   * @param {Object} b Second vector
   * @private
   * @returns {Number} The magnitude of the cross product
   */
  function crossProduct(a, b) {
    return (a[0] * b[1]) - (a[1] * b[0]);
  }

  /**
   * Finds the dot product of two vectors.
   *
   * @param {Object} a First vector
   * @param {Object} b Second vector
   * @private
   * @returns {Number} The dot product
   */
  function dotProduct(a, b) {
    return (a[0] * b[0]) + (a[1] * b[1]);
  }

  /**
   * Finds the intersection (if any) between two line segments a and b, given the
   * line segments' end points a1, a2 and b1, b2.
   *
   * This algorithm is based on Schneider and Eberly.
   * http://www.cimec.org.ar/~ncalvo/Schneider_Eberly.pdf
   * Page 244.
   *
   * @param {Array.<Number>} a1 point of first line
   * @param {Array.<Number>} a2 point of first line
   * @param {Array.<Number>} b1 point of second line
   * @param {Array.<Number>} b2 point of second line
   * @param {Boolean=}       noEndpointTouch whether to skip single touchpoints
   *                                         (meaning connected segments) as
   *                                         intersections
   * @returns {Array.<Array.<Number>>|Null} If the lines intersect, the point of
   * intersection. If they overlap, the two end points of the overlapping segment.
   * Otherwise, null.
   */
  function intersection (a1, a2, b1, b2, noEndpointTouch) {
    // The algorithm expects our lines in the form P + sd, where P is a point,
    // s is on the interval [0, 1], and d is a vector.
    // We are passed two points. P can be the first point of each pair. The
    // vector, then, could be thought of as the distance (in x and y components)
    // from the first point to the second point.
    // So first, let's make our vectors:
    var va = [a2[0] - a1[0], a2[1] - a1[1]];
    var vb = [b2[0] - b1[0], b2[1] - b1[1]];
    // We also define a function to convert back to regular point form:

    /* eslint-disable arrow-body-style */

    function toPoint(p, s, d) {
      return [
        p[0] + s * d[0],
        p[1] + s * d[1]
      ];
    }

    /* eslint-enable arrow-body-style */

    // The rest is pretty much a straight port of the algorithm.
    var e = [b1[0] - a1[0], b1[1] - a1[1]];
    var kross    = crossProduct(va, vb);
    var sqrKross = kross * kross;
    var sqrLenA  = dotProduct(va, va);
    //const sqrLenB  = dotProduct(vb, vb);

    // Check for line intersection. This works because of the properties of the
    // cross product -- specifically, two vectors are parallel if and only if the
    // cross product is the 0 vector. The full calculation involves relative error
    // to account for possible very small line segments. See Schneider & Eberly
    // for details.
    if (sqrKross > 0/* EPS * sqrLenB * sqLenA */) {
      // If they're not parallel, then (because these are line segments) they
      // still might not actually intersect. This code checks that the
      // intersection point of the lines is actually on both line segments.
      var s = crossProduct(e, vb) / kross;
      if (s < 0 || s > 1) {
        // not on line segment a
        return null;
      }
      var t = crossProduct(e, va) / kross;
      if (t < 0 || t > 1) {
        // not on line segment b
        return null;
      }
      if (s === 0 || s === 1) {
        // on an endpoint of line segment a
        return noEndpointTouch ? null : [toPoint(a1, s, va)];
      }
      if (t === 0 || t === 1) {
        // on an endpoint of line segment b
        return noEndpointTouch ? null : [toPoint(b1, t, vb)];
      }
      return [toPoint(a1, s, va)];
    }

    // If we've reached this point, then the lines are either parallel or the
    // same, but the segments could overlap partially or fully, or not at all.
    // So we need to find the overlap, if any. To do that, we can use e, which is
    // the (vector) difference between the two initial points. If this is parallel
    // with the line itself, then the two lines are the same line, and there will
    // be overlap.
    //const sqrLenE = dotProduct(e, e);
    kross = crossProduct(e, va);
    sqrKross = kross * kross;

    if (sqrKross > 0 /* EPS * sqLenB * sqLenE */) {
    // Lines are just parallel, not the same. No overlap.
      return null;
    }

    var sa = dotProduct(va, e) / sqrLenA;
    var sb = sa + dotProduct(va, vb) / sqrLenA;
    var smin = Math.min(sa, sb);
    var smax = Math.max(sa, sb);

    // this is, essentially, the FindIntersection acting on floats from
    // Schneider & Eberly, just inlined into this function.
    if (smin <= 1 && smax >= 0) {

      // overlap on an end point
      if (smin === 1) {
        return noEndpointTouch ? null : [toPoint(a1, smin > 0 ? smin : 0, va)];
      }

      if (smax === 0) {
        return noEndpointTouch ? null : [toPoint(a1, smax < 1 ? smax : 1, va)];
      }

      if (noEndpointTouch && smin === 0 && smax === 1) { return null; }

      // There's overlap on a segment -- two points of intersection. Return both.
      return [
        toPoint(a1, smin > 0 ? smin : 0, va),
        toPoint(a1, smax < 1 ? smax : 1, va)
      ];
    }

    return null;
  }

  /**
   * @param  {SweepEvent} se1
   * @param  {SweepEvent} se2
   * @param  {Queue}      queue
   * @return {Number}
   */
  function possibleIntersection (se1, se2, queue) {
    // that disallows self-intersecting polygons,
    // did cost us half a day, so I'll leave it
    // out of respect
    // if (se1.isSubject === se2.isSubject) return;
    var inter = intersection(
      se1.point, se1.otherEvent.point,
      se2.point, se2.otherEvent.point
    );

    var nintersections = inter ? inter.length : 0;
    if (nintersections === 0) { return 0; } // no intersection

    // the line segments intersect at an endpoint of both line segments
    if ((nintersections === 1) &&
        (equals(se1.point, se2.point) ||
         equals(se1.otherEvent.point, se2.otherEvent.point))) {
      return 0;
    }

    if (nintersections === 2 && se1.isSubject === se2.isSubject) {
      // if(se1.contourId === se2.contourId){
      // console.warn('Edges of the same polygon overlap',
      //   se1.point, se1.otherEvent.point, se2.point, se2.otherEvent.point);
      // }
      //throw new Error('Edges of the same polygon overlap');
      return 0;
    }

    // The line segments associated to se1 and se2 intersect
    if (nintersections === 1) {

      // if the intersection point is not an endpoint of se1
      if (!equals(se1.point, inter[0]) && !equals(se1.otherEvent.point, inter[0])) {
        divideSegment(se1, inter[0], queue);
      }

      // if the intersection point is not an endpoint of se2
      if (!equals(se2.point, inter[0]) && !equals(se2.otherEvent.point, inter[0])) {
        divideSegment(se2, inter[0], queue);
      }
      return 1;
    }

    // The line segments associated to se1 and se2 overlap
    var events        = [];
    var leftCoincide  = false;
    var rightCoincide = false;

    if (equals(se1.point, se2.point)) {
      leftCoincide = true; // linked
    } else if (compareEvents(se1, se2) === 1) {
      events.push(se2, se1);
    } else {
      events.push(se1, se2);
    }

    if (equals(se1.otherEvent.point, se2.otherEvent.point)) {
      rightCoincide = true;
    } else if (compareEvents(se1.otherEvent, se2.otherEvent) === 1) {
      events.push(se2.otherEvent, se1.otherEvent);
    } else {
      events.push(se1.otherEvent, se2.otherEvent);
    }

    if ((leftCoincide && rightCoincide) || leftCoincide) {
      // both line segments are equal or share the left endpoint
      se2.type = NON_CONTRIBUTING;
      se1.type = (se2.inOut === se1.inOut)
        ? SAME_TRANSITION : DIFFERENT_TRANSITION;

      if (leftCoincide && !rightCoincide) {
        // honestly no idea, but changing events selection from [2, 1]
        // to [0, 1] fixes the overlapping self-intersecting polygons issue
        divideSegment(events[1].otherEvent, events[0].point, queue);
      }
      return 2;
    }

    // the line segments share the right endpoint
    if (rightCoincide) {
      divideSegment(events[0], events[1].point, queue);
      return 3;
    }

    // no line segment includes totally the other one
    if (events[0] !== events[3].otherEvent) {
      divideSegment(events[0], events[1].point, queue);
      divideSegment(events[1], events[2].point, queue);
      return 3;
    }

    // one line segment includes the other one
    divideSegment(events[0], events[1].point, queue);
    divideSegment(events[3].otherEvent, events[2].point, queue);

    return 3;
  }

  /**
   * @param  {SweepEvent} le1
   * @param  {SweepEvent} le2
   * @return {Number}
   */
  function compareSegments(le1, le2) {
    if (le1 === le2) { return 0; }

    // Segments are not collinear
    if (signedArea(le1.point, le1.otherEvent.point, le2.point) !== 0 ||
      signedArea(le1.point, le1.otherEvent.point, le2.otherEvent.point) !== 0) {

      // If they share their left endpoint use the right endpoint to sort
      if (equals(le1.point, le2.point)) { return le1.isBelow(le2.otherEvent.point) ? -1 : 1; }

      // Different left endpoint: use the left endpoint to sort
      if (le1.point[0] === le2.point[0]) { return le1.point[1] < le2.point[1] ? -1 : 1; }

      // has the line segment associated to e1 been inserted
      // into S after the line segment associated to e2 ?
      if (compareEvents(le1, le2) === 1) { return le2.isAbove(le1.point) ? -1 : 1; }

      // The line segment associated to e2 has been inserted
      // into S after the line segment associated to e1
      return le1.isBelow(le2.point) ? -1 : 1;
    }

    if (le1.isSubject === le2.isSubject) { // same polygon
      var p1 = le1.point, p2 = le2.point;
      if (p1[0] === p2[0] && p1[1] === p2[1]/*equals(le1.point, le2.point)*/) {
        p1 = le1.otherEvent.point; p2 = le2.otherEvent.point;
        if (p1[0] === p2[0] && p1[1] === p2[1]) { return 0; }
        else { return le1.contourId > le2.contourId ? 1 : -1; }
      }
    } else { // Segments are collinear, but belong to separate polygons
      return le1.isSubject ? -1 : 1;
    }

    return compareEvents(le1, le2) === 1 ? 1 : -1;
  }

  function subdivide(eventQueue, subject, clipping, sbbox, cbbox, operation) {
    var sweepLine = new SplayTree(compareSegments);
    var sortedEvents = [];

    var rightbound = Math.min(sbbox[2], cbbox[2]);

    var prev, next, begin;

    while (eventQueue.length !== 0) {
      var event = eventQueue.pop();
      sortedEvents.push(event);

      // optimization by bboxes for intersection and difference goes here
      if ((operation === INTERSECTION && event.point[0] > rightbound) ||
          (operation === DIFFERENCE   && event.point[0] > sbbox[2])) {
        break;
      }

      if (event.left) {
        next  = prev = sweepLine.insert(event);
        begin = sweepLine.minNode();

        if (prev !== begin) { prev = sweepLine.prev(prev); }
        else                { prev = null; }

        next = sweepLine.next(next);

        var prevEvent = prev ? prev.key : null;
        var prevprevEvent = (void 0);
        computeFields(event, prevEvent, operation);
        if (next) {
          if (possibleIntersection(event, next.key, eventQueue) === 2) {
            computeFields(event, prevEvent, operation);
            computeFields(event, next.key, operation);
          }
        }

        if (prev) {
          if (possibleIntersection(prev.key, event, eventQueue) === 2) {
            var prevprev = prev;
            if (prevprev !== begin) { prevprev = sweepLine.prev(prevprev); }
            else                    { prevprev = null; }

            prevprevEvent = prevprev ? prevprev.key : null;
            computeFields(prevEvent, prevprevEvent, operation);
            computeFields(event,     prevEvent,     operation);
          }
        }
      } else {
        event = event.otherEvent;
        next = prev = sweepLine.find(event);

        if (prev && next) {

          if (prev !== begin) { prev = sweepLine.prev(prev); }
          else                { prev = null; }

          next = sweepLine.next(next);
          sweepLine.remove(event);

          if (next && prev) {
            possibleIntersection(prev.key, next.key, eventQueue);
          }
        }
      }
    }
    return sortedEvents;
  }

  /**
   * @param  {Array.<SweepEvent>} sortedEvents
   * @return {Array.<SweepEvent>}
   */
  function orderEvents(sortedEvents) {
    var event, i, len, tmp;
    var resultEvents = [];
    for (i = 0, len = sortedEvents.length; i < len; i++) {
      event = sortedEvents[i];
      if ((event.left && event.inResult) ||
        (!event.left && event.otherEvent.inResult)) {
        resultEvents.push(event);
      }
    }
    // Due to overlapping edges the resultEvents array can be not wholly sorted
    var sorted = false;
    while (!sorted) {
      sorted = true;
      for (i = 0, len = resultEvents.length; i < len; i++) {
        if ((i + 1) < len &&
          compareEvents(resultEvents[i], resultEvents[i + 1]) === 1) {
          tmp = resultEvents[i];
          resultEvents[i] = resultEvents[i + 1];
          resultEvents[i + 1] = tmp;
          sorted = false;
        }
      }
    }


    for (i = 0, len = resultEvents.length; i < len; i++) {
      event = resultEvents[i];
      event.pos = i;
    }

    // imagine, the right event is found in the beginning of the queue,
    // when his left counterpart is not marked yet
    for (i = 0, len = resultEvents.length; i < len; i++) {
      event = resultEvents[i];
      if (!event.left) {
        tmp = event.pos;
        event.pos = event.otherEvent.pos;
        event.otherEvent.pos = tmp;
      }
    }

    return resultEvents;
  }


  /**
   * @param  {Number} pos
   * @param  {Array.<SweepEvent>} resultEvents
   * @param  {Object>}    processed
   * @return {Number}
   */
  function nextPos(pos, resultEvents, processed, origIndex) {
    var newPos = pos + 1;
    var length = resultEvents.length;
    if (newPos > length - 1) { return pos - 1; }
    var p  = resultEvents[pos].point;
    var p1 = resultEvents[newPos].point;


    // while in range and not the current one by value
    while (newPos < length && p1[0] === p[0] && p1[1] === p[1]) {
      if (!processed[newPos]) {
        return newPos;
      } else   {
        newPos++;
      }
      p1 = resultEvents[newPos].point;
    }

    newPos = pos - 1;

    while (processed[newPos] && newPos >= origIndex) {
      newPos--;
    }
    return newPos;
  }


  /**
   * @param  {Array.<SweepEvent>} sortedEvents
   * @return {Array.<*>} polygons
   */
  function connectEdges(sortedEvents, operation) {
    var i, len;
    var resultEvents = orderEvents(sortedEvents);

    // "false"-filled array
    var processed = {};
    var result = [];
    var event;

    for (i = 0, len = resultEvents.length; i < len; i++) {
      if (processed[i]) { continue; }
      var contour = [[]];

      if (!resultEvents[i].isExteriorRing) {
        if (operation === DIFFERENCE && !resultEvents[i].isSubject && result.length === 0) {
          result.push(contour);
        } else if (result.length === 0) {
          result.push([[contour]]);
        } else {
          result[result.length - 1].push(contour[0]);
        }
      } else if (operation === DIFFERENCE && !resultEvents[i].isSubject && result.length > 1) {
        result[result.length - 1].push(contour[0]);
      } else {
        result.push(contour);
      }

      var ringId = result.length - 1;
      var pos = i;

      var initial = resultEvents[i].point;
      contour[0].push(initial);

      while (pos >= i) {
        event = resultEvents[pos];
        processed[pos] = true;

        if (event.left) {
          event.resultInOut = false;
          event.contourId   = ringId;
        } else {
          event.otherEvent.resultInOut = true;
          event.otherEvent.contourId   = ringId;
        }

        pos = event.pos;
        processed[pos] = true;
        contour[0].push(resultEvents[pos].point);
        pos = nextPos(pos, resultEvents, processed, i);
      }

      pos = pos === -1 ? i : pos;

      event = resultEvents[pos];
      processed[pos] = processed[event.pos] = true;
      event.otherEvent.resultInOut = true;
      event.otherEvent.contourId   = ringId;
    }

    // Handle if the result is a polygon (eg not multipoly)
    // Commented it again, let's see what do we mean by that
    // if (result.length === 1) result = result[0];
    return result;
  }

  var tinyqueue = TinyQueue;
  var default_1 = TinyQueue;

  function TinyQueue(data, compare) {
      var this$1 = this;

      if (!(this instanceof TinyQueue)) { return new TinyQueue(data, compare); }

      this.data = data || [];
      this.length = this.data.length;
      this.compare = compare || defaultCompare;

      if (this.length > 0) {
          for (var i = (this.length >> 1) - 1; i >= 0; i--) { this$1._down(i); }
      }
  }

  function defaultCompare(a, b) {
      return a < b ? -1 : a > b ? 1 : 0;
  }

  TinyQueue.prototype = {

      push: function (item) {
          this.data.push(item);
          this.length++;
          this._up(this.length - 1);
      },

      pop: function () {
          if (this.length === 0) { return undefined; }

          var top = this.data[0];
          this.length--;

          if (this.length > 0) {
              this.data[0] = this.data[this.length];
              this._down(0);
          }
          this.data.pop();

          return top;
      },

      peek: function () {
          return this.data[0];
      },

      _up: function (pos) {
          var data = this.data;
          var compare = this.compare;
          var item = data[pos];

          while (pos > 0) {
              var parent = (pos - 1) >> 1;
              var current = data[parent];
              if (compare(item, current) >= 0) { break; }
              data[pos] = current;
              pos = parent;
          }

          data[pos] = item;
      },

      _down: function (pos) {
          var this$1 = this;

          var data = this.data;
          var compare = this.compare;
          var halfLength = this.length >> 1;
          var item = data[pos];

          while (pos < halfLength) {
              var left = (pos << 1) + 1;
              var right = left + 1;
              var best = data[left];

              if (right < this$1.length && compare(data[right], best) < 0) {
                  left = right;
                  best = data[right];
              }
              if (compare(best, item) >= 0) { break; }

              data[pos] = best;
              pos = left;
          }

          data[pos] = item;
      }
  };
  tinyqueue.default = default_1;

  var max = Math.max;
  var min = Math.min;

  var contourId = 0;


  function processPolygon(contourOrHole, isSubject, depth, Q, bbox, isExteriorRing) {
    var i, len, s1, s2, e1, e2;
    for (i = 0, len = contourOrHole.length - 1; i < len; i++) {
      s1 = contourOrHole[i];
      s2 = contourOrHole[i + 1];
      e1 = new SweepEvent(s1, false, undefined, isSubject);
      e2 = new SweepEvent(s2, false, e1,        isSubject);
      e1.otherEvent = e2;

      if (s1[0] === s2[0] && s1[1] === s2[1]) {
        continue; // skip collapsed edges, or it breaks
      }

      e1.contourId = e2.contourId = depth;
      if (!isExteriorRing) {
        e1.isExteriorRing = false;
        e2.isExteriorRing = false;
      }
      if (compareEvents(e1, e2) > 0) {
        e2.left = true;
      } else {
        e1.left = true;
      }

      var x = s1[0], y = s1[1];
      bbox[0] = min(bbox[0], x);
      bbox[1] = min(bbox[1], y);
      bbox[2] = max(bbox[2], x);
      bbox[3] = max(bbox[3], y);

      // Pushing it so the queue is sorted from left to right,
      // with object on the left having the highest priority.
      Q.push(e1);
      Q.push(e2);
    }
  }


  function fillQueue(subject, clipping, sbbox, cbbox, operation) {
    var eventQueue = new tinyqueue(null, compareEvents);
    var polygonSet, isExteriorRing, i, ii, j, jj; //, k, kk;

    for (i = 0, ii = subject.length; i < ii; i++) {
      polygonSet = subject[i];
      for (j = 0, jj = polygonSet.length; j < jj; j++) {
        isExteriorRing = j === 0;
        if (isExteriorRing) { contourId++; }
        processPolygon(polygonSet[j], true, contourId, eventQueue, sbbox, isExteriorRing);
      }
    }

    for (i = 0, ii = clipping.length; i < ii; i++) {
      polygonSet = clipping[i];
      for (j = 0, jj = polygonSet.length; j < jj; j++) {
        isExteriorRing = j === 0;
        if (operation === DIFFERENCE) { isExteriorRing = false; }
        if (isExteriorRing) { contourId++; }
        processPolygon(polygonSet[j], false, contourId, eventQueue, cbbox, isExteriorRing);
      }
    }

    return eventQueue;
  }

  var EMPTY = [];


  function trivialOperation(subject, clipping, operation) {
    var result = null;
    if (subject.length * clipping.length === 0) {
      if        (operation === INTERSECTION) {
        result = EMPTY;
      } else if (operation === DIFFERENCE) {
        result = subject;
      } else if (operation === UNION ||
                 operation === XOR) {
        result = (subject.length === 0) ? clipping : subject;
      }
    }
    return result;
  }


  function compareBBoxes(subject, clipping, sbbox, cbbox, operation) {
    var result = null;
    if (sbbox[0] > cbbox[2] ||
        cbbox[0] > sbbox[2] ||
        sbbox[1] > cbbox[3] ||
        cbbox[1] > sbbox[3]) {
      if        (operation === INTERSECTION) {
        result = EMPTY;
      } else if (operation === DIFFERENCE) {
        result = subject;
      } else if (operation === UNION ||
                 operation === XOR) {
        result = subject.concat(clipping);
      }
    }
    return result;
  }


  function boolean(subject, clipping, operation) {
    if (typeof subject[0][0][0] === 'number') {
      subject = [subject];
    }
    if (typeof clipping[0][0][0] === 'number') {
      clipping = [clipping];
    }
    var trivial = trivialOperation(subject, clipping, operation);
    if (trivial) {
      return trivial === EMPTY ? null : trivial;
    }
    var sbbox = [Infinity, Infinity, -Infinity, -Infinity];
    var cbbox = [Infinity, Infinity, -Infinity, -Infinity];

    //console.time('fill queue');
    var eventQueue = fillQueue(subject, clipping, sbbox, cbbox, operation);
    //console.timeEnd('fill queue');

    trivial = compareBBoxes(subject, clipping, sbbox, cbbox, operation);
    if (trivial) {
      return trivial === EMPTY ? null : trivial;
    }
    //console.time('subdivide edges');
    var sortedEvents = subdivide(eventQueue, subject, clipping, sbbox, cbbox, operation);
    //console.timeEnd('subdivide edges');

    //console.time('connect vertices');
    var result = connectEdges(sortedEvents, operation);
    //console.timeEnd('connect vertices');
    return result;
  }

  function union (subject, clipping) {
    return boolean(subject, clipping, UNION);
  }

  function diff (subject, clipping) {
    return boolean(subject, clipping, DIFFERENCE);
  }

  function xor (subject, clipping){
    return boolean(subject, clipping, XOR);
  }

  function intersection$1 (subject, clipping) {
    return boolean(subject, clipping, INTERSECTION);
  }

  /**
   * @enum {Number}
   */
  var operations = { UNION: UNION, DIFFERENCE: DIFFERENCE, INTERSECTION: INTERSECTION, XOR: XOR };

  exports.union = union;
  exports.diff = diff;
  exports.xor = xor;
  exports.intersection = intersection$1;
  exports.operations = operations;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=martinez.umd.js.map


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __webpack_require__(2);
/**
 * Unwrap a coordinate from a Point Feature, Geometry or a single coordinate.
 *
 * @name getCoord
 * @param {Array<number>|Geometry<Point>|Feature<Point>} coord GeoJSON Point or an Array of numbers
 * @returns {Array<number>} coordinates
 * @example
 * var pt = turf.point([10, 10]);
 *
 * var coord = turf.getCoord(pt);
 * //= [10, 10]
 */
function getCoord(coord) {
    if (!coord) {
        throw new Error("coord is required");
    }
    if (!Array.isArray(coord)) {
        if (coord.type === "Feature" && coord.geometry !== null && coord.geometry.type === "Point") {
            return coord.geometry.coordinates;
        }
        if (coord.type === "Point") {
            return coord.coordinates;
        }
    }
    if (Array.isArray(coord) && coord.length >= 2 && !Array.isArray(coord[0]) && !Array.isArray(coord[1])) {
        return coord;
    }
    throw new Error("coord must be GeoJSON Point or an Array of numbers");
}
exports.getCoord = getCoord;
/**
 * Unwrap coordinates from a Feature, Geometry Object or an Array
 *
 * @name getCoords
 * @param {Array<any>|Geometry|Feature} coords Feature, Geometry Object or an Array
 * @returns {Array<any>} coordinates
 * @example
 * var poly = turf.polygon([[[119.32, -8.7], [119.55, -8.69], [119.51, -8.54], [119.32, -8.7]]]);
 *
 * var coords = turf.getCoords(poly);
 * //= [[[119.32, -8.7], [119.55, -8.69], [119.51, -8.54], [119.32, -8.7]]]
 */
function getCoords(coords) {
    if (Array.isArray(coords)) {
        return coords;
    }
    // Feature
    if (coords.type === "Feature") {
        if (coords.geometry !== null) {
            return coords.geometry.coordinates;
        }
    }
    else {
        // Geometry
        if (coords.coordinates) {
            return coords.coordinates;
        }
    }
    throw new Error("coords must be GeoJSON Feature, Geometry Object or an Array");
}
exports.getCoords = getCoords;
/**
 * Checks if coordinates contains a number
 *
 * @name containsNumber
 * @param {Array<any>} coordinates GeoJSON Coordinates
 * @returns {boolean} true if Array contains a number
 */
function containsNumber(coordinates) {
    if (coordinates.length > 1 && helpers_1.isNumber(coordinates[0]) && helpers_1.isNumber(coordinates[1])) {
        return true;
    }
    if (Array.isArray(coordinates[0]) && coordinates[0].length) {
        return containsNumber(coordinates[0]);
    }
    throw new Error("coordinates must only contain numbers");
}
exports.containsNumber = containsNumber;
/**
 * Enforce expectations about types of GeoJSON objects for Turf.
 *
 * @name geojsonType
 * @param {GeoJSON} value any GeoJSON object
 * @param {string} type expected GeoJSON type
 * @param {string} name name of calling function
 * @throws {Error} if value is not the expected type.
 */
function geojsonType(value, type, name) {
    if (!type || !name) {
        throw new Error("type and name required");
    }
    if (!value || value.type !== type) {
        throw new Error("Invalid input to " + name + ": must be a " + type + ", given " + value.type);
    }
}
exports.geojsonType = geojsonType;
/**
 * Enforce expectations about types of {@link Feature} inputs for Turf.
 * Internally this uses {@link geojsonType} to judge geometry types.
 *
 * @name featureOf
 * @param {Feature} feature a feature with an expected geometry type
 * @param {string} type expected GeoJSON type
 * @param {string} name name of calling function
 * @throws {Error} error if value is not the expected type.
 */
function featureOf(feature, type, name) {
    if (!feature) {
        throw new Error("No feature passed");
    }
    if (!name) {
        throw new Error(".featureOf() requires a name");
    }
    if (!feature || feature.type !== "Feature" || !feature.geometry) {
        throw new Error("Invalid input to " + name + ", Feature with geometry required");
    }
    if (!feature.geometry || feature.geometry.type !== type) {
        throw new Error("Invalid input to " + name + ": must be a " + type + ", given " + feature.geometry.type);
    }
}
exports.featureOf = featureOf;
/**
 * Enforce expectations about types of {@link FeatureCollection} inputs for Turf.
 * Internally this uses {@link geojsonType} to judge geometry types.
 *
 * @name collectionOf
 * @param {FeatureCollection} featureCollection a FeatureCollection for which features will be judged
 * @param {string} type expected GeoJSON type
 * @param {string} name name of calling function
 * @throws {Error} if value is not the expected type.
 */
function collectionOf(featureCollection, type, name) {
    if (!featureCollection) {
        throw new Error("No featureCollection passed");
    }
    if (!name) {
        throw new Error(".collectionOf() requires a name");
    }
    if (!featureCollection || featureCollection.type !== "FeatureCollection") {
        throw new Error("Invalid input to " + name + ", FeatureCollection required");
    }
    for (var _i = 0, _a = featureCollection.features; _i < _a.length; _i++) {
        var feature = _a[_i];
        if (!feature || feature.type !== "Feature" || !feature.geometry) {
            throw new Error("Invalid input to " + name + ", Feature with geometry required");
        }
        if (!feature.geometry || feature.geometry.type !== type) {
            throw new Error("Invalid input to " + name + ": must be a " + type + ", given " + feature.geometry.type);
        }
    }
}
exports.collectionOf = collectionOf;
/**
 * Get Geometry from Feature or Geometry Object
 *
 * @param {Feature|Geometry} geojson GeoJSON Feature or Geometry Object
 * @returns {Geometry|null} GeoJSON Geometry Object
 * @throws {Error} if geojson is not a Feature or Geometry Object
 * @example
 * var point = {
 *   "type": "Feature",
 *   "properties": {},
 *   "geometry": {
 *     "type": "Point",
 *     "coordinates": [110, 40]
 *   }
 * }
 * var geom = turf.getGeom(point)
 * //={"type": "Point", "coordinates": [110, 40]}
 */
function getGeom(geojson) {
    if (geojson.type === "Feature") {
        return geojson.geometry;
    }
    return geojson;
}
exports.getGeom = getGeom;
/**
 * Get GeoJSON object's type, Geometry type is prioritize.
 *
 * @param {GeoJSON} geojson GeoJSON object
 * @param {string} [name="geojson"] name of the variable to display in error message
 * @returns {string} GeoJSON type
 * @example
 * var point = {
 *   "type": "Feature",
 *   "properties": {},
 *   "geometry": {
 *     "type": "Point",
 *     "coordinates": [110, 40]
 *   }
 * }
 * var geom = turf.getType(point)
 * //="Point"
 */
function getType(geojson, name) {
    if (geojson.type === "FeatureCollection") {
        return "FeatureCollection";
    }
    if (geojson.type === "GeometryCollection") {
        return "GeometryCollection";
    }
    if (geojson.type === "Feature" && geojson.geometry !== null) {
        return geojson.geometry.type;
    }
    return geojson.type;
}
exports.getType = getType;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(16),
    isObjectLike = __webpack_require__(48);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(11);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(44);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__L_PM_Utils__ = __webpack_require__(13);

var SnapMixin = {
  _initSnappableMarkers: function _initSnappableMarkers() {
    this.options.snapDistance = this.options.snapDistance || 30;

    this._assignEvents(this._markers);

    this._layer.off('pm:dragstart', this._unsnap, this);

    this._layer.on('pm:dragstart', this._unsnap, this);
  },
  _assignEvents: function _assignEvents(markerArr) {
    var _this = this;

    // loop through marker array and assign events to the markers
    markerArr.forEach(function (marker) {
      // if the marker is another array (Multipolygon stuff), recursively do this again
      if (Array.isArray(marker)) {
        _this._assignEvents(marker);

        return;
      } // add handleSnapping event on drag


      marker.off('drag', _this._handleSnapping, _this);
      marker.on('drag', _this._handleSnapping, _this); // cleanup event on dragend

      marker.off('dragend', _this._cleanupSnapping, _this);
      marker.on('dragend', _this._cleanupSnapping, _this);
    });
  },
  _unsnap: function _unsnap() {
    // delete the last snap
    delete this._snapLatLng;
  },
  _cleanupSnapping: function _cleanupSnapping() {
    // delete it, we need to refresh this with each start of a drag because
    // meanwhile, new layers could've been added to the map
    delete this._snapList; // remove map event

    this._map.off('pm:remove', this._handleSnapLayerRemoval, this);

    if (this.debugIndicatorLines) {
      this.debugIndicatorLines.forEach(function (line) {
        line.remove();
      });
    }
  },
  _handleSnapLayerRemoval: function _handleSnapLayerRemoval(_ref) {
    var layer = _ref.layer;

    // find the layers index in snaplist
    var index = this._snapList.findIndex(function (e) {
      return e._leaflet_id === layer._leaflet_id;
    }); // remove it from the snaplist


    this._snapList.splice(index, 1);
  },
  _handleSnapping: function _handleSnapping(e) {
    var _this2 = this;

    // if snapping is disabled via holding ALT during drag, stop right here
    if (e.originalEvent.altKey) {
      return false;
    } // create a list of polygons that the marker could snap to
    // this isn't inside a movestart/dragstart callback because middlemarkers are initialized
    // after dragstart/movestart so it wouldn't fire for them


    if (this._snapList === undefined) {
      this._createSnapList(e);
    } // if there are no layers to snap to, stop here


    if (this._snapList.length <= 0) {
      return false;
    }

    var marker = e.target; // get the closest layer, it's closest latlng, segment and the distance

    var closestLayer = this._calcClosestLayer(marker.getLatLng(), this._snapList);

    var isMarker = closestLayer.layer instanceof L.Marker || closestLayer.layer instanceof L.CircleMarker; // find the final latlng that we want to snap to

    var snapLatLng;

    if (!isMarker) {
      snapLatLng = this._checkPrioritiySnapping(closestLayer);
    } else {
      snapLatLng = closestLayer.latlng;
    } // minimal distance before marker snaps (in pixels)


    var minDistance = this.options.snapDistance; // event info for pm:snap and pm:unsnap

    var eventInfo = {
      marker: marker,
      snapLatLng: snapLatLng,
      segment: closestLayer.segment,
      layer: this._layer,
      layerInteractedWith: closestLayer.layer,
      // for lack of a better property name
      distance: closestLayer.distance
    };
    eventInfo.marker.fire('pm:snapdrag', eventInfo);

    this._layer.fire('pm:snapdrag', eventInfo);

    if (closestLayer.distance < minDistance) {
      // snap the marker
      marker.setLatLng(snapLatLng);
      marker._snapped = true;

      var triggerSnap = function triggerSnap() {
        _this2._snapLatLng = snapLatLng;
        marker.fire('pm:snap', eventInfo);

        _this2._layer.fire('pm:snap', eventInfo);
      }; // check if the snapping position differs from the last snap
      // Thanks Max & car2go Team


      var a = this._snapLatLng || {};
      var b = snapLatLng || {};

      if (a.lat !== b.lat || a.lng !== b.lng) {
        triggerSnap();
      }
    } else if (this._snapLatLng) {
      // no more snapping
      // if it was previously snapped...
      // ...unsnap
      this._unsnap(eventInfo);

      marker._snapped = false; // and fire unsnap event

      eventInfo.marker.fire('pm:unsnap', eventInfo);

      this._layer.fire('pm:unsnap', eventInfo);
    }

    return true;
  },
  // we got the point we want to snap to (C), but we need to check if a coord of the polygon
  // receives priority over C as the snapping point. Let's check this here
  _checkPrioritiySnapping: function _checkPrioritiySnapping(closestLayer) {
    var map = this._map; // A and B are the points of the closest segment to P (the marker position we want to snap)

    var A = closestLayer.segment[0];
    var B = closestLayer.segment[1]; // C is the point we would snap to on the segment.
    // The closest point on the closest segment of the closest polygon to P. That's right.

    var C = closestLayer.latlng; // distances from A to C and B to C to check which one is closer to C

    var distanceAC = this._getDistance(map, A, C);

    var distanceBC = this._getDistance(map, B, C); // closest latlng of A and B to C


    var closestVertexLatLng = distanceAC < distanceBC ? A : B; // distance between closestVertexLatLng and C

    var shortestDistance = distanceAC < distanceBC ? distanceAC : distanceBC; // snap to middle (M) of segment if option is enabled

    if (this.options.snapMiddle) {
      var M = __WEBPACK_IMPORTED_MODULE_0__L_PM_Utils__["a" /* default */].calcMiddleLatLng(map, A, B);

      var distanceMC = this._getDistance(map, M, C);

      if (distanceMC < distanceAC && distanceMC < distanceBC) {
        // M is the nearest vertex
        closestVertexLatLng = M;
        shortestDistance = distanceMC;
      }
    } // the distance that needs to be undercut to trigger priority


    var priorityDistance = this.options.snapDistance; // the latlng we ultemately want to snap to

    var snapLatlng; // if C is closer to the closestVertexLatLng (A, B or M) than the snapDistance,
    // the closestVertexLatLng has priority over C as the snapping point.

    if (shortestDistance < priorityDistance) {
      snapLatlng = closestVertexLatLng;
    } else {
      snapLatlng = C;
    } // return the copy of snapping point


    return Object.assign({}, snapLatlng);
  },
  _createSnapList: function _createSnapList() {
    var _this3 = this;

    var layers = [];
    var debugIndicatorLines = [];
    var map = this._map;
    map.off('pm:remove', this._handleSnapLayerRemoval, this);
    map.on('pm:remove', this._handleSnapLayerRemoval, this); // find all layers that are or inherit from Polylines... and markers that are not
    // temporary markers of polygon-edits

    map.eachLayer(function (layer) {
      if (layer instanceof L.Polyline || layer instanceof L.Marker || layer instanceof L.CircleMarker) {
        layers.push(layer); // this is for debugging

        var debugLine = L.polyline([], {
          color: 'red',
          pmIgnore: true
        });
        debugIndicatorLines.push(debugLine); // uncomment 👇 this line to show helper lines for debugging
        // debugLine.addTo(map);
      }
    }); // ...except myself

    layers = layers.filter(function (layer) {
      return _this3._layer !== layer;
    }); // also remove everything that has no coordinates yet

    layers = layers.filter(function (layer) {
      return layer._latlng || layer._latlngs && layer._latlngs.length > 0;
    }); // finally remove everything that's leaflet.pm specific temporary stuff

    layers = layers.filter(function (layer) {
      return !layer._pmTempLayer;
    }); // save snaplist from layers and the other snap layers added from other classes/scripts

    if (this._otherSnapLayers) {
      this._snapList = layers.concat(this._otherSnapLayers);
    } else {
      this._snapList = layers;
    }

    this.debugIndicatorLines = debugIndicatorLines;
  },
  _calcClosestLayer: function _calcClosestLayer(latlng, layers) {
    var _this4 = this;

    // the closest polygon to our dragged marker latlng
    var closestLayer = {}; // loop through the layers

    layers.forEach(function (layer, index) {
      // find the closest latlng, segment and the distance of this layer to the dragged marker latlng
      var results = _this4._calcLayerDistances(latlng, layer); // show indicator lines, it's for debugging


      _this4.debugIndicatorLines[index].setLatLngs([latlng, results.latlng]); // save the info if it doesn't exist or if the distance is smaller than the previous one


      if (closestLayer.distance === undefined || results.distance < closestLayer.distance) {
        closestLayer = results;
        closestLayer.layer = layer;
      }
    }); // return the closest layer and it's data
    // if there is no closest layer, return undefined

    return closestLayer;
  },
  _calcLayerDistances: function _calcLayerDistances(latlng, layer) {
    var _this5 = this;

    var map = this._map; // is this a marker?

    var isMarker = layer instanceof L.Marker || layer instanceof L.CircleMarker; // is it a polygon?

    var isPolygon = layer instanceof L.Polygon; // the point P which we want to snap (probpably the marker that is dragged)

    var P = latlng; // the coords of the layer

    var latlngs = isMarker ? layer.getLatLng() : layer.getLatLngs();

    if (isMarker) {
      // return the info for the marker, no more calculations needed
      return {
        latlng: Object.assign({}, latlngs),
        distance: this._getDistance(map, latlngs, P)
      };
    } // the closest segment (line between two points) of the layer


    var closestSegment; // the shortest distance from P to closestSegment

    var shortestDistance; // loop through the coords of the layer

    var loopThroughCoords = function loopThroughCoords(coords) {
      coords.forEach(function (coord, index) {
        if (Array.isArray(coord)) {
          loopThroughCoords(coord);
          return;
        } // take this coord (A)...


        var A = coord;
        var nextIndex; // and the next coord (B) as points

        if (isPolygon) {
          nextIndex = index + 1 === coords.length ? 0 : index + 1;
        } else {
          nextIndex = index + 1 === coords.length ? undefined : index + 1;
        }

        var B = coords[nextIndex];

        if (B) {
          // calc the distance between P and AB-segment
          var distance = _this5._getDistanceToSegment(map, P, A, B); // is the distance shorter than the previous one? Save it and the segment


          if (shortestDistance === undefined || distance < shortestDistance) {
            shortestDistance = distance;
            closestSegment = [A, B];
          }
        }
      });
    };

    loopThroughCoords(latlngs); // now, take the closest segment (closestSegment) and calc the closest point to P on it.

    var C = this._getClosestPointOnSegment(map, latlng, closestSegment[0], closestSegment[1]); // return the latlng of that sucker


    return {
      latlng: Object.assign({}, C),
      segment: closestSegment,
      distance: shortestDistance
    };
  },
  _getClosestPointOnSegment: function _getClosestPointOnSegment(map, latlng, latlngA, latlngB) {
    var maxzoom = map.getMaxZoom();

    if (maxzoom === Infinity) {
      maxzoom = map.getZoom();
    }

    var P = map.project(latlng, maxzoom);
    var A = map.project(latlngA, maxzoom);
    var B = map.project(latlngB, maxzoom);
    var closest = L.LineUtil.closestPointOnSegment(P, A, B);
    return map.unproject(closest, maxzoom);
  },
  _getDistanceToSegment: function _getDistanceToSegment(map, latlng, latlngA, latlngB) {
    var P = map.latLngToLayerPoint(latlng);
    var A = map.latLngToLayerPoint(latlngA);
    var B = map.latLngToLayerPoint(latlngB);
    return L.LineUtil.pointToSegmentDistance(P, A, B);
  },
  _getDistance: function _getDistance(map, latlngA, latlngB) {
    return map.latLngToLayerPoint(latlngA).distanceTo(map.latLngToLayerPoint(latlngB));
  }
};
/* harmony default export */ __webpack_exports__["a"] = (SnapMixin);

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var Utils = {
  calcMiddleLatLng: function calcMiddleLatLng(map, latlng1, latlng2) {
    // calculate the middle coordinates between two markers
    var p1 = map.project(latlng1);
    var p2 = map.project(latlng2);
    return map.unproject(p1._add(p2)._divideBy(2));
  }
};
/* harmony default export */ __webpack_exports__["a"] = (Utils);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __webpack_require__(2);
/**
 * Takes a {@link LineString|linestring}, {@link MultiLineString|multi-linestring},
 * {@link MultiPolygon|multi-polygon} or {@link Polygon|polygon} and
 * returns {@link Point|points} at all self-intersections.
 *
 * @name kinks
 * @param {Feature<LineString|MultiLineString|MultiPolygon|Polygon>} featureIn input feature
 * @returns {FeatureCollection<Point>} self-intersections
 * @example
 * var poly = turf.polygon([[
 *   [-12.034835, 8.901183],
 *   [-12.060413, 8.899826],
 *   [-12.03638, 8.873199],
 *   [-12.059383, 8.871418],
 *   [-12.034835, 8.901183]
 * ]]);
 *
 * var kinks = turf.kinks(poly);
 *
 * //addToMap
 * var addToMap = [poly, kinks]
 */
function kinks(featureIn) {
    var coordinates;
    var feature;
    var results = {
        type: "FeatureCollection",
        features: [],
    };
    if (featureIn.type === "Feature") {
        feature = featureIn.geometry;
    }
    else {
        feature = featureIn;
    }
    if (feature.type === "LineString") {
        coordinates = [feature.coordinates];
    }
    else if (feature.type === "MultiLineString") {
        coordinates = feature.coordinates;
    }
    else if (feature.type === "MultiPolygon") {
        coordinates = [].concat.apply([], feature.coordinates);
    }
    else if (feature.type === "Polygon") {
        coordinates = feature.coordinates;
    }
    else {
        throw new Error("Input must be a LineString, MultiLineString, " +
            "Polygon, or MultiPolygon Feature or Geometry");
    }
    coordinates.forEach(function (line1) {
        coordinates.forEach(function (line2) {
            for (var i = 0; i < line1.length - 1; i++) {
                // start iteration at i, intersections for k < i have already
                // been checked in previous outer loop iterations
                for (var k = i; k < line2.length - 1; k++) {
                    if (line1 === line2) {
                        // segments are adjacent and always share a vertex, not a kink
                        if (Math.abs(i - k) === 1) {
                            continue;
                        }
                        // first and last segment in a closed lineString or ring always share a vertex, not a kink
                        if (
                        // segments are first and last segment of lineString
                        i === 0 &&
                            k === line1.length - 2 &&
                            // lineString is closed
                            line1[i][0] === line1[line1.length - 1][0] &&
                            line1[i][1] === line1[line1.length - 1][1]) {
                            continue;
                        }
                    }
                    var intersection = lineIntersects(line1[i][0], line1[i][1], line1[i + 1][0], line1[i + 1][1], line2[k][0], line2[k][1], line2[k + 1][0], line2[k + 1][1]);
                    if (intersection) {
                        results.features.push(helpers_1.point([intersection[0], intersection[1]]));
                    }
                }
            }
        });
    });
    return results;
}
exports.default = kinks;
// modified from http://jsfiddle.net/justin_c_rounds/Gd2S2/light/
function lineIntersects(line1StartX, line1StartY, line1EndX, line1EndY, line2StartX, line2StartY, line2EndX, line2EndY) {
    // if the lines intersect, the result contains the x and y of the
    // intersection (treating the lines as infinite) and booleans for whether
    // line segment 1 or line segment 2 contain the point
    var denominator;
    var a;
    var b;
    var numerator1;
    var numerator2;
    var result = {
        x: null,
        y: null,
        onLine1: false,
        onLine2: false,
    };
    denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - ((line2EndX - line2StartX) * (line1EndY - line1StartY));
    if (denominator === 0) {
        if (result.x !== null && result.y !== null) {
            return result;
        }
        else {
            return false;
        }
    }
    a = line1StartY - line2StartY;
    b = line1StartX - line2StartX;
    numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b);
    numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b);
    a = numerator1 / denominator;
    b = numerator2 / denominator;
    // if we cast these lines infinitely in both directions, they intersect here:
    result.x = line1StartX + (a * (line1EndX - line1StartX));
    result.y = line1StartY + (a * (line1EndY - line1StartY));
    // if line1 is a segment and line2 is infinite, they intersect if:
    if (a >= 0 && a <= 1) {
        result.onLine1 = true;
    }
    // if line2 is a segment and line1 is infinite, they intersect if:
    if (b >= 0 && b <= 1) {
        result.onLine2 = true;
    }
    // if line1 and line2 are segments, they intersect if both of the above are true
    if (result.onLine1 && result.onLine2) {
        return [result.x, result.y];
    }
    else {
        return false;
    }
}


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

var helpers = __webpack_require__(2);

/**
 * Callback for coordEach
 *
 * @callback coordEachCallback
 * @param {Array<number>} currentCoord The current coordinate being processed.
 * @param {number} coordIndex The current index of the coordinate being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 * @param {number} geometryIndex The current index of the Geometry being processed.
 */

/**
 * Iterate over coordinates in any GeoJSON object, similar to Array.forEach()
 *
 * @name coordEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentCoord, coordIndex, featureIndex, multiFeatureIndex)
 * @param {boolean} [excludeWrapCoord=false] whether or not to include the final coordinate of LinearRings that wraps the ring in its iteration.
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {"foo": "bar"}),
 *   turf.point([36, 53], {"hello": "world"})
 * ]);
 *
 * turf.coordEach(features, function (currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) {
 *   //=currentCoord
 *   //=coordIndex
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 * });
 */
function coordEach(geojson, callback, excludeWrapCoord) {
    // Handles null Geometry -- Skips this GeoJSON
    if (geojson === null) return;
    var j, k, l, geometry, stopG, coords,
        geometryMaybeCollection,
        wrapShrink = 0,
        coordIndex = 0,
        isGeometryCollection,
        type = geojson.type,
        isFeatureCollection = type === 'FeatureCollection',
        isFeature = type === 'Feature',
        stop = isFeatureCollection ? geojson.features.length : 1;

    // This logic may look a little weird. The reason why it is that way
    // is because it's trying to be fast. GeoJSON supports multiple kinds
    // of objects at its root: FeatureCollection, Features, Geometries.
    // This function has the responsibility of handling all of them, and that
    // means that some of the `for` loops you see below actually just don't apply
    // to certain inputs. For instance, if you give this just a
    // Point geometry, then both loops are short-circuited and all we do
    // is gradually rename the input until it's called 'geometry'.
    //
    // This also aims to allocate as few resources as possible: just a
    // few numbers and booleans, rather than any temporary arrays as would
    // be required with the normalization approach.
    for (var featureIndex = 0; featureIndex < stop; featureIndex++) {
        geometryMaybeCollection = (isFeatureCollection ? geojson.features[featureIndex].geometry :
            (isFeature ? geojson.geometry : geojson));
        isGeometryCollection = (geometryMaybeCollection) ? geometryMaybeCollection.type === 'GeometryCollection' : false;
        stopG = isGeometryCollection ? geometryMaybeCollection.geometries.length : 1;

        for (var geomIndex = 0; geomIndex < stopG; geomIndex++) {
            var multiFeatureIndex = 0;
            var geometryIndex = 0;
            geometry = isGeometryCollection ?
                geometryMaybeCollection.geometries[geomIndex] : geometryMaybeCollection;

            // Handles null Geometry -- Skips this geometry
            if (geometry === null) continue;
            coords = geometry.coordinates;
            var geomType = geometry.type;

            wrapShrink = (excludeWrapCoord && (geomType === 'Polygon' || geomType === 'MultiPolygon')) ? 1 : 0;

            switch (geomType) {
            case null:
                break;
            case 'Point':
                if (callback(coords, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) return false;
                coordIndex++;
                multiFeatureIndex++;
                break;
            case 'LineString':
            case 'MultiPoint':
                for (j = 0; j < coords.length; j++) {
                    if (callback(coords[j], coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) return false;
                    coordIndex++;
                    if (geomType === 'MultiPoint') multiFeatureIndex++;
                }
                if (geomType === 'LineString') multiFeatureIndex++;
                break;
            case 'Polygon':
            case 'MultiLineString':
                for (j = 0; j < coords.length; j++) {
                    for (k = 0; k < coords[j].length - wrapShrink; k++) {
                        if (callback(coords[j][k], coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) return false;
                        coordIndex++;
                    }
                    if (geomType === 'MultiLineString') multiFeatureIndex++;
                    if (geomType === 'Polygon') geometryIndex++;
                }
                if (geomType === 'Polygon') multiFeatureIndex++;
                break;
            case 'MultiPolygon':
                for (j = 0; j < coords.length; j++) {
                    geometryIndex = 0;
                    for (k = 0; k < coords[j].length; k++) {
                        for (l = 0; l < coords[j][k].length - wrapShrink; l++) {
                            if (callback(coords[j][k][l], coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) return false;
                            coordIndex++;
                        }
                        geometryIndex++;
                    }
                    multiFeatureIndex++;
                }
                break;
            case 'GeometryCollection':
                for (j = 0; j < geometry.geometries.length; j++)
                    if (coordEach(geometry.geometries[j], callback, excludeWrapCoord) === false) return false;
                break;
            default:
                throw new Error('Unknown Geometry Type');
            }
        }
    }
}

/**
 * Callback for coordReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback coordReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Array<number>} currentCoord The current coordinate being processed.
 * @param {number} coordIndex The current index of the coordinate being processed.
 * Starts at index 0, if an initialValue is provided, and at index 1 otherwise.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 * @param {number} geometryIndex The current index of the Geometry being processed.
 */

/**
 * Reduce coordinates in any GeoJSON object, similar to Array.reduce()
 *
 * @name coordReduce
 * @param {FeatureCollection|Geometry|Feature} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentCoord, coordIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @param {boolean} [excludeWrapCoord=false] whether or not to include the final coordinate of LinearRings that wraps the ring in its iteration.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {"foo": "bar"}),
 *   turf.point([36, 53], {"hello": "world"})
 * ]);
 *
 * turf.coordReduce(features, function (previousValue, currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) {
 *   //=previousValue
 *   //=currentCoord
 *   //=coordIndex
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 *   return currentCoord;
 * });
 */
function coordReduce(geojson, callback, initialValue, excludeWrapCoord) {
    var previousValue = initialValue;
    coordEach(geojson, function (currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) {
        if (coordIndex === 0 && initialValue === undefined) previousValue = currentCoord;
        else previousValue = callback(previousValue, currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex);
    }, excludeWrapCoord);
    return previousValue;
}

/**
 * Callback for propEach
 *
 * @callback propEachCallback
 * @param {Object} currentProperties The current Properties being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 */

/**
 * Iterate over properties in any GeoJSON object, similar to Array.forEach()
 *
 * @name propEach
 * @param {FeatureCollection|Feature} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentProperties, featureIndex)
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.propEach(features, function (currentProperties, featureIndex) {
 *   //=currentProperties
 *   //=featureIndex
 * });
 */
function propEach(geojson, callback) {
    var i;
    switch (geojson.type) {
    case 'FeatureCollection':
        for (i = 0; i < geojson.features.length; i++) {
            if (callback(geojson.features[i].properties, i) === false) break;
        }
        break;
    case 'Feature':
        callback(geojson.properties, 0);
        break;
    }
}


/**
 * Callback for propReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback propReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {*} currentProperties The current Properties being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 */

/**
 * Reduce properties in any GeoJSON object into a single value,
 * similar to how Array.reduce works. However, in this case we lazily run
 * the reduction, so an array of all properties is unnecessary.
 *
 * @name propReduce
 * @param {FeatureCollection|Feature} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentProperties, featureIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.propReduce(features, function (previousValue, currentProperties, featureIndex) {
 *   //=previousValue
 *   //=currentProperties
 *   //=featureIndex
 *   return currentProperties
 * });
 */
function propReduce(geojson, callback, initialValue) {
    var previousValue = initialValue;
    propEach(geojson, function (currentProperties, featureIndex) {
        if (featureIndex === 0 && initialValue === undefined) previousValue = currentProperties;
        else previousValue = callback(previousValue, currentProperties, featureIndex);
    });
    return previousValue;
}

/**
 * Callback for featureEach
 *
 * @callback featureEachCallback
 * @param {Feature<any>} currentFeature The current Feature being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 */

/**
 * Iterate over features in any GeoJSON object, similar to
 * Array.forEach.
 *
 * @name featureEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentFeature, featureIndex)
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {foo: 'bar'}),
 *   turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.featureEach(features, function (currentFeature, featureIndex) {
 *   //=currentFeature
 *   //=featureIndex
 * });
 */
function featureEach(geojson, callback) {
    if (geojson.type === 'Feature') {
        callback(geojson, 0);
    } else if (geojson.type === 'FeatureCollection') {
        for (var i = 0; i < geojson.features.length; i++) {
            if (callback(geojson.features[i], i) === false) break;
        }
    }
}

/**
 * Callback for featureReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback featureReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Feature} currentFeature The current Feature being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 */

/**
 * Reduce features in any GeoJSON object, similar to Array.reduce().
 *
 * @name featureReduce
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentFeature, featureIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {"foo": "bar"}),
 *   turf.point([36, 53], {"hello": "world"})
 * ]);
 *
 * turf.featureReduce(features, function (previousValue, currentFeature, featureIndex) {
 *   //=previousValue
 *   //=currentFeature
 *   //=featureIndex
 *   return currentFeature
 * });
 */
function featureReduce(geojson, callback, initialValue) {
    var previousValue = initialValue;
    featureEach(geojson, function (currentFeature, featureIndex) {
        if (featureIndex === 0 && initialValue === undefined) previousValue = currentFeature;
        else previousValue = callback(previousValue, currentFeature, featureIndex);
    });
    return previousValue;
}

/**
 * Get all coordinates from any GeoJSON object.
 *
 * @name coordAll
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @returns {Array<Array<number>>} coordinate position array
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {foo: 'bar'}),
 *   turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * var coords = turf.coordAll(features);
 * //= [[26, 37], [36, 53]]
 */
function coordAll(geojson) {
    var coords = [];
    coordEach(geojson, function (coord) {
        coords.push(coord);
    });
    return coords;
}

/**
 * Callback for geomEach
 *
 * @callback geomEachCallback
 * @param {Geometry} currentGeometry The current Geometry being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {Object} featureProperties The current Feature Properties being processed.
 * @param {Array<number>} featureBBox The current Feature BBox being processed.
 * @param {number|string} featureId The current Feature Id being processed.
 */

/**
 * Iterate over each geometry in any GeoJSON object, similar to Array.forEach()
 *
 * @name geomEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentGeometry, featureIndex, featureProperties, featureBBox, featureId)
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.geomEach(features, function (currentGeometry, featureIndex, featureProperties, featureBBox, featureId) {
 *   //=currentGeometry
 *   //=featureIndex
 *   //=featureProperties
 *   //=featureBBox
 *   //=featureId
 * });
 */
function geomEach(geojson, callback) {
    var i, j, g, geometry, stopG,
        geometryMaybeCollection,
        isGeometryCollection,
        featureProperties,
        featureBBox,
        featureId,
        featureIndex = 0,
        isFeatureCollection = geojson.type === 'FeatureCollection',
        isFeature = geojson.type === 'Feature',
        stop = isFeatureCollection ? geojson.features.length : 1;

    // This logic may look a little weird. The reason why it is that way
    // is because it's trying to be fast. GeoJSON supports multiple kinds
    // of objects at its root: FeatureCollection, Features, Geometries.
    // This function has the responsibility of handling all of them, and that
    // means that some of the `for` loops you see below actually just don't apply
    // to certain inputs. For instance, if you give this just a
    // Point geometry, then both loops are short-circuited and all we do
    // is gradually rename the input until it's called 'geometry'.
    //
    // This also aims to allocate as few resources as possible: just a
    // few numbers and booleans, rather than any temporary arrays as would
    // be required with the normalization approach.
    for (i = 0; i < stop; i++) {

        geometryMaybeCollection = (isFeatureCollection ? geojson.features[i].geometry :
            (isFeature ? geojson.geometry : geojson));
        featureProperties = (isFeatureCollection ? geojson.features[i].properties :
            (isFeature ? geojson.properties : {}));
        featureBBox = (isFeatureCollection ? geojson.features[i].bbox :
            (isFeature ? geojson.bbox : undefined));
        featureId = (isFeatureCollection ? geojson.features[i].id :
            (isFeature ? geojson.id : undefined));
        isGeometryCollection = (geometryMaybeCollection) ? geometryMaybeCollection.type === 'GeometryCollection' : false;
        stopG = isGeometryCollection ? geometryMaybeCollection.geometries.length : 1;

        for (g = 0; g < stopG; g++) {
            geometry = isGeometryCollection ?
                geometryMaybeCollection.geometries[g] : geometryMaybeCollection;

            // Handle null Geometry
            if (geometry === null) {
                if (callback(null, featureIndex, featureProperties, featureBBox, featureId) === false) return false;
                continue;
            }
            switch (geometry.type) {
            case 'Point':
            case 'LineString':
            case 'MultiPoint':
            case 'Polygon':
            case 'MultiLineString':
            case 'MultiPolygon': {
                if (callback(geometry, featureIndex, featureProperties, featureBBox, featureId) === false) return false;
                break;
            }
            case 'GeometryCollection': {
                for (j = 0; j < geometry.geometries.length; j++) {
                    if (callback(geometry.geometries[j], featureIndex, featureProperties, featureBBox, featureId) === false) return false;
                }
                break;
            }
            default:
                throw new Error('Unknown Geometry Type');
            }
        }
        // Only increase `featureIndex` per each feature
        featureIndex++;
    }
}

/**
 * Callback for geomReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback geomReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Geometry} currentGeometry The current Geometry being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {Object} featureProperties The current Feature Properties being processed.
 * @param {Array<number>} featureBBox The current Feature BBox being processed.
 * @param {number|string} featureId The current Feature Id being processed.
 */

/**
 * Reduce geometry in any GeoJSON object, similar to Array.reduce().
 *
 * @name geomReduce
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentGeometry, featureIndex, featureProperties, featureBBox, featureId)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.geomReduce(features, function (previousValue, currentGeometry, featureIndex, featureProperties, featureBBox, featureId) {
 *   //=previousValue
 *   //=currentGeometry
 *   //=featureIndex
 *   //=featureProperties
 *   //=featureBBox
 *   //=featureId
 *   return currentGeometry
 * });
 */
function geomReduce(geojson, callback, initialValue) {
    var previousValue = initialValue;
    geomEach(geojson, function (currentGeometry, featureIndex, featureProperties, featureBBox, featureId) {
        if (featureIndex === 0 && initialValue === undefined) previousValue = currentGeometry;
        else previousValue = callback(previousValue, currentGeometry, featureIndex, featureProperties, featureBBox, featureId);
    });
    return previousValue;
}

/**
 * Callback for flattenEach
 *
 * @callback flattenEachCallback
 * @param {Feature} currentFeature The current flattened feature being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 */

/**
 * Iterate over flattened features in any GeoJSON object, similar to
 * Array.forEach.
 *
 * @name flattenEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentFeature, featureIndex, multiFeatureIndex)
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.multiPoint([[40, 30], [36, 53]], {hello: 'world'})
 * ]);
 *
 * turf.flattenEach(features, function (currentFeature, featureIndex, multiFeatureIndex) {
 *   //=currentFeature
 *   //=featureIndex
 *   //=multiFeatureIndex
 * });
 */
function flattenEach(geojson, callback) {
    geomEach(geojson, function (geometry, featureIndex, properties, bbox, id) {
        // Callback for single geometry
        var type = (geometry === null) ? null : geometry.type;
        switch (type) {
        case null:
        case 'Point':
        case 'LineString':
        case 'Polygon':
            if (callback(helpers.feature(geometry, properties, {bbox: bbox, id: id}), featureIndex, 0) === false) return false;
            return;
        }

        var geomType;

        // Callback for multi-geometry
        switch (type) {
        case 'MultiPoint':
            geomType = 'Point';
            break;
        case 'MultiLineString':
            geomType = 'LineString';
            break;
        case 'MultiPolygon':
            geomType = 'Polygon';
            break;
        }

        for (var multiFeatureIndex = 0; multiFeatureIndex < geometry.coordinates.length; multiFeatureIndex++) {
            var coordinate = geometry.coordinates[multiFeatureIndex];
            var geom = {
                type: geomType,
                coordinates: coordinate
            };
            if (callback(helpers.feature(geom, properties), featureIndex, multiFeatureIndex) === false) return false;
        }
    });
}

/**
 * Callback for flattenReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback flattenReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Feature} currentFeature The current Feature being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 */

/**
 * Reduce flattened features in any GeoJSON object, similar to Array.reduce().
 *
 * @name flattenReduce
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentFeature, featureIndex, multiFeatureIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.multiPoint([[40, 30], [36, 53]], {hello: 'world'})
 * ]);
 *
 * turf.flattenReduce(features, function (previousValue, currentFeature, featureIndex, multiFeatureIndex) {
 *   //=previousValue
 *   //=currentFeature
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   return currentFeature
 * });
 */
function flattenReduce(geojson, callback, initialValue) {
    var previousValue = initialValue;
    flattenEach(geojson, function (currentFeature, featureIndex, multiFeatureIndex) {
        if (featureIndex === 0 && multiFeatureIndex === 0 && initialValue === undefined) previousValue = currentFeature;
        else previousValue = callback(previousValue, currentFeature, featureIndex, multiFeatureIndex);
    });
    return previousValue;
}

/**
 * Callback for segmentEach
 *
 * @callback segmentEachCallback
 * @param {Feature<LineString>} currentSegment The current Segment being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 * @param {number} geometryIndex The current index of the Geometry being processed.
 * @param {number} segmentIndex The current index of the Segment being processed.
 * @returns {void}
 */

/**
 * Iterate over 2-vertex line segment in any GeoJSON object, similar to Array.forEach()
 * (Multi)Point geometries do not contain segments therefore they are ignored during this operation.
 *
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON
 * @param {Function} callback a method that takes (currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex)
 * @returns {void}
 * @example
 * var polygon = turf.polygon([[[-50, 5], [-40, -10], [-50, -10], [-40, 5], [-50, 5]]]);
 *
 * // Iterate over GeoJSON by 2-vertex segments
 * turf.segmentEach(polygon, function (currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex) {
 *   //=currentSegment
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 *   //=segmentIndex
 * });
 *
 * // Calculate the total number of segments
 * var total = 0;
 * turf.segmentEach(polygon, function () {
 *     total++;
 * });
 */
function segmentEach(geojson, callback) {
    flattenEach(geojson, function (feature, featureIndex, multiFeatureIndex) {
        var segmentIndex = 0;

        // Exclude null Geometries
        if (!feature.geometry) return;
        // (Multi)Point geometries do not contain segments therefore they are ignored during this operation.
        var type = feature.geometry.type;
        if (type === 'Point' || type === 'MultiPoint') return;

        // Generate 2-vertex line segments
        var previousCoords;
        var previousFeatureIndex = 0;
        var previousMultiIndex = 0;
        var prevGeomIndex = 0;
        if (coordEach(feature, function (currentCoord, coordIndex, featureIndexCoord, multiPartIndexCoord, geometryIndex) {
            // Simulating a meta.coordReduce() since `reduce` operations cannot be stopped by returning `false`
            if (previousCoords === undefined || featureIndex > previousFeatureIndex || multiPartIndexCoord > previousMultiIndex || geometryIndex > prevGeomIndex) {
                previousCoords = currentCoord;
                previousFeatureIndex = featureIndex;
                previousMultiIndex = multiPartIndexCoord;
                prevGeomIndex = geometryIndex;
                segmentIndex = 0;
                return;
            }
            var currentSegment = helpers.lineString([previousCoords, currentCoord], feature.properties);
            if (callback(currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex) === false) return false;
            segmentIndex++;
            previousCoords = currentCoord;
        }) === false) return false;
    });
}

/**
 * Callback for segmentReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback segmentReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Feature<LineString>} currentSegment The current Segment being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 * @param {number} geometryIndex The current index of the Geometry being processed.
 * @param {number} segmentIndex The current index of the Segment being processed.
 */

/**
 * Reduce 2-vertex line segment in any GeoJSON object, similar to Array.reduce()
 * (Multi)Point geometries do not contain segments therefore they are ignored during this operation.
 *
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON
 * @param {Function} callback a method that takes (previousValue, currentSegment, currentIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {void}
 * @example
 * var polygon = turf.polygon([[[-50, 5], [-40, -10], [-50, -10], [-40, 5], [-50, 5]]]);
 *
 * // Iterate over GeoJSON by 2-vertex segments
 * turf.segmentReduce(polygon, function (previousSegment, currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex) {
 *   //= previousSegment
 *   //= currentSegment
 *   //= featureIndex
 *   //= multiFeatureIndex
 *   //= geometryIndex
 *   //= segmentInex
 *   return currentSegment
 * });
 *
 * // Calculate the total number of segments
 * var initialValue = 0
 * var total = turf.segmentReduce(polygon, function (previousValue) {
 *     previousValue++;
 *     return previousValue;
 * }, initialValue);
 */
function segmentReduce(geojson, callback, initialValue) {
    var previousValue = initialValue;
    var started = false;
    segmentEach(geojson, function (currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex) {
        if (started === false && initialValue === undefined) previousValue = currentSegment;
        else previousValue = callback(previousValue, currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex);
        started = true;
    });
    return previousValue;
}

/**
 * Callback for lineEach
 *
 * @callback lineEachCallback
 * @param {Feature<LineString>} currentLine The current LineString|LinearRing being processed
 * @param {number} featureIndex The current index of the Feature being processed
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed
 * @param {number} geometryIndex The current index of the Geometry being processed
 */

/**
 * Iterate over line or ring coordinates in LineString, Polygon, MultiLineString, MultiPolygon Features or Geometries,
 * similar to Array.forEach.
 *
 * @name lineEach
 * @param {Geometry|Feature<LineString|Polygon|MultiLineString|MultiPolygon>} geojson object
 * @param {Function} callback a method that takes (currentLine, featureIndex, multiFeatureIndex, geometryIndex)
 * @example
 * var multiLine = turf.multiLineString([
 *   [[26, 37], [35, 45]],
 *   [[36, 53], [38, 50], [41, 55]]
 * ]);
 *
 * turf.lineEach(multiLine, function (currentLine, featureIndex, multiFeatureIndex, geometryIndex) {
 *   //=currentLine
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 * });
 */
function lineEach(geojson, callback) {
    // validation
    if (!geojson) throw new Error('geojson is required');

    flattenEach(geojson, function (feature, featureIndex, multiFeatureIndex) {
        if (feature.geometry === null) return;
        var type = feature.geometry.type;
        var coords = feature.geometry.coordinates;
        switch (type) {
        case 'LineString':
            if (callback(feature, featureIndex, multiFeatureIndex, 0, 0) === false) return false;
            break;
        case 'Polygon':
            for (var geometryIndex = 0; geometryIndex < coords.length; geometryIndex++) {
                if (callback(helpers.lineString(coords[geometryIndex], feature.properties), featureIndex, multiFeatureIndex, geometryIndex) === false) return false;
            }
            break;
        }
    });
}

/**
 * Callback for lineReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback lineReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Feature<LineString>} currentLine The current LineString|LinearRing being processed.
 * @param {number} featureIndex The current index of the Feature being processed
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed
 * @param {number} geometryIndex The current index of the Geometry being processed
 */

/**
 * Reduce features in any GeoJSON object, similar to Array.reduce().
 *
 * @name lineReduce
 * @param {Geometry|Feature<LineString|Polygon|MultiLineString|MultiPolygon>} geojson object
 * @param {Function} callback a method that takes (previousValue, currentLine, featureIndex, multiFeatureIndex, geometryIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var multiPoly = turf.multiPolygon([
 *   turf.polygon([[[12,48],[2,41],[24,38],[12,48]], [[9,44],[13,41],[13,45],[9,44]]]),
 *   turf.polygon([[[5, 5], [0, 0], [2, 2], [4, 4], [5, 5]]])
 * ]);
 *
 * turf.lineReduce(multiPoly, function (previousValue, currentLine, featureIndex, multiFeatureIndex, geometryIndex) {
 *   //=previousValue
 *   //=currentLine
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 *   return currentLine
 * });
 */
function lineReduce(geojson, callback, initialValue) {
    var previousValue = initialValue;
    lineEach(geojson, function (currentLine, featureIndex, multiFeatureIndex, geometryIndex) {
        if (featureIndex === 0 && initialValue === undefined) previousValue = currentLine;
        else previousValue = callback(previousValue, currentLine, featureIndex, multiFeatureIndex, geometryIndex);
    });
    return previousValue;
}

/**
 * Finds a particular 2-vertex LineString Segment from a GeoJSON using `@turf/meta` indexes.
 *
 * Negative indexes are permitted.
 * Point & MultiPoint will always return null.
 *
 * @param {FeatureCollection|Feature|Geometry} geojson Any GeoJSON Feature or Geometry
 * @param {Object} [options={}] Optional parameters
 * @param {number} [options.featureIndex=0] Feature Index
 * @param {number} [options.multiFeatureIndex=0] Multi-Feature Index
 * @param {number} [options.geometryIndex=0] Geometry Index
 * @param {number} [options.segmentIndex=0] Segment Index
 * @param {Object} [options.properties={}] Translate Properties to output LineString
 * @param {BBox} [options.bbox={}] Translate BBox to output LineString
 * @param {number|string} [options.id={}] Translate Id to output LineString
 * @returns {Feature<LineString>} 2-vertex GeoJSON Feature LineString
 * @example
 * var multiLine = turf.multiLineString([
 *     [[10, 10], [50, 30], [30, 40]],
 *     [[-10, -10], [-50, -30], [-30, -40]]
 * ]);
 *
 * // First Segment (defaults are 0)
 * turf.findSegment(multiLine);
 * // => Feature<LineString<[[10, 10], [50, 30]]>>
 *
 * // First Segment of 2nd Multi Feature
 * turf.findSegment(multiLine, {multiFeatureIndex: 1});
 * // => Feature<LineString<[[-10, -10], [-50, -30]]>>
 *
 * // Last Segment of Last Multi Feature
 * turf.findSegment(multiLine, {multiFeatureIndex: -1, segmentIndex: -1});
 * // => Feature<LineString<[[-50, -30], [-30, -40]]>>
 */
function findSegment(geojson, options) {
    // Optional Parameters
    options = options || {};
    if (!helpers.isObject(options)) throw new Error('options is invalid');
    var featureIndex = options.featureIndex || 0;
    var multiFeatureIndex = options.multiFeatureIndex || 0;
    var geometryIndex = options.geometryIndex || 0;
    var segmentIndex = options.segmentIndex || 0;

    // Find FeatureIndex
    var properties = options.properties;
    var geometry;

    switch (geojson.type) {
    case 'FeatureCollection':
        if (featureIndex < 0) featureIndex = geojson.features.length + featureIndex;
        properties = properties || geojson.features[featureIndex].properties;
        geometry = geojson.features[featureIndex].geometry;
        break;
    case 'Feature':
        properties = properties || geojson.properties;
        geometry = geojson.geometry;
        break;
    case 'Point':
    case 'MultiPoint':
        return null;
    case 'LineString':
    case 'Polygon':
    case 'MultiLineString':
    case 'MultiPolygon':
        geometry = geojson;
        break;
    default:
        throw new Error('geojson is invalid');
    }

    // Find SegmentIndex
    if (geometry === null) return null;
    var coords = geometry.coordinates;
    switch (geometry.type) {
    case 'Point':
    case 'MultiPoint':
        return null;
    case 'LineString':
        if (segmentIndex < 0) segmentIndex = coords.length + segmentIndex - 1;
        return helpers.lineString([coords[segmentIndex], coords[segmentIndex + 1]], properties, options);
    case 'Polygon':
        if (geometryIndex < 0) geometryIndex = coords.length + geometryIndex;
        if (segmentIndex < 0) segmentIndex = coords[geometryIndex].length + segmentIndex - 1;
        return helpers.lineString([coords[geometryIndex][segmentIndex], coords[geometryIndex][segmentIndex + 1]], properties, options);
    case 'MultiLineString':
        if (multiFeatureIndex < 0) multiFeatureIndex = coords.length + multiFeatureIndex;
        if (segmentIndex < 0) segmentIndex = coords[multiFeatureIndex].length + segmentIndex - 1;
        return helpers.lineString([coords[multiFeatureIndex][segmentIndex], coords[multiFeatureIndex][segmentIndex + 1]], properties, options);
    case 'MultiPolygon':
        if (multiFeatureIndex < 0) multiFeatureIndex = coords.length + multiFeatureIndex;
        if (geometryIndex < 0) geometryIndex = coords[multiFeatureIndex].length + geometryIndex;
        if (segmentIndex < 0) segmentIndex = coords[multiFeatureIndex][geometryIndex].length - segmentIndex - 1;
        return helpers.lineString([coords[multiFeatureIndex][geometryIndex][segmentIndex], coords[multiFeatureIndex][geometryIndex][segmentIndex + 1]], properties, options);
    }
    throw new Error('geojson is invalid');
}

/**
 * Finds a particular Point from a GeoJSON using `@turf/meta` indexes.
 *
 * Negative indexes are permitted.
 *
 * @param {FeatureCollection|Feature|Geometry} geojson Any GeoJSON Feature or Geometry
 * @param {Object} [options={}] Optional parameters
 * @param {number} [options.featureIndex=0] Feature Index
 * @param {number} [options.multiFeatureIndex=0] Multi-Feature Index
 * @param {number} [options.geometryIndex=0] Geometry Index
 * @param {number} [options.coordIndex=0] Coord Index
 * @param {Object} [options.properties={}] Translate Properties to output Point
 * @param {BBox} [options.bbox={}] Translate BBox to output Point
 * @param {number|string} [options.id={}] Translate Id to output Point
 * @returns {Feature<Point>} 2-vertex GeoJSON Feature Point
 * @example
 * var multiLine = turf.multiLineString([
 *     [[10, 10], [50, 30], [30, 40]],
 *     [[-10, -10], [-50, -30], [-30, -40]]
 * ]);
 *
 * // First Segment (defaults are 0)
 * turf.findPoint(multiLine);
 * // => Feature<Point<[10, 10]>>
 *
 * // First Segment of the 2nd Multi-Feature
 * turf.findPoint(multiLine, {multiFeatureIndex: 1});
 * // => Feature<Point<[-10, -10]>>
 *
 * // Last Segment of last Multi-Feature
 * turf.findPoint(multiLine, {multiFeatureIndex: -1, coordIndex: -1});
 * // => Feature<Point<[-30, -40]>>
 */
function findPoint(geojson, options) {
    // Optional Parameters
    options = options || {};
    if (!helpers.isObject(options)) throw new Error('options is invalid');
    var featureIndex = options.featureIndex || 0;
    var multiFeatureIndex = options.multiFeatureIndex || 0;
    var geometryIndex = options.geometryIndex || 0;
    var coordIndex = options.coordIndex || 0;

    // Find FeatureIndex
    var properties = options.properties;
    var geometry;

    switch (geojson.type) {
    case 'FeatureCollection':
        if (featureIndex < 0) featureIndex = geojson.features.length + featureIndex;
        properties = properties || geojson.features[featureIndex].properties;
        geometry = geojson.features[featureIndex].geometry;
        break;
    case 'Feature':
        properties = properties || geojson.properties;
        geometry = geojson.geometry;
        break;
    case 'Point':
    case 'MultiPoint':
        return null;
    case 'LineString':
    case 'Polygon':
    case 'MultiLineString':
    case 'MultiPolygon':
        geometry = geojson;
        break;
    default:
        throw new Error('geojson is invalid');
    }

    // Find Coord Index
    if (geometry === null) return null;
    var coords = geometry.coordinates;
    switch (geometry.type) {
    case 'Point':
        return helpers.point(coords, properties, options);
    case 'MultiPoint':
        if (multiFeatureIndex < 0) multiFeatureIndex = coords.length + multiFeatureIndex;
        return helpers.point(coords[multiFeatureIndex], properties, options);
    case 'LineString':
        if (coordIndex < 0) coordIndex = coords.length + coordIndex;
        return helpers.point(coords[coordIndex], properties, options);
    case 'Polygon':
        if (geometryIndex < 0) geometryIndex = coords.length + geometryIndex;
        if (coordIndex < 0) coordIndex = coords[geometryIndex].length + coordIndex;
        return helpers.point(coords[geometryIndex][coordIndex], properties, options);
    case 'MultiLineString':
        if (multiFeatureIndex < 0) multiFeatureIndex = coords.length + multiFeatureIndex;
        if (coordIndex < 0) coordIndex = coords[multiFeatureIndex].length + coordIndex;
        return helpers.point(coords[multiFeatureIndex][coordIndex], properties, options);
    case 'MultiPolygon':
        if (multiFeatureIndex < 0) multiFeatureIndex = coords.length + multiFeatureIndex;
        if (geometryIndex < 0) geometryIndex = coords[multiFeatureIndex].length + geometryIndex;
        if (coordIndex < 0) coordIndex = coords[multiFeatureIndex][geometryIndex].length - coordIndex;
        return helpers.point(coords[multiFeatureIndex][geometryIndex][coordIndex], properties, options);
    }
    throw new Error('geojson is invalid');
}

exports.coordEach = coordEach;
exports.coordReduce = coordReduce;
exports.propEach = propEach;
exports.propReduce = propReduce;
exports.featureEach = featureEach;
exports.featureReduce = featureReduce;
exports.coordAll = coordAll;
exports.geomEach = geomEach;
exports.geomReduce = geomReduce;
exports.flattenEach = flattenEach;
exports.flattenReduce = flattenReduce;
exports.segmentEach = segmentEach;
exports.segmentReduce = segmentReduce;
exports.lineEach = lineEach;
exports.lineReduce = lineReduce;
exports.findSegment = findSegment;
exports.findPoint = findPoint;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(10),
    getRawTag = __webpack_require__(46),
    objectToString = __webpack_require__(47);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsNative = __webpack_require__(56),
    getValue = __webpack_require__(61);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ }),
/* 18 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(20);


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__polyfills__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__package_json__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__package_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__package_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__L_PM_Map__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Toolbar_L_PM_Toolbar__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Draw_L_PM_Draw__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Draw_L_PM_Draw_Marker__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Draw_L_PM_Draw_Line__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Draw_L_PM_Draw_Poly__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Draw_L_PM_Draw_Rectangle__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Draw_L_PM_Draw_Circle__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Draw_L_PM_Draw_Cut__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Edit_L_PM_Edit__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Edit_L_PM_Edit_LayerGroup__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Edit_L_PM_Edit_Marker__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__Edit_L_PM_Edit_Line__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__Edit_L_PM_Edit_Poly__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__Edit_L_PM_Edit_Rectangle__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__Edit_L_PM_Edit_Circle__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__css_layers_css__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__css_layers_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18__css_layers_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__css_controls_css__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__css_controls_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_19__css_controls_css__);
/**
 *
 * A Leaflet Plugin For Editing Geometry Layers in Leaflet 1.0
 * by Sumit Kumar (@TweetsOfSumit)
 * Github Repo: https://github.com/codeofsumit/leaflet.pm
 */




















L.PM = L.PM || {
  Map: __WEBPACK_IMPORTED_MODULE_2__L_PM_Map__["a" /* default */],
  Toolbar: __WEBPACK_IMPORTED_MODULE_3__Toolbar_L_PM_Toolbar__["a" /* default */],
  Draw: __WEBPACK_IMPORTED_MODULE_4__Draw_L_PM_Draw__["a" /* default */],
  Edit: __WEBPACK_IMPORTED_MODULE_11__Edit_L_PM_Edit__["a" /* default */],
  version: __WEBPACK_IMPORTED_MODULE_1__package_json__["version"],
  initialize: function initialize() {
    this.addInitHooks();
  },
  addInitHooks: function addInitHooks() {
    function initMap() {
      if (!this.options.pmIgnore) {
        this.pm = new L.PM.Map(this);
      }
    }

    L.Map.addInitHook(initMap);

    function initLayerGroup() {
      this.pm = new L.PM.Edit.LayerGroup(this);
    }

    L.LayerGroup.addInitHook(initLayerGroup);

    function initMarker() {
      if (!this.options.pmIgnore) {
        this.pm = new L.PM.Edit.Marker(this);
      }
    }

    L.Marker.addInitHook(initMarker);

    function initPolyline() {
      if (!this.options.pmIgnore) {
        this.pm = new L.PM.Edit.Line(this);
      }
    }

    L.Polyline.addInitHook(initPolyline);

    function initPolygon() {
      if (!this.options.pmIgnore) {
        this.pm = new L.PM.Edit.Poly(this);
      }
    }

    L.Polygon.addInitHook(initPolygon);

    function initRectangle() {
      if (!this.options.pmIgnore) {
        this.pm = new L.PM.Edit.Rectangle(this);
      }
    }

    L.Rectangle.addInitHook(initRectangle);

    function initCircle() {
      if (!this.options.pmIgnore) {
        this.pm = new L.PM.Edit.Circle(this);
      }
    }

    L.Circle.addInitHook(initCircle);
  }
}; // initialize leaflet.pm

L.PM.initialize();

/***/ }),
/* 21 */
/***/ (function(module, exports) {

/* eslint-disable */
// Array.findIndex Polyfill
Array.prototype.findIndex = Array.prototype.findIndex || function (callback) {
  if (this === null) {
    throw new TypeError('Array.prototype.findIndex called on null or undefined');
  } else if (typeof callback !== 'function') {
    throw new TypeError('callback must be a function');
  }

  var list = Object(this); // Makes sures is always has an positive integer as length.

  var length = list.length >>> 0;
  var thisArg = arguments[1];

  for (var i = 0; i < length; i++) {
    if (callback.call(thisArg, list[i], i, list)) {
      return i;
    }
  }

  return -1;
}; // Array.find Polyfill for IE<12.
// Requested here: https://github.com/codeofsumit/leaflet.pm/issues/173


Array.prototype.find = Array.prototype.find || function (callback) {
  if (this === null) {
    throw new TypeError('Array.prototype.find called on null or undefined');
  } else if (typeof callback !== 'function') {
    throw new TypeError('callback must be a function');
  }

  var list = Object(this); // Makes sures is always has an positive integer as length.

  var length = list.length >>> 0;
  var thisArg = arguments[1];

  for (var i = 0; i < length; i++) {
    var element = list[i];

    if (callback.call(thisArg, element, i, list)) {
      return element;
    }
  }
}; // Polyfill for Object.assign()
// https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill


if (typeof Object.assign != 'function') {
  Object.assign = function (target) {
    'use strict';

    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    target = Object(target);

    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];

      if (source != null) {
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
    }

    return target;
  };
} // Polyfill for Element.remove()
// https://developer.mozilla.org/de/docs/Web/API/ChildNode/remove#Polyfill


(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('remove')) {
      return;
    }

    Object.defineProperty(item, 'remove', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function remove() {
        this.parentNode.removeChild(this);
      }
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = {"name":"leaflet.pm","version":"2.0.3","description":"A Leaflet Plugin For Editing Geometry Layers in Leaflet 1.0","keywords":["leaflet","polygon management","geometry editing","map data","map overlay","polygon","geojson","leaflet-draw","data-field-geojson","ui-leaflet-draw"],"files":["dist"],"main":"dist/leaflet.pm.min.js","dependencies":{"@turf/difference":"^6.0.2","@turf/intersect":"^6.1.3","@turf/kinks":"6.x","@turf/union":"^6.0.3","lodash":"^4.17.11"},"devDependencies":{"@babel/core":"^7.2.2","@babel/preset-env":"^7.3.1","babel-loader":"^8.0.5","css-loader":"^0.28.11","cypress":"^3.1.4","eslint":"^4.19.1","eslint-config-airbnb-base":"^12.1.0","eslint-config-prettier":"^3.6.0","eslint-plugin-cypress":"^2.2.0","eslint-plugin-import":"^2.15.0","extract-text-webpack-plugin":"^3.0.2","file-loader":"^0.11.1","leaflet":"^1.4.0","prettier":"1.16.1","style-loader":"^0.19.0","uglifyjs-webpack-plugin":"^1.3.0","url-loader":"^0.6.2","webpack":"^3.12.0"},"peerDependencies":{"leaflet":"^1.2.0"},"scripts":{"start":"npm run dev","dev":"./node_modules/.bin/webpack --config=webpack.dev.js","test":"$(npm bin)/cypress run","cypress":"$(npm bin)/cypress open","build":"./node_modules/.bin/webpack --config=webpack.build.js","prepare":"npm run build","eslint-check":"eslint --print-config . | eslint-config-prettier-check","eslint":"eslint src/ --fix","prettier":"prettier --write '{src,cypress}/**/*.{js,css}'","lint":"npm run eslint && npm run prettier"},"repository":{"type":"git","url":"git+https://github.com/codeofsumit/leaflet.pm.git"},"author":{"name":"Sumit Kumar","email":"sk@outlook.com","url":"http://twitter.com/TweetsOfSumit"},"license":"MIT","bugs":{"url":"https://github.com/codeofsumit/leaflet.pm/issues"},"homepage":"https://leafletpm.now.sh","prettier":{"trailingComma":"es5","tabWidth":2,"semi":true,"singleQuote":true}}

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__turf_union__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__turf_union___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__turf_union__);

var Map = L.Class.extend({
  initialize: function initialize(map) {
    this.map = map;
    this.Draw = new L.PM.Draw(map);
    this.Toolbar = new L.PM.Toolbar(map);
    this._globalRemovalMode = false;
    this._globalUnionMode = false;
  },
  addControls: function addControls(options) {
    this.Toolbar.addControls(options);
  },
  removeControls: function removeControls() {
    this.Toolbar.removeControls();
  },
  toggleControls: function toggleControls() {
    this.Toolbar.toggleControls();
  },
  controlsVisible: function controlsVisible() {
    return this.Toolbar.isVisible;
  },
  enableDraw: function enableDraw() {
    var shape = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Poly';
    var options = arguments.length > 1 ? arguments[1] : undefined;
    this.Draw.enable(shape, options);
  },
  disableDraw: function disableDraw() {
    var shape = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Poly';
    this.Draw.disable(shape);
  },
  setPathOptions: function setPathOptions(options) {
    this.Draw.setPathOptions(options);
  },
  findLayers: function findLayers() {
    var layers = [];
    this.map.eachLayer(function (layer) {
      if (layer instanceof L.Polyline || layer instanceof L.Marker || layer instanceof L.Circle) {
        layers.push(layer);
      }
    }); // filter out layers that don't have the leaflet.pm instance

    layers = layers.filter(function (layer) {
      return !!layer.pm;
    }); // filter out everything that's leaflet.pm specific temporary stuff

    layers = layers.filter(function (layer) {
      return !layer._pmTempLayer;
    });
    return layers;
  },
  removeLayer: function removeLayer(e) {
    var layer = e.target; // only remove layer, if it's handled by leaflet.pm,
    // not a tempLayer and not currently being dragged

    var removeable = !layer._pmTempLayer && (!layer.pm || !layer.pm.dragging());

    if (removeable) {
      layer.remove();
      this.map.fire('pm:remove', {
        layer: layer
      });
    }
  },
  uniteLayer: function uniteLayer(e) {
    var layer = e.target; // only remove layer, if it's handled by leaflet.pm,
    // not a tempLayer and not currently being dragged

    var unitable = !layer._pmTempLayer && (!layer.pm || !layer.pm.dragging()) && layer instanceof L.Polygon;

    if (unitable) {
      var l = this._unionLayer;

      if (this._unionLayer) {
        this._unionLayer = __WEBPACK_IMPORTED_MODULE_0__turf_union___default()(layer.toGeoJSON(), l.toGeoJSON()); // the resulting layer after the cut

        var resultingLayer = L.geoJSON(this._unionLayer, l.options).addTo(this.map);
        resultingLayer.addTo(this.map); // give the new layer the original options

        resultingLayer.pm.enable(this.options);
        resultingLayer.pm.disable();
        l.remove();
        layer.remove();
        this.map.fire('pm:union', {
          resultingLayer: resultingLayer
        });
      } else {
        this._unionLayer = layer;
      }
    }
  },
  globalDragModeEnabled: function globalDragModeEnabled() {
    return !!this._globalDragMode;
  },
  enableGlobalDragMode: function enableGlobalDragMode() {
    var layers = this.findLayers();
    this._globalDragMode = true;
    layers.forEach(function (layer) {
      layer.pm.enableLayerDrag();
    }); // remove map handler

    this.map.on('layeradd', this.layerAddHandler, this); // toogle the button in the toolbar if this is called programatically

    this.Toolbar.toggleButton('dragMode', this._globalDragMode);
  },
  disableGlobalDragMode: function disableGlobalDragMode() {
    var layers = this.findLayers();
    this._globalDragMode = false;
    layers.forEach(function (layer) {
      layer.pm.disableLayerDrag();
    }); // remove map handler

    this.map.off('layeradd', this.layerAddHandler, this); // toogle the button in the toolbar if this is called programatically

    this.Toolbar.toggleButton('dragMode', this._globalDragMode);
  },
  toggleGlobalDragMode: function toggleGlobalDragMode() {
    if (this.globalDragModeEnabled()) {
      this.disableGlobalDragMode();
    } else {
      this.enableGlobalDragMode();
    }
  },
  layerAddHandler: function layerAddHandler(_ref) {
    var layer = _ref.layer;
    // is this layer handled by leaflet.pm?
    var isRelevant = !!layer.pm && !layer._pmTempLayer; // do nothing if layer is not handled by leaflet so it doesn't fire unnecessarily

    if (!isRelevant) {
      return;
    } // re-enable global removal mode if it's enabled already


    if (this.globalRemovalEnabled()) {
      this.disableGlobalRemovalMode();
      this.enableGlobalRemovalMode();
    } // re-enable global edit mode if it's enabled already


    if (this.globalEditEnabled()) {
      this.disableGlobalEditMode();
      this.enableGlobalEditMode();
    } // re-enable global drag mode if it's enabled already


    if (this.globalDragModeEnabled()) {
      this.disableGlobalDragMode();
      this.enableGlobalDragMode();
    } // re-enable global union mode if it's enabled already


    if (this.globalUnionEnabled()) {
      this.disableGlobalUnionMode();
      this.enableGlobalUnionMode();
    }
  },
  disableGlobalRemovalMode: function disableGlobalRemovalMode() {
    var _this = this;

    this._globalRemovalMode = false;
    this.map.eachLayer(function (layer) {
      layer.off('click', _this.removeLayer, _this);
    }); // remove map handler

    this.map.off('layeradd', this.layerAddHandler, this); // toogle the button in the toolbar if this is called programatically

    this.Toolbar.toggleButton('deleteLayer', this._globalRemovalMode);
  },
  enableGlobalRemovalMode: function enableGlobalRemovalMode() {
    var _this2 = this;

    var isRelevant = function isRelevant(layer) {
      return layer.pm && !(layer.pm.options && layer.pm.options.preventMarkerRemoval);
    };

    this._globalRemovalMode = true; // handle existing layers

    this.map.eachLayer(function (layer) {
      if (isRelevant(layer)) {
        layer.on('click', _this2.removeLayer, _this2);
      }
    }); // handle layers that are added while in removal  xmode

    this.map.on('layeradd', this.layerAddHandler, this); // toogle the button in the toolbar if this is called programatically

    this.Toolbar.toggleButton('deleteLayer', this._globalRemovalMode);
  },
  toggleGlobalRemovalMode: function toggleGlobalRemovalMode() {
    // toggle global edit mode
    if (this.globalRemovalEnabled()) {
      this.disableGlobalRemovalMode();
    } else {
      this.enableGlobalRemovalMode();
    }
  },
  globalRemovalEnabled: function globalRemovalEnabled() {
    return !!this._globalRemovalMode;
  },
  disableGlobalUnionMode: function disableGlobalUnionMode() {
    var _this3 = this;

    this._globalUnionMode = false;
    this._unionLayer = undefined;
    this.map.eachLayer(function (layer) {
      layer.off('click', _this3.uniteLayer, _this3);
    }); // remove map handler

    this.map.off('layeradd', this.layerAddHandler, this); // toogle the button in the toolbar if this is called programatically

    this.Toolbar.toggleButton('unionMode', this._globalUnionMode);
  },
  enableGlobalUnionMode: function enableGlobalUnionMode() {
    var _this4 = this;

    var isRelevant = function isRelevant(layer) {
      return layer.pm;
    };

    this._globalUnionMode = true;
    this._unionLayer = undefined; // handle existing layers

    this.map.eachLayer(function (layer) {
      if (isRelevant(layer)) {
        layer.on('click', _this4.uniteLayer, _this4);
      }
    }); // handle layers that are added while in removal  xmode

    this.map.on('layeradd', this.layerAddHandler, this); // toogle the button in the toolbar if this is called programatically

    this.Toolbar.toggleButton('unionMode', this._globalUnionMode);
  },
  toggleGlobalUnionMode: function toggleGlobalUnionMode() {
    // toggle global edit mode
    if (this.globalUnionEnabled()) {
      this.disableGlobalUnionMode();
    } else {
      this.enableGlobalUnionMode();
    }
  },
  globalUnionEnabled: function globalUnionEnabled() {
    return !!this._globalUnionMode;
  },
  globalEditEnabled: function globalEditEnabled() {
    return this._globalEditMode;
  },
  enableGlobalEditMode: function enableGlobalEditMode(options) {
    // find all layers handled by leaflet.pm
    var layers = this.findLayers();
    this._globalEditMode = true;
    layers.forEach(function (layer) {
      // console.log(layer);
      layer.pm.enable(options);
    }); // handle layers that are added while in removal  xmode

    this.map.on('layeradd', this.layerAddHandler, this); // toggle the button in the toolbar

    this.Toolbar.toggleButton('editPolygon', this._globalEditMode); // fire event

    this._fireEditModeEvent(true);
  },
  disableGlobalEditMode: function disableGlobalEditMode() {
    // find all layers handles by leaflet.pm
    var layers = this.findLayers();
    this._globalEditMode = false;
    layers.forEach(function (layer) {
      layer.pm.disable();
    }); // handle layers that are added while in removal  xmode

    this.map.on('layeroff', this.layerAddHandler, this); // toggle the button in the toolbar

    this.Toolbar.toggleButton('editPolygon', this._globalEditMode); // fire event

    this._fireEditModeEvent(false);
  },
  _fireEditModeEvent: function _fireEditModeEvent(enabled) {
    this.map.fire('pm:globaleditmodetoggled', {
      enabled: enabled,
      map: this.map
    });
  },
  toggleGlobalEditMode: function toggleGlobalEditMode(options) {
    // console.log('toggle global edit mode', options);
    if (this.globalEditEnabled()) {
      // disable
      this.disableGlobalEditMode();
    } else {
      // enable
      this.enableGlobalEditMode(options);
    }
  }
});
/* harmony default export */ __webpack_exports__["a"] = (Map);

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var martinez = __webpack_require__(6);
var invariant_1 = __webpack_require__(7);
var helpers_1 = __webpack_require__(2);
/**
 * Takes two {@link (Multi)Polygon(s)} and returns a combined polygon. If the input polygons are not contiguous, this function returns a {@link MultiPolygon} feature.
 *
 * @name union
 * @param {Feature<Polygon|MultiPolygon>} polygon1 input Polygon feature
 * @param {Feature<Polygon|MultiPolygon>} polygon2 Polygon feature to difference from polygon1
 * @param {Object} [options={}] Optional Parameters
 * @param {Object} [options.properties={}] Translate Properties to output Feature
 * @returns {Feature<(Polygon|MultiPolygon)>} a combined {@link Polygon} or {@link MultiPolygon} feature
 * @example
 * var poly1 = turf.polygon([[
 *     [-82.574787, 35.594087],
 *     [-82.574787, 35.615581],
 *     [-82.545261, 35.615581],
 *     [-82.545261, 35.594087],
 *     [-82.574787, 35.594087]
 * ]], {"fill": "#0f0"});
 * var poly2 = turf.polygon([[
 *     [-82.560024, 35.585153],
 *     [-82.560024, 35.602602],
 *     [-82.52964, 35.602602],
 *     [-82.52964, 35.585153],
 *     [-82.560024, 35.585153]
 * ]], {"fill": "#00f"});
 *
 * var union = turf.union(poly1, poly2);
 *
 * //addToMap
 * var addToMap = [poly1, poly2, union];
 */
function union(polygon1, polygon2, options) {
    if (options === void 0) { options = {}; }
    var coords1 = invariant_1.getGeom(polygon1).coordinates;
    var coords2 = invariant_1.getGeom(polygon2).coordinates;
    var unioned = martinez.union(coords1, coords2);
    if (unioned.length === 0)
        return null;
    if (unioned.length === 1)
        return helpers_1.polygon(unioned[0], options.properties);
    else
        return helpers_1.multiPolygon(unioned, options.properties);
}
exports.default = union;


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__L_Controls__ = __webpack_require__(26);

L.Control.PMButton = __WEBPACK_IMPORTED_MODULE_0__L_Controls__["a" /* default */];
var Toolbar = L.Class.extend({
  options: {
    drawMarker: true,
    drawRectangle: true,
    drawPolyline: true,
    drawPolygon: true,
    drawCircle: true,
    editMode: true,
    dragMode: true,
    cutPolygon: true,
    unionMode: true,
    removalMode: true,
    position: 'topleft',
    textCancel: 'Cancel',
    textRemoveLastVertex: 'Remove Last Vertex',
    textFinish: 'Finish',
    textDrawMaker: 'Draw Marker',
    textDrawPolygon: 'Draw Polygon',
    textDrawPolyline: 'Draw Polyline',
    textDrawCircle: 'Draw Circle',
    textDrawRectangle: 'Draw Rectangle',
    textEditLayers: 'Edit Layers',
    textDragLayers: 'Drag Layers',
    textCutLayers: 'Cut Layers',
    textUnionMode: 'Union Mode',
    textRemovalMode: 'Removal Mode'
  },
  initialize: function initialize(map) {
    this.map = map;
    this.buttons = {};
    this.isVisible = false;
    this.drawContainer = L.DomUtil.create('div', 'leaflet-pm-toolbar leaflet-pm-draw leaflet-bar leaflet-control');
    this.editContainer = L.DomUtil.create('div', 'leaflet-pm-toolbar leaflet-pm-edit leaflet-bar leaflet-control'); // this._defineButtons();
  },
  getButtons: function getButtons() {
    return this.buttons;
  },
  addControls: function addControls() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.options;
    // adds all buttons to the map specified inside options
    console.log('add', options); // make button renaming backwards compatible

    if (typeof options.editPolygon !== 'undefined') {
      options.editMode = options.editPolygon;
    }

    if (typeof options.deleteLayer !== 'undefined') {
      options.removalMode = options.deleteLayer;
    } // first set the options


    L.Util.setOptions(this, options);
    console.log('setOptions', this);

    this._defineButtons();

    this.applyIconStyle(); // now show the specified buttons

    this._showHideButtons();

    this.isVisible = true;
  },
  applyIconStyle: function applyIconStyle() {
    var buttons = this.getButtons();
    var iconClasses = {
      geomanIcons: {
        drawMarker: 'control-icon leaflet-pm-icon-marker',
        drawPolyline: 'control-icon leaflet-pm-icon-polyline',
        drawRectangle: 'control-icon leaflet-pm-icon-rectangle',
        drawPolygon: 'control-icon leaflet-pm-icon-polygon',
        drawCircle: 'control-icon leaflet-pm-icon-circle',
        editMode: 'control-icon leaflet-pm-icon-edit',
        dragMode: 'control-icon leaflet-pm-icon-drag',
        cutPolygon: 'control-icon leaflet-pm-icon-cut',
        unionMode: 'control-icon leaflet-pm-icon-union',
        removalMode: 'control-icon leaflet-pm-icon-delete'
      }
    };

    for (var name in buttons) {
      var button = buttons[name];
      L.Util.setOptions(button, {
        className: iconClasses.geomanIcons[name]
      });
    }
  },
  removeControls: function removeControls() {
    // grab all buttons to loop through
    var buttons = this.getButtons(); // remove all buttons

    for (var btn in buttons) {
      buttons[btn].remove();
    }

    this.isVisible = false;
  },
  toggleControls: function toggleControls() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.options;

    if (this.isVisible) {
      this.removeControls();
    } else {
      this.addControls(options);
    }
  },
  _addButton: function _addButton(name, button) {
    this.buttons[name] = button;
    this.options[name] = this.options[name] || false;
    return this.buttons[name];
  },
  triggerClickOnToggledButtons: function triggerClickOnToggledButtons(exceptThisButton) {
    // this function is used when - e.g. drawing mode is enabled and a possible
    // other active mode (like removal tool) is already active.
    // we can't have two active modes because of possible event conflicts
    // so, we trigger a click on all currently active (toggled) buttons
    for (var name in this.buttons) {
      if (this.buttons[name] !== exceptThisButton && this.buttons[name].toggled()) {
        this.buttons[name]._triggerClick();
      }
    }
  },
  toggleButton: function toggleButton(name, status) {
    // does not fire the events/functionality of the button
    // this just changes the state and is used if a functionality (like Draw)
    // is enabled manually via script
    // backwards compatibility with button rename
    if (name === 'editPolygon') {
      name = 'editMode';
    }

    if (name === 'deleteLayer') {
      name = 'removalMode';
    } // as some mode got enabled, we still have to trigger the click on the other buttons
    // to disable their mode


    this.triggerClickOnToggledButtons(this.buttons[name]); // now toggle the state of the button

    return this.buttons[name].toggle(status);
  },
  _defineButtons: function _defineButtons() {
    var _this = this;

    console.log('_defineButtons', this); // some buttons are still in their respective classes, like L.PM.Draw.Poly

    var drawMarkerButton = {
      className: 'control-icon leaflet-pm-icon-marker',
      title: this.options.textDrawMaker,
      jsClass: 'Marker',
      onClick: function onClick() {},
      afterClick: function afterClick() {
        // toggle drawing mode
        _this.map.pm.Draw.Marker.toggle();
      },
      doToggle: true,
      toggleStatus: false,
      disableOtherButtons: true,
      position: this.options.position,
      actions: ['cancel'],
      actionsTitle: {
        cancel: this.options.textCancel
      }
    };
    var drawPolyButton = {
      title: this.options.textDrawPolygon,
      className: 'control-icon leaflet-pm-icon-polygon',
      jsClass: 'Poly',
      onClick: function onClick() {},
      afterClick: function afterClick() {
        // toggle drawing mode
        _this.map.pm.Draw.Poly.toggle();
      },
      doToggle: true,
      toggleStatus: false,
      disableOtherButtons: true,
      position: this.options.position,
      actions: ['finish', 'removeLastVertex', 'cancel'],
      actionsTitle: {
        finish: this.options.textFinish,
        cancel: this.options.textCancel,
        removeLastVertex: this.options.textRemoveLastVertex
      }
    };
    var drawLineButton = {
      className: 'control-icon leaflet-pm-icon-polyline',
      title: this.options.textDrawPolyline,
      jsClass: 'Line',
      onClick: function onClick() {},
      afterClick: function afterClick() {
        // toggle drawing mode
        _this.map.pm.Draw.Line.toggle();
      },
      doToggle: true,
      toggleStatus: false,
      disableOtherButtons: true,
      position: this.options.position,
      actions: ['finish', 'removeLastVertex', 'cancel'],
      actionsTitle: {
        finish: this.options.textFinish,
        cancel: this.options.textCancel,
        removeLastVertex: this.options.textRemoveLastVertex
      }
    };
    var drawCircleButton = {
      title: this.options.textDrawCircle,
      className: 'control-icon leaflet-pm-icon-circle',
      jsClass: 'Circle',
      onClick: function onClick() {},
      afterClick: function afterClick() {
        // toggle drawing mode
        _this.map.pm.Draw.Circle.toggle();
      },
      doToggle: true,
      toggleStatus: false,
      disableOtherButtons: true,
      position: this.options.position,
      actions: ['cancel'],
      actionsTitle: {
        cancel: this.options.textCancel
      }
    };
    var drawRectButton = {
      title: this.options.textDrawRectangle,
      className: 'control-icon leaflet-pm-icon-rectangle',
      jsClass: 'Rectangle',
      onClick: function onClick() {},
      afterClick: function afterClick() {
        // toggle drawing mode
        _this.map.pm.Draw.Rectangle.toggle();
      },
      doToggle: true,
      toggleStatus: false,
      disableOtherButtons: true,
      position: this.options.position,
      actions: ['cancel'],
      actionsTitle: {
        cancel: this.options.textCancel
      }
    };
    var editButton = {
      title: this.options.textEditLayers,
      className: 'control-icon leaflet-pm-icon-edit',
      onClick: function onClick() {},
      afterClick: function afterClick() {
        _this.map.pm.toggleGlobalEditMode();
      },
      doToggle: true,
      toggleStatus: false,
      disableOtherButtons: true,
      position: this.options.position,
      tool: 'edit',
      actions: ['cancel'],
      actionsTitle: {
        cancel: this.options.textCancel
      }
    };
    var dragButton = {
      title: this.options.textDragLayers,
      className: 'control-icon leaflet-pm-icon-drag',
      onClick: function onClick() {},
      afterClick: function afterClick() {
        _this.map.pm.toggleGlobalDragMode();
      },
      doToggle: true,
      toggleStatus: false,
      disableOtherButtons: true,
      position: this.options.position,
      tool: 'edit',
      actions: ['cancel'],
      actionsTitle: {
        cancel: this.options.textCancel
      }
    };
    var cutButton = {
      title: this.options.textCutLayers,
      className: 'control-icon leaflet-pm-icon-cut',
      jsClass: 'Cut',
      onClick: function onClick() {},
      afterClick: function afterClick() {
        // enable polygon drawing mode without snap
        _this.map.pm.Draw.Cut.toggle({
          snappable: true,
          cursorMarker: true,
          allowSelfIntersection: false
        });
      },
      doToggle: true,
      toggleStatus: false,
      disableOtherButtons: true,
      position: this.options.position,
      tool: 'edit',
      actions: ['finish', 'removeLastVertex', 'cancel'],
      actionsTitle: {
        finish: this.options.textFinish,
        cancel: this.options.textCancel,
        removeLastVertex: this.options.textRemoveLastVertex
      }
    };
    var unionButton = {
      title: this.options.textUnionMode,
      className: 'control-icon leaflet-pm-icon-union',
      jsClass: 'Union',
      onClick: function onClick() {},
      afterClick: function afterClick() {
        // enable polygon drawing mode without snap
        _this.map.pm.toggleGlobalUnionMode();
      },
      doToggle: true,
      toggleStatus: false,
      disableOtherButtons: true,
      position: this.options.position,
      tool: 'edit',
      actions: ['cancel'],
      actionsTitle: {
        cancel: this.options.textCancel
      }
    };
    var deleteButton = {
      title: this.options.textRemovalMode,
      className: 'control-icon leaflet-pm-icon-delete',
      onClick: function onClick() {},
      afterClick: function afterClick() {
        _this.map.pm.toggleGlobalRemovalMode();
      },
      doToggle: true,
      toggleStatus: false,
      disableOtherButtons: true,
      position: this.options.position,
      tool: 'edit',
      actions: ['cancel'],
      actionsTitle: {
        cancel: this.options.textCancel
      }
    };

    this._addButton('drawMarker', new L.Control.PMButton(drawMarkerButton));

    this._addButton('drawPolyline', new L.Control.PMButton(drawLineButton));

    this._addButton('drawRectangle', new L.Control.PMButton(drawRectButton));

    this._addButton('drawPolygon', new L.Control.PMButton(drawPolyButton));

    this._addButton('drawCircle', new L.Control.PMButton(drawCircleButton));

    this._addButton('editMode', new L.Control.PMButton(editButton));

    this._addButton('dragMode', new L.Control.PMButton(dragButton));

    this._addButton('cutPolygon', new L.Control.PMButton(cutButton));

    this._addButton('unionMode', new L.Control.PMButton(unionButton));

    this._addButton('removalMode', new L.Control.PMButton(deleteButton));
  },
  _showHideButtons: function _showHideButtons() {
    // remove all buttons, that's because the Toolbar can be added again with
    // different options so it's basically a reset and add again
    this.removeControls();
    var buttons = this.getButtons();

    for (var btn in buttons) {
      if (this.options[btn]) {
        // if options say the button should be visible, add it to the map
        buttons[btn].setPosition(this.options.position);
        buttons[btn].addTo(this.map);
      }
    }
  }
});
/* harmony default export */ __webpack_exports__["a"] = (Toolbar);

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var PMButton = L.Control.extend({
  options: {
    position: 'topleft'
  },
  // TODO: clean up variable names like _button should be _options and that domNodeVariable stuff
  initialize: function initialize(options) {
    this._button = L.Util.setOptions(this, options);
  },
  onAdd: function onAdd(map) {
    this._map = map;
    this._container = this._button.tool === 'edit' ? this._map.pm.Toolbar.editContainer : this._map.pm.Toolbar.drawContainer;
    this.buttonsDomNode = this._makeButton(this._button);

    this._container.appendChild(this.buttonsDomNode);

    return this._container;
  },
  onRemove: function onRemove() {
    this.buttonsDomNode.remove();
    return this._container;
  },
  getText: function getText() {
    return this._button.text;
  },
  getIconUrl: function getIconUrl() {
    return this._button.iconUrl;
  },
  destroy: function destroy() {
    this._button = {};

    this._update();
  },
  toggle: function toggle(e) {
    if (typeof e === 'boolean') {
      this._button.toggleStatus = e;
    } else {
      this._button.toggleStatus = !this._button.toggleStatus;
    }

    this._applyStyleClasses();

    return this._button.toggleStatus;
  },
  toggled: function toggled() {
    return this._button.toggleStatus;
  },
  onCreate: function onCreate() {
    this.toggle(false);
  },
  _triggerClick: function _triggerClick(e) {
    this._button.onClick(e);

    this._clicked(e);

    this._button.afterClick(e);
  },
  _makeButton: function _makeButton(button) {
    var _this = this;

    // button container
    var buttonContainer = L.DomUtil.create('div', 'button-container', this._container); // the button itself

    var newButton = L.DomUtil.create('a', 'leaflet-buttons-control-button', buttonContainer); // the buttons actions

    var actionContainer = L.DomUtil.create('div', 'leaflet-pm-actions-container', buttonContainer);
    var activeActions = button.actions;
    var actions = {
      cancel: {
        text: button.actionsTitle.cancel || 'Cancel',
        onClick: function onClick() {
          this._triggerClick();
        }
      },
      removeLastVertex: {
        text: button.actionsTitle.removeLastVertex || 'Remove Last Vertex',
        onClick: function onClick() {
          this._map.pm.Draw[button.jsClass]._removeLastVertex();
        }
      },
      finish: {
        text: button.actionsTitle.finish || 'Finish',
        onClick: function onClick(e) {
          this._map.pm.Draw[button.jsClass]._finishShape(e);
        }
      }
    };
    activeActions.forEach(function (name) {
      var action = actions[name];
      var actionNode = L.DomUtil.create('a', "leaflet-pm-action action-".concat(name), actionContainer);
      console.log(action.text);
      actionNode.innerHTML = action.text;
      L.DomEvent.addListener(actionNode, 'click', action.onClick, _this);
      L.DomEvent.disableClickPropagation(actionNode);
    });

    if (button.toggleStatus) {
      L.DomUtil.addClass(newButton, 'active');
    }

    var image = L.DomUtil.create('div', 'control-icon', newButton);

    if (button.title) {
      image.setAttribute('title', button.title);
    }

    if (button.iconUrl) {
      image.setAttribute('src', button.iconUrl);
    }

    if (button.className) {
      L.DomUtil.addClass(image, button.className);
    } // before the actual click, trigger a click on currently toggled buttons to
    // untoggle them and their functionality


    L.DomEvent.addListener(newButton, 'click', function () {
      if (_this._button.disableOtherButtons) {
        _this._map.pm.Toolbar.triggerClickOnToggledButtons(_this);
      }
    });
    L.DomEvent.addListener(newButton, 'click', this._triggerClick, this);
    L.DomEvent.disableClickPropagation(newButton);
    return buttonContainer;
  },
  _applyStyleClasses: function _applyStyleClasses() {
    if (!this._container) {
      return;
    }

    if (!this._button.toggleStatus) {
      L.DomUtil.removeClass(this.buttonsDomNode, 'active');
    } else {
      L.DomUtil.addClass(this.buttonsDomNode, 'active');
    }
  },
  _clicked: function _clicked() {
    if (this._button.doToggle) {
      this.toggle();
    }
  }
});
/* harmony default export */ __webpack_exports__["a"] = (PMButton);

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__L_PM_Draw__ = __webpack_require__(0);

__WEBPACK_IMPORTED_MODULE_0__L_PM_Draw__["a" /* default */].Marker = __WEBPACK_IMPORTED_MODULE_0__L_PM_Draw__["a" /* default */].extend({
  initialize: function initialize(map) {
    this._map = map;
    this._shape = 'Marker';
    this.toolbarButtonName = 'drawMarker';
  },
  enable: function enable(options) {
    // TODO: Think about if these options could be passed globally for all
    // instances of L.PM.Draw. So a dev could set drawing style one time as some kind of config
    L.Util.setOptions(this, options); // change enabled state

    this._enabled = true; // create a marker on click on the map

    this._map.on('click', this._createMarker, this); // toggle the draw button of the Toolbar in case drawing mode got enabled without the button


    this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, true); // this is the hintmarker on the mouse cursor


    this._hintMarker = L.marker([0, 0], this.options.markerStyle);
    this._hintMarker._pmTempLayer = true;

    this._hintMarker.addTo(this._map); // add tooltip to hintmarker


    if (this.options.tooltips) {
      console.log(this.options);

      this._hintMarker.bindTooltip(this.options.textHintPlaceMarker || 'Click to place marker', {
        permanent: true,
        offset: L.point(0, 10),
        direction: 'bottom',
        opacity: 0.8
      }).openTooltip();
    } // this is just to keep the snappable mixin happy


    this._layer = this._hintMarker; // sync hint marker with mouse cursor

    this._map.on('mousemove', this._syncHintMarker, this); // fire drawstart event


    this._map.fire('pm:drawstart', {
      shape: this._shape,
      workingLayer: this._layer
    }); // enable edit mode for existing markers


    this._map.eachLayer(function (layer) {
      if (layer instanceof L.Marker && layer.pm) {
        layer.pm.enable();
      }
    });
  },
  disable: function disable() {
    // cancel, if drawing mode isn't even enabled
    if (!this._enabled) {
      return;
    } // undbind click event, don't create a marker on click anymore


    this._map.off('click', this._createMarker, this); // remove hint marker


    this._hintMarker.remove(); // remove event listener to sync hint marker


    this._map.off('mousemove', this._syncHintMarker, this); // disable dragging and removing for all markers


    this._map.eachLayer(function (layer) {
      if (layer instanceof L.Marker && layer.pm && !layer._pmTempLayer) {
        layer.pm.disable();
      }
    }); // fire drawend event


    this._map.fire('pm:drawend', {
      shape: this._shape
    }); // toggle the draw button of the Toolbar in case drawing mode got disabled without the button


    this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, false); // change enabled state


    this._enabled = false;
  },
  enabled: function enabled() {
    return this._enabled;
  },
  toggle: function toggle(options) {
    if (this.enabled()) {
      this.disable();
    } else {
      this.enable(options);
    }
  },
  _createMarker: function _createMarker(e) {
    if (!e.latlng) {
      return;
    } // assign the coordinate of the click to the hintMarker, that's necessary for
    // mobile where the marker can't follow a cursor


    if (!this._hintMarker._snapped) {
      this._hintMarker.setLatLng(e.latlng);
    } // get coordinate for new vertex by hintMarker (cursor marker)


    var latlng = this._hintMarker.getLatLng(); // create marker


    var marker = new L.Marker(latlng, this.options.markerStyle); // add marker to the map

    marker.addTo(this._map); // enable editing for the marker

    marker.pm.enable(); // fire the pm:create event and pass shape and marker

    this._map.fire('pm:create', {
      shape: this._shape,
      marker: marker,
      // DEPRECATED
      layer: marker
    });

    this._cleanupSnapping();
  },
  _syncHintMarker: function _syncHintMarker(e) {
    // move the cursor marker
    this._hintMarker.setLatLng(e.latlng); // if snapping is enabled, do it


    if (this.options.snappable) {
      var fakeDragEvent = e;
      fakeDragEvent.target = this._hintMarker;

      this._handleSnapping(fakeDragEvent);
    }
  }
});

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__turf_kinks__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__turf_kinks___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__turf_kinks__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__L_PM_Draw__ = __webpack_require__(0);


__WEBPACK_IMPORTED_MODULE_1__L_PM_Draw__["a" /* default */].Line = __WEBPACK_IMPORTED_MODULE_1__L_PM_Draw__["a" /* default */].extend({
  initialize: function initialize(map) {
    this._map = map;
    this._shape = 'Line';
    this.toolbarButtonName = 'drawPolyline';
    this._doesSelfIntersect = false;
  },
  enable: function enable(options) {
    L.Util.setOptions(this, options); // fallback option for finishOnDoubleClick
    // TODO: remove in a later release

    if (this.options.finishOnDoubleClick && !this.options.finishOn) {
      this.options.finishOn = 'dblclick';
    } // enable draw mode


    this._enabled = true; // create a new layergroup

    this._layerGroup = new L.LayerGroup();
    this._layerGroup._pmTempLayer = true;

    this._layerGroup.addTo(this._map); // this is the polyLine that'll make up the polygon


    this._layer = L.polyline([], this.options.templineStyle);
    this._layer._pmTempLayer = true;

    this._layerGroup.addLayer(this._layer); // this is the hintline from the mouse cursor to the last marker


    this._hintline = L.polyline([], this.options.hintlineStyle);
    this._hintline._pmTempLayer = true;

    this._layerGroup.addLayer(this._hintline); // this is the hintmarker on the mouse cursor


    this._hintMarker = L.marker(this._map.getCenter(), {
      icon: L.divIcon({
        className: 'marker-icon cursor-marker'
      })
    });
    this._hintMarker._pmTempLayer = true;

    this._layerGroup.addLayer(this._hintMarker); // show the hintmarker if the option is set


    if (this.options.cursorMarker) {
      L.DomUtil.addClass(this._hintMarker._icon, 'visible');
    } // add tooltip to hintmarker


    if (this.options.tooltips) {
      this._hintMarker.bindTooltip(this.options.textHintFirstVertex || 'Click to place first vertex', {
        permanent: true,
        offset: L.point(0, 10),
        direction: 'bottom',
        opacity: 0.8
      }).openTooltip();
    } // change map cursor


    this._map._container.style.cursor = 'crosshair'; // create a polygon-point on click

    this._map.on('click', this._createVertex, this); // finish on layer event
    // #http://leafletjs.com/reference-1.2.0.html#interactive-layer-click


    if (this.options.finishOn) {
      this._map.on(this.options.finishOn, this._finishShape, this);
    } // prevent zoom on double click if finishOn is === dblclick


    if (this.options.finishOn === 'dblclick') {
      this.tempMapDoubleClickZoomState = this._map.doubleClickZoom._enabled;

      if (this.tempMapDoubleClickZoomState) {
        this._map.doubleClickZoom.disable();
      }
    } // sync hint marker with mouse cursor


    this._map.on('mousemove', this._syncHintMarker, this); // sync the hintline with hint marker


    this._hintMarker.on('move', this._syncHintLine, this); // fire drawstart event


    this._map.fire('pm:drawstart', {
      shape: this._shape,
      workingLayer: this._layer
    }); // toggle the draw button of the Toolbar in case drawing mode got enabled without the button


    this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, true); // an array used in the snapping mixin.
    // TODO: think about moving this somewhere else?


    this._otherSnapLayers = [];
  },
  disable: function disable() {
    // disable draw mode
    // cancel, if drawing mode isn't even enabled
    if (!this._enabled) {
      return;
    }

    this._enabled = false; // reset cursor

    this._map._container.style.cursor = ''; // unbind listeners

    this._map.off('click', this._createVertex, this);

    this._map.off('mousemove', this._syncHintMarker, this);

    if (this.options.finishOn) {
      this._map.off(this.options.finishOn, this._finishShape, this);
    }

    if (this.tempMapDoubleClickZoomState) {
      this._map.doubleClickZoom.enable();
    } // remove layer


    this._map.removeLayer(this._layerGroup); // fire drawend event


    this._map.fire('pm:drawend', {
      shape: this._shape
    }); // toggle the draw button of the Toolbar in case drawing mode got disabled without the button


    this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, false); // cleanup snapping


    if (this.options.snappable) {
      this._cleanupSnapping();
    }
  },
  enabled: function enabled() {
    return this._enabled;
  },
  toggle: function toggle(options) {
    if (this.enabled()) {
      this.disable();
    } else {
      this.enable(options);
    }
  },
  hasSelfIntersection: function hasSelfIntersection() {
    // check for self intersection of the layer and return true/false
    var selfIntersection = __WEBPACK_IMPORTED_MODULE_0__turf_kinks___default()(this._layer.toGeoJSON(15));
    return selfIntersection.features.length > 0;
  },
  _syncHintLine: function _syncHintLine() {
    var polyPoints = this._layer.getLatLngs();

    if (polyPoints.length > 0) {
      var lastPolygonPoint = polyPoints[polyPoints.length - 1]; // set coords for hintline from marker to last vertex of drawin polyline

      this._hintline.setLatLngs([lastPolygonPoint, this._hintMarker.getLatLng()]);
    }
  },
  _syncHintMarker: function _syncHintMarker(e) {
    // move the cursor marker
    this._hintMarker.setLatLng(e.latlng); // if snapping is enabled, do it


    if (this.options.snappable) {
      var fakeDragEvent = e;
      fakeDragEvent.target = this._hintMarker;

      this._handleSnapping(fakeDragEvent);
    } // if self-intersection is forbidden, handle it


    if (!this.options.allowSelfIntersection) {
      this._handleSelfIntersection(true, e.latlng);
    }
  },
  _handleSelfIntersection: function _handleSelfIntersection(addVertex, latlng) {
    // ok we need to check the self intersection here
    // problem: during draw, the marker on the cursor is not yet part
    // of the layer. So we need to clone the layer, add the
    // potential new vertex (cursor markers latlngs) and check the self
    // intersection on the clone. Phew... - let's do it 💪
    // clone layer (polyline is enough, even when it's a polygon)
    var clone = L.polyline(this._layer.getLatLngs());

    if (addVertex) {
      // get vertex from param or from hintmarker
      if (!latlng) {
        latlng = this._hintMarker.getLatLng();
      } // add the vertex


      clone.addLatLng(latlng);
    } // check the self intersection


    var selfIntersection = __WEBPACK_IMPORTED_MODULE_0__turf_kinks___default()(clone.toGeoJSON(15));
    this._doesSelfIntersect = selfIntersection.features.length > 0; // change the style based on self intersection

    if (this._doesSelfIntersect) {
      this._hintline.setStyle({
        color: 'red'
      });
    } else {
      this._hintline.setStyle(this.options.hintlineStyle);
    }
  },
  _removeLastVertex: function _removeLastVertex() {
    // remove last coords
    var coords = this._layer.getLatLngs();

    var removedCoord = coords.pop(); // if all coords are gone, cancel drawing

    if (coords.length < 1) {
      this.disable();
      return;
    } // find corresponding marker


    var marker = this._layerGroup.getLayers().filter(function (l) {
      return l instanceof L.Marker;
    }).filter(function (l) {
      return !L.DomUtil.hasClass(l._icon, 'cursor-marker');
    }).find(function (l) {
      return l.getLatLng() === removedCoord;
    }); // remove that marker


    this._layerGroup.removeLayer(marker); // update layer with new coords


    this._layer.setLatLngs(coords); // sync the hintline again


    this._syncHintLine();
  },
  _createVertex: function _createVertex(e) {
    // don't create a vertex if we have a selfIntersection and it is not allowed
    if (!this.options.allowSelfIntersection) {
      this._handleSelfIntersection(true, e.latlng);

      if (this._doesSelfIntersect) {
        return;
      }
    } // assign the coordinate of the click to the hintMarker, that's necessary for
    // mobile where the marker can't follow a cursor


    if (!this._hintMarker._snapped) {
      this._hintMarker.setLatLng(e.latlng);
    } // get coordinate for new vertex by hintMarker (cursor marker)


    var latlng = this._hintMarker.getLatLng(); // check if the first and this vertex have the same latlng


    if (latlng.equals(this._layer.getLatLngs()[0])) {
      // yes? finish the polygon
      this._finishShape(e); // "why?", you ask? Because this happens when we snap the last vertex to the first one
      // and then click without hitting the last marker. Click happens on the map
      // in 99% of cases it's because the user wants to finish the polygon. So...


      return;
    } // is this the first point?


    var first = this._layer.getLatLngs().length === 0;

    this._layer.addLatLng(latlng);

    var newMarker = this._createMarker(latlng, first);

    this._hintline.setLatLngs([latlng, latlng]);

    this._layer.fire('pm:vertexadded', {
      shape: this._shape,
      workingLayer: this._layer,
      marker: newMarker,
      latlng: latlng
    });
  },
  _finishShape: function _finishShape() {
    // if self intersection is not allowed, do not finish the shape!
    if (!this.options.allowSelfIntersection) {
      this._handleSelfIntersection(false);

      if (this._doesSelfIntersect) {
        return;
      }
    } // get coordinates


    var coords = this._layer.getLatLngs(); // if there is only one coords, don't finish the shape!


    if (coords.length <= 1) {
      return;
    } // create the leaflet shape and add it to the map


    var polylineLayer = L.polyline(coords, this.options.pathOptions).addTo(this._map); // disable drawing

    this.disable(); // fire the pm:create event and pass shape and layer

    this._map.fire('pm:create', {
      shape: this._shape,
      layer: polylineLayer
    });

    if (this.options.snappable) {
      this._cleanupSnapping();
    }
  },
  _createMarker: function _createMarker(latlng, first) {
    // create the new marker
    var marker = new L.Marker(latlng, {
      draggable: false,
      icon: L.divIcon({
        className: 'marker-icon'
      })
    });
    marker._pmTempLayer = true; // add it to the map

    this._layerGroup.addLayer(marker); // a click on any marker finishes this shape


    marker.on('click', this._finishShape, this); // handle tooltip text

    if (first) {
      this._hintMarker.setTooltipContent(this.options.textHintContinueDrawing || 'Click to continue drawing');
    }

    var second = this._layer.getLatLngs().length === 2;

    if (second) {
      this._hintMarker.setTooltipContent(this.options.textHintExistingMarkerToFinish || 'Click any existing marker to finish');
    }

    return marker;
  }
});

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__L_PM_Draw__ = __webpack_require__(0);

__WEBPACK_IMPORTED_MODULE_0__L_PM_Draw__["a" /* default */].Poly = __WEBPACK_IMPORTED_MODULE_0__L_PM_Draw__["a" /* default */].Line.extend({
  initialize: function initialize(map) {
    this._map = map;
    this._shape = 'Poly';
    this.toolbarButtonName = 'drawPolygon';
  },
  _finishShape: function _finishShape(e) {
    // if self intersection is not allowed, do not finish the shape!
    if (!this.options.allowSelfIntersection) {
      this._handleSelfIntersection(false);

      if (this._doesSelfIntersect) {
        return;
      }
    } // get coordinates


    var coords = this._layer.getLatLngs(); // if there is only one coords, don't finish the shape!


    if (coords.length <= 1) {
      return;
    } // create the leaflet shape and add it to the map


    if (e && e.type === 'dblclick') {
      // Leaflet creates an extra node with double click
      coords.splice(coords.length - 1, 1);
    }

    var polygonLayer = L.polygon(coords, this.options.pathOptions).addTo(this._map); // disable drawing

    this.disable(); // fire the pm:create event and pass shape and layer

    this._map.fire('pm:create', {
      shape: this._shape,
      layer: polygonLayer
    }); // clean up snapping states


    this._cleanupSnapping(); // remove the first vertex from "other snapping layers"


    this._otherSnapLayers.splice(this._tempSnapLayerIndex, 1);

    delete this._tempSnapLayerIndex;
  },
  _createMarker: function _createMarker(latlng, first) {
    // create the new marker
    var marker = new L.Marker(latlng, {
      draggable: false,
      icon: L.divIcon({
        className: 'marker-icon'
      })
    }); // mark this marker as temporary

    marker._pmTempLayer = true; // add it to the map

    this._layerGroup.addLayer(marker); // if the first marker gets clicked again, finish this shape


    if (first) {
      marker.on('click', this._finishShape, this); // add the first vertex to "other snapping layers" so the polygon is easier to finish

      this._tempSnapLayerIndex = this._otherSnapLayers.push(marker) - 1;

      if (this.options.snappable) {
        this._cleanupSnapping();
      }
    } // handle tooltip text


    if (first) {
      this._hintMarker.setTooltipContent(this.options.textHintContinueDrawing || 'Click to continue drawing');
    }

    var third = this._layer.getLatLngs().length === 3;

    if (third) {
      this._hintMarker.setTooltipContent(this.options.textHintFirstMarkerToFinish || 'Click first marker to finish');
    }

    return marker;
  }
});

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__L_PM_Draw__ = __webpack_require__(0);

__WEBPACK_IMPORTED_MODULE_0__L_PM_Draw__["a" /* default */].Rectangle = __WEBPACK_IMPORTED_MODULE_0__L_PM_Draw__["a" /* default */].extend({
  initialize: function initialize(map) {
    this._map = map;
    this._shape = 'Rectangle';
    this.toolbarButtonName = 'drawRectangle';
  },
  enable: function enable(options) {
    // TODO: Think about if these options could be passed globally for all
    // instances of L.PM.Draw. So a dev could set drawing style one time as some kind of config
    L.Util.setOptions(this, options);
    console.log(this.options); // enable draw mode

    this._enabled = true; // create a new layergroup

    this._layerGroup = new L.LayerGroup();
    this._layerGroup._pmTempLayer = true;

    this._layerGroup.addTo(this._map); // the rectangle we want to draw


    this._layer = L.rectangle([[0, 0], [0, 0]], this.options.pathOptions);
    this._layer._pmTempLayer = true; // this is the marker at the origin of the rectangle
    // this needs to be present, for tracking purposes, but we'll make it invisible if a user doesn't want to see it!

    this._startMarker = L.marker([0, 0], {
      icon: L.divIcon({
        className: 'marker-icon rect-start-marker'
      }),
      draggable: true,
      zIndexOffset: 100,
      opacity: this.options.cursorMarker ? 1 : 0
    });
    this._startMarker._pmTempLayer = true;

    this._layerGroup.addLayer(this._startMarker); // this is the hintmarker on the mouse cursor


    this._hintMarker = L.marker([0, 0], {
      icon: L.divIcon({
        className: 'marker-icon cursor-marker'
      })
    });
    this._hintMarker._pmTempLayer = true;

    this._layerGroup.addLayer(this._hintMarker); // add tooltip to hintmarker


    if (this.options.tooltips) {
      this._hintMarker.bindTooltip(this.options.textHintFirstVertex || 'Click to place first vertex', {
        permanent: true,
        offset: L.point(0, 10),
        direction: 'bottom',
        opacity: 0.8
      }).openTooltip();
    } // show the hintmarker if the option is set


    if (this.options.cursorMarker) {
      L.DomUtil.addClass(this._hintMarker._icon, 'visible'); // Add two more matching style markers, if cursor marker is rendered

      this._styleMarkers = [];

      for (var i = 0; i < 2; i += 1) {
        var styleMarker = L.marker([0, 0], {
          icon: L.divIcon({
            className: 'marker-icon rect-style-marker'
          }),
          draggable: true,
          zIndexOffset: 100
        });
        styleMarker._pmTempLayer = true;

        this._layerGroup.addLayer(styleMarker);

        this._styleMarkers.push(styleMarker);
      }
    } // change map cursor


    this._map._container.style.cursor = 'crosshair'; // create a polygon-point on click

    this._map.on('click', this._placeStartingMarkers, this); // sync hint marker with mouse cursor


    this._map.on('mousemove', this._syncHintMarker, this); // fire drawstart event


    this._map.fire('pm:drawstart', {
      shape: this._shape,
      workingLayer: this._layer
    }); // toggle the draw button of the Toolbar in case drawing mode got enabled without the button


    this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, true); // an array used in the snapping mixin.
    // TODO: think about moving this somewhere else?


    this._otherSnapLayers = [];
  },
  disable: function disable() {
    // disable drawing mode
    // cancel, if drawing mode isn't event enabled
    if (!this._enabled) {
      return;
    }

    this._enabled = false; // reset cursor

    this._map._container.style.cursor = ''; // unbind listeners

    this._map.off('click', this._finishShape, this);

    this._map.off('click', this._placeStartingMarkers, this);

    this._map.off('mousemove', this._syncHintMarker, this); // remove helping layers


    this._map.removeLayer(this._layerGroup); // fire drawend event


    this._map.fire('pm:drawend', {
      shape: this._shape
    }); // toggle the draw button of the Toolbar in case drawing mode got disabled without the button


    this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, false); // cleanup snapping


    if (this.options.snappable) {
      this._cleanupSnapping();
    }
  },
  enabled: function enabled() {
    return this._enabled;
  },
  toggle: function toggle(options) {
    if (this.enabled()) {
      this.disable();
    } else {
      this.enable(options);
    }
  },
  _placeStartingMarkers: function _placeStartingMarkers(e) {
    // assign the coordinate of the click to the hintMarker, that's necessary for
    // mobile where the marker can't follow a cursor
    if (!this._hintMarker._snapped) {
      this._hintMarker.setLatLng(e.latlng);
    } // get coordinate for new vertex by hintMarker (cursor marker)


    var latlng = this._hintMarker.getLatLng(); // show and place start marker


    L.DomUtil.addClass(this._startMarker._icon, 'visible');

    this._startMarker.setLatLng(latlng); // if we have the other two visibilty markers, show and place them now


    if (this.options.cursorMarker && this._styleMarkers) {
      this._styleMarkers.forEach(function (styleMarker) {
        L.DomUtil.addClass(styleMarker._icon, 'visible');
        styleMarker.setLatLng(latlng);
      });
    }

    this._map.off('click', this._placeStartingMarkers, this);

    this._map.on('click', this._finishShape, this); // change tooltip text


    this._hintMarker.setTooltipContent(this.options.textHintFinish || 'Click to finish');

    this._setRectangleOrigin();
  },
  _setRectangleOrigin: function _setRectangleOrigin() {
    var latlng = this._startMarker.getLatLng();

    if (latlng) {
      // show it first
      this._layerGroup.addLayer(this._layer);

      this._layer.setLatLngs([latlng, latlng]);

      this._hintMarker.on('move', this._syncRectangleSize, this);
    }
  },
  _syncHintMarker: function _syncHintMarker(e) {
    // move the cursor marker
    this._hintMarker.setLatLng(e.latlng); // if snapping is enabled, do it


    if (this.options.snappable) {
      var fakeDragEvent = e;
      fakeDragEvent.target = this._hintMarker;

      this._handleSnapping(fakeDragEvent);
    }
  },
  _syncRectangleSize: function _syncRectangleSize() {
    var _this = this;

    // Create a box using corners A & B (A = Starting Position, B = Current Mouse Position)
    var A = this._startMarker.getLatLng();

    var B = this._hintMarker.getLatLng();

    this._layer.setBounds([A, B]); // Add matching style markers, if cursor marker is shown


    if (this.options.cursorMarker && this._styleMarkers) {
      var corners = this._findCorners();

      var unmarkedCorners = []; // Find two corners not currently occupied by starting marker and hint marker

      corners.forEach(function (corner) {
        if (!corner.equals(_this._startMarker.getLatLng()) && !corner.equals(_this._hintMarker.getLatLng())) {
          unmarkedCorners.push(corner);
        }
      }); // Reposition style markers

      unmarkedCorners.forEach(function (unmarkedCorner, index) {
        _this._styleMarkers[index].setLatLng(unmarkedCorner);
      });
    }
  },
  _finishShape: function _finishShape(e) {
    // create the final rectangle layer, based on opposite corners A & B
    var A = this._startMarker.getLatLng();

    var B = e.latlng;
    var rectangleLayer = L.rectangle([A, B], this.options.pathOptions).addTo(this._map); // disable drawing

    this.disable(); // fire the pm:create event and pass shape and layer

    this._map.fire('pm:create', {
      shape: this._shape,
      layer: rectangleLayer
    });
  },
  _findCorners: function _findCorners() {
    var corners = this._layer.getBounds();

    var northwest = corners.getNorthWest();
    var northeast = corners.getNorthEast();
    var southeast = corners.getSouthEast();
    var southwest = corners.getSouthWest();
    return [northwest, northeast, southeast, southwest];
  }
});

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__L_PM_Draw__ = __webpack_require__(0);

__WEBPACK_IMPORTED_MODULE_0__L_PM_Draw__["a" /* default */].Circle = __WEBPACK_IMPORTED_MODULE_0__L_PM_Draw__["a" /* default */].extend({
  initialize: function initialize(map) {
    this._map = map;
    this._shape = 'Circle';
    this.toolbarButtonName = 'drawCircle';
  },
  enable: function enable(options) {
    // TODO: Think about if these options could be passed globally for all
    // instances of L.PM.Draw. So a dev could set drawing style one time as some kind of config
    L.Util.setOptions(this, options);
    this.options.radius = 0; // enable draw mode

    this._enabled = true; // create a new layergroup

    this._layerGroup = new L.LayerGroup();
    this._layerGroup._pmTempLayer = true;

    this._layerGroup.addTo(this._map); // this is the circle we want to draw


    this._layer = L.circle([0, 0], this.options.templineStyle);
    this._layer._pmTempLayer = true;

    this._layerGroup.addLayer(this._layer); // this is the marker in the center of the circle


    this._centerMarker = L.marker([0, 0], {
      icon: L.divIcon({
        className: 'marker-icon'
      }),
      draggable: false,
      zIndexOffset: 100
    });
    this._centerMarker._pmTempLayer = true;

    this._layerGroup.addLayer(this._centerMarker); // this is the hintmarker on the mouse cursor


    this._hintMarker = L.marker([0, 0], {
      icon: L.divIcon({
        className: 'marker-icon cursor-marker'
      })
    });
    this._hintMarker._pmTempLayer = true;

    this._layerGroup.addLayer(this._hintMarker); // show the hintmarker if the option is set


    if (this.options.cursorMarker) {
      L.DomUtil.addClass(this._hintMarker._icon, 'visible');
    } // add tooltip to hintmarker


    if (this.options.tooltips) {
      this._hintMarker.bindTooltip(this.options.textHintCircleCenter || 'Click to place circle center', {
        permanent: true,
        offset: L.point(0, 10),
        direction: 'bottom',
        opacity: 0.8
      }).openTooltip();
    } // this is the hintline from the hint marker to the center marker


    this._hintline = L.polyline([], this.options.hintlineStyle);
    this._hintline._pmTempLayer = true;

    this._layerGroup.addLayer(this._hintline); // change map cursor


    this._map._container.style.cursor = 'crosshair'; // create a polygon-point on click

    this._map.on('click', this._placeCenterMarker, this); // sync hint marker with mouse cursor


    this._map.on('mousemove', this._syncHintMarker, this); // fire drawstart event


    this._map.fire('pm:drawstart', {
      shape: this._shape,
      workingLayer: this._layer
    }); // toggle the draw button of the Toolbar in case drawing mode got enabled without the button


    this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, true); // an array used in the snapping mixin.
    // TODO: think about moving this somewhere else?


    this._otherSnapLayers = [];
  },
  disable: function disable() {
    // disable drawing mode
    // cancel, if drawing mode isn't event enabled
    if (!this._enabled) {
      return;
    }

    this._enabled = false; // reset cursor

    this._map._container.style.cursor = ''; // unbind listeners

    this._map.off('click', this._finishShape, this);

    this._map.off('click', this._placeCenterMarker, this);

    this._map.off('mousemove', this._syncHintMarker, this); // remove helping layers


    this._map.removeLayer(this._layerGroup); // fire drawend event


    this._map.fire('pm:drawend', {
      shape: this._shape
    }); // toggle the draw button of the Toolbar in case drawing mode got disabled without the button


    this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, false); // cleanup snapping


    if (this.options.snappable) {
      this._cleanupSnapping();
    }
  },
  enabled: function enabled() {
    return this._enabled;
  },
  toggle: function toggle(options) {
    if (this.enabled()) {
      this.disable();
    } else {
      this.enable(options);
    }
  },
  _syncHintLine: function _syncHintLine() {
    var latlng = this._centerMarker.getLatLng(); // set coords for hintline from marker to last vertex of drawin polyline


    this._hintline.setLatLngs([latlng, this._hintMarker.getLatLng()]);
  },
  _syncCircleRadius: function _syncCircleRadius() {
    var A = this._centerMarker.getLatLng();

    var B = this._hintMarker.getLatLng();

    var distance = A.distanceTo(B);

    this._layer.setRadius(distance);
  },
  _syncHintMarker: function _syncHintMarker(e) {
    // move the cursor marker
    this._hintMarker.setLatLng(e.latlng); // if snapping is enabled, do it


    if (this.options.snappable) {
      var fakeDragEvent = e;
      fakeDragEvent.target = this._hintMarker;

      this._handleSnapping(fakeDragEvent);
    }
  },
  _placeCenterMarker: function _placeCenterMarker(e) {
    // assign the coordinate of the click to the hintMarker, that's necessary for
    // mobile where the marker can't follow a cursor
    if (!this._hintMarker._snapped) {
      this._hintMarker.setLatLng(e.latlng);
    } // get coordinate for new vertex by hintMarker (cursor marker)


    var latlng = this._hintMarker.getLatLng();

    this._centerMarker.setLatLng(latlng);

    this._map.off('click', this._placeCenterMarker, this);

    this._map.on('click', this._finishShape, this);

    this._placeCircleCenter();
  },
  _placeCircleCenter: function _placeCircleCenter() {
    var latlng = this._centerMarker.getLatLng();

    if (latlng) {
      this._layer.setLatLng(latlng); // sync the hintline with hint marker


      this._hintMarker.on('move', this._syncHintLine, this);

      this._hintMarker.on('move', this._syncCircleRadius, this);

      this._hintMarker.setTooltipContent(this.options.textHintFinish || 'Click to finish circle');

      this._layer.fire('pm:centerplaced', {
        shape: this._shape,
        workingLayer: this._layer,
        latlng: latlng
      });
    }
  },
  _finishShape: function _finishShape(e) {
    // calc the radius
    var center = this._centerMarker.getLatLng();

    var cursor = e.latlng;
    var radius = center.distanceTo(cursor);
    var options = Object.assign({}, this.options.pathOptions, {
      radius: radius
    }); // create the final circle layer

    var circleLayer = L.circle(center, options).addTo(this._map); // disable drawing

    this.disable(); // fire the pm:create event and pass shape and layer

    this._map.fire('pm:create', {
      shape: this._shape,
      layer: circleLayer
    });
  },
  _createMarker: function _createMarker(latlng) {
    // create the new marker
    var marker = new L.Marker(latlng, {
      draggable: false,
      icon: L.divIcon({
        className: 'marker-icon'
      })
    });
    marker._pmTempLayer = true; // add it to the map

    this._layerGroup.addLayer(marker);

    return marker;
  }
});

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__turf_intersect__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__turf_intersect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__turf_intersect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__turf_difference__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__L_PM_Draw__ = __webpack_require__(0);



__WEBPACK_IMPORTED_MODULE_2__L_PM_Draw__["a" /* default */].Cut = __WEBPACK_IMPORTED_MODULE_2__L_PM_Draw__["a" /* default */].Poly.extend({
  initialize: function initialize(map) {
    this._map = map;
    this._shape = 'Cut';
    this.toolbarButtonName = 'cutPolygon';
  },
  _cut: function _cut(layer) {
    var _this = this;

    var all = this._map._layers; // find all layers that intersect with `layer`, the just drawn cutting layer

    var layers = Object.keys(all) // convert object to array
    .map(function (l) {
      return all[l];
    }) // only layers handled by leaflet.pm
    .filter(function (l) {
      return l.pm;
    }) // only polygons
    .filter(function (l) {
      return l instanceof L.Polygon;
    }) // exclude the drawn one
    .filter(function (l) {
      return l !== layer;
    }) // only layers with intersections
    .filter(function (l) {
      try {
        return !!__WEBPACK_IMPORTED_MODULE_0__turf_intersect___default()(layer.toGeoJSON(15), l.toGeoJSON(15));
      } catch (e) {
        /* eslint-disable-next-line no-console */
        console.error('You cant cut polygons with self-intersections');
        return false;
      }
    }); // loop through all layers that intersect with the drawn (cutting) layer

    layers.forEach(function (l) {
      // find layer difference
      var diff = Object(__WEBPACK_IMPORTED_MODULE_1__turf_difference__["a" /* default */])(l.toGeoJSON(15), layer.toGeoJSON(15)); // the resulting layer after the cut

      var resultingLayer = L.geoJSON(diff, l.options).addTo(_this._map);
      resultingLayer.addTo(_this._map); // give the new layer the original options

      resultingLayer.pm.enable(_this.options);
      resultingLayer.pm.disable(); // fire pm:cut on the cutted layer

      l.fire('pm:cut', {
        shape: _this._shape,
        layer: resultingLayer,
        originalLayer: l
      }); // fire pm:cut on the map

      _this._map.fire('pm:cut', {
        shape: _this._shape,
        layer: resultingLayer,
        originalLayer: l
      }); // add templayer prop so pm:remove isn't fired


      l._pmTempLayer = true;
      layer._pmTempLayer = true; // remove old layer and cutting layer

      l.remove();
      layer.remove();

      if (resultingLayer.getLayers().length === 0) {
        _this._map.pm.removeLayer({
          target: resultingLayer
        });
      }
    });
  },
  _finishShape: function _finishShape() {
    // if self intersection is not allowed, do not finish the shape!
    if (!this.options.allowSelfIntersection) {
      this._handleSelfIntersection(false);

      if (this._doesSelfIntersect) {
        return;
      }
    }

    var coords = this._layer.getLatLngs();

    var polygonLayer = L.polygon(coords, this.options.pathOptions);

    this._cut(polygonLayer); // disable drawing


    this.disable(); // clean up snapping states

    this._cleanupSnapping(); // remove the first vertex from "other snapping layers"


    this._otherSnapLayers.splice(this._tempSnapLayerIndex, 1);

    delete this._tempSnapLayerIndex;
  }
});

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __webpack_require__(2);
var invariant_1 = __webpack_require__(7);
var martinez = __importStar(__webpack_require__(6));
/**
 * Takes two {@link Polygon|polygon} or {@link MultiPolygon|multi-polygon} geometries and
 * finds their polygonal intersection. If they don't intersect, returns null.
 *
 * @name intersect
 * @param {Feature<Polygon | MultiPolygon>} poly1 the first polygon or multipolygon
 * @param {Feature<Polygon | MultiPolygon>} poly2 the second polygon or multipolygon
 * @param {Object} [options={}] Optional Parameters
 * @param {Object} [options.properties={}] Translate GeoJSON Properties to Feature
 * @returns {Feature|null} returns a feature representing the area they share (either a {@link Polygon} or
 * {@link MultiPolygon}). If they do not share any area, returns `null`.
 * @example
 * var poly1 = turf.polygon([[
 *   [-122.801742, 45.48565],
 *   [-122.801742, 45.60491],
 *   [-122.584762, 45.60491],
 *   [-122.584762, 45.48565],
 *   [-122.801742, 45.48565]
 * ]]);
 *
 * var poly2 = turf.polygon([[
 *   [-122.520217, 45.535693],
 *   [-122.64038, 45.553967],
 *   [-122.720031, 45.526554],
 *   [-122.669906, 45.507309],
 *   [-122.723464, 45.446643],
 *   [-122.532577, 45.408574],
 *   [-122.487258, 45.477466],
 *   [-122.520217, 45.535693]
 * ]]);
 *
 * var intersection = turf.intersect(poly1, poly2);
 *
 * //addToMap
 * var addToMap = [poly1, poly2, intersection];
 */
function intersect(poly1, poly2, options) {
    if (options === void 0) { options = {}; }
    var geom1 = invariant_1.getGeom(poly1);
    var geom2 = invariant_1.getGeom(poly2);
    if (geom1.type === "Polygon" && geom2.type === "Polygon") {
        var intersection = martinez.intersection(geom1.coordinates, geom2.coordinates);
        if (intersection === null || intersection.length === 0) {
            return null;
        }
        if (intersection.length === 1) {
            var start = intersection[0][0][0];
            var end = intersection[0][0][intersection[0][0].length - 1];
            if (start[0] === end[0] && start[1] === end[1]) {
                return helpers_1.polygon(intersection[0], options.properties);
            }
            return null;
        }
        return helpers_1.multiPolygon(intersection, options.properties);
    }
    else if (geom1.type === "MultiPolygon") {
        var resultCoords = [];
        // iterate through the polygon and run intersect with each part, adding to the resultCoords.
        for (var _i = 0, _a = geom1.coordinates; _i < _a.length; _i++) {
            var coords = _a[_i];
            var subGeom = invariant_1.getGeom(helpers_1.polygon(coords));
            var subIntersection = intersect(subGeom, geom2);
            if (subIntersection) {
                var subIntGeom = invariant_1.getGeom(subIntersection);
                if (subIntGeom.type === "Polygon") {
                    resultCoords.push(subIntGeom.coordinates);
                }
                else if (subIntGeom.type === "MultiPolygon") {
                    resultCoords = resultCoords.concat(subIntGeom.coordinates);
                }
                else {
                    throw new Error("intersection is invalid");
                }
            }
        }
        // Make a polygon with the result
        if (resultCoords.length === 0) {
            return null;
        }
        if (resultCoords.length === 1) {
            return helpers_1.polygon(resultCoords[0], options.properties);
        }
        else {
            return helpers_1.multiPolygon(resultCoords, options.properties);
        }
    }
    else if (geom2.type === "MultiPolygon") {
        // geom1 is a polygon and geom2 a multiPolygon,
        // put the multiPolygon first and fallback to the previous case.
        return intersect(geom2, geom1);
    }
    else {
        // handle invalid geometry types
        throw new Error("poly1 and poly2 must be either polygons or multiPolygons");
    }
}
exports.default = intersect;


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_martinez_polygon_clipping__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_martinez_polygon_clipping___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_martinez_polygon_clipping__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__turf_area__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__turf_area___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__turf_area__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__turf_helpers__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__turf_helpers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__turf_helpers__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__turf_invariant__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__turf_invariant___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__turf_invariant__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__turf_meta__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__turf_meta___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__turf_meta__);






/**
 * Finds the difference between two {@link Polygon|polygons} by clipping the second polygon from the first.
 *
 * @name difference
 * @param {Feature<Polygon|MultiPolygon>} polygon1 input Polygon feature
 * @param {Feature<Polygon|MultiPolygon>} polygon2 Polygon feature to difference from polygon1
 * @returns {Feature<Polygon|MultiPolygon>|null} a Polygon or MultiPolygon feature showing the area of `polygon1` excluding the area of `polygon2` (if empty returns `null`)
 * @example
 * var polygon1 = turf.polygon([[
 *   [128, -26],
 *   [141, -26],
 *   [141, -21],
 *   [128, -21],
 *   [128, -26]
 * ]], {
 *   "fill": "#F00",
 *   "fill-opacity": 0.1
 * });
 * var polygon2 = turf.polygon([[
 *   [126, -28],
 *   [140, -28],
 *   [140, -20],
 *   [126, -20],
 *   [126, -28]
 * ]], {
 *   "fill": "#00F",
 *   "fill-opacity": 0.1
 * });
 *
 * var difference = turf.difference(polygon1, polygon2);
 *
 * //addToMap
 * var addToMap = [polygon1, polygon2, difference];
 */
function difference(polygon1, polygon2) {
    var geom1 = Object(__WEBPACK_IMPORTED_MODULE_3__turf_invariant__["getGeom"])(polygon1);
    var geom2 = Object(__WEBPACK_IMPORTED_MODULE_3__turf_invariant__["getGeom"])(polygon2);
    var properties = polygon1.properties || {};

    // Issue #721 - JSTS/Martinez can't handle empty polygons
    geom1 = removeEmptyPolygon(geom1);
    geom2 = removeEmptyPolygon(geom2);
    if (!geom1) return null;
    if (!geom2) return Object(__WEBPACK_IMPORTED_MODULE_2__turf_helpers__["feature"])(geom1, properties);

    var differenced = __WEBPACK_IMPORTED_MODULE_0_martinez_polygon_clipping__["diff"](geom1.coordinates, geom2.coordinates);
    if (differenced.length === 0) return null;
    if (differenced.length === 1) return Object(__WEBPACK_IMPORTED_MODULE_2__turf_helpers__["polygon"])(differenced[0], properties);
    return Object(__WEBPACK_IMPORTED_MODULE_2__turf_helpers__["multiPolygon"])(differenced, properties);
}

/**
 * Detect Empty Polygon
 *
 * @private
 * @param {Geometry<Polygon|MultiPolygon>} geom Geometry Object
 * @returns {Geometry<Polygon|MultiPolygon>|null} removed any polygons with no areas
 */
function removeEmptyPolygon(geom) {
    switch (geom.type) {
    case 'Polygon':
        if (__WEBPACK_IMPORTED_MODULE_1__turf_area___default()(geom) > 1) return geom;
        return null;
    case 'MultiPolygon':
        var coordinates = [];
        Object(__WEBPACK_IMPORTED_MODULE_4__turf_meta__["flattenEach"])(geom, function (feature) {
            if (__WEBPACK_IMPORTED_MODULE_1__turf_area___default()(feature) > 1) coordinates.push(feature.geometry.coordinates);
        });
        if (coordinates.length) return {type: 'MultiPolygon', coordinates: coordinates};
    }
}

/* harmony default export */ __webpack_exports__["a"] = (difference);


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var meta_1 = __webpack_require__(15);
// Note: change RADIUS => earthRadius
var RADIUS = 6378137;
/**
 * Takes one or more features and returns their area in square meters.
 *
 * @name area
 * @param {GeoJSON} geojson input GeoJSON feature(s)
 * @returns {number} area in square meters
 * @example
 * var polygon = turf.polygon([[[125, -15], [113, -22], [154, -27], [144, -15], [125, -15]]]);
 *
 * var area = turf.area(polygon);
 *
 * //addToMap
 * var addToMap = [polygon]
 * polygon.properties.area = area
 */
function area(geojson) {
    return meta_1.geomReduce(geojson, function (value, geom) {
        return value + calculateArea(geom);
    }, 0);
}
exports.default = area;
/**
 * Calculate Area
 *
 * @private
 * @param {Geometry} geom GeoJSON Geometries
 * @returns {number} area
 */
function calculateArea(geom) {
    var total = 0;
    var i;
    switch (geom.type) {
        case "Polygon":
            return polygonArea(geom.coordinates);
        case "MultiPolygon":
            for (i = 0; i < geom.coordinates.length; i++) {
                total += polygonArea(geom.coordinates[i]);
            }
            return total;
        case "Point":
        case "MultiPoint":
        case "LineString":
        case "MultiLineString":
            return 0;
    }
    return 0;
}
function polygonArea(coords) {
    var total = 0;
    if (coords && coords.length > 0) {
        total += Math.abs(ringArea(coords[0]));
        for (var i = 1; i < coords.length; i++) {
            total -= Math.abs(ringArea(coords[i]));
        }
    }
    return total;
}
/**
 * @private
 * Calculate the approximate area of the polygon were it projected onto the earth.
 * Note that this area will be positive if ring is oriented clockwise, otherwise it will be negative.
 *
 * Reference:
 * Robert. G. Chamberlain and William H. Duquette, "Some Algorithms for Polygons on a Sphere",
 * JPL Publication 07-03, Jet Propulsion
 * Laboratory, Pasadena, CA, June 2007 http://trs-new.jpl.nasa.gov/dspace/handle/2014/40409
 *
 * @param {Array<Array<number>>} coords Ring Coordinates
 * @returns {number} The approximate signed geodesic area of the polygon in square meters.
 */
function ringArea(coords) {
    var p1;
    var p2;
    var p3;
    var lowerIndex;
    var middleIndex;
    var upperIndex;
    var i;
    var total = 0;
    var coordsLength = coords.length;
    if (coordsLength > 2) {
        for (i = 0; i < coordsLength; i++) {
            if (i === coordsLength - 2) {
                lowerIndex = coordsLength - 2;
                middleIndex = coordsLength - 1;
                upperIndex = 0;
            }
            else if (i === coordsLength - 1) {
                lowerIndex = coordsLength - 1;
                middleIndex = 0;
                upperIndex = 1;
            }
            else {
                lowerIndex = i;
                middleIndex = i + 1;
                upperIndex = i + 2;
            }
            p1 = coords[lowerIndex];
            p2 = coords[middleIndex];
            p3 = coords[upperIndex];
            total += (rad(p3[0]) - rad(p1[0])) * Math.sin(rad(p2[1]));
        }
        total = total * RADIUS * RADIUS / 2;
    }
    return total;
}
function rad(num) {
    return num * Math.PI / 180;
}


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var DragMixin = {
  enableLayerDrag: function enableLayerDrag() {
    if (this._layer instanceof L.Marker) {
      this._layer.dragging.enable();

      return;
    } // temporary coord variable for delta calculation


    this._tempDragCoord = null; // add CSS class

    var el = this._layer._path ? this._layer._path : this._layer._renderer._container;
    L.DomUtil.addClass(el, 'leaflet-pm-draggable');
    this._originalMapDragState = this._layer._map.dragging._enabled; // can we reliably save the map's draggable state?
    // (if the mouse up event happens outside the container, then the map can become undraggable)

    this._safeToCacheDragState = true; // add mousedown event to trigger drag

    this._layer.on('mousedown', this._dragMixinOnMouseDown, this);
  },
  disableLayerDrag: function disableLayerDrag() {
    if (this._layer instanceof L.Marker) {
      this._layer.dragging.disable();

      return;
    } // remove CSS class


    var el = this._layer._path ? this._layer._path : this._layer._renderer._container;
    L.DomUtil.removeClass(el, 'leaflet-pm-draggable'); // no longer save the drag state

    this._safeToCacheDragState = false; // disable mousedown event

    this._layer.off('mousedown', this._dragMixinOnMouseDown, this);
  },
  _dragMixinOnMouseUp: function _dragMixinOnMouseUp() {
    var _this = this;

    var el = this._layer._path ? this._layer._path : this._layer._renderer._container; // re-enable map drag

    if (this._originalMapDragState) {
      this._layer._map.dragging.enable();
    } // if mouseup event fired, it's safe to cache the map draggable state on the next mouse down


    this._safeToCacheDragState = true; // clear up mousemove event

    this._layer._map.off('mousemove', this._dragMixinOnMouseMove, this); // clear up mouseup event


    this._layer.off('mouseup', this._dragMixinOnMouseUp, this); // if no drag happened, don't do anything


    if (!this._dragging) {
      return false;
    } // timeout to prevent click event after drag :-/
    // TODO: do it better as soon as leaflet has a way to do it better :-)


    window.setTimeout(function () {
      // set state
      _this._dragging = false;
      L.DomUtil.removeClass(el, 'leaflet-pm-dragging'); // fire pm:dragend event

      _this._layer.fire('pm:dragend'); // fire edit


      _this._fireEdit();
    }, 10);
    return true;
  },
  _dragMixinOnMouseMove: function _dragMixinOnMouseMove(e) {
    var el = this._layer._path ? this._layer._path : this._layer._renderer._container;

    if (!this._dragging) {
      // set state
      this._dragging = true;
      L.DomUtil.addClass(el, 'leaflet-pm-dragging'); // bring it to front to prevent drag interception

      this._layer.bringToFront(); // disbale map drag


      if (this._originalMapDragState) {
        this._layer._map.dragging.disable();
      } // fire pm:dragstart event


      this._layer.fire('pm:dragstart');
    }

    this._onLayerDrag(e);
  },
  _dragMixinOnMouseDown: function _dragMixinOnMouseDown(e) {
    // cancel if mouse button is NOT the left button
    if (e.originalEvent.button > 0) {
      return;
    } // save current map dragging state


    if (this._safeToCacheDragState) {
      this._originalMapDragState = this._layer._map.dragging._enabled; // don't cache the state again until another mouse up is registered

      this._safeToCacheDragState = false;
    } // save for delta calculation


    this._tempDragCoord = e.latlng;

    this._layer.on('mouseup', this._dragMixinOnMouseUp, this); // listen to mousemove on map (instead of polygon),
    // otherwise fast mouse movements stop the drag


    this._layer._map.on('mousemove', this._dragMixinOnMouseMove, this);
  },
  dragging: function dragging() {
    return this._dragging;
  },
  _onLayerDrag: function _onLayerDrag(e) {
    // latLng of mouse event
    var latlng = e.latlng; // delta coords (how far was dragged)

    var deltaLatLng = {
      lat: latlng.lat - this._tempDragCoord.lat,
      lng: latlng.lng - this._tempDragCoord.lng
    }; // move the coordinates by the delta

    var moveCoords = function moveCoords(coords) {
      return (// alter the coordinates
        coords.map(function (currentLatLng) {
          if (Array.isArray(currentLatLng)) {
            // do this recursively as coords might be nested
            return moveCoords(currentLatLng);
          } // move the coord and return it


          return {
            lat: currentLatLng.lat + deltaLatLng.lat,
            lng: currentLatLng.lng + deltaLatLng.lng
          };
        })
      );
    };

    var moveCoord = function moveCoord(coord) {
      return {
        lat: coord.lat + deltaLatLng.lat,
        lng: coord.lng + deltaLatLng.lng
      };
    };

    if (this._layer instanceof L.CircleMarker) {
      // create the new coordinates array
      var newCoords = moveCoord(this._layer.getLatLng()); // set new coordinates and redraw

      this._layer.setLatLng(newCoords).redraw();
    } else {
      // create the new coordinates array
      var _newCoords = moveCoords(this._layer.getLatLngs()); // set new coordinates and redraw


      this._layer.setLatLngs(_newCoords).redraw();
    } // save current latlng for next delta calculation


    this._tempDragCoord = latlng; // fire pm:dragstart event

    this._layer.fire('pm:drag');
  }
};
/* harmony default export */ __webpack_exports__["a"] = (DragMixin);

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__L_PM_Edit__ = __webpack_require__(1);
 // LayerGroup doesn't inherit from L.PM.Edit because it's just calling L.PM.Edit.Poly
// (which inherits from L.PM.Edit) for each layer,
// so it's not really a parent class

__WEBPACK_IMPORTED_MODULE_0__L_PM_Edit__["a" /* default */].LayerGroup = L.Class.extend({
  initialize: function initialize(layerGroup) {
    var _this = this;

    this._layerGroup = layerGroup;
    this._layers = this.findLayers(); // init all layers of the group

    this._layers.forEach(function (layer) {
      return _this._initLayer(layer);
    }); // if a new layer is added to the group, reinitialize
    // This only works for FeatureGroups, not LayerGroups
    // https://github.com/Leaflet/Leaflet/issues/4861


    this._layerGroup.on('layeradd', function (e) {
      if (e.target._pmTempLayer) {
        return;
      }

      _this._layers = _this.findLayers(); // init the newly added layer

      if (e.layer.pm) {
        _this._initLayer(e.layer);
      } // if editing was already enabled for this group, enable it again
      // so the new layers are enabled


      if (e.target.pm.enabled()) {
        _this.enable(_this.getOptions());
      }
    });
  },
  findLayers: function findLayers() {
    // get all layers of the layer group
    var layers = this._layerGroup.getLayers(); // filter out layers that are no layerGroup


    layers = layers.filter(function (layer) {
      return !(layer instanceof L.LayerGroup);
    }); // filter out layers that don't have leaflet.pm

    layers = layers.filter(function (layer) {
      return !!layer.pm;
    }); // filter out everything that's leaflet.pm specific temporary stuff

    layers = layers.filter(function (layer) {
      return !layer._pmTempLayer;
    }); // return them

    return layers;
  },
  _initLayer: function _initLayer(layer) {
    var _this2 = this;

    // available events
    var availableEvents = ['pm:edit', 'pm:update', 'pm:remove', 'pm:dragstart', 'pm:drag', 'pm:dragend', 'pm:snap', 'pm:unsnap', 'pm:cut', 'pm:intersect', 'pm:raiseMarkers', 'pm:markerdragend', 'pm:markerdragstart', 'pm:vertexadded', 'pm:vertexremoved', 'pm:centerplaced']; // listen to the events of the layers in this group

    availableEvents.forEach(function (event) {
      layer.on(event, _this2._fireEvent, _this2);
    }); // add reference for the group to each layer inside said group

    layer.pm._layerGroup = this._layerGroup;
  },
  _fireEvent: function _fireEvent(e) {
    this._layerGroup.fireEvent(e.type, e);
  },
  toggleEdit: function toggleEdit(options) {
    this._options = options;

    this._layers.forEach(function (layer) {
      layer.pm.toggleEdit(options);
    });
  },
  enable: function enable(options) {
    this._options = options;

    this._layers.forEach(function (layer) {
      layer.pm.enable(options);
    });
  },
  disable: function disable() {
    this._layers.forEach(function (layer) {
      layer.pm.disable();
    });
  },
  enabled: function enabled() {
    var enabled = this._layers.find(function (layer) {
      return layer.pm.enabled();
    });

    return !!enabled;
  },
  dragging: function dragging() {
    var dragging = this._layers.find(function (layer) {
      return layer.pm.dragging();
    });

    return !!dragging;
  },
  getOptions: function getOptions() {
    return this._options;
  }
});

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__L_PM_Edit__ = __webpack_require__(1);

__WEBPACK_IMPORTED_MODULE_0__L_PM_Edit__["a" /* default */].Marker = __WEBPACK_IMPORTED_MODULE_0__L_PM_Edit__["a" /* default */].extend({
  initialize: function initialize(layer) {
    // layer is a marker in this case :-)
    this._layer = layer;
    this._enabled = false; // register dragend event e.g. to fire pm:edit

    this._layer.on('dragend', this._onDragEnd, this);
  },
  toggleEdit: function toggleEdit(options) {
    if (!this.enabled()) {
      this.enable(options);
    } else {
      this.disable();
    }
  },
  enable: function enable() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      draggable: true,
      snappable: true
    };
    L.Util.setOptions(this, options);
    this._map = this._layer._map;

    if (this.enabled()) {
      return;
    }

    this._enabled = true; // enable removal for the marker

    if (!this.options.preventMarkerRemoval) {
      this._layer.on('contextmenu', this._removeMarker, this);
    } // enable dragging and removal for the marker


    if (this.options.draggable) {
      this._layer.dragging.enable();
    } // enable snapping


    if (this.options.snappable) {
      this._initSnappableMarkers();
    }
  },
  enabled: function enabled() {
    return this._enabled;
  },
  disable: function disable() {
    this._enabled = false; // disable dragging and removal for the marker

    if (this._layer.dragging) {
      this._layer.dragging.disable();
    }

    this._layer.off('contextmenu', this._removeMarker, this);

    if (this._layerEdited) {
      this._layer.fire('pm:update', {});
    }

    this._layerEdited = false;
  },
  _removeMarker: function _removeMarker(e) {
    var marker = e.target;
    marker.remove(); // TODO: find out why this is fired manually, shouldn't it be catched by L.PM.Map 'layerremove'?

    marker.fire('pm:remove');
  },
  _onDragEnd: function _onDragEnd(e) {
    var marker = e.target; // fire the pm:edit event and pass shape and marker

    marker.fire('pm:edit');
    this._layerEdited = true;
  },
  // overwrite initSnappableMarkers from Snapping.js Mixin
  _initSnappableMarkers: function _initSnappableMarkers() {
    var marker = this._layer;
    this.options.snapDistance = this.options.snapDistance || 30;
    marker.off('drag', this._handleSnapping, this);
    marker.on('drag', this._handleSnapping, this);
    marker.off('dragend', this._cleanupSnapping, this);
    marker.on('dragend', this._cleanupSnapping, this);
    marker.off('pm:dragstart', this._unsnap, this);
    marker.on('pm:dragstart', this._unsnap, this);
  }
});

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__turf_kinks__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__turf_kinks___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__turf_kinks__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_get__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash_get__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__L_PM_Edit__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__L_PM_Utils__ = __webpack_require__(13);



 // Shit's getting complicated in here with Multipolygon Support. So here's a quick note about it:
// Multipolygons with holes means lots of nested, multidimensional arrays.
// In order to find a value inside such an array you need a path to adress it directly.
// Example: var arr = [[['a', 'b'], ['c']]];
// The indexPath to 'b' is [0, 0, 1]. The indexPath to 'c' is [0, 1, 0].
// So I can get 'b' with: arr[0][0][1].
// Got it? Now you know what is meant when you read "indexPath" around here. Have fun 👍

__WEBPACK_IMPORTED_MODULE_2__L_PM_Edit__["a" /* default */].Line = __WEBPACK_IMPORTED_MODULE_2__L_PM_Edit__["a" /* default */].extend({
  initialize: function initialize(layer) {
    this._layer = layer;
    this._enabled = false;
  },
  toggleEdit: function toggleEdit(options) {
    if (!this.enabled()) {
      this.enable(options);
    } else {
      this.disable();
    }
  },
  enable: function enable(options) {
    L.Util.setOptions(this, options);
    this._map = this._layer._map; // cancel when map isn't available, this happens when the polygon is removed before this fires

    if (!this._map) {
      return;
    }

    if (!this.enabled()) {
      // if it was already enabled, disable first
      // we don't block enabling again because new options might be passed
      this.disable();
    } // change state


    this._enabled = true; // init markers

    this._initMarkers(); // if polygon gets removed from map, disable edit mode


    this._layer.on('remove', this._onLayerRemove, this);

    if (!this.options.allowSelfIntersection) {
      this._layer.on('pm:vertexremoved', this._handleSelfIntersectionOnVertexRemoval, this);
    }

    if (!this.options.allowSelfIntersection) {
      if (!this.cachedColor) {
        this.cachedColor = this._layer.options.color;
      }

      this.isRed = false;

      this._handleLayerStyle();
    }
  },
  _onLayerRemove: function _onLayerRemove(e) {
    this.disable(e.target);
  },
  enabled: function enabled() {
    return this._enabled;
  },
  disable: function disable() {
    var poly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._layer;

    // if it's not enabled, it doesn't need to be disabled
    if (!this.enabled()) {
      return false;
    } // prevent disabling if polygon is being dragged


    if (poly.pm._dragging) {
      return false;
    }

    poly.pm._enabled = false;

    poly.pm._markerGroup.clearLayers(); // clean up draggable


    poly.off('mousedown');
    poly.off('mouseup'); // remove onRemove listener

    this._layer.off('remove', this._onLayerRemove, this);

    if (!this.options.allowSelfIntersection) {
      this._layer.off('pm:vertexremoved', this._handleSelfIntersectionOnVertexRemoval);
    } // remove draggable class


    var el = poly._path ? poly._path : this._layer._renderer._container;
    L.DomUtil.removeClass(el, 'leaflet-pm-draggable'); // remove invalid class if layer has self intersection

    if (this.hasSelfIntersection()) {
      L.DomUtil.removeClass(el, 'leaflet-pm-invalid');
    }

    if (this._layerEdited) {
      this._layer.fire('pm:update', {});
    }

    this._layerEdited = false;
    return true;
  },
  hasSelfIntersection: function hasSelfIntersection() {
    // check for self intersection of the layer and return true/false
    var selfIntersection = __WEBPACK_IMPORTED_MODULE_0__turf_kinks___default()(this._layer.toGeoJSON(15));
    return selfIntersection.features.length > 0;
  },
  _handleSelfIntersectionOnVertexRemoval: function _handleSelfIntersectionOnVertexRemoval() {
    // check for selfintersection again (mainly to reset the style)
    this._handleLayerStyle(true);

    if (this.hasSelfIntersection()) {
      // reset coordinates
      this._layer.setLatLngs(this._coordsBeforeEdit);

      this._coordsBeforeEdit = null; // re-enable markers for the new coords

      this._initMarkers();
    }
  },
  _handleLayerStyle: function _handleLayerStyle(flash) {
    var _this = this;

    var layer = this._layer;

    if (this.hasSelfIntersection()) {
      if (this.isRed) {
        return;
      } // if it does self-intersect, mark or flash it red


      if (flash) {
        layer.setStyle({
          color: 'red'
        });
        this.isRed = true;
        window.setTimeout(function () {
          layer.setStyle({
            color: _this.cachedColor
          });
          _this.isRed = false;
        }, 200);
      } else {
        layer.setStyle({
          color: 'red'
        });
        this.isRed = true;
      } // fire intersect event


      this._layer.fire('pm:intersect', {
        intersection: __WEBPACK_IMPORTED_MODULE_0__turf_kinks___default()(this._layer.toGeoJSON(15))
      });
    } else {
      // if not, reset the style to the default color
      layer.setStyle({
        color: this.cachedColor
      });
      this.isRed = false;
    }
  },
  _initMarkers: function _initMarkers() {
    var _this2 = this;

    var map = this._map;

    var coords = this._layer.getLatLngs(); // cleanup old ones first


    if (this._markerGroup) {
      this._markerGroup.clearLayers();
    } // add markerGroup to map, markerGroup includes regular and middle markers


    this._markerGroup = new L.LayerGroup();
    this._markerGroup._pmTempLayer = true;
    map.addLayer(this._markerGroup); // handle coord-rings (outer, inner, etc)

    var handleRing = function handleRing(coordsArr) {
      // if there is another coords ring, go a level deep and do this again
      if (Array.isArray(coordsArr[0])) {
        return coordsArr.map(handleRing, _this2);
      } // the marker array, it includes only the markers of vertexes (no middle markers)


      var ringArr = coordsArr.map(_this2._createMarker, _this2); // create small markers in the middle of the regular markers

      coordsArr.map(function (v, k) {
        // find the next index fist
        var nextIndex = _this2.isPolygon() ? (k + 1) % coordsArr.length : k + 1; // create the marker

        return _this2._createMiddleMarker(ringArr[k], ringArr[nextIndex]);
      });
      return ringArr;
    }; // create markers


    this._markers = handleRing(coords);

    if (this.options.snappable) {
      this._initSnappableMarkers();
    }
  },
  // creates initial markers for coordinates
  _createMarker: function _createMarker(latlng) {
    var marker = new L.Marker(latlng, {
      draggable: true,
      icon: L.divIcon({
        className: 'marker-icon'
      })
    });
    marker._pmTempLayer = true;
    marker.on('dragstart', this._onMarkerDragStart, this);
    marker.on('move', this._onMarkerDrag, this);
    marker.on('dragend', this._onMarkerDragEnd, this);

    if (!this.options.preventMarkerRemoval) {
      marker.on('contextmenu', this._removeMarker, this);
    }

    this._markerGroup.addLayer(marker);

    return marker;
  },
  // creates the middle markes between coordinates
  _createMiddleMarker: function _createMiddleMarker(leftM, rightM) {
    var _this3 = this;

    // cancel if there are no two markers
    if (!leftM || !rightM) {
      return false;
    }

    var latlng = __WEBPACK_IMPORTED_MODULE_3__L_PM_Utils__["a" /* default */].calcMiddleLatLng(this._map, leftM.getLatLng(), rightM.getLatLng());

    var middleMarker = this._createMarker(latlng);

    var middleIcon = L.divIcon({
      className: 'marker-icon marker-icon-middle'
    });
    middleMarker.setIcon(middleIcon); // save reference to this middle markers on the neighboor regular markers

    leftM._middleMarkerNext = middleMarker;
    rightM._middleMarkerPrev = middleMarker;
    middleMarker.on('click', function () {
      // TODO: move the next two lines inside _addMarker() as soon as
      // https://github.com/Leaflet/Leaflet/issues/4484
      // is fixed
      var icon = L.divIcon({
        className: 'marker-icon'
      });
      middleMarker.setIcon(icon);

      _this3._addMarker(middleMarker, leftM, rightM);
    });
    middleMarker.on('movestart', function () {
      // TODO: This is a workaround. Remove the moveend listener and
      // callback as soon as this is fixed:
      // https://github.com/Leaflet/Leaflet/issues/4484
      middleMarker.on('moveend', function () {
        var icon = L.divIcon({
          className: 'marker-icon'
        });
        middleMarker.setIcon(icon);
        middleMarker.off('moveend');
      });

      _this3._addMarker(middleMarker, leftM, rightM);
    });
    return middleMarker;
  },
  // adds a new marker from a middlemarker
  _addMarker: function _addMarker(newM, leftM, rightM) {
    // first, make this middlemarker a regular marker
    newM.off('movestart');
    newM.off('click'); // now, create the polygon coordinate point for that marker
    // and push into marker array
    // and associate polygon coordinate with marker coordinate

    var latlng = newM.getLatLng();
    var coords = this._layer._latlngs; // the index path to the marker inside the multidimensional marker array

    var _this$findDeepMarkerI = this.findDeepMarkerIndex(this._markers, leftM),
        indexPath = _this$findDeepMarkerI.indexPath,
        index = _this$findDeepMarkerI.index,
        parentPath = _this$findDeepMarkerI.parentPath; // define the coordsRing that is edited


    var coordsRing = indexPath.length > 1 ? __WEBPACK_IMPORTED_MODULE_1_lodash_get___default()(coords, parentPath) : coords; // define the markers array that is edited

    var markerArr = indexPath.length > 1 ? __WEBPACK_IMPORTED_MODULE_1_lodash_get___default()(this._markers, parentPath) : this._markers; // add coordinate to coordinate array

    coordsRing.splice(index + 1, 0, latlng); // add marker to marker array

    markerArr.splice(index + 1, 0, newM); // set new latlngs to update polygon

    this._layer.setLatLngs(coords); // create the new middlemarkers


    this._createMiddleMarker(leftM, newM);

    this._createMiddleMarker(newM, rightM); // fire edit event


    this._fireEdit();

    this._layer.fire('pm:vertexadded', {
      layer: this._layer,
      marker: newM,
      indexPath: this.findDeepMarkerIndex(this._markers, newM).indexPath,
      latlng: latlng // TODO: maybe add latlng as well?

    });

    if (this.options.snappable) {
      this._initSnappableMarkers();
    }
  },
  _removeMarker: function _removeMarker(e) {
    // if self intersection isn't allowed, save the coords upon dragstart
    // in case we need to reset the layer
    if (!this.options.allowSelfIntersection) {
      var c = this._layer.getLatLngs();

      this._coordsBeforeEdit = JSON.parse(JSON.stringify(c));
    } // the marker that should be removed


    var marker = e.target; // coords of the layer

    var coords = this._layer.getLatLngs(); // the index path to the marker inside the multidimensional marker array


    var _this$findDeepMarkerI2 = this.findDeepMarkerIndex(this._markers, marker),
        indexPath = _this$findDeepMarkerI2.indexPath,
        index = _this$findDeepMarkerI2.index,
        parentPath = _this$findDeepMarkerI2.parentPath; // only continue if this is NOT a middle marker (those can't be deleted)


    if (!indexPath) {
      return;
    } // define the coordsRing that is edited


    var coordsRing = indexPath.length > 1 ? __WEBPACK_IMPORTED_MODULE_1_lodash_get___default()(coords, parentPath) : coords; // define the markers array that is edited

    var markerArr = indexPath.length > 1 ? __WEBPACK_IMPORTED_MODULE_1_lodash_get___default()(this._markers, parentPath) : this._markers; // remove coordinate

    coordsRing.splice(index, 1); // set new latlngs to the polygon

    this._layer.setLatLngs(coords); // if the ring of the poly has no coordinates left, remove the last coord too


    if (coordsRing.length <= 1) {
      coordsRing.splice(0, coordsRing.length); // set new coords

      this._layer.setLatLngs(coords); // re-enable editing so unnecessary markers are removed
      // TODO: kind of an ugly workaround maybe do it better?


      this.disable();
      this.enable(this.options);
    } // TODO: we may should remove all empty coord-rings here as well.
    // if no coords are left, remove the layer


    if (this.isEmptyDeep(coords)) {
      this._layer.remove();
    } // now handle the middle markers
    // remove the marker and the middlemarkers next to it from the map


    if (marker._middleMarkerPrev) {
      this._markerGroup.removeLayer(marker._middleMarkerPrev);
    }

    if (marker._middleMarkerNext) {
      this._markerGroup.removeLayer(marker._middleMarkerNext);
    } // remove the marker from the map


    this._markerGroup.removeLayer(marker);

    var rightMarkerIndex;
    var leftMarkerIndex;

    if (this.isPolygon()) {
      // find neighbor marker-indexes
      rightMarkerIndex = (index + 1) % markerArr.length;
      leftMarkerIndex = (index + (markerArr.length - 1)) % markerArr.length;
    } else {
      // find neighbor marker-indexes
      leftMarkerIndex = index - 1 < 0 ? undefined : index - 1;
      rightMarkerIndex = index + 1 >= markerArr.length ? undefined : index + 1;
    } // don't create middlemarkers if there is only one marker left


    if (rightMarkerIndex !== leftMarkerIndex) {
      var leftM = markerArr[leftMarkerIndex];
      var rightM = markerArr[rightMarkerIndex];

      this._createMiddleMarker(leftM, rightM);
    } // remove the marker from the markers array


    markerArr.splice(index, 1); // fire edit event

    this._fireEdit(); // fire vertex removal event


    this._layer.fire('pm:vertexremoved', {
      layer: this._layer,
      marker: marker,
      indexPath: indexPath // TODO: maybe add latlng as well?

    });
  },
  isEmptyDeep: function isEmptyDeep(l) {
    // thanks for the function, Felix Heck
    var flatten = function flatten(list) {
      return list.filter(function (x) {
        return ![null, '', undefined].includes(x);
      }).reduce(function (a, b) {
        return a.concat(Array.isArray(b) ? flatten(b) : b);
      }, []);
    };

    return !flatten(l).length;
  },
  findDeepMarkerIndex: function findDeepMarkerIndex(arr, marker) {
    // thanks for the function, Felix Heck
    var result;

    var run = function run(path) {
      return function (v, i) {
        var iRes = path.concat(i);

        if (v._leaflet_id === marker._leaflet_id) {
          result = iRes;
          return true;
        }

        return Array.isArray(v) && v.some(run(iRes));
      };
    };

    arr.some(run([]));
    var returnVal = {};

    if (result) {
      returnVal = {
        indexPath: result,
        index: result[result.length - 1],
        parentPath: result.slice(0, result.length - 1)
      };
    }

    return returnVal;
  },
  updatePolygonCoordsFromMarkerDrag: function updatePolygonCoordsFromMarkerDrag(marker) {
    // update polygon coords
    var coords = this._layer.getLatLngs(); // get marker latlng


    var latlng = marker.getLatLng(); // get indexPath of Marker

    var _this$findDeepMarkerI3 = this.findDeepMarkerIndex(this._markers, marker),
        indexPath = _this$findDeepMarkerI3.indexPath,
        index = _this$findDeepMarkerI3.index,
        parentPath = _this$findDeepMarkerI3.parentPath; // update coord


    var parent = indexPath.length > 1 ? __WEBPACK_IMPORTED_MODULE_1_lodash_get___default()(coords, parentPath) : coords;
    parent.splice(index, 1, latlng); // set new coords on layer

    this._layer.setLatLngs(coords).redraw();
  },
  _onMarkerDrag: function _onMarkerDrag(e) {
    // dragged marker
    var marker = e.target;

    var _this$findDeepMarkerI4 = this.findDeepMarkerIndex(this._markers, marker),
        indexPath = _this$findDeepMarkerI4.indexPath,
        index = _this$findDeepMarkerI4.index,
        parentPath = _this$findDeepMarkerI4.parentPath; // only continue if this is NOT a middle marker


    if (!indexPath) {
      return;
    }

    this.updatePolygonCoordsFromMarkerDrag(marker); // the dragged markers neighbors

    var markerArr = indexPath.length > 1 ? __WEBPACK_IMPORTED_MODULE_1_lodash_get___default()(this._markers, parentPath) : this._markers; // find the indizes of next and previous markers

    var nextMarkerIndex = (index + 1) % markerArr.length;
    var prevMarkerIndex = (index + (markerArr.length - 1)) % markerArr.length; // update middle markers on the left and right
    // be aware that "next" and "prev" might be interchanged, depending on the geojson array

    var markerLatLng = marker.getLatLng(); // get latlng of prev and next marker

    var prevMarkerLatLng = markerArr[prevMarkerIndex].getLatLng();
    var nextMarkerLatLng = markerArr[nextMarkerIndex].getLatLng();

    if (marker._middleMarkerNext) {
      var middleMarkerNextLatLng = __WEBPACK_IMPORTED_MODULE_3__L_PM_Utils__["a" /* default */].calcMiddleLatLng(this._map, markerLatLng, nextMarkerLatLng);

      marker._middleMarkerNext.setLatLng(middleMarkerNextLatLng);
    }

    if (marker._middleMarkerPrev) {
      var middleMarkerPrevLatLng = __WEBPACK_IMPORTED_MODULE_3__L_PM_Utils__["a" /* default */].calcMiddleLatLng(this._map, markerLatLng, prevMarkerLatLng);

      marker._middleMarkerPrev.setLatLng(middleMarkerPrevLatLng);
    } // if self intersection is not allowed, handle it


    if (!this.options.allowSelfIntersection) {
      this._handleLayerStyle();
    }
  },
  _onMarkerDragEnd: function _onMarkerDragEnd(e) {
    var marker = e.target;

    var _this$findDeepMarkerI5 = this.findDeepMarkerIndex(this._markers, marker),
        indexPath = _this$findDeepMarkerI5.indexPath; // if self intersection is not allowed but this edit caused a self intersection,
    // reset and cancel; do not fire events


    if (!this.options.allowSelfIntersection && this.hasSelfIntersection()) {
      // reset coordinates
      this._layer.setLatLngs(this._coordsBeforeEdit);

      this._coordsBeforeEdit = null; // re-enable markers for the new coords

      this._initMarkers(); // check for selfintersection again (mainly to reset the style)


      this._handleLayerStyle();

      return;
    }

    this._layer.fire('pm:markerdragend', {
      markerEvent: e,
      indexPath: indexPath
    }); // fire edit event


    this._fireEdit();
  },
  _onMarkerDragStart: function _onMarkerDragStart(e) {
    var marker = e.target;

    var _this$findDeepMarkerI6 = this.findDeepMarkerIndex(this._markers, marker),
        indexPath = _this$findDeepMarkerI6.indexPath;

    this._layer.fire('pm:markerdragstart', {
      markerEvent: e,
      indexPath: indexPath
    }); // if self intersection isn't allowed, save the coords upon dragstart
    // in case we need to reset the layer


    if (!this.options.allowSelfIntersection) {
      this._coordsBeforeEdit = this._layer.getLatLngs();
    }
  },
  _fireEdit: function _fireEdit() {
    // fire edit event
    this._layerEdited = true;

    this._layer.fire('pm:edit');
  }
});

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var baseGet = __webpack_require__(41);

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var castPath = __webpack_require__(42),
    toKey = __webpack_require__(82);

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

module.exports = baseGet;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(8),
    isKey = __webpack_require__(43),
    stringToPath = __webpack_require__(49),
    toString = __webpack_require__(79);

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

module.exports = castPath;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(8),
    isSymbol = __webpack_require__(9);

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

module.exports = isKey;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(45)))

/***/ }),
/* 45 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(10);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),
/* 47 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),
/* 48 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var memoizeCapped = __webpack_require__(50);

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

module.exports = stringToPath;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var memoize = __webpack_require__(51);

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

module.exports = memoizeCapped;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var MapCache = __webpack_require__(52);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;

module.exports = memoize;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var mapCacheClear = __webpack_require__(53),
    mapCacheDelete = __webpack_require__(74),
    mapCacheGet = __webpack_require__(76),
    mapCacheHas = __webpack_require__(77),
    mapCacheSet = __webpack_require__(78);

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var Hash = __webpack_require__(54),
    ListCache = __webpack_require__(66),
    Map = __webpack_require__(73);

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var hashClear = __webpack_require__(55),
    hashDelete = __webpack_require__(62),
    hashGet = __webpack_require__(63),
    hashHas = __webpack_require__(64),
    hashSet = __webpack_require__(65);

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(3);

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(57),
    isMasked = __webpack_require__(58),
    isObject = __webpack_require__(18),
    toSource = __webpack_require__(60);

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(16),
    isObject = __webpack_require__(18);

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var coreJsData = __webpack_require__(59);

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(11);

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),
/* 60 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ }),
/* 61 */
/***/ (function(module, exports) {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ }),
/* 62 */
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(3);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(3);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(3);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var listCacheClear = __webpack_require__(67),
    listCacheDelete = __webpack_require__(68),
    listCacheGet = __webpack_require__(70),
    listCacheHas = __webpack_require__(71),
    listCacheSet = __webpack_require__(72);

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;


/***/ }),
/* 67 */
/***/ (function(module, exports) {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(4);

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;


/***/ }),
/* 69 */
/***/ (function(module, exports) {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(4);

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(4);

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(4);

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(17),
    root = __webpack_require__(11);

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(5);

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;


/***/ }),
/* 75 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(5);

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(5);

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(5);

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var baseToString = __webpack_require__(80);

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(10),
    arrayMap = __webpack_require__(81),
    isArray = __webpack_require__(8),
    isSymbol = __webpack_require__(9);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = baseToString;


/***/ }),
/* 81 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var isSymbol = __webpack_require__(9);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = toKey;


/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__L_PM_Edit__ = __webpack_require__(1);

__WEBPACK_IMPORTED_MODULE_0__L_PM_Edit__["a" /* default */].Poly = __WEBPACK_IMPORTED_MODULE_0__L_PM_Edit__["a" /* default */].Line.extend({// this is a bit weird but... Polygons are completely supported by L.PM.Edit.Line now 😲.
  // I'll keep this class in case there is something Polygon-specific that we'd need in the future.
});

/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__L_PM_Edit__ = __webpack_require__(1);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// Corner detection based on Leaflet Draw's Edit.Rectangle.js Class:
// https://github.com/Leaflet/Leaflet.draw/blob/master/src/edit/handler/Edit.Rectangle.js

__WEBPACK_IMPORTED_MODULE_0__L_PM_Edit__["a" /* default */].Rectangle = __WEBPACK_IMPORTED_MODULE_0__L_PM_Edit__["a" /* default */].Poly.extend({
  // initializes Rectangle Markers
  _initMarkers: function _initMarkers() {
    var map = this._map;

    var corners = this._findCorners(); // cleanup old ones first


    if (this._markerGroup) {
      this._markerGroup.clearLayers();
    } // add markerGroup to map, markerGroup includes regular and middle markers


    this._markerGroup = new L.LayerGroup();
    this._markerGroup._pmTempLayer = true;
    map.addLayer(this._markerGroup); // create markers for four corners of rectangle

    this._markers = []; // nest set of corner markers in a 2D array so that we can Cut this Rectangle, if needed

    this._markers[0] = corners.map(this._createMarker, this); // convenience alias, for better readability

    var _this$_markers = _slicedToArray(this._markers, 1);

    this._cornerMarkers = _this$_markers[0];

    if (this.options.snappable) {
      this._initSnappableMarkers();
    }
  },
  // creates initial markers for coordinates
  _createMarker: function _createMarker(latlng, index) {
    var marker = new L.Marker(latlng, {
      draggable: true,
      icon: L.divIcon({
        className: 'marker-icon'
      })
    });
    marker._origLatLng = latlng;
    marker._index = index;
    marker._pmTempLayer = true;
    marker.on('dragstart', this._onMarkerDragStart, this);
    marker.on('drag', this._onMarkerDrag, this);
    marker.on('dragend', this._onMarkerDragEnd, this);
    marker.on('pm:snap', this._adjustRectangleForMarkerSnap, this);

    if (!this.options.preventMarkerRemoval) {
      marker.on('contextmenu', this._removeMarker, this);
    }

    this._markerGroup.addLayer(marker);

    return marker;
  },
  // Empty callback for 'contextmenu' binding set in L.PM.Edit.Line.js's _createMarker method (AKA, right-click on marker event)
  // (A Rectangle is designed to always remain a "true" rectangle -- if you want it editable, use Polygon Tool instead!!!)
  _removeMarker: function _removeMarker() {
    // The method, it does nothing!!!
    return null;
  },
  _onMarkerDragStart: function _onMarkerDragStart(e) {
    // dragged marker
    var draggedMarker = e.target; // Store/update a reference to marker in opposite corner

    var corners = this._findCorners();

    draggedMarker._oppositeCornerLatLng = corners[(draggedMarker._index + 2) % 4]; // Automatically unsnap all markers on drag start (they'll snap back if close enough to another snappable object)
    // (Without this, it's occasionally possible for a marker to get stuck as 'snapped,' which prevents Rectangle resizing)

    draggedMarker._snapped = false;

    this._layer.fire('pm:markerdragstart', {
      markerEvent: e
    });
  },
  _onMarkerDrag: function _onMarkerDrag(e) {
    // dragged marker
    var draggedMarker = e.target; // only continue if this is NOT a middle marker (should NEVER be one, but this is just a safety check)

    if (draggedMarker._index === undefined) {
      return;
    } // If marker is currently snapped to an object, then ignore all drag events (as this resets rectangle shape)


    if (!draggedMarker._snapped) {
      this._adjustRectangleForMarkerMove(draggedMarker);
    }
  },
  _onMarkerDragEnd: function _onMarkerDragEnd(e) {
    var corners = this._findCorners(); // Reposition ALL markers (so that indices are correctly correlated with corner order (NW, NE, SE, SW))


    this._adjustAllMarkers(corners); // Clean-up data attributes


    this._cornerMarkers.forEach(function (m) {
      delete m._oppositeCornerLatLng;
    }); // Update bounding box


    this._layer.setLatLngs(corners); // Redraw the shape a final time


    this._layer.redraw();

    this._layer.fire('pm:markerdragend', {
      markerEvent: e
    }); // fire edit event


    this._fireEdit();
  },
  // adjusts the rectangle's size and bounds whenever a marker is moved
  // params: movedMarker -- the Marker object
  _adjustRectangleForMarkerMove: function _adjustRectangleForMarkerMove(movedMarker) {
    // update moved marker coordinates
    L.extend(movedMarker._origLatLng, movedMarker._latlng); // update rectangle boundaries, based on moved marker's new LatLng and cached opposite corner's LatLng

    var movedLatLng = movedMarker.getLatLng();

    this._layer.setBounds(L.latLngBounds(movedLatLng, movedMarker._oppositeCornerLatLng)); // Reposition the markers at each corner


    this._adjustAdjacentMarkers(movedMarker); // Redraw the shape (to update altered rectangle)


    this._layer.redraw();
  },
  // adjusts the rectangle's size and bounds whenever a marker snaps to another polygon
  // params: e -- the snap event
  _adjustRectangleForMarkerSnap: function _adjustRectangleForMarkerSnap(e) {
    if (!this.options.snappable) {
      return;
    }

    var snappedMarker = e.target;

    this._adjustRectangleForMarkerMove(snappedMarker);
  },
  // adjusts the position of all Markers
  // params: markerLatLngs -- an array of exactly LatLng objects
  _adjustAllMarkers: function _adjustAllMarkers(markerLatLngs) {
    if (!markerLatLngs.length || markerLatLngs.length !== 4) {
      /* eslint-disable-next-line no-console */
      console.error('_adjustAllMarkers() requires an array of EXACTLY 4 LatLng coordinates');
      return;
    }

    this._cornerMarkers.forEach(function (marker, index) {
      marker.setLatLng(markerLatLngs[index]);
    });
  },
  // adjusts the position of the two Markers adjacent to the Marker specified
  // params: anchorMarker -- the Marker object used to determine adjacent Markers
  _adjustAdjacentMarkers: function _adjustAdjacentMarkers(anchorMarker) {
    if (!anchorMarker || !anchorMarker.getLatLng || !anchorMarker._oppositeCornerLatLng) {
      /* eslint-disable-next-line no-console */
      console.error('_adjustAdjacentMarkers() requires a valid Marker object');
      return;
    }

    var anchorLatLng = anchorMarker.getLatLng();
    var oppositeLatLng = anchorMarker._oppositeCornerLatLng; // Find two corners not currently occupied by dragged marker and its opposite corner

    var unmarkedCorners = [];

    var corners = this._findCorners();

    corners.forEach(function (corner) {
      if (!corner.equals(anchorLatLng) && !corner.equals(oppositeLatLng)) {
        unmarkedCorners.push(corner);
      }
    }); // reposition markers for those corners

    var unmarkedCornerIndex = 0;

    if (unmarkedCorners.length === 2) {
      this._cornerMarkers.forEach(function (marker) {
        var markerLatLng = marker.getLatLng();

        if (!markerLatLng.equals(anchorLatLng) && !markerLatLng.equals(oppositeLatLng)) {
          marker.setLatLng(unmarkedCorners[unmarkedCornerIndex]);
          unmarkedCornerIndex += 1;
        }
      });
    }
  },
  // finds the 4 corners of the current bounding box
  // returns array of 4 LatLng objects in this order: Northwest corner, Northeast corner, Southeast corner, Southwest corner
  _findCorners: function _findCorners() {
    var corners = this._layer.getBounds();

    var northwest = corners.getNorthWest();
    var northeast = corners.getNorthEast();
    var southeast = corners.getSouthEast();
    var southwest = corners.getSouthWest();
    return [northwest, northeast, southeast, southwest];
  }
});

/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__L_PM_Edit__ = __webpack_require__(1);

__WEBPACK_IMPORTED_MODULE_0__L_PM_Edit__["a" /* default */].Circle = __WEBPACK_IMPORTED_MODULE_0__L_PM_Edit__["a" /* default */].extend({
  initialize: function initialize(layer) {
    this._layer = layer;
    this._enabled = false;
  },
  toggleEdit: function toggleEdit(options) {
    if (!this.enabled()) {
      this.enable(options);
    } else {
      this.disable();
    }
  },
  enabled: function enabled() {
    return this._enabled;
  },
  enable: function enable(options) {
    var _this = this;

    L.Util.setOptions(this, options);
    this._map = this._layer._map;

    if (!this.enabled()) {
      // if it was already enabled, disable first
      // we don't block enabling again because new options might be passed
      this.disable();
    } // change state


    this._enabled = true; // // init markers

    this._initMarkers(); // if polygon gets removed from map, disable edit mode


    this._layer.on('remove', function (e) {
      _this.disable(e.target);
    });
  },
  disable: function disable() {
    var layer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._layer;

    // if it's not enabled, it doesn't need to be disabled
    if (!this.enabled()) {
      return false;
    } // prevent disabling if layer is being dragged


    if (layer.pm._dragging) {
      return false;
    }

    layer.pm._enabled = false;

    layer.pm._helperLayers.clearLayers(); // clean up draggable


    layer.off('mousedown');
    layer.off('mouseup'); // remove draggable class

    var el = layer._path ? layer._path : this._layer._renderer._container;
    L.DomUtil.removeClass(el, 'leaflet-pm-draggable');

    if (this._layerEdited) {
      this._layer.fire('pm:update', {});
    }

    this._layerEdited = false;
    return true;
  },
  _initMarkers: function _initMarkers() {
    var map = this._map; // cleanup old ones first

    if (this._helperLayers) {
      this._helperLayers.clearLayers();
    } // add markerGroup to map, markerGroup includes regular and middle markers


    this._helperLayers = new L.LayerGroup();
    this._helperLayers._pmTempLayer = true;

    this._helperLayers.addTo(map); // create marker for each coordinate


    var center = this._layer.getLatLng();

    var radius = this._layer._radius;

    var outer = this._getLatLngOnCircle(center, radius);

    this._centerMarker = this._createCenterMarker(center);
    this._outerMarker = this._createOuterMarker(outer);
    this._markers = [this._centerMarker, this._outerMarker];

    this._createHintLine(this._centerMarker, this._outerMarker);

    if (this.options.snappable) {
      this._initSnappableMarkers();
    }
  },
  _getLatLngOnCircle: function _getLatLngOnCircle(center, radius) {
    var pointA = this._map.project(center);

    var pointB = L.point(pointA.x + radius, pointA.y);
    return this._map.unproject(pointB);
  },
  _resizeCircle: function _resizeCircle() {
    this._syncHintLine();

    this._syncCircleRadius();
  },
  _moveCircle: function _moveCircle(e) {
    var center = e.latlng;

    this._layer.setLatLng(center);

    var radius = this._layer._radius;

    var outer = this._getLatLngOnCircle(center, radius);

    this._outerMarker.setLatLng(outer);

    this._syncHintLine();

    this._layer.fire('pm:centerplaced', {
      layer: this._layer,
      latlng: center
    });
  },
  _onMarkerDragStart: function _onMarkerDragStart(e) {
    this._layer.fire('pm:markerdragstart', {
      markerEvent: e
    });
  },
  _onMarkerDragEnd: function _onMarkerDragEnd(e) {
    // fire edit event
    this._fireEdit(); // fire markerdragend event


    this._layer.fire('pm:markerdragend', {
      markerEvent: e
    });
  },
  _syncCircleRadius: function _syncCircleRadius() {
    var A = this._centerMarker.getLatLng();

    var B = this._outerMarker.getLatLng();

    var distance = A.distanceTo(B);

    this._layer.setRadius(distance);
  },
  _syncHintLine: function _syncHintLine() {
    var A = this._centerMarker.getLatLng();

    var B = this._outerMarker.getLatLng(); // set coords for hintline from marker to last vertex of drawin polyline


    this._hintline.setLatLngs([A, B]);
  },
  _createHintLine: function _createHintLine(markerA, markerB) {
    var A = markerA.getLatLng();
    var B = markerB.getLatLng();
    this._hintline = L.polyline([A, B], this.options.hintlineStyle);
    this._hintline._pmTempLayer = true;

    this._helperLayers.addLayer(this._hintline);
  },
  _createCenterMarker: function _createCenterMarker(latlng) {
    var marker = this._createMarker(latlng);

    L.DomUtil.addClass(marker._icon, 'leaflet-pm-draggable'); // TODO: switch back to move event once this leaflet issue is solved:
    // https://github.com/Leaflet/Leaflet/issues/6492

    marker.on('drag', this._moveCircle, this); // marker.on('contextmenu', this._removeMarker, this);

    return marker;
  },
  _createOuterMarker: function _createOuterMarker(latlng) {
    var marker = this._createMarker(latlng);

    marker.on('move', this._resizeCircle, this);
    return marker;
  },
  _createMarker: function _createMarker(latlng) {
    var marker = new L.Marker(latlng, {
      draggable: true,
      icon: L.divIcon({
        className: 'marker-icon'
      })
    });
    marker._origLatLng = latlng;
    marker._pmTempLayer = true;
    marker.on('dragstart', this._onMarkerDragStart, this);
    marker.on('dragend', this._onMarkerDragEnd, this);

    this._helperLayers.addLayer(marker);

    return marker;
  },
  _fireEdit: function _fireEdit() {
    // fire edit event
    this._layer.fire('pm:edit');

    this._layerEdited = true;
  }
});

/***/ }),
/* 86 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 87 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);