// EditLine.unstable_addMarkerFilter: narrows the vertex markers an editor
// shows, inside Free's own limit pass.
type Win = Cypress.AUTWindow;

const ll = (win: Win, x: number, y: number) =>
  win.map.containerPointToLatLng([x, y]);

// a ring of 8 vertices around (300, 300)
function octagon(win: Win) {
  return new win.L.Polygon(
    Array.from({ length: 8 }, (_, i) => {
      const a = (i / 8) * 2 * Math.PI;
      return ll(win, 300 + 100 * Math.cos(a), 300 + 100 * Math.sin(a));
    })
  ).addTo(win.map);
}

// the vertex markers on the map, by vertex index
const shown = (pm: any) =>
  (pm._markers[0] as L.Marker[])
    .map((m, i) => (pm._markerGroup.hasLayer(m) ? i : -1))
    .filter((i) => i > -1);

function pointer(win: Win, x: number, y: number) {
  const rect = win.map.getContainer().getBoundingClientRect();
  win.map.getContainer().dispatchEvent(
    new win.PointerEvent('pointermove', {
      clientX: rect.left + x,
      clientY: rect.top + y,
      pointerId: 1,
      isPrimary: true,
      bubbles: true,
    })
  );
}

describe('EditLine.unstable_addMarkerFilter', () => {
  it('filters on enable and on refreshes the caller binds, with no count limit', () => {
    cy.window().then((w) => {
      const win = w as Win;
      const layer = octagon(win);
      const pm = layer.pm as any;
      let keepEven = true;
      // a filter that keeps the even vertices, or none
      win.L.PM.Edit.Line.unstable_addMarkerFilter(
        (editor: any, markers: L.Marker[]) =>
          keepEven
            ? markers.filter((m) => editor._markers[0].indexOf(m) % 2 === 0)
            : []
      );
      layer.pm.enable();
      expect(layer.pm.options.limitMarkersToCount).to.eq(-1);
      // applied on enable
      expect(shown(pm)).to.deep.eq([0, 2, 4, 6]);

      // Free binds nothing new for the filter: a pointer move changes nothing
      keepEven = false;
      pointer(win, 300, 300);
    });
    cy.wait(150);
    cy.window().then((w) => {
      const win = w as Win;
      const layer = win.map.pm.getGeomanLayers()[0] as L.Polygon;
      const pm = layer.pm as any;
      expect(shown(pm)).to.deep.eq([0, 2, 4, 6]);
      // the caller's own trigger refreshes it
      pm.applyLimitFilters({ latlng: ll(win, 300, 300) });
      expect(shown(pm)).to.deep.eq([]);
    });
  });

  it('gets the markers limitMarkersToCount kept, and runs in the throttled pass', () => {
    const calls: { count: number; latlng: L.LatLngExpression }[] = [];
    cy.window().then((w) => {
      const win = w as Win;
      const layer = octagon(win);
      win.L.PM.Edit.Line.unstable_addMarkerFilter(
        (editor: any, markers: L.Marker[], latlng: L.LatLngExpression) => {
          calls.push({ count: markers.length, latlng });
          // drops the closest marker
          return markers.slice(1);
        }
      );
      layer.pm.enable({ limitMarkersToCount: 5 });
      calls.length = 0;
      // closest to vertex 0, at (400, 300)
      pointer(win, 420, 300);
    });
    cy.wait(150);
    cy.window().then((w) => {
      const win = w as Win;
      const pm = (win.map.pm.getGeomanLayers()[0] as L.Polygon).pm as any;
      expect(calls).to.have.length.of.at.least(1);
      expect(calls.every((c) => c.count === 5)).to.eq(true);
      const p = win.map.latLngToContainerPoint(calls[0].latlng as L.LatLng);
      expect([Math.round(p.x), Math.round(p.y)]).to.deep.eq([420, 300]);
      // vertex 0, its two middle markers, then vertices 1 and 7 are closest;
      // the filter dropped vertex 0
      expect(shown(pm)).to.have.members([1, 7]);
    });
  });

  it('changes nothing with no filter added', () => {
    cy.window().then((w) => {
      const win = w as Win;
      const layer = octagon(win);
      layer.pm.enable({ limitMarkersToCount: 5 });
      pointer(win, 420, 300);
    });
    cy.wait(150);
    cy.window().then((w) => {
      const win = w as Win;
      const pm = (win.map.pm.getGeomanLayers()[0] as L.Polygon).pm as any;
      expect(shown(pm)).to.have.members([0, 1, 7]);
    });
  });
});
