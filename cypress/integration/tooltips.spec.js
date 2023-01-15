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

    cy.wait(500);

    cy.get('.leaflet-tooltip-bottom').then((el) => {
      expect(el.length).to.eq(1);
      expect(el).to.have.text('Click to place marker');
    });

    cy.toolbarButton('marker').click();

    cy.get('.leaflet-tooltip-bottom').should('not.exist');
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
    cy.get(mapSelector)
      .click(290, 250)
      .click(300, 50)
      .click(350, 50)
      .click(350, 150)
      .click(400, 150);

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

    cy.wait(500);

    cy.get('.leaflet-tooltip-bottom').then((el) => {
      expect(el).to.have.text('Presiona para colocar un marcador de círculo');
    });

    cy.toolbarButton('circle-marker').click();

    cy.get('.leaflet-tooltip-bottom').should('not.exist');
  });

  it('Reset tooltip after remove vertex', () => {
    cy.toolbarButton('polygon').click();

    cy.get(mapSelector).click(90, 250).click(100, 350).click(200, 350);

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
});
