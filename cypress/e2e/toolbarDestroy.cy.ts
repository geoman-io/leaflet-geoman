describe('Destroying a toolbar button', () => {
  it('removes only that button and tolerates repeated destruction', () => {
    cy.window().then(({ map }) => {
      const button = map.pm.Toolbar.buttons.drawMarker;
      const sibling = map.pm.Toolbar.buttons.drawPolygon;
      const siblingNode = sibling.buttonsDomNode;

      expect(button.buttonsDomNode.isConnected).to.equal(true);
      button.destroy();
      expect(button.buttonsDomNode.isConnected).to.equal(false);
      expect(siblingNode.isConnected).to.equal(true);
      button.destroy();
      expect(siblingNode.isConnected).to.equal(true);
    });
  });

  it('allows destroying a button before it has been added to a map', () => {
    cy.window().then(({ L }) => {
      const button = new L.Control.PMButton({});
      button.destroy();
    });
  });
});
