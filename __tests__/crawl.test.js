const { describe, test, expect } = require('@jest/globals');
const { normalizeURL, getURLsFromHTML } = require('../src/crawl');

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

describe('get URLs from html body', () => {
  test('gets absolute urls', () => {
    const inputHTML = `
    <html>
    <head>
    <title></title>
    </head>
    <body>
    <a href="https://github.com/iambasantarai">GitHub</a>
    <a href="https://twitter.com/iambasantarai">Twitter</a>
    </body>
    </html>
    `;
    const inputURL = 'https://basantarai.com.np';
    const result = getURLsFromHTML(inputHTML, inputURL);
    const expected = [
      'https://github.com/iambasantarai',
      'https://twitter.com/iambasantarai',
    ];
    expect(result).toEqual(expected);
  });

  test('gets relative urls', () => {
    const inputHTML = `
    <html>
    <head>
    <title></title>
    </head>
    <body>
    <a href="/about">Twitter</a>
    </body>
    </html>
    `;
    const inputURL = 'https://basantarai.com.np';
    const result = getURLsFromHTML(inputHTML, inputURL);
    const expected = ['https://basantarai.com.np/about'];
    expect(result).toEqual(expected);
  });

  test('gets both absolute & relative urls', () => {
    const inputHTML = `
    <html>
    <head>
    <title></title>
    </head>
    <body>
    <a href="https://github.com/iambasantarai">GitHub</a>
    <a href="/about">Twitter</a>
    </body>
    </html>
    `;
    const inputURL = 'https://basantarai.com.np';
    const result = getURLsFromHTML(inputHTML, inputURL);
    const expected = [
      'https://github.com/iambasantarai',
      'https://basantarai.com.np/about',
    ];
    expect(result).toEqual(expected);
  });

  test('ignores invalid urls', () => {
    const inputHTML = `
    <html>
    <head>
    <title></title>
    </head>
    <body>
    <a href="invalid">Invalid URL</a>
    </body>
    </html>
    `;
    const inputURL = 'https://basantarai.com.np';
    const result = getURLsFromHTML(inputHTML, inputURL);
    const expected = [];
    expect(result).toEqual(expected);
  });
});
