import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

const serviceID = "service_0vs7pe5";
const templateID = "template_9gn2ias";
const publicKey = "o76Q438Kjx0uR6bvW";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'music.chai.chai@gmail.com',
    pass: process.env.EMAIL_PASS,
  },
});


  const func1 = async () => {
    const mailOptions = {
      from: 'music.chai.chai@gmail.com',
      to: 'shahars839@gmail.com',
      subject: 'Password Reset',
      text: `Click the following link to reset your password: resetLink !`,
    };
    await transporter.sendMail(mailOptions);
  };

  func1();

