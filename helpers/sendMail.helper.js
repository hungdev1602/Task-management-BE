// Import the Nodemailer library
const nodemailer = require('nodemailer');

module.exports.sendMail = async (email, subject, text) => {
  // Create a transporter object
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // use false for STARTTLS; true for SSL on port 465
  auth: {
    user: process.env.EMAIL_ADMIN,
    pass: process.env.EMAIL_PASS_APP,
  }
});

// Configure the mailoptions object
const mailOptions = {
  from: process.env.EMAIL_ADMIN,
  to: email,
  subject: subject,
  html: text
};

// Send the email
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log('Error:', error);
  } else {
    console.log('Email sent: ', info.response);
  }
});
}