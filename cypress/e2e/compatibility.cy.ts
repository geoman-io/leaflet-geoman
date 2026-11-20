describe('JavaScript compatibility', () => {
  it('lets editors be subclassed with their option defaults', () => {
    cy.window().then(({ L }) => {
      const Parent = L.PM.Edit.Marker;
      class Child extends Parent {
        probe() {
          return 'subclassed';
        }
      }
      const marker = new L.Marker([0, 0]);
      const editor = new Child(marker);

      expect(editor).to.be.instanceOf(Parent);
      expect(editor.probe()).to.equal('subclassed');
      expect(editor.getShape()).to.equal('Marker');
      editor.setOptions({ snappable: false });
      expect(editor.getOptions().snappable).to.equal(false);
      expect(Parent.prototype.options.snappable).to.equal(true);
      expect(new Parent(marker).getOptions().snappable).to.equal(true);
    });
  });

  // Before Draw became an ES class (#1735), a subclass of L.PM.Draw built its
  // own tools like the map's Draw does; #1735 left it without any.
  it('lets Draw be subclassed with its own tools', () => {
    cy.window().then(({ L, map }) => {
      const PM = L.PM as unknown as Record<string, any>;
      const DrawBase = PM.Draw as new (map: unknown) => any;
      class MyDraw extends DrawBase {
        probe() {
          return 'subclassed';
        }
      }
      class DeeperDraw extends MyDraw {}

      for (const Cls of [MyDraw, DeeperDraw]) {
        const draw = new Cls(map);
        expect(draw).to.be.instanceOf(PM.Draw);
        expect(draw.probe()).to.equal('subclassed');
        expect(draw.getShapes()).to.include.members(['Marker', 'Polygon']);
        expect(draw.Polygon).to.be.instanceOf(PM.Draw.Polygon);
        expect(draw.Polygon).not.to.equal(map.pm.Draw.Polygon);

        draw.enable('Polygon');
        expect(draw.getActiveShape()).to.equal('Polygon');
        draw.disable();
        expect(draw.getActiveShape()).to.equal(undefined);
      }

      // a subclass as the map's Draw, with a custom tool copied from a
      // built-in one
      const original = map.pm.Draw;
      const draw = new DeeperDraw(map);
      (map.pm as unknown as Record<string, unknown>).Draw = draw;
      try {
        draw.createNewDrawInstance('PolygonCopy', 'Polygon');
        expect(draw.getShapes()).to.include('PolygonCopy');
        map.pm.enableDraw('PolygonCopy');
        expect(draw.PolygonCopy.enabled()).to.equal(true);
        map.pm.disableDraw();
        expect(draw.PolygonCopy.enabled()).to.equal(false);
      } finally {
        // The map's PolygonCopy mode outlives its tool here, so nothing may
        // use draw or edit modes on this map after this.
        (map.pm as unknown as Record<string, unknown>).Draw = original;
      }
    });
  });

  it('lets custom tools subclass a draw tool and be registered', () => {
    cy.window().then(({ L, map }) => {
      const PM = L.PM as unknown as Record<string, any>;
      class StarTool extends PM.Draw.Polygon {
        probe() {
          return 'star';
        }
      }
      PM.Draw.Star = StarTool;
      try {
        const pmDraw = map.pm.Draw as unknown as Record<string, any>;
        pmDraw.createNewDrawInstance('Star', 'Star');
        const tool = pmDraw.Star;
        expect(tool).to.be.instanceOf(StarTool);
        expect(tool).to.be.instanceOf(PM.Draw.Polygon);
        // tools extend DrawTool; L.PM.Draw is the map's registry of them
        expect(tool).to.be.instanceOf(PM.DrawTool);
        expect(tool).not.to.be.instanceOf(PM.Draw);
        expect(tool.probe()).to.equal('star');
        expect(tool.shapes).to.equal(undefined);
        expect(tool.getActiveShape).to.equal(undefined);
        expect(tool.createNewDrawInstance).to.equal(undefined);

        map.pm.enableDraw('Star');
        expect(tool.enabled()).to.equal(true);
        expect(map.pm.Draw.getActiveShape()).to.equal('Star');
        map.pm.disableDraw();
        expect(tool.enabled()).to.equal(false);
      } finally {
        delete PM.Draw.Star;
      }
    });
  });

  // A tool that doesn't build on a built-in one extends L.PM.DrawTool, which
  // brings the options, snapping and events every tool shares.
  it('lets a custom tool extend DrawTool directly', () => {
    cy.window().then(({ L, map }) => {
      const PM = L.PM as unknown as Record<string, any>;
      const ToolBase = PM.DrawTool as new (map: unknown) => any;
      class PointTool extends ToolBase {
        constructor(m: unknown) {
          super(m);
          this._shape = 'Point';
          this.toolbarButtonName = 'drawPoint';
        }
        enable(options?: object) {
          this.setOptions(options || {});
          this._enabled = true;
          this._map.pm._modes._exclusive(`draw:${this._shape}`);
          this._fireDrawStart();
        }
        disable() {
          if (!this._enabled) {
            return;
          }
          this._enabled = false;
          this._fireDrawEnd();
        }
        enabled() {
          return !!this._enabled;
        }
        toggle(options?: object) {
          if (this.enabled()) {
            this.disable();
          } else {
            this.enable(options);
          }
        }
      }
      PM.Draw.Point = PointTool;
      try {
        const events: string[] = [];
        map.on('pm:drawstart', (e) => events.push(`start:${e.shape}`));
        map.on('pm:drawend', (e) => events.push(`end:${e.shape}`));
        const tool = map.pm.Draw.createNewDrawInstance('Point', 'Point');
        expect(tool).to.be.instanceOf(PointTool);
        expect(tool.getOptions().snapDistance).to.equal(20);
        expect(tool.getOptions().snappable).to.equal(true);

        map.pm.enableDraw('Polygon');
        map.pm.enableDraw('Point', { snapDistance: 5 });
        expect(map.pm.Draw.getActiveShape()).to.equal('Point');
        expect(map.pm.Draw.Polygon.enabled()).to.equal(false);
        expect(tool.getOptions().snapDistance).to.equal(5);
        expect(PM.DrawTool.prototype.options.snapDistance).to.equal(20);
        map.pm.disableDraw();
        expect(map.pm.Draw.getActiveShape()).to.equal(undefined);
        expect(events).to.include.members(['start:Point', 'end:Point']);
      } finally {
        delete PM.Draw.Point;
      }
    });
  });

  // Before the registry and the tools were split, a tool could be written as
  // `class T extends L.PM.Draw`. Such a class is a registry now, so
  // registering it as a tool is refused before the registry changes.
  it('refuses to register a Draw subclass as a tool', () => {
    cy.window().then(({ L, map }) => {
      const PM = L.PM as unknown as Record<string, any>;
      const DrawBase = PM.Draw as new (map: unknown) => any;
      class OldStyleTool extends DrawBase {
        enable() {}
        disable() {}
      }
      const shapesBefore = [...map.pm.Draw.getShapes()];
      PM.Draw.Old = OldStyleTool;
      try {
        // The error comes from the app's window, so its class is not the
        // spec's TypeError; check the name instead.
        let error: Error | undefined;
        try {
          map.pm.Draw.createNewDrawInstance('Old', 'Old');
        } catch (e) {
          error = e as Error;
        }
        expect(error?.name).to.equal('TypeError');
        expect(error?.message).to.match(
          /PM\.Draw\.Old \(OldStyleTool\).*L\.PM\.DrawTool/
        );
        expect(map.pm.Draw.getShapes()).to.deep.equal(shapesBefore);
        expect(
          (map.pm.Draw as unknown as Record<string, unknown>).Old
        ).to.equal(undefined);

        // nothing was left behind: the same name registers once the class
        // is a tool
        PM.Draw.Old = class extends PM.Draw.Polygon {};
        const pmDraw = map.pm.Draw as unknown as Record<string, any>;
        const tool = pmDraw.createNewDrawInstance('Old', 'Old');
        map.pm.enableDraw('Old');
        expect(tool.enabled()).to.equal(true);
        map.pm.disableDraw();
        expect(tool.enabled()).to.equal(false);
      } finally {
        delete PM.Draw.Old;
      }
    });
  });

  // Pins the descriptor decision of refactor 7: Geoman's classes keep native
  // ES class descriptors. Their own methods are not enumerable; mixin methods,
  // copied onto the prototype, still are. Change this test together with
  // that decision.
  it('pins native ES descriptors on class prototypes', () => {
    cy.window().then(({ L }) => {
      const PM = L.PM as unknown as Record<string, any>;
      const descriptorOf = (cls: { prototype: object }, name: string) => {
        for (
          let p: object | null = cls.prototype;
          p;
          p = Object.getPrototypeOf(p)
        ) {
          const d = Object.getOwnPropertyDescriptor(p, name);
          if (d) return d;
        }
        throw new Error(`no ${name}`);
      };
      const classMethods: [any, string][] = [
        [PM.Map, 'enableDraw'],
        [PM.Toolbar, 'addControls'],
        [PM.Draw, 'getShapes'],
        [PM.Draw.Polygon, '_createMarker'],
        [PM.Edit, 'setOptions'],
        [PM.Edit.Marker, 'enable'],
        [PM.Edit.LayerGroup, 'enable'],
      ];
      for (const [cls, name] of classMethods) {
        const d = descriptorOf(cls, name);
        expect(typeof d.value, name).to.equal('function');
        expect(d.get, name).to.equal(undefined);
        expect(d.enumerable, name).to.equal(false);
        expect(d.writable, name).to.equal(true);
        expect(d.configurable, name).to.equal(true);
      }
      const mixinMethods: [any, string][] = [
        [PM.Map, 'enableGlobalEditMode'],
        [PM.Draw.Polygon, '_fireCreate'],
        [PM.Edit.Marker, 'enableLayerDrag'],
      ];
      for (const [cls, name] of mixinMethods) {
        expect(descriptorOf(cls, name).enumerable, name).to.equal(true);
      }
      expect(Object.keys(PM.Edit.Marker.prototype)).not.to.include('enable');

      // Leaflet 2's include copies by own property names along the chain, so
      // it still copies the non-enumerable methods.
      class Host extends L.Class {}
      (Host as unknown as { include(o: object): void }).include(
        PM.Edit.Marker.prototype
      );
      expect(
        typeof (Host.prototype as unknown as Record<string, unknown>).enable
      ).to.equal('function');

      // The tool and editor registries stay enumerable statics.
      expect(Object.keys(PM.Draw)).to.include.members(['Polygon', 'Text']);
      expect(Object.keys(PM.Edit)).to.include.members(['Marker', 'LayerGroup']);
    });
  });

  it('keeps Matrix constructor and enumerable prototype methods', () => {
    cy.window().then(({ L }) => {
      const matrix = new L.PM.Matrix(1, 0, 0, 1, 0, 0);
      expect(matrix.translate(2).transform(new L.Point(1, 3))).to.deep.equal(
        new L.Point(3, 5)
      );
      expect(matrix.clone()).to.be.instanceOf(L.PM.Matrix);
      expect(Object.keys(L.PM.Matrix.prototype)).to.include('transform');
    });
  });

  it('keeps pm absent for ignored layers and supports reinitialization', () => {
    cy.window().then(({ L }) => {
      L.PM.setOptIn(true);
      const marker = new L.Marker([0, 0]);
      const polygon = new L.Polygon([
        [0, 0],
        [0, 1],
        [1, 1],
      ]);
      expect(marker.pm).to.equal(undefined);
      expect(polygon.pm).to.equal(undefined);
      marker.options.pmIgnore = false;
      L.PM.reInitLayer(marker);
      expect(marker.pm.getShape()).to.equal('Marker');
      const editor = marker.pm;
      L.PM.reInitLayer(marker);
      expect(marker.pm).to.equal(editor);
      L.PM.setOptIn(false);
    });
  });

  it('keeps legacy toolbar aliases and custom drawing controls', () => {
    cy.window().then(({ map }) => {
      map.pm.addControls({
        editPolygon: false,
        deleteLayer: false,
      } as Parameters<typeof map.pm.addControls>[0]);
      expect(map.pm.Toolbar.buttons.editMode._button).to.exist;
      map.pm.Toolbar.copyDrawControl('Polygon', {
        name: 'PolygonCopy',
        title: 'Copy',
      });
      map.pm.enableDraw('PolygonCopy', { allowSelfIntersection: false });
      expect(map.pm.Draw.PolygonCopy.enabled()).to.equal(true);
      map.pm.disableDraw();
      expect(map.pm.Draw.PolygonCopy.enabled()).to.equal(false);
    });
  });

  it('keeps L.PM in charge of new layers when the bundle is loaded again', () => {
    cy.readFile('dist/leaflet-geoman-global.min.js').then((bundle: string) => {
      cy.window().then((win) => {
        win.eval(bundle);
        win.L.PM.setOptIn(true);
        expect(new win.L.Marker([0, 0]).pm).to.equal(undefined);
        win.L.PM.setOptIn(false);
        expect(new win.L.Marker([0, 0]).pm.getShape()).to.equal('Marker');
      });
    });
  });

  it('serves the TypeScript demo through its original classic-script URLs', () => {
    cy.visit('/demo/index.html');
    cy.get('.devpanel-module').should('have.length', 4);
    cy.window().its('DevPanel').should('be.a', 'function');
    cy.get('[data-testcase="basic-shapes"]').click();
    cy.get('#status-layers').should('have.text', '5');
    cy.get('#btn-clear').click();
    cy.get('#status-layers').should('have.text', '0');
  });
});
