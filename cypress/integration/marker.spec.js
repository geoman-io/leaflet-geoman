describe('Draw Marker', () => {
    const mapSelector = '#map';

    it('places markers', () => {
        cy.toolbarButton('marker').click();

        cy.get(mapSelector)
            .click(90, 250)
            .click(150, 50)
            .click(500, 50)
            .click(500, 300);

        cy.get('.leaflet-marker-icon').should(($p) => {
            expect($p).to.have.length(5);
        });

        cy.toolbarButton('marker').click();

        cy.get('.leaflet-marker-icon').should(($p) => {
            expect($p).to.have.length(4);
        });
    });
});
