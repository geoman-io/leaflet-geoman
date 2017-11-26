import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify-es'
import copy from 'rollup-plugin-copy';
import css from 'rollup-plugin-css-only'
import resolve from 'rollup-plugin-node-resolve';


export default {
  input: 'src/js/L.PM.js',
  output: {
    extend: true,
    file: 'dist/leaflet.pm.min.js',
    name: 'pm',
    format: 'cjs'
  },
  plugins: [
    css({ output: 'dist/leaflet.pm.css' }),
    resolve(),
    copy({
        "src/css/icons": "dist/icons",
        verbose: true
    }),
    uglify(),
    babel({
      presets: [['env', {
        modules: false,
        targets: {
          browsers: ['> 2%']
        }
      }]],
      exclude: [
        'node_modules/**',
        '*.json'
      ],
      babelrc: false
    })
  ]
}