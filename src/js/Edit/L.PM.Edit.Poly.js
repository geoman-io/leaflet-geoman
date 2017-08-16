import Edit from './L.PM.Edit';

Edit.Poly = Edit.Line.extend({
    // this is a bit weird but... Polygons are completely supported by L.PM.Edit.Line now 😲.
    // I'll keep this class in case there is something Polygon-specific that we'd need in the future.
});
