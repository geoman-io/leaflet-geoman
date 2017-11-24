import babel from 'rollup-plugin-babel'
// import uglify from 'rollup-plugin-uglify'
import css from 'rollup-plugin-css-only'
import resolve from 'rollup-plugin-node-resolve';


export default {
  input: 'src/js/L.PM.js',
  output: {
    extend: true,
    file: 'dist/ru/leaflet.pm.js',
    name: 'pm',
    format: 'cjs'
  },
  plugins: [
    css({ output: 'dist/ru/leaflet.pm.css' }),
    resolve(),
    // uglify(),
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
  ],
  globals: {
    "@turf/kinks": 'kinks'
  }
}