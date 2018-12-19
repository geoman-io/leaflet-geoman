describe('Shows Tooltips', () => {
    // map and leaflet object

    const mapSelector = '#map';

    it('Has Marker Tooltips', () => {
        cy.get('.leaflet-tooltip-bottom').should('not.exist');
        cy.toolbarButton('marker').click();

        cy.get('.leaflet-tooltip-bottom').should('exist');

        cy.get('.leaflet-tooltip-bottom').then((el) => {
            expect(el).to.have.text('Click to place marker');
        });

        cy.get(mapSelector).click(290, 250);

        cy.get('.leaflet-tooltip-bottom').then((el) => {
            expect(el).to.have.text('Click to place marker');
        });

        cy.toolbarButton('marker').click();

        cy.get('.leaflet-tooltip-bottom').should('not.exist');
    });

    it('Has Rectangle Tooltips', () => {
        cy.get('.leaflet-tooltip-bottom').should('not.exist');
        cy.toolbarButton('rectangle').click();

        cy.get('.leaflet-tooltip-bottom').should('exist');

        cy.get('.leaflet-tooltip-bottom').then((el) => {
            expect(el).to.have.text('Click to place first vertex');
        });

        cy.get(mapSelector).click(290, 250);

        cy.get('.leaflet-tooltip-bottom').then((el) => {
            expect(el).to.have.text('Click to finish');
        });

        cy.get(mapSelector).click(390, 350);

        cy.get('.leaflet-tooltip-bottom').should('not.exist');
    });

    it('Has Circle Tooltips', () => {
        cy.get('.leaflet-tooltip-bottom').should('not.exist');
        cy.toolbarButton('circle').click();

        cy.get('.leaflet-tooltip-bottom').should('exist');

        cy.get('.leaflet-tooltip-bottom').then((el) => {
            expect(el).to.have.text('Click to place circle center');
        });

        cy.get(mapSelector).click(290, 250);

        cy.get('.leaflet-tooltip-bottom').then((el) => {
            expect(el).to.have.text('Click to finish circle');
        });

        cy.get(mapSelector).click(290, 350);

        cy.get('.leaflet-tooltip-bottom').should('not.exist');
    });

    it('Has Line Tooltips', () => {
        cy.get('.leaflet-tooltip-bottom').should('not.exist');

        // activate polygon drawing
        cy.toolbarButton('polyline').click();

        cy.get('.leaflet-tooltip-bottom').should('exist');

        cy.get('.leaflet-tooltip-bottom').then((el) => {
            expect(el).to.have.text('Click to place first vertex');
        });

        // draw a polygon
        cy.get(mapSelector).click(290, 250);

        cy.get('.leaflet-tooltip-bottom').then((el) => {
            expect(el).to.have.text('Click to continue drawing');
        });

        cy.get(mapSelector).click(300, 50);

        cy.get('.leaflet-tooltip-bottom').then((el) => {
            expect(el).to.have.text('Click any existing marker to finish');
        });

        cy.get(mapSelector).click(290, 250);

        cy.get('.leaflet-tooltip-bottom').should('not.exist');
    });

    it('Has Polygon Tooltips', () => {
        cy.get('.leaflet-tooltip-bottom').should('not.exist');

        // activate polygon drawing
        cy.toolbarButton('polygon').click();

        cy.get('.leaflet-tooltip-bottom').should('exist');

        cy.get('.leaflet-tooltip-bottom').then((el) => {
            expect(el).to.have.text('Click to place first vertex');
        });

        // draw a polygon
        cy.get(mapSelector)
            .click(290, 250)
            .click(300, 50)
            .click(350, 50)
            .click(350, 150)
            .click(400, 150);

        cy.get('.leaflet-tooltip-bottom').then((el) => {
            expect(el).to.have.text('Click first marker to finish');
        });

        cy.get(mapSelector).click(290, 250);

        cy.get('.leaflet-tooltip-bottom').should('not.exist');
    });

    it('Properly disables tooltips', () => {
        cy.window().then(({ map }) => {
            map.pm.enableDraw('Poly', {
                tooltips: false,
            });
        });
        cy.get('.leaflet-tooltip-bottom').should('not.exist');

        cy.toolbarButton('polygon').click();
        cy.get('.leaflet-tooltip-bottom').should('not.exist');

        cy.toolbarButton('polygon').click();
        cy.get('.leaflet-tooltip-bottom').should('not.exist');

        cy.get('.active .action-cancel').click();

        cy.window().then(({ map }) => {
            map.pm.enableDraw('Poly');
        });
        cy.get('.leaflet-tooltip-bottom').should('not.exist');
        cy.get('.active .action-cancel').click();

        cy.window().then(({ map }) => {
            map.pm.enableDraw('Poly', {
                tooltips: true,
            });
        });
        cy.get('.leaflet-tooltip-bottom').should('exist');

        cy.toolbarButton('polygon').click();
        cy.get('.leaflet-tooltip-bottom').should('not.exist');

        cy.toolbarButton('polygon').click();
        cy.get('.leaflet-tooltip-bottom').should('exist');
    });
});
