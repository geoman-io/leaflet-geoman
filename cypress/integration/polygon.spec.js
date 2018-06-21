describe('Draw & Edit Poly', () => {
    const mapSelector = '#map';

    it('draws and edits a polygon', () => {
        cy.window().then(({ map }) => {
            cy.hasLayers(map, 1);
        });

        // activate line drawing
        cy.toolbarButton('polygon')
            .click()
            .parent('a')
            .should('have.class', 'active');

        // draw a line
        cy.get(mapSelector)
            .click(90, 250)
            .click(100, 50)
            .click(150, 50)
            .click(150, 150)
            .click(200, 150)
            .click(90, 250);

        // button should be disabled after successful draw
        cy.toolbarButton('polygon')
            .parent('a')
            .should('have.not.class', 'active');

        cy.window().then(({ map }) => {
            cy.hasLayers(map, 3);
        });

        // enable global edit mode
        cy.toolbarButton('edit').click();

        cy.hasVertexMarkers(5);
        cy.hasMiddleMarkers(5);

        // press a middle marker
        cy.get('.marker-icon-middle')
            .first()
            .click();

        // now there should be one more vertex
        cy.hasVertexMarkers(6);
        cy.hasMiddleMarkers(6);

        // let's remove one vertex and check it
        cy.get('.marker-icon:not(.marker-icon-middle)')
            .last()
            .trigger('contextmenu');

        cy.hasVertexMarkers(5);
        cy.hasMiddleMarkers(5);

        // remove all markers
        cy.get('.marker-icon:not(.marker-icon-middle)').each(($el, index) => {
            if (index === 4) {
                // the last marker should be removed automatically, so it shouldn't exist
                cy.wrap($el).should('not.exist');
            } else {
                // remove markers
                cy.wrap($el).trigger('contextmenu');
            }
        });

        cy.hasVertexMarkers(0);
        cy.hasMiddleMarkers(0);

        cy.toolbarButton('edit')
            .click()
            .parent('a')
            .should('have.not.class', 'active');
    });
});
