import { isEmptyDeep } from '../../src/js/helpers';

describe('Helper isEmptyDeep', () => {
  it('should return true for empty arrays', () => {
    expect(isEmptyDeep([])).to.be.true;
  });

  it('should return true for empty nested arrays', () => {
    expect(isEmptyDeep([[[]]])).to.be.true;
  });

  it('should return true for empty-like nested arrays', () => {
    expect(isEmptyDeep([[[undefined], [null], '']])).to.be.true;
  });

  it('should return false for a non-empty nested arrays', () => {
    expect(isEmptyDeep([[[1]]])).to.be.false;
  });

  it('should return false if there is at least one non-empty value', () => {
    expect(isEmptyDeep([[[null], [undefined, 1]]])).to.be.false;
  });
});
