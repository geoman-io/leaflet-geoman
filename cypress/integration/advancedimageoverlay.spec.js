describe('Draw & Edit AdvancedImageOverlay', () => {

  it('Draw with a rotation', () => {

    let advancedImageOverlay;
    cy.window().then(({ map, L }) => {
      map.setView([18.74469, 72.1258], 18);
      const icon = 'https://zoomyourevent.blob.core.windows.net/map/objectIcon/personal.svg';
      advancedImageOverlay = L.advancedImageOverlay(icon, new L.LatLngBounds([18.74469, 72.1258], [18.74489, 72.1260]), {interactive: true,
        rotation: {
          deg: 45
        }}).addTo(map);
      const center = advancedImageOverlay.getCenter();
      expect(center.lat).to.approximately(18.744790000029656, 0.0000000000001);
      expect(center.lng).to.approximately(72.12590000000002, 0.0000000000001);

      L.DomEvent.on(advancedImageOverlay.getElement(), 'load', () => {
        expect(45).to.equal(advancedImageOverlay.getAngle());
      })


    });
  });
});
