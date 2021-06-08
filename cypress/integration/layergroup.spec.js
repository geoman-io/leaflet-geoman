describe('Edit LayerGroup', () => {
  const mapSelector = '#map';

  it('correctly enables geojson featureCollection', () => {
    cy.drawShape('FeatureCollectionWithCircles');

    cy.toolbarButton('edit').click();
    cy.hasVertexMarkers(21);
    cy.toolbarButton('edit').click();
    cy.hasVertexMarkers(0);
  });

  it('respects pmIgnore', () => {
    cy.drawShape('LineString', true);

    cy.toolbarButton('edit').click();
    cy.hasVertexMarkers(0);
  });

  it('enables all layers of layerGroup', () => {
    cy.drawShape('FeatureCollectionWithCircles');

    cy.get('@featurecol').then((feature) => {
      feature.pm.enable();
    });

    cy.hasVertexMarkers(21);

    cy.get('@featurecol').then((feature) => {
      feature.pm.disable();
    });
    cy.hasVertexMarkers(0);

    cy.get('@featurecol').then((feature) => {
      feature.pm.toggleEdit();
    });
    cy.hasVertexMarkers(21);

    cy.get('@featurecol').then((feature) => {
      feature.pm.toggleEdit();
    });
    cy.hasVertexMarkers(0);
  });

  it('supports clearLayers', () => {
    cy.window().then(({ L, map }) => {
      const featureGroup = new L.FeatureGroup();
      featureGroup.addTo(map);
      featureGroup.addLayer(new L.Marker([19.04469, 72.9258]));
      map.fitBounds(featureGroup.getBounds());
      featureGroup.clearLayers();

      expect(featureGroup.pm._layers).to.have.lengthOf(0);
    });
  });

  it('adds the created layers to a layergroup', () => {
    let fg;
    let fg2;

    // Add layer to group
    cy.window().then(({ L, map }) => {
      fg = L.featureGroup().addTo(map);
      fg2 = L.featureGroup().addTo(map);

      map.pm.setGlobalOptions({ layerGroup: fg });

      cy.toolbarButton('rectangle')
        .click()
        .closest('.button-container')
        .should('have.class', 'active');

      cy.get(mapSelector).click(200, 200).click(400, 350);

      cy.hasLayers(5);
    });

    // check if layer is on group and will be removed from map, when group is removed
    cy.window().then(({ map }) => {
      fg.removeFrom(map);
      cy.hasLayers(3);

      const count = fg.getLayers().length;
      expect(count).to.equal(1);
    });
    // delete layer from group and map
    cy.window().then(({ map }) => {
      fg.addTo(map);

      cy.toolbarButton('delete').click();

      cy.get(mapSelector).click(280, 280);
    });
    cy.window().then(() => {
      const count = fg.getLayers().length;
      expect(count).to.equal(0);
    });

    // add layer and then change group
    cy.window().then(() => {
      cy.toolbarButton('rectangle').click();

      cy.get(mapSelector).click(200, 200).click(400, 350);
    });
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({ layerGroup: fg2 });
      cy.hasLayers(5);

      cy.toolbarButton('circle').click();
      cy.get(mapSelector).click(200, 200).click(250, 250);
    });
    // delete layer from another (first) group
    cy.window().then(() => {
      cy.toolbarButton('delete').click();

      cy.get(mapSelector).click(280, 280);
    });
    cy.window().then(() => {
      const count = fg.getLayers().length;
      expect(count).to.equal(1);
      const count2 = fg2.getLayers().length;
      expect(count2).to.equal(1);
      cy.hasLayers(5);
    });
    // delete circle from second group
    cy.window().then(() => {
      cy.get(mapSelector).click(180, 180);
      cy.toolbarButton('delete').click();
    });
    cy.window().then(() => {
      const count2 = fg2.getLayers().length;
      expect(count2).to.equal(0);
      cy.hasLayers(4);
    });
  });

  it('pass the fired event of the layer to group', () => {
    let fg;
    let firedEvent = '';

    cy.window().then(({ map, L }) => {
      fg = L.featureGroup();
      fg.on('pm:cut', (e) => {
        firedEvent = e.type;
      });

      map.on('pm:create', (e) => {
        e.layer.addTo(fg);
      });
    });
    // activate polygon drawing
    cy.toolbarButton('polygon')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    // draw a polygon
    cy.get(mapSelector)
      .click(90, 250)
      .click(150, 50)
      .click(500, 50)
      .click(500, 300)
      .click(300, 350)
      .click(90, 250);

    // activate cutting drawing
    cy.toolbarButton('cut')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    // draw a polygon to cut
    cy.get(mapSelector)
      .click(450, 100)
      .click(450, 150)
      .click(400, 150)
      .click(390, 140)
      .click(390, 100)
      .click(450, 100);

    cy.window().then(() => {
      expect(firedEvent).to.equal('pm:cut');
    });
  });

  it('event is fired only once if group has multiple sub-groups with the same layer', () => {
    let firedEventCount = 0;
    cy.window().then(({ map, L }) => {
      const group = L.featureGroup().addTo(map);
      const layers = L.featureGroup().addTo(group);
      const markers = L.featureGroup().addTo(group);
      const markersChild = L.featureGroup().addTo(markers);
      L.marker(map.getCenter())
        .addTo(layers)
        .addTo(markers)
        .addTo(markersChild);

      group.on('pm:enable', () => {
        firedEventCount += 1;
      });
    });

    cy.wait(100);

    cy.toolbarButton('edit').click();

    cy.window().then(() => {
      expect(firedEventCount).to.equal(1);
    });
  });

  it('event is fired on every parent group of a layer (once)', () => {
    let firedEventCount = 0;
    cy.window().then(({ map, L }) => {
      const group = L.featureGroup().addTo(map);
      const layers = L.featureGroup().addTo(group);
      const markers = L.featureGroup().addTo(group);
      const markersChild = L.featureGroup().addTo(markers);
      L.marker(map.getCenter())
        .addTo(layers)
        .addTo(markers)
        .addTo(markersChild);

      group.on('pm:enable', () => {
        firedEventCount += 1;
      });
      layers.on('pm:enable', () => {
        firedEventCount += 1;
      });
      markers.on('pm:enable', () => {
        firedEventCount += 1;
      });
      markersChild.on('pm:enable', () => {
        firedEventCount += 1;
      });
    });

    cy.wait(100);

    cy.toolbarButton('edit').click();

    cy.window().then(() => {
      expect(firedEventCount).to.equal(4);
    });
  });

  it('event is fired on L.geoJson when it has FeatureCollections', () => {
    cy.drawShape('FeatureCollectionEventFire');

    let firedEventCount = 0;
    cy.get('@feature').then((feature) => {
      feature.on('pm:enable', () => {
        firedEventCount += 1;
      });
    });

    cy.wait(100);

    cy.toolbarButton('edit').click();

    cy.window().then(() => {
      expect(firedEventCount).to.equal(2);
    });
  });

  it('new added layers will be changed to edit mode if editmode is enabled', () => {
    cy.window().then(({ map, L }) => {
      map.setView([4.009783550466563, 104.00000000000006], 8);
      const fg = L.featureGroup().addTo(map);

      map.on('pm:create layeradd', (e) => {
        e.layer.addTo(fg);
      });
    });

    cy.toolbarButton('rectangle').click();

    cy.get(mapSelector).click(200, 200).click(400, 350);

    cy.toolbarButton('edit').click();

    cy.drawShape('MultiPolygon');

    cy.hasVertexMarkers(12);
  });

  it('new drawn markers not enable other layers in the same layergroup', () => {
    cy.window().then(({ map, L }) => {
      map.setView([4.009783550466563, 104.00000000000006], 8);
      const fg = L.featureGroup().addTo(map);

      map.on('pm:create layeradd', (e) => {
        e.layer.addTo(fg);
      });
    });

    cy.toolbarButton('rectangle').click();

    cy.get(mapSelector).click(200, 200).click(400, 350);

    cy.toolbarButton('marker').click();

    cy.get(mapSelector).click(450, 350);

    cy.hasVertexMarkers(0);
  });

  it('re-init GeoJSON OptIn', () => {
    let layerGroup;
    cy.window().then(({ map, L }) => {
      cy.fixture('LineString')
        .as('poly')
        .then((json) => {
          layerGroup = L.geoJson(json, { pmIgnore: true }).addTo(map);
          const bounds = layerGroup.getBounds();
          map.fitBounds(bounds);
        });
    });

    cy.window().then(({ map, L }) => {
      expect(map.pm.getGeomanLayers().length).to.eq(0);

      // enable all child layers of the group
      layerGroup.setStyle({ pmIgnore: false });
      // enable the group self
      layerGroup.options.pmIgnore = false;
      L.PM.reInitLayer(layerGroup);

      expect(layerGroup.pm).to.not.eq(undefined);
      expect(map.pm.getGeomanLayers().length).to.eq(6);
    });
  });

  it('adds options to layers before throlle is fired', () => {
    cy.toolbarButton('rectangle').click();
    cy.get(mapSelector).click(200, 200).click(400, 350);

    cy.toolbarButton('rectangle').click();
    cy.get(mapSelector).click(350, 200).click(400, 400);

    cy.window().then(({ map, L }) => {
      const fg = L.featureGroup().addTo(map);
      const layers = map.pm.getGeomanDrawLayers();
      layers.forEach((layer) => {
        fg.addLayer(layer);
      });
      fg.pm.setOptions({ syncLayersOnDrag: true });

      expect(layers[1].pm.options.syncLayersOnDrag).to.eq(true);
    });
  });
});
