import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { BaseApiClient } from "./baseApiClient";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { COOKIES } from "./cookies";

export class ApiSSRClient extends BaseApiClient {
  constructor() {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_SIDE_API_URL;

    if (!baseUrl) {
      throw new Error("Server Side Base URL is not defined!");
    }

    super(process.env.NEXT_PUBLIC_SERVER_SIDE_API_URL!);
  }

  protected async getStoredToken(): Promise<string | null> {
    const cookiesSSRStore = await cookies();

    const cookieToken = cookiesSSRStore.get(COOKIES.token);

    return cookieToken?.value || null;
  }

  protected async clearAuthDataAndRedirect(): Promise<void> {
    redirect(APP_ROUTES.public.login);
  }

  protected async fetchRefresh(): Promise<Response> {
    return await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/refresh`, {
      method: "PATCH",
      credentials: "include",
    });
  }

  protected async manageRefreshResponse(
    refreshResponse: Response
  ): Promise<void> {
    const { accessToken } = await refreshResponse.json();

    this.setAuthorizationWithBearerToken(accessToken);
  }
}

export async function createApiSSRClient() {
  return await new ApiSSRClient().init();
}
