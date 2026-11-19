// Pins how map modes exclude each other, which events they fire and how
// Escape exits them, so the mode manager refactor keeps the same behaviour.
describe('Mode exclusivity', () => {
  const toggledEvents = [
    'pm:globaleditmodetoggled',
    'pm:globaldragmodetoggled',
    'pm:globalremovalmodetoggled',
    'pm:globalrotatemodetoggled',
    'pm:globalcutmodetoggled',
    'pm:globaldrawmodetoggled',
  ];

  const activeModes = (map: L.Map) => {
    const active: string[] = [];
    const shape = map.pm.Draw.getActiveShape();
    if (shape) active.push(`draw:${shape}`);
    if (map.pm.globalEditModeEnabled()) active.push('edit');
    if (map.pm.globalDragModeEnabled()) active.push('drag');
    if (map.pm.globalRemovalModeEnabled()) active.push('removal');
    if (map.pm.globalRotateModeEnabled()) active.push('rotate');
    if (map.pm.globalCutModeEnabled()) active.push('cut');
    return active;
  };

  // Records "edit:false", "draw:true:Polygon" and so on, in firing order.
  const recordEvents = (map: L.Map) => {
    const events: string[] = [];
    toggledEvents.forEach((type) =>
      map.on(type, (e) => {
        const { enabled, shape } = e as unknown as {
          enabled: boolean;
          shape?: string;
        };
        const mode = type.slice('pm:global'.length, -'modetoggled'.length);
        events.push(`${mode}:${enabled}${shape ? `:${shape}` : ''}`);
      })
    );
    return events;
  };

  it('enabling a mode through the API turns off the previous one first', () => {
    cy.window().then(({ map }) => {
      const events = recordEvents(map);
      const step = (fn: () => void) => {
        events.length = 0;
        fn();
        return { active: activeModes(map), events: [...events] };
      };

      expect(step(() => map.pm.enableGlobalEditMode())).to.deep.equal({
        active: ['edit'],
        events: ['edit:true'],
      });
      expect(step(() => map.pm.enableGlobalDragMode())).to.deep.equal({
        active: ['drag'],
        events: ['edit:false', 'drag:true'],
      });
      expect(step(() => map.pm.enableGlobalRemovalMode())).to.deep.equal({
        active: ['removal'],
        events: ['drag:false', 'removal:true'],
      });
      expect(step(() => map.pm.enableGlobalRotateMode())).to.deep.equal({
        active: ['rotate'],
        events: ['removal:false', 'rotate:true'],
      });
      expect(step(() => map.pm.enableDraw('Polygon'))).to.deep.equal({
        active: ['draw:Polygon'],
        events: ['rotate:false', 'draw:true:Polygon'],
      });
      expect(step(() => map.pm.enableGlobalCutMode())).to.deep.equal({
        active: ['draw:Cut', 'cut'],
        events: ['draw:false:Polygon', 'cut:true'],
      });
      expect(step(() => map.pm.enableDraw('Marker'))).to.deep.equal({
        active: ['draw:Marker'],
        events: ['cut:false', 'draw:true:Marker'],
      });
      expect(step(() => map.pm.enableGlobalEditMode())).to.deep.equal({
        active: ['edit'],
        events: ['draw:false:Marker', 'edit:true'],
      });
      expect(step(() => map.pm.toggleGlobalDragMode())).to.deep.equal({
        active: ['drag'],
        events: ['edit:false', 'drag:true'],
      });
      expect(step(() => map.pm.disableGlobalDragMode())).to.deep.equal({
        active: [],
        events: ['drag:false'],
      });
    });
  });

  it('keeps modes exclusive when the toolbar is not on the map', () => {
    cy.window().then(({ map }) => {
      map.pm.removeControls();
      const events = recordEvents(map);

      map.pm.enableGlobalEditMode();
      map.pm.enableGlobalDragMode();
      expect(activeModes(map)).to.deep.equal(['drag']);
      map.pm.enableDraw('Line');
      expect(activeModes(map)).to.deep.equal(['draw:Line']);
      map.pm.disableDraw();
      expect(activeModes(map)).to.deep.equal([]);
      expect(events).to.deep.equal([
        'edit:true',
        'edit:false',
        'drag:true',
        'drag:false',
        'draw:true:Line',
        'draw:false:Line',
      ]);
    });
  });

  it('treats a copied draw control like the original', () => {
    cy.window().then(({ map }) => {
      map.pm.Toolbar.copyDrawControl('Polygon', { name: 'polyCopy' });
      map.pm.enableDraw('polyCopy');
      expect(activeModes(map)).to.deep.equal(['draw:polyCopy']);
      map.pm.enableGlobalEditMode();
      expect(activeModes(map)).to.deep.equal(['edit']);
    });
  });

  it('a clicked custom toggle control turns off the active mode', () => {
    cy.window().then(({ map }) => {
      map.pm.Toolbar.createCustomControl({
        name: 'customMode',
        block: 'custom',
        className: 'leaflet-pm-icon-custom-mode',
        toggle: true,
      });
      map.pm.enableGlobalEditMode();
    });

    cy.toolbarButton('custom-mode').click();

    cy.window().then(({ map }) => {
      expect(map.pm.Toolbar.buttons.customMode.toggled()).to.eq(true);
      expect(activeModes(map)).to.deep.equal([]);

      // Enabling a mode through the API untoggles the custom control.
      map.pm.enableGlobalDragMode();
      expect(map.pm.Toolbar.buttons.customMode.toggled()).to.eq(false);
      expect(activeModes(map)).to.deep.equal(['drag']);
    });
  });

  it('Escape exits the built-in modes but not a custom toggle control', () => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({ exitModeOnEscape: true });
      map.pm.Toolbar.createCustomControl({
        name: 'customMode',
        block: 'custom',
        className: 'leaflet-pm-icon-custom-mode',
        toggle: true,
      });
    });

    cy.toolbarButton('custom-mode').click();
    cy.get('body').type('{esc}');

    cy.window().then(({ map }) => {
      expect(map.pm.Toolbar.buttons.customMode.toggled()).to.eq(true);
    });
  });

  it('a mode turned on from another mode turning off stays consistent', () => {
    cy.window().then(({ map }) => {
      map.pm.enableDraw('Polygon');
      // Turning off the draw tool fires pm:drawend, which turns on edit mode
      // while drag mode is still turning on.
      map.once('pm:drawend', () => map.pm.enableGlobalEditMode());
      map.pm.enableGlobalDragMode();
      expect(activeModes(map)).to.deep.equal(['drag']);
    });
  });

  it('a copied draw control that other buttons may not turn off stays on', () => {
    cy.window().then(({ map }) => {
      map.pm.Toolbar.copyDrawControl('Polygon', {
        name: 'polyCopy',
        disableByOtherButtons: false,
      });
      map.pm.enableDraw('polyCopy');
      map.pm.enableGlobalEditMode();
      expect(activeModes(map)).to.deep.equal(['draw:polyCopy', 'edit']);
    });
  });

  it('Escape does nothing when only a custom toggle control is on', () => {
    cy.window().then((win) => {
      const { map } = win;
      map.pm.setGlobalOptions({ exitModeOnEscape: true });
      map.pm.Toolbar.createCustomControl({
        name: 'customMode',
        block: 'custom',
        className: 'leaflet-pm-icon-custom-mode',
        toggle: true,
      });
    });
    cy.toolbarButton('custom-mode').click();
    cy.window().then((win) => {
      const event = new win.KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        cancelable: true,
      });
      win.document.dispatchEvent(event);
      expect(event.defaultPrevented).to.eq(false);
      expect(win.map.pm.Toolbar.buttons.customMode.toggled()).to.eq(true);
    });
  });
});
