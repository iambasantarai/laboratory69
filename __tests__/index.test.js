const { describe, test, expect } = require('@jest/globals');
const sum = require('../index.js');

describe('sum', () => {
  describe('two positive numbers', () => {
    test('add two positive numbers', () => {
      expect(sum(1, 2)).toBe(3);
    });
  });
});
