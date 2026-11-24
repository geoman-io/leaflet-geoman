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
      unstable.addTranslations('en', {
        buttonTitles: { probeButton: 'Probe' },
      });
      map.pm.setLang('xx');
      expect(title('drawMarker')).to.equal('Pin');
      expect(title('drawPolygon')).to.equal('Area');
      // untranslated texts fall back to English
      expect(title('drawCircle')).to.equal('Draw Circle');
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
});
