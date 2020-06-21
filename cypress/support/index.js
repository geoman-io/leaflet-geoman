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

const accessToken = 'pk.eyJ1IjoibWFwc29mc3VtaXQiLCJhIjoiY2p4bHJvZzczMDNkMzN4bzM0OWkyNjJiMiJ9.OeORcEVrnlz4Ig-WnQNb6g';

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


	// because of this issue: https://github.com/Leaflet/prosthetic-hand/issues/16
	// this._onStop not detected by default as instance of Function. -> Replaced with typeof this._onStop === "function"
	cy.window().then(({ Hand }) => {
		Hand.prototype.fingerIsIdle = function () {
			if (this._fingers.every(f => f.isIdle())) {
				if (!this._fingersAreIdle) {
					// 🖑event prostheticHandStop: CustomEvent
					// Fired when all movements are complete.
					document.dispatchEvent(new CustomEvent('prostheticHandStop', {target: this}));
					if (this._onStop && typeof this._onStop === "function") {
						this._onStop(this);
					}
				}
				this._fingersAreIdle = true;
			}
		};

		Hand.prototype.fingerIsBusy = function() {
			if (this._fingersAreIdle) {
				// 🖑section
				// Use `document.addEventListener('prostheticHandStop', fn)` to
				// do stuff with it.
				// 🖑event prostheticHandStart: CustomEvent
				// Fired when all movements are complete.
				document.dispatchEvent(new CustomEvent('prostheticHandStart', { target: this }));
				if (this._onStart && typeof this._onStart === "function") {
					this._onStart(this);
				}
				this._fingersAreIdle = false;
				this._scheduleNextDispatch();
			}
			return this;
		}
	});
});
