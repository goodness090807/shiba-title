import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  if (!password) {
    return NextResponse.json({ error: "密碼是必填的" }, { status: 400 });
  }

  // 產生密碼雜湊
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return NextResponse.json({ hashedPassword }, { status: 200 });
}
