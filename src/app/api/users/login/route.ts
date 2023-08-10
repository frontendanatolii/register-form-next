import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/config/dbConfig";
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
connectDB();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();

    const user = await User.findOne({ email: reqBody.email });

    if (!user) {
      throw new Error('User does not exists!');
    }

    const isPasswordCorrect = await bcrypt.compare(
      reqBody.password,
      user.password,
    );

    if(!isPasswordCorrect) {
      throw new Error('Invalid credentials!');
    }

    if (!user.isEmailVerified) {
      throw new Error('Email is not verified')
    }

    const dataToEncrypt = {
      _id: user._id,
      name: user.name,
      email: user.email,
    }

    const token = jwt.sign(dataToEncrypt, process.env.jwt_secret!, {
      expiresIn: '1d',
    });

    const response = NextResponse.json({
      message: 'Successfully log in',
      success: true,
      data: null,
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      path: '/',
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}