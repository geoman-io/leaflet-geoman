import * as L from 'leaflet';
import { PM } from '../PM';
import DrawTool from './L.PM.DrawTool';
import type DrawMarker from './L.PM.Draw.Marker';
import type DrawCircleMarker from './L.PM.Draw.CircleMarker';
import type DrawLine from './L.PM.Draw.Line';
import type DrawPolygon from './L.PM.Draw.Polygon';
import type DrawRectangle from './L.PM.Draw.Rectangle';
import type DrawCircle from './L.PM.Draw.Circle';
import type DrawCut from './L.PM.Draw.Cut';
import type DrawText from './L.PM.Draw.Text';
import { checkOptions } from '../helpers/options';

import type { DrawOptions } from '../../types/options';
export type { DrawOptions } from '../../types/options';

/**
 * Shape mapping type
 */
type ShapeMapping = Record<string, string>;

// The registry's tools by shape name. Custom tools are added under their own
// names, so they can't be declared as fields.
const tools = (draw: Draw) => draw as unknown as Record<string, DrawTool>;
// The tool classes by name, read from `PM.Draw` when a tool is created.
const toolClasses = () =>
  PM.Draw as unknown as Record<string, new (map: L.Map) => DrawTool>;

/**
 * A map's registry of draw tools, `map.pm.Draw`. It creates one instance of
 * each tool class and keeps one of them active at a time. The tools extend
 * `DrawTool`, not this class.
 */
class Draw {
  declare _map: L.Map;
  declare shapes: string[];
  declare Marker: DrawMarker;
  declare CircleMarker: DrawCircleMarker;
  declare Line: DrawLine;
  declare Polygon: DrawPolygon;
  declare Rectangle: DrawRectangle;
  declare Circle: DrawCircle;
  declare Cut: DrawCut;
  declare Text: DrawText;

  // The tool classes, registered by their modules.
  declare static Marker: typeof DrawMarker;
  declare static CircleMarker: typeof DrawCircleMarker;
  declare static Line: typeof DrawLine;
  declare static Polygon: typeof DrawPolygon;
  declare static Rectangle: typeof DrawRectangle;
  declare static Circle: typeof DrawCircle;
  declare static Cut: typeof DrawCut;
  declare static Text: typeof DrawText;

  constructor(map: L.Map) {
    this._map = map;

    // Leaflet's DefaultIcon puts tooltips at [16, -28], above the icon and off
    // the cursor; Geoman's draw hints sit under the marker instead. The
    // default markerStyle is one object, shared by the tools of every map.
    DrawTool.prototype.options.markerStyle!.icon = new L.DefaultIcon({
      tooltipAnchor: [0, 0],
    });

    // define all possible shapes that can be drawn
    this.shapes = [
      'Marker',
      'CircleMarker',
      'Line',
      'Polygon',
      'Rectangle',
      'Circle',
      'Cut',
      'Text',
    ];

    // initiate drawing class for our shapes
    this.shapes.forEach((shape) => {
      tools(this)[shape] = new (toolClasses()[shape])(this._map);
    });

    // TODO: Remove this with the next major release
    this.Marker.setOptions({ continueDrawing: true });
    this.CircleMarker.setOptions({ continueDrawing: true });
  }
  getShapes() {
    // if somebody wants to know what shapes are available
    return this.shapes;
  }
  enable(shape: string, options?: DrawOptions) {
    if (!shape) {
      throw new Error(
        `Error: Please pass a shape as a parameter. Possible shapes are: ${this.getShapes().join(
          ','
        )}`
      );
    }

    // disable drawing for all shapes
    this.disable();

    // enable draw for a shape
    tools(this)[shape].enable(checkOptions(options, 'enableDraw()'));
  }
  disable(_shape?: string) {
    // there can only be one drawing mode active at a time on a map
    // so it doesn't matter which one should be disabled.
    // just disable all of them
    this.shapes.forEach((shape) => {
      tools(this)[shape].disable();
    });
  }
  addControls() {
    // add control buttons for our shapes
    this.shapes.forEach((shape) => {
      (tools(this)[shape] as DrawTool & { addButton(): void }).addButton();
    });
  }
  getActiveShape() {
    // returns the active shape
    let enabledShape: string | undefined;
    this.shapes.forEach((shape) => {
      if (tools(this)[shape]._enabled) {
        enabledShape = shape;
      }
    });
    return enabledShape;
  }

  createNewDrawInstance(name: string, jsClass: string) {
    const instance = this._getShapeFromBtnName(jsClass);
    if (tools(this)[name]) {
      throw new TypeError('Draw Type already exists');
    }
    if (!toolClasses()[instance]) {
      throw new TypeError(`There is no class PM.Draw.${instance}`);
    }

    const tool = new (toolClasses()[instance])(this._map);
    tools(this)[name] = tool;
    tool.toolbarButtonName = name;
    tool._shape = name;
    this.shapes.push(name);
    this._map.pm._registerDrawMode(name);

    // needed when extended / copied from a custom instance
    if (tools(this)[jsClass]) {
      tool.setOptions(tools(this)[jsClass].options);
    }
    // Re-init the options, so it is not referenced with the default Draw class
    tool.setOptions(tool.options);

    return tool;
  }
  _getShapeFromBtnName(name: string) {
    const shapeMapping: ShapeMapping = {
      drawMarker: 'Marker',
      drawCircle: 'Circle',
      drawPolygon: 'Polygon',
      drawPolyline: 'Line',
      drawRectangle: 'Rectangle',
      drawCircleMarker: 'CircleMarker',
      editMode: 'Edit',
      dragMode: 'Drag',
      cutPolygon: 'Cut',
      removalMode: 'Removal',
      rotateMode: 'Rotate',
      drawText: 'Text',
    };

    if (shapeMapping[name]) {
      return shapeMapping[name];
    }
    return tools(this)[name] ? tools(this)[name]._shape! : name;
  }
}

export default Draw;
