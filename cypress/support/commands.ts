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
    const layerCount = Object.values(map._layers).filter(
      (l) => (l as L.Layer)._drawnByGeoman
    ).length;
    cy.wrap(layerCount).should('eq', count);
  });
});

Cypress.Commands.add('testLayerAdditionPerformance', () => {
  let t0: number;

  cy.window().then(({ map, L }) => {
    t0 = performance.now();

    function getRandomLatLng(_map?: L.Map) {
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
      locations.push(new L.CircleMarker(getRandomLatLng(map), {}));
    }

    for (let i = 0; i < 2500; i += 1) {
      terminals.push(new L.CircleMarker(getRandomLatLng(map), {}));
    }

    const t = new L.LayerGroup(terminals).addTo(map);
    const l = new L.LayerGroup(locations).addTo(map);

    const base = {};

    const overlays = {
      Locations: t,
      Terminals: l,
    };

    new L.LayersControl(base, overlays).addTo(map);
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
          const layer = new L.GeoJSON(json, { pmIgnore: ignore }).addTo(map);
          const bounds = layer.getBounds();
          map.fitBounds(bounds);
        });
    }
    if (shape === 'PolygonPart2') {
      cy.fixture(shape)
        .as('poly')
        .then((json) => {
          const layer = new L.GeoJSON(json, { pmIgnore: ignore }).addTo(map);
          const bounds = layer.getBounds();
          map.fitBounds(bounds);
        });
    }
    if (shape === 'MultiPolygon') {
      cy.fixture(shape)
        .as('poly')
        .then((json) => {
          const layer = new L.GeoJSON(json, { pmIgnore: ignore }).addTo(map);
          const bounds = layer.getBounds();
          map.fitBounds(bounds);
          return layer;
        });
    }

    if (shape === 'LineString') {
      cy.fixture(shape)
        .as('poly')
        .then((json) => {
          const layer = new L.GeoJSON(json, { pmIgnore: ignore }).addTo(map);
          const bounds = layer.getBounds();
          map.fitBounds(bounds);
        });
    }

    if (shape === 'MultiLineString') {
      cy.fixture(shape)
        .as('poly')
        .then((json) => {
          const layer = new L.GeoJSON(json, { pmIgnore: ignore }).addTo(map);
          const bounds = layer.getBounds();
          map.fitBounds(bounds);
        });
    }

    if (shape === 'MonsterPolygon') {
      cy.fixture(shape)
        .as('poly')
        .then((json) => {
          const layer = new L.Polygon(json.data.points, {
            pmIgnore: ignore,
          }).addTo(map);
          const bounds = layer.getBounds();
          map.fitBounds(bounds);
        });
    }

    if (shape === 'PolygonIntersects') {
      cy.fixture(shape)
        .as('poly')
        .then((json) => {
          //
          const layer = new L.GeoJSON(json).addTo(map);
          const bounds = layer.getBounds();
          map.fitBounds(bounds);
        });
    }

    if (shape === 'FeatureCollectionEventFire') {
      cy.fixture(shape)
        .then((json) => {
          //
          const layer = new L.GeoJSON(json).addTo(map);
          const bounds = layer.getBounds();
          map.fitBounds(bounds);

          return layer;
        })
        .as('feature');
    }

    if (shape === 'FeatureCollectionWithCircles') {
      cy.fixture(shape, ignore as unknown as Cypress.Timeoutable)
        .then((json) => {
          const layer = new L.GeoJSON(json, {
            pmIgnore: ignore,
            pointToLayer: (feature, latlng) => {
              if (feature.properties.customGeometry) {
                return new L.Circle(latlng, {
                  radius: feature.properties.customGeometry.radius,
                  pmIgnore: ignore,
                });
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

// Leaflet 2 listens to pointer events. Cypress triggers them as plain
// Events unless told otherwise, so make them mouse PointerEvents.
Cypress.Commands.overwrite('trigger', ((
  originalFn: (...a: unknown[]) => unknown,
  subject: unknown,
  eventName: string,
  ...args: unknown[]
) => {
  if (!/^pointer(down|up|move|over|out)$/.test(eventName)) {
    return originalFn(subject, eventName, ...args);
  }
  const pointer = {
    eventConstructor: 'PointerEvent',
    pointerId: 1,
    pointerType: 'mouse',
    isPrimary: true,
  };
  const last = args.at(-1);
  if (last && typeof last === 'object') {
    args[args.length - 1] = { ...pointer, ...last };
  } else {
    args.push(pointer);
  }
  return originalFn(subject, eventName, ...args);
}) as never);
