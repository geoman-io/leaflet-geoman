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

  it('a registered mode is exclusive with the built-in modes and exits on Escape', () => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({ exitModeOnEscape: true });
      let on = false;
      const activate = map.pm.unstable_registerMode('scale', {
        enabled: () => on,
        disable: () => {
          on = false;
        },
      });
      const enableScale = () => {
        activate();
        on = true;
      };

      map.pm.enableGlobalEditMode();
      enableScale();
      expect(map.pm.globalEditModeEnabled()).to.eq(false);
      expect(map.pm.unstable_activeModes()).to.deep.equal(['scale']);

      map.pm.enableDraw('Polygon');
      expect(on).to.eq(false);
      expect(map.pm.unstable_activeModes()).to.deep.equal(['draw:Polygon']);

      enableScale();
      expect(map.pm.Draw.getActiveShape()).to.eq(undefined);
    });

    cy.get('body').type('{esc}');

    cy.window().then(({ map }) => {
      expect(map.pm.unstable_activeModes()).to.deep.equal([]);
    });
  });

  it('a copied draw control gets its own mode name', () => {
    cy.window().then(({ map }) => {
      map.pm.Toolbar.copyDrawControl('Polygon', { name: 'polyCopy' });
      map.pm.enableDraw('polyCopy');
      expect(map.pm.unstable_activeModes()).to.deep.equal(['draw:polyCopy']);
    });
  });

  it('keeps a mode exclusive after its toolbar button is deleted', () => {
    cy.window().then(({ map }) => {
      map.pm.Toolbar.deleteControl('editMode');
      map.pm.enableGlobalEditMode();
      map.pm.enableGlobalDragMode();
      expect(activeModes(map)).to.deep.equal(['drag']);
      map.pm.disableGlobalDragMode();

      map.pm.Toolbar.deleteControl('drawPolygon');
      map.pm.enableDraw('Polygon');
      map.pm.enableGlobalRemovalMode();
      expect(activeModes(map)).to.deep.equal(['removal']);
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

  it('keeps every mode exclusive with all toolbar buttons deleted', () => {
    cy.window().then(({ map }) => {
      Object.keys(map.pm.Toolbar.getButtons()).forEach((name) =>
        map.pm.Toolbar.deleteControl(name)
      );
      const modes: [string, () => void][] = [
        ['edit', () => map.pm.enableGlobalEditMode()],
        ['draw:Marker', () => map.pm.enableDraw('Marker')],
        ['drag', () => map.pm.enableGlobalDragMode()],
        ['draw:CircleMarker', () => map.pm.enableDraw('CircleMarker')],
        ['removal', () => map.pm.enableGlobalRemovalMode()],
        ['draw:Line', () => map.pm.enableDraw('Line')],
        ['rotate', () => map.pm.enableGlobalRotateMode()],
        ['draw:Rectangle', () => map.pm.enableDraw('Rectangle')],
        ['draw:Circle', () => map.pm.enableDraw('Circle')],
        ['draw:Text', () => map.pm.enableDraw('Text')],
        ['draw:Cut', () => map.pm.enableGlobalCutMode()],
        ['draw:Polygon', () => map.pm.enableDraw('Polygon')],
        ['edit', () => map.pm.enableGlobalEditMode()],
      ];
      // Record every step, so a failure shows all modes that broke.
      const steps = modes.map(([name, enable]) => {
        enable();
        return `${name} -> ${activeModes(map).join(',')}`;
      });
      expect(steps).to.deep.equal(
        modes.map(
          ([name]) =>
            `${name} -> ${name === 'draw:Cut' ? 'draw:Cut,cut' : name}`
        )
      );
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

  it('keeps modes exclusive after setLang rebuilds the toolbar', () => {
    cy.window().then(({ map }) => {
      map.pm.enableGlobalEditMode();
      map.pm.setLang('de');
      map.pm.enableGlobalDragMode();
      expect(activeModes(map)).to.deep.equal(['drag']);
    });
  });

  it('keeps modes exclusive while a mode button is disabled', () => {
    cy.window().then(({ map }) => {
      map.pm.Toolbar.setButtonDisabled('editMode', true);
      map.pm.enableGlobalEditMode();
      map.pm.enableGlobalDragMode();
      expect(activeModes(map)).to.deep.equal(['drag']);
    });
  });

  it('Escape exits every built-in mode, including Text and copied draw controls', () => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({ exitModeOnEscape: true });
      map.pm.Toolbar.copyDrawControl('Polygon', { name: 'polyCopy' });
      map.pm.Toolbar.copyDrawControl('Line', {
        name: 'lineCopy',
        disableByOtherButtons: false,
      });
    });
    const enablers: [string, (map: L.Map) => void][] = [
      ['draw:Marker', (map) => map.pm.enableDraw('Marker')],
      ['draw:CircleMarker', (map) => map.pm.enableDraw('CircleMarker')],
      ['draw:Line', (map) => map.pm.enableDraw('Line')],
      ['draw:Polygon', (map) => map.pm.enableDraw('Polygon')],
      ['draw:Rectangle', (map) => map.pm.enableDraw('Rectangle')],
      ['draw:Circle', (map) => map.pm.enableDraw('Circle')],
      ['draw:Text', (map) => map.pm.enableDraw('Text')],
      ['draw:Cut', (map) => map.pm.enableGlobalCutMode()],
      ['draw:polyCopy', (map) => map.pm.enableDraw('polyCopy')],
      ['draw:lineCopy', (map) => map.pm.enableDraw('lineCopy')],
      ['edit', (map) => map.pm.enableGlobalEditMode()],
      ['drag', (map) => map.pm.enableGlobalDragMode()],
      ['removal', (map) => map.pm.enableGlobalRemovalMode()],
      ['rotate', (map) => map.pm.enableGlobalRotateMode()],
    ];
    enablers.forEach(([name, enable]) => {
      cy.window().then(({ map }) => {
        enable(map);
        // activeModes lists Cut both as a draw tool and as cut mode.
        expect(activeModes(map), name).to.deep.equal(
          name === 'draw:Cut' ? ['draw:Cut', 'cut'] : [name]
        );
      });
      cy.get('body').type('{esc}');
      cy.window().then(({ map }) => {
        expect(activeModes(map), `${name} after Escape`).to.deep.equal([]);
      });
    });
  });
});
