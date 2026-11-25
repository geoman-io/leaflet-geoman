// map.pm.unstable_validators: checks a change before it is applied (draw,
// drag, rotate) or right after (vertex edits, which a veto resets).
type Win = Cypress.AUTWindow;
type Change = { action: string; shape: string; layer: L.Layer };

function pointer(win: Win, type: string, x: number, y: number) {
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
  });
}

function square(win: Win, x: number, y: number, size = 50) {
  const { map, L: Lf } = win;
  return new Lf.Polygon(
    [
      [x, y],
      [x + size, y],
      [x + size, y + size],
      [x, y + size],
    ].map((p) => map.containerPointToLatLng(p as L.PointTuple))
  ).addTo(map);
}

// Records every change and vetoes the actions in `vetoed`
function validator(win: Win) {
  const seen: Change[] = [];
  const vetoed = new Set<string>();
  win.map.pm.unstable_validators.push((c: Change) => {
    seen.push(c);
    return !vetoed.has(c.action);
  });
  return { seen, vetoed };
}

function dragMarker(marker: L.Marker, to: L.LatLng) {
  marker.fire('dragstart', { target: marker });
  marker.setLatLng(to);
  marker.fire('drag', { target: marker });
  marker.fire('dragend', { target: marker });
}

const json = (layer: { getLatLngs(): unknown }) =>
  JSON.stringify(layer.getLatLngs());

describe('unstable_validators', () => {
  it('skips vetoed drag frames, then catches up to the pointer', () => {
    cy.window().then((w) => {
      const win = w as Win;
      const { map } = win;
      const layer = square(win, 100, 150);
      const { seen, vetoed } = validator(win);
      map.pm.enableGlobalDragMode();
      const c = map.getContainer();
      const start = map.latLngToContainerPoint(layer.getCenter());
      const path = (layer as unknown as { _path: Element })._path;

      path.dispatchEvent(pointer(win, 'pointerdown', 125, 175));
      c.dispatchEvent(pointer(win, 'pointermove', 135, 180));
      const afterFirst = map.latLngToContainerPoint(layer.getCenter());
      vetoed.add('drag');
      c.dispatchEvent(pointer(win, 'pointermove', 145, 185));
      c.dispatchEvent(pointer(win, 'pointermove', 155, 190));
      // vetoed frames don't move the layer
      const vetoedAt = map.latLngToContainerPoint(layer.getCenter());
      expect(Math.round(vetoedAt.x)).to.eq(Math.round(afterFirst.x));
      vetoed.delete('drag');
      c.dispatchEvent(pointer(win, 'pointermove', 165, 195));
      c.dispatchEvent(pointer(win, 'pointerup', 165, 195));

      const end = map.latLngToContainerPoint(layer.getCenter());
      // the whole 40 x 20 px reached the layer in the first allowed frame
      expect([
        Math.round(end.x - start.x),
        Math.round(end.y - start.y),
      ]).to.deep.eq([40, 20]);
      const drags = seen.filter((s) => s.action === 'drag');
      expect(drags.length).to.eq(4);
      expect(drags[0].layer).to.eq(layer);
      expect(drags[0].shape).to.eq('Polygon');
    });
  });

  it('leaves both rotation layers as they were on a vetoed frame', () => {
    cy.window().then((w) => {
      const win = w as Win;
      const { map } = win;
      const layer = square(win, 200, 200, 100);
      const { seen, vetoed } = validator(win);
      layer.pm.enableRotate();
      const helper = layer.pm._rotatePoly;
      const handle = helper.pm._rotateHandle;
      const before = json(layer);
      const helperBefore = json(helper);
      vetoed.add('rotate');
      handle.fire('dragstart', { target: handle });
      handle.setLatLng(map.containerPointToLatLng([400, 250]));
      handle.fire('drag', { target: handle });
      expect(json(layer)).to.eq(before);
      expect(json(helper)).to.eq(helperBefore);
      expect(layer.pm.getAngle()).to.eq(0);
      const rotate = seen.find((s) => s.action === 'rotate') as Change & {
        latlngs: L.LatLng[][];
      };
      expect(rotate.layer).to.eq(layer);
      // the payload is the rotation the veto prevented
      expect(JSON.stringify(rotate.latlngs)).not.to.eq(before);

      vetoed.delete('rotate');
      handle.fire('drag', { target: handle });
      handle.fire('dragend', { target: handle });
      expect(json(layer)).not.to.eq(before);
      expect(layer.pm.getAngle()).to.be.greaterThan(0);
    });
  });

  it('refuses vetoed vertices and finishes while drawing', () => {
    let state: ReturnType<typeof validator>;
    cy.window().then((w) => {
      state = validator(w as Win);
      state.vetoed.add('draw:vertex');
    });
    cy.toolbarButton('polygon').click();
    cy.get('#map').click(150, 150);
    cy.window().then(({ map }) => {
      const tool = map.pm.Draw.Polygon;
      expect(tool._layer.getLatLngs()).to.have.length(0);
      const vertex = state.seen.find((s) => s.action === 'draw:vertex')!;
      expect(vertex.shape).to.eq('Polygon');
      expect(vertex.layer).to.eq(tool._layer);
      state.vetoed.clear();
      state.vetoed.add('draw:finish');
    });
    cy.get('#map')
      .click(150, 150)
      .click(250, 150)
      .click(250, 250)
      .click(150, 150);
    cy.window().then(({ map }) => {
      // the finish was refused: nothing created, still drawing
      expect(map.pm.getGeomanDrawLayers()).to.have.length(0);
      expect(map.pm.Draw.Polygon.enabled()).to.eq(true);
      expect(map.pm.Draw.Polygon._layer.getLatLngs()).to.have.length(3);
      state.vetoed.clear();
    });
    cy.get('#map').click(150, 150);
    cy.hasDrawnLayers(1);
  });

  it('resets vetoed vertex moves and removals', () => {
    cy.window().then((w) => {
      const win = w as Win;
      const { map } = win;
      const layer = square(win, 200, 200, 100);
      const { seen, vetoed } = validator(win);
      const resets: any[] = [];
      layer.on('pm:layerreset', (e: unknown) => resets.push(e));
      layer.pm.enable();
      const before = json(layer);

      vetoed.add('edit:vertexmove');
      dragMarker(
        (layer.pm as any)._markers[0][0],
        map.containerPointToLatLng([150, 150])
      );
      expect(json(layer)).to.eq(before);
      expect(resets).to.have.length(1);
      // the validator saw the change it vetoed
      expect(seen.find((s) => s.action === 'edit:vertexmove')!.layer).to.eq(
        layer
      );

      vetoed.add('edit:vertexremove');
      const removed = (layer.pm as any)._markers[0][1];
      removed.fire('contextmenu', { target: removed });
      expect(json(layer)).to.eq(before);
      expect((layer.pm as any)._markers[0]).to.have.length(4);
      // a vetoed removal resets and fires pm:layerreset, like a move
      expect(resets).to.have.length(2);
      expect(resets[1].indexPath).to.deep.equal([0, 1]);
      expect(resets[1].markerEvent.marker).to.equal(removed);

      vetoed.clear();
      dragMarker(
        (layer.pm as any)._markers[0][0],
        map.containerPointToLatLng([150, 150])
      );
      expect(json(layer)).not.to.eq(before);
      expect(resets).to.have.length(2);
    });
  });

  it('resets vetoed rectangle corner drags and circle resizes', () => {
    cy.window().then((w) => {
      const win = w as Win;
      const { map, L: Lf } = win;
      const rect = new Lf.Rectangle([
        map.containerPointToLatLng([200, 200]),
        map.containerPointToLatLng([300, 300]),
      ]).addTo(map);
      const circle = new Lf.Circle(map.containerPointToLatLng([500, 250]), {
        radius: 500,
      }).addTo(map);
      const { vetoed } = validator(win);
      vetoed.add('edit:vertexmove');

      rect.pm.enable();
      const before = json(rect);
      dragMarker(
        (rect.pm as any)._cornerMarkers[0],
        map.containerPointToLatLng([150, 150])
      );
      expect(json(rect)).to.eq(before);
      // the reset corners still resize once the veto is lifted
      vetoed.clear();
      dragMarker(
        (rect.pm as any)._cornerMarkers[0],
        map.containerPointToLatLng([150, 150])
      );
      expect(json(rect)).not.to.eq(before);
      vetoed.add('edit:vertexmove');

      circle.pm.enable();
      const radius = circle.getRadius();
      const outer = (circle.pm as any)._outerMarker;
      dragMarker(outer, map.containerPointToLatLng([600, 250]));
      expect(circle.getRadius()).to.be.closeTo(radius, 1e-6);
      // the handle is back on the circle
      const handlePx = map.latLngToContainerPoint(
        (circle.pm as any)._outerMarker.getLatLng()
      );
      const centerPx = map.latLngToContainerPoint(circle.getLatLng());
      expect(Math.round(handlePx.distanceTo(centerPx))).to.eq(
        Math.round(circle._pxRadius)
      );

      vetoed.clear();
      dragMarker(
        (circle.pm as any)._outerMarker,
        map.containerPointToLatLng([600, 250])
      );
      expect(circle.getRadius()).to.be.greaterThan(radius);
    });
  });
});
