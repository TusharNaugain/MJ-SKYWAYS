const nodemailer = require('nodemailer');
require('dotenv').config();

console.log('--- SMTP TEST ---');
console.log('USER:', process.env.SMTP_USER);
console.log('PASS:', process.env.SMTP_PASS ? '********' : 'MISSING');
console.log('HOST:', process.env.SMTP_HOST);
console.log('PORT:', process.env.SMTP_PORT);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error('VERIFY ERROR:', error);
    process.exit(1);
  } else {
    console.log('SERVER IS READY');
    
    // Try sending
    transporter.sendMail({
      from: `"MJS Test" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: 'SMTP Test',
      text: 'If you see this, SMTP is working.'
    }, (err, info) => {
      if (err) {
        console.error('SEND ERROR:', err);
        process.exit(1);
      } else {
        console.log('SEND SUCCESS:', info.messageId);
        process.exit(0);
      }
    });
  }
});
