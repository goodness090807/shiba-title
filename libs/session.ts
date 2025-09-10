import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export type SessionPayload = {
  userId: string;
  expiresAt?: Date;
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = ""): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch {
    return null;
  }
}

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt });
  const cookieStore = await cookies();

  // 在開發環境或 IP 訪問時使用較寬鬆的 cookie 設定
  const isProduction = process.env.NODE_ENV === "production";

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: isProduction, // 僅在生產環境強制 HTTPS
    expires: expiresAt,
    sameSite: isProduction ? "strict" : "lax", // 開發環境使用 lax
    path: "/",
  });
}

// 移除 session
export async function removeSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) {
    return null;
  }

  const payload = await decrypt(session);
  if (!payload) {
    return null;
  }

  return {
    userId: payload.userId as string,
    expiresAt: payload.expiresAt ? new Date(payload.expiresAt as string) : undefined,
  };
}

export async function isAuthenticated() {
  const session = await getSession();
  return session !== null && (!session.expiresAt || session.expiresAt > new Date());
}
