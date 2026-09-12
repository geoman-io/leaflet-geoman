describe('KeyboardMixin', () => {
  it('Should unbind event listeners that bound by the KeyboardMixin after the map is destroyed', () => {
    cy.window().then((window) => {
      const { map, document } = window;

      map.remove();

      const isWindowBlurEventUnbound = !Object.entries(
        window._leaflet_events
      ).some(([name, handler]) => name.startsWith('blur') && handler);
      expect(
        isWindowBlurEventUnbound,
        'window blur event listener is not unbound'
      ).to.eq(true);

      const isKeyUpDownEventUnbound = !Object.entries(
        document._leaflet_events
      ).some(([name, handler]) => name.startsWith('key') && handler);
      expect(
        isKeyUpDownEventUnbound,
        'document keyboard event listener is not unbound'
      ).to.eq(true);
    });
  });
});
