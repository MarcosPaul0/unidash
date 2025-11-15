import { COOKIES } from "@unidash/lib/cookies";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { NextRequest, NextResponse } from "next/server";
import { UNIDASH_API_ROUTES } from "./routes/unidashApi.routes";
import { HTTP_STATUS } from "./lib/baseApiClient";

export const publicRoutes: string[] = Object.values(APP_ROUTES.public);

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const formattedPathname = pathname.replace(
    /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/,
    ""
  );

  const isPublicRoute = publicRoutes.includes(formattedPathname);

  const nextResponse = NextResponse.next();

  if (isPublicRoute) {
    return nextResponse;
  }

  const token = req.cookies.get(COOKIES.token)?.value;

  if (!token) {
    return clearCookiesAndRedirect(req, pathname);
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_SIDE_API_URL;

    const response = await fetch(
      `${baseUrl}${UNIDASH_API_ROUTES.auth.validateSession}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      }
    );

    if (response.ok) {
      return nextResponse;
    }

    const errorResponse = await response.json();

    if (errorResponse.statusCode !== HTTP_STATUS.unauthorized) {
      return clearCookiesAndRedirect(req, pathname);
    }

    const refreshToken = req.cookies.get(COOKIES.refreshToken)?.value;

    const refreshResponse = await fetch(
      `${baseUrl}${UNIDASH_API_ROUTES.auth.refresh}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: `${COOKIES.refreshToken}=${refreshToken}`,
        },
      }
    );

    if (!refreshResponse.ok) {
      // TODO adicionar notificação via DISCORD
      return clearCookiesAndRedirect(req, pathname);
    }

    const { accessToken } = await refreshResponse.json();

    nextResponse.cookies.set(COOKIES.token, accessToken, {
      path: "/",
    });

    const setCookies = refreshResponse.headers.getSetCookie();

    if (setCookies.length > 0) {
      const newRefreshTokenSetCookie = setCookies[0].split(";")[0];
      const newRefreshToken = newRefreshTokenSetCookie.split("=")[1];

      nextResponse.cookies.set(COOKIES.refreshToken, newRefreshToken, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
    }
  } catch {
    // TODO adicionar notificação via DISCORD
    return clearCookiesAndRedirect(req, pathname);
  }

  return nextResponse;
}

function clearCookiesAndRedirect(req: NextRequest, pathname: string) {
  const nextResponse = NextResponse.redirect(
    new URL(`${APP_ROUTES.public.login}?next=${pathname}`, req.nextUrl)
  );

  nextResponse.cookies.delete(COOKIES.token);
  nextResponse.cookies.delete(COOKIES.refreshToken);

  return nextResponse;
}

export const config = {
  matcher: [
    "/((?!favicon.ico|robots.txt|api|_next/static|_next/image|.*\\.png$).*)",
  ],
};
