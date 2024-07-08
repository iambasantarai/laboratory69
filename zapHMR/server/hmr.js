const fs = require('node:fs');
const url = require('node:url');
const path = require('node:path');
const http = require('node:http');

const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log(`[${req.method}] ${req.url}`);

  // based on the URL path, extract the file extension. e.g. .js, .json
  const parsedURL = url.parse(req.url);
  const pathName = parsedURL.pathname;

  const extensionToMimeType = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
  };

  const filePath = path.join(
    process.cwd(),
    pathName === '/' ? '/index.html' : pathName,
  );

  const extension = path.extname(filePath);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.statusCode = 404;
      res.end(`File ${pathName} not found!`);
      return;
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        res.setHeader(
          'Content-type',
          extensionToMimeType[extension] || 'text/plain',
        );
        res.writeHead(200);
        res.end(data);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
