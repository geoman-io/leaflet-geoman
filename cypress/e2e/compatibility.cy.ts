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
        // tools still count as Draw instances
        expect(tool).to.be.instanceOf(PM.Draw);
        expect(tool.probe()).to.equal('star');
        expect(tool.shapes).to.equal(undefined);

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
