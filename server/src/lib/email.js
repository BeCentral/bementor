const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

const { MAILGUN_API_KEY, MAILGUN_DOMAIN } = process.env;
const mailgunOptions = {
  auth: {
    api_key: MAILGUN_API_KEY,
    domain: MAILGUN_DOMAIN
  },
  host: 'api.eu.mailgun.net'
};

const transporter = nodemailer.createTransport(mg(mailgunOptions));
const domain = process.env.FRONTEND_URL || 'localhost:3000';

exports.sendPasswordResetEmail = (toEmail, token) => {
  const mailOptions = {
    from: 'BeMentor <no-reply@bementor.be>',
    to: toEmail,
    subject: 'Reset your password',
    text: `
      You're receiving this email because you submitted a request to reset your BeMentor password.
      Set your new password here: http://${domain}/reset-password/${token}

      If you did not submit this password reset request, you can safely ignore this email.
    `
  };

  return transporter.sendMail(mailOptions);
};

exports.sendAccountConfirmationEmail = (toEmail, token) => {
  const mailOptions = {
    from: 'BeMentor <no-reply@bementor.be>',
    to: toEmail,
    subject: 'Welcome to BeMentor',
    text: `
      Welcome to BeMentor!

      To use the platform to its full extent, please confirm your account.
      You can do so by clicking the following link: http://${domain}/confirm-account/${token}

      If you did not register for BeMentor, you can safely ignore this email.
    `
  };

  return transporter.sendMail(mailOptions);
};
