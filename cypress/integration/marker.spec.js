describe('Draw Marker', () => {
    const mapSelector = '#map';

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

    it.only('works with marker cluster', () => {
        cy.window().then(({ map, L }) => {
            // Create cluster group to cluster markers
            const markerCluster = L.markerClusterGroup([]);

            // map.pm.disableGlobalEditMode();

            const marker1 = L.marker([0, 1]);
            markerCluster.addLayer(marker1);
            markerCluster.addLayer(L.marker([0, 1]));
            markerCluster.addLayer(L.marker([0, 1]));

            // // Also add a marker outside of the cluster
            markerCluster.addLayer(L.marker([1, 1]));
            // // Add cluster of markers to map
            markerCluster.addTo(map);

            // console.log(markerCluster);

            const bounds = markerCluster.getBounds();
            map.fitBounds(bounds);

            // markerCluster.removeLayer(marker1);

            // marker1.on('click', () => {
            //     markerCluster.removeLayer(marker1);
            // });

            // map.on('pm:remove', ({ layer }) => {
            //     // markerCluster.refreshClusters();
            // });

            // map.on('pm:create', ({ layer }) => {
            //     layer.remove();
            //     markerCluster.addLayer(layer);
            // });

            // map.pm.toggleGlobalEditMode({
            //     draggable: false,
            // });
        });

        // cy.toolbarButton('edit')
        //     .click()
        //     .parent('a')
        //     .should('have.class', 'active');

        // cy.hasVertexMarkers(5);
    });
});
