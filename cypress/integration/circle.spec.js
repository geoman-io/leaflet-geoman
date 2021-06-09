describe('Draw Circle', () => {
  const mapSelector = '#map';

  it('draws a circle', () => {
    cy.toolbarButton('circle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector).click(200, 200).click(250, 250);

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
          map.eachLayer((layer) => {
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
          map.eachLayer((layer) => {
            if (layer instanceof L.Circle) {
              expect(layer.options.color).to.equal('yellow');
            }
          });
        });
    });
  });

  it('enable continueDrawing', () => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({ continueDrawing: true });
    });

    cy.toolbarButton('circle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    // draw first circle
    cy.get(mapSelector).click(200, 200).click(250, 250);

    // draw with continueDrawing: ture the second circle
    cy.get(mapSelector).click(300, 200).click(350, 250);

    cy.toolbarButton('edit').click();
    cy.hasVertexMarkers(4);
  });

  it('set max radius of circle', () => {
    cy.toolbarButton('circle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.window().then(({ map, L }) => {
      L.marker(map.getCenter()).addTo(map);
      map.pm.setGlobalOptions({
        minRadiusCircle: 500,
        maxRadiusCircle: 1500,
      });
      cy.get(mapSelector)
        .click(250, 200)
        .click(400, 190)
        .then(() => {
          const layers = map.pm.getGeomanDrawLayers();
          layers.forEach((layer) => {
            if (layer instanceof L.Circle) {
              expect(layer.getRadius()).to.equal(1500);
            }
          });
        });
    });
  });
  it('set min radius of circle', () => {
    cy.toolbarButton('circle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.window().then(({ map, L }) => {
      L.marker(map.getCenter()).addTo(map);
      map.pm.setGlobalOptions({
        minRadiusCircle: 1500,
        maxRadiusCircle: 3000,
      });
      cy.get(mapSelector)
        .click(250, 200)
        .click(300, 190)
        .then(() => {
          const layers = map.pm.getGeomanDrawLayers();
          layers.forEach((layer) => {
            if (layer instanceof L.Circle) {
              expect(layer.getRadius()).to.equal(1500);
            }
          });
        });
    });
  });
  it('requireSnapToFinish', () => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({
        requireSnapToFinish: true,
        snapSegment: false,
      });
    });

    cy.toolbarButton('polygon').click();
    cy.get(mapSelector)
      .click(150, 250)
      .click(160, 50)
      .click(250, 50)
      .click(150, 250);

    cy.toolbarButton('circle').click();
    cy.get(mapSelector).click(350, 250).click(190, 60);

    cy.window().then(({ map }) => {
      expect(1).to.eq(map.pm.getGeomanDrawLayers().length);
    });

    cy.get(mapSelector).click(250, 50);

    cy.window().then(({ map }) => {
      expect(2).to.eq(map.pm.getGeomanDrawLayers().length);
    });
  });
});
