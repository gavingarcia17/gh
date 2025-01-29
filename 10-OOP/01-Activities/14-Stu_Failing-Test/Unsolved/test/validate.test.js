const Validate = require('../validate');

describe('Validate', () => {
  describe('isPassword', () => {
    test('should return false for empty password', () => {
      const validate = new Validate();
      const str = '';
      const result = validate.isPassword(str);
      expect(result).toEqual(false);
    });
  });
});