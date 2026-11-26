// EditLine#unstable_insertVertex: inserts a vertex as a middle-marker insert
// does, without needing a middle marker.
type Win = Cypress.AUTWindow;

const ll = (win: Win, x: number, y: number) =>
  win.map.containerPointToLatLng([x, y]);
const px = (win: Win, latlngs: L.LatLng[]) =>
  latlngs.map((l) => {
    const p = win.map.latLngToContainerPoint(l);
    return [Math.round(p.x), Math.round(p.y)];
  });

function square(win: Win, options = {}) {
  return new win.L.Polygon(
    [
      ll(win, 200, 200),
      ll(win, 300, 200),
      ll(win, 300, 300),
      ll(win, 200, 300),
    ],
    options
  ).addTo(win.map);
}

function record(layer: L.Layer) {
  const events: { type: string; e: any }[] = [];
  ['pm:edit', 'pm:change', 'pm:vertexadded', 'pm:update'].forEach((type) =>
    layer.on(type, (e: any) => events.push({ type, e }))
  );
  return events;
}

const middleMarkers = (pm: any) =>
  pm._markerGroup.getLayers().filter((m: any) => m._middleMarkerPrev);

describe('EditLine#unstable_insertVertex', () => {
  it('inserts a vertex and fires what a middle-marker insert fires', () => {
    cy.window().then((w) => {
      const win = w as Win;
      const layer = square(win);
      const events = record(layer);
      const pm = layer.pm as any;
      layer.pm.enable();
      const at = ll(win, 250, 180);

      const marker = pm.unstable_insertVertex([0, 1], at);

      expect(px(win, (layer.getLatLngs() as L.LatLng[][])[0])).to.deep.eq([
        [200, 200],
        [250, 180],
        [300, 200],
        [300, 300],
        [200, 300],
      ]);
      // the caller's LatLng isn't shared
      expect((layer.getLatLngs() as L.LatLng[][])[0][1]).not.to.eq(at);
      expect(pm._markers[0]).to.have.length(5);
      expect(marker).to.eq(pm._markers[0][1]);
      expect(middleMarkers(pm)).to.have.length(5);
      expect(events.map((x) => x.type)).to.deep.eq([
        'pm:edit',
        'pm:change',
        'pm:vertexadded',
      ]);
      const added = events[2].e;
      expect(added.indexPath).to.deep.eq([0, 1]);
      expect(added.marker).to.eq(marker);
      expect(px(win, [added.latlng])).to.deep.eq([[250, 180]]);

      // the new vertex edits like any other
      marker.fire('dragstart', { target: marker });
      marker.setLatLng(ll(win, 250, 150));
      marker.fire('drag', { target: marker });
      marker.fire('dragend', { target: marker });
      expect(px(win, [(layer.getLatLngs() as L.LatLng[][])[0][1]])).to.deep.eq([
        [250, 150],
      ]);

      layer.pm.disable();
      expect(events.filter((x) => x.type === 'pm:update')).to.have.length(1);
    });
  });

  it('works with hideMiddleMarkers and on a line', () => {
    cy.window().then((w) => {
      const win = w as Win;
      const polygon = square(win);
      polygon.pm.enable({ hideMiddleMarkers: true });
      const pm = polygon.pm as any;
      pm.unstable_insertVertex([0, 4], ll(win, 180, 250));
      expect(pm._markers[0]).to.have.length(5);
      expect(middleMarkers(pm)).to.have.length(0);
      expect(
        px(win, [(polygon.getLatLngs() as L.LatLng[][])[0][4]])
      ).to.deep.eq([[180, 250]]);

      const line = new win.L.Polyline([
        ll(win, 400, 200),
        ll(win, 500, 200),
      ]).addTo(win.map);
      const events = record(line);
      line.pm.enable();
      (line.pm as any).unstable_insertVertex([1], ll(win, 450, 180));
      expect(px(win, line.getLatLngs() as L.LatLng[])).to.deep.eq([
        [400, 200],
        [450, 180],
        [500, 200],
      ]);
      expect(
        events.find((x) => x.type === 'pm:vertexadded')!.e.indexPath
      ).to.deep.eq([1]);
    });
  });

  it('refuses a path that is no vertex position, and does nothing when edit is off', () => {
    cy.window().then((w) => {
      const win = w as Win;
      const layer = square(win);
      const events = record(layer);
      const pm = layer.pm as any;
      const before = JSON.stringify(layer.getLatLngs());

      expect(pm.unstable_insertVertex([0, 1], ll(win, 250, 180))).to.eq(
        undefined
      );

      layer.pm.enable();
      [[0, 5], [0, -1], [1], [2, 0], [0, 1.5]].forEach((path) => {
        expect(() =>
          pm.unstable_insertVertex(path, ll(win, 250, 180))
        ).to.throw('No vertex position');
      });
      // the end of the ring is a position
      pm.unstable_insertVertex([0, 4], ll(win, 180, 250));
      expect(JSON.stringify(layer.getLatLngs())).not.to.eq(before);
      expect(events.filter((x) => x.type === 'pm:vertexadded')).to.have.length(
        1
      );
    });
  });
});
