# TypeScript development

All authored JavaScript has been migrated to strict TypeScript, including the plugin, tests, demos, and build configuration. JSON translations, CSS, and third-party dependencies keep their original formats.

## Checking and running the project

Use the Node and pnpm versions declared in `package.json`. Installation runs the build through the existing `prepare` lifecycle hook.

```sh
pnpm install --frozen-lockfile
pnpm run typecheck
pnpm run lint:check
pnpm run test:unit
pnpm run build
pnpm exec cypress install
pnpm test
```

`pnpm start` builds and watches the plugin and demo scripts, then serves the existing demo and browser-test pages. `pnpm test` runs Cypress in Chrome; Chrome must be available in the environment.

## Type-checking boundaries

| Configuration | Checked code |
| --- | --- |
| `tsconfig.json` | Plugin source and unit tests |
| `tsconfig.tools.json` | esbuild script, Vitest configuration, and compiler regression tests |
| `cypress/tsconfig.json` | Cypress configuration, support, browser tests, and test-page bootstrap |
| `demo/tsconfig.json` | Demo and developer-panel sources |
| `test/types/tsconfig.json` | ESM and CommonJS consumers of the published package declarations |

All configurations use strict checking. Runtime TypeScript uses erasable syntax and explicit type-only imports. esbuild emits JavaScript; `tsc` checks types without emitting files. `tsx` runs the build script during development and packaging.

`src/types/leaflet-class.ts` describes Leaflet's existing class factories and inherited instances. Keep `L.Class.extend`, `include`, and initialization hooks intact: replacing these factories with native classes would change extension behavior and prototype properties. `src/types/leaflet-internals.ts` describes private Leaflet state used by the implementation; it is checked as source and is not published.

New required methods must be implemented by the class definition, inherited with a compatible signature, or supplied by an explicit checked mixin tuple. Subclass methods see the full inherited instance through `ThisType`. Mixin members are composed in Leaflet's runtime order, and the returned map, draw, and edit instances retain their inherited APIs. Instance data fields may still be initialized by Leaflet's initialization lifecycle.

`src/types/options.ts` shares the draw, edit, and global option contracts. Known options retain their value types; custom extension keys and historical nullable defaults remain supported. The published declaration file continues to define consumer types independently.

`test/internal-types.test.ts` runs the TypeScript compiler against positive and negative fixtures. It checks inheritance, mixin composition, missing/incompatible implementations, and option values without suppression comments. It is run with the unit tests and checked in the Node tooling context.

Browser test and demo globals have separate checking contexts so their declarations do not become part of the consumer API. Demo scripts compile to their existing `.js` URLs and preserve classic-script globals. These generated scripts and source maps are ignored by Git; edit their `.ts` sources and run the build.

## Compatibility contract

The root `leaflet-geoman.d.ts` remains the published declaration contract and is copied unchanged into `dist`. Internal implementation types are deliberately separate. The ESM and CommonJS consumer fixtures resolve the package's own exports without internal augmentations.

The migration preserves package entry points, export mappings, distributed filenames, runtime dependencies, peer dependencies, the global `L.PM` namespace, and Leaflet's class-extension model. It does not generate public declarations from internal implementation types.

Migration verification used develop commit `1d9a3b39e55ee91dd6caae4452be04991c52f05e` as the baseline. Through migration commit `c4e5f22e9f6d3b6ede48cfd7301f54bb115a5965`, the normalized production JavaScript matched that baseline after excluding embedded package-manifest metadata and source-map/comment differences. The distributed stylesheet and public declarations also matched exactly. Both versions passed the 73 unit tests and all 333 existing browser tests.

Six additional browser tests in `compatibility.cy.ts` cover class extension and hooks, prototype behavior, the Matrix constructor, opt-in initialization, legacy toolbar and draw APIs, repeated bundle loading, and demo globals. These complement the unchanged consumer declarations and existing behavior tests.

One intentional behavior fix is isolated in commit `01348b2da7f3d670f0f059d99fbd576ed954aaee`: layers added while global rotation is enabled now use the rotation permission check. Previously this path incorrectly consulted removal permission. `rotationPermissions.cy.ts` reproduces the failure and verifies both allowed and denied rotation cases. The final production JavaScript differs from the pure migration only by this permission check, apart from package metadata.

## Review follow-up

The review follow-up adds 15 compiler regression cases, for 88 unit/compiler tests in total. The browser suite adds two button-destruction cases, for 342 tests.

Requiring real prototype methods exposed an existing bug in `PMButton.destroy()`: it called a nonexistent `_update()` method. The isolated fix removes the button's own DOM node without removing sibling controls, and supports repeated destruction or destruction before mounting. Both new browser cases fail against the previous PR bundle with `this._update is not a function`.

After removing embedded package metadata and build-path/comment differences, the follow-up production bundle differs from reviewed commit `44fe9e743c0c7ea294023477fa74a22caa43c4bd` only by that destruction fix. CSS and published declarations remain unchanged. Together with the earlier rotation fix, these are the two intentional production behavior changes in the PR.
