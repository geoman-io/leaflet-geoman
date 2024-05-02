<a href="https://www.npmjs.com/package/leaflet-geometryutil"><img alt="npm" src="https://img.shields.io/npm/dt/leaflet-geometryutil"></a>
<a href="https://www.npmjs.com/package/leaflet-geometryutil"><img alt="npm" src= "https://img.shields.io/npm/v/leaflet-geometryutil?color=red"></a>

# Leaflet.GeometryUtil (v0.10.3)

- Tested with stable Leaflet 0.7.0
- Tested with Leaflet 1.0.0-rc.3

## Usage

Using Source Code:

Include the `leaflet.geometryutil.js` file. In this project the file is `src/js/Libraries/GeometryUtil.js`.

Using Node:

```
    npm install leaflet-geometryutil
```

Or browser:

```
    <script src="leaflet.geometryutil.js"></script>
```

Check out [online documentation](http://makinacorpus.github.io/Leaflet.GeometryUtil/).

## Development

### Running tests in command-line

- Install [nodejs](http://nodejs.org)

```
    sudo apt-get install nodejs

    npm install
```

- Ready !

```
    npm test
```

## Changelog

### 0.10.3

- add support for closestOnCircle (#101, thanks to @danyhoron)

### 0.10.2

- use leaflet's earth radius in destination function (#96, thanks to @viliusstanga)
- Changed imports to acommodate to new ngx-leaflet organization (#97, thanks to @rtrevinnoc)

### 0.10.1

- Enhance precision for meter values (metric / imperial) (#94, thanks @karlbeecken)

### 0.10.0

- Add TypeScript definitions (#90, thanks @cdauth)

### 0.9.3

- Increase locateOnLine() tolerance

### 0.9.2

- Fixes a crash if a multilinestring has an element with only one vertex (fixes #84, thanks @runette)

### 0.9.1

- Fix `locateOnLine()` doesn't return correct subline (#79, thanks @lepetittim)

### 0.9.0

- Fix `interpolateOnLine()` doesn't return correct predecessor (#66, thanks @jb2b38)
- Add `angle()` and `destinationOnSegment()` (#71, thanks @trandaison)

### 0.8.1

- Remove a deprecated function in Leaflet 1.x (#69)

### 0.8.0

- Update leaflet dependency to `>=0.7.0` (#64, thanks @kozze89)
- Add `nClosestLayer` (#62, thanks @haoliangyu)

### 0.7.2

- Fix #59, `closest` method using a shallow copy of latLngs => deep copy now

### 0.7.1

- Fix `closest` method for last segment on Polygon and nested Polygons

### 0.7.0

- Tested for Leaflet 1.0.0-rc.3

### 0.6.0

- Add nested arrays for `layer` param in `closest` method

### 0.5.1

- Fix closestLayer to be able to work with GeoJSON nested layers
- Restrict closest method to Array and L.Polyline (L.Polygon extend L.Polyline)

### 0.5.0

- Add function `layersWithin()` (#34, thanks @haoliangyu)
- Fix safety check on the ratio value in ``interpolateOnLine()` (#29, thanks @Marcussacapuces91)

### 0.4.0

- Same version as v0.3.3, new release as v0.4.0 to keep numbering coherent as a new feature has been added

### 0.3.3

- Add bearing and destination functions (thanks @doublestranded)

### 0.3.2

- Use a soft dependency for Leaflet (thanks Erik Escoffier)

### 0.3.1

- Make sure interpolateOnLine() always returns a L.LatLng object (thanks Justin Manley)

### 0.3.0

- Added UMD style initialization (thanks @PerLiedman)
- Added readable distance (thanks @Mylen)
- Fix side effects on latlngs with `closest()` (thanks @AndrewIngram)

### 0.2.0

- Locate point on line
- Rotate point around center
- Fixed bug if closest point was on last segment

### 0.1.0

- Line subpart extraction
- Line lengths
- Angle and slope computation
- Line reverse
- Line interpolation

### 0.0.1

- Initial working version

## License

- BSD New

## Authors

- [Benjamin Becquet](https://github.com/bbecquet)
- [Mathieu Leplatre](https://github.com/leplatrem)
- [Simon Thépot](https://github.com/djcoin)
- [Nhinze](https://github.com/nhinze)
- [Frédéric Bonifas](https://github.com/fredericbonifas)
- [Alexander Melard](https://github.com/mylen)

[![Makina Corpus](http://depot.makina-corpus.org/public/logo.gif)](http://makinacorpus.com)
