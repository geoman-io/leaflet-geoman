/* Leaflet-Geoman: draw and edit geometry layers in Leaflet 2
 * OSS Repo: https://github.com/geoman-io/leaflet-geoman
 * Get Pro: https://geoman.io
 */
import { PM } from './PM';

// Each module adds its class to PM.Draw or PM.Edit
import './Draw/L.PM.Draw.Marker';
import './Draw/L.PM.Draw.Line';
import './Draw/L.PM.Draw.Polygon';
import './Draw/L.PM.Draw.Rectangle';
import './Draw/L.PM.Draw.CircleMarker';
import './Draw/L.PM.Draw.Circle';
import './Draw/L.PM.Draw.Cut';
import './Draw/L.PM.Draw.Text';
import './Edit/L.PM.Edit.LayerGroup';
import './Edit/L.PM.Edit.Marker';
import './Edit/L.PM.Edit.Line';
import './Edit/L.PM.Edit.Polygon';
import './Edit/L.PM.Edit.Rectangle';
import './Edit/L.PM.Edit.CircleMarker';
import './Edit/L.PM.Edit.Circle';
import './Edit/L.PM.Edit.ImageOverlay';
import './Edit/L.PM.Edit.Text';

import '../css/layers.css';
import '../css/controls.css';

// Adds `pm` to maps and layers created from now on
PM.initialize();

export { PM };
export { default as PMButton } from './Toolbar/L.Controls';
