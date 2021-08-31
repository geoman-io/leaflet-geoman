L.TrigUtil = {

  calcAngle(x, y, unit = 'deg') {
    return unit === 'deg' ?
        this.radiansToDegrees(Math.atan2(y, x)) :
        Math.atan2(y, x);
  },

  radiansToDegrees(angle) {
    return (angle * 180) / Math.PI;
  },

  degreesToRadians(angle) {
    return (angle * Math.PI) / 180;
  },
};
