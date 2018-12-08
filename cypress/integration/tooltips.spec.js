describe('Shows Tooltips', () => {
    // map and leaflet object

    const mapSelector = '#map';

    it('Has Polygon Tooltips', () => {
        cy.get('.leaflet-tooltip-bottom').should('not.exist');

        // activate polygon drawing
        cy.toolbarButton('polygon').click();

        cy.get('.leaflet-tooltip-bottom').should('exist');

        cy.get('.leaflet-tooltip-bottom').then((el) => {
            expect(el).to.have.text('Click to Place First Vertex');
        });

        // draw a polygon
        cy.get(mapSelector)
            .click(290, 250)
            .click(300, 50)
            .click(350, 50)
            .click(350, 150)
            .click(400, 150);

        cy.get('.leaflet-tooltip-bottom').then((el) => {
            expect(el).to.have.text('Click First Marker to Finish');
        });

        cy.get(mapSelector).click(290, 250);

        cy.get('.leaflet-tooltip-bottom').should('not.exist');
    });
});
