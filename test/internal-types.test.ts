import path from 'node:path';
import ts from 'typescript';
import { beforeAll, describe, expect, it } from 'vitest';

const validCases = {
  inheritedMethods: `
    const Child = L.PM.Edit.Marker.extend<{ probe(): boolean }>({
      probe() { return this.enabled(); },
    });
    const editor = new Child(L.marker([0, 0]));
    const enabled: boolean = editor.probe();
    editor.enableLayerDrag();
  `,
  implementedMethod: `
    const Child = L.PM.Edit.Marker.extend<{ probe(): string }>({
      probe() { return 'implemented'; },
    });
    const result: string = new Child(L.marker([0, 0])).probe();
  `,
  checkedMixin: `
    const mixin = { probe() { return 'mixed in'; } };
    const Child = L.PM.Edit.Marker.extend<
      { probe(): string }, [L.Marker], [typeof mixin]
    >({ includes: [mixin] });
    const result: string = new Child(L.marker([0, 0])).probe();
  `,
  mixinOrder: `
    const first = { probe() { return 1; } };
    const second = { probe() { return 'last wins'; } };
    const Child = L.PM.Edit.Marker.extend<
      {}, [L.Marker], [typeof first, typeof second]
    >({ includes: [first, second] });
    const result: string = new Child(L.marker([0, 0])).probe();
  `,
  mapAndEditorMixins: `
    const controller = new L.PM.Map(L.map('map'));
    controller.enableGlobalEditMode({ snapDistance: 20 });
    controller.enableGlobalDragMode();
    controller.enableGlobalRemovalMode();
    controller.enableGlobalRotateMode();
    controller.Draw.Marker.enable({ snappable: false });
    controller.Draw.Polygon.setOptions({ snapDistance: 20 });
    controller.Toolbar.setButtonDisabled('drawMarker', true);
    const editor = new L.PM.Edit.Rectangle(L.rectangle([[0, 0], [1, 1]]));
    editor.rotateLayer(15);
    const dragging: boolean = editor.layerDragEnabled();
    const drawing = new L.PM.Draw.Polygon(L.map('draw-map'));
    drawing.setOptions({ snappable: true });
    drawing.getOptions();
  `,
  sharedAndExtensionOptions: `
    const controller = new L.PM.Map(L.map('map'));
    controller.enableDraw('CustomPolygon', {
      snappable: false, snapDistance: 30, customExtension: { value: true },
      minRadiusCircle: null, textOptions: { text: null },
    });
    controller.setGlobalOptions({
      snapDistance: 15, allowRotation: false, layerGroup: L.map('group-map'),
      customExtension: 'supported', minRadiusCircle: null,
    });
    controller.addControls({ positions: { draw: 'topright' } });
    controller.setPathOptions({ weight: 2, color: 'red' });
  `,
};

const invalidCases = {
  missingMethod: {
    code: 2345,
    source: `L.PM.Edit.Marker.extend<{ missing(): string }>({});`,
  },
  incorrectImplementation: {
    code: 2322,
    source: `L.PM.Edit.Marker.extend<{ probe(): string }>({
      probe() { return 42; },
    });`,
  },
  incompatibleInheritedMethod: {
    code: 2345,
    source: `L.PM.Edit.Marker.extend<{ enabled(): string }>({});`,
  },
  incompatibleMixin: {
    code: 2345,
    source: `const mixin = { probe() { return 42; } };
      L.PM.Edit.Marker.extend<
        { probe(): string }, [L.Marker], [typeof mixin]
      >({ includes: [mixin] });`,
  },
  missingMixin: {
    code: 2345,
    source: `L.PM.Edit.Marker.extend<
      { probe(): string }, [L.Marker], [{ probe(): string }]
    >({});`,
  },
  invalidDrawOption: {
    code: 2322,
    source: `new L.PM.Map(L.map('map')).enableDraw('Polygon', {
      snappable: 'no',
    });`,
  },
  invalidGlobalOption: {
    code: 2322,
    source: `new L.PM.Map(L.map('map')).setGlobalOptions({
      snapDistance: 'far',
    });`,
  },
  invalidGlobalEditOption: {
    code: 2322,
    source: `new L.PM.Map(L.map('map')).enableGlobalEditMode({
      snapDistance: 'far',
    });`,
  },
  invalidBaseDrawOption: {
    code: 2322,
    source: `new L.PM.Draw(L.map('map')).enable('Polygon', {
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
      sources.set(path.join(root, 'src/types', `.contract-${name}.ts`), source);
    }
    for (const [name, { source }] of Object.entries(invalidCases)) {
      sources.set(path.join(root, 'src/types', `.contract-${name}.ts`), source);
    }

    const host = ts.createCompilerHost(parsed.options);
    const originalGetSourceFile = host.getSourceFile.bind(host);
    host.getSourceFile = (
      filename,
      languageVersion,
      onError,
      shouldCreateNewSourceFile
    ) => {
      const source = sources.get(filename);
      return source === undefined
        ? originalGetSourceFile(
            filename,
            languageVersion,
            onError,
            shouldCreateNewSourceFile
          )
        : ts.createSourceFile(
            filename,
            `export {};\n${source}`,
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
      if (!filename || !sources.has(filename)) {
        unexpected.push(
          ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')
        );
        continue;
      }
      const name = path.basename(filename, '.ts').slice('.contract-'.length);
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
