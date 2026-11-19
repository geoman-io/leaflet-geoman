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
