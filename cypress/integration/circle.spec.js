describe('Draw Circle', () => {
  const mapSelector = '#map';

  it('draws a circle', () => {
    cy.toolbarButton('circle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector)
      .click(200, 200)
      .click(250, 250);

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
          map.eachLayer(layer => {
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
          map.eachLayer(layer => {
            if (layer instanceof L.Circle) {
              expect(layer.options.color).to.equal('yellow');
            }
          });
        });
    });
  });

  it('set max radius of circle', () => {
    let handFinish = false;

    cy.toolbarButton('circle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.window().then(({ map, L }) => {
      L.marker(map.getCenter()).addTo(map);
      map.pm.setGlobalOptions({
        circleMin: 500,
        circleMax: 1500,
      });
      cy.get(mapSelector)
        .click(250,200)
        .click(620,190)
        .then(() => {
          map.eachLayer(layer => {
            if (layer instanceof L.Circle) {
              expect(layer.getRadius()).to.equal(1500);
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
            if (layer instanceof L.Circle) {
              expect(true).to.equal(layer.getRadius() < 1500);
            }
          });
          const handMarker2 = new Hand({
            timing: 'frame',
            onStop: () => {
              handFinish = true;
              map.eachLayer(layer => {
                if (layer instanceof L.Circle) {
                  expect(true).to.equal(layer.getRadius() >= 1495 && layer.getRadius() < 1505);
                }
              });
            }
          });
          const toucherMarker2 = handMarker2.growFinger('mouse');
          toucherMarker2.wait(100).moveTo(317,198, 100).down().wait(500).moveTo(500,198, 600).up().wait(100)
        }
      });
      const toucherMarker = handMarker.growFinger('mouse');
      toucherMarker.wait(100).moveTo(379,198, 100).down().wait(500).moveTo(317,198, 400).up().wait(100)

      // wait until hand is finished
      cy.waitUntil(() => cy.window().then(() => handFinish)).then( ()=> {
        expect(handFinish).to.equal(true);
      });
    });

  });
  it('set min radius of circle', () => {
    let handFinish = false;

    cy.toolbarButton('circle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.window().then(({ map, L }) => {
      L.marker(map.getCenter()).addTo(map);
      map.pm.setGlobalOptions({
        circleMin: 1500,
        circleMax: 3000,
      });
      cy.get(mapSelector)
        .click(250,200)
        .click(300,190)
        .then(() => {
          map.eachLayer(layer => {
            if (layer instanceof L.Circle) {
              expect(layer.getRadius()).to.equal(1500);
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
            if (layer instanceof L.Circle) {
              expect(true).to.equal(layer.getRadius() > 1500)
            }
          });
          const handMarker2 = new Hand({
            timing: 'frame',
            onStop: () =>{
              handFinish = true;
              map.eachLayer(layer => {
                if (layer instanceof L.Circle) {
                  expect(true).to.equal(layer.getRadius() >= 1495 && layer.getRadius() < 1505);
                }
              });
            }
          });
          const toucherMarker2 = handMarker2.growFinger('mouse');
          toucherMarker2.wait(200).moveTo(490,198, 100).down().wait(500).moveTo(317,198, 600).up().wait(100)
        }
      });
      const toucherMarker = handMarker.growFinger('mouse');
      toucherMarker.wait(100).moveTo(379,198, 100).down().wait(500).moveTo(500,198, 400).up().wait(100)
      // wait until hand is finished
      cy.waitUntil(() => cy.window().then(() => handFinish)).then( ()=> {
          expect(handFinish).to.equal(true);
      });
    });
  });
});
