/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponseError } from "@unidash/api/errors/apiResponse.error";
import { UNIDASH_API_ROUTES } from "@unidash/routes/unidashApi.routes";

export const HTTP_STATUS = {
  ok: 200,
  created: 201,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  internal: 500,
} as const;

export type HttpStatus = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS];

interface RequestOptions extends RequestInit {
  params?: any;
}

export abstract class BaseApiClient {
  protected baseUrl?: string;
  protected headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  private refreshPromise: Promise<void> | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  protected abstract getStoredToken(): Promise<string | null>;
  protected abstract clearAuthDataAndRedirect(): Promise<void>;
  protected abstract fetchRefresh(): Promise<Response>;
  protected abstract manageRefreshResponse(
    refreshResponse: Response
  ): Promise<void>;

  public async init(): Promise<this> {
    const token = await this.getStoredToken();

    if (token) {
      this.setAuthorizationWithBearerToken(token);
    }

    return this;
  }

  private async refresh(): Promise<void> {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = (async () => {
      try {
        const refreshResponse = await this.fetchRefresh();

        if (!refreshResponse.ok) {
          const errorResponse = await refreshResponse.json();

          throw new ApiResponseError(
            errorResponse.message,
            errorResponse.error,
            errorResponse.statusCode,
            UNIDASH_API_ROUTES.auth.refresh
          );
        }

        await this.manageRefreshResponse(refreshResponse);
      } catch (error) {
        this.clearAuthDataAndRedirect();
        throw error;
      } finally {
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  private response<T>(textResponse?: string): T {
    return !!textResponse && textResponse.length > 0
      ? (JSON.parse(textResponse) as T)
      : (null as T);
  }

  private async request<T>(
    endpoint: string,
    { params, ...options }: RequestOptions
  ): Promise<T> {
    if (this.refreshPromise) {
      await this.refreshPromise;
    }

    const config = {
      ...options,
      method: options.method || "GET",
      headers: { ...this.headers, ...options.headers },
      body: options.body ? JSON.stringify(options.body) : null,
      credentials: "include" as RequestCredentials,
    };

    const searchParams = params ? new URLSearchParams(params) : "";

    const response = await fetch(
      `${this.baseUrl}${endpoint}?${searchParams}`,
      config
    );

    if (!response.ok) {
      if (
        response.status === HTTP_STATUS.unauthorized &&
        endpoint != UNIDASH_API_ROUTES.auth.login
      ) {
        await this.refresh();

        return await this.request<T>(endpoint, { params, ...options });
      }

      const errorResponse = await response.json();

      throw new ApiResponseError(
        errorResponse.message,
        errorResponse.error,
        errorResponse.statusCode,
        endpoint
      );
    }

    const textResponse = await response.text();
    return this.response<T>(textResponse);
  }

  public setAuthorizationWithBearerToken(token: string): void {
    this.headers = {
      ...this.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  public get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  public post<T>(
    endpoint: string,
    body: any,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "POST", body });
  }

  public put<T>(
    endpoint: string,
    body: any,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "PUT", body });
  }

  public patch<T>(
    endpoint: string,
    body?: any,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "PATCH", body });
  }

  public delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }

  public async upload<T>(
    endpoint: string,
    formData: FormData,
    onProgress?: (progress: number) => void
  ): Promise<T> {
    if (this.refreshPromise) {
      await this.refreshPromise;
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `${this.baseUrl}${endpoint}`, true);

      if (
        this.headers &&
        (this.headers as Record<string, string>)?.Authorization
      ) {
        xhr.setRequestHeader(
          "Authorization",
          (this.headers as Record<string, string>)?.Authorization
        );
      }

      if (onProgress) {
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            onProgress((event.loaded / event.total) * 100);
          }
        };
      }

      xhr.onload = async () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            resolve(this.response<T>(xhr.responseText));
          } catch (error) {
            reject(error);
          }
        } else if (xhr.status === HTTP_STATUS.unauthorized) {
          // Tenta fazer refresh e reenviar a requisição
          try {
            await this.refresh();
            // Reenvia a requisição após o refresh
            const result = await this.upload<T>(endpoint, formData, onProgress);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        } else {
          try {
            const errorResponse = JSON.parse(xhr.responseText);

            reject(
              new ApiResponseError(
                errorResponse.message,
                errorResponse.error,
                errorResponse.statusCode,
                endpoint
              )
            );
          } catch {
            reject(new Error(`Request failed with status ${xhr.status}`));
          }
        }
      };

      xhr.onerror = () => reject(new Error("Request failed"));
      xhr.send(formData);
    });
  }
}
