import { validateTokenAndGetUserId } from "@/helpers/tokenValidation";
import { NextRequest, NextResponse } from "next/server";
import User from '@/models/userModel';
import { connectDB } from "@/config/dbConfig";
connectDB();

export async function GET(req: NextRequest) {
  try {
    const userId = await validateTokenAndGetUserId(req);
    const user = await User.findOne({ _id: userId });

    return NextResponse.json({ message: 'Get request success', data: user })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}