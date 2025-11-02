describe('Events', () => {
  const mapSelector = '#map';

  it('geoman:langchange', () => {
    let calledevent = '';

    cy.window()
      .then(({ map }) => {
        map.on('geoman:langchange', (e) => {
          calledevent = e.type;
        });

        map.geoman.setLang('de');
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('geoman:langchange');
        calledevent = '';
      });
  });

  it('geoman:globaleditmodetoggled', () => {
    let calledevent = '';

    cy.window()
      .then(({ map }) => {
        map.on('geoman:globaleditmodetoggled', (e) => {
          calledevent = e.type;
        });
        map.geoman.enableGlobalEditMode();
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('geoman:globaleditmodetoggled');
        calledevent = '';
      });

    cy.window()
      .then(({ map }) => {
        map.on('geoman:globaleditmodetoggled', (e) => {
          calledevent = e.type;
        });
        map.geoman.disableGlobalEditMode();
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('geoman:globaleditmodetoggled');
        calledevent = '';
      });

    cy.window()
      .then(({ map }) => {
        map.on('geoman:globaleditmodetoggled', (e) => {
          calledevent = e.type;
        });

        map.geoman.toggleGlobalEditMode();
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('geoman:globaleditmodetoggled');
        calledevent = '';
      });
  });

  it('geoman:globaldragmodetoggled', () => {
    let calledevent = '';

    cy.window()
      .then(({ map }) => {
        map.on('geoman:globaldragmodetoggled', (e) => {
          calledevent = e.type;
        });
        map.geoman.enableGlobalDragMode();
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('geoman:globaldragmodetoggled');
        calledevent = '';
      });

    cy.window()
      .then(({ map }) => {
        map.on('geoman:globaldragmodetoggled', (e) => {
          calledevent = e.type;
        });
        map.geoman.disableGlobalDragMode();
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('geoman:globaldragmodetoggled');
        calledevent = '';
      });

    cy.window()
      .then(({ map }) => {
        map.on('geoman:globaldragmodetoggled', (e) => {
          calledevent = e.type;
        });

        map.geoman.toggleGlobalDragMode();
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('geoman:globaldragmodetoggled');
        calledevent = '';
      });
  });

  it('geoman:globalremovalmodetoggled', () => {
    let calledevent = '';

    cy.window()
      .then(({ map }) => {
        map.on('geoman:globalremovalmodetoggled', (e) => {
          calledevent = e.type;
        });
        map.geoman.enableGlobalRemovalMode();
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('geoman:globalremovalmodetoggled');
        calledevent = '';
      });

    cy.window()
      .then(({ map }) => {
        map.on('geoman:globalremovalmodetoggled', (e) => {
          calledevent = e.type;
        });
        map.geoman.disableGlobalRemovalMode();
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('geoman:globalremovalmodetoggled');
        calledevent = '';
      });

    cy.window()
      .then(({ map }) => {
        map.on('geoman:globalremovalmodetoggled', (e) => {
          calledevent = e.type;
        });

        map.geoman.toggleGlobalRemovalMode();
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('geoman:globalremovalmodetoggled');
        calledevent = '';
      });
  });

  it('geoman:globaldrawmodetoggled', () => {
    let calledevent = '';

    cy.window()
      .then(({ map }) => {
        map.on('geoman:globaldrawmodetoggled', (e) => {
          calledevent = e.type;
        });
        map.geoman.enableDraw('Polygon');
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('geoman:globaldrawmodetoggled');
        calledevent = '';
      });

    cy.window()
      .then(({ map }) => {
        map.on('geoman:globaldrawmodetoggled', (e) => {
          calledevent = e.type;
        });
        map.geoman.disableDraw();
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('geoman:globaldrawmodetoggled');
        calledevent = '';
      });
  });

  it('geoman:globalcutmodetoggled', () => {
    let calledevent = '';

    cy.window()
      .then(({ map }) => {
        map.on('geoman:globalcutmodetoggled', (e) => {
          calledevent = e.type;
        });
        map.geoman.enableDraw('Cut');
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('geoman:globalcutmodetoggled');
        calledevent = '';
      });

    cy.window()
      .then(({ map }) => {
        map.on('geoman:globalcutmodetoggled', (e) => {
          calledevent = e.type;
        });
        map.geoman.disableDraw();
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('geoman:globalcutmodetoggled');
        calledevent = '';
      });

    cy.window()
      .then(({ map }) => {
        map.on('geoman:globalcutmodetoggled', (e) => {
          calledevent = e.type;
        });
        map.geoman.enableGlobalCutMode();
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('geoman:globalcutmodetoggled');
        calledevent = '';
      });

    cy.window()
      .then(({ map }) => {
        map.on('geoman:globalcutmodetoggled', (e) => {
          calledevent = e.type;
        });
        map.geoman.disableGlobalCutMode();
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('geoman:globalcutmodetoggled');
        calledevent = '';
      });

    cy.window()
      .then(({ map }) => {
        map.on('geoman:globalcutmodetoggled', (e) => {
          calledevent = e.type;
        });
        map.geoman.toggleGlobalCutMode();
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('geoman:globalcutmodetoggled');
        calledevent = '';
      });
  });

  it('geoman:drawstart & geoman:drawend', () => {
    let calledevent = '';

    cy.window()
      .then(({ map }) => {
        map.on('geoman:drawstart', (e) => {
          calledevent = e.type;
        });
        map.geoman.enableDraw('Polygon');
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('geoman:drawstart');
        calledevent = '';
      });

    cy.window()
      .then(({ map }) => {
        map.on('geoman:drawend', (e) => {
          calledevent = e.type;
        });
        map.geoman.disableDraw();
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('geoman:drawend');
        calledevent = '';
      });
  });

  it('geoman:create', () => {
    let calledevent = '';

    cy.window()
      .then(({ map }) => {
        map.on('geoman:create', (e) => {
          calledevent = e.type;
        });
        map.geoman.enableDraw('Circle');

        cy.get(mapSelector).click(200, 200).click(250, 250);
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('geoman:create');
        calledevent = '';
      });
  });
  it('Events while drawing: geoman:vertexadded, geoman:snapdrag, geoman:snap, geoman:unsnap, geoman:centerplaced', () => {
    let calledevent = '';

    cy.window()
      .then(({ map }) => {
        function logEvent(e) {
          calledevent = e.type;
        }

        map.on('geoman:drawstart', (e) => {
          const layer = e.workingLayer;
          layer.on('geoman:vertexadded', logEvent);
          layer.on('geoman:snapdrag', logEvent);
          layer.on('geoman:snap', logEvent);
          layer.on('geoman:unsnap', logEvent);
          layer.on('geoman:centerplaced', logEvent);
        });
        map.geoman.enableDraw('Polygon');

        cy.get(mapSelector).click(200, 300);
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('geoman:vertexadded');
        calledevent = '';
      });

    cy.window()
      .then(() => {
        cy.get(mapSelector)
          .click(200, 350)
          .trigger('pointermove', { clientX: 200, clientY: 305 });
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('geoman:snap');
        calledevent = '';
      });

    cy.window()
      .then(() => {
        cy.get(mapSelector).trigger('pointermove', {
          clientX: 300,
          clientY: 355,
        });
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('geoman:unsnap');
        calledevent = '';
      });

    cy.window()
      .then(() => {
        cy.get(mapSelector).trigger('pointermove', {
          clientX: 300,
          clientY: 385,
        });
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('geoman:snapdrag');
        calledevent = '';
      });
  });

  it(' geoman:centerplaced event while drawing', () => {
    let calledevent = '';

    cy.window()
      .then(({ map }) => {
        function logEvent(e) {
          calledevent = e.type;
        }

        map.on('geoman:drawstart', (e) => {
          const layer = e.workingLayer;
          layer.on('geoman:centerplaced', logEvent);
        });
        map.geoman.enableDraw('Circle');
        cy.get(mapSelector).click(200, 385).click(200, 200);
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('geoman:centerplaced');
        calledevent = '';
      });
  });

  it('Events while editing: geoman:edit,geoman:update,geoman:enable,geoman:disable,geoman:vertexadded,geoman:vertexremoved', () => {
    let calledevent = '';
    let calledeventArr = [];

    cy.window()
      .then(({ map }) => {
        function logEvent(e) {
          calledevent = e.type;
          calledeventArr[e.type] = e.type;
        }

        map.on('geoman:create', ({ layer }) => {
          map.geoman.disableDraw();

          layer.on('geoman:edit', logEvent);
          layer.on('geoman:update', logEvent);
          layer.on('geoman:enable', logEvent);
          layer.on('geoman:disable', logEvent);
          layer.on('geoman:vertexadded', logEvent);
          layer.on('geoman:vertexremoved', logEvent);
          /*
        TODO Can't tested --> needs dragging
        layer.on('geoman:vertexdragstart', logEvent);
        layer.on('geoman:vertexdragend', logEvent);
        layer.on('geoman:snap', logEvent);
        layer.on('geoman:snapdrag', logEvent);
        layer.on('geoman:unsnap', logEvent);
        layer.on('geoman:intersect', logEvent);
        layer.on('geoman:centerplaced', logEvent);
         */

          layer.geoman.enable({
            allowSelfIntersection: false,
          });
        });
        map.geoman.enableDraw('Polygon');

        cy.get(mapSelector)

          .click(200, 300)
          .click(300, 300)
          .click(200, 400)
          .click(200, 300);
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('geoman:enable');
        calledevent = '';
      });

    cy.window()
      .then(() => {
        cy.get(mapSelector).click(200, 350);
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('geoman:vertexadded');
        calledevent = '';
      });

    cy.window()
      .then(() => {
        cy.get(mapSelector).rightclick(200, 350);
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('geoman:vertexremoved');
        calledevent = '';
      });

    cy.window()
      .then(({ map }) => {
        map.geoman.disableGlobalEditMode();
      })
      .then(() => {
        cy.wait(100);
        expect(calledeventArr['geoman:update']).to.equal('geoman:update');
        calledevent = '';
        calledeventArr = [];
      });

    cy.window()
      .then(({ map }) => {
        map.geoman.toggleGlobalEditMode();
        map.geoman.toggleGlobalEditMode();
      })
      .then(() => {
        cy.wait(100);
        expect(calledevent).to.equal('geoman:disable');
        calledevent = '';
      });
  });

  it('geoman:cut', () => {
    let calledevent = '';
    let calledevent2 = '';

    cy.window()
      .then(({ map }) => {
        map.on('geoman:create', ({ layer }) => {
          layer.on('geoman:cut', (e) => {
            calledevent = e.type;
          });
        });

        map.on('geoman:cut', (e) => {
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
        expect(calledevent).to.equal('geoman:cut');
        expect(calledevent2).to.equal('geoman:cut');
        calledevent = '';
      });
  });

  it('geoman:remove', () => {
    let calledevent = '';
    let calledevent2 = '';
    let calledevent3 = '';

    cy.window()
      .then(({ map }) => {
        map.on('geoman:create', ({ layer }) => {
          layer.on('geoman:remove', (e) => {
            calledevent = e.type;
          });
        });

        map.on('geoman:remove', (e) => {
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
        expect(calledevent).to.equal('geoman:remove');
        expect(calledevent2).to.equal('geoman:remove');
        expect(calledevent3).to.equal('layerremove');
        calledevent = '';
        calledevent2 = '';
        calledevent3 = '';
      });
  });

  it('snappingOrder', () => {
    let event = '';
    cy.window().then(({ map }) => {
      map.on('geoman:drawstart', (e) => {
        e.workingLayer.on('geoman:snap', (x) => {
          event = x;
        });
      });

      map.geoman.setGlobalOptions({ snappingOrder: ['Marker'] });
    });

    cy.window().then(() => {
      cy.toolbarButton('marker').click();
      cy.get(mapSelector).click(200, 250);

      cy.toolbarButton('circle-marker').click();
      cy.get(mapSelector).click(200, 250);

      cy.toolbarButton('marker').click();
      cy.get(mapSelector).trigger('pointermove', 200, 250, { which: 1 });
    });
    cy.window().then(() => {
      const shape = event.layerInteractedWith.geoman._shape;
      expect(shape).to.eq('Marker');
    });

    cy.window().then(({ map }) => {
      map.geoman.setGlobalOptions({ snappingOrder: ['CircleMarker'] });

      map.geoman.enableDraw('Marker');

      cy.get(mapSelector)
        .trigger('pointermove', 200, 150, { which: 1 })
        .trigger('pointermove', 200, 250, { which: 1 });
    });
    cy.window().then(() => {
      const shape = event.layerInteractedWith.geoman._shape;
      expect(shape).to.eq('CircleMarker');
    });
  });
});
