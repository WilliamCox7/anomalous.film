module.exports = (server) => {
  server.get('/history', require('./get-history'));
}