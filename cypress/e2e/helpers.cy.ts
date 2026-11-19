import { hasValues } from '../../src/js/helpers';

describe('Helper hasValues', () => {
  it('should return false for empty arrays', () => {
    // eslint-disable-next-line no-unused-expressions
    expect(hasValues([])).to.be.false;
  });

  it('should return false for empty nested arrays', () => {
    // eslint-disable-next-line no-unused-expressions
    expect(hasValues([[[]]])).to.be.false;
  });

  it('should return false for empty-like arrays', () => {
    // eslint-disable-next-line no-unused-expressions
    expect(hasValues([undefined, null, ''])).to.be.false;
  });

  it('should return false for empty-like nested arrays', () => {
    // eslint-disable-next-line no-unused-expressions
    expect(hasValues([[[undefined], [null], ['']]])).to.be.false;
  });

  it('should return true for non-empty arrays', () => {
    // eslint-disable-next-line no-unused-expressions
    expect(hasValues([0])).to.be.true;
  });

  it('should return true for non-empty nested arrays', () => {
    // eslint-disable-next-line no-unused-expressions
    expect(hasValues([[[0]]])).to.be.true;
  });

  it('should return true if there is at least one non-empty value', () => {
    // eslint-disable-next-line no-unused-expressions
    expect(hasValues([undefined, null, '', 0])).to.be.true;
  });

  it('should return true if there is at least one non-empty nested value', () => {
    // eslint-disable-next-line no-unused-expressions
    expect(hasValues([[[undefined], [null, '', 1]]])).to.be.true;
  });
});

describe('PM.Utils.isGeomanLayer', () => {
  it('follows pmIgnore, opt-in and temporary layers', () => {
    cy.window().then(({ L, map }) => {
      const plain = new L.Marker(map.getCenter());
      const ignored = new L.Marker(map.getCenter(), { pmIgnore: true });
      const temp = new L.Marker(map.getCenter());
      temp._pmTempLayer = true;
      expect(L.PM.Utils.isGeomanLayer(plain)).to.eq(true);
      expect(L.PM.Utils.isGeomanLayer(ignored)).to.eq(false);
      expect(L.PM.Utils.isGeomanLayer(temp)).to.eq(false);

      L.PM.setOptIn(true);
      try {
        const optedIn = new L.Marker(map.getCenter(), { pmIgnore: false });
        expect(L.PM.Utils.isGeomanLayer(plain)).to.eq(false);
        expect(L.PM.Utils.isGeomanLayer(optedIn)).to.eq(true);
      } finally {
        L.PM.setOptIn(false);
      }
    });
  });
});
