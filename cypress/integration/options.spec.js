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
      expect(map.pm.Draw.Line.options.pathOptions.color).to.equal('red');
      expect(map.pm.Draw.Line.options.pathOptions.borderColor).to.equal(
        undefined
      );

      map.pm.setPathOptions({
        borderColor: 'green',
      });
      expect(map.pm.Draw.Line.options.pathOptions.color).to.equal(undefined);
      expect(map.pm.Draw.Line.options.pathOptions.borderColor).to.equal(
        'green'
      );

      map.pm.setPathOptions(
        {
          color: 'red',
        },
        { merge: true }
      );
      expect(map.pm.Draw.Line.options.pathOptions.color).to.equal('red');
      expect(map.pm.Draw.Line.options.pathOptions.borderColor).to.equal(
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
});
