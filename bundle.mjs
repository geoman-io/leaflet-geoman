import * as esbuild from 'esbuild';
import fs from 'fs';

const plugins = [{
  name: 'my-plugin',
  setup(build) {
    let count = 0;
    build.onEnd(({ errors, warnings }) => {
      count++;
      const message = errors.length === 0 && warnings.length === 0
        ? 'Build completed.'
        : `Build completed with ${errors.length} error(s) and ${warnings.length} warning(s).`;
      console.log(`[BUILD #${count.toString().padStart(3, '0')}]:`, message);
    });
  },
}];

const buildOptions = {
  bundle: true,
  entryPoints: ['./src/js/L.PM.js'],
  loader: {
    '.js': 'jsx',
    '.css': 'css',
    '.svg': 'dataurl'
  },
  outfile: './dist/leaflet-geoman.js',
  sourcemap: true,
}

if (process.env.DEV) {
  // Watch in dev mode (non-minified for easier debugging)
  const ctx = await esbuild.context({ ...buildOptions, minify: false, plugins });
  await ctx.watch();
  console.log('watching...');
  const { host, port } = await ctx.serve({
    port: 5500,
    servedir: '.',
    fallback: "./index.html"
  });
  console.log(`Serving app at http://${host || 'localhost'}:${port}/demo`);
} else {
  // Clean /dist folder
  fs.rmSync("./dist", { recursive: true, force: true });

  // Build the non-minified bundle (leaflet-geoman.js + leaflet-geoman.css)
  await esbuild.build({ ...buildOptions, minify: false, plugins });

  // Build the minified bundle (leaflet-geoman.min.js)
  await esbuild.build({ ...buildOptions, minify: true, outfile: './dist/leaflet-geoman.min.js', plugins });

  // The minified build also emits a duplicate CSS file we don't ship
  fs.rmSync('./dist/leaflet-geoman.min.css', { force: true });
  fs.rmSync('./dist/leaflet-geoman.min.css.map', { force: true });

  // Replace incorrect closing tag in <\/style>
  const data = fs.readFileSync('./dist/leaflet-geoman.css', 'utf8');
  const result = data.replace(/<\\\/style>/g, '</style>');
  fs.writeFileSync('./dist/leaflet-geoman.css', result, 'utf8');

  // Copy types
  fs.copyFileSync('leaflet-geoman.d.ts', './dist/leaflet-geoman.d.ts');
}
