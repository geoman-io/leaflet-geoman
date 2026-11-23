/* Leaflet-Geoman's unstable entry, `@geoman-io/leaflet-geoman-free/unstable`.
 *
 * It gives extensions such as Leaflet-Geoman Pro the classes and helpers they
 * build on. Its exports can change in any release, including a patch; pin an
 * exact version to use it. It shares one module instance with the main entry,
 * so importing both does not load Geoman twice.
 */
// PM and PMButton stay on the main entry, whose hand-written types describe
// them; loading it here sets up Geoman when only this entry is imported.
import './index';
// The Leaflet and Geoman internals that the classes' types use
import '../types/leaflet-internals';

export { Map } from './L.PM.Map';
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
export { copyLatLngs, destinationOnLine } from './helpers';
export { default as Utils } from './L.PM.Utils';
