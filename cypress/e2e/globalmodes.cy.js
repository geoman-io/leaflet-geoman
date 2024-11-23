describe('Modes', () => {
  const mapSelector = '#map';
  it('limits markers in edit mode', () => {
    cy.drawShape('MonsterPolygon');

    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({
        limitMarkersToCount: -1,
      });
    });

    cy.toolbarButton('edit').click();
    cy.hasVertexMarkers(2487);

    cy.toolbarButton('edit').click();

    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({
        limitMarkersToCount: 20,
      });
    });

    cy.toolbarButton('edit').click();
    cy.hasTotalVertexMarkers(20);
  });

  it('properly changes markers on vertex removal', () => {
    cy.drawShape('PolygonPart1');

    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({
        limitMarkersToCount: 3,
        limitMarkersToViewport: true,
      });
    });

    cy.toolbarButton('edit').click();

    cy.hasTotalVertexMarkers(3);

    cy.get('.marker-icon:not(.marker-icon-middle)')
      .first()
      .trigger('contextmenu');

    cy.hasTotalVertexMarkers(3);
  });

  it('respect limits when adding layers mid-edit', () => {
    cy.drawShape('PolygonPart1');

    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({
        limitMarkersToCount: 3,
        limitMarkersToViewport: true,
      });
    });

    cy.toolbarButton('edit').click();

    cy.hasTotalVertexMarkers(3);

    cy.drawShape('PolygonPart2');

    cy.hasTotalVertexMarkers(6);
  });

  it('properly removes layers', () => {
    cy.toolbarButton('marker').click();

    cy.get(mapSelector).click(90, 250).click(120, 250);

    cy.toolbarButton('delete').click();

    cy.hasLayers(3);

    cy.get(mapSelector).click(90, 245).click(120, 245);

    cy.hasLayers(1);

    cy.toolbarButton('delete').click();
  });

  it('unable to remove layer with pmIgnore:true', () => {
    cy.window().then(({ L, map }) => {
      const testLayer = new L.FeatureGroup();
      map.addLayer(testLayer);

      Cypress.$(map).on('pm:create', ({ originalEvent: event }) => {
        const poly = event.layer;

        const coords = poly.getLatLngs();

        const newPoly = L.polygon(coords, { pmIgnore: true }).addTo(testLayer);
        poly.remove();

        return newPoly;
      });
    });

    cy.toolbarButton('polygon').click();

    cy.get(mapSelector)
      .click(320, 150)
      .click(320, 100)
      .click(400, 100)
      .click(400, 200)
      .click(320, 150);

    cy.toolbarButton('delete').click();
    cy.get(mapSelector).click(330, 130);

    cy.window().then(({ L, map }) => {
      const layers = map._layers;

      expect(
        Object.entries(layers).filter((l) => l[1] instanceof L.Polygon).length
      ).to.equal(1);
    });
  });

  it('drag mode enables drag for all layers', () => {
    cy.toolbarButton('marker').click();

    cy.get(mapSelector).click(90, 250).click(120, 250);

    cy.toolbarButton('drag').click();

    cy.window().then(({ map, L }) => {
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          assert.isTrue(layer.pm.layerDragEnabled());
        }
      });
    });
  });

  it('drag mode properly disables layers in edit mode', () => {
    // activate polygon drawing
    cy.toolbarButton('polygon').click();

    // draw a polygon - triggers the event pm:create
    cy.get(mapSelector)
      .click(90, 250)
      .click(100, 50)
      .click(150, 50)
      .click(150, 150)
      .click(90, 250);

    cy.window().then(({ map, L }) => {
      map.eachLayer((l) => {
        if (l instanceof L.Polygon) {
          l.pm.enable();
        }
      });

      map.pm.enableGlobalDragMode();

      cy.hasVertexMarkers(0);
    });
  });

  it('reenables drag mode with acceptable performance', () => {
    cy.toolbarButton('circle-marker').click();
    cy.get(mapSelector).click(150, 250);
    cy.toolbarButton('drag').click();

    cy.testLayerAdditionPerformance();
  });

  it('re-applies edit mode onAdd', () => {
    cy.toolbarButton('polygon').click();

    const jsonString =
      '{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[-0.155182,51.515687],[-0.155182,51.521028],[-0.124283,51.521028],[-0.124283,51.510345],[-0.155182,51.515687]]]}}';

    const poly = JSON.parse(jsonString);

    cy.get(mapSelector)
      .click(320, 150)
      .click(320, 100)
      .click(400, 100)
      .click(400, 200)
      .click(320, 150);

    cy.toolbarButton('edit').click();
    cy.hasVertexMarkers(4);

    cy.window().then(({ map, L }) => {
      L.geoJSON(poly).addTo(map);
    });

    cy.hasVertexMarkers(8);

    cy.toolbarButton('edit').click();
  });

  it('reenables edit mode with acceptable performance', () => {
    cy.toolbarButton('circle-marker').click();
    cy.get(mapSelector).click(150, 250);
    cy.toolbarButton('edit').click();

    cy.window().then(({ map, L }) => {
      map.eachLayer((layer) => {
        if (layer instanceof L.CircleMarker) {
          assert.isTrue(layer.pm.enabled());
        }
      });
    });

    cy.testLayerAdditionPerformance();
  });

  it('re-applies removal mode onAdd', () => {
    cy.toolbarButton('marker').click();

    cy.get(mapSelector).click(90, 250).click(120, 250);

    cy.toolbarButton('delete').click();

    cy.get(mapSelector).click(90, 248);

    cy.hasLayers(2);

    cy.window().then(({ map, L }) => {
      L.marker([51.505, -0.09]).addTo(map);
      L.marker([51.505, -0.08]).addTo(map);
    });

    cy.window().then(({ map, L }) => {
      map.eachLayer((l) => {
        if (l instanceof L.Marker) {
          cy.wrap(l._icon).click();
        }
      });
    });

    cy.hasLayers(1);

    cy.toolbarButton('marker').click();

    cy.get(mapSelector).click(90, 250);

    cy.toolbarButton('marker').click();

    cy.get(mapSelector).click(90, 245);

    cy.hasLayers(2);
  });

  it('reenables removal mode with acceptable performance', () => {
    cy.toolbarButton('circle-marker').click();
    cy.get(mapSelector).click(150, 250);
    cy.toolbarButton('delete').click();

    cy.testLayerAdditionPerformance();
  });

  it('Test removal when preventMarkerRemoval is passed to global options', () => {
    cy.toolbarButton('rectangle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector).click(200, 200).click(400, 350);

    cy.window().then(({ map }) => {
      map.pm.toggleGlobalEditMode({
        preventMarkerRemoval: true,
      });
    });

    cy.toolbarButton('delete')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector).click(200, 300);

    cy.toolbarButton('delete').click();

    cy.window().then(({ L, map }) => {
      const layers = map._layers;

      expect(
        Object.entries(layers).filter((l) => l[1] instanceof L.Rectangle).length
      ).to.equal(0);
    });
  });
  it('re-enable layers that added while in globaleditmode', () => {
    cy.window().then(({ map, L }) => {
      map.pm.enableGlobalEditMode();

      const json = JSON.parse(
        '{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[-74.058559,40.718564],[-74.058559,40.726045],[-74.03959,40.726045],[-74.03959,40.718564],[-74.058559,40.718564]]]}}'
      );
      const json2 = JSON.parse(
        '{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[-74.035277,40.703719],[-74.035277,40.712633],[-74.017596,40.712633],[-74.017596,40.703719],[-74.035277,40.703719]]]}}'
      );
      const p2 = L.geoJson(json).addTo(map);
      L.geoJson(json2).addTo(map);

      map.fitBounds(p2.getBounds());
      map.setZoom(13);
    });
    cy.hasVertexMarkers(8);
  });

  it('prevent enabling multiple modes at the same time', () => {
    cy.toolbarButton('edit').click();

    cy.toolbarButton('delete')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.toolbarButton('edit')
      .closest('.button-container')
      .should('not.have.class', 'active');
  });

  it('re-applies drag mode onAdd', () => {
    cy.toolbarButton('polygon').click();

    const jsonString =
      '{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[-0.155182,51.515687],[-0.155182,51.521028],[-0.124283,51.521028],[-0.124283,51.510345],[-0.155182,51.515687]]]}}';

    const poly = JSON.parse(jsonString);

    cy.get(mapSelector)
      .click(320, 150)
      .click(320, 100)
      .click(400, 100)
      .click(400, 200)
      .click(320, 150);

    cy.toolbarButton('drag').click();

    cy.window().then(({ map }) => {
      expect(map.pm.getGeomanLayers()[0].pm.layerDragEnabled()).to.equal(true);
    });

    cy.window().then(({ map, L }) => {
      L.geoJSON(poly).addTo(map);
    });

    cy.window().then(({ map }) => {
      expect(map.pm.getGeomanLayers()[0].pm.layerDragEnabled()).to.equal(true);
      expect(map.pm.getGeomanLayers()[1].pm.layerDragEnabled()).to.equal(true);
    });
  });

  it('re-applies rotate mode onAdd for first layer', (done) => {
    cy.toolbarButton('rotate').click();

    cy.window().then(({ map, L }) => {
      const jsonString =
        '{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[-0.155182,51.515687],[-0.155182,51.521028],[-0.124283,51.521028],[-0.124283,51.510345],[-0.155182,51.515687]]]}}';
      const poly = JSON.parse(jsonString);
      L.geoJSON(poly).addTo(map);
    });

    cy.window().then(({ map }) => {
      setTimeout(() => {
        expect(map.pm.getGeomanLayers()[0].pm.rotateEnabled()).to.equal(true);
        done();
      }, 100);
    });
  });

  it('re-applies edit mode onAdd for first layer', (done) => {
    cy.toolbarButton('edit').click();

    cy.window().then(({ map, L }) => {
      const jsonString =
        '{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[-0.155182,51.515687],[-0.155182,51.521028],[-0.124283,51.521028],[-0.124283,51.510345],[-0.155182,51.515687]]]}}';
      const poly = JSON.parse(jsonString);
      L.geoJSON(poly).addTo(map);
    });

    cy.window().then(({ map }) => {
      setTimeout(() => {
        expect(map.pm.getGeomanLayers()[0].pm.enabled()).to.equal(true);
        done();
      }, 100);
    });
  });

  it('re-applies move mode onAdd for first layer', (done) => {
    cy.toolbarButton('drag').click();

    cy.window().then(({ map, L }) => {
      const jsonString =
        '{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[-0.155182,51.515687],[-0.155182,51.521028],[-0.124283,51.521028],[-0.124283,51.510345],[-0.155182,51.515687]]]}}';
      const poly = JSON.parse(jsonString);
      L.geoJSON(poly).addTo(map);
    });

    cy.window().then(({ map }) => {
      setTimeout(() => {
        expect(map.pm.getGeomanLayers()[0].pm.layerDragEnabled()).to.equal(
          true
        );
        done();
      }, 100);
    });
  });

  it('re-applies removal mode onAdd for first layer', (done) => {
    cy.toolbarButton('delete').click();

    cy.window().then(({ map, L }) => {
      const jsonString =
        '{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[-0.155182,51.515687],[-0.155182,51.521028],[-0.124283,51.521028],[-0.124283,51.510345],[-0.155182,51.515687]]]}}';
      const poly = JSON.parse(jsonString);
      L.geoJSON(poly).addTo(map);
    });

    cy.window().then(({ map }) => {
      setTimeout(() => {
        const layer = map.pm.getGeomanLayers()[0];
        expect(layer.listens('click', map.pm.removeLayer, map.pm)).to.equal(
          true
        );
        done();
      }, 100);
    });
  });
});
