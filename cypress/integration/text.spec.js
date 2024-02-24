describe('Text Layer', () => {
  const mapSelector = '#map';

  it('Add Text Layer manual', () => {
    cy.window().then(({ map, L }) => {
      const textLayer = L.marker(map.getCenter(), {
        textMarker: true,
        text: 'Text Layer',
      }).addTo(map);
      expect(textLayer.pm.getShape()).to.eq('Text');
      textLayer.remove();
    });

    cy.window().then(({ map, L }) => {
      const textLayer = L.marker(map.getCenter(), {
        textMarker: false,
        text: 'Text Layer',
      }).addTo(map);
      expect(textLayer.pm.getShape()).to.eq('Marker');
      textLayer.remove();
    });

    cy.window().then(({ map, L }) => {
      const textLayer = L.marker(map.getCenter(), {
        textMarker: true,
      }).addTo(map);
      expect(textLayer.pm.getShape()).to.eq('Text');
      expect(textLayer.pm.getText()).to.eq('');
      textLayer.remove();
    });
  });

  it('Add Text Layer over OptIn', () => {
    cy.window().then(({ map, L }) => {
      L.PM.setOptIn(true);

      const textLayer = L.marker(map.getCenter(), {
        textMarker: true,
        text: 'Text Layer',
      }).addTo(map);

      expect(map.pm.getGeomanLayers().length).to.eq(0);

      textLayer.options.pmIgnore = false;
      L.PM.reInitLayer(textLayer);

      expect(map.pm.getGeomanLayers().length).to.eq(1);
    });

    cy.toolbarButton('edit').click();
    cy.get(mapSelector).click(570, 250);

    cy.window().then(({ map }) => {
      const layer = map.pm.getGeomanLayers()[0];
      expect(layer.pm.hasFocus()).to.be.eq(true);
    });
  });

  describe('Drawing', () => {
    it('place text layer and write text', () => {
      cy.toolbarButton('text')
        .click()
        .closest('.button-container')
        .should('have.class', 'active');

      cy.get(mapSelector).should('have.class', 'geoman-draw-cursor');

      cy.get(mapSelector).click(90, 250);

      cy.get(mapSelector).should('not.have.class', 'geoman-draw-cursor');

      let textArea;
      cy.window().then(({ map }) => {
        expect(1).to.eq(map.pm.getGeomanDrawLayers().length);
        const textLayer = map.pm.getGeomanDrawLayers()[0];
        textArea = textLayer.pm.getElement();
        cy.get(textArea).type('Hello World');
      });

      cy.window().then(() => {
        expect(textArea.value).to.eq('Hello World');
      });

      cy.get(mapSelector).click(190, 250);

      cy.window().then(() => {
        expect(textArea.readOnly).to.eq(true);
        expect(textArea.classList.contains('pm-disabled')).to.eq(true);
      });
    });

    it('place text layer and remove it because it is empty', () => {
      cy.toolbarButton('text')
        .click()
        .closest('.button-container')
        .should('have.class', 'active');

      cy.get(mapSelector).click(90, 250);

      let textArea;
      cy.window().then(({ map }) => {
        expect(1).to.eq(map.pm.getGeomanDrawLayers().length);
        const textLayer = map.pm.getGeomanDrawLayers()[0];
        textArea = textLayer.pm.getElement();
        expect(textArea.value).to.eq('');
      });

      cy.wait(500);
      cy.get(mapSelector).click(190, 250);
      cy.wait(500);

      cy.window().then(({ map }) => {
        expect(0).to.eq(map.pm.getGeomanDrawLayers().length);
      });
    });

    it('continue drawing', () => {
      cy.window().then(({ map }) => {
        map.pm.setGlobalOptions({ continueDrawing: true });
      });

      cy.toolbarButton('text')
        .click()
        .closest('.button-container')
        .should('have.class', 'active');

      cy.get(mapSelector).click(90, 250);

      let textArea;
      cy.window().then(({ map }) => {
        expect(1).to.eq(map.pm.getGeomanDrawLayers().length);
        const textLayer = map.pm.getGeomanDrawLayers()[0];
        textArea = textLayer.pm.getElement();
        cy.get(textArea).type('Hello World');
      });

      cy.window().then(() => {
        expect(textArea.value).to.eq('Hello World');
      });

      cy.get(mapSelector).click(290, 250);

      cy.window().then(({ map }) => {
        expect(textArea.readOnly).to.eq(true);
        expect(textArea.classList.contains('pm-disabled')).to.eq(true);
        expect(2).to.eq(map.pm.getGeomanDrawLayers().length);
        const textLayer = map.pm.getGeomanDrawLayers()[1];
        textArea = textLayer.pm.getElement();
        cy.get(textArea).type('Geoman!');
      });

      cy.get(mapSelector).click(290, 150);

      cy.window().then(() => {
        expect(textArea.value).to.eq('Geoman!');
        expect(textArea.readOnly).to.eq(true);
        expect(textArea.classList.contains('pm-disabled')).to.eq(true);
      });
    });

    it("uses enableDraw('Text')", () => {
      cy.window().then(({ map }) => {
        map.pm.enableDraw('Text');
      });

      cy.toolbarButton('text')
        .closest('.button-container')
        .should('have.class', 'active');

      cy.get(mapSelector).click(90, 250);

      let textArea;
      cy.window().then(({ map }) => {
        expect(1).to.eq(map.pm.getGeomanDrawLayers().length);
        const textLayer = map.pm.getGeomanDrawLayers()[0];
        textArea = textLayer.pm.getElement();
        cy.get(textArea).type('Hello World');
      });

      cy.window().then(() => {
        expect(textArea.value).to.eq('Hello World');
      });

      cy.get(mapSelector).click(190, 250);

      cy.window().then(() => {
        expect(textArea.readOnly).to.eq(true);
        expect(textArea.classList.contains('pm-disabled')).to.eq(true);
      });
    });

    it('resizes the textbox while typing', () => {
      cy.toolbarButton('text')
        .click()
        .closest('.button-container')
        .should('have.class', 'active');

      cy.get(mapSelector).click(90, 250);

      let textArea;
      cy.window().then(({ map }) => {
        expect(1).to.eq(map.pm.getGeomanDrawLayers().length);
        const textLayer = map.pm.getGeomanDrawLayers()[0];
        textArea = textLayer.pm.getElement();
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

    describe('Options', () => {
      it('adds predefined `text`', () => {
        cy.window().then(({ map }) => {
          map.pm.enableDraw('Text', {
            textOptions: { text: 'This is nice. ' },
          });
        });

        cy.toolbarButton('text')
          .closest('.button-container')
          .should('have.class', 'active');

        cy.get(mapSelector).click(90, 250);

        let textArea;
        cy.window().then(({ map }) => {
          expect(1).to.eq(map.pm.getGeomanDrawLayers().length);
          const textLayer = map.pm.getGeomanDrawLayers()[0];
          textArea = textLayer.pm.getElement();
          cy.get(textArea).type('Hello World');
        });

        cy.window().then(() => {
          expect(textArea.value).to.eq('This is nice. Hello World');
        });

        cy.get(mapSelector).click(90, 280);
      });

      it('`focusAfterDraw: false`', () => {
        cy.window().then(({ map }) => {
          map.pm.enableDraw('Text', {
            textOptions: { focusAfterDraw: false },
          });
        });

        cy.toolbarButton('text')
          .closest('.button-container')
          .should('have.class', 'active');

        cy.get(mapSelector).click(90, 250);

        let textArea;
        cy.window().then(({ map }) => {
          expect(1).to.eq(map.pm.getGeomanDrawLayers().length);
          const textLayer = map.pm.getGeomanDrawLayers()[0];
          textArea = textLayer.pm.getElement();
          expect(textArea.readOnly).to.eq(true);
          expect(textArea.classList.contains('pm-disabled')).to.eq(true);
        });

        cy.get(mapSelector).click(90, 280);
      });
      it('`removeIfEmpty: false`', () => {
        cy.window().then(({ map }) => {
          map.pm.enableDraw('Text', {
            textOptions: { focusAfterDraw: false },
          });
        });

        cy.toolbarButton('text')
          .closest('.button-container')
          .should('have.class', 'active');

        cy.get(mapSelector).click(90, 250);

        let textArea;
        cy.window().then(({ map }) => {
          expect(1).to.eq(map.pm.getGeomanDrawLayers().length);
          const textLayer = map.pm.getGeomanDrawLayers()[0];
          textArea = textLayer.pm.getElement();
          expect(textArea.value).to.eq('');
        });

        cy.get(mapSelector).click(190, 250);

        cy.window().then(({ map }) => {
          expect(1).to.eq(map.pm.getGeomanDrawLayers().length);
        });
      });
      it('adds css class with `className`', () => {
        cy.window().then(({ map }) => {
          map.pm.enableDraw('Text', {
            textOptions: { className: 'test1 test2' },
          });
        });

        cy.toolbarButton('text')
          .closest('.button-container')
          .should('have.class', 'active');

        cy.get(mapSelector).click(90, 250);

        let textArea;
        cy.window().then(({ map }) => {
          expect(1).to.eq(map.pm.getGeomanDrawLayers().length);
          const textLayer = map.pm.getGeomanDrawLayers()[0];
          textArea = textLayer.pm.getElement();
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
        textLayer = L.marker(map.getCenter(), {
          textMarker: true,
          text: 'Text Layer',
        }).addTo(map);
        textArea = textLayer.pm.getElement();
        textLayer.pm.enable();
        textLayer.pm.focus();
      });

      cy.window().then(() => {
        expect(textArea.readOnly).to.eq(false);
        expect(textArea.classList.contains('pm-disabled')).to.eq(false);
        cy.get(textArea).type('. Hello World');
      });

      cy.window().then(() => {
        expect(textArea.value).to.eq('Text Layer. Hello World');
      });

      cy.get(mapSelector).click(90, 280);

      cy.window().then(() => {
        textLayer.pm.disable();
        expect(textArea.readOnly).to.eq(true);
        expect(textArea.classList.contains('pm-disabled')).to.eq(true);
      });
    });
    it('blur()', () => {
      let textLayer;
      let textArea;
      cy.window().then(({ map, L }) => {
        textLayer = L.marker(map.getCenter(), {
          textMarker: true,
          text: 'Text Layer',
        }).addTo(map);
        textArea = textLayer.pm.getElement();
        textLayer.pm.enable();
        textLayer.pm.focus();
      });

      cy.window().then(() => {
        expect(textArea.readOnly).to.eq(false);
        expect(textArea.classList.contains('pm-disabled')).to.eq(false);
        textLayer.pm.blur();
        expect(textLayer.pm.hasFocus()).to.eq(false);

        textLayer.pm.disable();
        expect(textArea.readOnly).to.eq(true);
        expect(textArea.classList.contains('pm-disabled')).to.eq(true);
      });
    });
    it('hasFocus', () => {
      let textLayer;
      let textArea;
      cy.window().then(({ map, L }) => {
        textLayer = L.marker(map.getCenter(), {
          textMarker: true,
          text: 'Text Layer',
        }).addTo(map);
        textArea = textLayer.pm.getElement();
        textLayer.pm.enable();
        textLayer.pm.focus();
      });

      cy.window().then(() => {
        expect(textArea.readOnly).to.eq(false);
        expect(textArea.classList.contains('pm-disabled')).to.eq(false);
        expect(textLayer.pm.hasFocus()).to.eq(true);
        textLayer.pm.blur();
        expect(textLayer.pm.hasFocus()).to.eq(false);

        textLayer.pm.disable();
        expect(textArea.readOnly).to.eq(true);
        expect(textArea.classList.contains('pm-disabled')).to.eq(true);
      });
    });
    it('getElement', () => {
      cy.window().then(({ map, L }) => {
        const textLayer = L.marker(map.getCenter(), {
          textMarker: true,
          text: 'Text Layer',
        }).addTo(map);
        const textArea = textLayer.pm.getElement();
        expect(textArea.tagName).to.eq('TEXTAREA');
      });
    });
    it('setText', () => {
      cy.window().then(({ map, L }) => {
        const textLayer = L.marker(map.getCenter(), {
          textMarker: true,
          text: 'Text Layer',
        }).addTo(map);
        const textArea = textLayer.pm.getElement();
        expect(textArea.value).to.eq('Text Layer');
        textLayer.pm.setText('Other text');
        expect(textArea.value).to.eq('Other text');
      });
    });
    it('getText', () => {
      cy.window().then(({ map, L }) => {
        const textLayer = L.marker(map.getCenter(), {
          textMarker: true,
          text: 'Text Layer',
        }).addTo(map);
        expect(textLayer.pm.getText()).to.eq('Text Layer');
      });
    });
    it('unselect text on disable', () => {
      cy.window().then(({ map, L }) => {
        const textLayer = L.marker(map.getCenter(), {
          textMarker: true,
          text: 'Text Layer',
        }).addTo(map);
        expect(textLayer.pm.getText()).to.eq('Text Layer');

        const textarea = textLayer.pm.getElement();
        textLayer.pm.enable();
        textarea.focus();
        textarea.setSelectionRange(2, 5);
        expect(textarea.selectionStart).to.eq(2);
        expect(textarea.selectionEnd).to.eq(5);

        textLayer.pm.disable();
        expect(textarea.selectionStart).to.eq(0);
        expect(textarea.selectionEnd).to.eq(0);
      });
    });

    it('enable map dragging after blur', () => {
      cy.window().then(({ map, L }) => {
        const textLayer = L.marker(map.getCenter(), {
          textMarker: true,
          text: 'Text Layer',
        }).addTo(map);

        expect(map.dragging.enabled()).to.eq(true);

        const textarea = textLayer.pm.getElement();
        textLayer.pm.enable();
        textarea.focus();

        expect(map.dragging.enabled()).to.eq(false);

        textLayer.pm.disable();

        expect(map.dragging.enabled()).to.eq(true);
      });
    });
  });
  describe('Events', () => {
    it("fire event 'pm:textchange'", () => {
      let textLayer;
      let event = '';
      cy.window().then(({ map, L }) => {
        textLayer = L.marker(map.getCenter(), {
          textMarker: true,
          text: '',
        }).addTo(map);
        textLayer.pm.enable();
        textLayer.pm.focus();

        textLayer.on('pm:textchange', (e) => {
          event = e.type;
        });

        cy.get(textLayer.pm.getElement()).type('Hello World');
      });

      cy.window().then(() => {
        expect(textLayer.pm.getText()).to.eq('Hello World');
        expect(event).to.eq('pm:textchange');
      });
    });

    it("fire event 'pm:edit'", () => {
      let textLayer;
      let event = '';
      cy.window().then(({ map, L }) => {
        textLayer = L.marker(map.getCenter(), {
          textMarker: true,
          text: '',
        }).addTo(map);
        textLayer.pm.enable();
        textLayer.pm.focus();

        textLayer.on('pm:edit', (e) => {
          event = e.type;
        });

        cy.get(textLayer.pm.getElement()).type('Hello World');
      });

      cy.window().then(() => {
        textLayer.pm.blur();
        expect(textLayer.pm.getText()).to.eq('Hello World');
        expect(event).to.eq('pm:edit');
      });
    });

    it("fire event 'pm:update'", () => {
      let textLayer;
      let event = '';
      cy.window().then(({ map, L }) => {
        textLayer = L.marker(map.getCenter(), {
          textMarker: true,
          text: '',
        }).addTo(map);
        textLayer.pm.enable();
        textLayer.pm.focus();

        textLayer.on('pm:update', (e) => {
          event = e.type;
        });

        cy.get(textLayer.pm.getElement()).type('Hello World');
      });

      cy.window().then(() => {
        textLayer.pm.disable();
        expect(textLayer.pm.getText()).to.eq('Hello World');
        expect(event).to.eq('pm:update');
      });
    });

    it("fire event 'pm:textfocus'", () => {
      let textLayer;
      let event = '';
      cy.window().then(({ map, L }) => {
        textLayer = L.marker(map.getCenter(), {
          textMarker: true,
          text: '',
        }).addTo(map);
        textLayer.pm.enable();

        textLayer.on('pm:textfocus', (e) => {
          event = e.type;
        });
        textLayer.pm.focus();
      });

      cy.window().then(() => {
        expect(event).to.eq('pm:textfocus');
      });
    });

    it("fire event 'pm:textblur'", () => {
      let textLayer;
      let event = '';
      cy.window().then(({ map, L }) => {
        textLayer = L.marker(map.getCenter(), {
          textMarker: true,
          text: '',
        }).addTo(map);
        textLayer.pm.enable();

        textLayer.on('pm:textblur', (e) => {
          event = e.type;
        });
        textLayer.pm.focus();
        textLayer.pm.blur();
      });

      cy.window().then(() => {
        expect(event).to.eq('pm:textblur');
      });
    });

    it("fire event 'pm:textblur' only once", () => {
      let textLayer;
      let event = '';
      let count = 0;
      cy.window().then(({ map, L }) => {
        textLayer = L.marker(map.getCenter(), {
          textMarker: true,
          text: '',
        }).addTo(map);
        textLayer.pm.enable();

        count = 0;
        textLayer.on('pm:textblur', (e) => {
          count += 1;
          event = e.type;
        });
        textLayer.pm.focus();
        textLayer.pm.blur();
        textLayer.pm.blur();
      });

      cy.window().then(() => {
        expect(event).to.eq('pm:textblur');
        expect(count).to.eq(1);
      });
    });
  });
});
