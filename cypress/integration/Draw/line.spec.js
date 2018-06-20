describe('Draw Line', () => {
    const accessToken = 'pk.eyJ1IjoibWFwc29mc3VtaXQiLCJhIjoiY2l1ZDF3dHE5MDAxZDMwbjA0cTR3dG50eSJ9.63Xci-GKFikhAobboF0DVQ';
    // set mapbox tile layer

    let L;
    let map;

    beforeEach(() => {
        cy.visit('/index.html', {
            onLoad: (contentWindow) => {
                // contentWindow is the remote page's window object
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

    it('draws a line', () => {
        let before;
        let after;

        cy.get('#map').then(() => {
            before = Object.keys(map._layers).length;
        });

        cy.get(lineButtonSelector).click();
        cy.get(lineButtonSelector)
            .parent('a')
            .should('have.class', 'active');
        cy.get(mapSelector)
            .click(90, 250)
            .click(100, 50)
            .click(150, 50)
            .click(150, 150)
            .click(150, 150);
        cy.get(lineButtonSelector)
            .parent('a')
            .should('have.not.class', 'active')
            .then(() => {
                after = Object.keys(map._layers).length;
                cy.wrap(before).should('not.equal', after);
            });

        cy.get(editButtonSelector).click();

        cy.get('.marker-icon:not(.marker-icon-middle)').should(($p) => {
            expect($p).to.have.length(4);
        });
        cy.get('.marker-icon-middle').should(($p) => {
            expect($p).to.have.length(3);
        });

        cy.get('.marker-icon-middle')
            .first()
            .click();

        cy.get('.marker-icon:not(.marker-icon-middle)').should(($p) => {
            expect($p).to.have.length(5);
        });
        cy.get('.marker-icon-middle').should(($p) => {
            expect($p).to.have.length(4);
        });
    });
});
