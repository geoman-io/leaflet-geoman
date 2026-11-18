// Entry of the script build: adds Leaflet-Geoman to the global `L` of
// Leaflet's leaflet-global.js, which the build also uses for 'leaflet'.
import { PM, PMButton } from './index';

const { L } = globalThis as unknown as {
  L: { PM?: typeof PM; Control: { PMButton?: typeof PMButton } };
};
// As in Leaflet-Geoman 2.x, a copy loaded earlier keeps its namespace
L.PM ??= PM;
L.Control.PMButton = PMButton;
