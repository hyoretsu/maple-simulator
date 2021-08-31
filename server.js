/* eslint-disable no-console */
const fs = require('fs');
const { createServer } = require('https');
const next = require('next');
const path = require('path');
const { parse } = require('url');

const app = next({ dev: true });

app.prepare().then(() => {
 const handle = app.getRequestHandler();
 const httpsOptions = {
  key: fs.readFileSync(path.resolve(__dirname, '..', 'private.key')),
  cert: fs.readFileSync(path.resolve(__dirname, '..', 'private.crt')),
 };
 const port = process.env.PORT || 3000;

 const server = createServer(httpsOptions, (req, res) => {
  handle(req, res, parse(req.url, true));
 });

 server.listen(port, () => {
  console.log(`ready - started server on url: https://localhost:${port}`);
 });
});
