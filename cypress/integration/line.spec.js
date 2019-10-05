describe('Draw & Edit Line', () => {
  // map and leaflet object

  const mapSelector = '#map';

  it('doesnt finish single point lines', () => {
    cy.toolbarButton('polyline').click();

    cy.get(mapSelector)
      .click(90, 250)
      .click(90, 250);

    cy.toolbarButton('edit').click();

    cy.hasVertexMarkers(0);
  });

  it('removes last vertex', () => {
    cy.toolbarButton('polyline').click();

    cy.get(mapSelector)
      .click(190, 250)
      .click(200, 50)
      .click(250, 50)
      .click(250, 250);

    cy.hasVertexMarkers(5);

    cy.get('.button-container.active .action-removeLastVertex').click();

    cy.hasVertexMarkers(4);

    cy.get('.button-container.active .action-removeLastVertex').click();

    cy.hasVertexMarkers(3);
  });

  it('respects custom style', () => {

    cy.window().then(({ map }) => {
      map.on('pm:create', (e) => {
        e.layer.pm.enable({
          allowSelfIntersection: false,
          snappable: false,
          snapDistance: 20
        });

        e.layer.setStyle({ color: 'black' });
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

    cy.toolbarButton('polygon').click()

    cy.get(mapSelector)
      .click(320, 150)
      .click(320, 100)
      .click(400, 100)
      .click(400, 200)
      .click(320, 150);

    cy.toolbarButton('edit').click()

    cy.window().then(({ map, L }) => {
      map.eachLayer((l) => {
        if (l instanceof L.Polygon)
          expect(l.options.color).to.equal('black');
      })
    });
  });



  it('draws and edits a line', () => {
    cy.hasLayers(1);

    // activate line drawing
    cy.toolbarButton('polyline')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    // draw a line
    cy.get(mapSelector)
      .click(90, 250)
      .click(100, 50)
      .click(150, 50)
      .click(150, 150)
      .click(150, 150);

    // button should be disabled after successful draw
    cy.toolbarButton('polyline')
      .closest('.button-container')
      .should('have.not.class', 'active');

    cy.hasLayers(3);

    // enable global edit mode
    cy.toolbarButton('edit').click();

    cy.hasVertexMarkers(4);
    cy.hasMiddleMarkers(3);

    // press a middle marker
    cy.get('.marker-icon-middle')
      .first()
      .click();

    // now there should be one more vertex
    cy.hasVertexMarkers(5);

    // and one more middlemarker
    cy.hasMiddleMarkers(4);

    // rightclick on a vertex-marker to delete it
    cy.get('.marker-icon:not(.marker-icon-middle)')
      .first()
      .trigger('contextmenu');

    cy.hasVertexMarkers(4);
    cy.hasMiddleMarkers(3);

    // disable global edit mode
    cy.toolbarButton('edit').click();

    // there should be no markers anymore
    cy.hasVertexMarkers(0);
    cy.hasMiddleMarkers(0);
  });
});
