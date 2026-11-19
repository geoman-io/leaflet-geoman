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
  const combine = () =>
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({ combineModes: true });
    });

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

  describe('with combineModes', () => {
    beforeEach(() => {
      combine();
      addPolygon();
    });

    it('keeps edit, drag and rotate on together', () => {
      cy.window().then(({ map }) => {
        map.pm.enableGlobalEditMode();
        map.pm.enableGlobalDragMode();
        map.pm.enableGlobalRotateMode();
        expect(map.pm.unstable_activeModes()).to.have.members([
          'edit',
          'drag',
          'rotate',
        ]);
      });
      cy.get<L.Polygon>('@polygon').then((polygon) => {
        expect(polygon.pm.enabled()).to.eq(true);
        expect(polygon.pm.layerDragEnabled()).to.eq(true);
        expect(polygon.pm.rotateEnabled()).to.eq(true);
      });
    });

    it('still turns them off for removal and drawing', () => {
      cy.window().then(({ map }) => {
        map.pm.enableGlobalEditMode();
        map.pm.enableGlobalDragMode();
        map.pm.enableGlobalRemovalMode();
        expect(map.pm.unstable_activeModes()).to.eql(['removal']);

        map.pm.enableGlobalEditMode();
        map.pm.enableGlobalRotateMode();
        map.pm.enableDraw('Polygon');
        expect(map.pm.unstable_activeModes()).to.eql(['draw:Polygon']);
      });
    });

    it('keeps the toolbar buttons on together', () => {
      cy.toolbarButton('edit').click();
      cy.toolbarButton('drag').click();
      cy.toolbarButton('rotate').click();
      for (const icon of ['edit', 'drag', 'rotate']) {
        buttonOf(icon).should('have.class', 'active');
      }
      cy.toolbarButton('delete').click();
      for (const icon of ['edit', 'drag', 'rotate']) {
        buttonOf(icon).should('not.have.class', 'active');
      }
      cy.window().then(({ map }) => {
        expect(map.pm.unstable_activeModes()).to.eql(['removal']);
      });
    });

    it('keeps layer edit on when layer drag turns on', () => {
      cy.get<L.Polygon>('@polygon').then((polygon) => {
        polygon.pm.enable();
        polygon.pm.enableLayerDrag();
        expect(polygon.pm.enabled()).to.eq(true);
        expect(polygon.pm.layerDragEnabled()).to.eq(true);
      });
    });

    it('drags a vertex or the body depending on what is pressed', () => {
      cy.window().then(({ map }) => {
        map.pm.enableGlobalEditMode();
        map.pm.enableGlobalDragMode();
      });
      cy.get<L.Polygon>('@polygon').then((polygon) => {
        const edits: number[] = [];
        polygon.on('pm:edit', () => edits.push(1));
        cy.wrap(edits).as('edits');
      });

      // the top-left vertex moves alone
      pointerDrag([200, 200], [180, 170]);
      cy.window().then(({ map }) => {
        cy.get<L.Polygon>('@polygon').then((polygon) => {
          expect(vertices(map, polygon)).to.eql([
            { x: 180, y: 170 },
            { x: 400, y: 200 },
            { x: 400, y: 350 },
            { x: 200, y: 350 },
          ]);
        });
      });

      // the body moves everything, and the vertex markers follow
      pointerDrag([300, 300], [350, 320]);
      cy.wait(50);
      cy.window().then(({ map }) => {
        cy.get<L.Polygon>('@polygon').then((polygon) => {
          const expected = [
            { x: 230, y: 190 },
            { x: 450, y: 220 },
            { x: 450, y: 370 },
            { x: 250, y: 370 },
          ];
          expect(vertices(map, polygon)).to.eql(expected);
          expect(vertexMarkers(map, polygon)).to.eql(expected);
          expect(polygon.pm.enabled()).to.eq(true);
          const group = (polygon.pm as unknown as { _markerGroup: L.Layer })
            ._markerGroup;
          expect(map.hasLayer(group)).to.eq(true);
        });
      });
      // shown once, not hidden or doubled; one pm:edit per drag
      cy.hasVertexMarkers(4);
      cy.hasMiddleMarkers(4);
      cy.get('@edits').should('have.length', 2);
    });

    it('keeps edit markers and the rotation in step', () => {
      cy.window().then(({ map }) => {
        map.pm.enableGlobalEditMode();
        map.pm.enableGlobalRotateMode();
      });

      // a quarter turn with the rotate handle, which starts at (300, 170)
      pointerDrag([300, 170], [405, 275]);
      cy.window().then(({ map }) => {
        cy.get<L.Polygon>('@polygon').then((polygon) => {
          expect(Math.round(polygon.pm.getAngle())).to.eq(90);
          expect(vertexMarkers(map, polygon)).to.eql(vertices(map, polygon));
        });
      });

      // a vertex edit after it: the next rotation starts from the edit
      cy.window().then(({ map }) => {
        cy.get<L.Polygon>('@polygon').then((polygon) => {
          const [x, y] = [
            vertices(map, polygon)[0].x,
            vertices(map, polygon)[0].y,
          ];
          pointerDrag([x, y], [x + 20, y]);
          cy.window().then(() => {
            const rotateSource = polygon.pm._rotatePoly.getLatLngs();
            expect(JSON.stringify(rotateSource)).to.eq(
              JSON.stringify(polygon.getLatLngs())
            );
            expect(Math.round(polygon.pm.getAngle())).to.eq(90);
          });
        });
      });
    });

    it('moves the rotate handle with a body drag', () => {
      cy.window().then(({ map }) => {
        map.pm.enableGlobalDragMode();
        map.pm.enableGlobalRotateMode();
        cy.wrap(map.getCenter()).as('view');
      });
      pointerDrag([300, 300], [340, 300]);
      cy.wait(50);
      cy.window().then(({ map }) => {
        cy.get<L.Polygon>('@polygon').then((polygon) => {
          expect(round(map, polygon.pm.getRotationCenter())).to.eql({
            x: 340,
            y: 275,
          });
          const handle = polygon.pm._rotatePoly.pm._rotateHandle;
          expect(round(map, handle.getLatLng())).to.eql({ x: 340, y: 170 });
          // the layer moved, not the map
          expect(polygon.pm.layerDragEnabled()).to.eq(true);
          cy.get<L.LatLng>('@view').then((view) => {
            expect(map.getCenter().equals(view)).to.eq(true);
          });
        });
      });
    });

    it('still drags the synced layers of a shape in edit mode', () => {
      cy.window().then(({ map, L }) => {
        cy.get<L.Polygon>('@polygon').then((polygon) => {
          const at = (x: number, y: number) =>
            map.containerPointToLatLng([x, y]);
          const other = new L.Polygon([
            at(500, 200),
            at(600, 200),
            at(600, 300),
          ]);
          new L.FeatureGroup([polygon, other]).addTo(map);
          map.pm.setGlobalOptions({ syncLayersOnDrag: true });
          map.pm.enableGlobalEditMode();
          map.pm.enableGlobalDragMode();
          cy.wrap(other).as('other');
        });
      });
      pointerDrag([300, 300], [340, 300]);
      cy.wait(50);
      cy.window().then(({ map }) => {
        cy.get<L.Polygon>('@other').then((other) => {
          expect(vertices(map, other)[0]).to.eql({ x: 540, y: 200 });
          expect(vertexMarkers(map, other)).to.eql(vertices(map, other));
        });
      });
    });

    it('adds a vertex with a middle marker while rotate is on', () => {
      cy.window().then(({ map }) => {
        map.pm.enableGlobalEditMode();
        map.pm.enableGlobalRotateMode();
      });
      // the middle marker of the top edge
      pointerDrag([300, 200], [300, 180]);
      cy.get<L.Polygon>('@polygon').then((polygon) => {
        expect((polygon.getLatLngs() as L.LatLng[][])[0]).to.have.length(5);
        expect(JSON.stringify(polygon.pm._rotatePoly.getLatLngs())).to.eq(
          JSON.stringify(polygon.getLatLngs())
        );
      });
      cy.hasVertexMarkers(5);
      cy.hasRotateHandles(1);
    });

    it('moves an editable circle once by its body', () => {
      cy.window().then(({ map, L }) => {
        const center = map.containerPointToLatLng([600, 300]);
        // 60 px wide
        const radius = center.distanceTo(
          map.containerPointToLatLng([660, 300])
        );
        const circle = new L.Circle(center, { radius }).addTo(map);
        const edits: number[] = [];
        circle.on('pm:edit', () => edits.push(1));
        circle.on('pm:markerdragend', () => edits.push(2));
        cy.wrap(edits).as('edits');
        cy.wrap(circle).as('circle');
        map.pm.enableGlobalEditMode();
        map.pm.enableGlobalDragMode();
      });
      // inside the circle, away from its center marker
      pointerDrag([600, 325], [640, 325]);
      cy.wait(50);
      cy.get('@edits').should('eql', [1]);
      cy.window().then(({ map }) => {
        cy.get<L.Circle>('@circle').then((circle) => {
          expect(round(map, circle.getLatLng())).to.eql({ x: 640, y: 300 });
          const center = (circle.pm as unknown as { _centerMarker: L.Marker })
            ._centerMarker;
          expect(round(map, center.getLatLng())).to.eql({ x: 640, y: 300 });
        });
      });
    });

    it('leaves active modes on when combineModes turns off', () => {
      // false only affects modes turned on later; nothing is turned off
      // and no active mode is picked over another
      cy.window().then(({ map }) => {
        map.pm.enableGlobalEditMode();
        map.pm.enableGlobalDragMode();
        map.pm.setGlobalOptions({ combineModes: false });
        expect(map.pm.unstable_activeModes()).to.have.members(['edit', 'drag']);
      });
      buttonOf('edit').should('have.class', 'active');
      buttonOf('drag').should('have.class', 'active');
      cy.window().then(({ map }) => {
        // the next mode turned on is exclusive again
        map.pm.enableGlobalRotateMode();
        expect(map.pm.unstable_activeModes()).to.eql(['rotate']);
      });
      buttonOf('edit').should('not.have.class', 'active');
      buttonOf('drag').should('not.have.class', 'active');
    });

    it('turns everything off cleanly on Escape during a body drag', () => {
      const counts = (events: Record<string, unknown[] | undefined>) =>
        Object.fromEntries(
          Object.entries(events).map(([type, list]) => [
            type,
            list?.length ?? 0,
          ])
        );
      type WithEvents = { _events: Record<string, unknown[] | undefined> };
      cy.window().then(({ map }) => {
        map.pm.setGlobalOptions({ exitModeOnEscape: true });
        cy.wrap(counts((map as unknown as WithEvents)._events)).as('before');
        cy.wrap(map.getCenter()).as('view');
        map.pm.enableGlobalEditMode();
        map.pm.enableGlobalDragMode();
        map.pm.enableGlobalRotateMode();
      });
      cy.get(mapSelector).trigger('pointerdown', 300, 300, { which: 1 });
      cy.get(mapSelector).trigger('pointermove', 320, 300, { which: 1 });
      cy.document().trigger('keydown', { key: 'Escape', code: 'Escape' });
      cy.get(mapSelector).trigger('pointermove', 340, 300, { which: 1 });
      cy.get(mapSelector).trigger('pointerup', 340, 300, { which: 1 });
      cy.wait(50);

      cy.window().then(({ map }) => {
        cy.get<L.Polygon>('@polygon').then((polygon) => {
          expect(map.pm.unstable_activeModes()).to.eql([]);
          // edit turns off when the drag ends instead of staying on
          expect(polygon.pm.enabled()).to.eq(false);
          expect(polygon.pm.layerDragEnabled()).to.eq(false);
          expect(polygon.pm.rotateEnabled()).to.eq(false);
          expect(map.dragging.enabled()).to.eq(true);
          // the drag itself finished, and moved the layer, not the map
          expect(vertices(map, polygon)[0]).to.eql({ x: 240, y: 200 });
          cy.get<L.LatLng>('@view').then((view) => {
            expect(map.getCenter().equals(view)).to.eq(true);
          });
          cy.get<Record<string, number>>('@before').then((before) => {
            const after = counts((map as unknown as WithEvents)._events);
            for (const type of new Set([
              ...Object.keys(before),
              ...Object.keys(after),
            ])) {
              expect(after[type] ?? 0, type).to.eq(before[type] ?? 0);
            }
          });
        });
      });
      cy.get('.marker-icon').should('not.exist');
    });

    it('keeps a marker draggable while edit or drag mode is still on', () => {
      cy.window().then(({ map, L }) => {
        const marker = new L.Marker(
          map.containerPointToLatLng([500, 300])
        ).addTo(map);
        map.pm.enableGlobalEditMode();
        map.pm.enableGlobalDragMode();
        expect(marker.pm.enabled()).to.eq(true);
        expect(marker.pm.layerDragEnabled()).to.eq(true);

        map.pm.disableGlobalDragMode();
        expect(marker.pm.enabled()).to.eq(true);
        expect(marker.pm.layerDragEnabled()).to.eq(true);

        map.pm.enableGlobalDragMode();
        map.pm.disableGlobalEditMode();
        expect(marker.pm.enabled()).to.eq(false);
        expect(marker.pm.layerDragEnabled()).to.eq(true);

        map.pm.disableGlobalDragMode();
        expect(marker.pm.layerDragEnabled()).to.eq(false);
      });
    });

    it('lets a registered mode with targets combine', () => {
      cy.window().then(({ map }) => {
        let on = false;
        const activate = map.pm.unstable_registerMode('scale', {
          enabled: () => on,
          disable: () => {
            on = false;
          },
          targets: ['scale-handle'],
        });
        map.pm.enableGlobalRotateMode();
        on = true;
        activate();
        expect(map.pm.unstable_activeModes()).to.have.members([
          'rotate',
          'scale',
        ]);
        map.pm.enableGlobalRemovalMode();
        expect(on).to.eq(false);
      });
    });
  });

  it('refreshes edit markers after a rotation without combineModes', () => {
    // Edit and rotate already stay on together for one layer.
    addPolygon();
    cy.get<L.Polygon>('@polygon').then((polygon) => {
      polygon.pm.enable();
      polygon.pm.enableRotate();
    });
    pointerDrag([300, 170], [405, 275]);
    cy.window().then(({ map }) => {
      cy.get<L.Polygon>('@polygon').then((polygon) => {
        expect(Math.round(polygon.pm.getAngle())).to.eq(90);
        expect(vertexMarkers(map, polygon)).to.eql(vertices(map, polygon));
        polygon.pm.rotateLayer(45);
        expect(vertexMarkers(map, polygon)).to.eql(vertices(map, polygon));
      });
    });
    cy.hasVertexMarkers(4);
  });

  it('refreshes edit markers after a body drag without combineModes', () => {
    // Drag then edit already leaves both on for one layer.
    addPolygon();
    cy.get<L.Polygon>('@polygon').then((polygon) => {
      polygon.pm.enableLayerDrag();
      polygon.pm.enable();
    });
    pointerDrag([300, 300], [340, 300]);
    cy.wait(50);
    cy.window().then(({ map }) => {
      cy.get<L.Polygon>('@polygon').then((polygon) => {
        expect(vertices(map, polygon)[0]).to.eql({ x: 240, y: 200 });
        expect(vertexMarkers(map, polygon)).to.eql(vertices(map, polygon));
      });
    });
  });
});
