// Initialize map
const map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// Add Geoman controls
map.pm.addControls({
  position: 'topleft',
  drawMarker: true,
  drawCircleMarker: true,
  drawPolyline: true,
  drawRectangle: true,
  drawPolygon: true,
  drawCircle: true,
  drawText: true,
  editMode: true,
  dragMode: true,
  cutPolygon: true,
  removalMode: true,
  rotateMode: true,
});

// Set initial global options
map.pm.setGlobalOptions({
  snappable: true,
  snapDistance: 20,
  draggable: true,
});

// ============================================
// Test Cases
// ============================================

// Helper to create layers that Geoman will track
// Sets _drawnByGeoman = true so getGeomanDrawLayers() includes them
function addToGeoman<T extends L.Layer>(layer: T) {
  layer.addTo(map);
  layer._drawnByGeoman = true;
  return layer;
}

function createPolygon(
  latlngs: Parameters<typeof L.polygon>[0],
  options: L.CircleMarkerOptions = {}
) {
  return addToGeoman(L.polygon(latlngs, options));
}

function createRectangle(
  bounds: Parameters<typeof L.rectangle>[0],
  options: L.CircleMarkerOptions = {}
) {
  return addToGeoman(L.rectangle(bounds, options));
}

function createPolyline(
  latlngs: Parameters<typeof L.polyline>[0],
  options: L.CircleMarkerOptions = {}
) {
  return addToGeoman(L.polyline(latlngs, options));
}

function createCircle(
  latlng: Parameters<typeof L.circle>[0],
  options: L.CircleMarkerOptions = {}
) {
  return addToGeoman(L.circle(latlng, options));
}

function createCircleMarker(
  latlng: Parameters<typeof L.circleMarker>[0],
  options: L.CircleMarkerOptions = {}
) {
  return addToGeoman(L.circleMarker(latlng, options));
}

function createMarker(
  latlng: Parameters<typeof L.marker>[0],
  options: L.MarkerOptions = {}
) {
  return addToGeoman(L.marker(latlng, options));
}

const testCases: Record<string, () => void> = {
  empty: () => {
    clearAllLayers();
    map.setView([51.505, -0.09], 13);
  },

  'basic-shapes': () => {
    clearAllLayers();

    // Polygon
    createPolygon(
      [
        [51.509, -0.08],
        [51.503, -0.06],
        [51.51, -0.047],
      ],
      { color: '#e94560' }
    );

    // Rectangle
    createRectangle(
      [
        [51.49, -0.1],
        [51.5, -0.08],
      ],
      { color: '#0f3460' }
    );

    // Polyline
    createPolyline(
      [
        [51.505, -0.11],
        [51.51, -0.1],
        [51.515, -0.11],
        [51.52, -0.1],
      ],
      { color: '#4caf50' }
    );

    // Circle
    createCircle([51.508, -0.06], {
      radius: 200,
      color: '#ff9800',
    });

    // Marker
    createMarker([51.5, -0.05]);

    map.fitBounds([
      [51.48, -0.12],
      [51.53, -0.04],
    ]);
  },

  'complex-polygon': () => {
    clearAllLayers();

    // Star-shaped polygon with many vertices
    const center = [51.505, -0.09];
    const points: L.LatLngTuple[] = [];
    const outerRadius = 0.02;
    const innerRadius = 0.008;

    for (let i = 0; i < 20; i++) {
      const angle = (i * Math.PI * 2) / 20;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      points.push([
        center[0] + Math.cos(angle) * radius,
        center[1] + Math.sin(angle) * radius * 1.5,
      ]);
    }

    createPolygon(points, { color: '#e94560' });

    // Add a complex polygon with a hole
    const outer: L.LatLngTuple[] = [
      [51.52, -0.12],
      [51.52, -0.06],
      [51.54, -0.06],
      [51.54, -0.12],
    ];
    const hole: L.LatLngTuple[] = [
      [51.525, -0.11],
      [51.525, -0.07],
      [51.535, -0.07],
      [51.535, -0.11],
    ];

    createPolygon([outer, hole], { color: '#4caf50' });

    map.setView([51.51, -0.09], 13);
  },

  'layer-groups': () => {
    clearAllLayers();

    // Create a feature group
    const group = L.featureGroup().addTo(map);

    // Add shapes to the group
    const p1 = L.polygon(
      [
        [51.51, -0.1],
        [51.51, -0.08],
        [51.52, -0.08],
        [51.52, -0.1],
      ],
      { color: '#e94560' }
    ).addTo(group);
    p1._drawnByGeoman = true;

    const p2 = L.polygon(
      [
        [51.5, -0.1],
        [51.5, -0.08],
        [51.51, -0.08],
        [51.51, -0.1],
      ],
      { color: '#0f3460' }
    ).addTo(group);
    p2._drawnByGeoman = true;

    const line = L.polyline(
      [
        [51.505, -0.1],
        [51.515, -0.09],
        [51.505, -0.08],
      ],
      { color: '#4caf50' }
    ).addTo(group);
    line._drawnByGeoman = true;

    // Nested group
    const nestedGroup = L.featureGroup().addTo(map);
    const c1 = L.circle([51.508, -0.06], {
      radius: 150,
      color: '#ff9800',
    }).addTo(nestedGroup);
    c1._drawnByGeoman = true;
    const m1 = L.marker([51.508, -0.06]).addTo(nestedGroup);
    m1._drawnByGeoman = true;

    map.fitBounds(group.getBounds().extend(nestedGroup.getBounds()));
  },

  circles: () => {
    clearAllLayers();

    // Various circles
    createCircle([51.505, -0.09], { radius: 500, color: '#e94560' });
    createCircle([51.51, -0.08], { radius: 300, color: '#0f3460' });
    createCircle([51.5, -0.1], { radius: 200, color: '#4caf50' });

    // Circle markers
    createCircleMarker([51.508, -0.07], { radius: 15, color: '#ff9800' });
    createCircleMarker([51.502, -0.085], {
      radius: 10,
      color: '#9c27b0',
    });

    // Regular markers
    createMarker([51.505, -0.09]);
    createMarker([51.51, -0.08]);
    createMarker([51.5, -0.1]);

    map.setView([51.505, -0.09], 14);
  },

  'self-intersecting': () => {
    clearAllLayers();

    // Figure-8 / self-intersecting polygon
    createPolygon(
      [
        [51.51, -0.1],
        [51.51, -0.07],
        [51.5, -0.1],
        [51.5, -0.07],
      ],
      { color: '#e94560' }
    );

    // Bowtie shape
    createPolygon(
      [
        [51.52, -0.09],
        [51.525, -0.06],
        [51.52, -0.06],
        [51.525, -0.09],
      ],
      { color: '#ff9800' }
    );

    map.setView([51.51, -0.08], 14);
  },
};

// ============================================
// Helper Functions
// ============================================
function clearAllLayers() {
  map.pm.getGeomanDrawLayers().forEach((layer) => {
    map.removeLayer(layer);
  });
  // Also remove any feature groups
  map.eachLayer((layer) => {
    if (layer instanceof L.FeatureGroup && !(layer instanceof L.TileLayer)) {
      map.removeLayer(layer);
    }
  });
  updateStatus();
}

function updateStatus() {
  const pm = map.pm;

  document
    .getElementById('status-draw')!
    .classList.toggle('active', pm.globalDrawModeEnabled());
  document
    .getElementById('status-edit')!
    .classList.toggle('active', pm.globalEditModeEnabled());
  document
    .getElementById('status-drag')!
    .classList.toggle('active', pm.globalDragModeEnabled());
  document
    .getElementById('status-remove')!
    .classList.toggle('active', pm.globalRemovalModeEnabled());

  const layers = pm.getGeomanDrawLayers();
  document.getElementById('status-layers')!.textContent = String(layers.length);
}

// ============================================
// Event Bindings
// ============================================

// Test case buttons
document.querySelectorAll<HTMLElement>('[data-testcase]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const testCase = btn.dataset.testcase!;
    if (testCases[testCase]) {
      testCases[testCase]();
      updateStatus();
    }
  });
});

// Global options
const optionInputs = {
  'opt-snappable': { type: 'boolean', option: 'snappable' },
  'opt-snapDistance': { type: 'number', option: 'snapDistance' },
  'opt-draggable': { type: 'boolean', option: 'draggable' },
  'opt-exitModeOnEscape': { type: 'boolean', option: 'exitModeOnEscape' },
  'opt-finishOnEnter': { type: 'boolean', option: 'finishOnEnter' },
  'opt-snapMiddle': { type: 'boolean', option: 'snapMiddle' },
  'opt-allowSelfIntersection': {
    type: 'boolean',
    option: 'allowSelfIntersection',
  },
};

Object.entries(optionInputs).forEach(([id, config]) => {
  const el = document.getElementById(id) as HTMLInputElement | null;
  if (!el) return;

  el.addEventListener('change', () => {
    const value =
      config.type === 'boolean' ? el.checked : parseInt(el.value, 10);
    map.pm.setGlobalOptions({ [config.option]: value });
    console.log(`[Geoman] Set ${config.option} = ${value}`);
  });
});

// Quick action buttons
document.getElementById('btn-enable-edit')!.addEventListener('click', () => {
  map.pm.getGeomanDrawLayers().forEach((layer) => {
    if ((layer as L.Marker).pm && !(layer as L.Marker).pm.enabled()) {
      (layer as L.Marker).pm.enable();
    }
  });
});

document.getElementById('btn-disable-edit')!.addEventListener('click', () => {
  map.pm.getGeomanDrawLayers().forEach((layer) => {
    if ((layer as L.Marker).pm && (layer as L.Marker).pm.enabled()) {
      (layer as L.Marker).pm.disable();
    }
  });
});

document.getElementById('btn-export')!.addEventListener('click', () => {
  const layers = map.pm.getGeomanDrawLayers();
  const features = layers.map((layer) => (layer as L.Polyline).toGeoJSON());
  const geojson = { type: 'FeatureCollection' as const, features };

  console.log('%c[GeoJSON Export]', 'color: #4caf50; font-weight: bold;');
  console.log(geojson);

  navigator.clipboard
    .writeText(JSON.stringify(geojson, null, 2))
    .then(() => console.log('Copied to clipboard!'))
    .catch(() => console.log('Copy to clipboard failed'));
});

document.getElementById('btn-clear')!.addEventListener('click', () => {
  if (confirm('Clear all layers?')) {
    clearAllLayers();
  }
});

// Status updates
const statusEvents = [
  'pm:globaldrawmodetoggled',
  'pm:globaleditmodetoggled',
  'pm:globaldragmodetoggled',
  'pm:globalremovalmodetoggled',
  'pm:create',
  'pm:remove',
  'layeradd',
  'layerremove',
];

statusEvents.forEach((event) => {
  map.on(event, updateStatus);
});

// Initial status
updateStatus();

// ============================================
// Initialize DevPanel
// ============================================
const devPanel = new DevPanel(map, {
  width: 360,
  collapsed: false,
});

devPanel.registerModule(new StateInspector());
devPanel.registerModule(new EventLogger());
devPanel.registerModule(new LayerInspector());
devPanel.registerModule(new GeoJSONTools());

window.devPanel = devPanel;
window.map = map;

console.log(
  '%c[Geoman DevDemo] Ready!',
  'color: #e94560; font-weight: bold; font-size: 14px;'
);
console.log('Press Ctrl+Shift+D to toggle the DevPanel');
console.log('Access map via window.map, devPanel via window.devPanel');
