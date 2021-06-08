describe('Draw Circle Marker', () => {
  const mapSelector = '#map';

  Cypress.Commands.add('hasCircleLayers', (count) => {
    cy.window().then(({ map, L }) => {
      const layerCount = Object.values(map._layers).reduce((total, layer) => {
        if (layer instanceof L.CircleMarker) {
          return total + 1;
        }
        return total;
      }, 0);
      cy.wrap(layerCount).should('eq', count);
    });
  });

  const createMarkers = () => {
    // No circle layers
    cy.hasCircleLayers(0);

    cy.toolbarButton('circle-marker')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    // Should have the hint circle marker
    cy.hasCircleLayers(1);

    cy.get(mapSelector)
      .click(150, 250)
      .click(150, 50)
      .click(500, 50)
      .click(500, 300);

    // Should have 4 circle markers, 1 hint marker
    cy.hasCircleLayers(5);

    cy.toolbarButton('circle-marker').click();

    // Should have 4 circle markers, no hint markers
    cy.hasCircleLayers(4);
  };

  it('places circle markers', () => {
    createMarkers();
  });

  it('handles 6k circle markers in under 1 sec', () => {
    cy.toolbarButton('circle-marker').click();

    cy.get(mapSelector).click(150, 250);

    cy.testLayerAdditionPerformance();
  });

  it('correctly disables drag', () => {
    createMarkers();

    cy.window().then(({ map, L }) => {
      map.eachLayer((layer) => {
        if (layer instanceof L.CircleMarker) {
          assert.isFalse(
            L.DomUtil.hasClass(layer._path, 'leaflet-pm-draggable'),
            'not draggable'
          );
        }
      });
    });

    cy.toolbarButton('edit').click();

    cy.window().then(({ map, L }) => {
      map.eachLayer((layer) => {
        if (layer instanceof L.CircleMarker) {
          assert.isTrue(
            L.DomUtil.hasClass(layer._path, 'leaflet-pm-draggable'),
            'draggable'
          );
        }
      });
    });

    cy.toolbarButton('edit').click();

    cy.window().then(({ map, L }) => {
      map.eachLayer((layer) => {
        if (layer instanceof L.CircleMarker) {
          assert.isFalse(
            L.DomUtil.hasClass(layer._path, 'leaflet-pm-draggable'),
            'not draggable'
          );
        }
      });
    });
  });

  it('deletes all circle markers', () => {
    createMarkers();

    cy.hasCircleLayers(4);

    cy.toolbarButton('delete')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector)
      .click(150, 245)
      .click(150, 50)
      .click(500, 50)
      .click(500, 300);

    cy.toolbarButton('delete').click();

    cy.hasCircleLayers(0);
  });

  it('draw a CircleMarker like a Circle', () => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({ editable: true, continueDrawing: false });
    });

    cy.toolbarButton('circle-marker')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector).click(200, 200).click(250, 250);

    cy.hasCircleLayers(1);

    cy.toolbarButton('edit')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.hasVertexMarkers(2);
  });
  it('snapping to CircleMarker with pmIgnore:true', () => {
    cy.window().then(({ map, L }) => {
      L.circleMarker(map.getCenter(), { pmIgnore: true }).addTo(map);
    });

    cy.toolbarButton('rectangle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector).click(200, 200).click(400, 350);

    cy.toolbarButton('edit')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.hasVertexMarkers(4);
  });

  it('disable continueDrawing', () => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({ continueDrawing: false });
    });

    cy.toolbarButton('circle-marker').click();
    cy.get(mapSelector).click(191, 216);

    cy.get(mapSelector).click(350, 350);

    cy.toolbarButton('circle-marker')
      .closest('.button-container')
      .should('have.not.class', 'active');

    cy.toolbarButton('edit').click();
    cy.hasLayers(3);
  });

  it('disable markerEditable', () => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({ markerEditable: false });
    });

    cy.toolbarButton('circle-marker').click();
    cy.get(mapSelector).click(191, 216);

    cy.window().then(({ map }) => {
      const marker = map.pm.getGeomanDrawLayers()[0];
      const enabled = marker.pm.enabled();
      expect(enabled).to.equal(false);
    });
  });

  it('enable markerEditable but disable MarkerRemoval', () => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({
        markerEditable: true,
        preventMarkerRemoval: true,
      });
    });

    cy.toolbarButton('circle-marker').click();
    cy.get(mapSelector).click(191, 216);

    cy.window().then(({ map }) => {
      const marker = map.pm.getGeomanDrawLayers()[0];
      const enabled = marker.pm.enabled();
      expect(enabled).to.equal(true);
    });

    cy.get(mapSelector).rightclick(191, 214);

    cy.hasLayers(5);
  });

  it('set max radius of circleMarker', () => {
    cy.toolbarButton('circle-marker')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.window().then(({ map, L }) => {
      L.marker(map.getCenter()).addTo(map);
      map.pm.setGlobalOptions({
        minRadiusCircleMarker: 50,
        maxRadiusCircleMarker: 150,
        editable: true,
      });
      cy.get(mapSelector)
        .click(250, 200)
        .click(410, 190)
        .then(() => {
          const layers = map.pm.getGeomanDrawLayers();
          layers.forEach((layer) => {
            if (layer instanceof L.CircleMarker) {
              expect(layer.getRadius()).to.equal(150);
            }
          });
        });
    });
  });
  it('set min radius of circleMarker', () => {
    cy.toolbarButton('circle-marker')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.window().then(({ map, L }) => {
      L.marker(map.getCenter()).addTo(map);
      map.pm.setGlobalOptions({
        minRadiusCircleMarker: 150,
        maxRadiusCircleMarker: 300,
        editable: true,
      });
      cy.get(mapSelector)
        .click(250, 200)
        .click(300, 200)
        .then(() => {
          const layers = map.pm.getGeomanDrawLayers();
          layers.forEach((layer) => {
            if (layer instanceof L.CircleMarker) {
              expect(layer.getRadius()).to.equal(150);
            }
          });
        });
    });
  });
  it('requireSnapToFinish', () => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({
        requireSnapToFinish: true,
        snapSegment: false,
      });
    });

    cy.toolbarButton('polygon').click();
    cy.get(mapSelector)
      .click(150, 250)
      .click(160, 50)
      .click(250, 50)
      .click(150, 250);

    cy.toolbarButton('circle-marker').click();
    cy.get(mapSelector).click(350, 250).click(190, 60);

    cy.window().then(({ map }) => {
      expect(1).to.eq(map.pm.getGeomanDrawLayers().length);
    });

    cy.get(mapSelector).click(250, 50);

    cy.window().then(({ map }) => {
      expect(2).to.eq(map.pm.getGeomanDrawLayers().length);
    });
  });
  it('requireSnapToFinish editable', () => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({
        requireSnapToFinish: true,
        editable: true,
        snapSegment: false,
      });
    });

    cy.toolbarButton('polygon').click();
    cy.get(mapSelector)
      .click(150, 250)
      .click(160, 50)
      .click(250, 50)
      .click(150, 250);

    cy.toolbarButton('circle-marker').click();
    cy.get(mapSelector).click(350, 250).click(190, 60);

    cy.window().then(({ map }) => {
      expect(1).to.eq(map.pm.getGeomanDrawLayers().length);
    });

    cy.get(mapSelector).click(250, 50);

    cy.window().then(({ map }) => {
      expect(2).to.eq(map.pm.getGeomanDrawLayers().length);
    });
  });
});
