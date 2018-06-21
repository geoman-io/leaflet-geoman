describe('Draw & Edit Line', () => {
    const accessToken = 'pk.eyJ1IjoibWFwc29mc3VtaXQiLCJhIjoiY2l1ZDF3dHE5MDAxZDMwbjA0cTR3dG50eSJ9.63Xci-GKFikhAobboF0DVQ';

    // map and leaflet object
    let map;

    beforeEach(() => {
        // create the map
        cy.visit('/index.html', {
            onLoad: (contentWindow) => {
                // the leaflet object
                L = contentWindow.L;

                // mapbox tiles
                const mapboxTiles = L.tileLayer(
                    `https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/{z}/{x}/{y}?access_token=${accessToken}`,
                    {
                        attribution:
                            '&copy; <a href="https://www.mapbox.com/feedback/">Mapbox</a> &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                    },
                );

                // create the map
                map = L.map('map')
                    .setView([51.505, -0.09], 13)
                    .addLayer(mapboxTiles);

                // add leaflet.pm toolbar
                map.pm.addControls();
            },
        });

        // I was not able to make this work using Aliases
        // cy.wrap(L).as('L');
        // cy.wrap(map).as('map');
    });

    const lineButtonSelector = '.leaflet-pm-icon-polyline';
    const editButtonSelector = '.leaflet-pm-icon-edit';
    const mapSelector = '#map';

    it('draws and edits a line', () => {
        let before;
        let after;

        // count current layers on map
        cy.get('#map').then(() => {
            before = Object.keys(map._layers).length;
        });

        // activate line drawing
        cy.get(lineButtonSelector).click();

        // button should be active
        cy.get(lineButtonSelector)
            .parent('a')
            .should('have.class', 'active');

        // draw a line
        cy.get(mapSelector)
            .click(90, 250)
            .click(100, 50)
            .click(150, 50)
            .click(150, 150)
            .click(150, 150);

        // button should be disabled after successful draw
        cy.get(lineButtonSelector)
            .parent('a')
            .should('have.not.class', 'active')
            .then(() => {
                // there should be more layers now
                after = Object.keys(map._layers).length;
                cy.wrap(before).should('not.equal', after);
            });

        // enable global edit mode
        cy.get(editButtonSelector).click();

        // layers vertexes should have 4 markers
        cy.get('.marker-icon:not(.marker-icon-middle)').should(($p) => {
            expect($p).to.have.length(4);
        });

        // there should be three middlemarkers between vertexes
        cy.get('.marker-icon-middle').should(($p) => {
            expect($p).to.have.length(3);
        });

        // press a middle marker
        cy.get('.marker-icon-middle')
            .first()
            .click();

        // now there should be one more vertex
        cy.get('.marker-icon:not(.marker-icon-middle)').should(($p) => {
            expect($p).to.have.length(5);
        });

        // and one more middlemarker
        cy.get('.marker-icon-middle').should(($p) => {
            expect($p).to.have.length(4);
        });

        // rightclick on a vertex-marker to delete it
        cy.get('.marker-icon:not(.marker-icon-middle)')
            .first()
            .trigger('contextmenu');

        // vertexes (and its markers) should be back to 4
        cy.get('.marker-icon:not(.marker-icon-middle)').should(($p) => {
            expect($p).to.have.length(4);
        });
        // and middlemarkers back to 3
        cy.get('.marker-icon-middle').should(($p) => {
            expect($p).to.have.length(3);
        });

        // disable global edit mode
        cy.get(editButtonSelector).click();

        // no more markers should be on the map
        cy.get('.marker-icon').should(($p) => {
            expect($p).to.have.length(0);
        });
    });
});
