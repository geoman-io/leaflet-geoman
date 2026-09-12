describe('JavaScript compatibility', () => {
  it('keeps Leaflet class extension, mixins, init hooks and option inheritance', () => {
    cy.window().then(({ L }) => {
      const Parent = L.PM.Edit.Marker;
      const Child = Parent.extend<{ probe(): string }>({
        includes: [{ probe: () => 'mixed in' }],
      });
      Child.mergeOptions({ snappable: false });
      const hooks: string[] = [];
      Child.addInitHook(function () {
        hooks.push(this.probe());
      });
      const marker = L.marker([0, 0]);
      const editor = new Child(marker);

      expect(editor).to.be.instanceOf(Parent);
      expect(editor.probe()).to.equal('mixed in');
      expect(editor.getOptions().snappable).to.equal(false);
      expect(Parent.prototype.options.snappable).to.equal(true);
      expect(hooks).to.deep.equal(['mixed in']);
      expect(
        Object.prototype.propertyIsEnumerable.call(Parent.prototype, 'enable')
      ).to.equal(true);
    });
  });

  it('keeps Matrix constructor and enumerable prototype methods', () => {
    cy.window().then(({ L }) => {
      const matrix = new L.PM.Matrix(1, 0, 0, 1, 0, 0);
      expect(matrix.translate(2).transform(L.point(1, 3))).to.deep.equal(
        L.point(3, 5)
      );
      expect(matrix.clone()).to.be.instanceOf(L.PM.Matrix);
      expect(Object.keys(L.PM.Matrix.prototype)).to.include('transform');
    });
  });

  it('keeps pm absent for ignored layers and supports reinitialization', () => {
    cy.window().then(({ L }) => {
      L.PM.setOptIn(true);
      const marker = L.marker([0, 0]);
      const polygon = L.polygon([
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

  it('preserves an existing PM namespace when the bundle is loaded again', () => {
    cy.readFile('dist/leaflet-geoman.min.js').then((bundle: string) => {
      cy.window().then((win) => {
        const pm = win.L.PM;
        const markerClass = pm.Edit.Marker;
        win.eval(bundle);
        expect(win.L.PM).to.equal(pm);
        expect(win.L.PM.Edit.Marker).to.equal(markerClass);
      });
    });
  });

  it('serves the TypeScript demo through its original classic-script URLs', () => {
    cy.readFile('node_modules/leaflet/dist/leaflet.js').then((body: string) => {
      cy.intercept('https://unpkg.com/leaflet@latest/dist/leaflet.js', {
        body,
        headers: { 'content-type': 'application/javascript' },
      });
    });
    cy.readFile('node_modules/leaflet/dist/leaflet.css').then(
      (body: string) => {
        cy.intercept('https://unpkg.com/leaflet@latest/dist/leaflet.css', {
          body,
          headers: { 'content-type': 'text/css' },
        });
      }
    );
    cy.visit('/demo/index.html');
    cy.get('.devpanel-module').should('have.length', 4);
    cy.window().its('DevPanel').should('be.a', 'function');
    cy.get('[data-testcase="basic-shapes"]').click();
    cy.get('#status-layers').should('have.text', '5');
    cy.get('#btn-clear').click();
    cy.get('#status-layers').should('have.text', '0');
  });
});
