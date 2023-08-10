import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/config/dbConfig";
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';
import { sendEmail } from "@/helpers/sendEmail";

connectDB();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();

    const user = await User.findOne({ email: reqBody.email });

    if (user) {
      throw new Error('User already exists!');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(reqBody.password, salt);
    reqBody.password = hashedPassword;

    const newUser = new User(reqBody);
    const newUserResponse = await newUser.save();

    //send email verification
    await sendEmail({
      email: newUser.email,
      emailType: 'emailVerification',
      userId: newUserResponse._id,
    })

    return NextResponse.json({
      message: 'Successfully add a new user',
      success: true,
    })
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}