import path from 'node:path';
import ts from 'typescript';
import { beforeAll, describe, expect, it } from 'vitest';

const normalizePath = (filename: string) => filename.replace(/\\/g, '/');

const validCases = {
  inheritedMethods: `
    class Child extends PM.Edit.Marker {
      probe() { return this.enabled(); }
    }
    const editor = new Child(new L.Marker([0, 0]));
    const enabled: boolean = editor.probe();
    editor.enableLayerDrag();
  `,
  subclassedDrawTool: `
    class Triangle extends PM.Draw.Polygon {
      constructor(map: L.Map) {
        super(map);
        this.toolbarButtonName = 'Triangle';
      }
    }
    new Triangle(new L.Map('map')).enable({ snappable: false });
  `,
  customDrawTool: `
    class PointTool extends PM.DrawTool {
      enable(options?: { snappable?: boolean }) {
        this.setOptions(options ?? {});
        this._enabled = true;
        this._fireDrawStart();
      }
      disable() { this._enabled = false; }
      enabled() { return !!this._enabled; }
      toggle() { if (this.enabled()) this.disable(); else this.enable(); }
    }
    const tool = new PointTool(new L.Map('map'));
    tool.enable({ snappable: false });
    const snapDistance: number | undefined = tool.getOptions().snapDistance;
    const registry = new PM.Draw(new L.Map('registry-map'));
    const shapes: string[] = registry.getShapes();
    const active: string | undefined = registry.getActiveShape();
    registry.Line.setPathOptions({ color: 'red' });
  `,
  augmentedFromAnotherModule: `
    declare module '../js/Edit/L.PM.Edit' {
      interface Edit { scaleLayer(factor: number): void; }
    }
    declare module '../js/L.PM.Map' {
      interface Map { enableGlobalScaleMode(): void; }
    }
    declare module '../js/Draw/L.PM.DrawTool' {
      interface DrawTool { showGuides(): void; }
    }
    declare module '../js/Draw/L.PM.Draw' {
      interface Draw { Freehand: InstanceType<typeof PM.Draw.Line>; }
      namespace Draw { let Freehand: typeof PM.Draw.Line; }
    }
    new PM.Edit.Marker(new L.Marker([0, 0])).scaleLayer(2);
    const controller = new PM.Map(new L.Map('map'));
    controller.enableGlobalScaleMode();
    controller.Draw.Freehand.showGuides();
    new PM.Draw.Freehand(new L.Map('other-map')).enable();
  `,
  mapAndEditorMixins: `
    const controller = new PM.Map(new L.Map('map'));
    controller.enableGlobalEditMode({ snapDistance: 20 });
    controller.enableGlobalDragMode();
    controller.enableGlobalRemovalMode();
    controller.enableGlobalRotateMode();
    controller.Draw.Marker.enable({ snappable: false });
    controller.Draw.Polygon.setOptions({ snapDistance: 20 });
    controller.Toolbar.setButtonDisabled('drawMarker', true);
    const editor = new PM.Edit.Rectangle(new L.Rectangle([[0, 0], [1, 1]]));
    editor.rotateLayer(15);
    const dragging: boolean = editor.layerDragEnabled();
    const drawing = new PM.Draw.Polygon(new L.Map('draw-map'));
    drawing.setOptions({ snappable: true });
    drawing.getOptions();
  `,
  sharedAndExtensionOptions: `
    const controller = new PM.Map(new L.Map('map'));
    controller.enableDraw('CustomPolygon', {
      snappable: false, snapDistance: 30, customExtension: { value: true },
      minRadiusCircle: null, textOptions: { text: null },
    });
    controller.setGlobalOptions({
      snapDistance: 15, allowRotation: false, layerGroup: new L.Map('group-map'),
      customExtension: 'supported', minRadiusCircle: null,
    });
    controller.addControls({ positions: { draw: 'topright' } });
    controller.setPathOptions({ weight: 2, color: 'red' });
  `,
};

const invalidCases = {
  incompatibleInheritedMethod: {
    code: 2416,
    source: `class Child extends PM.Edit.Marker {
      enabled(): string { return 'no'; }
    }`,
  },
  invalidDrawOption: {
    code: 2322,
    source: `new PM.Map(new L.Map('map')).enableDraw('Polygon', {
      snappable: 'no',
    });`,
  },
  invalidGlobalOption: {
    code: 2322,
    source: `new PM.Map(new L.Map('map')).setGlobalOptions({
      snapDistance: 'far',
    });`,
  },
  invalidGlobalEditOption: {
    code: 2322,
    source: `new PM.Map(new L.Map('map')).enableGlobalEditMode({
      snapDistance: 'far',
    });`,
  },
  registryMemberOnDrawTool: {
    code: 2339,
    source: `new PM.Map(new L.Map('map')).Draw.Line.getActiveShape();`,
  },
  toolMemberOnDrawRegistry: {
    code: 2339,
    source: `new PM.Draw(new L.Map('map')).setPathOptions({ color: 'red' });`,
  },
  incompleteDrawTool: {
    code: 2515,
    source: `class Half extends PM.DrawTool {
      enable() {}
      disable() {}
      enabled() { return false; }
    }`,
  },
  invalidBaseDrawOption: {
    code: 2322,
    source: `new PM.Draw(new L.Map('map')).enable('Polygon', {
      snappable: 'no',
    });`,
  },
};

describe('internal Leaflet type contracts', () => {
  const diagnostics = new Map<string, ts.Diagnostic[]>();

  beforeAll(() => {
    const root = process.cwd();
    const configPath = path.join(root, 'tsconfig.json');
    const config = ts.readConfigFile(configPath, ts.sys.readFile);
    if (config.error)
      throw new Error(
        ts.flattenDiagnosticMessageText(config.error.messageText, '\n')
      );
    const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, root);
    expect(parsed.errors).toEqual([]);

    const sources = new Map<string, string>();
    for (const [name, source] of Object.entries(validCases)) {
      sources.set(
        normalizePath(path.join(root, 'src/types', `.contract-${name}.ts`)),
        source
      );
    }
    for (const [name, { source }] of Object.entries(invalidCases)) {
      sources.set(
        normalizePath(path.join(root, 'src/types', `.contract-${name}.ts`)),
        source
      );
    }

    const host = ts.createCompilerHost(parsed.options);
    const originalGetSourceFile = host.getSourceFile.bind(host);
    host.getSourceFile = (
      filename,
      languageVersion,
      onError,
      shouldCreateNewSourceFile
    ) => {
      const source = sources.get(normalizePath(filename));
      return source === undefined
        ? originalGetSourceFile(
            filename,
            languageVersion,
            onError,
            shouldCreateNewSourceFile
          )
        : ts.createSourceFile(
            filename,
            `import * as L from 'leaflet';\nimport { PM } from '../js/PM';\n${source}`,
            languageVersion,
            true
          );
    };
    const program = ts.createProgram(
      [...parsed.fileNames, ...sources.keys()],
      parsed.options,
      host
    );
    const unexpected: string[] = [];
    for (const diagnostic of ts.getPreEmitDiagnostics(program)) {
      const filename = diagnostic.file?.fileName;
      const normalizedFilename = filename && normalizePath(filename);
      if (!normalizedFilename || !sources.has(normalizedFilename)) {
        unexpected.push(
          ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')
        );
        continue;
      }
      const name = path
        .basename(normalizedFilename, '.ts')
        .slice('.contract-'.length);
      const list = diagnostics.get(name) ?? [];
      list.push(diagnostic);
      diagnostics.set(name, list);
    }
    expect(unexpected).toEqual([]);
  }, 30000);

  for (const name of Object.keys(validCases)) {
    it(`accepts ${name}`, () => {
      const messages = (diagnostics.get(name) ?? []).map((diagnostic) =>
        ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')
      );
      expect(messages).toEqual([]);
    });
  }

  for (const [name, { code }] of Object.entries(invalidCases)) {
    it(`rejects ${name}`, () => {
      expect(
        (diagnostics.get(name) ?? []).map((diagnostic) => diagnostic.code)
      ).toEqual([code]);
    });
  }
});
