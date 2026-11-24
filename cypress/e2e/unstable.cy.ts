// The ./unstable entry that @geoman-io packages bundle instead of the main
// entry: on its own it sets Geoman up and exports PM's classes.
describe('unstable entry', () => {
  it('sets Geoman up on its own and exports the classes PM uses', () => {
    cy.visit('/cypress/fixtures/unstable.html');
    cy.window()
      .its('geoman')
      .then(({ unstable, map }: any) => {
        const { PM } = unstable;
        expect(map.pm).to.be.instanceOf(unstable.Map);
        expect(map.pm.Draw).to.be.instanceOf(unstable.Draw);
        expect(map.pm.Draw.Polygon).to.be.instanceOf(unstable.DrawPolygon);
        expect(unstable.DrawTool).to.equal(PM.DrawTool);
        expect(unstable.Draw).to.equal(PM.Draw);
        expect(unstable.Edit).to.equal(PM.Edit);
        expect(unstable.EditLine).to.equal(PM.Edit.Line);
        expect(unstable.Map).to.equal(PM.Map);
        expect(unstable.Toolbar).to.equal(PM.Toolbar);
        expect(unstable.Utils).to.equal(PM.Utils);
        expect(unstable.PMButton).to.be.a('function');
      });
  });

  // The hooks @geoman-io packages build on, which only ./unstable exports
  const load = () => {
    cy.visit('/cypress/fixtures/unstable.html');
    return cy.window().its('geoman');
  };

  it('merges added translations without dropping existing ones', () => {
    load().then(({ unstable, map }: any) => {
      map.setView([51.5, -0.09], 13);
      map.pm.addControls();
      const title = (name: string) =>
        map.pm.Toolbar.buttons[name].buttonsDomNode.getAttribute('title');
      unstable.addTranslations('xx', {
        buttonTitles: { drawMarkerButton: 'Pin' },
      });
      unstable.addTranslations('xx', {
        buttonTitles: { drawPolyButton: 'Area' },
      });
      unstable.addTranslations('EN ', {
        buttonTitles: { drawRectButton: 'Box' },
      });
      map.pm.setLang('xx');
      expect(title('drawMarker')).to.equal('Pin');
      expect(title('drawPolygon')).to.equal('Area');
      // untranslated texts fall back to English
      expect(title('drawCircle')).to.equal('Draw Circle');
      // English added under a differently cased name reaches the fallback
      expect(title('drawRectangle')).to.equal('Box');
      // merging into a built-in language keeps its texts
      unstable.addTranslations('de', { buttonTitles: { probe: 'x' } });
      map.pm.setLang('de');
      expect(title('drawMarker')).to.equal('Marker zeichnen');
      map.pm.setLang('en');
      expect(title('drawMarker')).to.equal('Draw Marker');
    });
  });

  it('lets a registered tool name its button, actions and mode event', () => {
    load().then(({ unstable, L, map }: any) => {
      map.setView([51.5, -0.09], 13);
      map.pm.addControls();
      const { PM } = unstable;
      class Star extends unstable.DrawPolygon {
        unstable_fireModeToggled() {
          map.fire('pm:globalstarmodetoggled', { enabled: this.enabled() });
        }
      }
      PM.Draw.Star = Star;
      unstable.registerButtonName('Star', 'drawStar');
      map.pm.Draw.createNewDrawInstance('Star', 'Star');
      map.pm.Toolbar.createCustomControl({
        name: 'drawStar',
        unstable_jsClass: 'Star',
        actions: ['removeLastVertex'],
      });

      // both names reach the same button and tool
      expect(map.pm.Toolbar._btnNameMapping('Star')).to.equal('drawStar');
      expect(map.pm.Draw._getShapeFromBtnName('drawStar')).to.equal('Star');
      expect(map.pm.Draw._getShapeFromBtnName('drawPolyline')).to.equal('Line');
      expect(map.pm.Toolbar._btnNameMapping('Polyline')).to.equal(
        'drawPolyline'
      );
      expect(map.pm.Toolbar._btnNameMapping('nope')).to.equal('nope');
      expect(map.pm.Draw._getShapeFromBtnName('nope')).to.equal('nope');
      // registering again is a no-op, a clash throws (from the app's realm,
      // so match the message rather than TypeError)
      unstable.registerButtonName('Star', 'drawStar');
      expect(() => unstable.registerButtonName('Line', 'x')).to.throw(
        'already has'
      );
      expect(() => unstable.registerButtonName('Polyline', 'drawFoo')).to.throw(
        'already has'
      );
      expect(() => unstable.registerButtonName('Other', 'drawStar')).to.throw(
        'already belongs'
      );

      const toggled: string[] = [];
      map.on('pm:globaldrawmodetoggled', () => toggled.push('draw'));
      map.on('pm:globalstarmodetoggled', (e: any) =>
        toggled.push(`star:${e.enabled}`)
      );
      map.pm.enableDraw('Star');
      expect(map.pm.Draw.Star.unstable_hintMarker()).to.equal(
        map.pm.Draw.Star._hintMarker
      );
      expect(map.pm.Draw.Star.unstable_hintMarker()).to.be.instanceOf(L.Marker);

      // the action calls the tool named by unstable_jsClass
      let removed = 0;
      map.pm.Draw.Star._removeLastVertex = () => removed++;
      map.pm.Toolbar.buttons.drawStar.buttonsDomNode
        .querySelector('.action-removeLastVertex')
        .click();
      expect(removed).to.equal(1);

      map.pm.disableDraw();
      expect(map.pm.Draw.Star.unstable_hintMarker()).to.equal(null);
      expect(toggled).to.deep.equal(['star:true', 'star:false']);

      map.pm.Toolbar.deleteControl('Star');
      expect(map.pm.Toolbar.buttons.drawStar).to.equal(undefined);
    });
  });

  it('gives a rectangle its rotated corners while its editor is off', () => {
    load().then(({ unstable, L, map }: any) => {
      map.setView([51.5, -0.09], 13);
      const rect = new L.Rectangle([
        [51.49, -0.1],
        [51.51, -0.08],
      ]);
      expect(rect.pm.unstable_corners()).to.deep.equal([]);
      // a map passed in works for a rectangle on no map
      expect(rect.pm.unstable_corners(map)).to.have.length(4);
      rect.addTo(map);
      const unrotated = rect.pm.unstable_corners();
      expect(unrotated).to.have.length(4);
      rect.pm.rotateLayerToAngle(30);
      // _findCorners needs the editor's map, which only enable() sets
      rect.pm.enable();
      const expected = rect.pm._findCorners();
      rect.pm.disable();
      const corners = rect.pm.unstable_corners();
      corners.forEach((c: any, i: number) => {
        expect(c.lat).to.be.closeTo(expected[i].lat, 1e-9);
        expect(c.lng).to.be.closeTo(expected[i].lng, 1e-9);
      });
      // a mistaken angle of 0 would give the unrotated corners back
      expect(corners[1].lat).not.to.be.closeTo(unrotated[1].lat, 1e-6);
      expect(rect.pm).to.be.instanceOf(unstable.EditRectangle);
    });
  });

  it('lets a registered mode yield through its button', () => {
    load().then(({ map }: any) => {
      map.setView([51.5, -0.09], 13);
      map.pm.addControls();
      const add = (name: string, disableByOtherButtons: boolean) => {
        let on = false;
        let activate: () => void = () => {};
        map.pm.Toolbar.createCustomControl({
          name,
          toggle: true,
          disableByOtherButtons,
          onClick: () => {
            on = !on;
            if (on) {
              activate();
            }
          },
        });
        activate = map.pm.unstable_registerMode(name, {
          enabled: () => on,
          disable: () => {
            on = false;
          },
          button: name,
        });
        return () => on;
      };
      const yields = add('yields', true);
      map.pm.Toolbar.buttons.yields._triggerClick();
      expect(yields()).to.equal(true);
      map.pm.enableDraw('Marker');
      // clicked off, not disabled behind a still toggled button
      expect(yields()).to.equal(false);
      expect(map.pm.Toolbar.buttons.yields.toggled()).to.equal(false);
      map.pm.disableDraw();

      const stays = add('stays', false);
      map.pm.Toolbar.buttons.stays._triggerClick();
      map.pm.enableDraw('Marker');
      expect(stays()).to.equal(true);
      expect(map.pm.Toolbar.buttons.stays.toggled()).to.equal(true);
    });
  });

  it('binds the corner drag handlers a rectangle editor returns', () => {
    load().then(({ L, map }: any) => {
      map.setView([51.5, -0.09], 13);
      const plain = new L.Rectangle([
        [51.5, -0.1],
        [51.51, -0.08],
      ]).addTo(map);
      expect(plain.pm.unstable_cornerDragHandlers().drag).to.equal(
        plain.pm._onMarkerDrag
      );
      const rect = new L.Rectangle([
        [51.49, -0.1],
        [51.495, -0.08],
      ]).addTo(map);
      const calls: string[] = [];
      const handler = (name: string) =>
        function (this: unknown) {
          calls.push(`${name}:${this === rect.pm}`);
        };
      rect.pm.unstable_cornerDragHandlers = () => ({
        dragstart: handler('start'),
        drag: handler('drag'),
        dragend: handler('end'),
      });
      rect.pm.enable();
      const before = JSON.stringify(rect.getLatLngs());
      rect.pm._markers[0][0].fire('dragstart').fire('drag').fire('dragend');
      expect(calls).to.deep.equal(['start:true', 'drag:true', 'end:true']);
      expect(JSON.stringify(rect.getLatLngs())).to.equal(before);
    });
  });

  it('adds defined buttons that are opt-in and rebuilt on setLang', () => {
    load().then(({ unstable, L }: any) => {
      cy.document().then((doc) => {
        const { PM, PMButton, Toolbar } = unstable;
        Toolbar.unstable_addButtonDefiner(
          (_toolbar: unknown, add: (name: string, btn: unknown) => void) =>
            add(
              'probe',
              new PMButton({
                className: 'probe-icon',
                title: `Probe ${PM.activeLang}`,
                onClick: () => {},
                afterClick: () => {},
                doToggle: false,
                toggleStatus: false,
                disableOtherButtons: false,
                position: 'topleft',
                actions: [],
              })
            )
        );
        const div = doc.createElement('div');
        div.style.height = '300px';
        doc.body.appendChild(div);
        const map = new L.Map(div).setView([51.5, -0.09], 13);
        const toolbar = map.pm.Toolbar;
        map.pm.addControls();
        expect(toolbar.options.probe).to.equal(false);
        expect(div.querySelectorAll('.probe-icon')).to.have.length(0);
        map.pm.addControls({ probe: true });
        expect(div.querySelectorAll('.probe-icon')).to.have.length(1);

        map.pm.Toolbar.changeControlOrder(['probe', 'drawMarker']);
        map.pm.setLang('de');
        expect(Object.keys(toolbar.buttons)[0]).to.equal('probe');
        expect(toolbar.buttons.probe._button.title).to.equal('Probe de');
        expect(div.querySelectorAll('.probe-icon')).to.have.length(1);

        // a taken name throws instead of replacing a button
        Toolbar.unstable_addButtonDefiner(
          (_toolbar: unknown, add: (name: string, btn: unknown) => void) =>
            add('drawMarker', toolbar.buttons.probe)
        );
        expect(() => map.pm.setLang('en')).to.throw('already exists');
      });
    });
  });

  it('leaves out buttons a filter refuses, keeping their options', () => {
    load().then(({ unstable, map }: any) => {
      const seen: string[] = [];
      let showMarker = false;
      unstable.Toolbar.unstable_addButtonFilter((name: string) => {
        seen.push(name);
        return name !== 'drawMarker' || showMarker;
      });
      const markers = () =>
        map.getContainer().querySelectorAll('.leaflet-pm-icon-marker').length;
      map.pm.addControls({ drawText: false });
      expect(markers()).to.equal(0);
      expect(map.pm.Toolbar.options.drawMarker).to.equal(true);
      expect(seen).to.include('drawPolygon');
      expect(seen).not.to.include('drawText');
      showMarker = true;
      map.pm.addControls();
      expect(markers()).to.equal(1);
    });
  });
});
