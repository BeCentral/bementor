const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.sparkpostmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'SMTP_Injection',
    pass: process.env.SPARKPOST_API_KEY
  }
});

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
