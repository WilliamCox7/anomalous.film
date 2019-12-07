const express = require('express');
const next = require('next');
const api = require('./api');
    
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
    
app.prepare()
.then(() => {
  const server = express();
  api(server);
  server.get('*', (req, res) => handle(req, res));
  server.listen(3000, (err) => {
    if (err) throw err
    console.log('[ server ] ready at http://localhost:3000');
  });
})
.catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});