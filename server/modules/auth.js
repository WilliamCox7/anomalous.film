const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const config = require('../config');

module.exports = {

  sendLink: (req, res) => {
    const token = generate(config.admin.email);
    sendEmail(token);
    return res.status(200).send("An email has been sent to your inbox!");
  },

  authenticate: (req, res) => {
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

}

function generate(email) {
  const date = new Date();
  date.addDays(1000);
  return jwt.sign({ email, expiration: date }, config.jwt.secret);
}

function sendEmail(token) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.anom.email,
      pass: config.anom.password
    }
  });

  return transporter.sendMail({
    from: config.anom.email,
    to: config.admin.email,
    subject: 'Fingerprint By Anomalous Film',
    html: `<div>Click <a href="${config.host}/admin/authenticate?token=${token}">here</a> to submit your fingerprint into evidence</div>`
  });
}

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}