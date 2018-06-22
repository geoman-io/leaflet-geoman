describe('Draw & Edit Poly', () => {
    const mapSelector = '#map';

    it('draws and edits a polygon', () => {
        cy.window().then(({ map }) => {
            cy.hasLayers(map, 1);
        });

        // activate polygon drawing
        cy.toolbarButton('polygon')
            .click()
            .parent('a')
            .should('have.class', 'active');

        // draw a polygon
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

    it('draws a polygon with a hole', () => {
        // activate polygon drawing
        cy.toolbarButton('polygon')
            .click()
            .parent('a')
            .should('have.class', 'active');

        // draw a polygon
        cy.get(mapSelector)
            .click(90, 250)
            .click(150, 50)
            .click(500, 50)
            .click(500, 300)
            .click(300, 350)
            .click(90, 250);

        // activate cutting drawing
        cy.toolbarButton('cut')
            .click()
            .parent('a')
            .should('have.class', 'active');

        // draw a polygon
        cy.get(mapSelector)
            .click(150, 250)
            .click(170, 80)
            .click(300, 80)
            .click(280, 280)
            .click(200, 285)
            .click(150, 250);

        // enable global edit mode
        cy.toolbarButton('edit')
            .click()
            .parent('a')
            .should('have.class', 'active');

        cy.hasVertexMarkers(10);
        cy.hasMiddleMarkers(10);

        cy.toolbarButton('edit')
            .click()
            .parent('a')
            .should('have.not.class', 'active');
    });

    it('should handle MultiPolygons', () => {
        cy.drawShape('MultiPolygon');

        // enable global edit mode
        cy.toolbarButton('edit')
            .click()
            .parent('a')
            .should('have.class', 'active');

        cy.hasVertexMarkers(8);
        cy.hasMiddleMarkers(8);

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
            .click(200, 150)
            .click(200, 150);

        cy.toolbarButton('edit')
            .click()
            .parent('a')
            .should('have.class', 'active');

        cy.hasVertexMarkers(13);
        cy.hasMiddleMarkers(12);

        cy.toolbarButton('delete')
            .click()
            .parent('a')
            .should('have.class', 'active');

        cy.get(mapSelector).click(650, 100);

        cy.toolbarButton('edit')
            .click()
            .parent('a')
            .should('have.class', 'active');

        cy.hasVertexMarkers(5);
        cy.hasMiddleMarkers(4);
    });
});
