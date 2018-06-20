describe('Draw Line', () => {
    const buttonSelector = '.leaflet-pm-icon-polyline';
    const mapSelector = '#map';

    it('draws a line', () => {
        cy.visit('https://leafletpm.now.sh');

        cy.contains('Leaflet.PM');
        cy.contains('Raum.sh');

        cy.get(buttonSelector).click();

        cy.get(buttonSelector)
            .parent('a')
            .should('have.class', 'active');

        cy.get(mapSelector)
            .click(90, 250)
            .click(100, 50)
            .click(150, 50)
            .click(150, 150)
            .click(150, 150);

        cy.get(buttonSelector)
            .parent('a')
            .should('have.not.class', 'active');

        // cy.get('.leaflet-marker-icon').should(($p) => {
        //     expect($p).to.have.length(1);
        // });
    });
});
