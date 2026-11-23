import * as esbuild from 'esbuild';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';

const plugins: esbuild.Plugin[] = [
  {
    name: 'my-plugin',
    setup(build) {
      let count = 0;
      build.onEnd(({ errors, warnings }) => {
        count++;
        const message =
          errors.length === 0 && warnings.length === 0
            ? 'Build completed.'
            : `Build completed with ${errors.length} error(s) and ${warnings.length} warning(s).`;
        console.log(`[BUILD #${count.toString().padStart(3, '0')}]:`, message);
      });
    },
  },
];

// The ES module: imports Leaflet from 'leaflet', for bundlers and import maps
const buildOptions: esbuild.BuildOptions = {
  bundle: true,
  // Both entries share their modules through a chunk, so an app or Pro that
  // imports the main entry and ./unstable gets one copy of Geoman.
  entryPoints: {
    'leaflet-geoman': './src/js/index.ts',
    'leaflet-geoman-unstable': './src/js/unstable.ts',
  },
  splitting: true,
  chunkNames: 'chunks/[name]-[hash]',
  format: 'esm',
  external: ['leaflet'],
  loader: {
    '.js': 'jsx',
    '.css': 'css',
    '.svg': 'dataurl',
  },
  outdir: './dist',
  sourcemap: true,
  // Left for the app's bundler, which sets it for development or production
  define: { 'process.env.NODE_ENV': 'process.env.NODE_ENV' },
};

// Resolves 'leaflet' to the global `L` of Leaflet's leaflet-global.js
const leafletGlobal: esbuild.Plugin = {
  name: 'leaflet-global',
  setup(build) {
    build.onResolve({ filter: /^leaflet$/ }, () => ({
      path: 'leaflet',
      namespace: 'leaflet-global',
    }));
    build.onLoad({ filter: /.*/, namespace: 'leaflet-global' }, () => ({
      contents: 'module.exports = globalThis.L;',
      loader: 'js',
    }));
  },
};

// The script build: adds Leaflet-Geoman to the global `L`
const globalOptions: esbuild.BuildOptions = {
  ...buildOptions,
  entryPoints: ['./src/js/global.ts'],
  splitting: false,
  chunkNames: undefined,
  format: 'iife',
  external: [],
  outdir: undefined,
  outfile: './dist/leaflet-geoman-global.js',
  // esbuild's default: development for the .js, production for the .min.js
  define: {},
};

// Keep demo script URLs and classic-script globals unchanged. Their sources
// are checked as isolated modules, but these browser scripts retain their
// original global/classic execution model.
const demoOptions: esbuild.BuildOptions = {
  entryPoints: [
    'demo/customcontrols.ts',
    'demo/demo-canvas.ts',
    'demo/demo.ts',
    'demo/devpanel/DevPanel.ts',
    'demo/devpanel/modules/EventLogger.ts',
    'demo/devpanel/modules/GeoJSONTools.ts',
    'demo/devpanel/modules/LayerInspector.ts',
    'demo/devpanel/modules/StateInspector.ts',
    'demo/events.ts',
    'demo/index.ts',
    'test-page.ts',
  ],
  outdir: '.',
  outbase: '.',
  sourcemap: true,
  tsconfigRaw: {
    compilerOptions: { target: 'ESNext' },
  },
};

if (process.env.DEV) {
  // Watch in dev mode (non-minified for easier debugging)
  const ctx = await esbuild.context({
    ...buildOptions,
    minify: false,
    plugins,
  });
  const globalCtx = await esbuild.context({
    ...globalOptions,
    plugins: [leafletGlobal],
  });
  await globalCtx.watch();
  const demoCtx = await esbuild.context(demoOptions);
  await demoCtx.watch();
  await ctx.watch();
  console.log('watching...');
  const { hosts, port } = await ctx.serve({
    port: 5500,
    servedir: '.',
    fallback: './index.html',
  });
  console.log(`Serving app at http://${hosts[0] || 'localhost'}:${port}/demo`);
} else {
  // Clean /dist folder
  fs.rmSync('./dist', { recursive: true, force: true });

  // Build the non-minified bundle (leaflet-geoman.js + leaflet-geoman.css)
  await esbuild.build({ ...buildOptions, minify: false, plugins });

  // Build the minified bundle (leaflet-geoman.min.js)
  await esbuild.build({
    ...buildOptions,
    minify: true,
    entryNames: '[name].min',
    chunkNames: 'chunks/[name]-[hash].min',
    plugins,
  });

  // Build the script build and its minified version
  await esbuild.build({ ...globalOptions, plugins: [leafletGlobal] });
  await esbuild.build({
    ...globalOptions,
    minify: true,
    outfile: './dist/leaflet-geoman-global.min.js',
    plugins: [leafletGlobal],
  });

  // The other builds also emit the CSS; ship only leaflet-geoman.css
  for (const name of [
    'leaflet-geoman.min',
    'leaflet-geoman-unstable',
    'leaflet-geoman-unstable.min',
    'leaflet-geoman-global',
    'leaflet-geoman-global.min',
  ]) {
    fs.rmSync(`./dist/${name}.css`, { force: true });
    fs.rmSync(`./dist/${name}.css.map`, { force: true });
  }

  // Replace incorrect closing tag in <\/style>
  const data = fs.readFileSync('./dist/leaflet-geoman.css', 'utf8');
  const result = data.replace(/<\\\/style>/g, '</style>');
  fs.writeFileSync('./dist/leaflet-geoman.css', result, 'utf8');

  await esbuild.build(demoOptions);

  // Copy types
  fs.copyFileSync('leaflet-geoman.d.ts', './dist/leaflet-geoman.d.ts');

  // Generate the types of ./unstable from the source
  execFileSync('tsc', ['-p', 'tsconfig.unstable.json'], { stdio: 'inherit' });
  // Node's ESM resolution, which TypeScript applies to consumers using
  // NodeNext, needs the file extension in relative imports
  for (const file of fs.readdirSync('./dist/types', { recursive: true })) {
    const path = `./dist/types/${file}`;
    if (!path.endsWith('.d.ts')) continue;
    const source = fs.readFileSync(path, 'utf8');
    const dir = path.slice(0, path.lastIndexOf('/'));
    const resolved = source.replace(
      /((?:from|import)\s*\(?\s*['"])(\.{1,2}\/[^'"]*)(['"])/g,
      (match, start: string, specifier: string, end: string) =>
        fs.existsSync(`${dir}/${specifier}.d.ts`)
          ? `${start}${specifier}.js${end}`
          : fs.existsSync(`${dir}/${specifier}/index.d.ts`)
            ? `${start}${specifier}/index.js${end}`
            : match
    );
    fs.writeFileSync(path, resolved);
  }
}
