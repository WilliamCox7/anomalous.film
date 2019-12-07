const express = require('express');
const next = require('next');
const modules = require('./modules');
    
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
    
app.prepare()
.then(() => {
  const server = express();

  server.get('/auth', modules.auth.sendLink);
  server.get('/auth/admin', modules.auth.authenticate);

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