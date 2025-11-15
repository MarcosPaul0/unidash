import { COOKIES } from "@unidash/lib/cookies";
import { UNIDASH_API_ROUTES } from "@unidash/routes/unidashApi.routes";
import { NextResponse } from "next/server";

export async function POST() {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_SIDE_API_URL;

  const refreshResponse = await fetch(
    `${baseUrl}${UNIDASH_API_ROUTES.auth.refresh}`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  if (!refreshResponse.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { accessToken, refreshToken } = await refreshResponse.json();

  const res = NextResponse.json({ accessToken });

  res.cookies.set(COOKIES.token, accessToken, {
    path: "/",
  });

  res.cookies.set(COOKIES.refreshToken, refreshToken, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  return res;
}
