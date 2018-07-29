describe('Draw Marker', () => {
    const mapSelector = '#map';

    it.only('removes markers correctly', () => {
        cy.window().then(({ map, L }) => {
            console.log(L);

            const markerLayer = L.geoJson().addTo(map);

            map.on('pm:create', ({ marker }) => {
                markerLayer.addLayer(marker);

                map.pm.disableDraw('Marker');

                markerLayer.removeLayer(marker);
                markerLayer.pm.disable();
            });

            map.pm.enableDraw('Marker', {
                snappable: false,
            });
        });
    });

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
