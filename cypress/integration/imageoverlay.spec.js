describe('Opens Testing Environment', () => {
  const mapSelector = '#map';

  it('Snap to ImageOverlay', () => {
    let eventcalled = '';
    cy.window().then(({ map, L }) => {
      map.setView([18.74469, 72.1258], 10);
      const icon =
        'https://camo.githubusercontent.com/33fa9a94048274f81a806631ca881a55c2aa8f0a/68747470733a2f2f66696c652d6a787a796a67717775742e6e6f772e73682f';
      L.imageOverlay(
        icon,
        [
          [18.74469, 72.1258],
          [18.94469, 72.3258],
        ],
        { interactive: true }
      ).addTo(map);

      map.on('pm:drawstart', (e) => {
        const layer = e.workingLayer;
        layer.on('pm:snap', (x) => {
          eventcalled = x.type;
        });
      });
    });

    cy.toolbarButton('polygon').click();

    cy.window().then(({ map }) => {
      const point = map.latLngToContainerPoint([18.74469, 72.1258]);
      cy.get(mapSelector).click(point);
    });

    cy.window().then(() => {
      expect(eventcalled).to.equal('pm:snap');
    });
  });

  it('Drags ImageOverlay', () => {
    let eventcalled = false;
    let io;
    cy.window().then(({ map, L }) => {
      map.setView([18.74469, 72.1258], 10);
      const icon =
        'https://camo.githubusercontent.com/33fa9a94048274f81a806631ca881a55c2aa8f0a/68747470733a2f2f66696c652d6a787a796a67717775742e6e6f772e73682f';
      io = L.imageOverlay(
        icon,
        [
          [18.74469, 72.1258],
          [18.94469, 72.3258],
        ],
        { interactive: true }
      ).addTo(map);

      io.pm._simulateMouseDownEvent = () => {
        eventcalled = true;
      };
    });

    cy.toolbarButton('drag').click();

    cy.window().then(() => {
      cy.get(io._image).trigger('mousedown');
    });

    cy.window().then(() => {
      expect(eventcalled).to.equal(true);
    });
  });
});
