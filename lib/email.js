const nodemailer = require('nodemailer')

module.exports = (credentials) => {
  const mailTransport = nodemailer.createTransport('SMTP', {
    service: 'Gmail',
    auth: {
      user: credentials.gmail.user,
      pass: credentials.gmail.password
    }
  })
}
