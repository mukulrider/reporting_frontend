import { camelCaseToHyphen } from './';

describe('Utilities', () => {
  describe('convert string form camel-case to hyphen-separated', () => {
    let result;

    it('should return correct value for "TestValueTest"', () => {
      result = camelCaseToHyphen('TestValueTest');
      expect(result).to.equal('test-value-test');
    });

    it('should return correct value for "T"', () => {
      result = camelCaseToHyphen('T');
      expect(result).to.equal('t');
    });

    it('should return empty string for empty string', () => {
      result = camelCaseToHyphen('');
      expect(result).to.equal('');
    });
  });
});
