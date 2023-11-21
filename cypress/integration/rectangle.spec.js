describe('Draw Rectangle', () => {
  const mapSelector = '#map';

  it('draws a rectangle', () => {
    cy.toolbarButton('rectangle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector).should('have.class', 'geoman-draw-cursor');

    cy.get(mapSelector).click(200, 200).click(400, 350);

    cy.get(mapSelector).should('not.have.class', 'geoman-draw-cursor');

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

    cy.get(mapSelector).click(200, 200).click(400, 350);

    cy.toolbarButton('rectangle').click();

    cy.get(mapSelector).click(600, 250);

    // manual testing
    // clicking close to the other rectangle should finish the rectangle
    // aligned with the existing rectangle due to snapping
  });

  it('makes rectangle edge non-draggable during draw', () => {
    cy.toolbarButton('rectangle').click();

    cy.get(mapSelector).click(200, 200);

    cy.window().then(({ map, L }) => {
      cy.get(mapSelector)
        .then(() => {
          let l;
          map.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
              l = layer;
            }
          });
          return l;
        })
        .as('marker');
    });

    cy.get('@marker').then((marker) => {
      expect(marker._pmTempLayer).to.equal(true);
      expect(marker.options.draggable).to.equal(false);
    });
  });

  it('Multiple Cuts', () => {
    cy.toolbarButton('rectangle').click();
    cy.get(mapSelector).click(191, 216).click(608, 323);

    cy.toolbarButton('cut').click();
    cy.get(mapSelector)
      .click(226, 419)
      .click(230, 105)
      .click(270, 419)
      .click(226, 419);

    cy.toolbarButton('cut').click();
    cy.get(mapSelector)
      .click(293, 356)
      .click(293, 122)
      .click(340, 367)
      .click(293, 356);

    cy.toolbarButton('cut').click();
    cy.get(mapSelector)
      .click(364, 345)
      .click(363, 138)
      .click(414, 368)
      .click(364, 345);

    cy.toolbarButton('edit').click();
    cy.hasVertexMarkers(16);
  });

  it('goes back to blue after self-intersection removed', () => {
    cy.toolbarButton('rectangle').click();
    cy.get(mapSelector).click(100, 50).click(700, 400);

    cy.toolbarButton('cut').click();
    cy.get(mapSelector)
      .click(200, 200)
      .click(250, 230)
      .click(300, 250)
      .click(370, 200)
      .click(200, 200);

    cy.toolbarButton('cut').click();
    cy.get(mapSelector)
      .click(200, 300)
      .click(250, 270)
      .click(300, 250)
      .click(370, 300)
      .click(200, 300);

    cy.toolbarButton('edit').click();
    cy.hasVertexMarkers(12);

    cy.get(mapSelector).rightclick(300, 250);

    cy.window().then(({ map }) => {
      const rect = map.pm.getGeomanDrawLayers()[0];
      expect(rect.options.color).to.not.equal('#f00000ff');
    });
  });

  it('remove empty coord rings', () => {
    cy.toolbarButton('rectangle').click();
    cy.get(mapSelector).click(100, 50).click(700, 400);

    cy.toolbarButton('cut').click();
    cy.get(mapSelector)
      .click(200, 200)
      .click(300, 250)
      .click(370, 200)
      .click(200, 200);

    cy.toolbarButton('edit').click();
    cy.hasVertexMarkers(7);

    cy.get(mapSelector).rightclick(300, 250);

    cy.window().then(({ map }) => {
      const rect = map.pm.getGeomanDrawLayers()[0];
      const geojson = rect.toGeoJSON();
      const coords = geojson.geometry.coordinates;
      expect(coords.length).to.equal(1);
    });
  });

  it('enable continueDrawing', () => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({ continueDrawing: true });
    });

    cy.toolbarButton('rectangle').click();
    cy.get(mapSelector).click(191, 216).click(608, 323);

    cy.get(mapSelector).click(230, 230).click(350, 350);

    cy.toolbarButton('edit').click();
    cy.hasVertexMarkers(8);
  });

  it('disable popup on layer while drawing', () => {
    let rect = null;
    cy.window().then(({ map, L }) => {
      map.on('pm:create', (e) => {
        e.layer.bindPopup('Popup test');
        if (e.layer instanceof L.Rectangle) {
          rect = e.layer;
        }
      });
    });

    cy.toolbarButton('rectangle').click();
    cy.get(mapSelector).click(100, 50).click(700, 400);

    cy.toolbarButton('marker').click();
    cy.get(mapSelector).click(300, 250);

    cy.toolbarButton('edit').click();

    cy.window().then(({ map }) => {
      const len = map.pm.getGeomanDrawLayers().length;
      expect(len).to.equal(2);

      const text = rect.getPopup().getContent();
      expect(text).to.equal('Popup test');
    });
  });

  it('prevent not correct created snaplist', () => {
    cy.window().then(({ map }) => {
      map.on('pm:create', (e) => {
        map.removeLayer(e.layer);
        map.addLayer(e.layer);
      });
    });

    cy.toolbarButton('rectangle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector).click(200, 200).click(400, 350);

    cy.window().then(({ map }) => {
      expect(map.pm.Draw.Rectangle._snapList).to.equal(undefined);
    });
  });

  it('make layer snappable with pmIgnore', () => {
    // create snapping layer
    cy.toolbarButton('rectangle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector).click(200, 200).click(400, 350);

    // test 1: snapIgnore: undefined, pmIgnore: undefined, optIn: false --> snappable
    cy.toolbarButton('rectangle').click();
    // click or mousemove is needed to init snapList
    cy.get(mapSelector).click(200, 100);

    let layer;
    cy.window().then(({ map }) => {
      expect(map.pm.Draw.Rectangle._snapList.length).to.equal(1);
      map.pm.disableDraw();
      [layer] = map.pm.getGeomanDrawLayers();
    });

    // test 2: snapIgnore: true, pmIgnore: undefined, optIn: false --> not snappable
    cy.window().then(() => {
      layer.options.snapIgnore = true;
    });
    cy.toolbarButton('rectangle').click();
    // click or mousemove is needed to init snapList
    cy.get(mapSelector).click(200, 100);

    cy.window().then(({ map }) => {
      expect(map.pm.Draw.Rectangle._snapList.length).to.equal(0);
      map.pm.disableDraw();
    });

    // test 3: snapIgnore: false, pmIgnore: true, optIn: false --> snappable
    cy.window().then(() => {
      layer.options.snapIgnore = false;
      layer.options.pmIgnore = true;
    });
    cy.toolbarButton('rectangle').click();
    // click or mousemove is needed to init snapList
    cy.get(mapSelector).click(200, 100);

    cy.window().then(({ map }) => {
      expect(map.pm.Draw.Rectangle._snapList.length).to.equal(1);
      map.pm.disableDraw();
    });

    // test 4: snapIgnore: undefined, pmIgnore: true, optIn: false --> not snappable
    cy.window().then(() => {
      delete layer.options.snapIgnore;
      layer.options.pmIgnore = true;
    });
    cy.toolbarButton('rectangle').click();
    // click or mousemove is needed to init snapList
    cy.get(mapSelector).click(200, 100);

    cy.window().then(({ map }) => {
      expect(map.pm.Draw.Rectangle._snapList.length).to.equal(0);
      map.pm.disableDraw();
    });

    // test 5: snapIgnore: undefined, pmIgnore: false, optIn: true --> snappable
    cy.window().then(({ L }) => {
      delete layer.options.snapIgnore;
      layer.options.pmIgnore = false;
      L.PM.setOptIn(true);
    });
    cy.toolbarButton('rectangle').click();
    // click or mousemove is needed to init snapList
    cy.get(mapSelector).click(200, 100);

    cy.window().then(({ map }) => {
      expect(map.pm.Draw.Rectangle._snapList.length).to.equal(1);
      map.pm.disableDraw();
    });

    // test 6: snapIgnore: undefined, pmIgnore: true, optIn: true --> not snappable
    cy.window().then(({ L }) => {
      layer.options.pmIgnore = true;
      L.PM.setOptIn(true);
    });
    cy.toolbarButton('rectangle').click();
    // click or mousemove is needed to init snapList
    cy.get(mapSelector).click(200, 100);

    cy.window().then(({ map }) => {
      expect(map.pm.Draw.Rectangle._snapList.length).to.equal(0);
      map.pm.disableDraw();
    });

    // test 7: snapIgnore: false, pmIgnore: true, optIn: true --> snappable
    cy.window().then(() => {
      layer.options.snapIgnore = false;
    });
    cy.toolbarButton('rectangle').click();
    // click or mousemove is needed to init snapList
    cy.get(mapSelector).click(200, 100);

    cy.window().then(({ map }) => {
      expect(map.pm.Draw.Rectangle._snapList.length).to.equal(1);
      map.pm.disableDraw();
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

    cy.toolbarButton('rectangle').click();
    cy.get(mapSelector).click(350, 250).click(190, 60);

    cy.window().then(({ map }) => {
      expect(1).to.eq(map.pm.getGeomanDrawLayers().length);
    });

    cy.get(mapSelector).click(250, 50);

    cy.window().then(({ map }) => {
      expect(2).to.eq(map.pm.getGeomanDrawLayers().length);
    });
  });

  it('requireSnapToFinish not applied for first layer', () => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({
        requireSnapToFinish: true,
        snapSegment: false,
      });
    });

    cy.toolbarButton('rectangle').click();
    cy.get(mapSelector).click(350, 250).click(190, 60);

    cy.window().then(({ map }) => {
      expect(1).to.eq(map.pm.getGeomanDrawLayers().length);
    });

    cy.toolbarButton('rectangle').click();
    cy.get(mapSelector).click(450, 250).click(390, 60);

    cy.window().then(({ map }) => {
      expect(1).to.eq(map.pm.getGeomanDrawLayers().length);
    });
  });

  it('map property is added after creation', () => {
    cy.toolbarButton('rectangle').click();
    cy.get(mapSelector).click(350, 250).click(190, 60);

    cy.window().then(({ map }) => {
      const layer = map.pm.getGeomanDrawLayers()[0];
      expect(layer.pm._map).to.not.eq(undefined);
    });
  });

  it('drags a whole LayerGroup', () => {
    cy.window().then(({ map, L }) => {
      const fg = L.featureGroup().addTo(map);
      map.pm.setGlobalOptions({ layerGroup: fg, syncLayersOnDrag: true });
    });

    cy.toolbarButton('rectangle').click();
    cy.get(mapSelector).click(191, 216).click(608, 323);

    cy.toolbarButton('rectangle').click();
    cy.get(mapSelector).click(230, 230).click(350, 350);

    cy.toolbarButton('drag').click();

    cy.window().then(({ map }) => {
      const layers = map.pm.getGeomanDrawLayers();
      const center1 = layers[0].getCenter();
      const center2 = layers[1].getCenter();

      const layer = layers[0];
      layer.pm._dragMixinOnMouseDown({
        originalEvent: { button: 0 },
        target: layer,
        latlng: map.containerPointToLatLng([290, 290]),
      });
      layer.pm._dragMixinOnMouseMove({
        originalEvent: { button: 0 },
        target: layer,
        latlng: map.containerPointToLatLng([500, 320]),
      });
      layer.pm._dragMixinOnMouseUp({
        originalEvent: { button: 0 },
        target: layer,
        latlng: map.containerPointToLatLng([320, 320]),
      });

      expect(center1.equals(layers[0].getCenter())).to.eq(false);
      expect(center2.equals(layers[1].getCenter())).to.eq(false);
    });
  });

  it('drags syncLayers', () => {
    cy.toolbarButton('rectangle').click();
    cy.get(mapSelector).click(191, 216).click(608, 323);

    cy.toolbarButton('rectangle').click();
    cy.get(mapSelector).click(230, 230).click(350, 350);

    cy.toolbarButton('drag').click();

    cy.window().then(({ map }) => {
      const layers = map.pm.getGeomanDrawLayers();
      let center1 = layers[0].getCenter();
      let center2 = layers[1].getCenter();

      const layer = layers[0];
      // if this layer is dragged, all layers on the map should dragged too
      layer.pm.options.syncLayersOnDrag = layers;

      // Drag both layers
      layer.pm._dragMixinOnMouseDown({
        originalEvent: { button: 0 },
        target: layer,
        latlng: map.containerPointToLatLng([290, 290]),
      });
      layer.pm._dragMixinOnMouseMove({
        originalEvent: { button: 0 },
        target: layer,
        latlng: map.containerPointToLatLng([500, 320]),
      });
      layer.pm._dragMixinOnMouseUp({
        originalEvent: { button: 0 },
        target: layer,
        latlng: map.containerPointToLatLng([320, 320]),
      });

      expect(center1.equals(layers[0].getCenter())).to.eq(false);
      expect(center2.equals(layers[1].getCenter())).to.eq(false);

      center1 = layers[0].getCenter();
      center2 = layers[1].getCenter();

      const layer2 = layers[1];
      // Drag only layer2
      layer2.pm._dragMixinOnMouseDown({
        originalEvent: { button: 0 },
        target: layer2,
        latlng: map.containerPointToLatLng([290, 290]),
      });
      layer2.pm._dragMixinOnMouseMove({
        originalEvent: { button: 0 },
        target: layer2,
        latlng: map.containerPointToLatLng([500, 320]),
      });
      layer2.pm._dragMixinOnMouseUp({
        originalEvent: { button: 0 },
        target: layer2,
        latlng: map.containerPointToLatLng([320, 320]),
      });

      expect(center1.equals(layers[0].getCenter())).to.eq(true);
      expect(center2.equals(layers[1].getCenter())).to.eq(false);
    });
  });

  it('allows only one of two rectangles to be editable', () => {
    cy.toolbarButton('rectangle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector).click(200, 200).click(400, 350);

    cy.window().then(({ map }) => {
      map.pm.getGeomanDrawLayers()[0].pm.options.allowEditing = false;
    });

    cy.toolbarButton('rectangle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector).click(500, 200).click(400, 350);

    cy.toolbarButton('edit')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.hasVertexMarkers(4);
    cy.hasMiddleMarkers(0);
  });

  it('allows only one of two rectangles to be rotateable', () => {
    cy.toolbarButton('rectangle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector).click(200, 200).click(400, 350);

    cy.window().then(({ map }) => {
      map.pm.getGeomanDrawLayers()[0].pm.options.allowRotation = false;
    });

    cy.toolbarButton('rectangle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector).click(500, 200).click(400, 350);

    cy.toolbarButton('rotate')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.hasVertexMarkers(4);
    cy.hasMiddleMarkers(0);
  });

  it('check if MAX_LATITUDE of CRS is used', () => {
    cy.window().then(({ map }) => {
      map.setZoom(0);
    });
    cy.toolbarButton('rectangle').click();
    cy.get(mapSelector).click(350, 250);

    cy.window().then(({ L, map }) => {
      // move the hintMarker outside of the map bounds (max is 85.0511287798)
      map.pm.Draw.Rectangle._hintMarker.setLatLng(L.latLng(87, -302));

      const drawRect = map.pm.Draw.Rectangle;

      const markers = [
        drawRect._hintMarker,
        drawRect._startMarker,
        ...drawRect._styleMarkers,
      ];
      const latlngs = markers.map((m) => m.getLatLng());

      // check if the two top markers has the maximum lat of 85.0511287798 (and not 87)
      let maxLatUsed = 0;
      latlngs.forEach((latlng) => {
        if (
          latlng.lat.toFixed(9) ===
          map.options.crs.projection.MAX_LATITUDE.toFixed(9)
        ) {
          maxLatUsed += 1;
        }
      });

      expect(maxLatUsed).to.eq(2);
    });
  });

  it('Canvas drags syncLayers', () => {
    let mapCanvas;

    cy.window().then(({ L, map }) => {
      map.remove();
      const tiles = L.tileLayer(
        'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }
      );

      // create the map
      mapCanvas = L.map('map', {
        preferCanvas: true,
      })
        .setView([51.505, -0.09], 13)
        .addLayer(tiles);

      // add leaflet-geoman toolbar
      mapCanvas.pm.addControls();
    });

    cy.toolbarButton('rectangle').click();
    cy.get(mapSelector).click(191, 216).click(608, 323);

    cy.toolbarButton('rectangle').click();
    cy.get(mapSelector).click(230, 230).click(350, 350);

    cy.toolbarButton('drag').click();

    cy.window().then(() => {
      const layers = mapCanvas.pm.getGeomanDrawLayers();
      let center1 = layers[0].getCenter();
      let center2 = layers[1].getCenter();

      const layer = layers[0];
      // if this layer is dragged, all layers on the map should dragged too
      layer.pm.options.syncLayersOnDrag = layers;

      // Drag both layers
      layer.pm._dragMixinOnMouseDown({
        originalEvent: { button: 0 },
        target: layer,
        latlng: mapCanvas.containerPointToLatLng([290, 290]),
      });
      layer.pm._dragMixinOnMouseMove({
        originalEvent: { button: 0 },
        target: layer,
        latlng: mapCanvas.containerPointToLatLng([500, 320]),
      });
      layer.pm._dragMixinOnMouseUp({
        originalEvent: { button: 0 },
        target: layer,
        latlng: mapCanvas.containerPointToLatLng([320, 320]),
      });

      expect(center1.equals(layers[0].getCenter())).to.eq(false);
      expect(center2.equals(layers[1].getCenter())).to.eq(false);

      center1 = layers[0].getCenter();
      center2 = layers[1].getCenter();

      const layer2 = layers[1];
      // Drag only layer2
      layer2.pm._dragMixinOnMouseDown({
        originalEvent: { button: 0 },
        target: layer2,
        latlng: mapCanvas.containerPointToLatLng([290, 290]),
      });
      layer2.pm._dragMixinOnMouseMove({
        originalEvent: { button: 0 },
        target: layer2,
        latlng: mapCanvas.containerPointToLatLng([500, 320]),
      });
      layer2.pm._dragMixinOnMouseUp({
        originalEvent: { button: 0 },
        target: layer2,
        latlng: mapCanvas.containerPointToLatLng([320, 320]),
      });

      expect(center1.equals(layers[0].getCenter())).to.eq(true);
      expect(center2.equals(layers[1].getCenter())).to.eq(false);
    });
  });

  it('preferCanvas - drag a simple layer', () => {
    let mapCanvas;

    cy.window().then(({ L, map }) => {
      map.remove();
      const tiles = L.tileLayer(
        'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }
      );

      // create the map
      mapCanvas = L.map('map', {
        preferCanvas: true,
      })
        .setView([51.505, -0.09], 13)
        .addLayer(tiles);

      // add leaflet-geoman toolbar
      mapCanvas.pm.addControls();
    });

    cy.toolbarButton('rectangle').click();
    cy.get(mapSelector).click(191, 216).click(608, 323);

    cy.toolbarButton('drag').click();

    cy.window().then(() => {
      const layers = mapCanvas.pm.getGeomanDrawLayers();
      const center1 = layers[0].getCenter();

      const layer = layers[0];

      // Drag both layers
      layer.pm._dragMixinOnMouseDown({
        originalEvent: { button: 0 },
        target: layer,
        latlng: mapCanvas.containerPointToLatLng([290, 290]),
      });
      layer.pm._dragMixinOnMouseMove({
        originalEvent: { button: 0 },
        target: layer,
        latlng: mapCanvas.containerPointToLatLng([500, 320]),
      });
      layer.pm._dragMixinOnMouseUp({
        originalEvent: { button: 0 },
        target: layer,
        latlng: mapCanvas.containerPointToLatLng([320, 320]),
      });

      expect(center1.equals(layers[0].getCenter())).to.eq(false);
    });
  });

  it('Canvas renderer - drag a simple layer', () => {
    let mapCanvas;

    cy.window().then(({ L, map }) => {
      map.remove();
      const tiles = L.tileLayer(
        'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }
      );

      // create the map
      mapCanvas = L.map('map', {
        renderer: L.canvas(),
      })
        .setView([51.505, -0.09], 13)
        .addLayer(tiles);

      // add leaflet-geoman toolbar
      mapCanvas.pm.addControls();
    });

    cy.toolbarButton('rectangle').click();
    cy.get(mapSelector).click(191, 216).click(608, 323);

    cy.toolbarButton('drag').click();

    cy.window().then(() => {
      const layers = mapCanvas.pm.getGeomanDrawLayers();
      const center1 = layers[0].getCenter();

      const layer = layers[0];

      // Drag both layers
      layer.pm._dragMixinOnMouseDown({
        originalEvent: { button: 0 },
        target: layer,
        latlng: mapCanvas.containerPointToLatLng([290, 290]),
      });
      layer.pm._dragMixinOnMouseMove({
        originalEvent: { button: 0 },
        target: layer,
        latlng: mapCanvas.containerPointToLatLng([500, 320]),
      });
      layer.pm._dragMixinOnMouseUp({
        originalEvent: { button: 0 },
        target: layer,
        latlng: mapCanvas.containerPointToLatLng([320, 320]),
      });

      expect(center1.equals(layers[0].getCenter())).to.eq(false);
    });
  });

  it('Canvas & SVG renderer - drag two layers', () => {
    let mapCanvas;
    let rect1;
    let rect2;

    cy.window().then(({ L, map }) => {
      map.remove();
      const tiles = L.tileLayer(
        'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }
      );

      // create the map
      mapCanvas = L.map('map', {
        renderer: L.canvas(),
      })
        .setView([51.505, -0.09], 13)
        .addLayer(tiles);

      // add leaflet-geoman toolbar
      mapCanvas.pm.addControls();

      mapCanvas.on('pm:create', (e) => {
        rect1 = e.layer;
        rect2 = L.rectangle(rect1.getBounds(), { renderer: L.svg() }).addTo(
          mapCanvas
        );
      });
    });

    cy.toolbarButton('rectangle').click();
    cy.get(mapSelector).click(191, 216).click(608, 323);

    cy.toolbarButton('drag').click();

    // Canvas layer
    cy.window().then(({ L }) => {
      const center1 = rect1.getCenter();

      const layer = rect1;

      // Drag both layers
      layer.pm._dragMixinOnMouseDown({
        originalEvent: { button: 0 },
        target: layer,
        latlng: mapCanvas.containerPointToLatLng([290, 290]),
      });
      layer.pm._dragMixinOnMouseMove({
        originalEvent: { button: 0 },
        target: layer,
        latlng: mapCanvas.containerPointToLatLng([500, 320]),
      });
      layer.pm._dragMixinOnMouseUp({
        originalEvent: { button: 0 },
        target: layer,
        latlng: mapCanvas.containerPointToLatLng([320, 320]),
      });

      expect(center1.equals(rect1.getCenter())).to.eq(false);
      expect(mapCanvas.getRenderer(rect1) instanceof L.Canvas).to.eq(true);
    });

    // SVG layer
    cy.window().then(({ L }) => {
      const center1 = rect2.getCenter();

      const layer = rect2;

      // Drag both layers
      layer.pm._dragMixinOnMouseDown({
        originalEvent: { button: 0 },
        target: layer,
        latlng: mapCanvas.containerPointToLatLng([290, 290]),
      });
      layer.pm._dragMixinOnMouseMove({
        originalEvent: { button: 0 },
        target: layer,
        latlng: mapCanvas.containerPointToLatLng([500, 320]),
      });
      layer.pm._dragMixinOnMouseUp({
        originalEvent: { button: 0 },
        target: layer,
        latlng: mapCanvas.containerPointToLatLng([320, 320]),
      });

      expect(center1.equals(rect2.getCenter())).to.eq(false);
      expect(mapCanvas.getRenderer(rect2) instanceof L.SVG).to.eq(true);
    });
  });

  it('change color of Rectangle while drawing', () => {
    cy.toolbarButton('rectangle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector).click(220, 220);
    cy.get(mapSelector).trigger('mousemove', 300, 300);

    cy.window().then(({ map }) => {
      const style = {
        color: 'red',
      };
      map.pm.setGlobalOptions({ pathOptions: style });

      const layer = map.pm.Draw.Rectangle._layer;
      expect(layer.options.color).to.eql('red');
    });
  });

  it('Return correct corners of rotated rectangle while drawing', () => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({ rectangleAngle: 45 });
    });

    cy.toolbarButton('rectangle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector).click(220, 220);
    cy.get(mapSelector).trigger('mousemove', 500, 300);

    cy.window().then(({ map }) => {
      const corners = map.pm.Draw.Rectangle._findCorners();
      expect(
        corners[0].equals([51.50820824957313, -0.13801574707031253])
      ).to.eql(true);
      expect(
        corners[1].equals([51.48897254548231, -0.10711669921875001])
      ).to.eql(true);
      expect(
        corners[2].equals([51.499660050014434, -0.08995056152343751])
      ).to.eql(true);
      expect(
        corners[3].equals([51.51889124411909, -0.12084960937500001])
      ).to.eql(true);
    });
  });

  it('edit correctly after a rotated rectangle is imported', () => {
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

    cy.toolbarButton('edit').click();

    cy.window().then(({ map }) => {
      const layer = map.pm.getGeomanLayers()[0];
      const marker1 = layer.pm._markers[0][0];
      marker1.fire('dragstart', { target: marker1 });
      marker1.setLatLng(map.containerPointToLatLng([200, 120]));
      marker1.fire('drag', { target: marker1 });
      marker1.fire('dragend', { target: marker1 });

      const expected = [
        {
          x: 200,
          y: 120,
        },
        {
          x: 617,
          y: 243,
        },
        {
          x: 629,
          y: 204,
        },
        {
          x: 211,
          y: 81,
        },
      ];

      const px = layer.getLatLngs()[0].map((latlng) => {
        const point = map.latLngToContainerPoint(latlng);
        return { x: point.x, y: point.y };
      });

      expect(px).to.eql(expected);
    });
  });

  it('on vertex click', (done) => {
    cy.toolbarButton('rectangle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector).click(200, 200);
    cy.get(mapSelector).click(300, 300);

    cy.window().then(({ map }) => {
      let count = 0;
      const layer = map.pm.getGeomanDrawLayers()[0];
      layer.on('pm:vertexclick', () => {
        count += 1;
        if (count >= 2) {
          expect(count).to.eql(2);
          setTimeout(done, 100);
        }
      });
    });

    cy.toolbarButton('edit').click();
    cy.get(mapSelector).click(200, 200);
    cy.get(mapSelector).click(300, 300);
  });
});
