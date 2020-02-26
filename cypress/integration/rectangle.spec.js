describe('Draw Rectangle', () => {
  const mapSelector = '#map';

  it('draws a rectangle', () => {
    cy.toolbarButton('rectangle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector)
      .click(200, 200)
      .click(400, 350);

    cy.toolbarButton('edit')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.hasVertexMarkers(4);
    cy.hasMiddleMarkers(0);
  });

  it('properly snaps rectangle edge', () => {
    cy.toolbarButton('rectangle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector)
      .click(200, 200)
      .click(400, 350);

    cy.toolbarButton('rectangle').click();

    cy.get(mapSelector)
      .click(600, 250)

    // manual testing
    // clicking close to the other rectangle should finish the rectangle
    // aligned with the existing rectangle due to snapping
  });

  it('makes rectangle edge non-draggable during draw', () => {
    cy.toolbarButton('rectangle')
      .click();

    cy.get(mapSelector)
      .click(200, 200)

    cy.window().then(({ map, L }) => {
      cy.get(mapSelector)
        .then(() => {
          let l;
          map.eachLayer(layer => {
            if (layer instanceof L.Marker) {
              l = layer;

            }
          });
          return l;
        })
        .as('marker');
    });

    cy.get('@marker').then(marker => {
      expect(marker._pmTempLayer).to.equal(true);
      expect(marker.options.draggable).to.equal(false);
    });
  });
});
