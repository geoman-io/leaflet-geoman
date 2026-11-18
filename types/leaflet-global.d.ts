// The test page and the demos load Leaflet's script build
// (leaflet-global.js) and Geoman's (leaflet-geoman-global.js),
// which set the global `L`, including `L.PM` and `L.Control.PMButton`.
export * from 'leaflet';
export { PM } from '../src/js/PM';
export as namespace L;

declare module 'leaflet' {
  namespace Control {
    const PMButton: typeof import('../src/js/Toolbar/L.Controls').default;
  }
}
