describe('Text Layer', () => {
  const mapSelector = '#map';

  it('Add Text Layer manual', () => {
    cy.window().then(({ map, L }) => {
      const textLayer = new L.Marker(map.getCenter(), {
        textMarker: true,
        text: 'Text Layer',
      }).addTo(map);
      expect(textLayer.geoman.getShape()).to.eq('Text');
      textLayer.remove();
    });

    cy.window().then(({ map, L }) => {
      const textLayer = new L.Marker(map.getCenter(), {
        textMarker: false,
        text: 'Text Layer',
      }).addTo(map);
      expect(textLayer.geoman.getShape()).to.eq('Marker');
      textLayer.remove();
    });

    cy.window().then(({ map, L }) => {
      const textLayer = new L.Marker(map.getCenter(), {
        textMarker: true,
      }).addTo(map);
      expect(textLayer.geoman.getShape()).to.eq('Text');
      expect(textLayer.geoman.getText()).to.eq('');
      textLayer.remove();
    });
  });

  it('Add Text Layer over OptIn', () => {
    cy.window().then(({ map, L, Geoman }) => {
      Geoman.setOptIn(true);

      const textLayer = new L.Marker(map.getCenter(), {
        textMarker: true,
        text: 'Text Layer',
      }).addTo(map);

      expect(map.geoman.getGeomanLayers().length).to.eq(0);

      textLayer.options.geomanIgnore = false;
      Geoman.reInitLayer(textLayer);

      expect(map.geoman.getGeomanLayers().length).to.eq(1);
    });

    cy.toolbarButton('edit').click();
    cy.get(mapSelector).click(570, 250);

    cy.window().then(({ map }) => {
      const layer = map.geoman.getGeomanLayers()[0];
      expect(layer.geoman.hasFocus()).to.be.eq(true);
    });
  });

  describe('Drawing', () => {
    it('place text layer and write text', () => {
      cy.toolbarButton('text')
        .click()
        .closest('.leaflet-geoman-button-container')
        .should('have.class', 'leaflet-geoman-active');

      cy.get(mapSelector).should('have.class', 'leaflet-geoman-draw-cursor');

      cy.get(mapSelector).click(90, 250);

      cy.get(mapSelector).should(
        'not.have.class',
        'leaflet-geoman-draw-cursor'
      );

      let textArea;
      cy.window().then(({ map }) => {
        expect(1).to.eq(map.geoman.getGeomanDrawLayers().length);
        const textLayer = map.geoman.getGeomanDrawLayers()[0];
        textArea = textLayer.geoman.getElement();
        cy.get(textArea).type('Hello World');
      });

      cy.window().then(() => {
        expect(textArea.value).to.eq('Hello World');
      });

      cy.get(mapSelector).click(230, 250);

      cy.window().then(() => {
        expect(textArea.readOnly).to.eq(true);
        expect(textArea.classList.contains('leaflet-geoman-disabled')).to.eq(
          true
        );
      });
    });

    it('place text layer and remove it because it is empty', () => {
      cy.toolbarButton('text')
        .click()
        .closest('.leaflet-geoman-button-container')
        .should('have.class', 'leaflet-geoman-active');

      cy.get(mapSelector).click(90, 250);

      let textArea;
      cy.window().then(({ map }) => {
        expect(1).to.eq(map.geoman.getGeomanDrawLayers().length);
        const textLayer = map.geoman.getGeomanDrawLayers()[0];
        textArea = textLayer.geoman.getElement();
        expect(textArea.value).to.eq('');
      });

      cy.wait(500);
      cy.get(mapSelector).click(190, 250);
      cy.wait(500);

      cy.window().then(({ map }) => {
        expect(0).to.eq(map.geoman.getGeomanDrawLayers().length);
      });
    });

    it('place text layer and remove it with click on control', () => {
      cy.toolbarButton('text')
        .click()
        .closest('.leaflet-geoman-button-container')
        .should('have.class', 'leaflet-geoman-active');

      cy.get(mapSelector).click(90, 250);

      let textArea;
      cy.window().then(({ map }) => {
        expect(1).to.eq(map.geoman.getGeomanDrawLayers().length);
        const textLayer = map.geoman.getGeomanDrawLayers()[0];
        textArea = textLayer.geoman.getElement();
        expect(textArea.value).to.eq('');
      });

      cy.wait(500);
      cy.get(mapSelector).click(20, 20);
      cy.wait(500);

      cy.window().then(({ map }) => {
        expect(0).to.eq(map.geoman.getGeomanDrawLayers().length);
      });
    });

    it('continue drawing', () => {
      cy.window().then(({ map }) => {
        map.geoman.setGlobalOptions({ continueDrawing: true });
      });

      cy.toolbarButton('text')
        .click()
        .closest('.leaflet-geoman-button-container')
        .should('have.class', 'leaflet-geoman-active');

      cy.get(mapSelector).click(90, 250);

      let textArea;
      cy.window().then(({ map }) => {
        expect(1).to.eq(map.geoman.getGeomanDrawLayers().length);
        const textLayer = map.geoman.getGeomanDrawLayers()[0];
        textArea = textLayer.geoman.getElement();
        cy.get(textArea).type('Hello World');
      });

      cy.window().then(() => {
        expect(textArea.value).to.eq('Hello World');
      });

      cy.get(mapSelector).click(290, 250);

      cy.window().then(({ map }) => {
        expect(textArea.readOnly).to.eq(true);
        expect(textArea.classList.contains('leaflet-geoman-disabled')).to.eq(
          true
        );
        expect(2).to.eq(map.geoman.getGeomanDrawLayers().length);
        const textLayer = map.geoman.getGeomanDrawLayers()[1];
        textArea = textLayer.geoman.getElement();
        cy.get(textArea).type('Geoman!');

        const textMap = map.geoman.Draw.Text._hintMarker._map;
        expect(textMap).to.eq(null);
      });

      cy.get(mapSelector).trigger('pointermove', 200, 150, { which: 1 });

      cy.window().then(({ map }) => {
        const textMap = map.geoman.Draw.Text._hintMarker._map;
        expect(textMap).to.eq(map);
        const latlng = map.geoman.Draw.Text._hintMarker.getLatLng();
        const pxLatLng = map.containerPointToLatLng([200, 150]);
        expect(pxLatLng).to.deep.equal(latlng);
      });

      cy.get(mapSelector).click(290, 150);

      cy.window().then(() => {
        expect(textArea.value).to.eq('Geoman!');
        expect(textArea.readOnly).to.eq(true);
        expect(textArea.classList.contains('leaflet-geoman-disabled')).to.eq(
          true
        );
      });
    });

    it("uses enableDraw('Text')", () => {
      cy.window().then(({ map }) => {
        map.geoman.enableDraw('Text');
      });

      cy.toolbarButton('text')
        .closest('.leaflet-geoman-button-container')
        .should('have.class', 'leaflet-geoman-active');

      cy.get(mapSelector).click(90, 250);

      let textArea;
      cy.window().then(({ map }) => {
        expect(1).to.eq(map.geoman.getGeomanDrawLayers().length);
        const textLayer = map.geoman.getGeomanDrawLayers()[0];
        textArea = textLayer.geoman.getElement();
        cy.get(textArea).type('Hello World');
      });

      cy.window().then(() => {
        expect(textArea.value).to.eq('Hello World');
      });

      cy.get(mapSelector).click(230, 250);

      cy.window().then(() => {
        expect(textArea.readOnly).to.eq(true);
        expect(textArea.classList.contains('leaflet-geoman-disabled')).to.eq(
          true
        );
      });
    });

    it('resizes the textbox while typing', () => {
      cy.toolbarButton('text')
        .click()
        .closest('.leaflet-geoman-button-container')
        .should('have.class', 'leaflet-geoman-active');

      cy.get(mapSelector).click(90, 250);

      let textArea;
      cy.window().then(({ map }) => {
        expect(1).to.eq(map.geoman.getGeomanDrawLayers().length);
        const textLayer = map.geoman.getGeomanDrawLayers()[0];
        textArea = textLayer.geoman.getElement();
        expect(textArea.style.width).to.eq('16px');
        cy.get(textArea).type('Hello World');
      });

      cy.window().then(() => {
        expect(textArea.value).to.eq('Hello World');
        expect(textArea.style.height).to.eq('21px');
        // exact width can't be checked because if the test is running on Github, it has a different width.
        expect(textArea.style.width !== '1px').to.eq(true);
      });
    });

    it('allows to edit the Text multiple times', () => {
      cy.toolbarButton('text')
        .click()
        .closest('.leaflet-geoman-button-container')
        .should('have.class', 'leaflet-geoman-active');

      cy.get(mapSelector).click(90, 250);

      let textArea;
      cy.window().then(({ map }) => {
        expect(1).to.eq(map.geoman.getGeomanDrawLayers().length);
        const textLayer = map.geoman.getGeomanDrawLayers()[0];
        textArea = textLayer.geoman.getElement();
        expect(textArea.style.width).to.eq('16px');
        cy.get(textArea).type('Hello World');
      });
      cy.get(mapSelector).click(100, 100);

      cy.toolbarButton('edit').click();

      cy.get(mapSelector).click(90, 250);
      cy.window().then(() => {
        expect(textArea.value).to.eq('Hello World');
        cy.get(textArea).type(' - Hello Test');
      });
      cy.get(mapSelector).click(100, 100);
      cy.get(mapSelector).click(90, 250);
      cy.window().then(() => {
        expect(textArea.value).to.eq('Hello World - Hello Test');
        cy.get(textArea).type(' - Bye');
      });
      cy.get(mapSelector).click(100, 100);
      cy.get(mapSelector).click(90, 250);
      cy.window().then(() => {
        expect(textArea.value).to.eq('Hello World - Hello Test - Bye');
      });
    });

    describe('Options', () => {
      it('adds predefined `text`', () => {
        cy.window().then(({ map }) => {
          map.geoman.enableDraw('Text', {
            textOptions: { text: 'This is nice. ' },
          });
        });

        cy.toolbarButton('text')
          .closest('.leaflet-geoman-button-container')
          .should('have.class', 'leaflet-geoman-active');

        cy.get(mapSelector).click(90, 250);

        let textArea;
        cy.window().then(({ map }) => {
          expect(1).to.eq(map.geoman.getGeomanDrawLayers().length);
          const textLayer = map.geoman.getGeomanDrawLayers()[0];
          textArea = textLayer.geoman.getElement();
          cy.get(textArea).type('Hello World');
        });

        cy.window().then(() => {
          expect(textArea.value).to.eq('This is nice. Hello World');
        });

        cy.get(mapSelector).click(90, 280);
      });

      it('`focusAfterDraw: false`', () => {
        cy.window().then(({ map }) => {
          map.geoman.enableDraw('Text', {
            textOptions: { focusAfterDraw: false },
          });
        });

        cy.toolbarButton('text')
          .closest('.leaflet-geoman-button-container')
          .should('have.class', 'leaflet-geoman-active');

        cy.get(mapSelector).click(90, 250);

        let textArea;
        cy.window().then(({ map }) => {
          expect(1).to.eq(map.geoman.getGeomanDrawLayers().length);
          const textLayer = map.geoman.getGeomanDrawLayers()[0];
          textArea = textLayer.geoman.getElement();
          expect(textArea.readOnly).to.eq(true);
          expect(textArea.classList.contains('leaflet-geoman-disabled')).to.eq(
            true
          );
        });

        cy.get(mapSelector).click(90, 280);
      });
      it('`removeIfEmpty: false`', () => {
        cy.window().then(({ map }) => {
          map.geoman.enableDraw('Text', {
            textOptions: { focusAfterDraw: false },
          });
        });

        cy.toolbarButton('text')
          .closest('.leaflet-geoman-button-container')
          .should('have.class', 'leaflet-geoman-active');

        cy.get(mapSelector).click(90, 250);

        let textArea;
        cy.window().then(({ map }) => {
          expect(1).to.eq(map.geoman.getGeomanDrawLayers().length);
          const textLayer = map.geoman.getGeomanDrawLayers()[0];
          textArea = textLayer.geoman.getElement();
          expect(textArea.value).to.eq('');
        });

        cy.get(mapSelector).click(190, 250);

        cy.window().then(({ map }) => {
          expect(1).to.eq(map.geoman.getGeomanDrawLayers().length);
        });
      });
      it('adds css class with `className`', () => {
        cy.window().then(({ map }) => {
          map.geoman.enableDraw('Text', {
            textOptions: { className: 'test1 test2' },
          });
        });

        cy.toolbarButton('text')
          .closest('.leaflet-geoman-button-container')
          .should('have.class', 'leaflet-geoman-active');

        cy.get(mapSelector).click(90, 250);

        let textArea;
        cy.window().then(({ map }) => {
          expect(1).to.eq(map.geoman.getGeomanDrawLayers().length);
          const textLayer = map.geoman.getGeomanDrawLayers()[0];
          textArea = textLayer.geoman.getElement();
          expect(textArea.classList.contains('test1')).to.eq(true);
          expect(textArea.classList.contains('test2')).to.eq(true);
        });
      });
    });
  });

  describe('Editing', () => {
    it('foucs()', () => {
      let textLayer;
      let textArea;
      cy.window().then(({ map, L }) => {
        textLayer = new L.Marker(map.getCenter(), {
          textMarker: true,
          text: 'Text Layer',
        }).addTo(map);
        textArea = textLayer.geoman.getElement();
        textLayer.geoman.enable();
        textLayer.geoman.focus();
      });

      cy.window().then(() => {
        expect(textArea.readOnly).to.eq(false);
        expect(textArea.classList.contains('leaflet-geoman-disabled')).to.eq(
          false
        );
        cy.get(textArea).type('. Hello World');
      });

      cy.window().then(() => {
        expect(textArea.value).to.eq('Text Layer. Hello World');
      });

      cy.get(mapSelector).click(90, 280);

      cy.window().then(() => {
        textLayer.geoman.disable();
        expect(textArea.readOnly).to.eq(true);
        expect(textArea.classList.contains('leaflet-geoman-disabled')).to.eq(
          true
        );
      });
    });
    it('blur()', () => {
      let textLayer;
      let textArea;
      cy.window().then(({ map, L }) => {
        textLayer = new L.Marker(map.getCenter(), {
          textMarker: true,
          text: 'Text Layer',
        }).addTo(map);
        textArea = textLayer.geoman.getElement();
        textLayer.geoman.enable();
        textLayer.geoman.focus();
      });

      cy.window().then(() => {
        expect(textArea.readOnly).to.eq(false);
        expect(textArea.classList.contains('leaflet-geoman-disabled')).to.eq(
          false
        );
        textLayer.geoman.blur();
        expect(textLayer.geoman.hasFocus()).to.eq(false);

        textLayer.geoman.disable();
        expect(textArea.readOnly).to.eq(true);
        expect(textArea.classList.contains('leaflet-geoman-disabled')).to.eq(
          true
        );
      });
    });
    it('hasFocus', () => {
      let textLayer;
      let textArea;
      cy.window().then(({ map, L }) => {
        textLayer = new L.Marker(map.getCenter(), {
          textMarker: true,
          text: 'Text Layer',
        }).addTo(map);
        textArea = textLayer.geoman.getElement();
        textLayer.geoman.enable();
        textLayer.geoman.focus();
      });

      cy.window().then(() => {
        expect(textArea.readOnly).to.eq(false);
        expect(textArea.classList.contains('leaflet-geoman-disabled')).to.eq(
          false
        );
        expect(textLayer.geoman.hasFocus()).to.eq(true);
        textLayer.geoman.blur();
        expect(textLayer.geoman.hasFocus()).to.eq(false);

        textLayer.geoman.disable();
        expect(textArea.readOnly).to.eq(true);
        expect(textArea.classList.contains('leaflet-geoman-disabled')).to.eq(
          true
        );
      });
    });
    it('getElement', () => {
      cy.window().then(({ map, L }) => {
        const textLayer = new L.Marker(map.getCenter(), {
          textMarker: true,
          text: 'Text Layer',
        }).addTo(map);
        const textArea = textLayer.geoman.getElement();
        expect(textArea.tagName).to.eq('TEXTAREA');
      });
    });
    it('setText', () => {
      cy.window().then(({ map, L }) => {
        const textLayer = new L.Marker(map.getCenter(), {
          textMarker: true,
          text: 'Text Layer',
        }).addTo(map);
        const textArea = textLayer.geoman.getElement();
        expect(textArea.value).to.eq('Text Layer');
        textLayer.geoman.setText('Other text');
        expect(textArea.value).to.eq('Other text');
      });
    });
    it('getText', () => {
      cy.window().then(({ map, L }) => {
        const textLayer = new L.Marker(map.getCenter(), {
          textMarker: true,
          text: 'Text Layer',
        }).addTo(map);
        expect(textLayer.geoman.getText()).to.eq('Text Layer');
      });
    });
    it('unselect text on disable', () => {
      cy.window().then(({ map, L }) => {
        const textLayer = new L.Marker(map.getCenter(), {
          textMarker: true,
          text: 'Text Layer',
        }).addTo(map);
        expect(textLayer.geoman.getText()).to.eq('Text Layer');

        const textarea = textLayer.geoman.getElement();
        textLayer.geoman.enable();
        textarea.focus();
        textarea.setSelectionRange(2, 5);
        expect(textarea.selectionStart).to.eq(2);
        expect(textarea.selectionEnd).to.eq(5);

        textLayer.geoman.disable();
        expect(textarea.selectionStart).to.eq(0);
        expect(textarea.selectionEnd).to.eq(0);
      });
    });

    it('enable map dragging after blur', () => {
      cy.window().then(({ map, L }) => {
        const textLayer = new L.Marker(map.getCenter(), {
          textMarker: true,
          text: 'Text Layer',
        }).addTo(map);

        expect(map.dragging.enabled()).to.eq(true);

        const textarea = textLayer.geoman.getElement();
        textLayer.geoman.enable();
        textarea.focus();

        expect(map.dragging.enabled()).to.eq(false);

        textLayer.geoman.disable();

        expect(map.dragging.enabled()).to.eq(true);
      });
    });
  });
  describe('Events', () => {
    it("fire event 'geoman:textchange'", () => {
      let textLayer;
      let event = '';
      cy.window().then(({ map, L }) => {
        textLayer = new L.Marker(map.getCenter(), {
          textMarker: true,
          text: '',
        }).addTo(map);
        textLayer.geoman.enable();
        textLayer.geoman.focus();

        textLayer.on('geoman:textchange', (e) => {
          event = e.type;
        });

        cy.get(textLayer.geoman.getElement()).type('Hello World');
      });

      cy.window().then(() => {
        expect(textLayer.geoman.getText()).to.eq('Hello World');
        expect(event).to.eq('geoman:textchange');
      });
    });

    it("fire event 'geoman:edit'", () => {
      let textLayer;
      let event = '';
      cy.window().then(({ map, L }) => {
        textLayer = new L.Marker(map.getCenter(), {
          textMarker: true,
          text: '',
        }).addTo(map);
        textLayer.geoman.enable();
        textLayer.geoman.focus();

        textLayer.on('geoman:edit', (e) => {
          event = e.type;
        });

        cy.get(textLayer.geoman.getElement()).type('Hello World');
      });

      cy.window().then(() => {
        textLayer.geoman.blur();
        expect(textLayer.geoman.getText()).to.eq('Hello World');
        expect(event).to.eq('geoman:edit');
      });
    });

    it("fire event 'geoman:update'", () => {
      let textLayer;
      let event = '';
      cy.window().then(({ map, L }) => {
        textLayer = new L.Marker(map.getCenter(), {
          textMarker: true,
          text: '',
        }).addTo(map);
        textLayer.geoman.enable();
        textLayer.geoman.focus();

        textLayer.on('geoman:update', (e) => {
          event = e.type;
        });

        cy.get(textLayer.geoman.getElement()).type('Hello World');
      });

      cy.window().then(() => {
        textLayer.geoman.disable();
        expect(textLayer.geoman.getText()).to.eq('Hello World');
        expect(event).to.eq('geoman:update');
      });
    });

    it("fire event 'geoman:textfocus'", () => {
      let textLayer;
      let event = '';
      cy.window().then(({ map, L }) => {
        textLayer = new L.Marker(map.getCenter(), {
          textMarker: true,
          text: '',
        }).addTo(map);
        textLayer.geoman.enable();

        textLayer.on('geoman:textfocus', (e) => {
          event = e.type;
        });
        textLayer.geoman.focus();
      });

      cy.window().then(() => {
        expect(event).to.eq('geoman:textfocus');
      });
    });

    it("fire event 'geoman:textblur'", () => {
      let textLayer;
      let event = '';
      cy.window().then(({ map, L }) => {
        textLayer = new L.Marker(map.getCenter(), {
          textMarker: true,
          text: '',
        }).addTo(map);
        textLayer.geoman.enable();

        textLayer.on('geoman:textblur', (e) => {
          event = e.type;
        });
        textLayer.geoman.focus();
        textLayer.geoman.blur();
      });

      cy.window().then(() => {
        expect(event).to.eq('geoman:textblur');
      });
    });

    it("fire event 'geoman:textblur' only once", () => {
      let textLayer;
      let event = '';
      let count = 0;
      cy.window().then(({ map, L }) => {
        textLayer = new L.Marker(map.getCenter(), {
          textMarker: true,
          text: '',
        }).addTo(map);
        textLayer.geoman.enable();

        count = 0;
        textLayer.on('geoman:textblur', (e) => {
          count += 1;
          event = e.type;
        });
        textLayer.geoman.focus();
        textLayer.geoman.blur();
        textLayer.geoman.blur();
      });

      cy.window().then(() => {
        expect(event).to.eq('geoman:textblur');
        expect(count).to.eq(1);
      });
    });
  });
});
