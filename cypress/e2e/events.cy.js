describe('Events', () => {
  const mapSelector = '#map';

  it('pm:langchange', () => {
    let calledevent = '';

    cy.window()
      .then(({ map }) => {
        map.on('pm:langchange', (e) => {
          calledevent = e.type;
        });

        map.pm.setLang('de');
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('pm:langchange');
        calledevent = '';
      });
  });

  it('pm:globaleditmodetoggled', () => {
    let calledevent = '';

    cy.window()
      .then(({ map }) => {
        map.on('pm:globaleditmodetoggled', (e) => {
          calledevent = e.type;
        });
        map.pm.enableGlobalEditMode();
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('pm:globaleditmodetoggled');
        calledevent = '';
      });

    cy.window()
      .then(({ map }) => {
        map.on('pm:globaleditmodetoggled', (e) => {
          calledevent = e.type;
        });
        map.pm.disableGlobalEditMode();
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('pm:globaleditmodetoggled');
        calledevent = '';
      });

    cy.window()
      .then(({ map }) => {
        map.on('pm:globaleditmodetoggled', (e) => {
          calledevent = e.type;
        });

        map.pm.toggleGlobalEditMode();
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('pm:globaleditmodetoggled');
        calledevent = '';
      });
  });

  it('pm:globaldragmodetoggled', () => {
    let calledevent = '';

    cy.window()
      .then(({ map }) => {
        map.on('pm:globaldragmodetoggled', (e) => {
          calledevent = e.type;
        });
        map.pm.enableGlobalDragMode();
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('pm:globaldragmodetoggled');
        calledevent = '';
      });

    cy.window()
      .then(({ map }) => {
        map.on('pm:globaldragmodetoggled', (e) => {
          calledevent = e.type;
        });
        map.pm.disableGlobalDragMode();
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('pm:globaldragmodetoggled');
        calledevent = '';
      });

    cy.window()
      .then(({ map }) => {
        map.on('pm:globaldragmodetoggled', (e) => {
          calledevent = e.type;
        });

        map.pm.toggleGlobalDragMode();
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('pm:globaldragmodetoggled');
        calledevent = '';
      });
  });

  it('pm:globalremovalmodetoggled', () => {
    let calledevent = '';

    cy.window()
      .then(({ map }) => {
        map.on('pm:globalremovalmodetoggled', (e) => {
          calledevent = e.type;
        });
        map.pm.enableGlobalRemovalMode();
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('pm:globalremovalmodetoggled');
        calledevent = '';
      });

    cy.window()
      .then(({ map }) => {
        map.on('pm:globalremovalmodetoggled', (e) => {
          calledevent = e.type;
        });
        map.pm.disableGlobalRemovalMode();
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('pm:globalremovalmodetoggled');
        calledevent = '';
      });

    cy.window()
      .then(({ map }) => {
        map.on('pm:globalremovalmodetoggled', (e) => {
          calledevent = e.type;
        });

        map.pm.toggleGlobalRemovalMode();
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('pm:globalremovalmodetoggled');
        calledevent = '';
      });
  });

  it('pm:globaldrawmodetoggled', () => {
    let calledevent = '';

    cy.window()
      .then(({ map }) => {
        map.on('pm:globaldrawmodetoggled', (e) => {
          calledevent = e.type;
        });
        map.pm.enableDraw('Polygon');
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('pm:globaldrawmodetoggled');
        calledevent = '';
      });

    cy.window()
      .then(({ map }) => {
        map.on('pm:globaldrawmodetoggled', (e) => {
          calledevent = e.type;
        });
        map.pm.disableDraw('Polygon');
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('pm:globaldrawmodetoggled');
        calledevent = '';
      });
  });

  it('pm:globalcutmodetoggled', () => {
    let calledevent = '';

    cy.window()
      .then(({ map }) => {
        map.on('pm:globalcutmodetoggled', (e) => {
          calledevent = e.type;
        });
        map.pm.enableDraw('Cut');
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('pm:globalcutmodetoggled');
        calledevent = '';
      });

    cy.window()
      .then(({ map }) => {
        map.on('pm:globalcutmodetoggled', (e) => {
          calledevent = e.type;
        });
        map.pm.disableDraw('Cut');
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('pm:globalcutmodetoggled');
        calledevent = '';
      });

    cy.window()
      .then(({ map }) => {
        map.on('pm:globalcutmodetoggled', (e) => {
          calledevent = e.type;
        });
        map.pm.enableGlobalCutMode();
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('pm:globalcutmodetoggled');
        calledevent = '';
      });

    cy.window()
      .then(({ map }) => {
        map.on('pm:globalcutmodetoggled', (e) => {
          calledevent = e.type;
        });
        map.pm.disableGlobalCutMode();
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('pm:globalcutmodetoggled');
        calledevent = '';
      });

    cy.window()
      .then(({ map }) => {
        map.on('pm:globalcutmodetoggled', (e) => {
          calledevent = e.type;
        });
        map.pm.toggleGlobalCutMode();
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('pm:globalcutmodetoggled');
        calledevent = '';
      });
  });

  it('pm:drawstart & pm:drawend', () => {
    let calledevent = '';

    cy.window()
      .then(({ map }) => {
        map.on('pm:drawstart', (e) => {
          calledevent = e.type;
        });
        map.pm.enableDraw('Polygon');
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('pm:drawstart');
        calledevent = '';
      });

    cy.window()
      .then(({ map }) => {
        map.on('pm:drawend', (e) => {
          calledevent = e.type;
        });
        map.pm.disableDraw('Polygon');
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('pm:drawend');
        calledevent = '';
      });
  });

  it('pm:create', () => {
    let calledevent = '';

    cy.window()
      .then(({ map }) => {
        map.on('pm:create', (e) => {
          calledevent = e.type;
        });
        map.pm.enableDraw('Circle');

        cy.get(mapSelector).click(200, 200).click(250, 250);
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('pm:create');
        calledevent = '';
      });
  });
  it('Events while drawing: pm:vertexadded, pm:snapdrag, pm:snap, pm:unsnap, pm:centerplaced', () => {
    let calledevent = '';

    cy.window()
      .then(({ map }) => {
        function logEvent(e) {
          calledevent = e.type;
        }

        map.on('pm:drawstart', (e) => {
          const layer = e.workingLayer;
          layer.on('pm:vertexadded', logEvent);
          layer.on('pm:snapdrag', logEvent);
          layer.on('pm:snap', logEvent);
          layer.on('pm:unsnap', logEvent);
          layer.on('pm:centerplaced', logEvent);
        });
        map.pm.enableDraw('Polygon');

        cy.get(mapSelector).click(200, 300);
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('pm:vertexadded');
        calledevent = '';
      });

    cy.window()
      .then(() => {
        cy.get(mapSelector)
          .click(200, 350)
          .trigger('mousemove', { clientX: 200, clientY: 305 });
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('pm:snap');
        calledevent = '';
      });

    cy.window()
      .then(() => {
        cy.get(mapSelector).trigger('mousemove', {
          clientX: 300,
          clientY: 355,
        });
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('pm:unsnap');
        calledevent = '';
      });

    cy.window()
      .then(() => {
        cy.get(mapSelector).trigger('mousemove', {
          clientX: 300,
          clientY: 385,
        });
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('pm:snapdrag');
        calledevent = '';
      });
  });

  it(' pm:centerplaced event while drawing', () => {
    let calledevent = '';

    cy.window()
      .then(({ map }) => {
        function logEvent(e) {
          calledevent = e.type;
        }

        map.on('pm:drawstart', (e) => {
          const layer = e.workingLayer;
          layer.on('pm:centerplaced', logEvent);
        });
        map.pm.enableDraw('Circle');
        cy.get(mapSelector).click(200, 385).click(200, 200);
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('pm:centerplaced');
        calledevent = '';
      });
  });

  it('Events while editing: pm:edit,pm:update,pm:enable,pm:disable,pm:vertexadded,pm:vertexremoved', () => {
    let calledevent = '';
    let calledeventArr = [];

    cy.window()
      .then(({ map }) => {
        function logEvent(e) {
          calledevent = e.type;
          calledeventArr[e.type] = e.type;
        }

        map.on('pm:create', ({ layer }) => {
          map.pm.disableDraw();

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
        map.pm.enableDraw('Polygon');

        cy.get(mapSelector)

          .click(200, 300)
          .click(300, 300)
          .click(200, 400)
          .click(200, 300);
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('pm:enable');
        calledevent = '';
      });

    cy.window()
      .then(() => {
        cy.get(mapSelector).click(200, 350);
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('pm:vertexadded');
        calledevent = '';
      });

    cy.window()
      .then(() => {
        cy.get(mapSelector).rightclick(200, 350);
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('pm:vertexremoved');
        calledevent = '';
      });

    cy.window()
      .then(({ map }) => {
        map.pm.disableGlobalEditMode();
      })
      .then(() => {
        cy.wait(100);
        expect(calledeventArr['pm:update']).to.equal('pm:update');
        calledevent = '';
        calledeventArr = [];
      });

    cy.window()
      .then(({ map }) => {
        map.pm.toggleGlobalEditMode();
        map.pm.toggleGlobalEditMode();
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('pm:disable');
        calledevent = '';
      });
  });

  it('pm:cut', () => {
    let calledevent = '';
    let calledevent2 = '';

    cy.window()
      .then(({ map }) => {
        map.on('pm:create', ({ layer }) => {
          layer.on('pm:cut', (e) => {
            calledevent = e.type;
          });
        });

        map.on('pm:cut', (e) => {
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
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('pm:cut');
        expect(calledevent2).to.equal('pm:cut');
        calledevent = '';
      });
  });

  it('pm:remove', () => {
    let calledevent = '';
    let calledevent2 = '';
    let calledevent3 = '';

    cy.window()
      .then(({ map }) => {
        map.on('pm:create', ({ layer }) => {
          layer.on('pm:remove', (e) => {
            calledevent = e.type;
          });
        });

        map.on('pm:remove', (e) => {
          calledevent2 = e.type;
        });
        map.on('layerremove', (e) => {
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

        cy.get(mapSelector).click(450, 100);
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('pm:remove');
        expect(calledevent2).to.equal('pm:remove');
        expect(calledevent3).to.equal('layerremove');
        calledevent = '';
        calledevent2 = '';
        calledevent3 = '';
      });
  });

  it('snappingOrder', () => {
    let event = '';
    cy.window().then(({ map }) => {
      map.on('pm:drawstart', (e) => {
        e.workingLayer.on('pm:snap', (x) => {
          event = x;
        });
      });

      map.pm.setGlobalOptions({ snappingOrder: ['Marker'] });
    });

    cy.window().then(() => {
      cy.toolbarButton('marker').click();
      cy.get(mapSelector).click(200, 250);

      cy.toolbarButton('circle-marker').click();
      cy.get(mapSelector).click(200, 250);

      cy.toolbarButton('marker').click();
      cy.get(mapSelector).trigger('mousemove', 200, 250, { which: 1 });
    });
    cy.window().then(() => {
      const shape = event.layerInteractedWith.pm._shape;
      expect(shape).to.eq('Marker');
    });

    cy.window().then(({ map }) => {
      map.pm.setGlobalOptions({ snappingOrder: ['CircleMarker'] });

      map.pm.enableDraw('Marker');

      cy.get(mapSelector)
        .trigger('mousemove', 200, 150, { which: 1 })
        .trigger('mousemove', 200, 250, { which: 1 });
    });
    cy.window().then(() => {
      const shape = event.layerInteractedWith.pm._shape;
      expect(shape).to.eq('CircleMarker');
    });
  });
});
