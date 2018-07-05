describe('Draw Circle', () => {
    const mapSelector = '#map';

    it('draws a circle', () => {
        cy.toolbarButton('circle')
            .click()
            .parent('a')
            .should('have.class', 'active');

        cy.get(mapSelector)
            .click(200, 200)
            .click(250, 250);

        cy.toolbarButton('edit')
            .click()
            .parent('a')
            .should('have.class', 'active');

        cy.hasVertexMarkers(2);
        cy.hasMiddleMarkers(0);
    });

    it('uses correct options', () => {
        cy.window().then(({ map, L }) => {
            const options = {
                pathOptions: {
                    color: 'red',
                    fillColor: 'orange',
                    fillOpacity: 0.7,
                },
            };
            map.pm.enableDraw('Circle', options);

            map.pm.disableDraw('Circle', options);

            const circle = L.circle([10, 10], { radius: 20 }).addTo(map);
            map.fitBounds(circle.getBounds());
            console.log(circle.options);

            expect(circle.options.color).to.equal('red');
        });
    });
});
