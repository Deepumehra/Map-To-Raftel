// Import modules
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const User = require('../models/userModel'); // Mongoose User model

// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
// Generate and send OTP
const sendOTPEmail = async (userEmail) => {
  const otp = crypto.randomInt(100000, 999999); // Generate a 6-digit OTP
  const hashedOTP = await bcrypt.hash(otp.toString(), 10); // Hash for security
  
  // Save OTP in the user record in the database
  const user = await User.findOneAndUpdate(
    { email: userEmail },
    { otp: hashedOTP, otpExpiresAt: Date.now() + 300000 }, // OTP valid for 5 minutes
    { new: true }
  );

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Email Verification OTP',
    text: `Your OTP for email verification is: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};
module.exports=sendOTPEmail;