describe('Draw & Edit Line', () => {
    // map and leaflet object

    const mapSelector = '#map';

    it('removes single point lines', () => {
        cy.toolbarButton('polyline').click();

        cy.get(mapSelector)
            .click(90, 250)
            .click(90, 250);

        cy.toolbarButton('edit').click();

        cy.hasVertexMarkers(0);
    });

    it('draws and edits a line', () => {
        cy.window().then(({ map }) => {
            cy.hasLayers(map, 1);
        });

        // activate line drawing
        cy.toolbarButton('polyline')
            .click()
            .parent('a')
            .should('have.class', 'active');

        // draw a line
        cy.get(mapSelector)
            .click(90, 250)
            .click(100, 50)
            .click(150, 50)
            .click(150, 150)
            .click(150, 150);

        // button should be disabled after successful draw
        cy.toolbarButton('polyline')
            .parent('a')
            .should('have.not.class', 'active');

        cy.window().then(({ map }) => {
            cy.hasLayers(map, 3);
        });

        // enable global edit mode
        cy.toolbarButton('edit').click();

        cy.hasVertexMarkers(4);
        cy.hasMiddleMarkers(3);

        // press a middle marker
        cy.get('.marker-icon-middle')
            .first()
            .click();

        // now there should be one more vertex
        cy.hasVertexMarkers(5);

        // and one more middlemarker
        cy.hasMiddleMarkers(4);

        // rightclick on a vertex-marker to delete it
        cy.get('.marker-icon:not(.marker-icon-middle)')
            .first()
            .trigger('contextmenu');

        cy.hasVertexMarkers(4);
        cy.hasMiddleMarkers(3);

        // disable global edit mode
        cy.toolbarButton('edit').click();

        // there should be no markers anymore
        cy.hasVertexMarkers(0);
        cy.hasMiddleMarkers(0);
    });
});
