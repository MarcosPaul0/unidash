import { redirect } from "next/navigation";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { BaseApiClient } from "./baseApiClient";
import { Cookies, COOKIES } from "./cookies";
import { UNIDASH_API_ROUTES } from "@unidash/routes/unidashApi.routes";

export class ApiClient extends BaseApiClient {
  constructor() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!baseUrl) {
      throw new Error("Client Side Base URL is not defined!");
    }

    super(process.env.NEXT_PUBLIC_API_URL!);
  }

  protected async getStoredToken(): Promise<string | null> {
    return await Cookies.get(COOKIES.token);
  }

  protected async storeToken(token: string): Promise<void> {
    await Cookies.set(COOKIES.token, token);
  }

  protected async clearAuthDataAndRedirect(): Promise<void> {
    await Cookies.remove(COOKIES.refreshToken);
    await Cookies.remove(COOKIES.token);

    redirect(APP_ROUTES.public.login);
  }

  protected async fetchRefresh(): Promise<Response> {
    return await fetch(`${this.baseUrl}${UNIDASH_API_ROUTES.auth.refresh}`, {
      method: "PATCH",
      headers: this.headers,
      credentials: "include",
    });
  }

  protected async manageRefreshResponse(
    refreshResponse: Response
  ): Promise<void> {
    const { accessToken } = await refreshResponse.json();

    this.setAuthorizationWithBearerToken(accessToken);

    await Cookies.set(COOKIES.token, accessToken);
  }
}

export const apiClient = await new ApiClient().init();
