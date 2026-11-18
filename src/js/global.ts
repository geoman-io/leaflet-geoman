// Entry of the script build: adds Leaflet-Geoman to the global `L` of
// Leaflet's leaflet-global.js, which the build also uses for 'leaflet'.
import { PM, PMButton } from './index';

const { L } = globalThis as unknown as {
  L: { PM?: typeof PM; Control: { PMButton?: typeof PMButton } };
};
// If the script is loaded twice, the copy loaded last owns the init hooks
// that create `layer.pm`, so `L.PM` must be that copy for setOptIn() & co.
L.PM = PM;
L.Control.PMButton = PMButton;
