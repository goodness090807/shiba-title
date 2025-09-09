import { prisma } from "@/libs/prisma";
import { createSession } from "@/libs/session";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ message: "電子郵件和密碼是必填的" }, { status: 400 });
  }
  const manager = await prisma.managers.findUnique({
    where: { email },
  });

  if (!manager || bcrypt.compareSync(password, manager.passwordHash) === false) {
    return NextResponse.json({ message: "無效的電子郵件或密碼" }, { status: 401 });
  }

  await createSession(manager.id);

  return NextResponse.json({
    id: manager.id,
    email: manager.email,
    name: manager.name,
  });
}
