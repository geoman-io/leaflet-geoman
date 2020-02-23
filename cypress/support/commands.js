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

Cypress.Commands.add('hasLayers', count => {
  cy.window().then(({ map }) => {
    const layerCount = Object.keys(map._layers).length;
    cy.wrap(layerCount).should('eq', count);
  });
});

Cypress.Commands.add('hasMiddleMarkers', count => {
  cy.get('.marker-icon-middle').should($p => {
    expect($p).to.have.length(count);
  });
});

Cypress.Commands.add('hasVertexMarkers', count => {
  cy.get('.marker-icon:not(.marker-icon-middle)').should($p => {
    expect($p).to.have.length(count);
  });
});

Cypress.Commands.add('toolbarButton', name =>
  cy.get(`.leaflet-pm-icon-${name}`)
);

Cypress.Commands.add('drawShape', (shape, ignore) => {
  cy.window().then(({ map, L }) => {
    if (shape === 'MultiPolygon') {
      cy.fixture(shape)
        .as('poly')
        .then(json => {
          const layer = L.geoJson(json, { pmIgnore: ignore }).addTo(map);
          const bounds = layer.getBounds();
          map.fitBounds(bounds);
        });
    }

    if (shape === 'LineString') {
      cy.fixture(shape)
        .as('poly')
        .then(json => {
          const layer = L.geoJson(json, { pmIgnore: ignore }).addTo(map);
          const bounds = layer.getBounds();
          map.fitBounds(bounds);
        });
    }

    if (shape === 'FeatureCollectionWithCircles') {
      cy.fixture(shape, ignore)
        .then(json => {
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
