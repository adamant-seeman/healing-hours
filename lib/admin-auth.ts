import { createHash } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "healing_hour_admin";

function adminToken() {
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    throw new Error("Missing environment variable: ADMIN_PASSWORD");
  }

  return createHash("sha256").update(password).digest("hex");
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value === adminToken();
}

export async function setAdminCookie() {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, adminToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 8
  });
}
