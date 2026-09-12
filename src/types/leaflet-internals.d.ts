import type { MatrixConstructor } from '../js/helpers/Matrix';

// Internal Leaflet fields used by the plugin. These are not shipped to consumers.
declare module 'leaflet' {
  interface CRS {
    projection?: Projection & { MAX_LATITUDE?: number };
  }
  interface Map {
    _getPaneRenderer(pane?: string): Renderer | undefined;
    _renderer: Renderer;
  }
  interface Path {
    _renderer: Renderer;
  }
  namespace PM {
    let activeLang: string;
    const Matrix: MatrixConstructor;
  }
}
