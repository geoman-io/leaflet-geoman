describe('Exit Mode on Escape Key - Default Option', () => {
  it('should have exitModeOnEscape disabled by default', () => {
    // No beforeEach runs here, so map has default options
    cy.window().then(({ map }) => {
      const options = map.pm.getGlobalOptions();
      expect(options.exitModeOnEscape).to.equal(false);
    });
  });

  it('should NOT exit draw mode when exitModeOnEscape is disabled by default', () => {
    cy.toolbarButton('polygon').click();

    // Verify draw mode is enabled
    cy.window().then(({ map }) => {
      expect(map.pm.globalDrawModeEnabled()).to.equal(true);
    });

    // Press Escape key
    cy.get('body').type('{esc}');

    // Verify draw mode is STILL enabled (default is false)
    cy.window().then(({ map }) => {
      expect(map.pm.globalDrawModeEnabled()).to.equal(true);
    });
  });
});

describe('Finish Drawing on Enter Key', () => {
  const mapSelector = '#map';

  beforeEach(() => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({
        finishOnEnter: true,
      });
    });
  });

  describe('Polygon', () => {
    it('should finish polygon drawing when Enter is pressed with 3+ vertices', () => {
      // Disable snapping to ensure vertices don't snap to each other
      cy.window().then(({ map }) => {
        map.pm.setGlobalOptions({
          finishOnEnter: true,
          snappable: false,
        });
      });

      cy.toolbarButton('polygon').click();

      // Draw 3 vertices (spread out to avoid any snapping/closing issues)
      cy.get(mapSelector).click(150, 150);
      cy.get(mapSelector).click(150, 350);
      cy.get(mapSelector).click(350, 350);

      // Verify draw mode is enabled and we have 3 vertices
      cy.window().then(({ map }) => {
        expect(map.pm.globalDrawModeEnabled()).to.equal(true);
        // Polygon uses coords.length directly, not flattened
        const coords = map.pm.Draw.Polygon._layer.getLatLngs();
        expect(coords.length).to.equal(3);
      });

      // Press Enter key to finish
      cy.get('body').type('{enter}');

      // Verify a polygon was created
      cy.window().then(({ map }) => {
        const layers = map.pm.getGeomanDrawLayers();
        expect(layers.length).to.equal(1);
      });
    });

    it('should NOT finish polygon drawing when Enter is pressed with less than 3 vertices', () => {
      // Disable snapping to ensure vertices don't snap to each other
      cy.window().then(({ map }) => {
        map.pm.setGlobalOptions({
          finishOnEnter: true,
          snappable: false,
        });
      });

      cy.toolbarButton('polygon').click();

      // Draw only 2 vertices
      cy.get(mapSelector).click(150, 150);
      cy.get(mapSelector).click(150, 350);

      // Verify we have only 2 vertices
      cy.window().then(({ map }) => {
        // Polygon uses coords.length directly, not flattened
        const coords = map.pm.Draw.Polygon._layer.getLatLngs();
        expect(coords.length).to.equal(2);
      });

      // Press Enter key
      cy.get('body').type('{enter}');

      // Verify no polygon was created and draw mode is still enabled
      cy.window().then(({ map }) => {
        expect(map.pm.globalDrawModeEnabled()).to.equal(true);
        const layers = map.pm.getGeomanDrawLayers();
        expect(layers.length).to.equal(0);
      });
    });
  });

  describe('Line', () => {
    it('should finish line drawing when Enter is pressed with 2+ vertices', () => {
      cy.toolbarButton('polyline').click();

      // Draw 2 vertices
      cy.get(mapSelector).click(200, 200);
      cy.get(mapSelector).click(200, 300);

      // Verify draw mode is enabled
      cy.window().then(({ map }) => {
        expect(map.pm.globalDrawModeEnabled()).to.equal(true);
      });

      // Press Enter key to finish
      cy.get('body').type('{enter}');

      // Verify a line was created
      cy.window().then(({ map }) => {
        const layers = map.pm.getGeomanDrawLayers();
        expect(layers.length).to.equal(1);
      });
    });

    it('should NOT finish line drawing when Enter is pressed with less than 2 vertices', () => {
      cy.toolbarButton('polyline').click();

      // Draw only 1 vertex
      cy.get(mapSelector).click(200, 200);

      // Press Enter key
      cy.get('body').type('{enter}');

      // Verify no line was created and draw mode is still enabled
      cy.window().then(({ map }) => {
        expect(map.pm.globalDrawModeEnabled()).to.equal(true);
        const layers = map.pm.getGeomanDrawLayers();
        expect(layers.length).to.equal(0);
      });
    });
  });

  describe('Marker', () => {
    it('should NOT finish marker on Enter (markers are single-click)', () => {
      cy.toolbarButton('marker').click();

      // Don't place any marker yet
      // Press Enter key
      cy.get('body').type('{enter}');

      // Verify draw mode is still enabled and no marker was created
      cy.window().then(({ map }) => {
        expect(map.pm.globalDrawModeEnabled()).to.equal(true);
        const layers = map.pm.getGeomanDrawLayers();
        expect(layers.length).to.equal(0);
      });
    });
  });

  describe('Rectangle', () => {
    it('should finish rectangle drawing when Enter is pressed after placing first corner', () => {
      cy.toolbarButton('rectangle').click();

      // Place first corner
      cy.get(mapSelector).click(200, 200);

      // Move mouse to define the rectangle (this updates the hint marker position)
      cy.get(mapSelector).trigger('mousemove', 350, 350);

      // Verify draw mode is enabled and start marker exists
      cy.window().then(({ map }) => {
        expect(map.pm.globalDrawModeEnabled()).to.equal(true);
        expect(map.pm.Draw.Rectangle._startMarker).to.not.be.undefined;
      });

      // Press Enter key to finish
      cy.get('body').type('{enter}');

      // Verify a rectangle was created
      cy.window().then(({ map }) => {
        const layers = map.pm.getGeomanDrawLayers();
        expect(layers.length).to.equal(1);
      });
    });

    it('should NOT finish rectangle drawing when Enter is pressed before placing first corner', () => {
      cy.toolbarButton('rectangle').click();

      // Don't place any corner yet
      // Press Enter key
      cy.get('body').type('{enter}');

      // Verify draw mode is still enabled and no rectangle was created
      cy.window().then(({ map }) => {
        expect(map.pm.globalDrawModeEnabled()).to.equal(true);
        const layers = map.pm.getGeomanDrawLayers();
        expect(layers.length).to.equal(0);
      });
    });
  });

  describe('Circle', () => {
    it('should finish circle drawing when Enter is pressed after placing center', () => {
      cy.window().then(({ map }) => {
        map.pm.setGlobalOptions({
          finishOnEnter: true,
          resizeableCircle: true,
        });
      });

      cy.toolbarButton('circle').click();

      // Place center
      cy.get(mapSelector).click(250, 250);

      // Move mouse to define the radius (this updates the hint marker position)
      cy.get(mapSelector).trigger('mousemove', 350, 250);

      // Verify draw mode is enabled and center marker exists
      cy.window().then(({ map }) => {
        expect(map.pm.globalDrawModeEnabled()).to.equal(true);
        expect(map.pm.Draw.Circle._centerMarker).to.not.be.undefined;
      });

      // Press Enter key to finish
      cy.get('body').type('{enter}');

      // Verify a circle was created
      cy.window().then(({ map }) => {
        const layers = map.pm.getGeomanDrawLayers();
        expect(layers.length).to.equal(1);
      });
    });

    it('should NOT finish circle drawing when Enter is pressed before placing center', () => {
      cy.toolbarButton('circle').click();

      // Don't place center yet
      // Press Enter key
      cy.get('body').type('{enter}');

      // Verify draw mode is still enabled and no circle was created
      cy.window().then(({ map }) => {
        expect(map.pm.globalDrawModeEnabled()).to.equal(true);
        const layers = map.pm.getGeomanDrawLayers();
        expect(layers.length).to.equal(0);
      });
    });
  });

  describe('CircleMarker', () => {
    it('should NOT finish circle marker on Enter (circle markers are single-click)', () => {
      cy.toolbarButton('circle-marker').click();

      // Don't place any marker yet
      // Press Enter key
      cy.get('body').type('{enter}');

      // Verify draw mode is still enabled and no circle marker was created
      cy.window().then(({ map }) => {
        expect(map.pm.globalDrawModeEnabled()).to.equal(true);
        const layers = map.pm.getGeomanDrawLayers();
        expect(layers.length).to.equal(0);
      });
    });
  });

  describe('finishOnEnter option disabled', () => {
    it('should NOT finish drawing when finishOnEnter is false', () => {
      // Disable finishOnEnter and snapping
      cy.window().then(({ map }) => {
        map.pm.setGlobalOptions({
          finishOnEnter: false,
          snappable: false,
        });
      });

      cy.toolbarButton('polygon').click();

      // Draw 3 vertices (spread out to avoid any snapping/closing issues)
      cy.get(mapSelector).click(150, 150);
      cy.get(mapSelector).click(150, 350);
      cy.get(mapSelector).click(350, 350);

      // Verify we have 3 vertices
      cy.window().then(({ map }) => {
        // Polygon uses coords.length directly, not flattened
        const coords = map.pm.Draw.Polygon._layer.getLatLngs();
        expect(coords.length).to.equal(3);
      });

      // Press Enter key
      cy.get('body').type('{enter}');

      // Verify draw mode is STILL enabled and no polygon was created
      cy.window().then(({ map }) => {
        expect(map.pm.globalDrawModeEnabled()).to.equal(true);
        const layers = map.pm.getGeomanDrawLayers();
        expect(layers.length).to.equal(0);
      });
    });
  });
});

describe('Finish Drawing on Enter Key - Default Option', () => {
  it('should have finishOnEnter disabled by default', () => {
    cy.window().then(({ map }) => {
      const options = map.pm.getGlobalOptions();
      expect(options.finishOnEnter).to.equal(false);
    });
  });
});
