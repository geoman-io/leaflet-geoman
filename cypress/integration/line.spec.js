describe('Draw & Edit Line', () => {
  // map and leaflet object

  const mapSelector = '#map';

  it('doesnt finish single point lines', () => {
    cy.toolbarButton('polyline').click();

    cy.get(mapSelector).click(90, 250).click(90, 250);

    cy.toolbarButton('edit').click();

    cy.hasVertexMarkers(0);
  });

  it('removes last vertex', () => {
    let eventCalled = false;
    cy.window().then(({ map }) => {
      map.on('pm:drawstart', (e) => {
        e.workingLayer.on('pm:vertexremoved', () => {
          eventCalled = true;
        });
      });
    });

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
    cy.window().then(() => {
      expect(eventCalled).to.eq(true);
    });
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

      map.pm.enableDraw('Polygon', {
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

    cy.toolbarButton('polygon').click();

    cy.get(mapSelector)
      .click(320, 150)
      .click(320, 100)
      .click(400, 100)
      .click(400, 200)
      .click(320, 150);

    cy.toolbarButton('edit').click();

    cy.window().then(({ map, L }) => {
      map.eachLayer((l) => {
        if (l instanceof L.Polygon) expect(l.options.color).to.equal('black');
      });
    });
  });

  it('draws and edits a line', () => {
    cy.hasLayers(1);

    // activate line drawing
    cy.toolbarButton('polyline')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector).should('have.class', 'geoman-draw-cursor');

    // draw a line
    cy.get(mapSelector)
      .click(150, 250)
      .click(160, 50)
      .click(250, 50)
      .click(250, 250)
      .click(250, 250);

    cy.get(mapSelector).should('not.have.class', 'geoman-draw-cursor');

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
    cy.get('.marker-icon-middle').first().click();

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

  it('hide middle markers', () => {
    // activate line drawing
    cy.toolbarButton('polygon')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    // draw a line
    cy.get(mapSelector)
      .click(150, 250)
      .click(160, 50)
      .click(250, 50)
      .click(250, 250)
      .click(150, 250);

    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({ hideMiddleMarkers: true });
    });

    cy.toolbarButton('edit').click();

    cy.hasMiddleMarkers(0);
  });

  it('enable continueDrawing', () => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({ continueDrawing: true });
    });

    cy.toolbarButton('polyline').click();

    // draw a line
    cy.get(mapSelector)
      .click(150, 250)
      .click(160, 50)
      .click(250, 50)
      .click(250, 50);

    cy.get(mapSelector).click(200, 200).click(250, 250).click(250, 250);

    cy.toolbarButton('edit').click();
    cy.hasVertexMarkers(5);
  });

  it('edit MultiLineString', () => {
    cy.drawShape('MultiLineString');

    cy.toolbarButton('edit').click();

    cy.get(mapSelector).rightclick(641, 462).rightclick(702, 267);

    cy.hasVertexMarkers(3);
    cy.hasMiddleMarkers(2);
  });

  it('cut MultiLineString', () => {
    cy.drawShape('MultiLineString');

    cy.toolbarButton('cut').click();
    cy.get(mapSelector)
      .click(394, 203)
      .click(333, 77)
      .click(607, 112)
      .click(394, 203);

    cy.toolbarButton('edit').click();
    cy.hasVertexMarkers(10);
    cy.hasMiddleMarkers(6);

    cy.window().then(({ map }) => {
      const layers = map.pm.getGeomanDrawLayers();
      expect(layers.length).to.eq(1);
      expect(layers[0].getLatLngs().length).to.eq(4);
    });
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

    cy.toolbarButton('polyline').click();
    cy.get(mapSelector).click(350, 250).click(190, 160).click(190, 60);

    cy.window().then(({ map }) => {
      map.pm.Draw.Line._finishShape();
      expect(1).to.eq(map.pm.getGeomanDrawLayers().length);
    });

    cy.get(mapSelector).click(250, 50);

    cy.window().then(({ map }) => {
      map.pm.Draw.Line._finishShape();
      expect(2).to.eq(map.pm.getGeomanDrawLayers().length);
    });
  });

  it('vertex marker overlapping', () => {
    cy.toolbarButton('polyline').click();
    cy.get(mapSelector)
      .click(150, 250)
      .click(160, 50)
      .click(250, 50)
      .click(155, 255);

    cy.hasVertexMarkers(0);
  });

  it('remove line if enabled', () => {
    cy.toolbarButton('polyline')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector).click(200, 200).click(250, 250).click(250, 250);

    cy.toolbarButton('edit').click();

    cy.hasLayers(7);
    cy.window().then(({ map }) => {
      const layer = map.pm.getGeomanDrawLayers()[0];
      layer.remove();
    });
    cy.hasLayers(2);
  });

  it('change color of line while drawing', () => {
    cy.toolbarButton('polyline')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector).click(200, 200);
    cy.get(mapSelector).click(100, 230);
    cy.get(mapSelector).trigger('mousemove', 300, 300);

    cy.window().then(({ map }) => {
      const style = {
        color: 'red',
      };
      map.pm.setGlobalOptions({ templineStyle: style, hintlineStyle: style });

      const layer = map.pm.Draw.Line._layer;
      const hintLine = map.pm.Draw.Line._hintline;
      expect(layer.options.color).to.eql('red');
      expect(hintLine.options.color).to.eql('red');
    });
  });
});
