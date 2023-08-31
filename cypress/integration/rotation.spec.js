describe('Rotation', () => {
  const mapSelector = '#map';

  it('check if getAngle is correct', () => {
    cy.toolbarButton('rectangle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector).click(200, 200).click(400, 350);

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

    cy.get(mapSelector).click(200, 200).click(400, 350);

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

    cy.get(mapSelector).click(200, 200).click(400, 350);

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

    cy.get(mapSelector).click(200, 200).click(400, 350);

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
      expect(
        layer.getLatLngs()[0][0].equals(layer.pm._rotatePoly.getLatLngs()[0][0])
      ).to.equal(true);
    });
  });

  it('draw rotated rectangle', () => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({ rectangleAngle: 40 });
    });

    cy.toolbarButton('rectangle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector).click(200, 200).click(600, 350);

    cy.window().then(({ map, L }) => {
      const layer = map.pm.getGeomanDrawLayers()[0];
      expect(layer.pm.getAngle()).to.equal(40);
      expect(
        layer
          .getLatLngs()[0][1]
          .equals(L.latLng([51.48267237710426, -0.08847595304329439]))
      ).to.equal(true);
    });
  });

  it('rotates polygon', () => {
    cy.toolbarButton('rectangle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector).click(200, 200).click(400, 350);

    cy.window().then(({ map }) => {
      const layer = map.pm.getGeomanDrawLayers()[0];
      layer.pm.enableRotate();
      const marker1 = layer.pm._rotatePoly.pm._markers[0][0];
      marker1.fire('dragstart', { target: marker1 });
      marker1.setLatLng(map.containerPointToLatLng([200, 210]));
      marker1.fire('drag', { target: marker1 });
      marker1.fire('dragend', { target: marker1 });

      expect(Math.ceil(layer.pm.getAngle())).to.eq(70);
    });
  });

  it('rotates multi-polygon', () => {
    cy.toolbarButton('rectangle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');
    cy.get(mapSelector).click(200, 200).click(600, 350);

    cy.toolbarButton('cut').click();
    cy.get(mapSelector)
      .click(400, 150)
      .click(450, 400)
      .click(500, 400)
      .click(400, 150);

    cy.window().then(({ map }) => {
      const layer = map.pm.getGeomanDrawLayers()[0];
      layer.pm.enableRotate();
      const marker1 = layer.pm._rotatePoly.pm._markers[0][0][0];
      marker1.fire('dragstart', { target: marker1 });
      marker1.setLatLng(map.containerPointToLatLng([200, 210]));
      marker1.fire('drag', { target: marker1 });
      marker1.fire('dragend', { target: marker1 });
      expect(Math.ceil(layer.pm.getAngle())).to.eq(64);
    });
  });

  it('removes hidden rotatePoly if layer is removed', () => {
    cy.toolbarButton('rectangle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');
    cy.get(mapSelector).click(200, 200).click(600, 350);

    cy.window().then(({ map }) => {
      const layer = map.pm.getGeomanDrawLayers()[0];
      layer.pm.enableRotate();
      const rotatePoly = layer.pm._rotatePoly;
      layer.remove();
      expect(!!rotatePoly._map).to.eq(false);
    });
  });

  it('rotate a new added layer', () => {
    cy.window().then(({ map, L }) => {
      expect(() => {
        const coords = [
          [1, 2],
          [3, 4],
        ];
        const rect = L.rectangle(coords).addTo(map);
        rect.pm.rotateLayer(50);
      }).to.not.throw();
    });
  });

  it("doesn't return the rotation help-layer over getGeomanLayers()", () => {
    cy.window().then(({ map, L }) => {
      const coords = [
        [1, 2],
        [3, 4],
      ];
      const rect = L.rectangle(coords).addTo(map);
      rect.pm.enableRotate();

      expect(map.pm.getGeomanLayers().length).to.eq(1);
    });
  });

  it('fixes enabling rotation multiple times', () => {
    cy.window().then(({ map, L }) => {
      const coords = [
        [1, 2],
        [3, 4],
      ];
      const rect = L.rectangle(coords).addTo(map);
      rect.pm.enableRotate();
      rect.pm.enableRotate();

      cy.hasVertexMarkers(4);
      expect(map.pm.getGeomanLayers().length).to.eq(1);
    });
  });

  it('prevents enabling rotation on temp layer', () => {
    cy.window().then(({ map, L }) => {
      const coords = [
        [1, 2],
        [3, 4],
      ];
      L.rectangle(coords).addTo(map);
      const coords2 = [
        [2, 3],
        [3, 4],
      ];
      L.rectangle(coords2).addTo(map);

      map.pm.enableGlobalRotateMode();
      map.pm.enableGlobalRotateMode();

      cy.hasVertexMarkers(8);
      expect(map.pm.getGeomanLayers().length).to.eq(2);
    });
  });
});
