// The ./unstable entry that Pro builds on shares one module instance with the
// main entry.
describe('unstable entry', () => {
  it('shares its classes with the main entry and sets Geoman up', () => {
    cy.visit('/cypress/fixtures/unstable.html');
    cy.window()
      .its('geoman')
      .then(({ unstable, main, map }: any) => {
        const { PM } = main;
        expect(unstable.DrawTool).to.equal(PM.DrawTool);
        expect(unstable.Draw).to.equal(PM.Draw);
        expect(unstable.DrawPolygon).to.equal(PM.Draw.Polygon);
        expect(unstable.Edit).to.equal(PM.Edit);
        expect(unstable.EditLine).to.equal(PM.Edit.Line);
        expect(unstable.Map).to.equal(PM.Map);
        expect(unstable.Toolbar).to.equal(PM.Toolbar);
        expect(unstable).not.to.have.property('PM');
        expect(map.pm).to.be.instanceOf(PM.Map);
        expect(map.pm.Draw).to.be.instanceOf(unstable.Draw);
      });
  });
});
