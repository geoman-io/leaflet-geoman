# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- New for `@geoman-io` packages, without a semver guarantee: `addTranslations(lang, tree)` and `registerButtonName(shape, button)` from `./unstable`, `DrawTool#unstable_hintMarker()`, `DrawTool#unstable_fireModeToggled()`, `createCustomControl({ unstable_jsClass })` and `EditRectangle#unstable_corners(map?)`. The toolbar and the draw registry now read one table of button names.
- New for `@geoman-io` packages, without a semver guarantee: the `@geoman-io/leaflet-geoman-free/unstable` entry, for packages that bundle an exact version of this one. It contains all of the main entry, including `PM` and `PMButton`, plus Geoman's classes (`Map`, `Toolbar`, `Draw`, `DrawTool`, the draw tools, `Edit` and the editors), `applyMixins`, `defineOptions`, `copyLatLngs`, `destinationOnLine` and `Utils`, with types generated from the source. Import it instead of the main entry, never both: each loads its own copy of Geoman. The main entry and the script build are unchanged.
- Map modes (global edit, drag, removal, rotate, and drawing each shape, including Cut and copied draw controls) stay exclusive without depending on the toolbar's button state. Before, a mode whose button was deleted with `Toolbar.deleteControl`, disabled with `setButtonDisabled`, or rebuilt untoggled by `setLang` could stay on next to another mode. Escape exits any registered mode instead of a fixed list.
- New for `@geoman-io` packages, without a semver guarantee: `map.pm.unstable_registerMode(name, { enabled, disable })` and `map.pm.unstable_activeModes()`.
- Layer-group membership is read from Leaflet when it is needed instead of from per-layer references kept up to date by 100 ms throttled listeners. With `syncLayersOnDrag: true`, a layer added to a group drags with it immediately, including layers added later to a plain `L.LayerGroup` on the map. A plain `L.LayerGroup` that is not on the map no longer syncs drag; use an `L.FeatureGroup` for that. A layer added to a group in global edit mode is enabled with the group's options at once, without re-enabling the rest of the group. The internal `_parentLayerGroup` and `LayerGroup.pm._layers` are gone.
- `pmIgnore` and opt-in are checked in one place, `PM.Utils.isGeomanLayer(layer)`, which is now public. Snapping now skips a layer whose `pmIgnore` is any truthy value, not only `true`, matching the rest of the library.
- A layer's options resolve in one order: defaults, then global options, then the layer's own options. A layer's own options are the ones passed to `layer.pm.setOptions(options)` or `layer.pm.enable(options)` / `toggleEdit(options)`, including through a layer group's `pm`. `setGlobalOptions` no longer overwrites them; before, it reset them on every layer on the map.
- A layer made by Cut keeps the original layer's own options as its own, and takes everything else from the original as ordinary options, so later global options still reach it. Before, it received every option of the original layer as its own.
- Options passed to `enableGlobalEditMode(options)` / `toggleGlobalEditMode(options)` apply to the layers now but no longer count as each layer's own options, so later global options still reach those layers.
- Options passed to `setGlobalOptions`, `layer.pm.setOptions`, `layer.pm.enable`, `enableDraw` and `enableGlobalEditMode` are checked: a value that isn't an object is ignored, and an option name Leaflet-Geoman doesn't know is still stored. In development builds both log a console warning, an unknown name once per page. Production builds don't warn: the `.min.js` script build, and the ES module when the app's bundler sets `process.env.NODE_ENV` to `production`.
- `setPathOptions(style, { merge: true })` builds a new style object instead of changing the one passed to an earlier `setPathOptions` or `setGlobalOptions({ pathOptions })`. So it no longer changes `getGlobalOptions().pathOptions`, and a later `setGlobalOptions` call puts the global `pathOptions` back on the draw tools.
- Custom event payload keys replace the built-in ones instead of being deep-merged into them, so a nested custom value can't be written into the layer or map an event refers to.
- lodash `merge` and `mergeWith` are no longer used.
- Layer drag runs as one map-level drag session for the pressed layer and the layers synced with it, instead of each layer binding its own listeners and replaying the pointer into the others. With `syncLayersOnDrag`, each layer now fires `pm:drag` and `pm:change` once per pointer move; before, every synced layer fired them once per synced layer on each move (9 events per layer for 3 moves of 3 layers, now 3). `pm:dragstart`, `pm:dragend` and `pm:edit` fire for the pressed layer first, then for the synced layers in group order. Dragging 50 synced layers is about 40× faster.
- Multi-touch: when a second finger presses a layer that is already moving as part of another layer's synced drag, that earlier drag ends (`pm:dragend` and `pm:edit` fire) and the pressed layer, with its own synced layers, follows the second finger. Before, the earlier drag kept following the first finger and the pressed layer was moved by both fingers. Two fingers on two unrelated layers still drag them independently.
- Multi-touch: map panning stays off until the last running layer drag ends, and goes back to the state it had when the first of them started. Before, releasing or cancelling one finger turned panning back on while another finger was still dragging a layer.
- Rotate mode shows one rotate handle per layer instead of making every vertex a rotate handle. The handle sits 30 px beyond the shape's top edge, measured in the shape's own rotated frame, with a dashed line to the rotation center. It turns with the shape and keeps its pixel distance when the map zooms. Vertices no longer rotate, which leaves them free for vertex editing. `limitMarkersToCount` no longer applies in rotate mode, so the handle is always shown. The handle has the classes `marker-icon marker-icon-rotate`.
- New global option `combineModes` (default `false`). When it's on, global edit, drag and rotate mode can be on at the same time, from code and from the toolbar, instead of each turning the others off. One layer can then show its vertex markers, rotate handle and draggable body together: pressing a vertex edits, pressing the body drags, pressing the rotate handle rotates. Removal, cut and the draw tools still turn every other mode off. `layer.pm.enableLayerDrag()` no longer turns that layer's edit mode off. Setting it back to `false` affects only modes turned on afterwards: modes already on together stay on until another mode turns them off. A marker, whose edit mode is a drag, stays draggable while either edit or drag mode is still on. A shape in combined edit and drag mode still drags the layers of `syncLayersOnDrag`; a marker in edit mode drags alone, as before.
- New for `@geoman-io` packages, without a semver guarantee: `unstable_registerMode(name, { targets, button })`. With `combineModes`, two modes whose `targets` don't overlap stay on together; the built-in ones are `vertex` (edit), `body` (drag) and `rotate-handle` (rotate). A mode without `targets` stays exclusive. `button` names the mode's toolbar button so the toolbar keeps it on too.
- `L.PM.Toolbar`, `L.PM.Map`, `L.PM.Draw`, `L.PM.Edit` and the draw tools and editors (`L.PM.Draw.Polygon`, `L.PM.Edit.Marker`, `L.PM.Edit.LayerGroup` and the rest) are ES classes. The Leaflet 1 style statics `extend`, `include`, `mergeOptions` and `addInitHook` are gone from them, and so is their `initialize` method; subclass them with `class X extends L.PM.Draw.Polygon`, calling `super(map)` (or `super(layer)` for an editor) in the constructor. Their default options are unchanged. As with any ES class, their prototype methods are not enumerable.
- The draw tools (`L.PM.Draw.Polygon` and the rest) extend the new `L.PM.DrawTool` instead of `L.PM.Draw`. `L.PM.Draw` is now only a map's registry of tools, `map.pm.Draw`: it keeps `getShapes`, `getActiveShape`, `enable(shape)`, `disable` and `createNewDrawInstance`. A tool is no longer `instanceof L.PM.Draw` and no longer carries the registry's methods, which did not work on a tool. The registry no longer carries the tools' options and methods (`options`, `setOptions`, `getOptions`, `setPathOptions`, `getShape`); they never reached the tools from there. The tools' shared default options are on `L.PM.DrawTool.prototype.options`. Write a custom tool as `class X extends L.PM.Draw.Polygon` (or another tool), or as `class X extends L.PM.DrawTool` with its own `enable`, `disable`, `enabled` and `toggle`; a tool made with `L.PM.Draw.extend({...})` in 2.x becomes the latter. `class X extends L.PM.Draw` makes a registry with its own tools, not a tool: `createNewDrawInstance` throws a `TypeError` for such a class, before it changes the registry.

### Fixed

- `setLang(lang, override, fallback)` no longer overwrites the fallback language with the override, so switching back to the fallback shows its built-in text.
- `setGlobalOptions` replaces array options such as `snappingOrder` instead of merging them index by index.
- When several layers are equally close, snapping prefers the oldest layer again; the sort read an id that the distance result never had.
- A layer added to a group just before a temporary Geoman layer gets its group reference, so `syncLayersOnDrag: true` moves it with the group.
- `pm:*` events reach the groups a layer belongs to right after it changes groups, instead of the groups cached up to one second earlier.
- Releasing a layer drag outside the map, or switching windows mid-drag, ends the drag and restores map panning. Ported from 2.20.8 ([#1695](https://github.com/geoman-io/leaflet-geoman/pull/1695)).
- A layer that belongs to several groups with `syncLayersOnDrag: true` drags the layers of all of its groups, not only the last group's. A layer shared by two of those groups moves once. Ported from 2.20.8.
- Finishing a polygon or cut with fewer than three distinct positions, a non-finite vertex, or an exactly collinear ring leaves the drawing open. Ported from 2.20.8.
- A circle whose center is `NaN` or `Infinity` no longer throws while building its snap ring. A non-finite min radius returns the start point instead of an invalid `LatLng`.
- Cut and containment ignore a ring that contains `NaN` or `Infinity`, instead of throwing or deleting the polygon.
- `changeControlOrder(null)` no longer throws.
- When edit, drag or rotate are on together for one layer (with `combineModes`, or by enabling them on the layer), each follows the others' changes. A body drag or a rotation moves the edit markers, and a body drag or a vertex edit moves the rotate handle and, unless it was set with `setRotationCenter()`, the rotation center. Before, they stayed where they were, so the next rotation undid the drag or the vertex edit. While a body drag or a rotation runs, the other interactions' markers are hidden. Turning edit off during a body drag of that layer, such as with Escape, now turns it off when the drag ends; before, edit stayed on.
- `enableRotate()`, `rotateLayer()` and `rotateLayerToAngle()` do nothing on a circle, circle marker, marker or image overlay, as global rotate mode already skipped them. Before, they threw `getLatLngs is not a function` (`enableRotate()` only on circles and image overlays).
- Rotating by mouse after `rotateLayer()`, `rotateLayerToAngle()` or `setInitAngle()` while rotate is enabled starts from the new angle. Before, the drag started from the angle the layer had when rotate was enabled, so `getAngle()` lost the change made by code.

## [2.20.6] - 2026-11-04

### Fixed

- A marker, circle marker, or image overlay locked with `pm.setOptions({ draggable: false })` stays locked after drawing another shape, toggling edit mode, or entering drag mode. Toolbar edit and layers added during edit still receive global options the layer has not set itself ([#1113](https://github.com/geoman-io/leaflet-geoman/issues/1113)).

## [2.20.5] - 2026-11-03

### Fixed

- Finding a vertex for cutting and snapping no longer skips latitude 0. A truthy check treated the equator as a missing coordinate.
- `map.pm.setLang(null)` and other non-string language codes no longer throw. They fall back to English.
- Placing a text marker no longer throws when `textOptions.className` is not a string. A number or an array is truthy, and the click handler called `.split` on it.
- `addControls` no longer throws when `position` is not a Leaflet corner. A number, `null`, or an unknown string was passed to `setPosition`, and adding the button called `.indexOf` or `appendChild` on a missing corner.
- Global rotate no longer throws when a polyline has no coordinates, or a multi-line starts with an empty part. Leaflet `getCenter` throws `latlngs not passed`, and the mode enables every layer with no catch.
- Global rotate no longer throws when a rectangle has only one corner. That ring still has valid bounds, and `calcAngle` read `lat` on the missing second corner. The mode enables every layer with no catch.
- Cutting a multi-line no longer throws when a part has fewer than two positions. `@turf/line-split` throws `line must be LineString` on that part, and cut finish has no catch.
- Editing a circle no longer throws when its radius is `Infinity`. `circleToPolygon` built the snap ring with Vincenty, which returned `NaN`, and global edit has no catch.
- `rotateLayer` no longer throws when the angle is `NaN` or `Infinity`. The transform projected that angle to `NaN`, and Leaflet threw `Invalid LatLng object`.
- `rotateLayer` and `getRotationCenter` no longer throw when the layer is not on the map. The rotation center was built with `addTo(layer._map)`, and a removed layer has `_map === null`.
- Dragging a vertex no longer throws when `setLatLngs` has shortened the ring while edit markers are still up. The drag read `alt` on a coordinate that was no longer there.
- `setPathOptions` no longer throws when `ignoreShapes` is not an array. A number or object was passed to `.indexOf`.
- Finishing a rectangle no longer throws when `rectangleAngle` is `Infinity`. The angle was used as-is, and the projected corners were `NaN`.
- `createCustomControl` no longer throws when `block` or `className` is not a string. A number or an array is truthy, and the toolbar called `.toLowerCase()` or `.indexOf()` on it.
- Editing a rectangle no longer throws when its ring is empty or shorter than three corners. `calcAngle` read `lat` on a missing corner, and global edit has no catch, so later layers were never enabled.
- Editing a layer no longer throws when `removeVertexOn` or `addVertexOn` is not a string. Leaflet `on` called `.replace` on that value, and global edit has no catch.
- Drawing a marker no longer throws when `markerStyle.icon` is not a Leaflet icon. Leaflet called `createIcon` on that value while the hint marker was added.
- Cutting a polygon no longer throws when a hole ring is empty. polyclip rejects that ring, and cut finish has no catch.

## [2.20.4] - 2026-10-21

### Changed

- Update development dependencies: oxfmt 0.73.0, oxlint 1.88.0, Vitest 5.0.4, and @vitest/coverage-v8 5.0.4.

## [2.20.3] - 2026-10-20

### Added

- Add `map.pm.finishDraw()` to finish a valid active drawing programmatically (#1100).

### Changed

- Replace `.nvmrc` with `mise.toml`, pin Node.js 24.21.0, and upgrade pnpm to 12.5.1.
- Upgrade Cypress to 16.0.0, lint-staged to 17.5.1, oxlint to 1.82.0, and oxfmt to 0.67.0.
- Update development dependencies: Cypress 16.1.1, lint-staged 17.6.0, oxlint 1.87.0, oxfmt 0.72.0, tsx 4.23.15, and @types/lodash 4.17.26.

## [2.20.2] - 2026-09-21

### Fixed

- Allow text layers to be cleared with `setText('')`.
- Normalize compiler-contract fixture paths on Windows.

## [2.20.1] - 2026-09-11

### Changed

- Update runtime and development dependencies and pnpm within their current major versions.
- Retain the seven-day dependency release cooldown, including newly resolved transitive dependencies.

## [2.20.0] - 2026-06-23

### Added

- Extend `LeafletEventHandlerFnMap` with `pm:*` events in TypeScript definitions (#1666)

### Changed

- Ship a real non-minified `leaflet-geoman.js` build (#1664)
- Migrate package manager to pnpm with a 7-day dependency cooldown (#1657)
- Remove Node 18 support and update to Node 24 (#1647)
- Remove obsolete copyright and proprietary information (#1648)
- Update dependencies (#1649)

## [2.19.3] - 2026-04-10

### Fixed

- Bump dependencies and remove vulnerabilities (#1643)
- Add missing source and custom properties to event handlers in TypeScript definitions (#1646)
  (#1646)

## [2.19.2] - 2026-02-02

### Added

- Add touch-friendly marker placement hints (#1627)

### Changed

- Replace ESLint and Prettier with oxlint and oxfmt (#1629)

### Fixed

- Allow polygon completion by self-snapping when snappable is false (#1628)
- Update TypeScript definitions to match implementation (#1617)
- Fix broken test for multilinecut

## [2.19.1] - 2026-02-01

### Changed

- Bump lodash from 4.17.21 to 4.17.23 (#1620)
- Improve demo HTML with DevPanel, EventLogger, GeoJSONTools, LayerInspector, and StateInspector (#1613)

## [2.19.0] - 2025-12-12

### Added

- Add `exitModeOnEscape` option to exit active modes via Escape key (#1612)
- Add `finishOnEnter` option to finish drawing shapes with Enter key (#1612)
- Add Vitest for unit testing and coverage support (#1606)

### Changed

- Bump turf to 7.x and fix intersection logic (#1600)
- Bump dependencies (#1599, #1605, #1606)
- Bump CI actions: actions/cache to v5, actions/checkout to v6, actions/setup-node to v6, softprops/action-gh-release to v2 (#1607, #1608, #1609, #1610)

### Fixed

- Fix CSS control border radius (#1561)
- Fix removing empty text with click on control (#1570)
- Prevent malformed HTML resulting from SVG file (#1577)
- Prevent the creation of an additional Marker when dragging a Marker in edit mode (#1569)
- After editing a vertex, alt-coordinate should be kept (#1578)
- Fix unmounting custom controls (#1575)
- Fix vertex dragging with markerlimit (#1579)
- Fix TypeScript definitions (pathOptions, optional options, Measurement) (#1580, #1581)
- Fix event listener for hint marker display (#1604)

## [2.18.3] - 2024

### Fixed

- Fix CSS control border radius

## [2.18.2] - 2024

### Fixed

- Improve release CI

## [2.18.1] - 2024

### Fixed

- Set checkout depth to 0 in CI

## [2.18.0] - 2024

### Added

- Add new option to disable vertex snapping - `snapVertex` (#1539)
- Show HintMarker at the last position if `continueDrawing` is enabled (#1536)

### Fixed

- Overwrite leaflet-interactive CSS while drawing for crosshair cursor (#1538)
- Only check self-intersection when `allowSelfIntersection` is false (#1537)
- Remove temp layers after editing/removing (#1534)
- Allow removal of holes in polygons while maintaining the minimum vertex count (#1475)
- Center text in TextLayer with CSS box-sizing (#1509)
- Fix dragging center marker of circle while snapping is disabled (#1532)
- Fix snapping when polyline has only one coordinate (#1526)
- Rename `resizableCircle` to `resizeableCircle` (#1518)
- Add missing type definition `name` in `Action` (#1514)
- Fix `setLang` to handle navigator.language formats (such as "fr-FR") (#1499)
- Fix typo in TypeScript definitions

## [2.17.0] - 2024

### Added

- Additional Control methods (#1295)
- Add fallback to English translation if translation is missing (#1461)
- Add sourcemaps to dist (#1480)

### Changed

- Update translations pt_br and add translations pt_pt (#1466)

### Fixed

- Backport Pro changes into OSS (#1490)
- Remove `:focus` of marker-icon style to fix marker jumping while zooming (#1488)
- Remove extra backslash in CSS `<\/style>` closing tag (#1481)
- Prevent opening popup on ignored layers while drawing (#1471)
- Prevent drawing of rectangle when the corners have the same position (#1470)
- Update TypeScript definition for Controls

## [2.16.0] - 2023

### Added

- Initial tracked release

[Unreleased]: https://github.com/geoman-io/leaflet-geoman/compare/v2.20.5...HEAD
[2.20.5]: https://github.com/geoman-io/leaflet-geoman/compare/v2.20.4...v2.20.5
[2.20.4]: https://github.com/geoman-io/leaflet-geoman/compare/v2.20.3...v2.20.4
[2.20.3]: https://github.com/geoman-io/leaflet-geoman/compare/v2.20.2...v2.20.3
[2.20.2]: https://github.com/geoman-io/leaflet-geoman/compare/v2.20.1...v2.20.2
[2.20.1]: https://github.com/geoman-io/leaflet-geoman/compare/v2.20.0...v2.20.1
[2.20.0]: https://github.com/geoman-io/leaflet-geoman/compare/v2.19.3...v2.20.0
[2.19.3]: https://github.com/geoman-io/leaflet-geoman/compare/v2.19.2...v2.19.3
[2.19.2]: https://github.com/geoman-io/leaflet-geoman/compare/v2.19.1...v2.19.2
[2.19.1]: https://github.com/geoman-io/leaflet-geoman/compare/v2.19.0...v2.19.1
[2.19.0]: https://github.com/geoman-io/leaflet-geoman/compare/v2.18.3...v2.19.0
[2.18.3]: https://github.com/geoman-io/leaflet-geoman/compare/v2.18.2...v2.18.3
[2.18.2]: https://github.com/geoman-io/leaflet-geoman/compare/v2.18.1...v2.18.2
[2.18.1]: https://github.com/geoman-io/leaflet-geoman/compare/v2.18.0...v2.18.1
[2.18.0]: https://github.com/geoman-io/leaflet-geoman/compare/v2.17.0...v2.18.0
[2.17.0]: https://github.com/geoman-io/leaflet-geoman/compare/v2.16.0...v2.17.0
[2.16.0]: https://github.com/geoman-io/leaflet-geoman/releases/tag/v2.16.0
