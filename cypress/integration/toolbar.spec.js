describe('Testing the Toolbar', () => {
  const mapSelector = '#map';

  it('Repositions The Toolbar', () => {
    cy.get('.leaflet-pm-toolbar')
      .parent('.leaflet-top.leaflet-left')
      .should('exist');

    cy.window().then(({ map }) => {
      map.pm.addControls({
        position: 'topright',
      });
    });

    cy.toolbarButton('polygon').click();

    cy.get('.leaflet-pm-actions-container')
      .should('have.css', 'right')
      .and('match', /100%/);

    cy.get('.leaflet-pm-toolbar')
      .parent('.leaflet-top.leaflet-right')
      .should('exist');

    cy.get('.button-container.active .action-cancel').click();

    cy.window().then(({ map }) => {
      map.pm.addControls({
        position: 'bottomright',
      });
    });

    cy.get('.leaflet-pm-toolbar')
      .parent('.leaflet-bottom.leaflet-right')
      .should('exist');

    cy.window().then(({ map }) => {
      map.pm.addControls({
        position: 'bottomleft',
      });
    });

    cy.get('.leaflet-pm-toolbar')
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
      .closest('.button-container')
      .should('have.class', 'active');

    cy.toolbarButton('marker')
      .click()
      .closest('.button-container')
      .should('have.class', 'active');

    cy.toolbarButton('edit')
      .closest('.button-container')
      .should('have.not.class', 'active');

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
      .closest('.button-container')
      .should('have.class', 'active');

    cy.toolbarButton('edit')
      .closest('.button-container')
      .should('have.not.class', 'active');
    cy.toolbarButton('polyline')
      .closest('.button-container')
      .should('have.not.class', 'active');
    cy.toolbarButton('delete')
      .closest('.button-container')
      .should('have.not.class', 'active');
    cy.toolbarButton('rectangle')
      .closest('.button-container')
      .should('have.not.class', 'active');
  });

  it('Reacts to programmatic state change', () => {
    cy.window().then(({ map }) => {
      map.pm.enableGlobalEditMode();
    });

    cy.toolbarButton('edit')
      .closest('.button-container')
      .should('have.class', 'active');

    cy.window().then(({ map }) => {
      map.pm.toggleGlobalRemovalMode();
    });

    cy.toolbarButton('edit')
      .closest('.button-container')
      .should('have.not.class', 'active');
    cy.toolbarButton('delete')
      .closest('.button-container')
      .should('have.class', 'active');

    cy.window().then(({ map }) => {
      map.pm.toggleGlobalRemovalMode();
      map.pm.toggleGlobalRemovalMode();
      map.pm.toggleGlobalRemovalMode();
    });

    cy.toolbarButton('delete')
      .closest('.button-container')
      .should('have.not.class', 'active');

    cy.window().then(({ map }) => {
      map.pm.toggleGlobalEditMode();
      map.pm.toggleGlobalRemovalMode();

      map.pm.enableDraw('Marker');
    });

    cy.toolbarButton('delete')
      .closest('.button-container')
      .should('have.not.class', 'active');

    cy.toolbarButton('edit')
      .closest('.button-container')
      .should('have.not.class', 'active');

    cy.toolbarButton('marker')
      .closest('.button-container')
      .should('have.class', 'active');

    cy.toolbarButton('marker').click();
  });

  it('Has Working translation for circle marker toolbar button', () => {
    cy.window().then(({ map }) => {
      map.pm.setLang('es');
    });

    cy.get('.leaflet-buttons-control-button .leaflet-pm-icon-circle-marker')
      .should('have.attr', 'title')
      .and('include', 'Dibujar Marcador de Circulo');
  });

  it('has functioning actions', () => {
    cy.toolbarButton('polygon').click();

    cy.get('.button-container.active .action-cancel').should('exist');

    cy.get('.button-container.active .action-cancel').click();

    cy.get('.button-container.active .action-cancel').should('not.exist');

    cy.toolbarButton('polygon').click();

    cy.get(mapSelector)
      .click(250, 250)
      .click(270, 80)
      .click(300, 80)
      .click(280, 280)
      .click(200, 285);

    cy.hasVertexMarkers(6);

    cy.get('.button-container.active .action-finish').click();

    cy.hasVertexMarkers(0);

    cy.toolbarButton('edit').click();

    cy.hasVertexMarkers(5);

    cy.get('.button-container.active .action-finishMode').click();

    cy.hasVertexMarkers(0);
  });

  it('Custom Controls - new button', () => {
    cy.get('.leaflet-pm-toolbar')
      .parent('.leaflet-top.leaflet-left')
      .should('exist');

    cy.window().then(({ map, L }) => {
      let testresult = '';

      // Click button -> toggle disabled
      map.pm.Toolbar.createCustomControl({
        name: 'clickButton',
        block: 'custom',
        className: 'leaflet-pm-icon-marker',
        title: 'Count layers',
        onClick: () => {
          testresult = 'clickButton clicked';
        },
        toggle: false,
      });
      cy.toolbarButtonContainer('clickButton', map).then((container) => {
        cy.get(container[0].children[0].children[0])
          .should('have.attr', 'title')
          .and('include', 'Count layers');
        container[0].children[0].click(); // button
        expect(testresult).to.equal('clickButton clicked');
        cy.get(container).should('not.have.class', 'active');
      });
    });
  });

  it('Custom Controls - new draw instance', () => {
    cy.get('.leaflet-pm-toolbar')
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
        className: 'leaflet-pm-icon-polygon',
        title: 'Display text on hover button',
        actions,
      });
      map.pm.Draw.PolygonCopy.setPathOptions({ color: 'red' });

      cy.toolbarButtonContainer('PolygonCopy', map).then((container) => {
        cy.get(container[0].children[0].children[0])
          .should('have.attr', 'title')
          .and('include', 'Display text on hover button');
        cy.get(container[0].children[0]).click(); // button
        cy.get(container).should('have.class', 'active');
        const actions = container[0].children[1].children;
        const actioncount = actions.length;
        expect(actioncount).to.equal(3);

        cy.get(actions[2])
          .click()
          .then(() => {
            expect(testresult).to.equal('click');
            expect(actions[1].innerHTML).to.equal('Custom text, no click');
          });

        cy.get(actions[0]).click();
        cy.get(container).should('not.have.class', 'active');
        cy.window().then(() => {
          map.pm.enableDraw('PolygonCopy');
          map.on('pm:create', (e) => {
            expect(e.shape).to.equal('PolygonCopy');
            e.layer.on('click', (l) => (testlayer = l.target));
          });
        });
        cy.get(container).should('have.class', 'active');
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

  it('Custom Controls - Custom order', () => {
    cy.window().then(({ map }) => {
      map.pm.Toolbar.changeControlOrder(['Rectangle']);
      cy.get('.leaflet-pm-toolbar.leaflet-pm-draw').then((container) => {
        cy.get(container[0].children[0]).then((e) => {
          cy.get(e[0].children[0].children[0]).should(
            'have.class',
            'leaflet-pm-icon-rectangle'
          );
        });
      });
    });
  });

  it('Custom Controls - One Block', () => {
    cy.window().then(({ map }) => {
      map.pm.addControls({
        oneBlock: true,
      });
      cy.get('.leaflet-pm-toolbar.leaflet-pm-topleft').then((container) => {
        expect(container[0].children.length).to.equal(11);
      });
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
      cy.get('.leaflet-pm-toolbar.leaflet-pm-edit')
        .parent('.leaflet-top.leaflet-left')
        .should('exist');
      cy.get('.leaflet-pm-toolbar.leaflet-pm-draw')
        .parent('.leaflet-top.leaflet-right')
        .should('exist');
    });
  });

  it('Different block positions - One Block', () => {
    cy.window().then(({ map }) => {
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
        className: 'leaflet-pm-icon-polygon',
        title: 'Display text on hover button',
      });
      cy.get('.leaflet-pm-toolbar.leaflet-pm-topright').then((container) => {
        expect(container[0].children.length).to.equal(6);
      });
      cy.get('.leaflet-pm-toolbar.leaflet-pm-topleft').then((container) => {
        expect(container[0].children.length).to.equal(6);
      });
    });
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

    cy.get('.button-container.active .action-cancel').click();

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
    });
  });
});
