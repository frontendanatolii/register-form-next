import nodemailer from 'nodemailer';
import Token from '@/models/tokenModel';
import bcryptjs from 'bcryptjs';

export const sendEmail =async ({
  emailType,
  email,
  userId,
}: any) => {
  try {
    const token = await bcryptjs.hash(userId.toString(), 10)

    const newToken = new Token({
      userId: userId.toString(),
      token,
      emailType,
    })

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      service: 'gmail',
      auth: {
        user: process.env.auth_email,
        pass: process.env.auth_password
      }
    });

    await newToken.save();

    const mailOptions: any = {
      from: process.env.auth_email,
      to: email,
    };

    if (emailType === 'emailVerification') {
      mailOptions.subject = 'Email Verification';
      mailOptions.html = `
        <h1>Click on the link below to verify email</h1>
        <a href='${process.env.domain}/verifyemail?token=${token}'>Verify email</a>
      `;
    } else {
      mailOptions.subject = 'Reset password';
      mailOptions.html = `
        <h1>Click on the link below to reset your password</h1>
        <a href='${process.env.domain}/resetpassword?token=${token}'>Reset password</a>
      `;
    }

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message)
  }
}