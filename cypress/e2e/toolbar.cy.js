describe('Testing the Toolbar', () => {
  const mapSelector = '#map';

  it('Repositions The Toolbar', () => {
    cy.get('.leaflet-geoman-toolbar')
      .parent('.leaflet-top.leaflet-left')
      .should('exist');

    cy.window().then(({ map }) => {
      map.pm.addControls({
        position: 'topright',
      });
    });

    cy.toolbarButton('polygon').click();

    cy.get('.leaflet-geoman-actions-container')
      .should('have.css', 'right')
      .and('match', /100%/);

    cy.get('.leaflet-geoman-toolbar')
      .parent('.leaflet-top.leaflet-right')
      .should('exist');

    cy.get(
      '.leaflet-geoman-button-container.leaflet-geoman-active .action-cancel'
    ).click();

    cy.window().then(({ map }) => {
      map.pm.addControls({
        position: 'bottomright',
      });
    });

    cy.get('.leaflet-geoman-toolbar')
      .parent('.leaflet-bottom.leaflet-right')
      .should('exist');

    cy.window().then(({ map }) => {
      map.pm.addControls({
        position: 'bottomleft',
      });
    });

    cy.get('.leaflet-geoman-toolbar')
      .parent('.leaflet-bottom.leaflet-left')
      .should('exist');

    cy.window().then(({ map }) => {
      map.pm.addControls({
        position: 'topleft',
      });
    });
  });

  it('Handles Button States', () => {
    cy.toolbarButton('edit')
      .click()
      .closest('.leaflet-geoman-button-container')
      .should('have.class', 'leaflet-geoman-active');

    cy.toolbarButton('marker')
      .click()
      .closest('.leaflet-geoman-button-container')
      .should('have.class', 'leaflet-geoman-active');

    cy.toolbarButton('edit')
      .closest('.leaflet-geoman-button-container')
      .should('have.not.class', 'leaflet-geoman-active');

    cy.toolbarButton('polyline').click();
    cy.toolbarButton('polygon').click();
    cy.toolbarButton('circle').click();
    cy.toolbarButton('rectangle').click();
    cy.toolbarButton('cut').click();
    cy.toolbarButton('edit').click();
    cy.toolbarButton('delete').click();
    cy.toolbarButton('circle').click();
    cy.toolbarButton('circle').click();
    cy.toolbarButton('circle')
      .click()
      .closest('.leaflet-geoman-button-container')
      .should('have.class', 'leaflet-geoman-active');

    cy.toolbarButton('edit')
      .closest('.leaflet-geoman-button-container')
      .should('have.not.class', 'leaflet-geoman-active');
    cy.toolbarButton('polyline')
      .closest('.leaflet-geoman-button-container')
      .should('have.not.class', 'leaflet-geoman-active');
    cy.toolbarButton('delete')
      .closest('.leaflet-geoman-button-container')
      .should('have.not.class', 'leaflet-geoman-active');
    cy.toolbarButton('rectangle')
      .closest('.leaflet-geoman-button-container')
      .should('have.not.class', 'leaflet-geoman-active');
  });

  it('Reacts to programmatic state change', () => {
    cy.window().then(({ map }) => {
      map.pm.enableGlobalEditMode();
    });

    cy.toolbarButton('edit')
      .closest('.leaflet-geoman-button-container')
      .should('have.class', 'leaflet-geoman-active');

    cy.window().then(({ map }) => {
      map.pm.toggleGlobalRemovalMode();
    });

    cy.toolbarButton('edit')
      .closest('.leaflet-geoman-button-container')
      .should('have.not.class', 'leaflet-geoman-active');
    cy.toolbarButton('delete')
      .closest('.leaflet-geoman-button-container')
      .should('have.class', 'leaflet-geoman-active');

    cy.window().then(({ map }) => {
      map.pm.toggleGlobalRemovalMode();
      map.pm.toggleGlobalRemovalMode();
      map.pm.toggleGlobalRemovalMode();
    });

    cy.toolbarButton('delete')
      .closest('.leaflet-geoman-button-container')
      .should('have.not.class', 'leaflet-geoman-active');

    cy.window().then(({ map }) => {
      map.pm.toggleGlobalEditMode();
      map.pm.toggleGlobalRemovalMode();

      map.pm.enableDraw('Marker');
    });

    cy.toolbarButton('delete')
      .closest('.leaflet-geoman-button-container')
      .should('have.not.class', 'leaflet-geoman-active');

    cy.toolbarButton('edit')
      .closest('.leaflet-geoman-button-container')
      .should('have.not.class', 'leaflet-geoman-active');

    cy.toolbarButton('marker')
      .closest('.leaflet-geoman-button-container')
      .should('have.class', 'leaflet-geoman-active');

    cy.toolbarButton('marker').click();
  });

  it('Has Working translation for circle marker toolbar button', () => {
    cy.window().then(({ map }) => {
      map.pm.setLang('es');
    });

    cy.get(
      '.leaflet-geoman-buttons-control-button .leaflet-geoman-icon-circle-marker'
    )
      .parent()
      .parent()
      .should('have.attr', 'title')
      .and('include', 'Dibujar Marcador de Círculo');
  });

  it('has functioning actions', () => {
    cy.toolbarButton('polygon').click();

    cy.get(
      '.leaflet-geoman-button-container.leaflet-geoman-active .action-cancel'
    ).should('exist');

    cy.get(
      '.leaflet-geoman-button-container.leaflet-geoman-active .action-cancel'
    ).click();

    cy.get(
      '.leaflet-geoman-button-container.leaflet-geoman-active .action-cancel'
    ).should('not.exist');

    cy.toolbarButton('polygon').click();

    cy.get(mapSelector)
      .click(250, 250)
      .click(270, 80)
      .click(300, 80)
      .click(280, 280)
      .click(200, 285);

    cy.hasVertexMarkers(6);

    cy.get(
      '.leaflet-geoman-button-container.leaflet-geoman-active .action-finish'
    ).click();

    cy.hasVertexMarkers(0);

    cy.toolbarButton('edit').click();

    cy.hasVertexMarkers(5);

    cy.get(
      '.leaflet-geoman-button-container.leaflet-geoman-active .action-finishMode'
    ).click();

    cy.hasVertexMarkers(0);
  });

  it('Custom Controls - new button', () => {
    cy.get('.leaflet-geoman-toolbar')
      .parent('.leaflet-top.leaflet-left')
      .should('exist');

    cy.window().then(({ map }) => {
      let testresult = '';

      // Click button -> toggle disabled
      map.pm.Toolbar.createCustomControl({
        name: 'clickButton',
        block: 'custom',
        className: 'leaflet-geoman-icon-marker',
        title: 'Count layers',
        onClick: () => {
          testresult = 'clickButton clicked';
        },
        toggle: false,
      });
      cy.toolbarButtonContainer('clickButton', map).then((container) => {
        cy.get(container[0])
          .should('have.attr', 'title')
          .and('include', 'Count layers');
        container[0].children[0].click(); // button
        expect(testresult).to.equal('clickButton clicked');
        cy.get(container).should('not.have.class', 'leaflet-geoman-active');
      });
      expect(map.pm.Toolbar.getButton('clickButton')).to.not.equal(undefined);
      expect(map.pm.Toolbar.controlExists('clickButton')).to.equal(true);
      expect(
        'clickButton' in map.pm.Toolbar.getButtonsInBlock('custom')
      ).to.equal(true);
    });
  });

  it('Custom Controls - new draw instance', () => {
    cy.get('.leaflet-geoman-toolbar')
      .parent('.leaflet-top.leaflet-left')
      .should('exist');

    cy.window().then(({ map }) => {
      let testresult = '';
      let testlayer;

      // Copy of Polygon Button
      const actions = [
        'cancel',
        { text: 'Custom text, no click' },
        {
          text: 'Click event',
          onClick: () => {
            testresult = 'click';
          },
        },
      ];
      map.pm.Toolbar.copyDrawControl('Polygon', {
        name: 'PolygonCopy',
        block: 'custom',
        className: 'leaflet-geoman-icon-polygon',
        title: 'Display text on hover button',
        actions,
      });
      map.pm.Draw.PolygonCopy.setPathOptions({ color: 'red' });

      cy.toolbarButtonContainer('PolygonCopy', map).then((container) => {
        cy.get(container[0])
          .should('have.attr', 'title')
          .and('include', 'Display text on hover button');
        cy.get(container[0].children[0]).click(); // button
        cy.get(container).should('have.class', 'leaflet-geoman-active');
        const buttonActions = container[0].children[1].children;
        const actioncount = buttonActions.length;
        expect(actioncount).to.equal(3);

        cy.get(buttonActions[2])
          .click()
          .then(() => {
            expect(testresult).to.equal('click');
            expect(buttonActions[1].innerHTML).to.equal(
              'Custom text, no click'
            );
          });

        cy.get(buttonActions[0]).click();
        cy.get(container).should('not.have.class', 'leaflet-geoman-active');
        cy.window().then(() => {
          map.pm.enableDraw('PolygonCopy');
          map.on('pm:create', (e) => {
            expect(e.shape).to.equal('PolygonCopy');
            e.layer.on('click', (l) => {
              testlayer = l.target;
            });
          });
        });
        cy.get(container).should('have.class', 'leaflet-geoman-active');
        // draw a polygon
        cy.get(mapSelector)
          .click(450, 100)
          .click(450, 150)
          .click(400, 150)
          .click(390, 140)
          .click(390, 100)
          .click(450, 100);

        cy.get(mapSelector)
          .click(390, 140)
          .then(() => {
            expect(testlayer.options.color).to.equal('red');
          });
      });
    });
  });

  it('Add new draw instance and keep Toolbar hidden', () => {
    cy.window().then(({ map }) => {
      map.pm.removeControls();
    });
    cy.get('.leaflet-geoman-toolbar').should('not.exist');

    cy.window().then(({ map }) => {
      map.pm.Toolbar.copyDrawControl('Polygon', { name: 'PolygonCopy' });
    });

    cy.get('.leaflet-geoman-toolbar').should('not.exist');
  });

  it('Custom Controls - Custom order', () => {
    cy.window().then(({ map }) => {
      map.pm.Toolbar.changeControlOrder(['Rectangle']);
      cy.get('.leaflet-geoman-toolbar.leaflet-geoman-draw').then(
        (container) => {
          cy.get(container[0].children[0]).then((e) => {
            cy.get(e[0].children[0].children[0]).should(
              'have.class',
              'leaflet-geoman-icon-rectangle'
            );
          });
        }
      );
    });
  });

  it('Custom Controls - One Block', () => {
    cy.window().then(({ map, ONE_BLOCK_CONTROL_COUNT }) => {
      map.pm.addControls({
        oneBlock: true,
      });
      cy.get('.leaflet-geoman-toolbar.leaflet-geoman-topleft').then(
        (container) => {
          expect(container[0].children.length).to.equal(
            ONE_BLOCK_CONTROL_COUNT
          );
        }
      );
    });
  });

  it('Different block positions', () => {
    cy.window().then(({ map }) => {
      map.pm.addControls({
        positions: {
          draw: 'topright',
          edit: 'topleft',
        },
      });
      cy.get('.leaflet-geoman-toolbar.leaflet-geoman-edit')
        .parent('.leaflet-top.leaflet-left')
        .should('exist');
      cy.get('.leaflet-geoman-toolbar.leaflet-geoman-draw')
        .parent('.leaflet-top.leaflet-right')
        .should('exist');
    });
  });

  it('Different block positions - One Block', () => {
    cy.window().then(
      ({
        map,
        TOP_RIGHT_BLOCK_CONTROL_COUNT,
        TOP_LEFT_BLOCK_CONTROL_COUNT,
      }) => {
        map.pm.addControls({
          oneBlock: true,
          positions: {
            draw: 'topright',
            edit: 'topleft',
            custom: 'topleft',
          },
        });

        map.pm.Toolbar.copyDrawControl('Polygon', {
          name: 'PolygonCopy',
          block: 'custom',
          className: 'leaflet-geoman-icon-polygon',
          title: 'Display text on hover button',
        });
        cy.get('.leaflet-geoman-toolbar.leaflet-geoman-topright').then(
          (container) => {
            expect(container[0].children.length).to.equal(
              TOP_RIGHT_BLOCK_CONTROL_COUNT
            );
          }
        );
        cy.get('.leaflet-geoman-toolbar.leaflet-geoman-topleft').then(
          (container) => {
            expect(container[0].children.length).to.equal(
              TOP_LEFT_BLOCK_CONTROL_COUNT
            );
          }
        );
      }
    );
  });
  it('Listen on pm:buttonclick and pm:actionclick', () => {
    let eventFired = '';
    cy.window().then(({ map }) => {
      map.on('pm:buttonclick', ({ btnName }) => {
        eventFired = btnName;
      });
      map.on('pm:actionclick', ({ text }) => {
        eventFired = text;
      });
    });

    cy.toolbarButton('polygon').click();

    cy.window().then(() => {
      expect(eventFired).to.equal('drawPolygon');
    });

    cy.get(
      '.leaflet-geoman-button-container.leaflet-geoman-active .action-cancel'
    ).click();

    cy.window().then(() => {
      expect(eventFired).to.equal('Cancel');
    });
  });
  it('Disable button', () => {
    let eventFired = '';
    cy.window().then(({ map }) => {
      map.on('pm:buttonclick', ({ btnName }) => {
        eventFired = btnName;
      });
      map.pm.Toolbar.setButtonDisabled('drawPolygon', true);
    });

    cy.toolbarButton('polygon').click();

    cy.window().then(() => {
      expect(eventFired).to.not.equal('drawPolygon');
      cy.url().then((url) => {
        expect(url.endsWith('#')).to.equal(false);
      });
    });
  });
  it('Disable active button', () => {
    let eventFired = '';
    cy.window().then(({ map }) => {
      map.on('pm:buttonclick', ({ btnName }) => {
        eventFired = btnName;
      });

      cy.toolbarButton('polygon')
        .click()
        .closest('.leaflet-geoman-button-container')
        .should('have.class', 'leaflet-geoman-active')
        .then(() => {
          expect(eventFired).to.equal('drawPolygon');
          eventFired = '';
          map.pm.Toolbar.setButtonDisabled('drawPolygon', true);
        });
    });

    cy.window().then(() => {
      expect(eventFired).to.not.equal('drawPolygon');
      cy.toolbarButton('polygon')
        .closest('.leaflet-geoman-button-container')
        .should('have.not.class', 'leaflet-geoman-active');
    });
  });

  it('Disable button before init controller', () => {
    cy.window().then(({ map, L }) => {
      map.remove();

      // create the map
      map = new L.Map('map', {
        preferCanvas: false,
        doubleClickZoom: false, // Leaflet 1.8 DoubleTap fix
      }).setView([51.505, -0.09], 13);

      map.pm.Toolbar.setButtonDisabled('drawMarker', true);

      // add leaflet-geoman toolbar
      map.pm.addControls();

      cy.get('.leaflet-geoman-toolbar')
        .parent('.leaflet-top.leaflet-left')
        .should('exist');
    });
  });

  it('Enable disabled button', () => {
    let eventFired = '';
    cy.window().then(({ map }) => {
      map.on('pm:buttonclick', ({ btnName }) => {
        eventFired = btnName;
      });
      map.pm.Toolbar.setButtonDisabled('drawPolygon', true);
    });
    cy.toolbarButton('polygon')
      .click()
      .then(() => {
        expect(eventFired).to.equal('');
      });

    cy.window().then(({ map }) => {
      map.pm.Toolbar.setButtonDisabled('drawPolygon', false);
    });
    cy.toolbarButton('polygon')
      .click()
      .then(() => {
        expect(eventFired).to.equal('drawPolygon');
      });
  });

  it("After disabling & enabling of a button, while a mode is active, don't call disable on the draw layer", (done) => {
    let eventFired = '';

    cy.toolbarButton('edit').click();

    cy.window().then(({ map }) => {
      map.on('pm:drawend', ({ shape }) => {
        eventFired = shape;
      });
      map.pm.Toolbar.setButtonDisabled('drawText', true);
      map.pm.Toolbar.setButtonDisabled('drawText', false);
    });
    cy.toolbarButton('text').click();

    cy.window().then(() => {
      expect(eventFired).to.equal('');
      done();
    });
  });

  it('Deletes custom control and adds a new one with the same name', () => {
    const clickSpy = cy.spy();
    const clickSpyNew = cy.spy();

    cy.window().then(({ map }) => {
      map.pm.Toolbar.createCustomControl({
        name: 'alertBox',
        onClick: clickSpy,
        toggle: false,
        block: 'custom',
      });

      cy.toolbarButtonContainer('alertBox', map).then((container) => {
        container[0].children[0].click(); // button
      });
    });

    cy.window().then(({ map }) => {
      // expect needs to be in the this block, otherwise it will be executed before the click event
      expect(clickSpy.callCount).to.be.eq(1);

      map.pm.Toolbar.deleteControl('alertBox');

      map.pm.Toolbar.createCustomControl({
        name: 'alertBox',
        onClick: clickSpyNew,
        toggle: false,
        block: 'custom',
      });

      cy.toolbarButtonContainer('alertBox', map).then((container) => {
        container[0].children[0].click(); // button
      });
    });

    cy.window().then(() => {
      // expect needs to be in the this block, otherwise it will be executed before the click event
      expect(clickSpy.callCount).to.be.eq(1);
      expect(clickSpyNew.callCount).to.be.eq(1);
    });
  });
});
