# Leaflet.AlmostOver (v1.0.1)

[GitHub Repo](https://github.com/makinacorpus/Leaflet.AlmostOver)

This plugin allows you to detect mouse click and hovering events on lines, with a configurable tolerance distance.

It is useful when paths are drawn with a very small weight, or for click
detection on mobile devices, for which finger precision can be a problem.

Play with [online demo](http://makinacorpus.github.io/Leaflet.AlmostOver/).

It requires [Leaflet.GeometryUtil](https://github.com/makinacorpus/Leaflet.GeometryUtil/).

[![Build Status](https://travis-ci.org/makinacorpus/Leaflet.AlmostOver.png)](https://travis-ci.org/makinacorpus/Leaflet.AlmostOver)

## Usage

```javascript

    var map = L.map('map');
    ...
    var lines = L.geoJson(...);
    ...
    map.almostOver.addLayer(lines);

    map.on('almost:over', function (e) {
        alert('Almost clicked !');
    });

```

### Events

Events triggered when mouse is almost over a layer :

- **almost:over** (latlng, layer)
- **almost:move** (latlng, layer)
- **almost:out** (layer)
- **almost:click** (latlng, layer)
- **almost:dblclick** (latlng, layer)

### Caveats

If the layer has many features, this plugin can slow down 'panning' performance, as, by default,
it process 'mousemove' events. If only 'almost:click' or 'almost:dblclick' are needed, and 'almost'
events related to 'mousemove' events are not needed, they can be disabled with `almostOnMouseMove`
map option.

```javascript

    var map = L.map('map', {
      almostOnMouseMove: false,
    });
    ...
    var lines = L.geoJson(...);
    ...
    map.almostOver.addLayer(lines);

    map.on('almost:click', function (e) {
        alert('Almost clicked !');
    });

```

## Authors

[![Makina Corpus](http://depot.makina-corpus.org/public/logo.gif)](http://makinacorpus.com)
