import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const response = NextResponse.json({
      message: '',
      success: true,
      data: null,
    });

    //clear cookie
    response.cookies.set('token', '', {
      httpOnly: true,
      path: '/',
      expires: new Date(0),
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}