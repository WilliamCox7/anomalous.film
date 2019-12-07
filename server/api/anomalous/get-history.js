let db = require('../../database');

module.exports = async (req, res) => {
  const conn = await db.connection();
  
  return conn.query(`SELECT * FROM history`)
  .then((results) => res.status(200).send(results));
}