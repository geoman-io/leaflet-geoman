// Layer drag driven by DOM pointer events, as a user drags.
type Win = Cypress.AUTWindow;

const EVENTS = [
  'pm:dragstart',
  'pm:drag',
  'pm:dragend',
  'pm:edit',
  'pm:change',
] as const;

function pointer(win: Win, type: string, x: number, y: number, extra = {}) {
  const rect = win.map.getContainer().getBoundingClientRect();
  return new win.PointerEvent(type, {
    clientX: rect.left + x,
    clientY: rect.top + y,
    button: 0,
    buttons: type === 'pointerup' ? 0 : 1,
    pointerId: 1,
    isPrimary: true,
    bubbles: true,
    cancelable: true,
    ...extra,
  });
}

function square(map: L.Map, x: number, y: number) {
  return [
    [x, y],
    [x + 50, y],
    [x + 50, y + 50],
    [x, y + 50],
  ].map((p) => map.containerPointToLatLng(p as L.PointTuple));
}

// Polygons at x = 100, 180, 260... in one FeatureGroup, with an event log.
function polygons(win: Win, count: number, options: L.PolylineOptions = {}) {
  const { map, L: Lf } = win;
  const group = new Lf.FeatureGroup().addTo(map);
  const layers: L.Polygon[] = [];
  const log: string[] = [];
  for (let i = 0; i < count; i++) {
    const layer = new Lf.Polygon(square(map, 100 + i * 80, 150), options);
    layer.addTo(group);
    EVENTS.forEach((type) => layer.on(type, () => log.push(`${i}:${type}`)));
    layers.push(layer);
  }
  return { group, layers, log };
}

function count(log: string[], entry: string) {
  return log.filter((l) => l === entry).length;
}

function movedPx(map: L.Map, layer: L.Polygon, before: L.LatLng) {
  const a = map.latLngToContainerPoint(before);
  const b = map.latLngToContainerPoint(layer.getCenter());
  return [Math.round(b.x - a.x), Math.round(b.y - a.y)];
}

function pathOf(layer: L.Layer) {
  return (layer as unknown as { _path: Element })._path;
}

describe('Layer drag', () => {
  it('drags one layer and restores map panning after release', () => {
    cy.window().then((w) => {
      const win = w as Win;
      const { map } = win;
      const { layers, log } = polygons(win, 2);
      map.pm.enableGlobalDragMode();
      const before = layers.map((l) => l.getCenter());
      const c = map.getContainer();

      pathOf(layers[0]).dispatchEvent(pointer(win, 'pointerdown', 125, 175));
      expect(map.dragging.enabled()).to.eq(true);
      c.dispatchEvent(pointer(win, 'pointermove', 135, 180));
      expect(map.dragging.enabled()).to.eq(false);
      expect(layers[0].pm.dragging()).to.eq(true);
      c.dispatchEvent(pointer(win, 'pointermove', 145, 185));
      c.dispatchEvent(pointer(win, 'pointermove', 155, 190));
      c.dispatchEvent(pointer(win, 'pointerup', 155, 190));
      expect(map.dragging.enabled()).to.eq(true);

      expect(movedPx(map, layers[0], before[0])).to.deep.eq([30, 15]);
      expect(movedPx(map, layers[1], before[1])).to.deep.eq([0, 0]);
      expect(count(log, '0:pm:dragstart')).to.eq(1);
      expect(count(log, '0:pm:drag')).to.eq(3);
      expect(count(log, '0:pm:change')).to.eq(3);
      expect(log.some((l) => l.startsWith('1:'))).to.eq(false);
    });

    // pm:dragend and pm:edit fire 10 ms after the release
    cy.wait(50);
    cy.window().then((w) => {
      const win = w as Win;
      const layer = win.map.pm.getGeomanLayers()[0] as L.Polygon;
      expect(layer.pm.dragging()).to.eq(false);
    });
  });

  it('fires dragend and edit once, after the release', () => {
    const fired: string[] = [];
    cy.window().then((w) => {
      const win = w as Win;
      const { map } = win;
      const { layers, log } = polygons(win, 1);
      map.pm.enableGlobalDragMode();
      const c = map.getContainer();
      pathOf(layers[0]).dispatchEvent(pointer(win, 'pointerdown', 125, 175));
      c.dispatchEvent(pointer(win, 'pointermove', 135, 180));
      c.dispatchEvent(pointer(win, 'pointerup', 135, 180));
      expect(count(log, '0:pm:dragend')).to.eq(0);
      cy.wait(50).then(() => fired.push(...log));
    });
    cy.wrap(fired).should((f) => {
      expect(f.filter((l) => !/pm:(drag|change)$/.test(l))).to.deep.eq([
        '0:pm:dragstart',
        '0:pm:dragend',
        '0:pm:edit',
      ]);
    });
  });

  it('sends pm:drag with the layer, its shape and the pointer position', () => {
    cy.window().then((w) => {
      const win = w as Win;
      const { map } = win;
      const { layers } = polygons(win, 1);
      map.pm.enableGlobalDragMode();
      let payload: Record<string, unknown> | undefined;
      layers[0].on('pm:drag', (e) => {
        payload = e as unknown as Record<string, unknown>;
      });
      pathOf(layers[0]).dispatchEvent(pointer(win, 'pointerdown', 125, 175));
      map.getContainer().dispatchEvent(pointer(win, 'pointermove', 135, 180));

      expect(payload!.layer).to.eq(layers[0]);
      expect(payload!.shape).to.eq('Polygon');
      expect(payload!.source).to.eq('Edit');
      const latlng = payload!.latlng as L.LatLng;
      expect(latlng.equals(map.containerPointToLatLng([135, 180]))).to.eq(true);
      map.getContainer().dispatchEvent(pointer(win, 'pointerup', 135, 180));
    });
  });

  it('moves every layer of the group by the same distance with syncLayersOnDrag', () => {
    let log: string[];
    cy.window().then((w) => {
      const win = w as Win;
      const { map } = win;
      const made = polygons(win, 3);
      log = made.log;
      map.pm.setGlobalOptions({ syncLayersOnDrag: true });
      map.pm.enableGlobalDragMode();
      const before = made.layers.map((l) => l.getCenter());
      const c = map.getContainer();

      pathOf(made.layers[0]).dispatchEvent(
        pointer(win, 'pointerdown', 125, 175)
      );
      c.dispatchEvent(pointer(win, 'pointermove', 135, 180));
      c.dispatchEvent(pointer(win, 'pointermove', 145, 185));
      c.dispatchEvent(pointer(win, 'pointermove', 155, 190));
      c.dispatchEvent(pointer(win, 'pointerup', 155, 190));

      made.layers.forEach((layer, i) => {
        expect(movedPx(map, layer, before[i])).to.deep.eq([30, 15]);
      });
      expect(map.dragging.enabled()).to.eq(true);
      // The pressed layer starts first.
      expect(log[0]).to.eq('0:pm:dragstart');
    });
    cy.wait(50);
    cy.wrap(null).then(() => {
      [0, 1, 2].forEach((i) => {
        expect(count(log, `${i}:pm:dragstart`)).to.eq(1);
        expect(count(log, `${i}:pm:dragend`)).to.eq(1);
        expect(count(log, `${i}:pm:edit`)).to.eq(1);
        expect(count(log, `${i}:pm:drag`)).to.be.at.least(3);
      });
    });
  });

  it('syncs the layers of a group passed in syncLayersOnDrag', () => {
    cy.window().then((w) => {
      const win = w as Win;
      const { map } = win;
      const { layers, group } = polygons(win, 3);
      map.pm.setGlobalOptions({ syncLayersOnDrag: [group] as never });
      map.pm.enableGlobalDragMode();
      const before = layers.map((l) => l.getCenter());
      const c = map.getContainer();
      pathOf(layers[1]).dispatchEvent(pointer(win, 'pointerdown', 205, 175));
      c.dispatchEvent(pointer(win, 'pointermove', 215, 195));
      c.dispatchEvent(pointer(win, 'pointerup', 215, 195));
      layers.forEach((layer, i) => {
        expect(movedPx(map, layer, before[i])).to.deep.eq([10, 20]);
      });
    });
  });

  it('does not move a synced layer that is not draggable', () => {
    cy.window().then((w) => {
      const win = w as Win;
      const { map } = win;
      const { layers } = polygons(win, 3);
      map.pm.setGlobalOptions({ syncLayersOnDrag: true });
      map.pm.enableGlobalDragMode();
      layers[2].pm.setOptions({ draggable: false });
      const before = layers.map((l) => l.getCenter());
      const c = map.getContainer();
      pathOf(layers[0]).dispatchEvent(pointer(win, 'pointerdown', 125, 175));
      c.dispatchEvent(pointer(win, 'pointermove', 145, 175));
      c.dispatchEvent(pointer(win, 'pointerup', 145, 175));
      expect(movedPx(map, layers[0], before[0])).to.deep.eq([20, 0]);
      expect(movedPx(map, layers[1], before[1])).to.deep.eq([20, 0]);
      expect(movedPx(map, layers[2], before[2])).to.deep.eq([0, 0]);
    });
  });

  for (const release of ['outside the map', 'window blur'] as const) {
    it(`ends a synced drag on release ${release}`, () => {
      let log: string[];
      cy.window().then((w) => {
        const win = w as Win;
        const { map } = win;
        const made = polygons(win, 3);
        log = made.log;
        map.pm.setGlobalOptions({ syncLayersOnDrag: true });
        map.pm.enableGlobalDragMode();
        const c = map.getContainer();
        pathOf(made.layers[0]).dispatchEvent(
          pointer(win, 'pointerdown', 125, 175)
        );
        c.dispatchEvent(pointer(win, 'pointermove', 145, 175));
        expect(map.dragging.enabled()).to.eq(false);
        if (release === 'outside the map') {
          win.document.body.dispatchEvent(pointer(win, 'pointerup', -50, -50));
        } else {
          win.dispatchEvent(new win.FocusEvent('blur'));
        }
        expect(map.dragging.enabled()).to.eq(true);

        // A later move does not move anything.
        const centers = made.layers.map((l) => l.getCenter());
        c.dispatchEvent(pointer(win, 'pointermove', 300, 300));
        made.layers.forEach((l, i) => {
          expect(l.getCenter().equals(centers[i])).to.eq(true);
        });
      });
      cy.wait(50);
      cy.wrap(null).then(() => {
        [0, 1, 2].forEach((i) => {
          expect(count(log, `${i}:pm:dragend`)).to.eq(1);
          expect(count(log, `${i}:pm:edit`)).to.eq(1);
        });
      });
    });
  }

  it('ignores a second pointer and the right button', () => {
    cy.window().then((w) => {
      const win = w as Win;
      const { map } = win;
      const { layers, log } = polygons(win, 1);
      map.pm.enableGlobalDragMode();
      const before = layers[0].getCenter();
      const c = map.getContainer();

      // right button: no drag
      const right = { button: 2, buttons: 2 };
      pathOf(layers[0]).dispatchEvent(
        pointer(win, 'pointerdown', 125, 175, right)
      );
      c.dispatchEvent(pointer(win, 'pointermove', 145, 175, right));
      c.dispatchEvent(pointer(win, 'pointerup', 145, 175, right));
      expect(log).to.deep.eq([]);
      expect(movedPx(map, layers[0], before)).to.deep.eq([0, 0]);

      // a second finger does not move the layer
      pathOf(layers[0]).dispatchEvent(pointer(win, 'pointerdown', 125, 175));
      c.dispatchEvent(pointer(win, 'pointermove', 135, 175));
      c.dispatchEvent(
        pointer(win, 'pointermove', 400, 400, {
          pointerId: 2,
          isPrimary: false,
        })
      );
      c.dispatchEvent(
        pointer(win, 'pointerup', 400, 400, { pointerId: 2, isPrimary: false })
      );
      expect(movedPx(map, layers[0], before)).to.deep.eq([10, 0]);
      expect(map.dragging.enabled()).to.eq(false);
      c.dispatchEvent(pointer(win, 'pointerup', 135, 175));
      expect(map.dragging.enabled()).to.eq(true);
    });
  });

  it('keeps following the pointer until release when drag mode is turned off mid-drag', () => {
    let log: string[];
    cy.window().then((w) => {
      const win = w as Win;
      const { map } = win;
      const made = polygons(win, 1);
      log = made.log;
      map.pm.enableGlobalDragMode();
      const before = made.layers[0].getCenter();
      const c = map.getContainer();
      pathOf(made.layers[0]).dispatchEvent(
        pointer(win, 'pointerdown', 125, 175)
      );
      c.dispatchEvent(pointer(win, 'pointermove', 135, 175));
      map.pm.disableGlobalDragMode();
      expect(map.dragging.enabled()).to.eq(true);
      c.dispatchEvent(pointer(win, 'pointermove', 145, 175));
      c.dispatchEvent(pointer(win, 'pointerup', 145, 175));
      expect(movedPx(map, made.layers[0], before)).to.deep.eq([20, 0]);
      expect(map.dragging.enabled()).to.eq(true);
    });
    cy.wait(50);
    cy.wrap(null).then(() => {
      expect(count(log, '0:pm:dragend')).to.eq(1);
      expect(count(log, '0:pm:edit')).to.eq(1);
    });
  });

  it('drags a marker and a layer drawn on a canvas', () => {
    cy.window().then((w) => {
      const win = w as Win;
      const { map, L: Lf } = win;
      const marker = new Lf.Marker(
        map.containerPointToLatLng([400, 300])
      ).addTo(map);
      const canvas = new Lf.Polygon(square(map, 100, 300), {
        renderer: new Lf.Canvas(),
      }).addTo(map);
      map.pm.enableGlobalDragMode();
      const c = map.getContainer();

      const markerBefore = map.latLngToContainerPoint(marker.getLatLng());
      (marker as unknown as { _icon: Element })._icon.dispatchEvent(
        pointer(win, 'pointerdown', 400, 295)
      );
      c.dispatchEvent(pointer(win, 'pointermove', 420, 305));
      c.dispatchEvent(pointer(win, 'pointerup', 420, 305));
      const markerAfter = map.latLngToContainerPoint(marker.getLatLng());
      expect([
        Math.round(markerAfter.x - markerBefore.x),
        Math.round(markerAfter.y - markerBefore.y),
      ]).to.deep.eq([20, 10]);

      const canvasBefore = canvas.getCenter();
      const el = (canvas as unknown as { _renderer: { _container: Element } })
        ._renderer._container;
      el.dispatchEvent(pointer(win, 'pointerdown', 125, 325));
      c.dispatchEvent(pointer(win, 'pointermove', 135, 345));
      c.dispatchEvent(pointer(win, 'pointerup', 135, 345));
      expect(movedPx(map, canvas, canvasBefore)).to.deep.eq([10, 20]);
      expect(map.dragging.enabled()).to.eq(true);
    });
  });
});
