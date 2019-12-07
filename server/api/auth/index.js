module.exports = (server) => {
  server.get('/auth', require('./send-link'));
  server.get('/auth/admin', require('./authenticate'));
}