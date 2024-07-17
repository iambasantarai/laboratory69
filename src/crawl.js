const { JSDOM } = require('jsdom');

function normalizeURL(url) {
  const urlObject = new URL(url);
  const hostPath = `${urlObject.hostname}${urlObject.pathname}`;

  if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}

function getURLsFromHTML(html, baseURL) {
  const urls = [];
  const dom = new JSDOM(html);
  const hyperlinks = dom.window.document.querySelectorAll('a');

  for (const hyperlink of hyperlinks) {
    if (hyperlink.href.slice(0, 1) === '/') {
      try {
        const urlObject = new URL(baseURL + hyperlink.href);
        urls.push(urlObject.href);
      } catch (error) {
        console.log('ERROR: ', error.message);
      }
    } else {
      try {
        const urlObject = new URL(hyperlink.href);
        urls.push(urlObject.href);
      } catch (error) {
        console.log('ERROR: ', error.message);
      }
    }
  }
  return urls;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
};
