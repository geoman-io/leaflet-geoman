describe('Draw Rectangle', () => {
    const mapSelector = '#map';

    it('draws a rectangle', () => {
        cy.toolbarButton('rectangle')
            .click()
            .parent('a')
            .should('have.class', 'active');

        cy.get(mapSelector)
            .click(200, 200)
            .click(400, 350);

        cy.toolbarButton('edit')
            .click()
            .parent('a')
            .should('have.class', 'active');

        cy.hasVertexMarkers(4);
        cy.hasMiddleMarkers(0);
    });
});
