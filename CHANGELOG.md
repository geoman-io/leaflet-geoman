# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- A marker, circle marker, or image overlay locked with `pm.setOptions({ draggable: false })` stays locked after drawing another shape, toggling edit mode, or entering drag mode. A layer added while edit mode is on still receives the other global options ([#1113](https://github.com/geoman-io/leaflet-geoman/issues/1113)).

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
