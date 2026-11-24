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
  type UnstableChange,
  type UnstableValidator,
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

Toolbar.unstable_addButtonDefiner((toolbar: Toolbar, add) =>
  add('probe', new PMButton({ name: 'probe', position: 'topleft' }))
);
Toolbar.unstable_addButtonFilter(
  (name: string, _button, options, toolbar: Toolbar) =>
    name !== 'probe' || (!!options.drawMarker && toolbar.isVisible)
);
Toolbar.unstable_addToggleResolver((name: string, toolbar: Toolbar) =>
  name === 'subMode' && toolbar.isVisible ? 'probe' : undefined
);
const validator: UnstableValidator = (change: UnstableChange) =>
  change.action !== 'drag' || change.delta.lat < 1;
map.pm.unstable_validators.push(validator);
const handlers = new EditRectangle(
  new L.Rectangle([
    [0, 0],
    [1, 1],
  ])
).unstable_cornerDragHandlers();
const drag: L.LeafletEventHandlerFn = handlers.drag;
const disableMode: () => void = map.pm.unstable_registerMode('probe', {
  enabled: () => false,
  disable() {},
  button: 'probe',
});

export {
  drag,
  disableMode,
  PM,
  enabled,
  shape,
  wrong,
  Incomplete,
  hint,
  corners,
};
