describe('Edit LayerGroup', () => {
  const mapSelector = '#map';

  it('correctly enables geojson featureCollection', () => {
    cy.drawShape('FeatureCollectionWithCircles');

    cy.toolbarButton('edit').click();
    cy.hasVertexMarkers(21);
    cy.toolbarButton('edit').click();
    cy.hasVertexMarkers(0);
  });

  it('respects pmIgnore', () => {
    cy.drawShape('LineString', true);

    cy.toolbarButton('edit').click();
    cy.hasVertexMarkers(0);
  });

  it('enables all layers of layerGroup', () => {
    cy.drawShape('FeatureCollectionWithCircles');

    cy.get('@featurecol').then((feature) => {
      feature.pm.enable();
    });

    cy.hasVertexMarkers(21);

    cy.get('@featurecol').then((feature) => {
      feature.pm.disable();
    });
    cy.hasVertexMarkers(0);

    cy.get('@featurecol').then((feature) => {
      feature.pm.toggleEdit();
    });
    cy.hasVertexMarkers(21);

    cy.get('@featurecol').then((feature) => {
      feature.pm.toggleEdit();
    });
    cy.hasVertexMarkers(0);
  });

  it('adds the created layers to a layergroup', () => {
    let fg: L.FeatureGroup;
    let fg2: L.FeatureGroup;

    // Add layer to group
    cy.window().then(({ L, map }) => {
      fg = new L.FeatureGroup().addTo(map);
      fg2 = new L.FeatureGroup().addTo(map);

      map.pm.setGlobalOptions({ layerGroup: fg });

      cy.toolbarButton('rectangle')
        .click()
        .closest('.button-container')
        .should('have.class', 'active');

      cy.get(mapSelector).click(200, 200).click(400, 350);

      cy.hasLayers(5);
    });

    // check if layer is on group and will be removed from map, when group is removed
    cy.window().then(({ map }) => {
      fg.removeFrom(map);
      cy.hasLayers(3);

      const count = fg.getLayers().length;
      expect(count).to.equal(1);
    });
    // delete layer from group and map
    cy.window().then(({ map }) => {
      fg.addTo(map);

      cy.toolbarButton('delete').click();

      cy.get(mapSelector).click(280, 280);
    });
    cy.window().then(() => {
      const count = fg.getLayers().length;
      expect(count).to.equal(0);
    });

    // add layer and then change group
    cy.window().then(() => {
      cy.toolbarButton('rectangle').click();

      cy.get(mapSelector).click(200, 200).click(400, 350);
    });
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({ layerGroup: fg2 });
      cy.hasLayers(5);

      cy.toolbarButton('circle').click();
      cy.get(mapSelector).click(200, 200).click(250, 250);
    });
    // delete layer from another (first) group
    cy.window().then(() => {
      cy.toolbarButton('delete').click();

      cy.get(mapSelector).click(280, 280);
    });
    cy.window().then(() => {
      const count = fg.getLayers().length;
      expect(count).to.equal(1);
      const count2 = fg2.getLayers().length;
      expect(count2).to.equal(1);
      cy.hasLayers(5);
    });
    // delete circle from second group
    cy.window().then(() => {
      cy.get(mapSelector).click(180, 180);
      cy.toolbarButton('delete').click();
    });
    cy.window().then(() => {
      const count2 = fg2.getLayers().length;
      expect(count2).to.equal(0);
      cy.hasLayers(4);
    });
  });

  it('pass the fired event of the layer to group', () => {
    let fg: L.FeatureGroup;
    let firedEvent = '';

    cy.window().then(({ map, L }) => {
      fg = new L.FeatureGroup();
      fg.on('pm:cut', (e) => {
        firedEvent = e.type;
      });

      map.on('pm:create', (e) => {
        e.layer.addTo(fg);
      });
    });
    // activate polygon drawing
    cy.toolbarButton('polygon')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    // draw a polygon
    cy.get(mapSelector)
      .click(90, 250)
      .click(150, 50)
      .click(500, 50)
      .click(500, 300)
      .click(300, 350)
      .click(90, 250);

    // activate cutting drawing
    cy.toolbarButton('cut')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    // draw a polygon to cut
    cy.get(mapSelector)
      .click(450, 100)
      .click(450, 150)
      .click(400, 150)
      .click(390, 140)
      .click(390, 100)
      .click(450, 100);

    cy.window().then(() => {
      expect(firedEvent).to.equal('pm:cut');
    });
  });

  it('event is fired only once if group has multiple sub-groups with the same layer', () => {
    let firedEventCount = 0;
    cy.window().then(({ map, L }) => {
      const group = new L.FeatureGroup().addTo(map);
      const layers = new L.FeatureGroup().addTo(group);
      const markers = new L.FeatureGroup().addTo(group);
      const markersChild = new L.FeatureGroup().addTo(markers);
      new L.Marker(map.getCenter())
        .addTo(layers)
        .addTo(markers)
        .addTo(markersChild);

      group.on('pm:enable', () => {
        firedEventCount += 1;
      });
    });

    cy.wait(100);

    cy.toolbarButton('edit').click();

    cy.window().then(() => {
      expect(firedEventCount).to.equal(1);
    });
  });

  it('event is fired on every parent group of a layer (once)', () => {
    let firedEventCount = 0;
    cy.window().then(({ map, L }) => {
      const group = new L.FeatureGroup().addTo(map);
      const layers = new L.FeatureGroup().addTo(group);
      const markers = new L.FeatureGroup().addTo(group);
      const markersChild = new L.FeatureGroup().addTo(markers);
      new L.Marker(map.getCenter())
        .addTo(layers)
        .addTo(markers)
        .addTo(markersChild);

      group.on('pm:enable', () => {
        firedEventCount += 1;
      });
      layers.on('pm:enable', () => {
        firedEventCount += 1;
      });
      markers.on('pm:enable', () => {
        firedEventCount += 1;
      });
      markersChild.on('pm:enable', () => {
        firedEventCount += 1;
      });
    });

    cy.wait(100);

    cy.toolbarButton('edit').click();

    cy.window().then(() => {
      expect(firedEventCount).to.equal(4);
    });
  });

  it('event is fired on L.geoJson when it has FeatureCollections', () => {
    cy.drawShape('FeatureCollectionEventFire');

    let firedEventCount = 0;
    cy.get('@feature').then((feature) => {
      feature.on('pm:enable', () => {
        firedEventCount += 1;
      });
    });

    cy.wait(100);

    cy.toolbarButton('edit').click();

    cy.window().then(() => {
      expect(firedEventCount).to.equal(2);
    });
  });

  it('new added layers will be changed to edit mode if editmode is enabled', () => {
    cy.window().then(({ map, L }) => {
      map.setView([4.009783550466563, 104.00000000000006], 8);
      const fg = new L.FeatureGroup().addTo(map);

      map.on('pm:create layeradd', (e) => {
        e.layer.addTo(fg);
      });
    });

    cy.toolbarButton('rectangle').click();

    cy.get(mapSelector).click(200, 200).click(400, 350);

    cy.toolbarButton('edit').click();

    cy.drawShape('MultiPolygon');

    cy.hasVertexMarkers(12);
  });

  it('new drawn markers not enable other layers in the same layergroup', () => {
    cy.window().then(({ map, L }) => {
      map.setView([4.009783550466563, 104.00000000000006], 8);
      const fg = new L.FeatureGroup().addTo(map);

      map.on('pm:create layeradd', (e) => {
        e.layer.addTo(fg);
      });
    });

    cy.toolbarButton('rectangle').click();

    cy.get(mapSelector).click(200, 200).click(400, 350);

    cy.toolbarButton('marker').click();

    cy.get(mapSelector).click(450, 350);

    cy.hasVertexMarkers(0);
  });

  it('re-init GeoJSON OptIn', () => {
    let layerGroup: L.FeatureGroup;
    cy.window().then(({ map, L }) => {
      cy.fixture('LineString')
        .as('poly')
        .then((json) => {
          layerGroup = new L.GeoJSON(json, { pmIgnore: true }).addTo(map);
          const bounds = layerGroup.getBounds();
          map.fitBounds(bounds);
        });
    });

    cy.window().then(({ map, L }) => {
      expect((map.pm.getGeomanLayers() as L.Polyline[]).length).to.eq(0);

      // enable all child layers of the group
      layerGroup.setStyle({ pmIgnore: false });
      // enable the group self
      layerGroup.options.pmIgnore = false;
      L.PM.reInitLayer(layerGroup);

      expect(layerGroup.pm).to.not.eq(undefined);
      expect((map.pm.getGeomanLayers() as L.Polyline[]).length).to.eq(6);
    });
  });

  it('adds options to layers before throlle is fired', () => {
    cy.toolbarButton('rectangle').click();
    cy.get(mapSelector).click(200, 200).click(400, 350);

    cy.toolbarButton('rectangle').click();
    cy.get(mapSelector).click(350, 200).click(400, 400);

    cy.window().then(({ map, L }) => {
      const fg = new L.FeatureGroup().addTo(map);
      const layers = map.pm.getGeomanDrawLayers() as L.Polyline[];
      layers.forEach((layer) => {
        fg.addLayer(layer);
      });
      fg.pm.setOptions({ syncLayersOnDrag: true });

      expect(layers[1].pm.options.syncLayersOnDrag).to.eq(true);
    });
  });

  it('fires events on the groups a layer belongs to right after it moves', () => {
    const fired: string[] = [];
    cy.window().then(({ map, L }) => {
      const groupA = new L.FeatureGroup().addTo(map);
      const groupB = new L.FeatureGroup().addTo(map);
      const marker = new L.Marker(map.getCenter()).addTo(groupA);
      groupA.on('pm:disable', () => fired.push('A'));
      groupB.on('pm:disable', () => fired.push('B'));

      marker.pm.enable();
      groupA.removeLayer(marker);
      groupB.addLayer(marker);
      marker.pm.enable();
      marker.pm.disable();

      expect(fired).to.deep.equal(['B']);
    });
  });

  it('syncs drag for a layer added just before a temporary layer', () => {
    let first: L.Polygon;
    let second: L.Polygon;
    cy.window().then(({ map, L }) => {
      const fg = new L.FeatureGroup().addTo(map);
      const ring = (x: number, y: number) =>
        [
          [x, y],
          [x + 60, y],
          [x + 60, y + 60],
        ].map((p) => map.containerPointToLatLng(p as L.PointTuple));
      first = new L.Polygon(ring(150, 150)).addTo(fg);
      // Added inside the group's 100 ms layeradd throttle window, then
      // followed by a temporary layer.
      second = new L.Polygon(ring(350, 150)).addTo(fg);
      const temp = new L.Marker(map.getCenter());
      temp._pmTempLayer = true;
      temp.addTo(fg);
    });

    cy.wait(150);

    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({ syncLayersOnDrag: true });
      map.pm.enableGlobalDragMode();
      const firstBefore = first.getCenter();
      const secondBefore = second.getCenter();
      const start = map.latLngToContainerPoint(secondBefore);
      const end = start.add([60, 30]);
      const event = (point: L.Point) => ({
        originalEvent: { button: 0 },
        target: second,
        latlng: map.containerPointToLatLng(point),
      });
      second.pm._dragMixinOnMouseDown(event(start));
      second.pm._dragMixinOnMouseMove(event(end));
      second.pm._dragMixinOnMouseUp(event(end));

      expect(secondBefore.equals(second.getCenter())).to.eq(false);
      expect(firstBefore.equals(first.getCenter())).to.eq(false);
    });
  });

  it('syncs drag with a plain LayerGroup, including layers added later', () => {
    let first: L.Polygon;
    let second: L.Polygon;
    cy.window().then(({ map, L }) => {
      const ring = (x: number, y: number) =>
        [
          [x, y],
          [x + 60, y],
          [x + 60, y + 60],
        ].map((p) => map.containerPointToLatLng(p as L.PointTuple));
      first = new L.Polygon(ring(150, 150));
      const group = new L.LayerGroup([first]).addTo(map);
      // LayerGroup (unlike FeatureGroup) fires no layeradd for this.
      second = new L.Polygon(ring(350, 150));
      group.addLayer(second);
      map.pm.setGlobalOptions({ syncLayersOnDrag: true });
      map.pm.enableGlobalDragMode();

      const firstBefore = first.getCenter();
      const start = map.latLngToContainerPoint(second.getCenter());
      const end = start.add([60, 30]);
      const event = (point: L.Point) => ({
        originalEvent: { button: 0 },
        target: second,
        latlng: map.containerPointToLatLng(point),
      });
      const secondBefore = second.getCenter();
      // Drag the layer added later; the group must still move the first one.
      second.pm._dragMixinOnMouseDown(event(start));
      second.pm._dragMixinOnMouseMove(event(end));
      second.pm._dragMixinOnMouseUp(event(end));

      expect(firstBefore.equals(first.getCenter())).to.eq(false);
      expect(secondBefore.equals(second.getCenter())).to.eq(false);
    });
  });

  it('stops syncing drag with a group the layer was removed from', () => {
    cy.window().then(({ map, L }) => {
      const fg = new L.FeatureGroup().addTo(map);
      map.pm.setGlobalOptions({ layerGroup: fg, syncLayersOnDrag: true });
    });

    cy.toolbarButton('rectangle').click();
    cy.get(mapSelector).click(191, 216).click(608, 323);

    cy.toolbarButton('rectangle').click();
    cy.get(mapSelector).click(230, 230).click(350, 350);

    cy.window().then(({ map }) => {
      const layers = map.pm.getGeomanDrawLayers() as L.Rectangle[];
      const fg = map.pm.getGlobalOptions().layerGroup as L.FeatureGroup;
      fg.removeLayer(layers[0]);
      layers[0].addTo(map);
    });

    cy.toolbarButton('drag').click();

    cy.window().then(({ map }) => {
      const layers = map.pm.getGeomanDrawLayers() as L.Rectangle[];
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
      expect(center2.equals(layers[1].getCenter())).to.eq(true);
    });
  });

  it('syncs drag with every group of a layer, moving shared layers once', () => {
    let sharedDragEnds = 0;
    cy.window().then(({ map, L }) => {
      const rect = (x: number, y: number) =>
        new L.Rectangle(
          new L.LatLngBounds(
            map.containerPointToLatLng([x, y]),
            map.containerPointToLatLng([x + 40, y + 40])
          )
        );
      // `dragged` is in both groups, and so is `shared`.
      const dragged = rect(100, 100);
      const onlyFirst = rect(200, 100);
      const onlySecond = rect(300, 100);
      const shared = rect(400, 100);
      const outside = rect(500, 100).addTo(map);
      const first = new L.FeatureGroup([dragged, onlyFirst, shared]).addTo(map);
      const second = new L.FeatureGroup([dragged, onlySecond, shared]).addTo(
        map
      );
      first.pm.setOptions({ syncLayersOnDrag: true });
      second.pm.setOptions({ syncLayersOnDrag: true });

      map.pm.enableGlobalDragMode();
      shared.on('pm:dragend', () => {
        sharedDragEnds += 1;
      });

      const before = [dragged, onlyFirst, onlySecond, shared, outside].map(
        (layer) => map.latLngToContainerPoint(layer.getCenter())
      );

      const event = (point: [number, number]) => ({
        originalEvent: { button: 0 },
        target: dragged,
        latlng: map.containerPointToLatLng(point),
      });
      dragged.pm._dragMixinOnMouseDown(event([120, 120]));
      dragged.pm._dragMixinOnMouseMove(event([170, 150]));
      dragged.pm._dragMixinOnMouseUp(event([170, 150]));

      const shift = [dragged, onlyFirst, onlySecond, shared, outside].map(
        (layer, i) =>
          map
            .latLngToContainerPoint(layer.getCenter())
            .subtract(before[i])
            .round()
      );
      expect(shift[0].x).to.eq(50);
      expect(shift[0].y).to.eq(30);
      // Each layer of either group moves by the same offset, once.
      [shift[1], shift[2], shift[3]].forEach((s) => {
        expect(s.x).to.eq(50);
        expect(s.y).to.eq(30);
      });
      expect(shift[4].x).to.eq(0);
      expect(shift[4].y).to.eq(0);
    });

    // pm:dragend fires on a timeout after the release.
    cy.wait(50);
    cy.then(() => {
      expect(sharedDragEnds).to.eq(1);
    });
  });
});
