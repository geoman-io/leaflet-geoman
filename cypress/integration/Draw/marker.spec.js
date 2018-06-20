describe('Draw Marker', () => {
    it('visits leaflet.pm demo page', () => {
        // arrange setup app state
        cy.visit('https://leafletpm.now.sh');
        // act -take action
        cy.get('.leaflet-pm-icon-marker').click();

        cy.get('.leaflet-buttons-control-button').should('have.class', 'active');

        cy.get('#map').click('center');

        cy.get('.leaflet-pm-icon-marker').click();

        cy.get('.leaflet-buttons-control-button').should('have.not.class', 'active');

        cy.get('.leaflet-marker-icon').should(($p) => {
            expect($p).to.have.length(1);
        });

        cy.get('.leaflet-pm-icon-marker').click();

        cy.get('#map')
            .click(150, 150)
            .click(100, 150);

        cy.get('.leaflet-pm-icon-marker').click();

        cy.get('.leaflet-buttons-control-button').should('have.not.class', 'active');

        cy.get('.leaflet-marker-icon').should(($p) => {
            expect($p).to.have.length(3);
        });
    });
});
