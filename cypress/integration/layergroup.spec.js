describe('Edit LayerGroup', () => {
    const mapSelector = '#map';

    it('correctly enables geojson featureCollection', () => {
        cy.drawShape('FeatureCollectionWithCircles');

        cy.toolbarButton('edit').click();
        cy.hasVertexMarkers(21);
    });
});
