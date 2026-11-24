import path from 'node:path';
import ts from 'typescript';
import { beforeAll, describe, expect, it } from 'vitest';

const normalizePath = (filename: string) => filename.replace(/\\/g, '/');

const validCases = {
  scopedPayloads: `
    const map = new L.Map('map');
    const layer = new L.Layer();
    const polygon = new L.Polygon([[0, 0], [1, 1], [0, 1]]);
    const marker = new L.Marker([0, 0]);
    const returnedMap: L.Map = map.on('pm:globaldrawmodetoggled', (e) => {
      const enabled: boolean = e.enabled;
      const shape: string = e.shape;
      return enabled && !!shape;
    });
    const created: L.Map = map.on('pm:create', (e) => e.layer);
    const started: L.Map = map.on('pm:drawstart', (e) => e.workingLayer);
    const edited: L.Polygon = polygon.on('pm:edit', (e) => e.shape);
    const dragged: L.Marker = marker.on('pm:dragstart', (e) => e.layer);
    const group: L.LayerGroup = new L.LayerGroup().on('pm:snap', (e) => e.distance);
    const features: L.FeatureGroup = new L.FeatureGroup().on('pm:edit', (e) => e.layer);
    map.on('pm:remove', (e) => e.layer);
    layer.on('pm:remove', (e) => e.layer);
    map.on('pm:cut', (e) => e.originalLayer);
    layer.on('pm:cut', (e) => e.layer);
    map.on('pm:intersect', (e) => e.intersection);
    layer.on('pm:intersect', (e) => e.layer);
    map.on('pm:rotate', (e) => e.angle);
    polygon.on('pm:rotate', (e) => e.angle);
    map.on('pm:split', (e) => e.layers);
    polygon.on('pm:scale', (e) => e.layer);
    map.once('pm:drawend', (e) => e.shape);
    polygon.once('pm:update', (e) => e.shape);
    map.off('pm:langchange', (e) => e.activeLang);
    polygon.off('pm:dragend', (e) => e.layer);
    layer.off();
    map.on({ 'pm:create': (e) => e.layer });
    polygon.on({ 'pm:edit': (e) => e.shape });
    map.on('click', (e) => e.latlng);
    polygon.on('click', (e) => e.latlng);
    marker.on('drag', (e) => e.latlng);
    map.on('pm:create', (e) => e.layer, map);
    polygon.on('pm:edit', (e) => e.shape, polygon);
    map.on('pm:create layeradd', (e) => e.layer);
    void returnedMap;
    void created;
    void started;
    void edited;
    void dragged;
    void group;
    void features;
  `,
};

const invalidCases = {
  mapEventOnLayer: {
    code: 2339,
    source: `new L.Layer().on('pm:globaldrawmodetoggled', (e) => e.enabled);`,
  },
  layerEventOnMap: {
    code: 2339,
    source: `new L.Map('map').on('pm:edit', (e) => e.shape);`,
  },
  onceMapEventOnLayer: {
    code: 2339,
    source: `new L.Layer().once('pm:create', (e) => e.shape);`,
  },
  onceLayerEventOnMap: {
    code: 2339,
    source: `new L.Map('map').once('pm:update', (e) => e.shape);`,
  },
  offMapEventOnLayer: {
    code: 2339,
    source: `new L.Layer().off('pm:globaldrawmodetoggled', (e) => e.enabled);`,
  },
  offLayerEventOnMap: {
    code: 2339,
    source: `new L.Map('map').off('pm:edit', (e) => e.shape);`,
  },
};

const completionSource = `
  const map = new L.Map('map');
  const layer = new L.Layer();
  map.on('');
  layer.on('');
`;

const mapOnlyEvents = [
  'pm:globaldrawmodetoggled',
  'pm:create',
  'pm:drawstart',
  'pm:drawend',
  'pm:langchange',
  'pm:error',
  'pm:union',
];
const layerOnlyEvents = [
  'pm:edit',
  'pm:update',
  'pm:dragstart',
  'pm:snap',
  'pm:vertexadded',
  'pm:snapdrag',
];
const sharedEvents = ['pm:remove', 'pm:cut', 'pm:intersect', 'pm:rotate'];

describe('pm event scoping', () => {
  const diagnostics = new Map<string, ts.Diagnostic[]>();
  let completionNames: { map: string[]; layer: string[] } = {
    map: [],
    layer: [],
  };

  beforeAll(() => {
    const root = process.cwd();
    const configPath = path.join(root, 'test/types/tsconfig.json');
    const config = ts.readConfigFile(configPath, ts.sys.readFile);
    if (config.error) {
      throw new Error(
        ts.flattenDiagnosticMessageText(config.error.messageText, '\n')
      );
    }
    const parsed = ts.parseJsonConfigFileContent(
      config.config,
      ts.sys,
      path.dirname(configPath)
    );
    expect(parsed.errors).toEqual([]);

    const declaration = path.join(root, 'leaflet-geoman.d.ts');
    const sources = new Map<string, string>();
    const add = (name: string, source: string) => {
      sources.set(
        normalizePath(path.join(root, 'test/types', `.event-${name}.ts`)),
        source
      );
    };
    for (const [name, source] of Object.entries(validCases)) add(name, source);
    for (const [name, { source }] of Object.entries(invalidCases)) {
      add(name, source);
    }
    add('completions', completionSource);

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
            `import * as L from 'leaflet';\n${source}`,
            languageVersion,
            true
          );
    };
    const program = ts.createProgram(
      [declaration, ...sources.keys()],
      parsed.options,
      host
    );
    const unexpected: string[] = [];
    for (const diagnostic of ts.getPreEmitDiagnostics(program)) {
      const filename = diagnostic.file?.fileName;
      const normalizedFilename = filename && normalizePath(filename);
      if (!normalizedFilename || !sources.has(normalizedFilename)) {
        if (normalizedFilename?.includes('node_modules')) continue;
        unexpected.push(
          `${normalizedFilename ?? '(no file)'}: ${ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')}`
        );
        continue;
      }
      const name = path
        .basename(normalizedFilename, '.ts')
        .slice('.event-'.length);
      if (name === 'completions') continue;
      const list = diagnostics.get(name) ?? [];
      list.push(diagnostic);
      diagnostics.set(name, list);
    }
    expect(unexpected).toEqual([]);

    const completionFile = [...sources.keys()].find((filename) =>
      filename.endsWith('.event-completions.ts')
    );
    if (!completionFile) throw new Error('missing completion fixture');
    const completionText = `import * as L from 'leaflet';\n${completionSource}`;
    const serviceHost: ts.LanguageServiceHost = {
      getCompilationSettings: () => parsed.options,
      getScriptFileNames: () => [declaration, ...sources.keys()],
      getScriptVersion: () => '0',
      getScriptSnapshot: (filename) => {
        const source = sources.get(normalizePath(filename));
        if (source !== undefined) {
          return ts.ScriptSnapshot.fromString(
            `import * as L from 'leaflet';\n${source}`
          );
        }
        if (normalizePath(filename) === normalizePath(declaration)) {
          const text = ts.sys.readFile(filename);
          return text === undefined
            ? undefined
            : ts.ScriptSnapshot.fromString(text);
        }
        const text = ts.sys.readFile(filename);
        return text === undefined
          ? undefined
          : ts.ScriptSnapshot.fromString(text);
      },
      getCurrentDirectory: () => root,
      getDefaultLibFileName: (options) => ts.getDefaultLibFilePath(options),
      fileExists: ts.sys.fileExists,
      readFile: ts.sys.readFile,
      readDirectory: ts.sys.readDirectory,
      directoryExists: ts.sys.directoryExists,
      getDirectories: ts.sys.getDirectories,
    };
    const languageService = ts.createLanguageService(serviceHost);
    const namesAt = (needle: string) => {
      const position = completionText.indexOf(needle) + needle.length;
      const completions = languageService.getCompletionsAtPosition(
        completionFile,
        position,
        {}
      );
      return (completions?.entries ?? [])
        .map((entry) => entry.name)
        .filter((name) => name.startsWith('pm:'));
    };
    completionNames = {
      map: namesAt("map.on('"),
      layer: namesAt("layer.on('"),
    };
  }, 60000);

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

  it('suggests pm events only on the object that fires them', () => {
    for (const eventName of mapOnlyEvents) {
      expect(completionNames.layer).not.toContain(eventName);
      expect(completionNames.map).toContain(eventName);
    }
    for (const eventName of layerOnlyEvents) {
      expect(completionNames.map).not.toContain(eventName);
      expect(completionNames.layer).toContain(eventName);
    }
    for (const eventName of sharedEvents) {
      expect(completionNames.map).toContain(eventName);
      expect(completionNames.layer).toContain(eventName);
    }
  });
});
