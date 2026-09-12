// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

beforeEach(() => {
  // create the map
  cy.visit('/index.html', {
    onLoad: (contentWindow) => {
      const { L } = contentWindow;

      const tiles = L.tileLayer(
        'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 22,
        }
      );

      // create the map
      const map = L.map('map', {
        preferCanvas: false,
        doubleClickZoom: false, // Leaflet 1.8 DoubleTap fix
      })
        .setView([51.505, -0.09], 13)
        .addLayer(tiles);

      contentWindow.map = map;

      contentWindow.ONE_BLOCK_CONTROL_COUNT = 12;
      contentWindow.TOP_RIGHT_BLOCK_CONTROL_COUNT = 7;
      contentWindow.TOP_LEFT_BLOCK_CONTROL_COUNT = 6;

      // add leaflet-geoman toolbar
      map.pm.addControls();
    },
  });
});
