// map.pm.unstable_vertexResolvers: move a drawn vertex and insert coordinates
// before it, or append coordinates to a finishing Polygon or Cut.
type Win = Cypress.AUTWindow;
type Resolver = {
  vertex?(c: { shape: string; latlng: L.LatLng }): unknown;
  finish?(c: { shape: string; latlngs: L.LatLng[] }): unknown;
};

const ll = (win: Win, x: number, y: number) =>
  win.map.containerPointToLatLng([x, y]);
const px = (win: Win, latlngs: L.LatLng[]) =>
  latlngs.map((l) => {
    const p = win.map.latLngToContainerPoint(l);
    return [Math.round(p.x), Math.round(p.y)];
  });

describe('unstable_vertexResolvers', () => {
  it('inserts marker-less coordinates before a vertex and removes them with it', () => {
    let win: Win;
    const seen: { action: string; before?: L.LatLng[] }[] = [];
    let veto = false;
    cy.window().then((w) => {
      win = w as Win;
      const resolver: Resolver = {
        // a trace along y = 120 that ends where it was clicked
        vertex: ({ latlng }) => ({
          latlng,
          before: [ll(win, 175, 120), ll(win, 225, 120)],
        }),
      };
      win.map.pm.unstable_vertexResolvers.push(resolver as never);
      win.map.pm.unstable_validators.push((c: any) => {
        seen.push(c);
        return !(veto && c.action === 'draw:vertex');
      });
      win.map.pm.enableDraw('Polygon');
    });
    cy.get('#map').click(150, 150).click(250, 150);
    cy.window().then(() => {
      const tool = win.map.pm.Draw.Polygon as any;
      expect(px(win, tool._layer.getLatLngs())).to.deep.eq([
        [150, 150],
        [175, 120],
        [225, 120],
        [250, 150],
      ]);
      expect(tool._markers).to.have.length(2);
      expect(tool._layer._latlngInfo).to.have.length(2);
      // the validator judged the traced segment, not only its end
      const vertex = seen.filter((c) => c.action === 'draw:vertex')[1];
      expect(px(win, vertex.before!)).to.deep.eq([
        [175, 120],
        [225, 120],
      ]);
      // the first vertex isn't resolved
      expect(seen.filter((c) => c.action === 'draw:vertex')[0].before).to.eq(
        undefined
      );

      tool._removeLastVertex();
      expect(px(win, tool._layer.getLatLngs())).to.deep.eq([[150, 150]]);
      expect(tool._markers).to.have.length(1);
      expect(tool._layer._latlngInfo).to.have.length(1);
      veto = true;
    });
    // a vetoed traced vertex adds nothing
    cy.get('#map').click(250, 150);
    cy.window().then(() => {
      const tool = win.map.pm.Draw.Polygon as any;
      expect(px(win, tool._layer.getLatLngs())).to.deep.eq([[150, 150]]);
      expect(tool._markers).to.have.length(1);
    });
  });

  it('removes the right coordinates when a later vertex reuses a traced LatLng', () => {
    let win: Win;
    let click = 0;
    cy.window().then((w) => {
      win = w as Win;
      // tracing reuses the traced layer's own LatLng objects
      const x = ll(win, 200, 120);
      win.map.pm.unstable_vertexResolvers.push({
        vertex: ({ latlng }: { latlng: L.LatLng }) => {
          click += 1;
          if (click === 2) return { latlng, before: [x] };
          if (click === 3) return { latlng: x };
          return { latlng };
        },
      } as never);
      win.map.pm.enableDraw('Line');
    });
    cy.get('#map')
      .click(150, 150)
      .click(250, 150)
      .click(300, 200)
      .click(350, 150);
    cy.window().then(() => {
      const tool = win.map.pm.Draw.Line as any;
      expect(px(win, tool._layer.getLatLngs())).to.deep.eq([
        [150, 150],
        [200, 120],
        [250, 150],
        [200, 120],
        [350, 150],
      ]);
      tool._removeLastVertex();
      expect(tool._markers).to.have.length(3);
      expect(px(win, tool._layer.getLatLngs())).to.deep.eq([
        [150, 150],
        [200, 120],
        [250, 150],
        [200, 120],
      ]);
    });
  });

  it('compares a traced vertex with the last vertex before the trace', () => {
    let win: Win;
    cy.window().then((w) => {
      win = w as Win;
      // the trace ends on the clicked point, so after the insert the last
      // coordinate equals the vertex; that must not read as a double click
      win.map.pm.unstable_vertexResolvers.push({
        vertex: ({ latlng }: { latlng: L.LatLng }) => ({
          latlng,
          before: [ll(win, 200, 120), latlng],
        }),
      } as never);
      win.map.pm.enableDraw('Line');
    });
    cy.get('#map').click(150, 150).click(250, 150);
    cy.window().then(() => {
      const tool = win.map.pm.Draw.Line as any;
      expect(tool.enabled()).to.eq(true);
      expect(tool._markers).to.have.length(2);
      expect(win.map.pm.getGeomanDrawLayers()).to.have.length(0);
    });
    // clicking the last vertex again still finishes
    cy.get('#map').click(250, 150);
    cy.hasDrawnLayers(1);
  });

  it('moves the first vertex and ignores its before coordinates', () => {
    let win: Win;
    cy.window().then((w) => {
      win = w as Win;
      win.map.pm.unstable_vertexResolvers.push({
        vertex: () => ({
          latlng: ll(win, 160, 160),
          before: [ll(win, 100, 100)],
        }),
      } as never);
      win.map.pm.enableDraw('Polygon');
    });
    cy.get('#map').click(150, 150);
    cy.window().then(() => {
      const tool = win.map.pm.Draw.Polygon as any;
      expect(px(win, tool._layer.getLatLngs())).to.deep.eq([[160, 160]]);
      expect(px(win, [tool._markers[0].getLatLng()])).to.deep.eq([[160, 160]]);
    });
  });

  it('keeps the trace of a click that finishes on the first vertex', () => {
    let win: Win;
    let veto = true;
    let finished: L.LatLng[] = [];
    let trace = false;
    cy.window().then((w) => {
      win = w as Win;
      // traces back round to the first vertex along x = 120
      win.map.pm.unstable_vertexResolvers.push({
        vertex: ({ latlng }: { latlng: L.LatLng }) =>
          trace
            ? { latlng: ll(win, 150, 150), before: [ll(win, 120, 220)] }
            : { latlng },
        finish: () => [ll(win, 130, 180)],
      } as never);
      win.map.pm.unstable_validators.push((c: any) => {
        if (c.action !== 'draw:finish') return true;
        finished = c.layer.getLatLngs()[0];
        return !veto;
      });
      win.map.pm.enableDraw('Polygon');
    });
    cy.get('#map').click(150, 150).click(250, 150).click(250, 250);
    cy.window().then(() => {
      trace = true;
    });
    cy.get('#map').click(200, 260);
    cy.window().then(() => {
      // the vetoed finish saw the trace, then the appended coordinates
      expect(px(win, finished)).to.deep.eq([
        [150, 150],
        [250, 150],
        [250, 250],
        [120, 220],
        [130, 180],
      ]);
      const tool = win.map.pm.Draw.Polygon as any;
      expect(tool.enabled()).to.eq(true);
      expect(px(win, tool._layer.getLatLngs())).to.deep.eq([
        [150, 150],
        [250, 150],
        [250, 250],
      ]);
      expect(tool._markers).to.have.length(3);
      veto = false;
    });
    cy.get('#map').click(200, 260);
    cy.hasDrawnLayers(1);
    cy.window().then(() => {
      const [layer] = win.map.pm.getGeomanDrawLayers() as L.Polygon[];
      expect(px(win, (layer.getLatLngs() as L.LatLng[][])[0])).to.deep.eq([
        [150, 150],
        [250, 150],
        [250, 250],
        [120, 220],
        [130, 180],
      ]);
    });
  });

  it('appends coordinates to a finishing polygon, which draw:finish sees', () => {
    let win: Win;
    let veto = true;
    let finished: L.LatLng[] = [];
    cy.window().then((w) => {
      win = w as Win;
      win.map.pm.unstable_vertexResolvers.push({
        finish: ({ shape }: { shape: string }) =>
          shape === 'Polygon' ? [ll(win, 120, 200)] : undefined,
      } as never);
      win.map.pm.unstable_validators.push((c: any) => {
        if (c.action !== 'draw:finish') return true;
        finished = c.layer.getLatLngs()[0];
        return !veto;
      });
      win.map.pm.enableDraw('Polygon');
    });
    cy.get('#map')
      .click(150, 150)
      .click(250, 150)
      .click(250, 250)
      .click(150, 150);
    cy.window().then(() => {
      // the vetoed finish saw the closed shape and left the drawing as it was
      expect(finished).to.have.length(4);
      const tool = win.map.pm.Draw.Polygon as any;
      expect(tool.enabled()).to.eq(true);
      expect(tool._layer.getLatLngs()).to.have.length(3);
      veto = false;
    });
    cy.get('#map').click(150, 150);
    cy.hasDrawnLayers(1);
    cy.window().then(() => {
      const [layer] = win.map.pm.getGeomanDrawLayers() as L.Polygon[];
      expect(px(win, (layer.getLatLngs() as L.LatLng[][])[0])).to.deep.eq([
        [150, 150],
        [250, 150],
        [250, 250],
        [120, 200],
      ]);
    });
  });

  it('appends coordinates to a finishing cut before the ring check', () => {
    let win: Win;
    let cutWith: L.LatLng[] = [];
    cy.window().then((w) => {
      win = w as Win;
      new win.L.Polygon([
        ll(win, 100, 100),
        ll(win, 400, 100),
        ll(win, 400, 400),
        ll(win, 100, 400),
      ]).addTo(win.map);
      // two drawn points: degenerate alone, a ring with the appended one
      win.map.pm.unstable_vertexResolvers.push({
        finish: ({ shape }: { shape: string }) =>
          shape === 'Cut' ? [ll(win, 200, 300)] : undefined,
      } as never);
      win.map.pm.enableDraw('Cut');
      const tool = win.map.pm.Draw.Cut as any;
      const cut = tool.cut.bind(tool);
      tool.cut = (layer: L.Polygon) => {
        cutWith = (layer.getLatLngs() as L.LatLng[][])[0];
        return cut(layer);
      };
    });
    cy.get('#map').click(150, 150).click(300, 150).click(300, 250);
    cy.window().then(() => {
      (win.map.pm.Draw.Cut as any)._finishShape();
      expect(px(win, cutWith)).to.deep.eq([
        [150, 150],
        [300, 150],
        [300, 250],
        [200, 300],
      ]);
      expect(win.map.pm.Draw.Cut.enabled()).to.eq(false);
    });
  });

  it('changes nothing with no resolver registered', () => {
    let win: Win;
    cy.window().then((w) => {
      win = w as Win;
      expect(win.map.pm.unstable_vertexResolvers).to.deep.eq([]);
      win.map.pm.enableDraw('Polygon');
    });
    cy.get('#map')
      .click(150, 150)
      .click(250, 150)
      .click(250, 250)
      .click(150, 150);
    cy.hasDrawnLayers(1);
    cy.window().then(() => {
      const [layer] = win.map.pm.getGeomanDrawLayers() as L.Polygon[];
      expect((layer.getLatLngs() as L.LatLng[][])[0]).to.have.length(3);
    });
  });
});
