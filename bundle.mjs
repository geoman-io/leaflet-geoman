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
        console.log(`[BUILD #${count.toString().padStart(3, '0')}]:`, message);    });
  },
}];

const buildOptions = {
  bundle: true,
  entryPoints: ['./src/js/L.PM.js'],
  loader: {
    '.js': 'jsx',
    '.css': 'css',
    '.svg': 'dataurl' },
  minify: true,
  outfile: './dist/leaflet-geoman.js',
  sourcemap: true,
}

const ctx = await esbuild.context({ ...buildOptions, plugins });

if (process.env.DEV) {
  // Watch in dev mode
  await ctx.watch();
  console.log('watching...');
    const { host, port } = await ctx.serve({
      port: 5500,
      servedir: '.',
      fallback: "./index.html"
    });
  console.log(`Serving app at http://${host}:${port}/demo`);
} else {
  // Clean /dist folder
  fs.rmSync("./dist", { recursive: true, force: true });

  // Build
  await ctx.rebuild();
  
  // Dispose context
  ctx.dispose();

  // Replace incorrect closing tag in <\/style>
  const data = fs.readFileSync('./dist/leaflet-geoman.css', 'utf8');
  const result = data.replace(/<\\\/style>/g, '</style>');
  fs.writeFileSync('./dist/leaflet-geoman.css', result, 'utf8');

  // Copy types
  fs.copyFileSync('leaflet-geoman.d.ts', './dist/leaflet-geoman.d.ts');
  fs.copyFileSync('./dist/leaflet-geoman.js', './dist/leaflet-geoman.min.js');
}
