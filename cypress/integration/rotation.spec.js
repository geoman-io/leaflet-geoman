describe('Rotation', () => {
  const mapSelector = '#map';

  it('check if getAngle is correct', () => {
    cy.toolbarButton('rectangle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector)
      .click(200, 200)
      .click(400, 350);

    cy.window().then(({ map }) => {
      const layer = map.pm.getGeomanDrawLayers()[0];
      expect(layer.pm.getAngle()).to.equal(0);

      layer.pm.rotateLayer(30);
      expect(layer.pm.getAngle()).to.equal(30);

      layer.pm.rotateLayer(-60);
      expect(layer.pm.getAngle()).to.equal(330);

      layer.pm.rotateLayerToAngle(20);
      expect(layer.pm.getAngle()).to.equal(20);

      layer.pm.rotateLayerToAngle(-70);
      expect(layer.pm.getAngle()).to.equal(290);
    });
  });

  it('enable / disable Layer Rotate Mode', () => {
    cy.toolbarButton('rectangle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector)
      .click(200, 200)
      .click(400, 350);

    cy.window().then(({ map }) => {
      const layer = map.pm.getGeomanDrawLayers()[0];

      layer.pm.enableRotate();
      expect(layer.pm.rotateEnabled()).to.equal(true);
    });

    cy.hasVertexMarkers(4);

    cy.window().then(({ map }) => {
      const layer = map.pm.getGeomanDrawLayers()[0];

      layer.pm.disableRotate();
      expect(layer.pm.rotateEnabled()).to.equal(false);
    });
    cy.hasVertexMarkers(0);
  });

  it('enable / disable Global Rotate Mode', () => {
    cy.toolbarButton('rectangle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector)
      .click(200, 200)
      .click(400, 350);

    cy.window().then(({ map }) => {
      const layer = map.pm.getGeomanDrawLayers()[0];

      map.pm.enableGlobalRotateMode();
      expect(layer.pm.rotateEnabled()).to.equal(true);
      expect(map.pm.globalRotateModeEnabled()).to.equal(true);
    });

    cy.hasVertexMarkers(4);

    cy.window().then(({ map }) => {
      const layer = map.pm.getGeomanDrawLayers()[0];

      map.pm.disableGlobalRotateMode();
      expect(layer.pm.rotateEnabled()).to.equal(false);
      expect(map.pm.globalRotateModeEnabled()).to.equal(false);
    });

    cy.hasVertexMarkers(0);

    cy.toolbarButton('rotate')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.hasVertexMarkers(4);

    cy.window().then(({ map }) => {
      map.pm.toggleGlobalRotateMode();
    });

    cy.hasVertexMarkers(0);
  });

  it('check if Markers are updated', () => {
    cy.toolbarButton('rectangle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector)
      .click(200, 200)
      .click(400, 350);

    cy.toolbarButton('rotate')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.hasVertexMarkers(4);

    cy.window().then(({ map }) => {
      const layer = map.pm.getGeomanDrawLayers()[0];
      layer.pm.rotateLayer(30);
      expect(layer.pm.getAngle()).to.equal(30);

      // Marker is on the correct position
      expect(layer.getLatLngs()[0][0].equals(layer.pm._rotatePoly.getLatLngs()[0][0])).to.equal(true);
    });
  });
});