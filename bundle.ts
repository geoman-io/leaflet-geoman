const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs');

// Define the entry point
const entryPoint = './src/js/L.PM.js';

// Define the output directory
const outdir = path.resolve(__dirname, 'dist');
fs.mkdirSync(outdir, { recursive: true });

// Define an async function to handle the build
async function build() {
  try {
    await esbuild.build({
      entryPoints: [entryPoint],
      bundle: true,
      minify: true,
      sourcemap: false,
      outdir,
      loader: {
        '.js': 'jsx',
        '.css': 'css',
        '.svg': 'dataurl',
      },
    });

    // Copy the leaflet-geoman.d.ts file
    fs.copyFileSync('leaflet-geoman.d.ts', path.join(outdir, 'leaflet-geoman.d.ts'));
    fs.renameSync(path.join(outdir, 'L.PM.js'), path.join(outdir, 'leaflet-geoman.min.js'));
    fs.renameSync(path.join(outdir, 'L.PM.css'), path.join(outdir, 'leaflet-geoman.css'));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

// Call the build function
build();