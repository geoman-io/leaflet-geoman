describe('Draw Circle', () => {
    const mapSelector = '#map';

    it('draws a circle', () => {
        cy.toolbarButton('circle')
            .click()
            .parent('a')
            .should('have.class', 'active');

        cy.get(mapSelector)
            .click(200, 200)
            .click(250, 250);

        cy.toolbarButton('edit')
            .click()
            .parent('a')
            .should('have.class', 'active');

        cy.hasVertexMarkers(2);
        cy.hasMiddleMarkers(0);
    });
});
