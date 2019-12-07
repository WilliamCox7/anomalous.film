const config = require('../config');
const mysql = require('promise-mysql');

let Connection;

module.exports = () => {
  if (Connection) return Connection;
  return mysql.createPool(config.mysql)
  .then((master) => {
    Connection = {
      query: master.query.bind(master),
      escape: master.escape.bind(master)
    };
    return Connection;
  });
}