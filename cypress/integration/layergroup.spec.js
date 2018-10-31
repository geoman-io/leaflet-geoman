describe('Edit LayerGroup', () => {
    // const mapSelector = '#map';

    it('correctly enables geojson featureCollection', () => {
        cy.drawShape('FeatureCollectionWithCircles');

        cy.toolbarButton('edit').click();
        cy.hasVertexMarkers(21);
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
});
