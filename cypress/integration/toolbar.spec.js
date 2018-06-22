describe('Testing the Toolbar', () => {
    it('Repositions The Toolbar', () => {
        cy.get('.leaflet-pm-toolbar')
            .parent('.leaflet-top.leaflet-left')
            .should('exist');

        cy.window().then(({ map }) => {
            map.pm.addControls({
                position: 'topright',
            });
        });

        cy.get('.leaflet-pm-toolbar')
            .parent('.leaflet-top.leaflet-right')
            .should('exist');

        cy.window().then(({ map }) => {
            map.pm.addControls({
                position: 'bottomright',
            });
        });

        cy.get('.leaflet-pm-toolbar')
            .parent('.leaflet-bottom.leaflet-right')
            .should('exist');

        cy.window().then(({ map }) => {
            map.pm.addControls({
                position: 'bottomleft',
            });
        });

        cy.get('.leaflet-pm-toolbar')
            .parent('.leaflet-bottom.leaflet-left')
            .should('exist');

        cy.window().then(({ map }) => {
            map.pm.addControls({
                position: 'topleft',
            });
        });
    });

    it('Handles Button States', () => {
        cy.toolbarButton('edit')
            .click()
            .parent('a')
            .should('have.class', 'active');

        cy.toolbarButton('marker')
            .click()
            .parent('a')
            .should('have.class', 'active');

        cy.toolbarButton('edit')
            .parent('a')
            .should('have.not.class', 'active');

        cy.toolbarButton('polyline').click();
        cy.toolbarButton('polygon').click();
        cy.toolbarButton('circle').click();
        cy.toolbarButton('rectangle').click();
        cy.toolbarButton('cut').click();
        cy.toolbarButton('edit').click();
        cy.toolbarButton('delete').click();
        cy.toolbarButton('circle').click();
        cy.toolbarButton('circle').click();
        cy.toolbarButton('circle')
            .click()
            .parent('a')
            .should('have.class', 'active');

        cy.toolbarButton('edit')
            .parent('a')
            .should('have.not.class', 'active');
        cy.toolbarButton('polyline')
            .parent('a')
            .should('have.not.class', 'active');
        cy.toolbarButton('delete')
            .parent('a')
            .should('have.not.class', 'active');
        cy.toolbarButton('rectangle')
            .parent('a')
            .should('have.not.class', 'active');
    });

    it('Reacts to programmatic state change', () => {
        cy.window().then(({ map }) => {
            map.pm.enableGlobalEditMode();
        });

        cy.toolbarButton('edit')
            .parent('a')
            .should('have.class', 'active');

        cy.window().then(({ map }) => {
            map.pm.toggleGlobalRemovalMode();
        });

        cy.toolbarButton('edit')
            .parent('a')
            .should('have.not.class', 'active');
        cy.toolbarButton('delete')
            .parent('a')
            .should('have.class', 'active');

        cy.window().then(({ map }) => {
            map.pm.toggleGlobalRemovalMode();
            map.pm.toggleGlobalRemovalMode();
            map.pm.toggleGlobalRemovalMode();
        });

        cy.toolbarButton('delete')
            .parent('a')
            .should('have.not.class', 'active');

        cy.window().then(({ map }) => {
            map.pm.toggleGlobalEditMode();
            map.pm.toggleGlobalRemovalMode();

            map.pm.enableDraw('Marker');
        });

        cy.toolbarButton('delete')
            .parent('a')
            .should('have.not.class', 'active');

        cy.toolbarButton('edit')
            .parent('a')
            .should('have.not.class', 'active');

        cy.toolbarButton('marker')
            .parent('a')
            .should('have.class', 'active');
    });
});
