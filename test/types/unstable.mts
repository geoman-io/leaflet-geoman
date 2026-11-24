import * as L from 'leaflet';
import {
  PM,
  PMButton,
  DrawTool,
  DrawPolygon,
  EditLine,
  EditRectangle,
  Toolbar,
  addTranslations,
  applyMixins,
  registerButtonName,
} from '@geoman-io/leaflet-geoman-free/unstable';

const enabled: boolean = new L.Map('other').pm.globalDrawModeEnabled();

class Star extends DrawPolygon {
  probe(): string {
    return this.getShape() ?? '';
  }
}
const map = new L.Map('map');
const star = new Star(map);
const shape: string | undefined = star.getShape();

class Custom extends DrawTool {
  enable() {}
  disable() {}
  enabled() {
    return false;
  }
  toggle() {}
}
applyMixins(Custom, { extra() {} });

// @ts-expect-error a tool must implement toggle()
class Incomplete extends DrawTool {
  enable() {}
  disable() {}
  enabled() {
    return false;
  }
}

// @ts-expect-error the type is resolved, not any
const wrong: number = new EditLine(new L.Polyline([])).getShape();

new PMButton({ name: 'custom', position: 'topleft' });

addTranslations('xx', { buttonTitles: { drawMarkerButton: 'Pin' } });
registerButtonName('Star', 'drawStar');
const hint: L.Marker | L.CircleMarker | null = star.unstable_hintMarker();
star.unstable_fireModeToggled();
const corners: L.LatLng[] = new EditRectangle(
  new L.Rectangle([
    [0, 0],
    [1, 1],
  ])
).unstable_corners(map);
// map.pm is typed by the public PM.PMMap; ./unstable consumers use Toolbar
(map.pm.Toolbar as unknown as Toolbar).createCustomControl({
  name: 'drawStar',
  unstable_jsClass: 'Star',
});

export { PM, enabled, shape, wrong, Incomplete, hint, corners };
