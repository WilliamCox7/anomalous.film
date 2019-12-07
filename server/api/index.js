module.exports = (server) => {
  require('./auth')(server);
  require('./anomalous')(server);
}