describe('Opens Testing Environment', () => {
  const mapSelector = '#map';

  it('opens a map in a browser', () => {});

  it('gets all geoman Layers', () => {
    cy.toolbarButton('polygon').click();

    cy.window().then(() => {
      cy.get(mapSelector)
        .click(90, 250)
        .click(100, 50)
        .click(150, 50)
        .click(150, 150)
        .click(90, 250);
    });

    cy.window().then(({ map }) => {
      const count = map.pm.getGeomanLayers().length;
      expect(count).to.equal(1);
    });
  });

  it('gets all drawn geoman Layers', () => {
    cy.window().then(({ map, L }) => {
      L.marker(map.getCenter()).addTo(map);
    });

    cy.toolbarButton('polygon').click();

    cy.window().then(() => {
      cy.get(mapSelector)
        .click(90, 250)
        .click(100, 50)
        .click(150, 50)
        .click(150, 150)
        .click(90, 250);
    });

    cy.window().then(({ map }) => {
      const count = map.pm.getGeomanLayers().length;
      expect(count).to.equal(2);
      const count2 = map.pm.getGeomanDrawLayers().length;
      expect(count2).to.equal(1);
    });
  });
});
