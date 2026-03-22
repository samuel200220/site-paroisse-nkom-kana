export const ADMIN_AUTH_COOKIE = "admin_session";

const DEFAULT_ADMIN_USERNAME = "admin";
const DEFAULT_ADMIN_PASSWORD = "eglise2026";
const DEFAULT_ADMIN_SESSION_SECRET = "change-me-in-production";

function getAdminUsername() {
  return process.env.ADMIN_USERNAME ?? DEFAULT_ADMIN_USERNAME;
}

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD ?? DEFAULT_ADMIN_PASSWORD;
}

function getAdminSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? DEFAULT_ADMIN_SESSION_SECRET;
}

async function sha256(input: string) {
  const buffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(input),
  );

  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function createAdminSessionToken() {
  return sha256(
    `${getAdminUsername()}:${getAdminPassword()}:${getAdminSessionSecret()}`,
  );
}

export async function isValidAdminSessionToken(token?: string) {
  if (!token) {
    return false;
  }

  const expectedToken = await createAdminSessionToken();
  return token === expectedToken;
}

export function areAdminCredentialsValid(username: string, password: string) {
  return username === getAdminUsername() && password === getAdminPassword();
}

export function getAdminSessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "strict" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  };
}

export function getSafeAdminRedirectPath(locale: string, nextPath?: string) {
  if (
    nextPath &&
    nextPath.startsWith(`/${locale}/admin`) &&
    !nextPath.startsWith(`/${locale}/admin/login`)
  ) {
    return nextPath;
  }

  return `/${locale}/admin`;
}
