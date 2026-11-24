/* Leaflet-Geoman's unstable entry, `@geoman-io/leaflet-geoman-free/unstable`.
 *
 * For @geoman-io packages such as Leaflet-Geoman Pro, which bundle an exact
 * version of this package. It has no semver guarantee: its exports can change
 * in any release. It contains all of the main entry, including `PM` and its
 * setup, so import it instead of the main entry, never both: each would load
 * its own copy of Geoman.
 */
export { PM, PMButton } from './index';
// The Leaflet and Geoman internals that the classes' types use
import '../types/leaflet-internals';

export { Map } from './L.PM.Map';
export type { UnstableChange, UnstableValidator } from './L.PM.Map';
export { Toolbar } from './Toolbar/L.PM.Toolbar';

export { Draw } from './Draw/L.PM.Draw';
export { DrawTool } from './Draw/L.PM.DrawTool';
export { DrawMarker } from './Draw/L.PM.Draw.Marker';
export { DrawLine } from './Draw/L.PM.Draw.Line';
export { DrawPolygon } from './Draw/L.PM.Draw.Polygon';
export { DrawRectangle } from './Draw/L.PM.Draw.Rectangle';
export { DrawCircleMarker } from './Draw/L.PM.Draw.CircleMarker';
export { DrawCircle } from './Draw/L.PM.Draw.Circle';
export { DrawCut } from './Draw/L.PM.Draw.Cut';
export { DrawText } from './Draw/L.PM.Draw.Text';

export { Edit } from './Edit/L.PM.Edit';
export { EditLayerGroup } from './Edit/L.PM.Edit.LayerGroup';
export { EditMarker } from './Edit/L.PM.Edit.Marker';
export { EditLine } from './Edit/L.PM.Edit.Line';
export { EditPolygon } from './Edit/L.PM.Edit.Polygon';
export { EditRectangle } from './Edit/L.PM.Edit.Rectangle';
export { EditCircleMarker } from './Edit/L.PM.Edit.CircleMarker';
export { EditCircle } from './Edit/L.PM.Edit.Circle';
export { EditImageOverlay } from './Edit/L.PM.Edit.ImageOverlay';
export { EditText } from './Edit/L.PM.Edit.Text';

// How Geoman's classes take mixins and default options
export { applyMixins, defineOptions } from './helpers/classes';
export type { MixinMembers } from './helpers/classes';

// Geometry helpers that extensions would otherwise copy
export {
  addTranslations,
  copyLatLngs,
  destinationOnLine,
  registerButtonName,
} from './helpers';
export { default as Utils } from './L.PM.Utils';
