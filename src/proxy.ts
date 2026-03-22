import createMiddleware from 'next-intl/middleware';
import {NextRequest, NextResponse} from 'next/server';

import {routing} from '@/i18n/routing';
import {
  ADMIN_AUTH_COOKIE,
  getSafeAdminRedirectPath,
  isValidAdminSessionToken,
} from '@/lib/adminAuth';

const intlMiddleware = createMiddleware(routing);

function getLocaleFromPathname(pathname: string) {
  return (
    routing.locales.find(
      (locale) => pathname === '/' + locale || pathname.startsWith('/' + locale + '/'),
    ) ?? routing.defaultLocale
  );
}

function isAdminPath(pathname: string) {
  return routing.locales.some(
    (locale) =>
      pathname === '/' + locale + '/admin' || pathname.startsWith('/' + locale + '/admin/'),
  );
}

function isAdminLoginPath(pathname: string) {
  return routing.locales.some(
    (locale) => pathname === '/' + locale + '/admin/login',
  );
}

export default async function proxy(request: NextRequest) {
  const response = intlMiddleware(request);
  const pathname = request.nextUrl.pathname;

  if (!isAdminPath(pathname)) {
    return response;
  }

  const locale = getLocaleFromPathname(pathname);
  const sessionToken = request.cookies.get(ADMIN_AUTH_COOKIE)?.value;
  const isAuthenticated = await isValidAdminSessionToken(sessionToken);

  if (isAdminLoginPath(pathname)) {
    if (!isAuthenticated) {
      return response;
    }

    return NextResponse.redirect(
      new URL(getSafeAdminRedirectPath(locale), request.url),
    );
  }

  if (isAuthenticated) {
    return response;
  }

  const loginUrl = new URL('/' + locale + '/admin/login', request.url);
  loginUrl.searchParams.set('next', pathname);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
