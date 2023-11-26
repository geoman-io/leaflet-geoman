describe('Draw & Edit Poly', () => {
  const mapSelector = '#map';

  it('drages shared vertices when pinned', () => {
    cy.toolbarButton('polygon').click();

    cy.get(mapSelector).should('have.class', 'geoman-draw-cursor');

    cy.get(mapSelector)
      .click(120, 150)
      .click(120, 100)
      .click(300, 100)
      .click(300, 200)
      .click(120, 150);

    cy.get(mapSelector).should('not.have.class', 'geoman-draw-cursor');

    cy.toolbarButton('marker').click();

    cy.get(mapSelector).click(300, 100);

    cy.toolbarButton('edit').click();
  });

  it('works without pmIgnore', () => {
    cy.window().then(({ L }) => {
      L.PM.setOptIn(false);
      cy.drawShape('MultiPolygon');
    });

    cy.toolbarButton('edit').click();

    cy.hasVertexMarkers(8);
  });

  it('respects pmIgnore', () => {
    cy.window().then(({ L }) => {
      L.PM.setOptIn(false);
      cy.drawShape('MultiPolygon', true);
    });

    cy.toolbarButton('edit').click();

    cy.hasVertexMarkers(0);
  });

  it('respects optIn', () => {
    cy.window().then(({ L }) => {
      L.PM.setOptIn(true);
      cy.drawShape('MultiPolygon');
    });

    cy.toolbarButton('edit').click();

    cy.hasVertexMarkers(0);
  });

  it('OptIn drawing without error', () => {
    cy.window().then(({ L }) => {
      L.PM.setOptIn(true);
    });
    cy.toolbarButton('polygon').click();
    cy.get(mapSelector)
      .click(120, 150)
      .click(120, 100)
      .click(300, 100)
      .click(300, 200)
      .click(120, 150);

    cy.hasDrawnLayers(1);
  });

  it('pmIgnore:true disable editing', () => {
    cy.window().then(({ map }) => {
      map.on('pm:create', (e) => {
        e.layer.options.pmIgnore = true;
      });
    });

    cy.toolbarButton('polygon').click();
    cy.get(mapSelector)
      .click(120, 150)
      .click(120, 100)
      .click(300, 100)
      .click(300, 200)
      .click(120, 150);

    cy.hasDrawnLayers(1);
    cy.toolbarButton('edit').click();
    cy.hasVertexMarkers(0);
  });

  it('pmIgnore:true disable deleting', () => {
    cy.window().then(({ map }) => {
      map.on('pm:create', (e) => {
        e.layer.options.pmIgnore = true;
      });
    });

    cy.toolbarButton('polygon').click();
    cy.get(mapSelector)
      .click(120, 150)
      .click(120, 100)
      .click(300, 100)
      .click(300, 200)
      .click(120, 150);

    cy.hasDrawnLayers(1);
    cy.toolbarButton('delete').click();
    cy.get(mapSelector).click(220, 160);
    cy.hasDrawnLayers(1);
  });

  it('respects pmIgnore with optIn', () => {
    cy.window().then(({ L }) => {
      L.PM.setOptIn(true);
      cy.drawShape('MultiPolygon', false);
    });

    cy.toolbarButton('edit').click();

    cy.hasVertexMarkers(8);
  });

  it('respects optIn and reinit layer', () => {
    cy.window().then(({ L }) => {
      L.PM.setOptIn(true);
      cy.drawShape('MultiPolygon').then((poly) => {
        cy.hasVertexMarkers(0); // Not allowed because optIn
        L.PM.setOptIn(false);
        L.PM.reInitLayer(poly);
      });
    });
    cy.toolbarButton('edit').click();

    cy.hasVertexMarkers(8);
  });

  it('respects optIn and reinit layer with pmIgnore', () => {
    cy.window().then(({ L }) => {
      L.PM.setOptIn(true);
      cy.drawShape('MultiPolygon', true).then((poly) => {
        cy.hasVertexMarkers(0); // Not allowed because optIn
        L.PM.reInitLayer(poly); // Not allowed because pmIgnore is not false
        cy.hasVertexMarkers(0);
        L.PM.setOptIn(false);
        L.PM.reInitLayer(poly); // Not allowed because pmIgnore is true
        cy.hasVertexMarkers(0);
        poly.options.pmIgnore = false;
        poly.eachLayer((layer) => {
          layer.options.pmIgnore = false;
        });
        L.PM.reInitLayer(poly); // Allowed because pmIgnore is not true
      });
    });
    cy.toolbarButton('edit').click();

    cy.hasVertexMarkers(8);
  });

  it('respects optIn and disable optIn', () => {
    cy.window().then(({ L }) => {
      L.PM.setOptIn(true);
      cy.drawShape('MultiPolygon');
      cy.drawShape('MultiPolygon', false).then(() => {
        L.PM.setOptIn(false);
        cy.drawShape('MultiPolygon');
      });
    });

    cy.toolbarButton('edit').click();

    cy.hasVertexMarkers(16);
  });

  it('doesnt finish single point polys', () => {
    cy.toolbarButton('polygon').click();

    cy.get(mapSelector).click(90, 250).click(90, 250);

    cy.toolbarButton('edit').click();

    cy.hasVertexMarkers(0);

    cy.toolbarButton('edit').click();
  });

  it('handles polygon additions mid-drawing', () => {
    // for manual testing
    cy.toolbarButton('polygon').click();
    cy.get(mapSelector).click(90, 250);

    cy.wait(2000);
    cy.drawShape('LineString', true);

    // manual test if snapping works here
  });

  it('doesnt finish two point polys', () => {
    cy.toolbarButton('polygon').click();

    cy.get(mapSelector).click(90, 250).click(100, 350);

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
        expect(layer.options.cypress).to.equal(true);
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
    let intersectEventCalled = false;
    cy.window().then(({ map }) => {
      map.pm.enableDraw('Polygon', {
        allowSelfIntersection: false,
      });

      map.on('pm:create', (event) => {
        const poly = event.layer;
        poly.pm.enable({
          allowSelfIntersection: false,
        });
      });

      map.on('pm:intersect', () => {
        intersectEventCalled = true;
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

    cy.window().then(() => {
      expect(intersectEventCalled).to.eql(true);
    });
  });

  it('doesnt allow duplicate points in polygon', () => {
    cy.toolbarButton('polygon').click();

    cy.get(mapSelector)
      .click(90, 250)
      .click(100, 50)
      .click(150, 50)
      .dblclick(150, 150)
      .click(90, 250);

    cy.toolbarButton('edit').click();

    cy.hasVertexMarkers(4);

    cy.toolbarButton('edit').click();
  });

  it('doesnt break on dblclick while self intersection disabled', () => {
    cy.window().then(({ map }) => {
      map.pm.enableDraw('Polygon', {
        allowSelfIntersection: false,
      });
    });

    cy.get(mapSelector)
      .click(90, 250)
      .click(100, 50)
      .click(150, 50)
      .dblclick(150, 150)
      .click(90, 250);

    cy.toolbarButton('edit').click();

    cy.hasVertexMarkers(4);

    cy.toolbarButton('edit').click();
  });

  it('create vertex when dblclick', () => {
    cy.window().then(({ map }) => {
      map.pm.enableDraw('Polygon', {
        allowSelfIntersection: false,
        finishOn: 'dblclick',
      });
    });

    cy.get(mapSelector)
      .click(90, 250)
      .click(100, 50)
      .click(150, 50)
      .dblclick(150, 150);

    cy.toolbarButton('edit').click();

    cy.hasVertexMarkers(4);

    cy.toolbarButton('edit').click();
  });

  it('prevent creation while self intersection', () => {
    cy.window().then(({ map }) => {
      map.pm.enableDraw('Polygon', {
        allowSelfIntersection: false,
      });
    });

    cy.get(mapSelector)
      .click(470, 100)
      .click(320, 220)
      .click(600, 220)
      .click(470, 350)
      .click(470, 100);

    cy.toolbarButton('polygon').click();

    cy.hasLayers(2);
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
          map.eachLayer((layer) => {
            if (layer instanceof L.Polygon) {
              layer.pm.enable();
              l = layer;
            }
          });
          return l;
        })
        .as('poly')
        .then((poly) => poly._latlngs[0][0])
        .as('firstLatLng');
    });

    cy.get('@poly').then((poly) => {
      Cypress.$(poly).on('pm:vertexadded', ({ originalEvent: event }) => {
        const { layer, indexPath, latlng } = event;
        const newLatLng = Cypress._.get(layer._latlngs, indexPath);
        expect(latlng.lat).to.equal(newLatLng.lat);
        expect(latlng.lng).to.equal(newLatLng.lng);
      });
    });

    cy.get('.marker-icon-middle').click({ multiple: true });

    cy.get('@poly').then((poly) => {
      cy.get('@firstLatLng').then((oldFirst) => {
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
      .click(120, 250)
      .click(100, 50)
      .click(150, 50)
      .click(150, 150)
      .click(200, 150)
      .click(120, 250);

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
    cy.get('.marker-icon-middle').first().click();

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
      if (index >= 3) {
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

  it('fire pm:cut AFTER the actual cut is visible on the map', () => {
    cy.window().then(({ map, L }) => {
      Cypress.$(map).on('pm:cut', () => {
        const layers = [];

        map.eachLayer((layer) => {
          if (layer instanceof L.Polygon) {
            layers.push(layer);
          }
        });

        expect(layers).to.have.lengthOf(1);
      });
    });

    cy.toolbarButton('polygon').click();

    cy.get(mapSelector)
      .click(90, 250)
      .click(150, 50)
      .click(500, 50)
      .click(500, 300)
      .click(300, 350)
      .click(90, 250);

    cy.toolbarButton('cut').click();

    // draw a polygon to cut
    cy.get(mapSelector)
      .click(450, 100)
      .click(450, 150)
      .click(400, 150)
      .click(390, 140)
      .click(390, 100)
      .click(450, 100);
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

    cy.hasLayers(3);

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

  it('allowSelfIntersectionEdit on polygon', () => {
    cy.window().then(({ map, L, Hand }) => {
      cy.fixture('PolygonIntersects')
        .then((json) => {
          const layer = L.geoJSON(json).getLayers()[0].addTo(map);
          const bounds = layer.getBounds();
          map.fitBounds(bounds);
          return layer;
        })
        .as('poly');

      cy.get('@poly').then((poly) => {
        let handFinish = false;

        expect(poly.pm.hasSelfIntersection()).to.equal(true);
        const handSelfIntersectionFalse = new Hand({
          timing: 'frame',
          onStop() {
            expect(poly.pm.hasSelfIntersection()).to.equal(false);

            // Map shouldn't be dragged
            const center = map.getCenter();
            expect(center.lat).to.equal(48.77492609799526);
            expect(center.lng).to.equal(4.847301999999988);
            handFinish = true;
          },
        });
        const handSelfIntersectionTrue = new Hand({
          timing: 'frame',
          onStop() {
            expect(poly.pm.hasSelfIntersection()).to.equal(true);

            const toucherSelfIntersectionFalse = handSelfIntersectionFalse.growFinger(
              'mouse'
            );
            toucherSelfIntersectionFalse
              .wait(100)
              .moveTo(504, 337, 100)
              .down()
              .wait(500)
              .moveTo(780, 259, 400)
              .up()
              .wait(100) // allowed
              // No intersection anymore
              .moveTo(294, 114, 100)
              .down()
              .wait(500)
              .moveTo(752, 327, 800)
              .up()
              .wait(500); // Not allowed
          },
        });

        cy.wait(1000);

        map.pm.enableGlobalEditMode({
          allowSelfIntersection: false,
          allowSelfIntersectionEdit: true,
        });

        const toucherSelfIntersectionTrue = handSelfIntersectionTrue.growFinger(
          'mouse'
        );
        toucherSelfIntersectionTrue
          .wait(100)
          .moveTo(294, 114, 100)
          .down()
          .wait(500)
          .moveTo(782, 127, 400)
          .up()
          .wait(100) // Not allowed
          .moveTo(313, 345, 100)
          .down()
          .wait(500)
          .moveTo(256, 311, 400)
          .up()
          .wait(100) // allowed
          .moveTo(317, 252, 100)
          .down()
          .wait(500)
          .moveTo(782, 127, 400)
          .up()
          .wait(500); // allowed

        // wait until hand is finished
        cy.waitUntil(() => cy.window().then(() => handFinish), {
          timeout: 9000,
        }).then(() => {
          expect(handFinish).to.equal(true);
        });
      });
    });
  });

  it('no snapping to polygon with no coords', () => {
    cy.window().then(({ map, L }) => {
      L.polygon([]).addTo(map);
    });

    // activate line drawing
    cy.toolbarButton('polyline')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    // draw a line
    cy.get(mapSelector).click(150, 250).click(160, 50).click(160, 50);

    cy.toolbarButton('edit').click();

    cy.hasVertexMarkers(2);
  });

  it("don't Cut if it has selfIntersection on finish", () => {
    cy.toolbarButton('polygon').click();

    cy.get(mapSelector)
      .click(90, 250)
      .click(150, 50)
      .click(500, 50)
      .click(500, 300)
      .click(300, 350)
      .click(90, 250);

    cy.toolbarButton('cut').click();

    // draw a polygon to cut
    cy.get(mapSelector)
      .click(200, 100)
      .click(450, 100)
      .click(150, 200)
      .click(450, 200)
      .click(200, 100);

    cy.toolbarButton('edit').click();

    cy.hasVertexMarkers(5);
  });

  it('enable continueDrawing', () => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({ continueDrawing: true });
    });

    cy.toolbarButton('polygon').click();

    // draw a line
    cy.get(mapSelector)
      .click(150, 250)
      .click(160, 50)
      .click(250, 50)
      .click(150, 250);

    cy.get(mapSelector)
      .click(230, 230)
      .click(250, 250)
      .click(250, 300)
      .click(230, 230);

    cy.toolbarButton('edit').click();
    cy.hasVertexMarkers(6);
  });

  it('pane support', () => {
    cy.window().then(({ map }) => {
      map.createPane('draw');
      map.pm.setGlobalOptions({
        panes: { layerPane: 'draw', vertexPane: 'draw' },
      });
    });

    cy.toolbarButton('polygon').click();

    // draw a line
    cy.get(mapSelector)
      .click(150, 250)
      .click(160, 50)
      .click(250, 50)
      .click(150, 250);

    cy.window().then(({ map }) => {
      const drawPane = map._panes.draw;
      const polygon = map.pm.getGeomanDrawLayers()[0];
      expect(drawPane.className).to.eq(polygon.getPane().className);
    });
  });

  it('disable snapping on segment', () => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({ snapSegment: false });
    });

    cy.toolbarButton('polygon').click();
    cy.get(mapSelector)
      .click(150, 250)
      .click(160, 50)
      .click(250, 50)
      .click(150, 250);

    // if snapping is not disabled, the point will be placed at 190|50
    cy.toolbarButton('polygon').click();
    cy.get(mapSelector).click(350, 250).click(190, 60);

    cy.window().then(({ map }) => {
      const lastLatLng = map.pm.Draw.Polygon._layer.getLatLngs()[1];
      const point = map.latLngToContainerPoint(lastLatLng);
      expect(point.y).to.eq(60);
    });
  });

  it('finishOn snap', () => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({ finishOn: 'snap' });
    });

    cy.toolbarButton('polygon').click();
    cy.get(mapSelector)
      .click(150, 250)
      .click(160, 50)
      .click(250, 50)
      .click(150, 250);

    // if snapping is not disabled, the point will be placed at 190|50
    cy.toolbarButton('polygon').click();
    cy.get(mapSelector).click(350, 250).click(190, 90).click(250, 50);

    cy.window().then(({ map }) => {
      expect(2).to.eq(map.pm.getGeomanDrawLayers().length);
    });

    cy.toolbarButton('delete').click();
    cy.get(mapSelector).click(160, 50);

    cy.window().then(({ map }) => {
      expect(1).to.eq(map.pm.getGeomanDrawLayers().length);
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

    cy.toolbarButton('polygon').click();
    cy.get(mapSelector).click(350, 250).click(190, 160).click(190, 60);

    cy.window().then(({ map }) => {
      map.pm.Draw.Polygon._finishShape();
      expect(1).to.eq(map.pm.getGeomanDrawLayers().length);
    });

    cy.get(mapSelector).click(250, 50);

    cy.window().then(({ map }) => {
      map.pm.Draw.Polygon._finishShape();
      expect(2).to.eq(map.pm.getGeomanDrawLayers().length);
    });
  });

  it('disable Edit-Mode for layer with allowEditing: false', () => {
    cy.toolbarButton('polygon').click();
    cy.get(mapSelector)
      .click(150, 250)
      .click(160, 50)
      .click(250, 50)
      .click(150, 250);

    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({ allowEditing: false });
    });

    cy.toolbarButton('edit').click();
    cy.get(mapSelector).rightclick(160, 50);

    cy.window().then(({ map }) => {
      expect(1).to.eq(map.pm.getGeomanDrawLayers().length);
    });
  });

  it('disable Removal-Mode for layer with allowRemoval: false', () => {
    cy.toolbarButton('polygon').click();
    cy.get(mapSelector)
      .click(150, 250)
      .click(160, 50)
      .click(250, 50)
      .click(150, 250);

    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({ allowRemoval: false });
    });

    cy.toolbarButton('delete').click();
    cy.get(mapSelector).click(160, 50);

    cy.window().then(({ map }) => {
      expect(1).to.eq(map.pm.getGeomanDrawLayers().length);
    });
  });

  it('disable Drag-Mode for layer with draggable: false', () => {
    cy.toolbarButton('polygon').click();
    cy.get(mapSelector)
      .click(150, 250)
      .click(160, 50)
      .click(250, 50)
      .click(150, 250);

    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({ draggable: false });
    });

    cy.toolbarButton('drag').click();
    cy.get(mapSelector).click(160, 50);

    cy.window().then(({ map }) => {
      const layer = map.pm.getGeomanDrawLayers()[0];
      expect(layer.pm._safeToCacheDragState).to.eq(undefined);
    });
  });

  it('disable Cut-Mode for layer with allowCutting: false', () => {
    cy.toolbarButton('polygon').click();
    cy.get(mapSelector)
      .click(150, 250)
      .click(160, 50)
      .click(250, 50)
      .click(150, 250);

    let layer;
    cy.window().then(({ map }) => {
      [layer] = map.pm.getGeomanDrawLayers();
      map.pm.setGlobalOptions({ allowCutting: false });
    });

    cy.toolbarButton('cut').click();
    cy.get(mapSelector)
      .click(180, 230)
      .click(190, 70)
      .click(230, 70)
      .click(180, 230);

    cy.window().then(({ map }) => {
      const layer2 = map.pm.getGeomanDrawLayers()[0];
      expect(layer).to.eq(layer2);
    });
  });

  it('disable Rotate-Mode for layer with allowRotate: false', () => {
    cy.toolbarButton('polygon').click();
    cy.get(mapSelector)
      .click(150, 250)
      .click(160, 50)
      .click(250, 50)
      .click(150, 250);

    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({ allowRotation: false });
    });

    cy.toolbarButton('rotate').click();

    cy.hasVertexMarkers(0);
  });

  it('cut only certain layers', () => {
    cy.toolbarButton('rectangle').click();
    cy.get(mapSelector).click(450, 250).click(390, 60);

    cy.toolbarButton('rectangle').click();
    cy.get(mapSelector).click(250, 250).click(390, 60);

    let layer;
    cy.window().then(({ map }) => {
      const cutlayer = map.pm.getGeomanDrawLayers()[0];
      [, layer] = map.pm.getGeomanDrawLayers();
      map.pm.enableDraw('Cut', { layersToCut: [cutlayer] });
    });

    cy.get(mapSelector)
      .click(180, 230)
      .click(190, 70)
      .click(500, 110)
      .click(180, 230);

    cy.window().then(({ map }) => {
      expect(map.hasLayer(layer)).to.eq(true);
    });

    // Cut again, because now all layers must be cuttable -> layerToCut is empty (cutted layers are removed from array)
    cy.toolbarButton('cut').click();
    cy.get(mapSelector)
      .click(180, 230)
      .click(190, 70)
      .click(500, 190)
      .click(180, 230);

    cy.window().then(({ map }) => {
      expect(map.hasLayer(layer)).to.eq(false);
    });
  });
  it('addVertexOn contextmenu / removeVertexOn click', () => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({
        addVertexOn: 'contextmenu',
        removeVertexOn: 'click',
      });
    });

    cy.toolbarButton('polygon').click();
    cy.get(mapSelector)
      .click(150, 250)
      .click(160, 50)
      .click(250, 50)
      .click(150, 250);

    cy.toolbarButton('edit').click();

    // Add Vertex
    cy.get(mapSelector).click(205, 50);
    cy.hasVertexMarkers(3);

    cy.get(mapSelector).rightclick(205, 50);
    cy.hasVertexMarkers(4);

    // Remove Vertex
    cy.get(mapSelector).rightclick(205, 50);
    cy.hasVertexMarkers(4);

    cy.get(mapSelector).click(205, 50);
    cy.hasVertexMarkers(3);
  });

  it('addVertexValidation / removeVertexValidation', () => {
    cy.window().then(({ map }) => {
      const check = ({ layer }) => layer._valid;
      map.pm.setGlobalOptions({
        addVertexValidation: check,
        removeVertexValidation: check,
      });
    });

    cy.toolbarButton('polygon').click();
    cy.get(mapSelector)
      .click(150, 250)
      .click(160, 50)
      .click(250, 50)
      .click(150, 250);

    cy.toolbarButton('edit').click();

    // Add Vertex
    cy.get(mapSelector).click(205, 50);
    cy.hasVertexMarkers(3);

    // Remove Vertex
    cy.get(mapSelector).rightclick(150, 250);
    cy.hasVertexMarkers(3);

    cy.window().then(({ map }) => {
      const layer = map.pm.getGeomanDrawLayers()[0];
      layer._valid = true;
    });

    // Add Vertex
    cy.get(mapSelector).click(205, 50);
    cy.hasVertexMarkers(4);

    // Remove Vertex
    cy.get(mapSelector).rightclick(205, 50);
    cy.hasVertexMarkers(3);
  });

  it('cleans coords if last vertex of MultiPolygon is removed', () => {
    cy.toolbarButton('polygon').click();
    cy.get(mapSelector)
      .click(90, 250)
      .click(100, 50)
      .click(540, 250)
      .click(150, 250)
      .click(90, 250);

    cy.toolbarButton('cut').click();
    cy.get(mapSelector)
      .click(200, 70)
      .click(250, 70)
      .click(250, 300)
      .click(200, 300)
      .click(200, 70);

    cy.toolbarButton('edit').click();

    cy.get('.marker-icon:not(.marker-icon-middle)').each(($el, index) => {
      if (index < 2) {
        // remove first two markers
        cy.wrap($el).trigger('contextmenu');
      }
    });

    expect(() => {
      cy.toolbarButton('edit').click();
    }).to.not.throw();
  });

  it('remove vertex & layer by right-click', () => {
    cy.toolbarButton('polygon').click();
    cy.get(mapSelector)
      .click(150, 250)
      .click(160, 50)
      .click(250, 50)
      .click(150, 250);

    cy.toolbarButton('edit').click();
    cy.hasDrawnLayers(1);

    // Add Vertex
    cy.get(mapSelector).click(205, 50);
    cy.hasVertexMarkers(4);

    // Remove Vertex
    cy.get(mapSelector).rightclick(205, 50);
    cy.hasVertexMarkers(3);

    cy.get(mapSelector).rightclick(150, 250);
    cy.hasDrawnLayers(0);
  });

  it('re-render marker-handlers if hole is removed by right-click', () => {
    cy.toolbarButton('polygon').click();
    cy.get(mapSelector)
      .click(150, 250)
      .click(150, 50)
      .click(650, 50)
      .click(650, 250)
      .click(150, 250);

    cy.toolbarButton('cut').click();
    cy.get(mapSelector)
      .click(250, 200)
      .click(250, 100)
      .click(450, 200)
      .click(250, 200);

    cy.toolbarButton('edit').click();
    cy.hasVertexMarkers(7);

    // Remove hole
    cy.get(mapSelector).rightclick(250, 200);
    cy.hasVertexMarkers(4);
  });

  it('show correct shape for Polygon while drawing', () => {
    cy.toolbarButton('polygon')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector).click(150, 150).click(450, 150).click(450, 400);

    cy.window().then(({ map }) => {
      const polygon = map.pm.Draw.Polygon._layer;
      expect(polygon.pm.getShape()).to.equal('Polygon');
    });
  });

  it('change color of Polygon while drawing', () => {
    cy.toolbarButton('polygon')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector).click(220, 220);
    cy.get(mapSelector).click(100, 230);
    cy.get(mapSelector).trigger('mousemove', 300, 300);

    cy.window().then(({ map }) => {
      const style = {
        color: 'red',
      };
      map.pm.setGlobalOptions({ templineStyle: style, hintlineStyle: style });

      const layer = map.pm.Draw.Polygon._layer;
      const hintLine = map.pm.Draw.Polygon._hintline;
      expect(layer.options.color).to.eql('red');
      expect(hintLine.options.color).to.eql('red');
    });
  });
});
