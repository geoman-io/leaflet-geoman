describe('Removal Mode', () => {
  const mapSelector = '#map';

  it('properly removes layers', () => {
    cy.toolbarButton('marker').click();

    cy.get(mapSelector)
      .click(90, 250)
      .click(120, 250);

    cy.toolbarButton('delete').click();

    cy.hasLayers(3);

    cy.get(mapSelector)
      .click(90, 245)
      .click(120, 245);

    cy.hasLayers(1);

    cy.toolbarButton('delete').click();
  });

  it('re-applies onAdd of layers', () => {
    cy.toolbarButton('marker').click();

    cy.get(mapSelector)
      .click(90, 250)
      .click(120, 250);

    cy.toolbarButton('delete').click();

    cy.get(mapSelector).click(90, 245);

    cy.hasLayers(2);

    cy.window().then(({ map, L }) => {
      const m1 = L.marker([51.505, -0.09]).addTo(map);
      const m2 = L.marker([51.505, -0.08]).addTo(map);

      cy.wrap(m1._icon).click();
      cy.wrap(m2._icon).click();
    });

    cy.hasLayers(1);
  });
});
