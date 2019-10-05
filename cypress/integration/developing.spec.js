describe('Opens Testing Environment', () => {
  const mapSelector = '#map';

  it('opens a map in a browser', () => {
    cy.window().then(({ map }) => {

      map.on('pm:create', ({ layer }) => {
        layer.setStyle({ color: 'black' })

        layer.pm.enable({
          allowSelfIntersection: false,
          snappable: false,
          snapDistance: 20
        });
      })

      map.pm.enableDraw('Polygon', {
        snappable: false,
        snapDistance: 20,
        allowSelfIntersection: true,
        finishOn: 'dblclick',
        templineStyle: {
          color: 'orange',
          dashArray: [10, 10],
          weight: 5
        },
        hintlineStyle: {
          color: 'orange',
          dashArray: [10, 10],
        },
        pathOptions: {
          color: 'orange',
          fillColor: 'yellow',
          dashArray: [10, 10],
          weight: 5,
          fillOpacity: 1,
          opacity: 1
        }
      });
    });

    cy.get(mapSelector)
      .click(120, 150)
      .click(120, 100)
      .click(300, 100)
      .click(300, 200)
      .click(120, 150);

  });
});
