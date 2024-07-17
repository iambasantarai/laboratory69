const { describe, test, expect } = require('@jest/globals');
const { sortPages } = require('../src/report');

describe('sort pages', () => {
  test('sort 3 pages', () => {
    const inputPages = {
      'http://basantarai.com.np/projects': 1,
      'http://basantarai.com.np/about': 2,
      'http://basantarai.com.np': 4,
    };

    const result = sortPages(inputPages);
    const expected = [
      ['http://basantarai.com.np', 4],
      ['http://basantarai.com.np/about', 2],
      ['http://basantarai.com.np/projects', 1],
    ];
    expect(result).toEqual(expected);
  });

  test('sort 5 pages', () => {
    const inputPages = {
      'http://basantarai.com.np/about': 1,
      'http://basantarai.com.np/projects': 1,
      'http://basantarai.com.np/contact': 2,
      'http://basantarai.com.np/blog': 6,
      'http://basantarai.com.np': 4,
    };

    const result = sortPages(inputPages);
    const expected = [
      ['http://basantarai.com.np/blog', 6],
      ['http://basantarai.com.np', 4],
      ['http://basantarai.com.np/contact', 2],
      ['http://basantarai.com.np/about', 1],
      ['http://basantarai.com.np/projects', 1],
    ];
    expect(result).toEqual(expected);
  });
});
