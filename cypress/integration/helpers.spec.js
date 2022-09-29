import { hasValues } from '../../src/js/helpers';

describe('Helper hasValues', () => {
  it('should return false for empty arrays', () => {
    expect(hasValues([])).to.be.false;
  });

  it('should return false for empty nested arrays', () => {
    expect(hasValues([[[]]])).to.be.false;
  });

  it('should return false for empty-like arrays', () => {
    expect(hasValues([undefined, null, ''])).to.be.false;
  });

  it('should return false for empty-like nested arrays', () => {
    expect(hasValues([[[undefined], [null], ['']]])).to.be.false;
  });

  it('should return true for non-empty arrays', () => {
    expect(hasValues([0])).to.be.true;
  });

  it('should return true for non-empty nested arrays', () => {
    expect(hasValues([[[0]]])).to.be.true;
  });

  it('should return true if there is at least one non-empty value', () => {
    expect(hasValues([undefined, null, '', 0])).to.be.true;
  });

  it('should return true if there is at least one non-empty nested value', () => {
    expect(hasValues([[[undefined], [null, '', 1]]])).to.be.true;
  });
});
