describe('Layers added during global rotation', () => {
  it('honors rotation permission independently of removal permission', () => {
    let rotatable: L.Rectangle;
    let locked: L.Rectangle;
    cy.window().then(({ L, map }) => {
      map.pm.enableGlobalRotateMode();
      rotatable = L.rectangle([
        [51.5, -0.1],
        [51.51, -0.09],
      ]);
      rotatable.pm.setOptions({ allowRotation: true, allowRemoval: false });
      rotatable.addTo(map);
      locked = L.rectangle([
        [51.51, -0.08],
        [51.52, -0.07],
      ]);
      locked.pm.setOptions({ allowRotation: false, allowRemoval: true });
      locked.addTo(map);
    });
    // Global mode handlers batch layer additions for 100 ms.
    cy.wrap(null).should(() => {
      expect(rotatable.pm.rotateEnabled()).to.equal(true);
      expect(locked.pm.rotateEnabled()).to.equal(false);
    });
  });
});
