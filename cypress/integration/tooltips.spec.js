describe('Shows Tooltips', () => {
    // map and leaflet object

    const mapSelector = '#map';

    it('has tooltips', () => {
        cy.window().then(({ map, L }) => {
            // test pm:create event
            Cypress.$(map).on('pm:create', ({ originalEvent: event }) => {
                const poly = event.layer;
            });
        });

        // activate polygon drawing
        cy.toolbarButton('polygon').click();

        // // draw a polygon
        // cy.get(mapSelector)
        //     .click(290, 250)
        //     .click(300, 50)
        //     .click(350, 50)
        //     .click(350, 150)
        //     .click(400, 150)
        //     .click(290, 250);
    });
});
