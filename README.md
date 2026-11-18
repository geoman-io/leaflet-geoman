<p align="center">  
  <a href="https://geoman.io">  
    <img width="130" alt="Geoman Logo" src="https://assets.geoman.io/assets/logo_white_bg.svg" />  
  </a>  
</p>  
<h1 align="center">  
  Leaflet-Geoman  
</h1>  
<p align="center">  
  <strong>Leaflet Plugin For Creating And Editing Geometry Layers</strong><br>  
  Draw, Edit, Drag, Cut, Rotate, Split, Scale, Measure, Snap and Pin Layers<br>  
  Supports Markers, CircleMarkers, Polylines, Polygons, Circles, Rectangles, ImageOverlays, LayerGroups, GeoJSON, MultiLineStrings and MultiPolygons  
</p>  
<p align="center">  
  <a href="https://badge.fury.io/js/%40geoman-io%2Fleaflet-geoman-free">  
    <img src="https://badge.fury.io/js/%40geoman-io%2Fleaflet-geoman-free.svg" alt="npm version" height="18">  
  </a>  
  <a href="#">  
    <img src="https://github.com/geoman-io/leaflet-geoman/workflows/Tests/badge.svg" alt="" />  
  </a>
  <a href="https://www.npmjs.com/package/@geoman-io/leaflet-geoman-free">  
    <img src="https://img.shields.io/npm/dt/@geoman-io/leaflet-geoman-free.svg" alt="NPM Downloads" />  
  </a>  
</p>

<p align="center">
    <img src="https://assets.geoman.io/assets/draw-example.png" alt="Demo" />  
</p>

## Documentation

Visit [geoman.io/docs](https://www.geoman.io/docs) to get started.

## Demo

Check out the full power of Leaflet-Geoman Pro on [geoman.io/demo](https://www.geoman.io/demo)

### Leaflet 2

This version of Leaflet-Geoman requires Leaflet 2 (currently `2.0.0-beta.4`).
Leaflet-Geoman 2.x keeps supporting Leaflet 1.

As an ES module, with a bundler or an import map:

```js
import * as L from 'leaflet';
import '@geoman-io/leaflet-geoman-free'; // adds `pm` to maps and layers
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';

const map = new L.Map('map').setView([51.505, -0.09], 13);
map.pm.addControls();
```

The module also exports `PM` (for example `PM.setOptIn(true)`) and the
`PMButton` control.

As a script, after Leaflet's `leaflet-global.js`, which adds `L.PM` and `L.Control.PMButton` to the global `L`:

```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@2.0.0-beta.4/dist/leaflet.css" />
<link rel="stylesheet" href="https://unpkg.com/@geoman-io/leaflet-geoman-free@latest/dist/leaflet-geoman.css" />
<script src="https://unpkg.com/leaflet@2.0.0-beta.4/dist/leaflet-global.js"></script>
<script src="https://unpkg.com/@geoman-io/leaflet-geoman-free@latest/dist/leaflet-geoman-global.js"></script>
```

The TypeScript declarations build on the types that ship with Leaflet 2.
Geoman's events are pointer events like Leaflet 2's, so options such as
`finishOn`, `addVertexOn` and `removeVertexOn` take `pointerdown`,
`pointerover` and `pointerout` instead of `mousedown`, `mouseover` and `mouseout`.

### Feature Requests

I'm adopting the Issue Management of lodash which means, feature requests get the "Feature Request" Label and then get closed.  
You can upvote existing feature requests (or create new ones). Upvotes make me see how much a feature is requested and prioritize their implementation.  
Please see the existing [Feature Requests here](https://github.com/geoman-io/leaflet-geoman/issues?q=is%3Aissue+is%3Aclosed+label%3A%22feature+request%22+sort%3Areactions-%2B1-desc) and upvote if you want them to be implemented.

### Developing

This project uses [mise](https://mise.jdx.dev/) to pin Node.js and pnpm. Clone
the repository, install the declared tools, and then install all packages:

```
mise install
pnpm install
```

Compile and run `dev` watch version:

```
pnpm start
```

Compile and run `build` version:

```
pnpm run prepare
```

Run tests:

```
pnpm test            # E2E tests (Cypress)
pnpm run test:unit   # Unit tests (Vitest)
```

Open cypress window:

```
pnpm run cypress
```

Lint and format (oxlint + oxfmt):

```
pnpm run lint
```

Take a look into [CONTRIBUTING](./CONTRIBUTING.md)

### Credit

A big thanks goes to @Falke-Design, he invests a lot of time and takes good care of Leaflet-Geoman.

Thanks to @ryan-morris for the implementation of Typescript and support with Typescript questions.

As I never built a leaflet plugin before, I looked heavily into the code of leaflet.draw to find out how to do stuff. So don't be surprised to see some familiar code.

I also took a hard look at the great [L.GeometryUtil](https://github.com/makinacorpus/Leaflet.GeometryUtil) for some of my helper functions.

The Rotate Mode are only working because of the great calculation code of [L.Path.Transform](https://github.com/w8r/Leaflet.Path.Transform)
