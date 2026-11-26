// layer.pm.unstable_discardChanges(): after a cancel restored the layer, turning
// edit, drag or rotate off fires no pm:update.
type Win = Cypress.AUTWindow;
type Session = {
  layer: L.Layer;
  // makes one change in the mode
  change(): void;
  disable(): void;
};

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

function square(win: Win) {
  const { map, L: Lf } = win;
  return new Lf.Polygon(
    [
      [200, 200],
      [300, 200],
      [300, 300],
      [200, 300],
    ].map((p) => map.containerPointToLatLng(p as L.PointTuple))
  ).addTo(map);
}

function dragMarker(marker: L.Marker, to: L.LatLng) {
  marker.fire('dragstart', { target: marker });
  marker.setLatLng(to);
  marker.fire('drag', { target: marker });
  marker.fire('dragend', { target: marker });
}

const sessions: Record<string, (win: Win) => Session> = {
  'vertex edit': (win) => {
    const layer = square(win);
    layer.pm.enable();
    return {
      layer,
      change: () =>
        dragMarker(
          (layer.pm as any)._markers[0][0],
          win.map.containerPointToLatLng([180, 180])
        ),
      disable: () => layer.pm.disable(),
    };
  },
  'marker edit': (win) => {
    const layer = new win.L.Marker(
      win.map.containerPointToLatLng([450, 250])
    ).addTo(win.map);
    layer.pm.enable();
    // what the end of a marker drag in edit mode does
    return {
      layer,
      change: () => (layer.pm as any)._onDragEnd(),
      disable: () => layer.pm.disable(),
    };
  },
  'layer drag': (win) => {
    const layer = square(win);
    layer.pm.enableLayerDrag();
    return {
      layer,
      change: () => {
        const path = (layer as unknown as { _path: Element })._path;
        const c = win.map.getContainer();
        path.dispatchEvent(pointer(win, 'pointerdown', 250, 250));
        c.dispatchEvent(pointer(win, 'pointermove', 260, 255));
        c.dispatchEvent(pointer(win, 'pointerup', 260, 255));
      },
      disable: () => layer.pm.disableLayerDrag(),
    };
  },
  rotate: (win) => {
    const layer = square(win);
    layer.pm.enableRotate();
    return {
      layer,
      change: () => {
        const handle = (layer.pm as any)._rotatePoly.pm._rotateHandle;
        handle.fire('dragstart', { target: handle });
        handle.setLatLng(win.map.containerPointToLatLng([400, 250]));
        handle.fire('drag', { target: handle });
        handle.fire('dragend', { target: handle });
      },
      disable: () => layer.pm.disableRotate(),
    };
  },
};

describe('unstable_discardChanges', () => {
  Object.entries(sessions).forEach(([name, start]) => {
    it(`drops the pm:update of a ${name}`, () => {
      let win: Win;
      let session: Session;
      let updates = 0;
      cy.window().then((w) => {
        win = w as Win;
        session = start(win);
        session.layer.on('pm:update', () => (updates += 1));
        session.change();
      });
      // a layer drag ends its edit after a timeout
      cy.wait(50);
      cy.window().then(() => {
        (session.layer as any).pm.unstable_discardChanges();
        session.disable();
        expect(updates).to.eq(0);

        // a change in the next session counts again
        session = start(win);
        session.layer.on('pm:update', () => (updates += 1));
        session.change();
      });
      cy.wait(50);
      cy.window().then(() => {
        session.disable();
        expect(updates).to.eq(1);
      });
    });
  });

  it('also drops the edit a body drag marks when it finishes ending', () => {
    let win: Win;
    let layer: L.Polygon;
    let updates = 0;
    cy.window().then((w) => {
      win = w as Win;
      win.map.pm.setGlobalOptions({ combineModes: true });
      layer = square(win);
      layer.on('pm:update', () => (updates += 1));
      layer.pm.enable();
      layer.pm.enableLayerDrag();
      const path = (layer as unknown as { _path: Element })._path;
      const c = win.map.getContainer();
      path.dispatchEvent(pointer(win, 'pointerdown', 250, 250));
      c.dispatchEvent(pointer(win, 'pointermove', 260, 255));
      c.dispatchEvent(pointer(win, 'pointerup', 260, 255));
      // at once, before the drag's end marks the layer edited
      (layer as any).pm.unstable_discardChanges();
      layer.pm.disableLayerDrag();
      layer.pm.disable();
    });
    cy.wait(50);
    cy.window().then(() => {
      expect(layer.pm.enabled()).to.eq(false);
      expect(updates).to.eq(0);
      // a session without changes fires nothing either
      layer.pm.enable();
      layer.pm.disable();
      expect(updates).to.eq(0);
    });
  });

  it("forgets a focused text's change, which disable would count", () => {
    let layer: L.Marker;
    let textArea: HTMLTextAreaElement;
    let updates = 0;
    let edits = 0;
    cy.window().then(({ map, L: Lf }) => {
      layer = new Lf.Marker(map.getCenter(), {
        textMarker: true,
        text: 'A',
      }).addTo(map);
      layer.on('pm:update', () => (updates += 1));
      layer.pm.enable();
      textArea = (layer.pm as any).getElement();
    });
    // a kept change, then a second focus with more typing
    cy.window().then(() => cy.get(textArea).focus().type('B').blur());
    cy.window().then(() => cy.get(textArea).focus().type('C'));
    cy.window().then(() => {
      layer.on('pm:edit', () => (edits += 1));
      // the cancel restores the text while it is still focused
      (layer.pm as any).setText('A');
      (layer as any).pm.unstable_discardChanges();
      layer.pm.disable();
      expect(updates).to.eq(0);
      expect(edits).to.eq(0);
    });
  });
});
