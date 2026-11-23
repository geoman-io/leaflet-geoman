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
});
