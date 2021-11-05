describe('Draw & Edit Curve', () => {
  // map and leaflet object

  const mapSelector = '#map';

  it('doesnt finish single point curves', () => {
    cy.toolbarButton('curve').click();

    cy.get(mapSelector).click(90, 250).click(200, 250);

    cy.toolbarButton('edit').click();

    cy.hasVertexMarkers(0);
  });

  it('removes last vertex', () => {
    cy.toolbarButton('curve').click();

    cy.get(mapSelector)
      .click(190, 250)
      .trigger('mousedown', 500, 250)
      .trigger('mousemove', 500, 300)
      .trigger('mousemove', 400, 350)
      .trigger('mouseup')

    cy.hasVertexMarkers(3); // 2 + mouse

    cy.get('.button-container.active .action-removeLastVertex').click();

    cy.hasVertexMarkers(2); // first + mouse

    cy.get('.button-container.active .action-removeLastVertex').click();

    cy.hasVertexMarkers(0); // remove all
  });

  it('respects custom style', () => {
    cy.window().then(({ map }) => {
      map.on('pm:create', (e) => {
        e.layer.pm.enable({
          allowSelfIntersection: false,
          snappable: false,
          snapDistance: 20,
        });

        e.layer.setStyle({ color: 'black' });
      });

      map.pm.enableDraw('Curve', {
        snappable: false,
        snapDistance: 20,
        allowSelfIntersection: true,
        finishOn: 'dblclick',
        templineStyle: {
          color: 'orange',
          dashArray: [10, 10],
          weight: 5,
        },
        hintlineStyle: {
          color: 'orange',
          dashArray: [10, 10],
          weight: 1,
        },
        pathOptions: {
          fill: true,
          color: 'orange',
          fillColor: 'yellow',
          dashArray: [10, 10],
          weight: 5,
          fillOpacity: 1,
          opacity: 1,
        },
      });
    });

    cy.get(mapSelector)
      .click(120, 150)
      .click(120, 100)
      .click(300, 100)
      .click(300, 200)
      .click(120, 150);

    cy.toolbarButton('curve').click();

    cy.get(mapSelector)
      .click(320, 150)
      .click(320, 100)
      .click(400, 100)
      .click(400, 200)
      .click(320, 150);

    cy.toolbarButton('edit').click();

    cy.window().then(({ map, L }) => {
      map.eachLayer((l) => {
        if (l instanceof L.Curve) expect(l.options.color).to.equal('black');
      });
    });
  });

  it('draws and edits a curve', () => {
    cy.hasLayers(1);

    // activate curve drawing
    cy.toolbarButton('curve')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    // draw a curve
    cy.get(mapSelector)
      .click(190, 250)
      .trigger('mousedown', 500, 250)
      .trigger('mousemove', 500, 300)
      .trigger('mousemove', 400, 350)
      .trigger('mouseup')
      .click(190, 250)

    // button should be disabled after successful draw
    cy.toolbarButton('curve')
      .closest('.button-container')
      .should('have.not.class', 'active');

    cy.hasLayers(3);

    // enable global edit mode
    cy.toolbarButton('edit').click();

    cy.hasVertexMarkers(3);

    // click the second marker (cubic edit)
    cy.get('.marker-icon').eq(1).click();

    // now there should be 2 editing handles
    cy.hasHandleMarkers(2);

    // rightclick on a vertex-marker to delete it
    cy.get('.marker-icon:not(.marker-edit-handle)')
      .eq(1)
      .trigger('contextmenu');

    cy.hasVertexMarkers(2);
    // handle markers should disappear
    cy.hasHandleMarkers(0);
    // disable global edit mode
    cy.toolbarButton('edit').click();

    // there should be no markers anymore
    cy.hasVertexMarkers(0);
  });

  it('enable continueDrawing', () => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({ continueDrawing: true });
    });

    cy.toolbarButton('curve').click();

    // draw a line with the curve tool
    
    cy.get(mapSelector)
      .click(150, 250)
      .trigger('mousedown', 160, 50)
      .trigger('mousemove', 250, 300)
      .trigger('mousemove', 250, 300)
      .trigger('mouseup')
      .click(150, 250)

    cy.get(mapSelector)
      .click(300, 250)
      .trigger('mousedown', 250, 50)
      .trigger('mousemove', 300, 300)
      .trigger('mousemove', 300, 300)
      .trigger('mouseup')
      .click(300, 250)

    cy.toolbarButton('edit').click();
    cy.hasVertexMarkers(6);
  });


  it('requireSnapToFinish', () => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({
        requireSnapToFinish: true,
        snapSegment: false,
      });
    });

    cy.toolbarButton('polygon').click();
    cy.get(mapSelector)
      .click(150, 250)
      .click(160, 50)
      .click(250, 50)
      .click(150, 250);

    cy.toolbarButton('curve').click();
    cy.get(mapSelector).click(350, 250).click(300, 160).click(190, 60);

    cy.window().then(({ map }) => {
      map.pm.Draw.Curve._finishShape();
      expect(1).to.eq(map.pm.getGeomanDrawLayers().length);
    });

    cy.get(mapSelector).click(250, 50);

    cy.window().then(({ map }) => {
      map.pm.Draw.Curve._finishShape();
      expect(2).to.eq(map.pm.getGeomanDrawLayers().length);
    });
  });

});
