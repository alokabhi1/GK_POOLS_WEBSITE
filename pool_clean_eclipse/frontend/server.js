const http = require("http");
const fs = require("fs");
const path = require("path");

const port = Number(process.env.PORT || 8000);
const root = __dirname;
const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
};

http
  .createServer((request, response) => {
    const requestUrl = new URL(request.url, `http://localhost:${port}`);
    const requestedPath = requestUrl.pathname === "/" ? "/index.html" : requestUrl.pathname;
    const filePath = path.normalize(path.join(root, requestedPath));

    if (!filePath.startsWith(root)) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    fs.readFile(filePath, (error, content) => {
      if (error) {
        response.writeHead(404);
        response.end("Not found");
        return;
      }

      response.writeHead(200, {
        "Content-Type": contentTypes[path.extname(filePath)] || "application/octet-stream",
      });
      response.end(content);
    });
  })
  .listen(port, () => {
    console.log(`Frontend running at http://localhost:${port}`);
  });
