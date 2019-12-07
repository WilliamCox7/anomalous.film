const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const config = require('../../config');

module.exports = (req, res) => {
  const token = generate(config.admin.email);
  sendEmail(token);
  return res.status(200).send("An email has been sent to your inbox!");
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