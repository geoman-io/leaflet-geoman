describe('Draw Circle Marker', () => {
  const mapSelector = '#map';

  Cypress.Commands.add('hasCircleLayers', (count) => {
    cy.window().then(({ map, L }) => {
      const layerCount = Object.values(map._layers).reduce((total, layer) => {
        if (layer instanceof L.CircleMarker) {
          return total + 1;
        }
        return total;
      }, 0);
      cy.wrap(layerCount).should('eq', count);
    });
  });

  const createMarkers = () => {
    // No circle layers
    cy.hasCircleLayers(0);

    cy.toolbarButton('circle-marker')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    // Should have the hint circle marker
    cy.hasCircleLayers(1);

    cy.get(mapSelector)
      .click(150, 250)
      .click(150, 50)
      .click(500, 50)
      .click(500, 300);

    // Should have 4 circle markers, 1 hint marker
    cy.hasCircleLayers(5);

    cy.toolbarButton('circle-marker').click();

    // Should have 4 circle markers, no hint markers
    cy.hasCircleLayers(4);
  };

  it('places circle markers', () => {
    createMarkers();
  });

  it('handles 6k circle markers in under 1 sec', () => {
    cy.toolbarButton('circle-marker').click();

    cy.get(mapSelector).click(150, 250);

    cy.testLayerAdditionPerformance();
  });

  it('correctly disables drag', () => {
    createMarkers();

    cy.window().then(({ map, L }) => {
      map.eachLayer((layer) => {
        if (layer instanceof L.CircleMarker) {
          assert.isFalse(
            L.DomUtil.hasClass(layer._path, 'leaflet-pm-draggable'),
            'not draggable'
          );
        }
      });
    });

    cy.toolbarButton('edit').click();

    cy.window().then(({ map, L }) => {
      map.eachLayer((layer) => {
        if (layer instanceof L.CircleMarker) {
          assert.isTrue(
            L.DomUtil.hasClass(layer._path, 'leaflet-pm-draggable'),
            'draggable'
          );
        }
      });
    });

    cy.toolbarButton('edit').click();

    cy.window().then(({ map, L }) => {
      map.eachLayer((layer) => {
        if (layer instanceof L.CircleMarker) {
          assert.isFalse(
            L.DomUtil.hasClass(layer._path, 'leaflet-pm-draggable'),
            'not draggable'
          );
        }
      });
    });
  });

  it('deletes all circle markers', () => {
    createMarkers();

    cy.hasCircleLayers(4);

    cy.toolbarButton('delete')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector)
      .click(150, 245)
      .click(150, 50)
      .click(500, 50)
      .click(500, 300);

    cy.toolbarButton('delete').click();

    cy.hasCircleLayers(0);
  });

  it('draw a CircleMarker like a Circle', () => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({
        resizeableCircleMarker: true,
        continueDrawing: false,
      });
    });

    cy.toolbarButton('circle-marker')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector).should('have.class', 'geoman-draw-cursor');

    cy.get(mapSelector).click(200, 200).click(250, 250);

    cy.get(mapSelector).should('not.have.class', 'geoman-draw-cursor');

    cy.hasCircleLayers(1);

    cy.toolbarButton('edit')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.hasVertexMarkers(2);
  });

  it('enable continueDrawing #2', () => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({
        continueDrawing: true,
        resizeableCircleMarker: true,
      });
    });

    cy.toolbarButton('circle-marker')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    // draw first circle
    cy.get(mapSelector).click(200, 200).click(250, 250);

    // draw with continueDrawing: ture the second circle
    cy.get(mapSelector).click(300, 200).click(350, 250);

    // additional click because cypress lose the focus on the window ... wtf ...
    cy.get(mapSelector).click();

    cy.toolbarButton('edit').click();
    cy.hasVertexMarkers(4);
  });

  it('snapping to CircleMarker with pmIgnore:true', () => {
    cy.window().then(({ map, L }) => {
      L.circleMarker(map.getCenter(), { pmIgnore: true }).addTo(map);
    });

    cy.toolbarButton('rectangle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector).click(200, 200).click(400, 350);

    cy.toolbarButton('edit')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.hasVertexMarkers(4);
  });

  it('disable continueDrawing', () => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({ continueDrawing: false });
    });

    cy.toolbarButton('circle-marker').click();
    cy.get(mapSelector).click(191, 216);

    cy.get(mapSelector).click(350, 350);

    cy.toolbarButton('circle-marker')
      .closest('.button-container')
      .should('have.not.class', 'active');

    cy.toolbarButton('edit').click();
    cy.hasLayers(3);
  });

  it('disable markerEditable', () => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({ markerEditable: false });
    });

    cy.toolbarButton('circle-marker').click();
    cy.get(mapSelector).click(191, 216);

    cy.window().then(({ map }) => {
      const marker = map.pm.getGeomanDrawLayers()[0];
      const enabled = marker.pm.enabled();
      expect(enabled).to.equal(false);
    });
  });

  it('enable markerEditable but disable MarkerRemoval', () => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({
        markerEditable: true,
        preventMarkerRemoval: true,
      });
    });

    cy.toolbarButton('circle-marker').click();
    cy.get(mapSelector).click(191, 216);

    cy.window().then(({ map }) => {
      const marker = map.pm.getGeomanDrawLayers()[0];
      const enabled = marker.pm.enabled();
      expect(enabled).to.equal(true);
    });

    cy.get(mapSelector).rightclick(191, 214);

    cy.hasLayers(5);
  });

  it('set max radius of circleMarker', () => {
    cy.toolbarButton('circle-marker')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.window().then(({ map, L }) => {
      L.marker(map.getCenter()).addTo(map);
      map.pm.setGlobalOptions({
        minRadiusCircleMarker: 50,
        maxRadiusCircleMarker: 150,
        resizeableCircleMarker: true,
      });
      cy.get(mapSelector)
        .click(250, 200)
        .click(410, 190)
        .then(() => {
          const layers = map.pm.getGeomanDrawLayers();
          layers.forEach((layer) => {
            if (layer instanceof L.CircleMarker) {
              expect(layer.getRadius()).to.equal(150);
            }
          });
        });
    });
  });
  it('set min radius of circleMarker', () => {
    cy.toolbarButton('circle-marker')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.window().then(({ map, L }) => {
      L.marker(map.getCenter()).addTo(map);
      map.pm.setGlobalOptions({
        minRadiusCircleMarker: 150,
        maxRadiusCircleMarker: 300,
        resizeableCircleMarker: true,
      });
      cy.get(mapSelector)
        .click(250, 200)
        .click(300, 200)
        .then(() => {
          const layers = map.pm.getGeomanDrawLayers();
          layers.forEach((layer) => {
            if (layer instanceof L.CircleMarker) {
              expect(layer.getRadius()).to.equal(150);
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

    cy.toolbarButton('circle-marker').click();
    cy.get(mapSelector).click(350, 250).click(190, 60);

    cy.window().then(({ map }) => {
      expect(1).to.eq(map.pm.getGeomanDrawLayers().length);
    });

    cy.get(mapSelector).click(250, 50);

    cy.window().then(({ map }) => {
      expect(2).to.eq(map.pm.getGeomanDrawLayers().length);
    });
  });
  it('requireSnapToFinish resizeableCircleMarker', () => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({
        requireSnapToFinish: true,
        resizeableCircleMarker: true,
        snapSegment: false,
      });
    });

    cy.toolbarButton('polygon').click();
    cy.get(mapSelector)
      .click(150, 250)
      .click(160, 50)
      .click(250, 50)
      .click(150, 250);

    cy.toolbarButton('circle-marker').click();
    cy.get(mapSelector).click(350, 250).click(190, 60);

    cy.window().then(({ map }) => {
      expect(1).to.eq(map.pm.getGeomanDrawLayers().length);
    });

    cy.get(mapSelector).click(250, 50);

    cy.window().then(({ map }) => {
      expect(2).to.eq(map.pm.getGeomanDrawLayers().length);
    });
  });

  it('Snapping to CircleMarker border on CRS Simple Map', () => {
    let mapSimple;
    cy.window().then(({ map, L }) => {
      map.remove();
      mapSimple = L.map('map', {
        crs: L.CRS.Simple,
        minZoom: -2,
      }).setView([0, 0], 0);
      mapSimple.pm.addControls();

      mapSimple.pm.enableDraw('CircleMarker', { pathOptions: { radius: 40 } });
    });

    cy.get(mapSelector).click(350, 250);
    cy.get(mapSelector).click(350, 300);

    cy.window().then(() => {
      const radius = mapSimple.pm.getGeomanDrawLayers()[1].getRadius();
      expect(radius).to.eq(40);
    });
  });

  it('Snapping to CircleMarker (resizeableCircleMarker) border on CRS Simple Map', () => {
    let mapSimple;
    cy.window().then(({ map, L }) => {
      map.remove();
      mapSimple = L.map('map', {
        crs: L.CRS.Simple,
        minZoom: -2,
      }).setView([0, 0], 0);
      mapSimple.pm.addControls();

      mapSimple.pm.enableDraw('CircleMarker', { resizeableCircleMarker: true });
    });

    cy.get(mapSelector).click(350, 250).click(450, 250);

    cy.get(mapSelector).click(350, 450).click(465, 250);

    cy.window().then(() => {
      const radius = mapSimple.pm.getGeomanDrawLayers()[1].getRadius();
      expect(radius).to.greaterThan(223);
      expect(radius).to.below(226);
    });
  });
  it('checks if circle is hidden before drawing', () => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({ resizeableCircleMarker: true });
    });
    cy.toolbarButton('circle-marker').click();
    cy.window().then(({ map }) => {
      // if map property is null, then it is not visible
      expect(!!map.pm.Draw.CircleMarker._layer._map).to.eq(false);
    });
  });

  it('removes circleMarker if enabled', () => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({ resizeableCircleMarker: true });
    });

    cy.toolbarButton('circle-marker')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector).click(350, 250).click(190, 60);

    cy.window().then(({ map }) => {
      map.pm.disableDraw();
    });

    cy.toolbarButton('edit')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.hasLayers(7);
    cy.window().then(({ map }) => {
      const layer = map.pm.getGeomanDrawLayers()[0];
      layer.remove();
    });
    cy.hasLayers(3);
  });

  it('check if snapping works with max radius of circle', () => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({
        resizeableCircleMarker: true,
      });
    });
    cy.toolbarButton('circle-marker')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector).click(320, 250).click(450, 250);

    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({
        maxRadiusCircleMarker: 100,
      });
    });

    cy.get(mapSelector).click(325, 250).click(475, 250);

    cy.window().then(({ map }) => {
      const layer = map.pm.getGeomanDrawLayers()[0];
      const layer2 = map.pm.getGeomanDrawLayers()[1];
      expect(layer.getLatLng().equals(layer2.getLatLng())).to.eq(true);
    });
  });

  it('change color of circleMarker while drawing', () => {
    cy.toolbarButton('circle-marker')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector).trigger('mousemove', 300, 300);

    cy.window().then(({ map }) => {
      const style = {
        color: 'red',
      };
      map.pm.setGlobalOptions({ templineStyle: style, hintlineStyle: style });

      const layer = map.pm.Draw.CircleMarker._layer;
      expect(layer.options.color).to.eql('red');
    });
  });

  it('change color of circleMarker (resizeableCircleMarker) while drawing', () => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({ resizeableCircleMarker: true });
    });

    cy.toolbarButton('circle-marker')
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

      const layer = map.pm.Draw.CircleMarker._layer;
      const hintLine = map.pm.Draw.CircleMarker._hintline;
      expect(layer.options.color).to.eql('red');
      expect(hintLine.options.color).to.eql('red');
    });
  });

  it('fires disable event only if it was enabled', () => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({ resizeableCircleMarker: true });
    });

    cy.toolbarButton('circle-marker')
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

  it('disable dragging correctly', () => {
    cy.toolbarButton('circle-marker')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector).click(200, 200);

    cy.toolbarButton('circle-marker').click();

    cy.window().then(({ map }) => {
      const layer = map.pm.getGeomanDrawLayers()[0];

      expect(layer.pm.layerDragEnabled()).to.eql(false);
      layer.pm.enable();
      expect(layer.pm.layerDragEnabled()).to.eql(true);
      layer.pm.disable();
      expect(layer.pm.layerDragEnabled()).to.eql(false);
    });
  });

  it('draw a CircleMarker like a Circle with deprecated option `editable`', () => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({ editable: true, continueDrawing: false });
    });

    cy.toolbarButton('circle-marker')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector).click(200, 200).click(250, 250);

    cy.hasCircleLayers(1);

    cy.toolbarButton('edit')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.hasVertexMarkers(2);
  });

  it('on vertex click - editable', (done) => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({ editable: true });
    });

    cy.toolbarButton('circle-marker')
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
