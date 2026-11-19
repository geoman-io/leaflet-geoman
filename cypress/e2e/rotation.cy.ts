describe('Rotation', () => {
  const mapSelector = '#map';

  it('check if getAngle is correct', () => {
    cy.toolbarButton('rectangle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector).click(200, 200).click(400, 350);

    cy.window().then(({ map }) => {
      const layer = (map.pm.getGeomanDrawLayers() as L.Polygon[])[0];
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
      const layer = (map.pm.getGeomanDrawLayers() as L.Polygon[])[0];
      expect(layer.pm.rotateEnabled()).to.equal(false);

      layer.pm.enableRotate();
      expect(layer.pm.rotateEnabled()).to.equal(true);
    });

    cy.hasRotateHandles(1);

    cy.window().then(({ map }) => {
      const layer = (map.pm.getGeomanDrawLayers() as L.Polygon[])[0];

      layer.pm.disableRotate();
      expect(layer.pm.rotateEnabled()).to.equal(false);
    });
    cy.hasRotateHandles(0);
  });

  it('enable / disable Global Rotate Mode', () => {
    cy.toolbarButton('rectangle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector).click(200, 200).click(400, 350);

    cy.window().then(({ map }) => {
      const layer = (map.pm.getGeomanDrawLayers() as L.Polygon[])[0];

      map.pm.enableGlobalRotateMode();
      expect(layer.pm.rotateEnabled()).to.equal(true);
      expect(map.pm.globalRotateModeEnabled()).to.equal(true);
    });

    cy.hasRotateHandles(1);

    cy.window().then(({ map }) => {
      const layer = (map.pm.getGeomanDrawLayers() as L.Polygon[])[0];

      map.pm.disableGlobalRotateMode();
      expect(layer.pm.rotateEnabled()).to.equal(false);
      expect(map.pm.globalRotateModeEnabled()).to.equal(false);
    });

    cy.hasRotateHandles(0);

    cy.toolbarButton('rotate')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.hasRotateHandles(1);

    cy.window().then(({ map }) => {
      map.pm.toggleGlobalRotateMode();
    });

    cy.hasRotateHandles(0);
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

    cy.hasRotateHandles(1);

    cy.window().then(({ map }) => {
      const layer = (map.pm.getGeomanDrawLayers() as L.Polygon[])[0];
      layer.pm.rotateLayer(30);
      expect(layer.pm.getAngle()).to.equal(30);

      // Marker is on the correct position
      expect(
        (layer.getLatLngs() as L.LatLng[][])[0][0].equals(
          (layer.pm._rotatePoly.getLatLngs() as L.LatLng[][])[0][0]
        )
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
      const layer = (map.pm.getGeomanDrawLayers() as L.Polygon[])[0];
      expect(layer.pm.getAngle()).to.equal(40);
      expect(
        (layer.getLatLngs() as L.LatLng[][])[0][1].equals(
          new L.LatLng(51.48267237710426, -0.08847595304329439)
        )
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
      const layer = (map.pm.getGeomanDrawLayers() as L.Polygon[])[0];
      layer.pm.enableRotate();
      const marker1 = layer.pm._rotatePoly.pm._rotateHandle;
      // Start the handle on the vertex these tests used to drag, so the
      // expected angles stay the same.
      marker1.setLatLng((layer.getLatLngs() as L.LatLng[][])[0][0]);
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
      const layer = (map.pm.getGeomanDrawLayers() as L.Polygon[])[0];
      layer.pm.enableRotate();
      const marker1 = layer.pm._rotatePoly.pm._rotateHandle;
      // The handle starts 30px above the highest vertex of every part.
      const tops = (layer.getLatLngs() as L.LatLng[][][])
        .flat(2)
        .map((latlng) => map.latLngToContainerPoint(latlng).y);
      expect(map.latLngToContainerPoint(marker1.getLatLng()).y).to.be.closeTo(
        Math.min(...tops) - 30,
        1
      );
      // Start the handle on the vertex these tests used to drag, so the
      // expected angles stay the same.
      marker1.setLatLng((layer.getLatLngs() as L.LatLng[][][])[0][0][0]);
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
      const layer = (map.pm.getGeomanDrawLayers() as L.Polygon[])[0];
      layer.pm.enableRotate();
      const rotatePoly = layer.pm._rotatePoly;
      layer.remove();
      expect(!!rotatePoly['_map']).to.eq(false);
    });
  });

  it('rotate a new added layer', () => {
    cy.window().then(({ map, L }) => {
      expect(() => {
        const coords: L.LatLngBoundsLiteral = [
          [1, 2],
          [3, 4],
        ];
        const rect = new L.Rectangle(coords).addTo(map);
        rect.pm.rotateLayer(50);
      }).to.not.throw();
    });
  });

  it('gets and sets rotation center', () => {
    cy.window().then(({ map, L }) => {
      const coords: L.LatLngBoundsLiteral = [
        [0, 0],
        [4, 4],
      ];

      const rect = new L.Rectangle(coords).addTo(map);

      // If no rotation center is set, use the shape's center.
      const defaultCenter = rect.pm.getRotationCenter();
      expect(defaultCenter.lat).to.closeTo(2, 0.1);
      expect(defaultCenter.lng).to.closeTo(2, 0.1);

      // Introduce a new origin of rotation
      rect.pm.setRotationCenter(new L.LatLng(4, 4));
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
      const layer = (map.pm.getGeomanDrawLayers() as L.Polygon[])[0];
      const origin = map.containerPointToLatLng([200, 200]);
      layer.pm.setRotationCenter(origin);

      layer.pm.rotateLayerToAngle(90);

      const expected = [
        { x: 50, y: 200 },
        { x: 200, y: 200 },
        { x: 200, y: 400 },
        { x: 50, y: 400 },
      ];

      const px = (layer.getLatLngs() as L.LatLng[][])[0].map((latlng) => {
        const point = map.latLngToContainerPoint(latlng);
        // Leaflet 2 returns fractional pixels; Leaflet 1 rounds them
        return { x: Math.round(point.x), y: Math.round(point.y) };
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
      const layer = (map.pm.getGeomanDrawLayers() as L.Polygon[])[0];
      const origin = map.containerPointToLatLng([200, 200]);
      layer.pm.setRotationCenter(origin);
    });

    cy.toolbarButton('rotate').click();

    cy.window().then(({ map }) => {
      const layer = (map.pm.getGeomanDrawLayers() as L.Polygon[])[0];
      const marker1 = layer.pm._rotatePoly.pm._rotateHandle;
      // Start the handle on the vertex these tests used to drag, so the
      // expected angles stay the same.
      marker1.setLatLng((layer.getLatLngs() as L.LatLng[][])[0][0]);
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

      const layer = (map.pm.getGeomanDrawLayers() as L.Polygon[])[0];
      const px = (layer.getLatLngs() as L.LatLng[][])[0].map((latlng) => {
        const point = map.latLngToContainerPoint(latlng);
        // Leaflet 2 returns fractional pixels; Leaflet 1 rounds them
        return { x: Math.round(point.x), y: Math.round(point.y) };
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
      const layer = (map.pm.getGeomanDrawLayers() as L.Polygon[])[0];
      const origin = map.containerPointToLatLng([200, 200]);
      layer.pm.setRotationCenter(origin);
    });

    cy.window().then(({ map }) => {
      const layer = (map.pm.getGeomanDrawLayers() as L.Polygon[])[0];
      const marker1 = layer.pm._rotatePoly.pm._rotateHandle;
      // Start the handle on the vertex these tests used to drag, so the
      // expected angles stay the same.
      marker1.setLatLng((layer.getLatLngs() as L.LatLng[][])[0][0]);
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

      const layer = (map.pm.getGeomanDrawLayers() as L.Polygon[])[0];
      const px = (layer.getLatLngs() as L.LatLng[][])[0].map((latlng) => {
        const point = map.latLngToContainerPoint(latlng);
        // Leaflet 2 returns fractional pixels; Leaflet 1 rounds them
        return { x: Math.round(point.x), y: Math.round(point.y) };
      });
      expect(px).to.eql(expected);
    });
  });

  it("doesn't return the rotation help-layer over getGeomanLayers()", () => {
    cy.window().then(({ map, L }) => {
      const coords: L.LatLngBoundsLiteral = [
        [1, 2],
        [3, 4],
      ];
      const rect = new L.Rectangle(coords).addTo(map);
      rect.pm.enableRotate();

      expect((map.pm.getGeomanLayers() as L.Polygon[]).length).to.eq(1);
    });
  });

  it('fixes enabling rotation multiple times', () => {
    cy.window().then(({ map, L }) => {
      const coords: L.LatLngBoundsLiteral = [
        [1, 2],
        [3, 4],
      ];
      const rect = new L.Rectangle(coords).addTo(map);
      rect.pm.enableRotate();
      rect.pm.enableRotate();

      cy.hasRotateHandles(1);
      expect((map.pm.getGeomanLayers() as L.Polygon[]).length).to.eq(1);
    });
  });

  it('prevents enabling rotation on temp layer', () => {
    cy.window().then(({ map, L }) => {
      const coords: L.LatLngBoundsLiteral = [
        [1, 2],
        [3, 4],
      ];
      new L.Rectangle(coords).addTo(map);
      const coords2: L.LatLngBoundsLiteral = [
        [2, 3],
        [3, 4],
      ];
      new L.Rectangle(coords2).addTo(map);

      map.pm.enableGlobalRotateMode();
      map.pm.enableGlobalRotateMode();

      cy.hasRotateHandles(2);
      expect((map.pm.getGeomanLayers() as L.Polygon[]).length).to.eq(2);
    });
  });

  it('set the angle correctly after rotating a new imported rotated rectangle', () => {
    cy.window().then(({ map, L }) => {
      const coords = JSON.parse(
        '{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[-0.122532,51.507986],[-0.117474,51.518864],[-0.06784,51.509926],[-0.072898,51.499046],[-0.122532,51.507986]]]}}'
      );
      const rectangle = new L.Rectangle([
        [0, 0],
        [0, 0],
      ]);
      rectangle.setLatLngs(
        (new L.GeoJSON(coords).getLayers()[0] as L.Polygon).getLatLngs()
      );
      rectangle.addTo(map);
    });

    cy.toolbarButton('rotate').click();

    cy.window().then(({ map }) => {
      const layer = (map.pm.getGeomanLayers() as L.Polygon[])[0];
      layer.pm.enableRotate();
      const marker1 = layer.pm._rotatePoly.pm._rotateHandle;
      // Start the handle on the vertex these tests used to drag, so the
      // expected angles stay the same.
      marker1.setLatLng((layer.getLatLngs() as L.LatLng[][])[0][0]);
      marker1.fire('dragstart', { target: marker1 });
      marker1.setLatLng(map.containerPointToLatLng([200, 120]));
      marker1.fire('drag', { target: marker1 });
      marker1.fire('dragend', { target: marker1 });
      expect(Math.ceil(layer.pm.getAngle())).to.eq(39);

      layer.pm.rotateLayerToAngle(0);
      expect(Math.ceil(layer.pm.getAngle())).to.eq(0);

      // rotated back to 0°, the rectangle is axis-aligned again
      const expected = [
        { x: 319, y: 266 },
        { x: 319, y: 160 },
        { x: 620, y: 160 },
        { x: 620, y: 266 },
      ];

      const px = (layer.getLatLngs() as L.LatLng[][])[0].map((latlng) => {
        const point = map.latLngToContainerPoint(latlng);
        // Leaflet 2 returns fractional pixels; Leaflet 1 rounds them
        return { x: Math.round(point.x), y: Math.round(point.y) };
      });

      expect(px).to.eql(expected);
    });
  });

  describe('rotate handle', () => {
    const round = (map: L.Map, latlng: L.LatLng) => {
      const point = map.latLngToContainerPoint(latlng);
      return { x: Math.round(point.x), y: Math.round(point.y) };
    };
    const corners = (map: L.Map, layer: L.Polygon) =>
      (layer.getLatLngs() as L.LatLng[][])[0].map((latlng) =>
        round(map, latlng)
      );

    beforeEach(() => {
      cy.toolbarButton('rectangle').click();
      cy.get(mapSelector).click(200, 200).click(400, 350);
    });

    it('shows one handle above the shape instead of vertex handles', () => {
      cy.toolbarButton('rotate').click();
      cy.hasRotateHandles(1);
      cy.hasVertexMarkers(0);

      cy.window().then(({ map }) => {
        const layer = (map.pm.getGeomanDrawLayers() as L.Polygon[])[0];
        const handle = layer.pm._rotatePoly.pm._rotateHandle;
        // 30px above the top edge, over the center of (200,200)-(400,350)
        expect(round(map, handle.getLatLng())).to.eql({ x: 300, y: 170 });
      });
    });

    it('rotates when the handle is dragged with the pointer', () => {
      cy.toolbarButton('rotate').click();
      cy.window().then(({ map }) => {
        const ends: number[] = [];
        map.on('pm:rotateend', () => ends.push(1));
        cy.wrap(ends).as('ends');
      });

      cy.get(mapSelector).trigger('pointerdown', 300, 170, { which: 1 });
      cy.get(mapSelector).trigger('pointermove', 330, 180, { which: 1 });
      cy.get(mapSelector).trigger('pointermove', 380, 230, { which: 1 });
      cy.get(mapSelector).trigger('pointermove', 400, 275, { which: 1 });
      cy.get(mapSelector).trigger('pointerup', 400, 275, { which: 1 });

      cy.get('@ends').should('have.length', 1);
      cy.window().then(({ map }) => {
        const layer = (map.pm.getGeomanDrawLayers() as L.Polygon[])[0];
        // up to right around the center (300,275) is a quarter turn clockwise
        expect(Math.round(layer.pm.getAngle())).to.eq(90);
        const handle = layer.pm._rotatePoly.pm._rotateHandle;
        // the rotated rectangle reaches 75px right of the center, plus 30px
        const at = round(map, handle.getLatLng());
        expect(at.x).to.be.within(404, 406);
        expect(at.y).to.be.within(274, 276);
      });
    });

    it("doesn't rotate when a vertex is dragged in rotate mode", () => {
      cy.toolbarButton('rotate').click();
      cy.window().then(({ map }) => {
        const layer = (map.pm.getGeomanDrawLayers() as L.Polygon[])[0];
        cy.wrap(JSON.stringify(layer.getLatLngs())).as('before');
      });

      cy.get(mapSelector).trigger('pointerdown', 200, 200, { which: 1 });
      cy.get(mapSelector).trigger('pointermove', 180, 230, { which: 1 });
      cy.get(mapSelector).trigger('pointermove', 150, 250, { which: 1 });
      cy.get(mapSelector).trigger('pointerup', 150, 250, { which: 1 });

      cy.get('@before').then((before) => {
        cy.window().then(({ map }) => {
          const layer = (map.pm.getGeomanDrawLayers() as L.Polygon[])[0];
          expect(layer.pm.getAngle()).to.eq(0);
          expect(JSON.stringify(layer.getLatLngs())).to.eq(before);
        });
      });
    });

    it('keeps the handle 30px from the shape after zooming', () => {
      cy.toolbarButton('rotate').click();
      cy.window().then(({ map }) => {
        map.setZoom(map.getZoom() - 1, { animate: false });
      });
      cy.window().then(({ map }) => {
        const layer = (map.pm.getGeomanDrawLayers() as L.Polygon[])[0];
        const px = corners(map, layer);
        const top = Math.min(...px.map((p) => p.y));
        const left = Math.min(...px.map((p) => p.x));
        const right = Math.max(...px.map((p) => p.x));
        const at = round(
          map,
          layer.pm._rotatePoly.pm._rotateHandle.getLatLng()
        );
        expect(at.y).to.be.within(top - 31, top - 29);
        expect(at.x).to.be.within(
          (left + right) / 2 - 1,
          (left + right) / 2 + 1
        );
      });
    });

    it('moves the handle when the layer is rotated by code', () => {
      cy.toolbarButton('rotate').click();
      cy.window().then(({ map }) => {
        const layer = (map.pm.getGeomanDrawLayers() as L.Polygon[])[0];
        layer.pm.rotateLayer(90);
        const px = corners(map, layer);
        const right = Math.max(...px.map((p) => p.x));
        const top = Math.min(...px.map((p) => p.y));
        const bottom = Math.max(...px.map((p) => p.y));
        const at = round(
          map,
          layer.pm._rotatePoly.pm._rotateHandle.getLatLng()
        );
        expect(at.x).to.be.within(right + 29, right + 31);
        expect(at.y).to.be.within(
          (top + bottom) / 2 - 1,
          (top + bottom) / 2 + 1
        );
      });
    });

    it('adds a drag to an angle set by code while rotate is enabled', () => {
      cy.toolbarButton('rotate').click();
      cy.window().then(({ map }) => {
        const layer = (map.pm.getGeomanDrawLayers() as L.Polygon[])[0];
        layer.pm.rotateLayer(30);
        const handle = layer.pm._rotatePoly.pm._rotateHandle;
        const center = map.latLngToContainerPoint(layer.pm.getRotationCenter());
        handle.fire('dragstart', { target: handle });
        // a quarter turn clockwise from where the handle starts
        const start = map.latLngToContainerPoint(handle.getLatLng());
        const turned = center.add([center.y - start.y, start.x - center.x]);
        handle.setLatLng(map.containerPointToLatLng(turned));
        handle.fire('drag', { target: handle });
        handle.fire('dragend', { target: handle });
        expect(Math.round(layer.pm.getAngle())).to.eq(120);
      });
    });

    it('moves the stem when the rotation center changes', () => {
      cy.toolbarButton('rotate').click();
      cy.window().then(({ map }) => {
        const layer = (map.pm.getGeomanDrawLayers() as L.Polygon[])[0];
        const center = map.containerPointToLatLng([250, 250]);
        layer.pm.setRotationCenter(center);
        const stem = (
          layer.pm._rotatePoly.pm as unknown as { _rotateStem: L.Polyline }
        )._rotateStem;
        const start = (stem.getLatLngs() as L.LatLng[])[0];
        expect(round(map, start)).to.eql({ x: 250, y: 250 });
      });
    });

    it("isn't hidden by limitMarkersToCount", () => {
      cy.window().then(({ map }) => {
        map.pm.setGlobalOptions({ limitMarkersToCount: 1 });
      });
      cy.toolbarButton('rotate').click();
      cy.get(mapSelector).trigger('pointermove', 450, 300);
      cy.hasRotateHandles(1);
    });
  });
});
