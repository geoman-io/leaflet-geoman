<p align="center">  
  <a href="https://www.gofmx.com/">  
    <img width="130" alt="FMX Logo" src="https://www.gofmx.com/wp-content/themes/fmx/assets/images/logos/fmx-logo-white.svg" />  
  </a>  
</p>  
<h1 align="center">  
  FMX Leaflet-Geoman  
</h1>  
<p align="center">  
  <strong>Customized Leaflet Plugin For Creating And Editing Geometry Layers</strong><br>  
  Draw, Edit, Drag, Cut, Rotate, Split, Scale, Measure, Snap and Pin Layers<br>  
  Supports Markers, CircleMarkers, Polylines, Arrow lines, Polygons, Circles, Rectangles, ImageOverlays, LayerGroups, GeoJSON, MultiLineStrings and MultiPolygons  
</p>

<p align="center">
    <img src="https://geoman-static.onrender.com/assets/draw-example.png" alt="Demo" />  
</p>

## Documentation

See the original Leaflet Geoman docs in the [`documentation` folder](documentation/leaflet-geoman.readme.md).

Visit [geoman.io/docs](https://www.geoman.io/docs) for their web documentation.

## Demo

The `demo` directory contains multiple HTML files which highlight different aspects of the library. These can be
run locally once the appropriate JavaScript files are built using `npm run build`. A demo of the unmodified
Geoman library can be found [here](https://www.geoman.io/demo).

### Developing

The `pnpm` tool is required to properly build this project. Installation instructions can be found
[here](https://pnpm.io/installation). There may be issues building the project using a version of Node other than v20.
Different versions of Node can be installed using [`nvm`](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating).

Clone the repository and then install all npm packages:

```
pnpm install
```

Compile and run `dev` watch version:

```
pnpm run start
```

Compile and run `build` version:

```
pnpm run prepare
```

Run cypress test:

```
pnpm run test
```

Open cypress window:

```
pnpm run cypress
```

Open eslint check:

```
pnpm run lint
```

Automatically build on file changes:

```
pnpm run watch
```

\*\*Note - If `watch` is running when the pre-commit script executes there may be errors. It is recommended to stop
the `watch` process when making a git commit.

### Pull Requests

Because ths project is a fork of Leaflet Geoman, when a pull request is created it will default the target branch
to that project, not this one. So be conscious of what the target branch is, or it will create a pull request within
the original Leaflet Geoman project, not our internal one.
