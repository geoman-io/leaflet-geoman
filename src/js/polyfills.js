/* eslint-disable */

// Array.find Polyfill for IE<12.
// Requested here: https://github.com/codeofsumit/leaflet.pm/issues/173
Array.prototype.find = Array.prototype.find || function(callback) {
  if (this === null) {
    throw new TypeError('Array.prototype.find called on null or undefined');
  } else if (typeof callback !== 'function') {
    throw new TypeError('callback must be a function');
  }
  var list = Object(this);
  // Makes sures is always has an positive integer as length.
  var length = list.length >>> 0;
  var thisArg = arguments[1];
  for (var i = 0; i < length; i++) {
    var element = list[i];
    if ( callback.call(thisArg, element, i, list) ) {
      return element;
    }
  }
};