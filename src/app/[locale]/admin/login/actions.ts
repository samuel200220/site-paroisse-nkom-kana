"use server";

import {cookies} from "next/headers";
import {redirect} from "next/navigation";

import {
  ADMIN_AUTH_COOKIE,
  areAdminCredentialsValid,
  createAdminSessionToken,
  getAdminSessionCookieOptions,
  getSafeAdminRedirectPath,
} from "@/lib/adminAuth";

export type AdminLoginState = {
  error: "" | "invalid_credentials";
};

export async function loginAdminAction(
  locale: string,
  nextPath: string | undefined,
  _previousState: AdminLoginState,
  formData: FormData,
): Promise<AdminLoginState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!areAdminCredentialsValid(username, password)) {
    return {error: "invalid_credentials"};
  }

  const cookieStore = await cookies();
  cookieStore.set(
    ADMIN_AUTH_COOKIE,
    await createAdminSessionToken(),
    getAdminSessionCookieOptions(),
  );

  redirect(getSafeAdminRedirectPath(locale, nextPath));
}

export async function logoutAdminAction(locale: string) {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_AUTH_COOKIE);

  redirect(`/${locale}/admin/login`);
}
