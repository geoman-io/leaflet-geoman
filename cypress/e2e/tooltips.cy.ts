describe('Shows Tooltips', () => {
  // map and leaflet object

  const mapSelector = '#map';

  it('Has Working Translations', () => {
    cy.window().then(({ map }) => {
      map.pm.setLang('de');
    });

    cy.toolbarButton('polygon').click();
    cy.get('.leaflet-tooltip-bottom').then((el) => {
      expect(el).to.have.text('Platziere den ersten Marker mit Klick');
    });
  });
  it('Supports Custom Translations', () => {
    cy.window().then(({ map }) => {
      const customTranslation = {
        tooltips: {
          placeMarker: 'Custom Marker Translation',
        },
      };

      map.pm.setLang('customName', customTranslation, 'en');
    });

    cy.toolbarButton('marker').click();
    cy.get('.leaflet-tooltip-bottom').then((el) => {
      expect(el).to.have.text('Custom Marker Translation');
    });
  });

  it('Has Marker Tooltips', () => {
    cy.get('.leaflet-tooltip-bottom').should('not.exist');
    cy.toolbarButton('marker').click();

    cy.get('.leaflet-tooltip-bottom').should('exist');

    cy.get('.leaflet-tooltip-bottom').then((el) => {
      expect(el).to.have.text('Click to place marker');
    });

    cy.get(mapSelector).click(290, 250);

    cy.get('.leaflet-tooltip-bottom').should('have.length', 1);
    cy.get('.leaflet-tooltip-bottom').then((el) => {
      expect(el).to.have.text('Click to place marker');
    });

    cy.toolbarButton('marker').click();

    cy.get('.leaflet-tooltip-bottom').should('not.exist');
  });

  // Test adapted from PR #1597 (JoonasAapro) for touch hint feature
  it('Shows touch hint on devices without fine pointer', () => {
    // Mock matchMedia to simulate coarse pointer (touch device)
    cy.window().then((win) => {
      cy.stub(win, 'matchMedia').callsFake((query) => ({
        matches: query === '(pointer: coarse)',
      }));
    });

    cy.get('.leaflet-pm-touch-hint').should('not.exist');

    cy.toolbarButton('marker').click();
    cy.get('.leaflet-pm-touch-hint').should('exist');

    cy.get('.leaflet-pm-touch-hint').then((el) => {
      expect(el).to.have.text('Tap the map to place a marker');
    });

    cy.get(mapSelector).click(290, 250);

    // Hint should persist after placing marker (continueDrawing default)
    cy.get('.leaflet-pm-touch-hint').should('exist');

    cy.toolbarButton('marker').click();

    cy.get('.leaflet-pm-touch-hint').should('not.exist');
  });

  it('Has Rectangle Tooltips', () => {
    cy.get('.leaflet-tooltip-bottom').should('not.exist');
    cy.toolbarButton('rectangle').click();

    cy.get('.leaflet-tooltip-bottom').should('exist');

    cy.get('.leaflet-tooltip-bottom').then((el) => {
      expect(el).to.have.text('Click to place first vertex');
    });

    cy.get(mapSelector).click(290, 250);

    cy.get('.leaflet-tooltip-bottom').then((el) => {
      expect(el).to.have.text('Click to finish');
    });

    cy.get(mapSelector).click(390, 350);

    cy.get('.leaflet-tooltip-bottom').should('not.exist');
  });

  it('Has Circle Tooltips', () => {
    cy.get('.leaflet-tooltip-bottom').should('not.exist');
    cy.toolbarButton('circle').click();

    cy.get('.leaflet-tooltip-bottom').should('exist');

    cy.get('.leaflet-tooltip-bottom').then((el) => {
      expect(el).to.have.text('Click to place circle center');
    });

    cy.get(mapSelector).click(290, 250);

    cy.get('.leaflet-tooltip-bottom').then((el) => {
      expect(el).to.have.text('Click to finish circle');
    });

    cy.get(mapSelector).click(290, 350);

    cy.get('.leaflet-tooltip-bottom').should('not.exist');
  });

  it('Has Line Tooltips', () => {
    cy.get('.leaflet-tooltip-bottom').should('not.exist');

    // activate polygon drawing
    cy.toolbarButton('polyline').click();

    cy.get('.leaflet-tooltip-bottom').should('exist');

    cy.get('.leaflet-tooltip-bottom').then((el) => {
      expect(el).to.have.text('Click to place first vertex');
    });

    // draw a polygon
    cy.get(mapSelector).click(290, 250);

    cy.get('.leaflet-tooltip-bottom').then((el) => {
      expect(el).to.have.text('Click to continue drawing');
    });

    cy.get(mapSelector).click(300, 50);

    cy.get('.leaflet-tooltip-bottom').then((el) => {
      expect(el).to.have.text('Click any existing marker to finish');
    });

    cy.get(mapSelector).click(290, 250);

    cy.get('.leaflet-tooltip-bottom').should('not.exist');
  });

  it('Has Polygon Tooltips', () => {
    cy.get('.leaflet-tooltip-bottom').should('not.exist');

    // activate polygon drawing
    cy.toolbarButton('polygon').click();

    cy.get('.leaflet-tooltip-bottom').should('exist');

    cy.get('.leaflet-tooltip-bottom').then((el) => {
      expect(el).to.have.text('Click to place first vertex');
    });

    // draw a polygon
    cy.get(mapSelector).click(290, 250);
    cy.get(mapSelector).click(300, 50);
    cy.get(mapSelector).click(350, 50);
    cy.get(mapSelector).click(350, 150);
    cy.get(mapSelector).click(400, 150);

    cy.get('.leaflet-tooltip-bottom').then((el) => {
      expect(el).to.have.text('Click first marker to finish');
    });

    cy.get(mapSelector).click(290, 250);

    cy.get('.leaflet-tooltip-bottom').should('not.exist');
  });

  it('Properly disables tooltips', () => {
    cy.window().then(({ map }) => {
      map.pm.enableDraw('Polygon', {
        tooltips: false,
      });
    });
    cy.get('.leaflet-tooltip-bottom').should('not.exist');

    cy.toolbarButton('polygon').click();
    cy.get('.leaflet-tooltip-bottom').should('not.exist');

    cy.toolbarButton('polygon').click();
    cy.get('.leaflet-tooltip-bottom').should('not.exist');

    cy.get('.active .action-cancel').click();

    cy.window().then(({ map }) => {
      map.pm.enableDraw('Polygon');
    });
    cy.get('.leaflet-tooltip-bottom').should('not.exist');
    cy.get('.active .action-cancel').click();

    cy.window().then(({ map }) => {
      map.pm.enableDraw('Polygon', {
        tooltips: true,
      });
    });
    cy.get('.leaflet-tooltip-bottom').should('exist');

    cy.toolbarButton('polygon').click();
    cy.get('.leaflet-tooltip-bottom').should('not.exist');

    cy.toolbarButton('polygon').click();
    cy.get('.leaflet-tooltip-bottom').should('exist');
  });

  it('Has Working translation for circle marker tooltip', () => {
    cy.window().then(({ map }) => {
      map.pm.setLang('es');
    });

    cy.get('.leaflet-tooltip-bottom').should('not.exist');
    cy.toolbarButton('circle-marker').click();

    cy.get('.leaflet-tooltip-bottom').should('exist');

    cy.get('.leaflet-tooltip-bottom').then((el) => {
      expect(el).to.have.text('Presiona para colocar un marcador de círculo');
    });

    cy.get(mapSelector).click(290, 250);

    cy.get('.leaflet-tooltip-bottom').should('exist');
    cy.get('.leaflet-tooltip-bottom').then((el) => {
      expect(el).to.have.text('Presiona para colocar un marcador de círculo');
    });

    cy.toolbarButton('circle-marker').click();

    cy.get('.leaflet-tooltip-bottom').should('not.exist');
  });

  it('Reset tooltip after remove vertex', () => {
    cy.toolbarButton('polygon').click();

    cy.get(mapSelector).click(90, 250);
    cy.get(mapSelector).click(100, 350);
    cy.get(mapSelector).click(200, 350);

    cy.get('.leaflet-tooltip-bottom').then((el) => {
      expect(el).to.have.text('Click first marker to finish');
    });

    cy.window().then(({ map }) => {
      map.pm.Draw.Polygon._removeLastVertex();
    });

    cy.get('.leaflet-tooltip-bottom').then((el) => {
      expect(el).to.have.text('Click to continue drawing');
    });

    cy.get(mapSelector).click(200, 350);

    cy.get('.leaflet-tooltip-bottom').then((el) => {
      expect(el).to.have.text('Click first marker to finish');
    });
  });

  it('Add fallback to english for translations', () => {
    cy.window().then(({ map, L }) => {
      // we set the language to 'custom'
      // to make sure that it has no fallback we overwrite the fallback with 'xx'
      map.pm.setLang(
        'custom',
        {
          tooltips: {
            mytext: 'Some Text',
          },
        },
        'xx'
      );

      expect(L.PM.Utils.getTranslation('tooltips.mytext')).to.eq('Some Text');
      expect(L.PM.Utils.getTranslation('tooltips.placeMarker')).to.eq(
        'Click to place marker'
      );
    });
  });

  it('shows key if no translation is available', () => {
    cy.window().then(({ L }) => {
      expect(L.PM.Utils.getTranslation('tooltips.placeMarker')).to.eq(
        'Click to place marker'
      );
      expect(L.PM.Utils.getTranslation('tooltips.mytext')).to.eq(
        'tooltips.mytext'
      );
    });
  });

  it('does not incorrectly match 3-letter language codes to 2-letter codes', () => {
    // Regression test for https://github.com/geoman-io/leaflet-geoman/issues/1551
    // ISO 639-3 codes like 'jam' (Jamaican Creole) should not match 'ja' (Japanese)
    cy.window().then(({ map, L }) => {
      // Set to a 3-letter code that doesn't exist - should NOT fall back to 'ja'
      map.pm.setLang('jam');

      // Since 'jam' doesn't exist in translations and shouldn't match 'ja',
      // the activeLang should be 'jam' (not 'ja')
      expect(L.PM.activeLang).to.eq('jam');

      // Verify it's not showing Japanese by checking the actual translation falls back to English
      // (since 'jam' has no translations but English is the default fallback)
      expect(L.PM.Utils.getTranslation('tooltips.placeMarker')).to.eq(
        'Click to place marker'
      );
    });
  });
});
