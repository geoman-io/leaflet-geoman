describe('Draw Rectangle', () => {
  const mapSelector = '#map';

  it('draws a rectangle', () => {
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
    cy.hasMiddleMarkers(0);
  });

  it('properly snaps rectangle edge', () => {
    cy.toolbarButton('rectangle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector)
      .click(200, 200)
      .click(400, 350);

    cy.toolbarButton('rectangle').click();

    cy.get(mapSelector)
      .click(600, 250)

    // manual testing
    // clicking close to the other rectangle should finish the rectangle
    // aligned with the existing rectangle due to snapping
  });

  it('makes rectangle edge non-draggable during draw', () => {
    cy.toolbarButton('rectangle')
      .click();

    cy.get(mapSelector)
      .click(200, 200)

    cy.window().then(({ map, L }) => {
      cy.get(mapSelector)
        .then(() => {
          let l;
          map.eachLayer(layer => {
            if (layer instanceof L.Marker) {
              l = layer;

            }
          });
          return l;
        })
        .as('marker');
    });

    cy.get('@marker').then(marker => {
      expect(marker._pmTempLayer).to.equal(true);
      expect(marker.options.draggable).to.equal(false);
    });
  });

  it('Multiple Cuts', ()=>{
    cy.toolbarButton('rectangle').click();
    cy.get(mapSelector)
      .click(191,216)
      .click(608,323);

    cy.toolbarButton('cut').click();
    cy.get(mapSelector)
      .click(226,389)
      .click(230,105)
      .click(270,396)
      .click(226,389);

    cy.toolbarButton('cut').click();
    cy.get(mapSelector)
      .click(293,356)
      .click(293,122)
      .click(340,367)
      .click(293,356);

    cy.toolbarButton('cut').click();
    cy.get(mapSelector)
      .click(364,345)
      .click(363,138)
      .click(414,368)
      .click(364,345);

    cy.toolbarButton('edit').click();
    cy.hasVertexMarkers(16);
  });

  it('goes back to blue after self-intersection removed', ()=>{
    cy.toolbarButton('rectangle').click();
    cy.get(mapSelector)
      .click(100,50)
      .click(700,400);

    cy.toolbarButton('cut').click();
    cy.get(mapSelector)
      .click(200,200)
      .click(250,230)
      .click(300,250)
      .click(370,200)
      .click(200,200);

    cy.toolbarButton('cut').click();
    cy.get(mapSelector)
      .click(200,300)
      .click(250,270)
      .click(300,250)
      .click(370,300)
      .click(200,300);

    cy.toolbarButton('edit').click();
    cy.hasVertexMarkers(12);

    cy.get(mapSelector).rightclick(300,250);

    cy.window().then(({ map, L }) => {
      const rect = map.pm.getGeomanDrawLayers()[0];
      expect(rect.options.color).to.not.equal('red');

    })
  });

  it('remove empty coord rings', ()=>{
    cy.toolbarButton('rectangle').click();
    cy.get(mapSelector)
      .click(100,50)
      .click(700,400);

    cy.toolbarButton('cut').click();
    cy.get(mapSelector)
      .click(200,200)
      .click(300,250)
      .click(370,200)
      .click(200,200);


    cy.toolbarButton('edit').click();
    cy.hasVertexMarkers(7);

    cy.get(mapSelector).rightclick(300,250);

    cy.window().then(({ map}) => {
      const rect = map.pm.getGeomanDrawLayers()[0];
      const geojson = rect.toGeoJSON();
      const coords = geojson.geometry.coordinates;
      expect(coords.length).to.equal(1);
    })
  });

  it('enable continueDrawing', () => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({continueDrawing: true});
    });

    cy.toolbarButton('rectangle').click();
    cy.get(mapSelector)
      .click(191,216)
      .click(608,323);

    cy.get(mapSelector)
      .click(230, 230)
      .click(350, 350);


    cy.toolbarButton('edit').click();
    cy.hasVertexMarkers(8);
  });
});
