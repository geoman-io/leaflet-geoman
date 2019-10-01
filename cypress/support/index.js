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

const accessToken = 'pk.eyJ1IjoibWFwc29mc3VtaXQiLCJhIjoiY2p5MDd2dTkxMDBkMjNubXNiaDVvdHo5ZCJ9.eMqOWuqoFITk01ie1I2BYQ';

beforeEach(() => {
	// create the map
	cy.visit('/index.html', {
		onLoad: (contentWindow) => {
			const { L } = contentWindow;

			// mapbox tiles
			const mapboxTiles = L.tileLayer(
				`https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/{z}/{x}/{y}?access_token=${accessToken}`,
				{
					attribution:
						'&copy; <a href="https://www.mapbox.com/feedback/">Mapbox</a> &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
				}
			);

			// create the map
			const map = L.map('map', {
				preferCanvas: false
			})
				.setView([51.505, -0.09], 13)
				.addLayer(mapboxTiles);

			contentWindow.map = map;

			// add leaflet-geoman toolbar
			map.pm.addControls();
		}
	});
});
