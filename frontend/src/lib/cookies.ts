import { getCookie, deleteCookie, setCookie } from "cookies-next";

export const COOKIES = {
  refreshToken: "unidash_refreshToken",
  token: "unidash_token",
} as const;

export class Cookies {
  public static async set(cookie: string, value: string): Promise<void> {
    await setCookie(cookie, value, {
      path: "/",
    });
  }

  public static async remove(cookie: string): Promise<void> {
    await deleteCookie(cookie, {
      path: "/",
    });
  }

  public static async get(cookie: string): Promise<string | null> {
    const result = await getCookie(cookie, {
      path: "/",
    });

    return result ? String(result) : null;
  }
}
