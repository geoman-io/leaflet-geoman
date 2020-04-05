describe('Edit LayerGroup', () => {
  // const mapSelector = '#map';

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
  })
});
