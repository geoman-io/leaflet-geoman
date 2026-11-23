import * as L from 'leaflet';
import {
  PM,
  DrawTool,
  DrawPolygon,
  EditLine,
  applyMixins,
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

export { PM, enabled, shape, wrong, Incomplete };
