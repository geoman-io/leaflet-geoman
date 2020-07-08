describe('Opens Testing Environment', () => {
  const mapSelector = '#map';

  it('opens a map in a browser', () => {

  });

  it('gets all geoman Layers', () => {
    cy.toolbarButton('polygon')
      .click()

    cy.window().then(() => {
      cy.get(mapSelector)
        .click(90, 250)
        .click(100, 50)
        .click(150, 50)
        .click(150, 150)
        .click(90, 250)
    });

    cy.window().then(({ map}) => {
      const count = map.pm.getGeomanLayers().length;
      expect(count).to.equal(2);
    });

  });
});
