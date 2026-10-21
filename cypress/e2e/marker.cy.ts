describe('Draw Marker', () => {
  const mapSelector = '#map';

  it('enables drag in programatic global edit mode', () => {
    cy.toolbarButton('marker').click();

    cy.wait(1000);

    cy.get(mapSelector).click(150, 250);

    cy.wait(1000);

    cy.window().then(({ map, L }) => {
      map.pm.enableGlobalEditMode();

      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          assert.isTrue(layer.pm.layerDragEnabled());
        }
      });
    });
  });

  it('preserves marker drag restrictions across drawing sessions', () => {
    let locked: L.Marker;
    let control: L.Marker;
    let lockedLatLng: L.LatLng;
    cy.window().then(({ map, L }) => {
      locked = L.marker(map.containerPointToLatLng([150, 250])).addTo(map);
      locked.pm.setOptions({ draggable: false });
      control = L.marker(map.containerPointToLatLng([350, 250])).addTo(map);
      lockedLatLng = locked.getLatLng();
      map.dragging.disable();
    });

    [true, false, true].forEach((markerEditable) => {
      cy.window().then(({ map }) => {
        map.pm.enableDraw('Marker', { markerEditable, snappable: false });
        expect(locked.pm.options.draggable).to.eq(false);
        expect(locked.pm.layerDragEnabled()).to.eq(false);
        expect(locked.dragging!.enabled()).to.eq(false);
        expect(control.pm.enabled()).to.eq(markerEditable);
        expect(control.pm.layerDragEnabled()).to.eq(markerEditable);
      });
      cy.window().then(
        ({ Hand }) =>
          new Cypress.Promise<void>((resolve) => {
            const hand = new Hand({ timing: 'frame', onStop: resolve });
            hand
              .growFinger('mouse')
              .moveTo(150, 240, 100)
              .down()
              .moveTo(200, 290, 200)
              .up();
          })
      );
      cy.get(mapSelector).click(500, 300);
      cy.window().then(({ map }) => {
        const markers = map.pm.getGeomanDrawLayers() as L.Marker[];
        const created = markers[markers.length - 1];
        expect(created.pm.enabled()).to.eq(markerEditable);
        expect(created.pm.layerDragEnabled()).to.eq(markerEditable);
        expect(locked.getLatLng()).to.eql(lockedLatLng);
        map.pm.disableDraw('Marker');
        expect(locked.pm.options.draggable).to.eq(false);
        expect(locked.dragging!.enabled()).to.eq(false);
        expect(locked.pm.layerDragEnabled()).to.eq(false);
      });
    });

    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({ draggable: false });
      map.pm.enableDraw('Marker', { markerEditable: true });
    });
    cy.get(mapSelector).click(550, 350);
    cy.window().then(({ map }) => {
      const markers = map.pm.getGeomanDrawLayers() as L.Marker[];
      const created = markers[markers.length - 1];
      expect(created.pm.options.draggable).to.eq(false);
      expect(created.pm.layerDragEnabled()).to.eq(false);
      expect(created.dragging!.enabled()).to.eq(false);
      map.pm.disableDraw('Marker');
    });
  });

  it('preserves local drag restrictions through global edit and drag modes', () => {
    let locked: L.Marker;
    let control: L.Marker;
    let lockedLatLng: L.LatLng;
    let controlLatLng: L.LatLng;
    cy.window().then(({ map, L }) => {
      locked = L.marker(map.containerPointToLatLng([150, 250])).addTo(map);
      locked.pm.setOptions({ draggable: false });
      control = L.marker(map.containerPointToLatLng([350, 250])).addTo(map);
      lockedLatLng = locked.getLatLng();
      controlLatLng = control.getLatLng();
      map.dragging.disable();
    });
    cy.toolbarButton('edit').click();
    cy.window().then(() => {
      expect(locked.pm.options.draggable).to.eq(false);
      expect(locked.pm.layerDragEnabled()).to.eq(false);
      expect(control.pm.layerDragEnabled()).to.eq(true);
    });
    cy.toolbarButton('edit').click();
    cy.toolbarButton('drag').click();
    cy.window().then(
      ({ Hand }) =>
        new Cypress.Promise<void>((resolve) => {
          const hand = new Hand({ timing: 'frame', onStop: resolve });
          hand
            .growFinger('mouse')
            .moveTo(150, 240, 100)
            .down()
            .moveTo(200, 290, 200)
            .up()
            .moveTo(350, 240, 100)
            .down()
            .moveTo(400, 290, 200)
            .up();
        })
    );
    cy.window().then(({ map }) => {
      expect(locked.getLatLng()).to.eql(lockedLatLng);
      expect(control.getLatLng()).not.to.eql(controlLatLng);
      map.pm.disableGlobalDragMode();
      map.pm.enableGlobalEditMode();
      expect(locked.pm.options.draggable).to.eq(false);
      expect(locked.pm.layerDragEnabled()).to.eq(false);
      map.pm.disableGlobalEditMode();
      map.pm.toggleGlobalEditMode();
      expect(locked.pm.options.draggable).to.eq(false);
      expect(locked.pm.layerDragEnabled()).to.eq(false);
      map.pm.disableGlobalEditMode();
      map.pm.enableGlobalDragMode();
      expect(locked.pm.layerDragEnabled()).to.eq(false);
      expect(control.pm.layerDragEnabled()).to.eq(true);
    });
  });

  it('preserves options on markers added during editing and honors explicit overrides', () => {
    let marker: L.Marker;
    cy.window().then(({ map, L }) => {
      map.pm.enableGlobalEditMode();
      marker = L.marker([51.505, -0.09]);
      marker.pm.setOptions({ draggable: false });
      marker.addTo(map);
    });
    cy.wait(150);
    cy.window().then(({ map }) => {
      expect(marker.pm.enabled()).to.eq(true);
      expect(marker.pm.options.draggable).to.eq(false);
      expect(marker.dragging!.enabled()).to.eq(false);
      map.pm.disableGlobalEditMode();
      map.pm.enableGlobalDragMode();
      expect(marker.pm.layerDragEnabled()).to.eq(false);
      map.pm.disableGlobalDragMode();
      map.pm.toggleGlobalEditMode({ draggable: true });
      expect(marker.pm.options.draggable).to.eq(true);
      expect(marker.pm.layerDragEnabled()).to.eq(true);
      map.pm.toggleGlobalEditMode();
      map.pm.toggleGlobalEditMode({ draggable: false });
      expect(marker.pm.options.draggable).to.eq(false);
      expect(marker.pm.layerDragEnabled()).to.eq(false);
      map.pm.setGlobalOptions({ draggable: true });
      expect(marker.pm.options.draggable).to.eq(true);
      expect(marker.pm.layerDragEnabled()).to.eq(true);
      map.pm.disableGlobalEditMode();
      map.pm.setGlobalOptions({ draggable: false });
      map.pm.toggleGlobalEditMode();
      expect(marker.pm.options.draggable).to.eq(false);
      expect(marker.pm.layerDragEnabled()).to.eq(false);
    });
  });

  it('removes markers without error', () => {
    cy.window().then(({ map, L }) => {
      const markerLayer = L.geoJson().addTo(map);

      map.pm.enableDraw('Marker', {
        snappable: false,
      });

      cy.get(mapSelector)
        .click(150, 250)
        .then(() => {
          let l;
          let m;
          map.eachLayer((layer) => {
            if (layer._leaflet_id === markerLayer._leaflet_id) {
              l = layer;
            } else if (layer instanceof L.Marker) {
              m = layer;
            }
          });

          l!.addLayer(m);
          map.pm.disableDraw();
          l!.removeLayer(m);

          return m;
        })
        .as('markerLayer');
    });

    cy.get('@markerLayer').then((markerLayer) => {
      markerLayer.pm.disable();
    });
  });

  it('places markers', () => {
    cy.toolbarButton('marker').click();

    cy.get(mapSelector)
      .click(90, 250)
      .click(150, 50)
      .click(500, 50)
      .click(500, 300);

    cy.get('.leaflet-marker-icon').should(($p) => {
      expect($p).to.have.length(5);
    });

    cy.toolbarButton('marker').click();

    cy.get('.leaflet-marker-icon').should(($p) => {
      expect($p).to.have.length(4);
    });
  });

  it('add interactive:false marker to the map and enable edit', () => {
    // Adds a interactive Marker to the map and enable / disable the edit mode to check if a error is thrown because it is not draggable
    cy.window()
      .then(({ map, L }) =>
        L.marker([51.505, -0.09], { interactive: false }).addTo(map)
      )
      .as('marker');

    cy.toolbarButton('edit').click();

    cy.wait(100);

    cy.toolbarButton('edit').click();

    cy.get('@marker').then((marker) => {
      marker.removeFrom(marker._map);
    });
  });

  it('calls pm:drag-events on Marker drag', (done) => {
    let handFinish = false;
    let dragstart = false;
    let drag = false;
    let dragend = false;

    cy.window().then(({ map }) => {
      map.on('pm:create', (e) => {
        e.layer.on('pm:dragstart', () => {
          dragstart = true;
        });
        e.layer.on('pm:drag', () => {
          drag = true;
        });
        e.layer.on('pm:dragend', () => {
          dragend = true;
        });
      });
    });

    cy.toolbarButton('marker').click();
    cy.wait(1000);
    cy.get(mapSelector).click(150, 250);
    cy.wait(1000);
    cy.toolbarButton('marker').click();
    cy.toolbarButton('drag').click();

    cy.window().then(({ Hand }) => {
      const handMarker = new Hand({
        timing: 'frame',
        onStop: () => {
          expect(dragstart).to.equal(true);
          expect(drag).to.equal(true);
          expect(dragend).to.equal(true);
          handFinish = true;
        },
      });
      const toucherMarker = handMarker.growFinger('mouse');
      toucherMarker
        .wait(100)
        .moveTo(150, 240, 100)
        .down()
        .wait(500)
        .moveTo(170, 290, 400)
        .up()
        .wait(100); // Not allowed

      setTimeout(() => {
        expect(handFinish).to.equal(true);
        done();
      }, 2000);
    });
  });

  it('keeps alt in LatLng while dragging', (done) => {
    cy.toolbarButton('marker').click();
    cy.wait(1000);
    cy.get(mapSelector).click(150, 250);
    cy.wait(1000);
    cy.toolbarButton('marker').click();
    cy.toolbarButton('drag').click();

    cy.window().then(({ map }) => {
      const marker = (map.pm.getGeomanDrawLayers() as L.Marker[])[0];
      expect(marker.getLatLng().alt).to.eq(undefined);
      marker.getLatLng().alt = 10;
      expect(marker.getLatLng().alt).to.eq(10);
    });

    cy.window().then(({ map, Hand }) => {
      const handMarker = new Hand({
        timing: 'frame',
        onStop: () => {
          const marker = (map.pm.getGeomanDrawLayers() as L.Marker[])[0];
          expect(marker.getLatLng().alt).to.eq(10);
          done();
        },
      });
      const toucherMarker = handMarker.growFinger('mouse');
      toucherMarker
        .wait(100)
        .moveTo(150, 240, 100)
        .down()
        .wait(500)
        .moveTo(170, 290, 400)
        .up()
        .wait(100); // Not allowed
    });
  });

  it('enabled of Marker is true in edit-mode', () => {
    cy.toolbarButton('marker').click();
    cy.get(mapSelector).click(150, 250);
    cy.toolbarButton('edit').click();

    cy.window().then(({ map }) => {
      const marker = (map.pm.getGeomanDrawLayers() as L.Marker[])[0];
      const enabled = marker.pm.enabled();
      expect(enabled).to.equal(true);
    });
  });

  it('disable continueDrawing', () => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({ continueDrawing: false });
    });

    cy.toolbarButton('marker').click();
    cy.get(mapSelector).click(191, 216);

    cy.get(mapSelector).click(350, 350);

    cy.toolbarButton('edit').click();
    cy.hasLayers(2);
  });

  it('disable markerEditable', () => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({ markerEditable: false });
    });

    cy.toolbarButton('marker').click();
    cy.get(mapSelector).click(191, 216);

    cy.window().then(({ map }) => {
      const marker = (map.pm.getGeomanDrawLayers() as L.Marker[])[0];
      const enabled = marker.pm.enabled();
      expect(enabled).to.equal(false);
    });
  });

  it('enable markerEditable but disable MarkerRemoval', () => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({
        markerEditable: true,
        preventMarkerRemoval: true,
      });
    });

    cy.toolbarButton('marker').click();
    cy.get(mapSelector).click(191, 216);

    cy.window().then(({ map }) => {
      const marker = (map.pm.getGeomanDrawLayers() as L.Marker[])[0];
      const enabled = marker.pm.enabled();
      expect(enabled).to.equal(true);
    });

    cy.get(mapSelector).rightclick(191, 214);

    cy.hasLayers(4);
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

    cy.toolbarButton('marker').click();
    cy.get(mapSelector).click(350, 250).click(190, 60);

    cy.window().then(({ map }) => {
      expect(1).to.eq((map.pm.getGeomanDrawLayers() as L.Marker[]).length);
    });

    cy.get(mapSelector).click(250, 50);

    cy.window().then(({ map }) => {
      expect(2).to.eq((map.pm.getGeomanDrawLayers() as L.Marker[]).length);
    });
  });
  it('fires pm:update after edit', () => {
    cy.toolbarButton('marker').click();
    cy.get(mapSelector).click(350, 250);

    let updateFired = false;
    cy.window().then(({ map }) => {
      const marker = (map.pm.getGeomanDrawLayers() as L.Marker[])[0];
      marker.on('pm:update', () => {
        updateFired = true;
      });
      marker.pm.enable();
      marker.pm._layerEdited = true;
      marker.pm.disable();
    });

    cy.window().then(() => {
      expect(updateFired).to.eq(true);
    });
  });

  it('change icon of Marker while drawing', () => {
    cy.toolbarButton('marker')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector).trigger('mousemove', 300, 300);

    cy.window().then(({ map, L }) => {
      map.pm.setGlobalOptions({
        markerStyle: {
          icon: L.icon({
            iconUrl: 'someIcon.png',
          }),
        },
      });

      const layer = map.pm.Draw.Marker._hintMarker;
      expect(
        (layer!._icon as HTMLImageElement).src.endsWith('someIcon.png')
      ).to.eql(true);
    });
  });

  it('does not create additional marker while dragging in draw mode', () => {
    cy.toolbarButton('marker').click();

    cy.get(mapSelector).click(150, 250);

    cy.window().then(({ map }) => {
      expect((map.pm.getGeomanDrawLayers() as L.Marker[]).length).to.eq(1);
    });

    cy.get(mapSelector).trigger('mousedown', 150, 230, { which: 1 });
    cy.get(mapSelector).trigger('mousemove', 170, 290, { which: 1 });
    // Do not create a new marker while dragging
    cy.get(mapSelector).click(170, 290);
    cy.get(mapSelector).trigger('mouseup', 170, 290, { which: 1 });
    cy.get(mapSelector).trigger('mousemove', 190, 340, { which: 1 });

    cy.window().then(({ map }) => {
      expect((map.pm.getGeomanDrawLayers() as L.Marker[]).length).to.eq(1);
    });

    // Create a new marker after dragging with clicking on the icon of a marker
    cy.get(mapSelector).click(170, 290);

    cy.window().then(({ map }) => {
      expect((map.pm.getGeomanDrawLayers() as L.Marker[]).length).to.eq(2);
    });
  });
});
