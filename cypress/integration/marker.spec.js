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
            console.log(markerCluster.options);

            markerCluster.addLayer(L.marker([0, 1]));
            markerCluster.addLayer(L.marker([0, 1]));
            markerCluster.addLayer(L.marker([0, 1]));

            // // Also add a marker outside of the cluster
            markerCluster.addLayer(L.marker([1, 1]));
            // // Add cluster of markers to map
            map.addLayer(markerCluster);

            // console.log(markerCluster);

            const bounds = markerCluster.getBounds();
            map.fitBounds(bounds);

            map.eachLayer((layer) => {
                if (layer.pm) {
                    // console.log(layer);
                }
            });

            map.on('pm:remove', () => {
                console.log('layer removed');
                markerCluster.refreshClusters();
            });
        });

        // cy.toolbarButton('edit')
        //     .click()
        //     .parent('a')
        //     .should('have.class', 'active');

        // cy.hasVertexMarkers(5);
    });
});
