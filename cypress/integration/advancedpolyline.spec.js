describe('Draw & Edit Line', () => {
  // map and leaflet object

   const mapSelector = '#map';

  it('draws a line', () => {

    cy.window().then(({ map, L }) => {
      map.pm.enableDraw('AdvancedPolyline',{});
      map.setView([18.52, 73.85], 18);
      L.advancedPolyline([[18.7,72.1],[19,74],[18.52,73.85]]).addTo(map);
    });
  });
});
