import * as esbuild from 'esbuild';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

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
  entryPoints: ['./src/js/index.ts'],
  format: 'esm',
  external: ['leaflet'],
  loader: {
    '.js': 'jsx',
    '.css': 'css',
    '.svg': 'dataurl',
  },
  outfile: './dist/leaflet-geoman.js',
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
  format: 'iife',
  external: [],
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
    outfile: './dist/leaflet-geoman.min.js',
    plugins,
  });

  // ./unstable for @geoman-io packages, which bundle and minify it themselves.
  // It contains all of the main entry, so they import it instead of `.`.
  await esbuild.build({
    ...buildOptions,
    entryPoints: ['./src/js/unstable.ts'],
    outfile: './dist/leaflet-geoman-unstable.js',
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
  // (execSync, so Windows finds tsc.cmd)
  execSync('tsc -p tsconfig.unstable.json', { stdio: 'inherit' });
  // Node's ESM resolution, which TypeScript applies to consumers using
  // NodeNext, needs the file extension in relative imports
  for (const entry of fs.readdirSync('./dist/types', {
    recursive: true,
    encoding: 'utf8',
  })) {
    const file = path.join('./dist/types', entry);
    if (!file.endsWith('.d.ts')) continue;
    // Stylesheet imports are for the bundler; in types they fail under
    // noUncheckedSideEffectImports
    const source = fs
      .readFileSync(file, 'utf8')
      .replace(/^import ['"][^'"]+\.css['"];\r?\n/gm, '');
    const dir = path.dirname(file);
    const resolved = source.replace(
      /((?:from|import|declare module)\s*\(?\s*['"])(\.{1,2}\/[^'"]*)(['"])/g,
      (match, start: string, specifier: string, end: string) => {
        if (fs.existsSync(path.join(dir, `${specifier}.d.ts`))) {
          return `${start}${specifier}.js${end}`;
        }
        if (fs.existsSync(path.join(dir, specifier, 'index.d.ts'))) {
          return `${start}${specifier}/index.js${end}`;
        }
        // Files such as L.PM.Edit have dots in their names, so test for the
        // extensions an import can carry
        if (/\.(js|json|css)$/.test(specifier)) return match;
        // Left as it is, it would type its imports as any
        throw new Error(`${file}: cannot resolve '${specifier}'`);
      }
    );
    fs.writeFileSync(file, resolved);
  }
}
