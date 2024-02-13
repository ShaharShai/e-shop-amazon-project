import nodemailer from "nodemailer";
import dotenv from "dotenv";
import User from "../models/User.js";
import ResetToken from "../models/ResetToken.js";
import bcrypt from "bcrypt";

dotenv.config();

const userExistsHandler = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const sendEmail = async (email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "music.chai.chai@gmail.com",
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetLink = `http://localhost:5173/reset-password/${token}`;

    const mailOptions = {
      from: "music.chai.chai@gmail.com",
      to: email,
      subject: "Password Reset",
      text: `Click the following link to reset your password: ${resetLink}`,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const generateUniqueToken = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  const tokenLength = 32;

  let token = "";

  for (let i = 0; i < tokenLength; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return token;
};

const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userExistsHandler(email);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const token = generateUniqueToken();

    const newResetToken = new ResetToken({ userId: user._id, token });
    await newResetToken.save();

    await sendEmail(email, token);

    res.json({ success: true, message: "Password reset email sent." });
  } catch (error) {
    console.error("Error requesting password reset:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "An error occurred while processing your request.",
      });
  }
};

const resetPassword = async (req, res) => {
   const { token, newPassword } = req.body;
   
   const tokenDoc = await ResetToken.findOne({ token });

   if (!tokenDoc || tokenDoc.expirationDate < new Date()) {
    return res.status(400).json({ success: false, message: 'Invalid or expired token.' });
   }

   const user = await User.findById(tokenDoc.userId);
   const saltRounds = 10;
   const hashedPassword = bcrypt.hashSync(newPassword, saltRounds);

   user.password = hashedPassword;
   await user.save();

  //  await Token.findByIdAndDelete(tokenDoc._id);

  res.json({ success: true, message: 'Password reset successful.' });

}

export { requestPasswordReset, resetPassword };
