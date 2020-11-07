describe('Draw Circle', () => {
  const mapSelector = '#map';

  it('draws a circle', () => {
    cy.toolbarButton('circle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector)
      .click(200, 200)
      .click(250, 250);

    cy.toolbarButton('edit')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.hasVertexMarkers(2);
    cy.hasMiddleMarkers(0);

    cy.toolbarButton('edit').click();
    cy.toolbarButton('edit').click();

    cy.hasVertexMarkers(2);

    cy.toolbarButton('edit').click();

    cy.hasVertexMarkers(0);

    cy.toolbarButton('edit').click();

    cy.hasVertexMarkers(2);

    cy.toolbarButton('edit').click();
  });

  it('uses correct options from enableDraw', () => {
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
          map.eachLayer(layer => {
            if (layer instanceof L.Circle) {
              expect(layer.options.color).to.equal('red');
              expect(layer.options.fillColor).to.equal('orange');
            }
          });
        });
    });
  });

  it('uses correct options from setPathOptions', () => {
    cy.toolbarButton('circle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.window().then(({ map, L }) => {
      map.pm.setPathOptions({
        color: 'yellow',
      });

      cy.get(mapSelector)
        .click(200, 200)
        .click(250, 250)
        .then(() => {
          map.eachLayer(layer => {
            if (layer instanceof L.Circle) {
              expect(layer.options.color).to.equal('yellow');
            }
          });
        });
    });
  });

  it('enable continueDrawing', () => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({continueDrawing: true});
    });

    cy.toolbarButton('circle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    // draw first circle
    cy.get(mapSelector)
      .click(200, 200)
      .click(250, 250);

    // draw with continueDrawing: ture the second circle
    cy.get(mapSelector)
      .click(300, 200)
      .click(350, 250);

    cy.toolbarButton('edit').click();
    cy.hasVertexMarkers(4);
  });
});
