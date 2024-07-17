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

async function crawlPage(url) {
  console.log('Actively crawling: ', url);

  try {
    const response = await fetch(url);
    if (response.status > 399) {
      console.log(
        `Error in fetch with status code: ${response.status}, on page: ${url}.`,
      );
      return;
    }

    const contentType = response.headers.get('content-type');
    if (!contentType.includes('text/html')) {
      console.log(
        `Non html response, conent type: ${contentType}, on page: ${url}.`,
      );
      return;
    }

    console.log(await response.text());
  } catch (error) {
    console.log(`Error in fetch: ${error.message}, on page: ${url}.`);
  }
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
