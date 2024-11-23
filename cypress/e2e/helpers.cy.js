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
