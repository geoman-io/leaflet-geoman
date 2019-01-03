const Utils = {
    calcMiddleLatLng(map, latlng1, latlng2) {
        // calculate the middle coordinates between two markers

        const p1 = map.project(latlng1);
        const p2 = map.project(latlng2);

        return map.unproject(p1._add(p2)._divideBy(2));
    },
    latLngToPoint(map, latlng) {
        return map.latLngToContainerPoint(latlng);
    },
    pointToLatLng(map, latlng) {
        return map.containerPointToLatLng(latlng);
    },
    degToRad(degrees) {
        return (degrees * Math.PI) / 180;
    },
};

export default Utils;
