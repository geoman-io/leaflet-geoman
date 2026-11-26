// DrawCut#unstable_cutTarget: the line or polygon Cut works on for a layer.
type Win = Cypress.AUTWindow;

const ll = (win: Win, x: number, y: number) =>
  win.map.containerPointToLatLng([x, y]);

function setup(win: Win) {
  const { map, L: Lf } = win;
  const polygon = new Lf.Polygon([
    ll(win, 100, 100),
    ll(win, 200, 100),
    ll(win, 200, 200),
    ll(win, 100, 200),
  ]).addTo(map);
  const circle = new Lf.Circle(ll(win, 350, 150), {
    radius: 1,
    color: '#00ff00',
  }).addTo(map);
  // radius in metres for 50 px
  circle.setRadius(map.distance(ll(win, 350, 150), ll(win, 400, 150)));
  const cuts: { layer: L.Layer; originalLayer: L.Layer }[] = [];
  map.on('pm:cut', (e: any) => cuts.push(e));
  return { polygon, circle, cuts };
}

// a cutting rectangle across both layers' lower halves
function drawCut() {
  cy.window().then(({ map }) => map.pm.enableDraw('Cut'));
  cy.get('#map')
    .click(50, 150)
    .click(450, 150)
    .click(450, 250)
    .click(50, 250)
    .click(50, 150);
}

describe('DrawCut#unstable_cutTarget', () => {
  it('cuts lines and polygons only by default', () => {
    let state: ReturnType<typeof setup>;
    cy.window().then((w) => {
      state = setup(w as Win);
    });
    drawCut();
    cy.window().then(({ map }) => {
      expect(state.cuts.map((c) => c.originalLayer)).to.deep.eq([
        state.polygon,
      ]);
      expect(map.hasLayer(state.circle)).to.eq(true);
      expect(map.hasLayer(state.polygon)).to.eq(false);
    });
  });

  it('cuts the polygon an override returns and replaces the original', () => {
    let state: ReturnType<typeof setup>;
    cy.window().then((w) => {
      const win = w as Win;
      state = setup(win);
      const tool = win.map.pm.Draw.Cut as any;
      // a circle is cut as a polygon; the square is left out
      tool.unstable_cutTarget = (layer: L.Layer) => {
        if (layer instanceof win.L.Circle) {
          return (win.L as any).PM.Utils.circleToPolygon(layer, 64);
        }
        return null;
      };
    });
    drawCut();
    cy.window().then(({ map }) => {
      const [cut] = state.cuts;
      expect(state.cuts).to.have.length(1);
      // the event names the original circle and the result replaces it
      expect(cut.originalLayer).to.eq(state.circle);
      expect(map.hasLayer(state.circle)).to.eq(false);
      expect(map.hasLayer(state.polygon)).to.eq(true);
      const result = cut.layer as L.Polygon;
      expect(map.hasLayer(result)).to.eq(true);
      // the circle's options carry over
      expect(result.options.color).to.eq('#00ff00');
      // the upper half remains, below the cut line at y = 150
      const ys = (result.getLatLngs() as L.LatLng[][])[0].map((l) =>
        Math.round(map.latLngToContainerPoint(l).y)
      );
      expect(Math.max(...ys)).to.be.at.most(150);
      expect(Math.min(...ys)).to.be.at.most(101);
    });
  });
});
