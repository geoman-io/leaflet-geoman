describe('Options', () => {
  // Trying to test options requires drag and drop but I cant make it work with cypress yet

  const mapSelector = '#map';

  it('sets global options', () => {
    cy.toolbarButton('polygon').click();

    cy.window().then(({ map, L }) => {
      cy.get(mapSelector)
        .click(90, 250)
        .click(100, 50)
        .click(150, 50)
        .click(150, 150)
        .click(90, 250)
        .then(() => {
          let l;
          map.eachLayer((layer) => {
            if (layer instanceof L.Polygon) {
              layer.pm.enable();
              l = layer;
            }
          });
          return l;
        })
        .as('poly');
    });

    cy.toolbarButton('marker').click();

    cy.get(mapSelector).click(300, 100);

    cy.toolbarButton('edit').click();

    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({
        pinning: false,
        snappable: false,
      });
    });

    cy.get('@poly').then((poly) => {
      expect(poly.pm.options.snappable).to.equal(false);
    });

    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({
        pinning: true,
        snappable: true,
      });
    });

    cy.get('@poly').then((poly) => {
      expect(poly.pm.options.snappable).to.equal(true);
    });
  });

  it('global options work on Draw', () => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({
        snappable: false,
      });
    });

    cy.toolbarButton('marker').click();

    cy.get(mapSelector).click(300, 100);

    cy.window().then(({ map }) => {
      expect(map.pm.Draw.Marker.options.snappable).to.equal(false);
    });

    // cy.get(mapSelector)
    //   .click(120, 150)
    //   .click(120, 100)
    //   .click(300, 100)
    //   .click(300, 200)
    //   .click(120, 150);

    // cy.toolbarButton('polygon').click();

    // cy.get(mapSelector)
    //   .click(300, 100)
    //   .click(300, 200)
    //   .click(400, 200)
    //   .click(300, 100)

    // cy.toolbarButton('circle-marker').click();

    // cy.get(mapSelector)
    //   .click(300, 100)
    //   .click(300, 200)

    // cy.toolbarButton('marker').click();

    // cy.get(mapSelector)
    //   .click(300, 100)

    // cy.toolbarButton('pinning').click();
    // cy.toolbarButton('edit').click();
  });

  it('merge PathOptions', () => {
    cy.window().then(({ map }) => {
      map.pm.setPathOptions({
        color: 'red',
      });
      expect(map.pm.Draw.Line.options.pathOptions!.color).to.equal('red');
      expect(map.pm.Draw.Line.options.pathOptions!.borderColor).to.equal(
        undefined
      );

      map.pm.setPathOptions({
        borderColor: 'green',
      });
      expect(map.pm.Draw.Line.options.pathOptions!.color).to.equal(undefined);
      expect(map.pm.Draw.Line.options.pathOptions!.borderColor).to.equal(
        'green'
      );

      map.pm.setPathOptions(
        {
          color: 'red',
        },
        { merge: true }
      );
      expect(map.pm.Draw.Line.options.pathOptions!.color).to.equal('red');
      expect(map.pm.Draw.Line.options.pathOptions!.borderColor).to.equal(
        'green'
      );
    });
  });

  it('fires `pm:globaloptionschanged`', () => {
    cy.window().then(({ map }) => {
      let fired = false;
      map.on('pm:globaloptionschanged', () => {
        fired = true;
      });

      map.pm.setGlobalOptions({ snapSegment: false });

      expect(fired).to.equal(true);
    });
  });

  it('merges nested global options and keeps the same options object', () => {
    cy.window().then(({ map }) => {
      const before = map.pm.getGlobalOptions();
      const panes = { layerPane: 'custom' };
      map.pm.setGlobalOptions({ panes });

      const after = map.pm.getGlobalOptions();
      expect(after).to.equal(before);
      expect(after.panes).to.deep.equal({
        vertexPane: 'markerPane',
        layerPane: 'custom',
        markerPane: 'markerPane',
      });
      // The caller's object is copied, not stored.
      expect(after.panes).not.to.equal(panes);
      expect(panes).to.deep.equal({ layerPane: 'custom' });
    });
  });

  it('keeps a global option when it is set to undefined', () => {
    cy.window().then(({ map, L }) => {
      const group = new L.FeatureGroup().addTo(map);
      map.pm.setGlobalOptions({ layerGroup: group });
      map.pm.setGlobalOptions({ layerGroup: undefined });
      expect(map.pm.getGlobalOptions().layerGroup).to.equal(group);
    });
  });

  it('applies global options to draw tools and to layers without their own value', () => {
    cy.window().then(({ map, L }) => {
      const marker = new L.Marker(map.getCenter()).addTo(map);
      const fn = () => true;
      map.pm.setGlobalOptions({ snapDistance: 33, moveVertexValidation: fn });

      expect(marker.pm.options.snapDistance).to.equal(33);
      expect(marker.pm.options.moveVertexValidation).to.equal(fn);
      expect(map.pm.Draw.Polygon.options.snapDistance).to.equal(33);
      expect(map.pm.Draw.Line.options.snapDistance).to.equal(33);
    });
  });

  it('stores global options it does not know', () => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({ myAppFlag: 'x' } as never);
      expect(
        (map.pm.getGlobalOptions() as Record<string, unknown>).myAppFlag
      ).to.equal('x');
    });
  });

  it('keeps a layer own options when global options change', () => {
    cy.window().then(({ map, L }) => {
      const marker = new L.Marker(map.getCenter()).addTo(map);
      marker.pm.setOptions({ snappable: false, draggable: false });
      map.pm.setGlobalOptions({ snapDistance: 30 });

      expect(marker.pm.options.snappable).to.equal(false);
      expect(marker.pm.options.draggable).to.equal(false);
      expect(marker.pm.options.snapDistance).to.equal(30);
    });
  });

  it('does not keep enableGlobalEditMode options as the layer own options', () => {
    cy.window().then(({ map, L }) => {
      const marker = new L.Marker(map.getCenter()).addTo(map);
      map.pm.enableGlobalEditMode({ snapDistance: 5 });
      expect(marker.pm.options.snapDistance).to.equal(5);
      map.pm.disableGlobalEditMode();

      // Off the map, so setGlobalOptions does not reach it directly.
      map.removeLayer(marker);
      map.pm.setGlobalOptions({ snapDistance: 40 });
      marker.addTo(map);
      map.pm.enableGlobalEditMode();
      expect(marker.pm.options.snapDistance).to.equal(40);
      map.pm.disableGlobalEditMode();
    });
  });

  it('does not change the object passed to an earlier setPathOptions', () => {
    cy.window().then(({ map }) => {
      const style = { color: 'red' };
      map.pm.setPathOptions(style);
      map.pm.setPathOptions({ weight: 7 }, { merge: true });

      expect(style).to.deep.equal({ color: 'red' });
      expect(map.pm.Draw.Line.options.pathOptions).to.deep.equal({
        color: 'red',
        weight: 7,
      });
    });
  });

  it('ignores options that are not an object, with a warning', () => {
    cy.window().then(({ map, console }) => {
      cy.spy(console, 'warn').as('warn');
      map.pm.setGlobalOptions('ab' as never);
      expect(
        (map.pm.getGlobalOptions() as Record<string, unknown>)['0']
      ).to.equal(undefined);
    });
    cy.get('@warn').should(
      'have.been.calledWithMatch',
      /expects an options object/
    );
  });

  it('warns once for an unknown option', () => {
    cy.window().then(({ map, console }) => {
      cy.spy(console, 'warn').as('warn');
      map.pm.setGlobalOptions({ unknownProbeKey: 1 } as never);
      map.pm.setGlobalOptions({ unknownProbeKey: 2 } as never);
    });
    cy.get('@warn').its('callCount').should('equal', 1);
  });

  it('stores unknown options without warning in the production script build', () => {
    cy.intercept('GET', '**/dist/leaflet-geoman-global.js', (req) => {
      req.url = req.url.replace(
        'leaflet-geoman-global.js',
        'leaflet-geoman-global.min.js'
      );
    });
    cy.visit('/index.html');
    cy.window().then((win) => {
      const warn = cy.spy(win.console, 'warn');
      const map = new win.L.Map('map').setView([51.505, -0.09], 13);
      map.pm.setGlobalOptions({ prodProbeKey: 1 } as never);
      map.pm.setGlobalOptions('ab' as never);

      expect(
        (map.pm.getGlobalOptions() as Record<string, unknown>).prodProbeKey
      ).to.equal(1);
      expect(
        (map.pm.getGlobalOptions() as Record<string, unknown>)['0']
      ).to.equal(undefined);
      expect(warn).not.to.have.been.called;
    });
  });

  it('applies enableGlobalEditMode options over a layer own options until the next enable', () => {
    cy.window().then(({ map, L }) => {
      const own = new L.Marker(map.getCenter()).addTo(map);
      own.pm.setOptions({ snappable: false });
      const plain = new L.Marker(map.getCenter()).addTo(map);
      map.pm.setGlobalOptions({ snapDistance: 20 });

      // The caller's options win while the mode is on, as before.
      map.pm.enableGlobalEditMode({ snappable: true, snapDistance: 5 });
      expect(own.pm.enabled()).to.equal(true);
      expect(own.pm.options.snappable).to.equal(true);
      expect(own.pm.options.snapDistance).to.equal(5);
      expect(plain.pm.options.snapDistance).to.equal(5);

      // Disabling keeps the values on the layers until options are applied again.
      map.pm.disableGlobalEditMode();
      expect(own.pm.enabled()).to.equal(false);
      expect(own.pm.options.snappable).to.equal(true);

      // Enabling again without options brings back the layer's own and the global options.
      map.pm.enableGlobalEditMode();
      expect(own.pm.options.snappable).to.equal(false);
      expect(own.pm.options.snapDistance).to.equal(20);
      expect(plain.pm.options.snappable).to.equal(true);
      expect(plain.pm.options.snapDistance).to.equal(20);
      map.pm.disableGlobalEditMode();
    });
  });

  it('does not merge a custom payload into the layer it refers to', () => {
    cy.window().then(({ map, L }) => {
      const marker = new L.Marker(map.getCenter()).addTo(map);
      let payload: Record<string, unknown> | undefined;
      marker.on('pm:edit', (e) => {
        payload = e as unknown as Record<string, unknown>;
      });
      (
        marker.pm as unknown as {
          _fireEdit(l: L.Layer, s: string, c: object): void;
        }
      )._fireEdit(marker, 'Custom', { layer: { probe: true } });

      expect(payload!.layer).to.deep.equal({ probe: true });
      expect((marker as unknown as { probe?: boolean }).probe).to.equal(
        undefined
      );
    });
  });

  it('adds custom payload keys to events', () => {
    cy.window().then(({ map, L }) => {
      const marker = new L.Marker(map.getCenter()).addTo(map);
      let payload: Record<string, unknown> | undefined;
      marker.on('pm:edit', (e) => {
        payload = e as unknown as Record<string, unknown>;
      });
      (
        marker.pm as unknown as {
          _fireEdit(l: L.Layer, s: string, c: object): void;
        }
      )._fireEdit(marker, 'Custom', { extra: 1 });

      expect(payload!.layer).to.equal(marker);
      expect(payload!.shape).to.equal('Marker');
      expect(payload!.source).to.equal('Custom');
      expect(payload!.extra).to.equal(1);
    });
  });
});
