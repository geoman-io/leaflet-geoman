// eslint-disable-next-line import/no-extraneous-dependencies
import 'cypress-wait-until';
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('hasLayers', (count) => {
  cy.window().then(({ map }) => {
    const layerCount = Object.keys(map._layers).length;
    cy.wrap(layerCount).should('eq', count);
  });
});

Cypress.Commands.add('hasDrawnLayers', (count) => {
  cy.window().then(({ map }) => {
    const layerCount = Object.keys(map._layers).filter(
      (l) => map._layers[l]._drawnByGeoman
    ).length;
    cy.wrap(layerCount).should('eq', count);
  });
});

Cypress.Commands.add('testLayerAdditionPerformance', () => {
  let t0;

  cy.window().then(({ map, L }) => {
    t0 = performance.now();

    function getRandomLatLng() {
      const bounds = map.getBounds();
      const southWest = bounds.getSouthWest();
      const northEast = bounds.getNorthEast();
      const lngSpan = northEast.lng - southWest.lng;
      const latSpan = northEast.lat - southWest.lat;

      return new L.LatLng(
        southWest.lat + latSpan * Math.random(),
        southWest.lng + lngSpan * Math.random()
      );
    }

    const terminals = [];
    const locations = [];

    for (let i = 0; i < 3500; i += 1) {
      locations.push(L.circleMarker(getRandomLatLng(map)));
    }

    for (let i = 0; i < 2500; i += 1) {
      terminals.push(L.circleMarker(getRandomLatLng(map)));
    }

    const t = L.layerGroup(terminals).addTo(map);
    const l = L.layerGroup(locations).addTo(map);

    const base = {};

    const overlays = {
      Locations: t,
      Terminals: l,
    };

    L.control.layers(base, overlays).addTo(map);
  });

  cy.window().then(() => {
    const t1 = performance.now();
    const delta = Math.abs(t1 - t0);
    // console.log(`Rendering 6k CircleMarkers took ${delta} milliseconds.`);

    expect(delta).to.lessThan(1000);
  });
});

Cypress.Commands.add('hasMiddleMarkers', (count) => {
  cy.get('.marker-icon-middle').should(($p) => {
    expect($p).to.have.length(count);
  });
});

Cypress.Commands.add('hasVertexMarkers', (count) => {
  cy.get('.marker-icon:not(.marker-icon-middle)').should(($p) => {
    expect($p).to.have.length(count);
  });
});

Cypress.Commands.add('hasTotalVertexMarkers', (count) => {
  cy.get('.marker-icon').should(($p) => {
    expect($p).to.have.length(count);
  });
});

Cypress.Commands.add('toolbarButton', (name) =>
  cy.get(`.leaflet-pm-icon-${name}`)
);

Cypress.Commands.add('toolbarButtonContainer', (name, map) => {
  cy.get(map.pm.Toolbar.buttons[name]._container.children[0]);
});

Cypress.Commands.add('drawShape', (shape, ignore) => {
  cy.window().then(({ map, L }) => {
    if (shape === 'PolygonPart1') {
      cy.fixture(shape)
        .as('poly')
        .then((json) => {
          const layer = L.geoJson(json, { pmIgnore: ignore }).addTo(map);
          const bounds = layer.getBounds();
          map.fitBounds(bounds);
        });
    }
    if (shape === 'PolygonPart2') {
      cy.fixture(shape)
        .as('poly')
        .then((json) => {
          const layer = L.geoJson(json, { pmIgnore: ignore }).addTo(map);
          const bounds = layer.getBounds();
          map.fitBounds(bounds);
        });
    }
    if (shape === 'MultiPolygon') {
      cy.fixture(shape)
        .as('poly')
        .then((json) => {
          const layer = L.geoJson(json, { pmIgnore: ignore }).addTo(map);
          const bounds = layer.getBounds();
          map.fitBounds(bounds);
          return layer;
        });
    }

    if (shape === 'LineString') {
      cy.fixture(shape)
        .as('poly')
        .then((json) => {
          const layer = L.geoJson(json, { pmIgnore: ignore }).addTo(map);
          const bounds = layer.getBounds();
          map.fitBounds(bounds);
        });
    }

    if (shape === 'MultiLineString') {
      cy.fixture(shape)
        .as('poly')
        .then((json) => {
          const layer = L.geoJson(json, { pmIgnore: ignore }).addTo(map);
          const bounds = layer.getBounds();
          map.fitBounds(bounds);
        });
    }

    if (shape === 'MonsterPolygon') {
      cy.fixture(shape)
        .as('poly')
        .then((json) => {
          const layer = L.polygon(json.data.points, { pmIgnore: ignore }).addTo(
            map
          );
          const bounds = layer.getBounds();
          map.fitBounds(bounds);
        });
    }

    if (shape === 'PolygonIntersects') {
      cy.fixture(shape)
        .as('poly')
        .then((json) => {
          //
          const layer = L.geoJSON(json).addTo(map);
          const bounds = layer.getBounds();
          map.fitBounds(bounds);
        });
    }

    if (shape === 'FeatureCollectionEventFire') {
      cy.fixture(shape)
        .then((json) => {
          //
          const layer = L.geoJSON(json).addTo(map);
          const bounds = layer.getBounds();
          map.fitBounds(bounds);

          return layer;
        })
        .as('feature');
    }

    if (shape === 'FeatureCollectionWithCircles') {
      cy.fixture(shape, ignore)
        .then((json) => {
          const layer = L.geoJson(json, {
            pmIgnore: ignore,
            pointToLayer: (feature, latlng) => {
              if (feature.properties.customGeometry) {
                return new L.Circle(
                  latlng,
                  feature.properties.customGeometry.radius,
                  { pmIgnore: ignore }
                );
              }
              return new L.Marker(latlng, { pmIgnore: ignore });
            },
          });

          layer.addTo(map);

          const bounds = layer.getBounds();
          map.fitBounds(bounds);

          return layer;
        })
        .as('featurecol');
    }
  });
});
