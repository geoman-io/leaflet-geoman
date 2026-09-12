describe('Exit Mode on Escape Key', () => {
  const mapSelector = '#map';

  beforeEach(() => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({
        exitModeOnEscape: true,
      });
    });
  });

  describe('Draw Mode', () => {
    it('should exit draw mode when Escape is pressed', () => {
      cy.toolbarButton('polygon').click();

      // Verify draw mode is enabled
      cy.window().then(({ map }) => {
        expect(map.pm.globalDrawModeEnabled()).to.equal(true);
      });

      // Press Escape key
      cy.get('body').type('{esc}');

      // Verify draw mode is disabled
      cy.window().then(({ map }) => {
        expect(map.pm.globalDrawModeEnabled()).to.equal(false);
      });

      // Toolbar button should no longer be active
      cy.toolbarButton('polygon')
        .closest('.button-container')
        .should('not.have.class', 'active');
    });

    it('should exit draw mode mid-drawing when Escape is pressed', () => {
      cy.toolbarButton('polyline').click();

      // Verify draw mode is enabled before clicking
      cy.window().then(({ map }) => {
        expect(map.pm.Draw.getActiveShape()).to.equal('Line');
      });

      // Start drawing a polyline - don't finish it
      cy.get(mapSelector).click(200, 200);
      cy.get(mapSelector).click(200, 300);

      // Verify draw mode is still enabled during drawing
      cy.window().then(({ map }) => {
        expect(map.pm.Draw.getActiveShape()).to.equal('Line');
      });

      // Press Escape key
      cy.get('body').type('{esc}');

      // Verify draw mode is disabled
      cy.window().then(({ map }) => {
        expect(map.pm.globalDrawModeEnabled()).to.equal(false);
        expect(map.pm.Draw.getActiveShape()).to.equal(undefined);
      });
    });

    it('should exit line draw mode when Escape is pressed', () => {
      cy.toolbarButton('polyline').click();

      cy.window().then(({ map }) => {
        expect(map.pm.globalDrawModeEnabled()).to.equal(true);
      });

      cy.get('body').type('{esc}');

      cy.window().then(({ map }) => {
        expect(map.pm.globalDrawModeEnabled()).to.equal(false);
      });
    });

    it('should exit marker draw mode when Escape is pressed', () => {
      cy.toolbarButton('marker').click();

      cy.window().then(({ map }) => {
        expect(map.pm.globalDrawModeEnabled()).to.equal(true);
      });

      cy.get('body').type('{esc}');

      cy.window().then(({ map }) => {
        expect(map.pm.globalDrawModeEnabled()).to.equal(false);
      });
    });

    it('should exit rectangle draw mode when Escape is pressed', () => {
      cy.toolbarButton('rectangle').click();

      cy.window().then(({ map }) => {
        expect(map.pm.globalDrawModeEnabled()).to.equal(true);
      });

      cy.get('body').type('{esc}');

      cy.window().then(({ map }) => {
        expect(map.pm.globalDrawModeEnabled()).to.equal(false);
      });
    });

    it('should exit circle draw mode when Escape is pressed', () => {
      cy.toolbarButton('circle').click();

      cy.window().then(({ map }) => {
        expect(map.pm.globalDrawModeEnabled()).to.equal(true);
      });

      cy.get('body').type('{esc}');

      cy.window().then(({ map }) => {
        expect(map.pm.globalDrawModeEnabled()).to.equal(false);
      });
    });

    it('should exit circle marker draw mode when Escape is pressed', () => {
      cy.toolbarButton('circle-marker').click();

      cy.window().then(({ map }) => {
        expect(map.pm.globalDrawModeEnabled()).to.equal(true);
      });

      cy.get('body').type('{esc}');

      cy.window().then(({ map }) => {
        expect(map.pm.globalDrawModeEnabled()).to.equal(false);
      });
    });
  });

  describe('Edit Mode', () => {
    it('should exit edit mode when Escape is pressed', () => {
      // First create a polygon
      cy.toolbarButton('polygon').click();
      cy.get(mapSelector).click(200, 200);
      cy.get(mapSelector).click(200, 300);
      cy.get(mapSelector).click(300, 300);
      cy.get(mapSelector).click(200, 200);

      // Enable edit mode
      cy.toolbarButton('edit').click();

      // Verify edit mode is enabled
      cy.window().then(({ map }) => {
        expect(map.pm.globalEditModeEnabled()).to.equal(true);
      });

      // Press Escape key
      cy.get('body').type('{esc}');

      // Verify edit mode is disabled
      cy.window().then(({ map }) => {
        expect(map.pm.globalEditModeEnabled()).to.equal(false);
      });

      // Toolbar button should no longer be active
      cy.toolbarButton('edit')
        .closest('.button-container')
        .should('not.have.class', 'active');
    });
  });

  describe('Drag Mode', () => {
    it('should exit drag mode when Escape is pressed', () => {
      // First create a polygon
      cy.toolbarButton('polygon').click();
      cy.get(mapSelector).click(200, 200);
      cy.get(mapSelector).click(200, 300);
      cy.get(mapSelector).click(300, 300);
      cy.get(mapSelector).click(200, 200);

      // Enable drag mode
      cy.toolbarButton('drag').click();

      // Verify drag mode is enabled
      cy.window().then(({ map }) => {
        expect(map.pm.globalDragModeEnabled()).to.equal(true);
      });

      // Press Escape key
      cy.get('body').type('{esc}');

      // Verify drag mode is disabled
      cy.window().then(({ map }) => {
        expect(map.pm.globalDragModeEnabled()).to.equal(false);
      });

      // Toolbar button should no longer be active
      cy.toolbarButton('drag')
        .closest('.button-container')
        .should('not.have.class', 'active');
    });
  });

  describe('Removal Mode', () => {
    it('should exit removal mode when Escape is pressed', () => {
      // First create a marker
      cy.toolbarButton('marker').click();
      cy.get(mapSelector).click(200, 200);

      // Enable removal mode
      cy.toolbarButton('delete').click();

      // Verify removal mode is enabled
      cy.window().then(({ map }) => {
        expect(map.pm.globalRemovalModeEnabled()).to.equal(true);
      });

      // Press Escape key
      cy.get('body').type('{esc}');

      // Verify removal mode is disabled
      cy.window().then(({ map }) => {
        expect(map.pm.globalRemovalModeEnabled()).to.equal(false);
      });

      // Toolbar button should no longer be active
      cy.toolbarButton('delete')
        .closest('.button-container')
        .should('not.have.class', 'active');
    });
  });

  describe('Rotate Mode', () => {
    it('should exit rotate mode when Escape is pressed', () => {
      // First create a polygon
      cy.toolbarButton('polygon').click();
      cy.get(mapSelector).click(200, 200);
      cy.get(mapSelector).click(200, 300);
      cy.get(mapSelector).click(300, 300);
      cy.get(mapSelector).click(200, 200);

      // Enable rotate mode
      cy.toolbarButton('rotate').click();

      // Verify rotate mode is enabled
      cy.window().then(({ map }) => {
        expect(map.pm.globalRotateModeEnabled()).to.equal(true);
      });

      // Press Escape key
      cy.get('body').type('{esc}');

      // Verify rotate mode is disabled
      cy.window().then(({ map }) => {
        expect(map.pm.globalRotateModeEnabled()).to.equal(false);
      });

      // Toolbar button should no longer be active
      cy.toolbarButton('rotate')
        .closest('.button-container')
        .should('not.have.class', 'active');
    });
  });

  describe('Cut Mode', () => {
    it('should exit cut mode when Escape is pressed', () => {
      // First create a polygon
      cy.toolbarButton('polygon').click();
      cy.get(mapSelector).click(200, 200);
      cy.get(mapSelector).click(200, 300);
      cy.get(mapSelector).click(300, 300);
      cy.get(mapSelector).click(200, 200);

      // Enable cut mode
      cy.toolbarButton('cut').click();

      // Verify cut mode is enabled
      cy.window().then(({ map }) => {
        expect(map.pm.globalCutModeEnabled()).to.equal(true);
      });

      // Press Escape key
      cy.get('body').type('{esc}');

      // Verify cut mode is disabled
      cy.window().then(({ map }) => {
        expect(map.pm.globalCutModeEnabled()).to.equal(false);
      });

      // Toolbar button should no longer be active
      cy.toolbarButton('cut')
        .closest('.button-container')
        .should('not.have.class', 'active');
    });
  });

  describe('exitModeOnEscape option disabled', () => {
    it('should NOT exit modes when exitModeOnEscape is false', () => {
      // Disable the option
      cy.window().then(({ map }) => {
        map.pm.setGlobalOptions({
          exitModeOnEscape: false,
        });
      });

      cy.toolbarButton('polygon').click();

      // Verify draw mode is enabled
      cy.window().then(({ map }) => {
        expect(map.pm.globalDrawModeEnabled()).to.equal(true);
      });

      // Press Escape key
      cy.get('body').type('{esc}');

      // Verify draw mode is STILL enabled
      cy.window().then(({ map }) => {
        expect(map.pm.globalDrawModeEnabled()).to.equal(true);
      });

      // Toolbar button should still be active
      cy.toolbarButton('polygon')
        .closest('.button-container')
        .should('have.class', 'active');
    });

    it('should NOT exit edit mode when exitModeOnEscape is false', () => {
      // Disable the option
      cy.window().then(({ map }) => {
        map.pm.setGlobalOptions({
          exitModeOnEscape: false,
        });
      });

      // First create a polygon
      cy.toolbarButton('polygon').click();
      cy.get(mapSelector).click(200, 200);
      cy.get(mapSelector).click(200, 300);
      cy.get(mapSelector).click(300, 300);
      cy.get(mapSelector).click(200, 200);

      // Enable edit mode
      cy.toolbarButton('edit').click();

      // Verify edit mode is enabled
      cy.window().then(({ map }) => {
        expect(map.pm.globalEditModeEnabled()).to.equal(true);
      });

      // Press Escape key
      cy.get('body').type('{esc}');

      // Verify edit mode is STILL enabled
      cy.window().then(({ map }) => {
        expect(map.pm.globalEditModeEnabled()).to.equal(true);
      });
    });
  });

  describe('pm:keyevent', () => {
    it('should fire pm:keyevent on Escape key press', () => {
      let keydownEventFired = false;
      let keydownEventData: { event: KeyboardEvent; eventType: string } | null =
        null;

      cy.window().then(({ map }) => {
        map.on('pm:keyevent', (e) => {
          if (e.event.key === 'Escape' && e.eventType === 'keydown') {
            keydownEventFired = true;
            keydownEventData = e;
          }
        });
      });

      cy.get('body').type('{esc}');

      cy.window().then(() => {
        expect(keydownEventFired).to.equal(true);
        expect(keydownEventData!.event.key).to.equal('Escape');
        expect(keydownEventData!.eventType).to.equal('keydown');
      });
    });
  });
});

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
