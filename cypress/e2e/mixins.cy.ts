describe('KeyboardMixin', () => {
  it('Should unbind event listeners that bound by the KeyboardMixin after the map is destroyed', () => {
    cy.window().then((window) => {
      const { map, document } = window;
      const keyboard = map.pm.Keyboard;

      document.dispatchEvent(
        new window.KeyboardEvent('keydown', { key: 'a', bubbles: true })
      );
      expect(keyboard.getPressedKey(), 'listener is bound').to.eq('a');

      map.remove();

      document.dispatchEvent(
        new window.KeyboardEvent('keydown', { key: 'b', bubbles: true })
      );
      expect(
        keyboard.getPressedKey(),
        'document keyboard event listener is not unbound'
      ).to.eq('a');

      window.dispatchEvent(new window.FocusEvent('blur'));
      // a handled blur would replace the last key event
      expect(
        keyboard.getPressedKey(),
        'window blur event listener is not unbound'
      ).to.eq('a');
    });
  });
});
