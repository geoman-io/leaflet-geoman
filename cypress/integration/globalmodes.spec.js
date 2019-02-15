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

  it.only('unable to remove layer with pmIgnore:true', () => {
    cy.window().then(({ L, map }) => {
      const testLayer = new L.FeatureGroup();
      map.addLayer(testLayer);

      Cypress.$(map).on('pm:create', ({ originalEvent: event }) => {
        const poly = event.layer;

        const coords = poly.getLatLngs();

        const newPoly = L.polygon(coords, { pmIgnore: true }).addTo(testLayer);
        poly.remove();

        return newPoly;
      });
    });

    cy.toolbarButton('polygon').click();

    cy.get(mapSelector)
      .click(320, 150)
      .click(320, 100)
      .click(400, 100)
      .click(400, 200)
      .click(320, 150);

    cy.toolbarButton('delete').click();
    cy.get(mapSelector).click(330, 130);

    cy.window().then(({ L, map }) => {
      const layers = map._layers;

      expect(
        Object.entries(layers).filter(l => l[1] instanceof L.Polygon).length
      ).to.equal(1);
    });
  });

  it('re-applies edit mode onAdd', () => {
    cy.toolbarButton('polygon').click();

    const jsonString =
      '{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[-0.155182,51.515687],[-0.155182,51.521028],[-0.124283,51.521028],[-0.124283,51.510345],[-0.155182,51.515687]]]}}';

    const poly = JSON.parse(jsonString);

    cy.get(mapSelector)
      .click(320, 150)
      .click(320, 100)
      .click(400, 100)
      .click(400, 200)
      .click(320, 150);

    cy.toolbarButton('edit').click();
    cy.hasVertexMarkers(4);

    cy.window().then(({ map, L }) => {
      L.geoJSON(poly).addTo(map);
    });

    cy.hasVertexMarkers(8);

    cy.toolbarButton('edit').click();
  });

  it('re-applies removal mode onAdd', () => {
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

    cy.hasLayers(2);

    cy.toolbarButton('marker').click();

    cy.get(mapSelector).click(90, 250);

    cy.toolbarButton('marker').click();

    cy.get(mapSelector).click(90, 245);

    cy.hasLayers(3);
  });
});
