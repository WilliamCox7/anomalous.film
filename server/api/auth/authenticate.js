const config = require('../../config');
const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  const { token } = req.query;
  jwt.verify(token, config.jwt.secret, (err, decoded) => {
    if (err) {
      return res.status(403).send({ error: err });
    }
    if (!decoded.email || !decoded.expiration) {
      return res.status(403).send({ error: 'jwt verification failed' });
    }
    if (decoded.expiration < new Date()) {
      return res.status(403).send({ error: 'token has expired' });
    }
    if (config.admin.email !== decoded.email) {
      return res.status(403).send("You do not have admin privileges"); 
    }
    return res.status(200).send("You have admin privileges!");
  });
}