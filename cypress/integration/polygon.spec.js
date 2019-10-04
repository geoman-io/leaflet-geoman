describe('Draw & Edit Poly', () => {
  const mapSelector = '#map';

  it('works without pmIgnore', () => {
    cy.window().then(({ L }) => {
      L.PM.initialize({ optIn: false });
      cy.drawShape('MultiPolygon');
    });

    cy.toolbarButton('edit').click();

    cy.hasVertexMarkers(8);
  });

  it('respects pmIgnore', () => {
    cy.window().then(({ L }) => {
      L.PM.initialize({ optIn: false });
      cy.drawShape('MultiPolygon', true);
    });

    cy.toolbarButton('edit').click();

    cy.hasVertexMarkers(0);
  });

  it('respects optIn', () => {
    cy.window().then(({ L }) => {
      L.PM.initialize({ optIn: true });
      cy.drawShape('MultiPolygon');
    });

    cy.toolbarButton('edit').click();

    cy.hasVertexMarkers(0);
  });

  it('respects pmIgnore with optIn', () => {
    cy.window().then(({ L }) => {
      L.PM.initialize({ optIn: true });
      cy.drawShape('MultiPolygon', false);
    });

    cy.toolbarButton('edit').click();

    cy.hasVertexMarkers(8);
  });

  it('doesnt finish single point polys', () => {
    cy.toolbarButton('polygon').click();

    cy.get(mapSelector)
      .click(90, 250)
      .click(90, 250);

    cy.toolbarButton('edit').click();

    cy.hasVertexMarkers(0);

    cy.toolbarButton('edit').click();
  });

  it('handles polygon additions mid-drawing', () => {
    // for manual testing
    cy.toolbarButton('polygon').click();
    cy.get(mapSelector)
      .click(90, 250);

    cy.wait(2000)
    cy.drawShape('LineString', true);

    // manual test if snapping works here
  });

  it('doesnt finish two point polys', () => {
    cy.toolbarButton('polygon').click();

    cy.get(mapSelector)
      .click(90, 250)
      .click(100, 350);

    cy.get('.active .action-finish').click();

    cy.toolbarButton('edit').click();

    cy.hasVertexMarkers(0);

    cy.toolbarButton('edit').click();
  });

  it('removes layer when cut completely', () => {
    cy.window().then(({ map }) => {
      Cypress.$(map).on('pm:create', ({ originalEvent }) => {
        const { layer } = originalEvent;
        layer.options.cypress = true;
      });

      Cypress.$(map).on('pm:cut', ({ originalEvent }) => {
        const { layer } = originalEvent;

        expect(Object.keys(layer.getLayers())).to.have.lengthOf(0);
      });

      Cypress.$(map).on('pm:remove', ({ originalEvent }) => {
        const { layer } = originalEvent;

        /* eslint no-unused-expressions: 0 */
        expect(layer._map).to.be.null;
        expect(layer.options.cypress).to.be.true;
      });
    });

    cy.toolbarButton('polygon').click();

    cy.get(mapSelector)
      .click(120, 150)
      .click(120, 100)
      .click(300, 100)
      .click(300, 200)
      .click(120, 150);

    cy.toolbarButton('cut').click();

    cy.get(mapSelector)
      .click(90, 150)
      .click(100, 50)
      .click(350, 50)
      .click(350, 350)
      .click(90, 150);
  });

  it('prevents self intersections', () => {
    cy.window().then(({ map }) => {
      map.pm.enableDraw('Polygon', {
        allowSelfIntersection: false,
      });

      Cypress.$(map).on('pm:create', ({ originalEvent: event }) => {
        const poly = event.layer;
        poly.pm.enable({
          allowSelfIntersection: false,
        });
      });
    });

    cy.get(mapSelector)
      .click(90, 250)
      .click(100, 50)
      .click(250, 50)
      .click(150, 150)
      .click(120, 20)
      .click(90, 250);

    cy.toolbarButton('edit').click();

    cy.hasVertexMarkers(4);
  });

  it('removes last vertex', () => {
    cy.toolbarButton('polygon').click();

    cy.get(mapSelector)
      .click(90, 250)
      .click(100, 50)
      .click(150, 50)
      .click(150, 150);

    cy.hasVertexMarkers(5);

    cy.window().then(({ map }) => {
      map.pm.Draw.Polygon._removeLastVertex();
    });

    cy.hasVertexMarkers(4);

    cy.get('.active .action-removeLastVertex').click();

    cy.hasVertexMarkers(3);

    cy.get('.active .action-cancel').click();

    cy.hasVertexMarkers(0);
  });

  it('adds new vertex to end of array', () => {
    // when adding a vertex between the first and last current vertex,
    // the new coord should be added to the end, not the beginning of the coord array
    // https://github.com/geoman-io/leaflet-geoman/issues/312

    cy.toolbarButton('polygon')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.window().then(({ map, L }) => {
      cy.get(mapSelector)
        .click(90, 250)
        .click(100, 50)
        .click(150, 50)
        .click(150, 150)
        .click(90, 250)
        .then(() => {
          let l;
          map.eachLayer(layer => {
            if (layer instanceof L.Polygon) {
              layer.pm.enable();
              l = layer;
            }
          });
          return l;
        })
        .as('poly')
        .then(poly => poly._latlngs[0][0])
        .as('firstLatLng');
    });

    cy.get('@poly').then(poly => {
      Cypress.$(poly).on('pm:vertexadded', ({ originalEvent: event }) => {
        const { layer, indexPath, latlng } = event;
        const newLatLng = Cypress._.get(layer._latlngs, indexPath);
        expect(latlng.lat).to.equal(newLatLng.lat);
        expect(latlng.lng).to.equal(newLatLng.lng);
      });
    });

    cy.get('.marker-icon-middle').click({ multiple: true });

    cy.get('@poly').then(poly => {
      cy.get('@firstLatLng').then(oldFirst => {
        const newFirst = poly._latlngs[0][0];
        expect(oldFirst.lat).to.equal(newFirst.lat);
        expect(oldFirst.lng).to.equal(newFirst.lng);
      });
    });
  });

  it('events to be called', () => {
    cy.window().then(({ map }) => {
      // test pm:create event
      Cypress.$(map).on('pm:create', ({ originalEvent: event }) => {
        const poly = event.layer;
        poly.pm.enable();

        const markers = poly.pm._markers[0];
        expect(markers).to.have.length(4);
      });

      Cypress.$(map).on('pm:remove', ({ originalEvent: event }) => {
        const layer = event.target;

        /* eslint no-unused-expressions: 0 */
        expect(layer.map).to.be.undefined;
      });
    });

    // activate polygon drawing
    cy.toolbarButton('polygon')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    // draw a polygon - triggers the event pm:create
    cy.get(mapSelector)
      .click(90, 250)
      .click(100, 50)
      .click(150, 50)
      .click(150, 150)
      .click(90, 250);

    cy.toolbarButton('delete').click();

    cy.get(mapSelector).click(110, 150);
  });

  it('draws and edits a polygon', () => {
    cy.hasLayers(1);

    // activate polygon drawing
    cy.toolbarButton('polygon')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    // draw a polygon
    cy.get(mapSelector)
      .click(90, 250)
      .click(100, 50)
      .click(150, 50)
      .click(150, 150)
      .click(200, 150)
      .click(90, 250);

    // button should be disabled after successful draw
    cy.toolbarButton('polygon')
      .closest('.button-container')
      .should('have.not.class', 'active');

    cy.hasLayers(3);

    // enable global edit mode
    cy.toolbarButton('edit').click();

    cy.hasVertexMarkers(5);
    cy.hasMiddleMarkers(5);

    // press a middle marker
    cy.get('.marker-icon-middle')
      .first()
      .click();

    // now there should be one more vertex
    cy.hasVertexMarkers(6);
    cy.hasMiddleMarkers(6);

    // let's remove one vertex and check it
    cy.get('.marker-icon:not(.marker-icon-middle)')
      .last()
      .trigger('contextmenu');

    cy.hasVertexMarkers(5);
    cy.hasMiddleMarkers(5);

    // remove all markers
    cy.get('.marker-icon:not(.marker-icon-middle)').each(($el, index) => {
      if (index === 4) {
        // the last marker should be removed automatically, so it shouldn't exist
        cy.wrap($el).should('not.exist');
      } else {
        // remove markers
        cy.wrap($el).trigger('contextmenu');
      }
    });

    cy.hasVertexMarkers(0);
    cy.hasMiddleMarkers(0);

    cy.toolbarButton('edit')
      .click()
      .closest('.button-container')
      .should('have.not.class', 'active');
  });

  it('draws a polygon with a hole', () => {
    // activate polygon drawing
    cy.toolbarButton('polygon')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    // draw a polygon
    cy.get(mapSelector)
      .click(90, 250)
      .click(150, 50)
      .click(500, 50)
      .click(500, 300)
      .click(300, 350)
      .click(90, 250);

    // activate cutting drawing
    cy.toolbarButton('cut')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    // draw a polygon to cut
    cy.get(mapSelector)
      .click(450, 100)
      .click(450, 150)
      .click(400, 150)
      .click(390, 140)
      .click(390, 100)
      .click(450, 100);

    // enable global edit mode
    cy.toolbarButton('edit')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.hasVertexMarkers(10);
    cy.hasMiddleMarkers(10);

    cy.toolbarButton('edit')
      .click()
      .closest('.button-container')
      .should('have.not.class', 'active');
  });

  it('should handle MultiPolygons', () => {
    cy.drawShape('MultiPolygon');

    // enable global edit mode
    cy.toolbarButton('edit')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.hasVertexMarkers(8);
    cy.hasMiddleMarkers(8);

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
      .click(200, 150)
      .click(200, 150);

    cy.toolbarButton('edit')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.hasVertexMarkers(13);
    cy.hasMiddleMarkers(12);

    cy.toolbarButton('delete')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector).click(650, 100);

    cy.toolbarButton('edit')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.hasVertexMarkers(5);
    cy.hasMiddleMarkers(4);

    cy.toolbarButton('edit').click();
  });
});
