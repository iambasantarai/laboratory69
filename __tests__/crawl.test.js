const { describe, test, expect } = require('@jest/globals');
const { normalizeURL } = require('../src/crawl');

describe('normalize URL', () => {
  describe('strips the protocol from url', () => {
    test('strips the https protocol', () => {
      const inputURL = 'https://basantarai.com.np';
      const result = normalizeURL(inputURL);
      const expected = 'basantarai.com.np';
      expect(result).toBe(expected);
    });

    test('strips the http protocol', () => {
      const inputURL = 'http://basantarai.com.np';
      const result = normalizeURL(inputURL);
      const expected = 'basantarai.com.np';
      expect(result).toBe(expected);
    });
  });

  test('handles the trailing slash in the url', () => {
    const inputURL = 'https://basantarai.com.np/home/';
    const result = normalizeURL(inputURL);
    const expected = 'basantarai.com.np/home';
    expect(result).toBe(expected);
  });

  test('handles capitals in the url', () => {
    const inputURL = 'https://BASANTARAI.com.np/home';
    const result = normalizeURL(inputURL);
    const expected = 'basantarai.com.np/home';
    expect(result).toBe(expected);
  });
});
