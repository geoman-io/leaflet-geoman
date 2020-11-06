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

    cy.get('@featurecol').then(feature => {
      feature.pm.enable();
    });

    cy.hasVertexMarkers(21);

    cy.get('@featurecol').then(feature => {
      feature.pm.disable();
    });
    cy.hasVertexMarkers(0);

    cy.get('@featurecol').then(feature => {
      feature.pm.toggleEdit();
    });
    cy.hasVertexMarkers(21);

    cy.get('@featurecol').then(feature => {
      feature.pm.toggleEdit();
    });
    cy.hasVertexMarkers(0);
  });

  it('supports clearLayers', () => {

    cy.window().then(({ L, map }) => {
      const featureGroup = new L.FeatureGroup();
      featureGroup.addTo(map)
      featureGroup.addLayer(new L.Marker([19.04469, 72.9258]));
      map.fitBounds(featureGroup.getBounds())
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
      map.on('click',(e)=>console.log(map.latLngToContainerPoint(e.latlng)));

      map.pm.setGlobalOptions({layerGroup: fg});

      cy.toolbarButton('rectangle')
        .click()
        .closest('.button-container')
        .should('have.class', 'active');

      cy.get(mapSelector)
        .click(200, 200)
        .click(400, 350);

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

      cy.toolbarButton('delete')
        .click();

      cy.get(mapSelector)
        .click(280, 280);
    });
    cy.window().then(() => {
      const count = fg.getLayers().length;
      expect(count).to.equal(0);
    });

    // add layer and then change group
    cy.window().then(() => {
      cy.toolbarButton('rectangle')
        .click();

      cy.get(mapSelector)
        .click(200, 200)
        .click(400, 350);
    });
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({layerGroup: fg2});
      cy.hasLayers(5);

      cy.toolbarButton('circle')
        .click();
      cy.get(mapSelector)
        .click(200, 200)
        .click(250, 250);
    });
    // delete layer from another (first) group
    cy.window().then(() => {
      cy.toolbarButton('delete')
        .click();

      cy.get(mapSelector)
        .click(280, 280);
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
      cy.get(mapSelector)
        .click(180, 180);
      cy.toolbarButton('delete')
        .click();
    });
    cy.window().then(() => {
      const count2 = fg2.getLayers().length;
      expect(count2).to.equal(0);
      cy.hasLayers(4);
    });
  })
});
