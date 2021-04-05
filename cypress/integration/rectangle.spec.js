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
      expect(rect.options.color).to.not.equal('#f00000ff');

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

  it('disable popup on layer while drawing', ()=>{
    let rect = null;
    cy.window().then(({ map, L }) => {
      map.on("pm:create",(e)=>{
        e.layer.bindPopup('Popup test');
        if(e.layer instanceof L.Rectangle){
          rect = e.layer;
        }
      });
    });

    cy.toolbarButton('rectangle').click();
    cy.get(mapSelector)
      .click(100,50)
      .click(700,400);

    cy.toolbarButton('marker').click();
    cy.get(mapSelector)
      .click(300,250);

    cy.toolbarButton('edit').click();

    cy.window().then(({ map}) => {
      const len = map.pm.getGeomanDrawLayers().length;
      expect(len).to.equal(2);

      const text = rect.getPopup().getContent();
      expect(text).to.equal('Popup test');
    })
  });

  it('prevent not correct created snaplist', () => {
    cy.window().then(({ map }) => {
      map.on("pm:create",(e)=>{
        map.removeLayer(e.layer);
        map.addLayer(e.layer);
      });
    });


    cy.toolbarButton('rectangle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector)
      .click(200, 200)
      .click(400, 350);

    cy.window().then(({ map }) => {
      expect(map.pm.Draw.Rectangle._snapList).to.equal(undefined);
    });
  });

  it('make layer snappable with pmIgnore', () => {
    // create snapping layer
    cy.toolbarButton('rectangle')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.get(mapSelector)
      .click(200, 200)
      .click(400, 350);

    // test 1: snapIgnore: undefined, pmIgnore: undefined, optIn: false --> snappable
    cy.toolbarButton('rectangle')
      .click();
    // click or mousemove is needed to init snapList
    cy.get(mapSelector)
      .click(200, 100);

    let layer;
    cy.window().then(({ map }) => {
      expect(map.pm.Draw.Rectangle._snapList.length).to.equal(1);
      map.pm.disableDraw();
      layer = map.pm.getGeomanDrawLayers()[0];
    });

    // test 2: snapIgnore: true, pmIgnore: undefined, optIn: false --> not snappable
    cy.window().then(() => {
      layer.options.snapIgnore = true;
    });
    cy.toolbarButton('rectangle')
      .click();
    // click or mousemove is needed to init snapList
    cy.get(mapSelector)
      .click(200, 100);

    cy.window().then(({ map }) => {
      expect(map.pm.Draw.Rectangle._snapList.length).to.equal(0);
      map.pm.disableDraw();
    });

    // test 3: snapIgnore: false, pmIgnore: true, optIn: false --> snappable
    cy.window().then(() => {
      layer.options.snapIgnore = false;
      layer.options.pmIgnore = true;
    });
    cy.toolbarButton('rectangle')
      .click();
    // click or mousemove is needed to init snapList
    cy.get(mapSelector)
      .click(200, 100);

    cy.window().then(({ map }) => {
      expect(map.pm.Draw.Rectangle._snapList.length).to.equal(1);
      map.pm.disableDraw();
    });

    // test 4: snapIgnore: undefined, pmIgnore: true, optIn: false --> not snappable
    cy.window().then(() => {
      delete layer.options.snapIgnore;
      layer.options.pmIgnore = true;
    });
    cy.toolbarButton('rectangle')
      .click();
    // click or mousemove is needed to init snapList
    cy.get(mapSelector)
      .click(200, 100);

    cy.window().then(({ map }) => {
      expect(map.pm.Draw.Rectangle._snapList.length).to.equal(0);
      map.pm.disableDraw();
    });


    // test 5: snapIgnore: undefined, pmIgnore: false, optIn: true --> snappable
    cy.window().then(({L}) => {
      delete layer.options.snapIgnore;
      layer.options.pmIgnore = false;
      L.PM.setOptIn(true)
    });
    cy.toolbarButton('rectangle')
      .click();
    // click or mousemove is needed to init snapList
    cy.get(mapSelector)
      .click(200, 100);

    cy.window().then(({ map }) => {
      expect(map.pm.Draw.Rectangle._snapList.length).to.equal(1);
      map.pm.disableDraw();
    });

    // test 6: snapIgnore: undefined, pmIgnore: true, optIn: true --> not snappable
    cy.window().then(({L}) => {
      layer.options.pmIgnore = true;
      L.PM.setOptIn(true)
    });
    cy.toolbarButton('rectangle')
      .click();
    // click or mousemove is needed to init snapList
    cy.get(mapSelector)
      .click(200, 100);

    cy.window().then(({ map }) => {
      expect(map.pm.Draw.Rectangle._snapList.length).to.equal(0);
      map.pm.disableDraw();
    });


    // test 7: snapIgnore: false, pmIgnore: true, optIn: true --> snappable
    cy.window().then(() => {
      layer.options.snapIgnore = false;
    });
    cy.toolbarButton('rectangle')
      .click();
    // click or mousemove is needed to init snapList
    cy.get(mapSelector)
      .click(200, 100);

    cy.window().then(({ map }) => {
      expect(map.pm.Draw.Rectangle._snapList.length).to.equal(1);
      map.pm.disableDraw();
    });
  });

  it('requireSnapToFinish', () => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({requireSnapToFinish: true, snapSegment: false});
    });

    cy.toolbarButton('polygon').click();
    cy.get(mapSelector)
      .click(150, 250)
      .click(160, 50)
      .click(250, 50)
      .click(150, 250);

    cy.toolbarButton('rectangle').click();
    cy.get(mapSelector)
      .click(350, 250)
      .click(190, 60);

    cy.window().then(({ map }) => {
      expect(1).to.eq(map.pm.getGeomanDrawLayers().length);
    });

    cy.get(mapSelector)
      .click(250, 50);

    cy.window().then(({ map }) => {
      expect(2).to.eq(map.pm.getGeomanDrawLayers().length);
    });
  });

  it('requireSnapToFinish not applied for first layer', () => {
    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({requireSnapToFinish: true, snapSegment: false});
    });

    cy.toolbarButton('rectangle').click();
    cy.get(mapSelector)
      .click(350, 250)
      .click(190, 60);

    cy.window().then(({ map }) => {
      expect(1).to.eq(map.pm.getGeomanDrawLayers().length);
    });

    cy.toolbarButton('rectangle').click();
    cy.get(mapSelector)
      .click(450, 250)
      .click(390, 60);

    cy.window().then(({ map }) => {
      expect(1).to.eq(map.pm.getGeomanDrawLayers().length);
    });
  });
});
