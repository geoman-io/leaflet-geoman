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
                    radius: 20,
                },
            };
            map.pm.enableDraw('Circle', options);

            cy.get(mapSelector)
                .click(200, 200)
                .click(250, 250)
                .then(() => {
                    map.eachLayer((layer) => {
                        if (layer instanceof L.Circle) {
                            expect(layer.options.color).to.equal('red');
                            expect(layer.options.fillColor).to.equal('orange');
                        }
                    });
                });
        });
    });
});
