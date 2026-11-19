describe('Combining modes', () => {
  const mapSelector = '#map';

  const round = (map: L.Map, latlng: L.LatLng) => {
    const point = map.latLngToContainerPoint(latlng);
    return { x: Math.round(point.x), y: Math.round(point.y) };
  };
  const vertices = (map: L.Map, layer: L.Polygon) =>
    (layer.getLatLngs() as L.LatLng[][])[0].map((latlng) => round(map, latlng));
  const vertexMarkers = (map: L.Map, layer: L.Polygon) =>
    (layer.pm._markers as L.Marker[][])[0].map((marker) =>
      round(map, marker.getLatLng())
    );
  // A 200 x 150 px rectangle drawn as a polygon, centered on (300, 275).
  const addPolygon = () =>
    cy.window().then(({ map, L }) => {
      const at = (x: number, y: number) => map.containerPointToLatLng([x, y]);
      const polygon = new L.Polygon([
        at(200, 200),
        at(400, 200),
        at(400, 350),
        at(200, 350),
      ]).addTo(map);
      cy.wrap(polygon).as('polygon');
    });
  const pointerDrag = (from: [number, number], to: [number, number]) => {
    const mid: [number, number] = [
      (from[0] + to[0]) / 2,
      (from[1] + to[1]) / 2,
    ];
    cy.get(mapSelector).trigger('pointerdown', ...from, { which: 1 });
    cy.get(mapSelector).trigger('pointermove', ...mid, { which: 1 });
    cy.get(mapSelector).trigger('pointermove', ...to, { which: 1 });
    cy.get(mapSelector).trigger('pointerup', ...to, { which: 1 });
  };
  const buttonOf = (icon: string) =>
    cy.toolbarButton(icon).closest('.button-container');

  describe('by default', () => {
    it('keeps the global modes exclusive', () => {
      addPolygon();
      cy.window().then(({ map }) => {
        const pairs = [
          ['Edit', 'Drag'],
          ['Drag', 'Rotate'],
          ['Edit', 'Rotate'],
          ['Drag', 'Removal'],
        ] as const;
        const pm = map.pm as unknown as Record<string, () => void>;
        for (const [a, b] of pairs) {
          pm[`enableGlobal${a}Mode`]();
          pm[`enableGlobal${b}Mode`]();
          expect(map.pm.unstable_activeModes()).to.eql([b.toLowerCase()]);
          pm[`disableGlobal${b}Mode`]();
        }
      });
    });

    it('keeps the toolbar buttons exclusive', () => {
      addPolygon();
      cy.toolbarButton('edit').click();
      cy.toolbarButton('drag').click();
      cy.toolbarButton('rotate').click();
      buttonOf('edit').should('not.have.class', 'active');
      buttonOf('drag').should('not.have.class', 'active');
      buttonOf('rotate').should('have.class', 'active');
    });

    it('turns layer edit off when layer drag turns on', () => {
      addPolygon();
      cy.get<L.Polygon>('@polygon').then((polygon) => {
        polygon.pm.enable();
        polygon.pm.enableLayerDrag();
        expect(polygon.pm.enabled()).to.eq(false);
        expect(polygon.pm.layerDragEnabled()).to.eq(true);
      });
    });
  });
});
