describe('Draw Circle Marker', () => {
  const mapSelector = '#map';

  Cypress.Commands.add('hasCircleLayers', count => {
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

    cy.toolbarButton('circle-marker')
      .click()

    cy.get(mapSelector)
      .click(150, 250)

    cy.testLayerAdditionPerformance();
  });



  it('correctly disables drag', () => {

    createMarkers();

    cy.window().then(({ map, L }) => {
      map.eachLayer((layer) => {
        if (layer instanceof L.CircleMarker) {
          assert.isFalse(L.DomUtil.hasClass(layer._path, 'leaflet-pm-draggable'), 'not draggable')
        }
      })
    });

    cy.toolbarButton('edit')
      .click()

    cy.window().then(({ map, L }) => {
      map.eachLayer((layer) => {
        if (layer instanceof L.CircleMarker) {
          assert.isTrue(L.DomUtil.hasClass(layer._path, 'leaflet-pm-draggable'), 'draggable')
        }
      })
    });

    cy.toolbarButton('edit')
      .click()

    cy.window().then(({ map, L }) => {
      map.eachLayer((layer) => {
        if (layer instanceof L.CircleMarker) {
          assert.isFalse(L.DomUtil.hasClass(layer._path, 'leaflet-pm-draggable'), 'not draggable')
        }
      })
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
    cy.window().then(({ map}) => {
      map.pm.setGlobalOptions({editable: true});
    });

    cy.toolbarButton('circle-marker')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector)
      .click(200, 200)
      .click(250, 250);

    cy.hasCircleLayers(1);


    cy.toolbarButton('edit')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.hasVertexMarkers(2);
  });
  it('snapping to CircleMarker with pmIgnore:true', () => {
    cy.window().then(({ map, L}) => {
      L.circleMarker(map.getCenter(),{pmIgnore: true}).addTo(map);
    });

    cy.toolbarButton('rectangle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector)
      .click(200, 200)
      .click(400, 350);

    cy.toolbarButton('edit')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.hasVertexMarkers(4);
  });

  it('set max radius of circleMarker', () => {
    let handFinish = false;

    cy.toolbarButton('circle-marker')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.window().then(({ map, L }) => {
      L.marker(map.getCenter()).addTo(map);
      map.pm.setGlobalOptions({
        minRadiusCircleMarker: 50,
        maxRadiusCircleMarker: 150,
        editable: true
      });
      cy.get(mapSelector)
        .click(250,200)
        .click(400,190)
        .then(() => {
          map.eachLayer(layer => {
            if (layer instanceof L.CircleMarker) {
              expect(layer.getRadius()).to.equal(150);
            }
          });
        });
    });

    cy.toolbarButton('edit')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.window().then(({ Hand, map, L }) => {
      const handMarker = new Hand({
        timing: 'frame',
        onStop: ()=>{
          map.eachLayer(layer => {
            if (layer instanceof L.CircleMarker) {
              expect(true).to.equal(layer.getRadius() < 150);
            }
          });
          const handMarker2 = new Hand({
            timing: 'frame',
            onStop: () => {
              handFinish = true;
              map.eachLayer(layer => {
                if (layer instanceof L.CircleMarker) {
                  expect(true).to.equal(layer.getRadius() >= 145 && layer.getRadius() < 155);
                }
              });
            }
          });
          const toucherMarker2 = handMarker2.growFinger('mouse');
          toucherMarker2.wait(100).moveTo(317,198, 100).down().wait(500).moveTo(500,198, 600).up().wait(100)
        }
      });
      const toucherMarker = handMarker.growFinger('mouse');
      toucherMarker.wait(100).moveTo(400,198, 100).down().wait(500).moveTo(317,198, 400).up().wait(100);

      // wait until hand is finished
      cy.waitUntil(() => cy.window().then(() => handFinish)).then( ()=> {
        expect(handFinish).to.equal(true);
      });
    });

  });
  it('set min radius of circleMarker', () => {
    let handFinish = false;

    cy.toolbarButton('circle-marker')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.window().then(({ map, L }) => {
      L.marker(map.getCenter()).addTo(map);
      map.pm.setGlobalOptions({
        minRadiusCircleMarker: 150,
        maxRadiusCircleMarker: 300,
        editable: true
      });
      cy.get(mapSelector)
        .click(250,200)
        .click(300,200)
        .then(() => {
          map.eachLayer(layer => {
            if (layer instanceof L.CircleMarker) {
              expect(layer.getRadius()).to.equal(150);
            }
          });
        });
    });

    cy.toolbarButton('edit')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.window().then(({ Hand, map, L }) =>  {
      const handMarker = new Hand({
        timing: 'frame',
        onStop: ()=>{
          map.eachLayer(layer => {
            if (layer instanceof L.CircleMarker) {
              expect(true).to.equal(layer.getRadius() > 150)
            }
          });
          const handMarker2 = new Hand({
            timing: 'frame',
            onStop: () =>{
              handFinish = true;
              map.eachLayer(layer => {
                if (layer instanceof L.CircleMarker) {
                  expect(true).to.equal(layer.getRadius() >= 145 && layer.getRadius() < 155);
                }
              });
            }
          });
          const toucherMarker2 = handMarker2.growFinger('mouse');
          toucherMarker2.wait(200).moveTo(490,198, 100).down().wait(500).moveTo(317,198, 600).up().wait(100)
        }
      });
      const toucherMarker = handMarker.growFinger('mouse');
      toucherMarker.wait(100).moveTo(400,198, 100).down().wait(500).moveTo(500,198, 400).up().wait(100)
      // wait until hand is finished
      cy.waitUntil(() => cy.window().then(() => handFinish)).then( ()=> {
        expect(handFinish).to.equal(true);
      });
    });
  });
});
