/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
require('tape');
require('leaflet');
require('../dist/leaflet.pm.min.js');

require('./init.spec.js');
require('./toolbar.spec.js');
require('./map.spec.js');
// require('./events.spec.js');
