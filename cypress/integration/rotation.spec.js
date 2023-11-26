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

  it('gets and sets rotation center', () => {
    cy.window().then(({ map, L }) => {
      const coords = [
        [0, 0],
        [4, 4],
      ];

      const rect = L.rectangle(coords).addTo(map);

      // If no rotation center is set, use the shape's center.
      const defaultCenter = rect.pm.getRotationCenter();
      expect(defaultCenter.lat).to.closeTo(2, 0.1);
      expect(defaultCenter.lng).to.closeTo(2, 0.1);

      // Introduce a new origin of rotation
      rect.pm.setRotationCenter(L.latLng([4, 4]));
      const newCenter = rect.pm.getRotationCenter();
      expect(newCenter.lat).to.closeTo(4, 0.1);
      expect(newCenter.lng).to.closeTo(4, 0.1);

      // Unset rotation center (i.e., use default)
      rect.pm.setRotationCenter(null);
      const restoredCenter = rect.pm.getRotationCenter();
      expect(restoredCenter).to.eql(defaultCenter);
    });
  });

  it('rotateLayerToAngle around arbitrary origins', () => {
    cy.toolbarButton('rectangle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector).click(200, 200).click(400, 350);

    cy.window().then(({ map }) => {
      const layer = map.pm.getGeomanDrawLayers()[0];
      const origin = map.containerPointToLatLng([200, 200]);
      layer.pm.setRotationCenter(origin);

      layer.pm.rotateLayerToAngle(90);

      const expected = [
        { x: 50, y: 200 },
        { x: 200, y: 200 },
        { x: 200, y: 400 },
        { x: 50, y: 400 },
      ];

      const px = layer.getLatLngs()[0].map((latlng) => {
        const point = map.latLngToContainerPoint(latlng);
        return { x: point.x, y: point.y };
      });

      expect(px).to.eql(expected);
    });
  });

  it('rotates around arbitrary origins', () => {
    cy.toolbarButton('rectangle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector).click(200, 200).click(400, 350);

    cy.window().then(({ map }) => {
      const layer = map.pm.getGeomanDrawLayers()[0];
      const origin = map.containerPointToLatLng([200, 200]);
      layer.pm.setRotationCenter(origin);
    });

    cy.toolbarButton('rotate').click();

    cy.window().then(({ map }) => {
      const layer = map.pm.getGeomanDrawLayers()[0];
      const marker1 = layer.pm._rotatePoly.pm._markers[0][0];
      marker1.fire('dragstart', { target: marker1 });
      marker1.setLatLng(map.containerPointToLatLng([300, 310]));
      marker1.fire('drag', { target: marker1 });
      marker1.fire('dragend', { target: marker1 });
    });

    cy.window().then(({ map }) => {
      const expected = [
        {
          x: 301,
          y: 311,
        },
        {
          x: 200,
          y: 200,
        },
        {
          x: 348,
          y: 65,
        },
        {
          x: 449,
          y: 176,
        },
      ];

      const layer = map.pm.getGeomanDrawLayers()[0];
      const px = layer.getLatLngs()[0].map((latlng) => {
        const point = map.latLngToContainerPoint(latlng);
        return { x: point.x, y: point.y };
      });
      expect(px).to.eql(expected);
    });
  });

  it('apply new rotation center while rotation is enabled', () => {
    cy.toolbarButton('rectangle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector).click(200, 200).click(400, 350);

    cy.toolbarButton('rotate').click();

    cy.window().then(({ map }) => {
      const layer = map.pm.getGeomanDrawLayers()[0];
      const origin = map.containerPointToLatLng([200, 200]);
      layer.pm.setRotationCenter(origin);
    });

    cy.window().then(({ map }) => {
      const layer = map.pm.getGeomanDrawLayers()[0];
      const marker1 = layer.pm._rotatePoly.pm._markers[0][0];
      marker1.fire('dragstart', { target: marker1 });
      marker1.setLatLng(map.containerPointToLatLng([300, 310]));
      marker1.fire('drag', { target: marker1 });
      marker1.fire('dragend', { target: marker1 });
    });

    cy.window().then(({ map }) => {
      const expected = [
        {
          x: 301,
          y: 311,
        },
        {
          x: 200,
          y: 200,
        },
        {
          x: 348,
          y: 65,
        },
        {
          x: 449,
          y: 176,
        },
      ];

      const layer = map.pm.getGeomanDrawLayers()[0];
      const px = layer.getLatLngs()[0].map((latlng) => {
        const point = map.latLngToContainerPoint(latlng);
        return { x: point.x, y: point.y };
      });
      expect(px).to.eql(expected);
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

  it('set the angle correctly after rotating a new imported rotated rectangle', () => {
    cy.window().then(({ map, L }) => {
      const coords = JSON.parse(
        '{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[-0.122532,51.507986],[-0.117474,51.518864],[-0.06784,51.509926],[-0.072898,51.499046],[-0.122532,51.507986]]]}}'
      );
      const rectangle = L.rectangle([
        [0, 0],
        [0, 0],
      ]);
      rectangle.setLatLngs(L.geoJSON(coords).getLayers()[0].getLatLngs());
      rectangle.addTo(map);
    });

    cy.toolbarButton('rotate').click();

    cy.window().then(({ map }) => {
      const layer = map.pm.getGeomanLayers()[0];
      layer.pm.enableRotate();
      const marker1 = layer.pm._rotatePoly.pm._markers[0][0];
      marker1.fire('dragstart', { target: marker1 });
      marker1.setLatLng(map.containerPointToLatLng([200, 120]));
      marker1.fire('drag', { target: marker1 });
      marker1.fire('dragend', { target: marker1 });
      expect(Math.ceil(layer.pm.getAngle())).to.eq(39);

      layer.pm.rotateLayerToAngle(0);
      expect(Math.ceil(layer.pm.getAngle())).to.eq(0);

      const expected = [
        {
          x: 319,
          y: 267,
        },
        {
          x: 319,
          y: 161,
        },
        {
          x: 620,
          y: 159,
        },
        {
          x: 620,
          y: 265,
        },
      ];

      const px = layer.getLatLngs()[0].map((latlng) => {
        const point = map.latLngToContainerPoint(latlng);
        return { x: point.x, y: point.y };
      });

      expect(px).to.eql(expected);
    });
  });
});
