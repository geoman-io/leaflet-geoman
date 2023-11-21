describe('Draw Circle', () => {
  const mapSelector = '#map';

  Cypress.Commands.add('hasCircleLayers', (count) => {
    cy.window().then(({ map, L }) => {
      const layerCount = Object.values(map._layers).reduce((total, layer) => {
        if (layer instanceof L.Circle) {
          return total + 1;
        }
        return total;
      }, 0);
      cy.wrap(layerCount).should('eq', count);
    });
  });

  it('draws a circle', () => {
    cy.toolbarButton('circle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector).should('have.class', 'geoman-draw-cursor');

    cy.get(mapSelector).click(200, 200).click(250, 250);

    cy.get(mapSelector).should('not.have.class', 'geoman-draw-cursor');

    cy.toolbarButton('edit')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.hasVertexMarkers(2);
    cy.hasMiddleMarkers(0);

    cy.toolbarButton('edit').click();
    cy.toolbarButton('edit').click();

    cy.hasVertexMarkers(2);

    cy.toolbarButton('edit').click();

    cy.hasVertexMarkers(0);

    cy.toolbarButton('edit').click();

    cy.hasVertexMarkers(2);

    cy.toolbarButton('edit').click();
  });

  it('uses correct options from enableDraw', () => {
    cy.window().then(({ map, L }) => {
      const options = {
        pathOptions: {
          color: 'red',
          fillColor: 'orange',
          fillOpacity: 0.7,
          radius: 20,
        },
      };
      map.pm.enableDraw('Circle', options);

      cy.get(mapSelector)
        .click(200, 200)
        .click(250, 250)
        .then(() => {
          map.eachLayer((layer) => {
            if (layer instanceof L.Circle) {
              expect(layer.options.color).to.equal('red');
              expect(layer.options.fillColor).to.equal('orange');
            }
          });
        });
    });
  });

  it('uses correct options from setPathOptions', () => {
    cy.toolbarButton('circle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.window().then(({ map, L }) => {
      map.pm.setPathOptions({
        color: 'yellow',
      });

      cy.get(mapSelector)
        .click(200, 200)
        .click(250, 250)
        .then(() => {
          map.eachLayer((layer) => {
            if (layer instanceof L.Circle) {
              expect(layer.options.color).to.equal('yellow');
            }
          });
        });
    });
  });

  it('enable continueDrawing', () => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({ continueDrawing: true });
    });

    cy.toolbarButton('circle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    // draw first circle
    cy.get(mapSelector).click(200, 200).click(250, 250);

    // draw with continueDrawing: true the second circle
    cy.get(mapSelector).click(300, 200).click(350, 250);

    // additional click because cypress lose the focus on the window ... wtf ...
    cy.get(mapSelector).click();
    cy.toolbarButton('edit').click();
    cy.hasVertexMarkers(4);
  });

  it('set max radius of circle', () => {
    cy.toolbarButton('circle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.window().then(({ map, L }) => {
      L.marker(map.getCenter()).addTo(map);
      map.pm.setGlobalOptions({
        minRadiusCircle: 500,
        maxRadiusCircle: 1500,
      });
      cy.get(mapSelector)
        .click(250, 200)
        .click(400, 190)
        .then(() => {
          const layers = map.pm.getGeomanDrawLayers();
          layers.forEach((layer) => {
            if (layer instanceof L.Circle) {
              expect(layer.getRadius()).to.equal(1500);
            }
          });
        });
    });
  });
  it('set min radius of circle', () => {
    cy.toolbarButton('circle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.window().then(({ map, L }) => {
      L.marker(map.getCenter()).addTo(map);
      map.pm.setGlobalOptions({
        minRadiusCircle: 1500,
        maxRadiusCircle: 3000,
      });
      cy.get(mapSelector)
        .click(250, 200)
        .click(300, 190)
        .then(() => {
          const layers = map.pm.getGeomanDrawLayers();
          layers.forEach((layer) => {
            if (layer instanceof L.Circle) {
              expect(layer.getRadius()).to.equal(1500);
            }
          });
        });
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

    cy.toolbarButton('circle').click();
    cy.get(mapSelector).click(350, 250).click(190, 60);

    cy.window().then(({ map }) => {
      expect(1).to.eq(map.pm.getGeomanDrawLayers().length);
    });

    cy.get(mapSelector).click(250, 50);

    cy.window().then(({ map }) => {
      expect(2).to.eq(map.pm.getGeomanDrawLayers().length);
    });
  });

  it('Editing circle on CRS Simple Map', () => {
    let mapSimple;
    cy.window().then(({ map, L }) => {
      map.remove();
      mapSimple = L.map('map', {
        crs: L.CRS.Simple,
        minZoom: -2,
        doubleClickZoom: false, // Leaflet 1.8 DoubleTap fix
      }).setView([0, 0], 0);
      mapSimple.pm.addControls();
    });

    cy.toolbarButton('circle').click();
    cy.get(mapSelector).click(350, 250).click(450, 250);

    cy.toolbarButton('edit').click();

    cy.window().then(() => {
      expect(1).to.eq(mapSimple.pm.getGeomanDrawLayers().length);

      const circle = mapSimple.pm.getGeomanDrawLayers()[0];

      // move marker
      const marker = circle.pm._markers[1];
      marker.setLatLng([marker.getLatLng().lng, marker.getLatLng().lat + 10]);
      expect(167).to.eq(Math.floor(circle.getRadius()));
    });
  });

  it('Snapping to circle border on CRS Simple Map', () => {
    let mapSimple;
    cy.window().then(({ map, L }) => {
      map.remove();
      mapSimple = L.map('map', {
        crs: L.CRS.Simple,
        minZoom: -2,
        doubleClickZoom: false, // Leaflet 1.8 DoubleTap fix
      }).setView([0, 0], 0);
      mapSimple.pm.addControls();
    });

    cy.toolbarButton('circle').click();
    cy.get(mapSelector).click(350, 250).click(450, 250);

    cy.toolbarButton('circle').click();
    cy.get(mapSelector).click(350, 450).click(465, 250);

    cy.window().then(() => {
      const radius = mapSimple.pm.getGeomanDrawLayers()[1].getRadius();
      expect(radius).to.greaterThan(223);
      expect(radius).to.below(226);
    });
  });
  it('checks if circle is hidden before drawing', () => {
    cy.toolbarButton('circle').click();
    cy.window().then(({ map }) => {
      // if map property is null, then it is not visible
      expect(!!map.pm.Draw.Circle._layer._map).to.eq(false);
    });
  });
  it('removes circle if enabled', () => {
    cy.toolbarButton('circle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector).click(200, 200).click(250, 250);

    cy.toolbarButton('edit').click();

    cy.hasLayers(7);
    cy.window().then(({ map }) => {
      const layer = map.pm.getGeomanDrawLayers()[0];
      layer.remove();
    });
    cy.hasLayers(3);
  });
  it('check if snapping works with max radius of circle', () => {
    cy.toolbarButton('circle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector).click(350, 250).click(450, 250);

    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({
        maxRadiusCircle: 1500,
      });
    });

    cy.toolbarButton('circle').click();
    cy.get(mapSelector).click(355, 250).click(475, 250);

    cy.window().then(({ map }) => {
      const layer = map.pm.getGeomanDrawLayers()[0];
      const layer2 = map.pm.getGeomanDrawLayers()[1];
      expect(layer.getLatLng().equals(layer2.getLatLng())).to.eq(true);
    });
  });

  it('change color of circle while drawing', () => {
    cy.toolbarButton('circle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector).click(200, 200);
    cy.get(mapSelector).trigger('mousemove', 300, 300);

    cy.window().then(({ map }) => {
      const style = {
        color: 'red',
      };
      map.pm.setGlobalOptions({ templineStyle: style, hintlineStyle: style });

      const layer = map.pm.Draw.Circle._layer;
      const hintLine = map.pm.Draw.Circle._hintline;
      expect(layer.options.color).to.eql('red');
      expect(hintLine.options.color).to.eql('red');
    });
  });

  it('fires disable event only if it was enabled', () => {
    cy.toolbarButton('circle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector).click(200, 200);
    cy.get(mapSelector).click(300, 300);

    cy.window().then(({ map }) => {
      const layer = map.pm.getGeomanDrawLayers()[0];

      let disableFired = false;
      layer.on('pm:disable', () => {
        disableFired = true;
      });
      layer.pm.disable();
      expect(disableFired).to.eql(false);

      layer.pm.enable();
      layer.pm.disable();
      expect(disableFired).to.eql(true);
    });
  });

  it('creates circles (non-resizableCircle)', () => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({
        resizableCircle: false,
        continueDrawing: true,
      });
    });

    cy.toolbarButton('circle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector).click(200, 200);
    cy.get(mapSelector).click(300, 300);
    cy.get(mapSelector).click(350, 350);

    cy.toolbarButton('edit')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.hasCircleLayers(3);
  });

  it('disable dragging correctly (non-resizableCircle)', () => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({ resizableCircle: false });
    });

    cy.toolbarButton('circle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector).click(200, 200);
    cy.get(mapSelector).click(300, 300);

    cy.window().then(({ map }) => {
      const layer = map.pm.getGeomanDrawLayers()[0];

      expect(layer.pm.layerDragEnabled()).to.eql(false);
      layer.pm.enable();
      expect(layer.pm.layerDragEnabled()).to.eql(true);
      layer.pm.disable();
      expect(layer.pm.layerDragEnabled()).to.eql(false);
    });
  });

  it('deletes no circles by right-click (non-resizableCircle)', () => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({ resizableCircle: false });
    });

    cy.toolbarButton('circle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector).click(200, 200);

    cy.toolbarButton('edit')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.hasCircleLayers(1);

    cy.get(mapSelector).rightclick(200, 200);

    cy.hasCircleLayers(1);
  });

  it('change color of circleMarker while drawing (non-resizableCircle)', () => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({ resizableCircle: false });
    });

    cy.toolbarButton('circle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector).trigger('mousemove', 300, 300);

    cy.window().then(({ map }) => {
      const style = {
        color: 'red',
      };
      map.pm.setGlobalOptions({ templineStyle: style, hintlineStyle: style });

      const layer = map.pm.Draw.Circle._layer;
      expect(layer.options.color).to.eql('red');
    });
  });

  it('on vertex click', (done) => {
    cy.toolbarButton('circle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector).click(200, 200);
    cy.get(mapSelector).click(300, 200);

    cy.window().then(({ map }) => {
      let count = 0;
      const layer = map.pm.getGeomanDrawLayers()[0];
      layer.on('pm:vertexclick', () => {
        count += 1;
        if (count >= 2) {
          expect(count).to.eql(2);
          setTimeout(done, 100);
        }
      });
    });

    cy.toolbarButton('edit').click();
    cy.get(mapSelector).click(200, 200);
    cy.get(mapSelector).click(300, 200);
  });
});
