describe('Events', () => {
  const mapSelector = '#map';

  it('pm:langchange', () => {
    var calledevent = "";

    cy.window().then(({ map, L }) => {
      map.on("pm:langchange",function (e) {
        calledevent = e.type;
      });

      map.pm.setLang('de');
    }).then(()=>{
      cy.wait(100);
      expect(calledevent).to.equal("pm:langchange");
      calledevent = "";
    })

  });

  it('pm:globaleditmodetoggled', () => {
    var calledevent = "";

    cy.window().then(({ map, L }) => {
      map.on("pm:globaleditmodetoggled",function (e) {
        calledevent = e.type;
      });
      map.pm.enableGlobalEditMode();
    }).then(()=>{
      cy.wait(100);
      expect(calledevent).to.equal("pm:globaleditmodetoggled");
      calledevent = "";
    });

    cy.window().then(({ map, L }) => {
      map.on("pm:globaleditmodetoggled",function (e) {
        calledevent = e.type;
      });
      map.pm.disableGlobalEditMode();
    }).then(()=>{
      cy.wait(100);
      expect(calledevent).to.equal("pm:globaleditmodetoggled");
      calledevent = "";
    });

    cy.window().then(({ map, L }) => {
      map.on("pm:globaleditmodetoggled",function (e) {
        calledevent = e.type;
      });

      map.pm.toggleGlobalEditMode();
    }).then(()=>{
      cy.wait(100);
      expect(calledevent).to.equal("pm:globaleditmodetoggled");
      calledevent = "";
    })
  });

  it('pm:globaldragmodetoggled', () => {
    var calledevent = "";

    cy.window().then(({ map, L }) => {
      map.on("pm:globaldragmodetoggled",function (e) {
        calledevent = e.type;
      });
      map.pm.enableGlobalDragMode();
    }).then(()=>{
      cy.wait(100);
      expect(calledevent).to.equal("pm:globaldragmodetoggled");
      calledevent = "";
    });

    cy.window().then(({ map, L }) => {
      map.on("pm:globaldragmodetoggled",function (e) {
        calledevent = e.type;
      });
      map.pm.disableGlobalDragMode();
    }).then(()=>{
      cy.wait(100);
      expect(calledevent).to.equal("pm:globaldragmodetoggled");
      calledevent = "";
    });

    cy.window().then(({ map, L }) => {
      map.on("pm:globaldragmodetoggled",function (e) {
        calledevent = e.type;
      });

      map.pm.toggleGlobalDragMode();
    }).then(()=>{
      cy.wait(100);
      expect(calledevent).to.equal("pm:globaldragmodetoggled");
      calledevent = "";
    })
  });

  it('pm:globalremovalmodetoggled', () => {
    var calledevent = "";

    cy.window().then(({ map, L }) => {
      map.on("pm:globalremovalmodetoggled",function (e) {
        calledevent = e.type;
      });
      map.pm.enableGlobalRemovalMode();
    }).then(()=>{
      cy.wait(100);
      expect(calledevent).to.equal("pm:globalremovalmodetoggled");
      calledevent = "";
    });

    cy.window().then(({ map, L }) => {
      map.on("pm:globalremovalmodetoggled",function (e) {
        calledevent = e.type;
      });
      map.pm.disableGlobalRemovalMode();
    }).then(()=>{
      cy.wait(100);
      expect(calledevent).to.equal("pm:globalremovalmodetoggled");
      calledevent = "";
    });

    cy.window().then(({ map, L }) => {
      map.on("pm:globalremovalmodetoggled",function (e) {
        calledevent = e.type;
      });

      map.pm.toggleGlobalRemovalMode();
    }).then(()=>{
      cy.wait(100);
      expect(calledevent).to.equal("pm:globalremovalmodetoggled");
      calledevent = "";
    })
  });

  it('pm:globaldrawmodetoggled', () => {
    var calledevent = "";

    cy.window().then(({ map, L }) => {
      map.on("pm:globaldrawmodetoggled",function (e) {
        calledevent = e.type;
      });
      map.pm.enableDraw("Polygon");
    }).then(()=>{
      cy.wait(100);
      expect(calledevent).to.equal("pm:globaldrawmodetoggled");
      calledevent = "";
    });

    cy.window().then(({ map, L }) => {
      map.on("pm:globaldrawmodetoggled",function (e) {
        calledevent = e.type;
      });
      map.pm.disableDraw("Polygon");
    }).then(()=>{
      cy.wait(100);
      expect(calledevent).to.equal("pm:globaldrawmodetoggled");
      calledevent = "";
    });
  });

  it('pm:globalcutmodetoggled', () => {
    var calledevent = "";

    cy.window().then(({ map, L }) => {
      map.on("pm:globalcutmodetoggled",function (e) {
        calledevent = e.type;
      });
      map.pm.enableDraw("Cut");
    }).then(()=>{
      cy.wait(100);
      expect(calledevent).to.equal("pm:globalcutmodetoggled");
      calledevent = "";
    });

    cy.window().then(({ map, L }) => {
      map.on("pm:globalcutmodetoggled",function (e) {
        calledevent = e.type;
      });
      map.pm.disableDraw("Cut");
    }).then(()=>{
      cy.wait(100);
      expect(calledevent).to.equal("pm:globalcutmodetoggled");
      calledevent = "";
    });

    cy.window().then(({ map, L }) => {
      map.on("pm:globalcutmodetoggled",function (e) {
        calledevent = e.type;
      });
      map.pm.enableGlobalCutMode();
    }).then(()=>{
      cy.wait(100);
      expect(calledevent).to.equal("pm:globalcutmodetoggled");
      calledevent = "";
    });

    cy.window().then(({ map, L }) => {
      map.on("pm:globalcutmodetoggled",function (e) {
        calledevent = e.type;
      });
      map.pm.disableGlobalCutMode();
    }).then(()=>{
      cy.wait(100);
      expect(calledevent).to.equal("pm:globalcutmodetoggled");
      calledevent = "";
    });

    cy.window().then(({ map, L }) => {
      map.on("pm:globalcutmodetoggled",function (e) {
        calledevent = e.type;
      });
      map.pm.toggleGlobalCutMode();
    }).then(()=>{
      cy.wait(100);
      expect(calledevent).to.equal("pm:globalcutmodetoggled");
      calledevent = "";
    });
  });

  it('pm:drawstart & pm:drawend', () => {
    var calledevent = "";

    cy.window().then(({ map, L }) => {
      map.on("pm:drawstart",function (e) {
        calledevent = e.type;
      });
      map.pm.enableDraw("Polygon");
    }).then(()=>{
      cy.wait(100);
      expect(calledevent).to.equal("pm:drawstart");
      calledevent = "";
    });

    cy.window().then(({ map, L }) => {
      map.on("pm:drawend",function (e) {
        calledevent = e.type;
      });
      map.pm.disableDraw("Polygon");
    }).then(()=>{
      cy.wait(100);
      expect(calledevent).to.equal("pm:drawend");
      calledevent = "";
    });
  });

  it('pm:create', () => {
    var calledevent = "";

    cy.window().then(({ map, L }) => {
      map.on("pm:create",function (e) {
        calledevent = e.type;
      });
      map.pm.enableDraw("Circle");

      cy.get(mapSelector)
        .click(200, 200)
        .click(250, 250);

    }).then(()=>{
      cy.wait(100);
      expect(calledevent).to.equal("pm:create");
      calledevent = "";
    });
  });
  it('Events while drawing: pm:vertexadded, pm:snapdrag, pm:snap, pm:unsnap, pm:centerplaced', () => {
    var calledevent = "";

    cy.window().then(({ map, L }) => {

      function logEvent(e){
        calledevent = e.type;
      }

      map.on("pm:drawstart",function (e) {
        var layer = e.workingLayer;
        layer.on('pm:vertexadded', logEvent);
        layer.on('pm:snapdrag', logEvent);
        layer.on('pm:snap', logEvent);
        layer.on('pm:unsnap', logEvent);
        layer.on('pm:centerplaced', logEvent);
      });
      map.pm.enableDraw("Polygon");

      cy.get(mapSelector)
        .click(200, 200);
    }).then(()=>{
      cy.wait(100);
      expect(calledevent).to.equal("pm:vertexadded");
      calledevent = "";
    });

    cy.window().then(({ map, L }) => {
      cy.get(mapSelector)
        .click(200, 300)
        .trigger('mousemove', { clientX: 200, clientY: 205 })
    }).then(()=>{
      cy.wait(100);
      expect(calledevent).to.equal("pm:snap");
      calledevent = "";
    });

    cy.window().then(({ map, L }) => {
      cy.get(mapSelector)
        .trigger('mousemove', { clientX: 300, clientY: 355 })
    }).then(()=>{
      cy.wait(100);
      expect(calledevent).to.equal("pm:unsnap");
      calledevent = "";
    });

    cy.window().then(({ map, L }) => {
      cy.get(mapSelector)
        .trigger('mousemove', { clientX: 300, clientY: 385 })
    }).then(()=>{
      cy.wait(100);
      expect(calledevent).to.equal("pm:snapdrag");
      calledevent = "";
    });
  });


  it(' pm:centerplaced event while drawing', () => {
    var calledevent = "";

    cy.window().then(({ map, L }) => {
      function logEvent(e){
        calledevent = e.type;
      }

      map.on("pm:drawstart",function (e) {
        var layer = e.workingLayer;
        layer.on('pm:centerplaced', logEvent);
      });
      map.pm.enableDraw("Circle");
      cy.get(mapSelector)
        .click(200, 385)
        .click(200, 200);
    }).then(()=>{
      cy.wait(100);
      expect(calledevent).to.equal("pm:centerplaced");
      calledevent = "";
    });
  });


  it('Events while editing: pm:edit,pm:update,pm:enable,pm:disable,pm:vertexadded,pm:vertexremoved', () => {
    var calledevent = "";

    cy.window().then(({ map, L }) => {

      function logEvent(e){
        calledevent = e.type;
      }

      map.on("pm:create",function (e) {
        map.pm.disableDraw();
        var layer = e.layer;

        layer.on('pm:edit', logEvent);
        layer.on('pm:update', logEvent);
        layer.on('pm:enable', logEvent);
        layer.on('pm:disable', logEvent);
        layer.on('pm:vertexadded', logEvent);
        layer.on('pm:vertexremoved', logEvent);
        /*
        TODO Can't tested --> needs dragging
        layer.on('pm:markerdragstart', logEvent);
        layer.on('pm:markerdragend', logEvent);
        layer.on('pm:snap', logEvent);
        layer.on('pm:snapdrag', logEvent);
        layer.on('pm:unsnap', logEvent);
        layer.on('pm:intersect', logEvent);
        layer.on('pm:centerplaced', logEvent);
         */

        layer.pm.enable({
          allowSelfIntersection: false,
        });

      });
      map.pm.enableDraw("Polygon");

      cy.get(mapSelector)
        .click(200, 200)
        .click(300, 200)
        .click(200, 300)
        .click(200, 200)
    }).then(()=>{
      cy.wait(100);
      expect(calledevent).to.equal("pm:enable");
      calledevent = "";
    });

    cy.window().then(({ map, L }) => {
      cy.get(mapSelector)
        .click(200, 250);
    }).then(()=>{
      cy.wait(100);
      expect(calledevent).to.equal("pm:vertexadded");
      calledevent = "";
    });

    cy.window().then(({ map, L }) => {
      cy.get(mapSelector)
        .rightclick(200, 250);
    }).then(()=>{
      cy.wait(100);
      expect(calledevent).to.equal("pm:vertexremoved");
      calledevent = "";
    });

    cy.window().then(({ map, L }) => {
      map.pm.disableGlobalEditMode();
    }).then(()=>{
      cy.wait(100);
      expect(calledevent).to.equal("pm:update");
      calledevent = "";
    });

    cy.window().then(({ map, L }) => {
      map.pm.toggleGlobalEditMode();
      map.pm.toggleGlobalEditMode();
    }).then(()=>{
      cy.wait(100);
      expect(calledevent).to.equal("pm:disable");
      calledevent = "";
    });
  });


  it('pm:cut', () => {
    var calledevent = "";
    var calledevent2 = "";

    cy.window().then(({ map, L }) => {

      map.on("pm:create",function (e) {
        var layer = e.layer;
        layer.on('pm:cut', function (e) {
          calledevent = e.type;
        });
      });

      map.on('pm:cut',function (e) {
        calledevent2 = e.type;
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
    }).then(()=>{
      cy.wait(100);
      expect(calledevent).to.equal("pm:cut");
      expect(calledevent2).to.equal("pm:cut");
      calledevent = "";
    });

  });

  it('pm:remove', () => {
    var calledevent = "";
    var calledevent2 = "";
    var calledevent3 = "";

    cy.window().then(({ map, L }) => {

      map.on("pm:create",function (e) {
        var layer = e.layer;
        layer.on('pm:remove', function (e) {
          calledevent = e.type;
        });
      });

      map.on('pm:remove',function (e) {
        calledevent2 = e.type;
      });
      map.on('layerremove',function (e) {
        calledevent3 = e.type;
      });

      cy.toolbarButton('polygon').click();

      cy.get(mapSelector)
        .click(90, 250)
        .click(150, 50)
        .click(500, 50)
        .click(500, 300)
        .click(300, 350)
        .click(90, 250);

      cy.toolbarButton('delete').click();

      cy.get(mapSelector)
        .click(450, 100);
    }).then(()=>{
      cy.wait(100);
      expect(calledevent).to.equal("pm:remove");
      expect(calledevent2).to.equal("pm:remove");
      expect(calledevent3).to.equal("layerremove");
      calledevent = "";
      calledevent2 = "";
      calledevent3 = "";
    });

  });

/*

 */
});
