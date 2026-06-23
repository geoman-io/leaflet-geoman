# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[Unreleased]: https://github.com/geoman-io/leaflet-geoman/compare/v2.19.3...HEAD
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
