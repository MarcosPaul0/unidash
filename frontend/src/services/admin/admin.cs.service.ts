import { AdminResponse } from "@unidash/api/responses/admin.response";
import { apiClient } from "@unidash/lib/apiClient";
import { UNIDASH_API_ROUTES } from "@unidash/routes/unidashApi.routes";

export class AdminCSService {
  public static async getBySession(): Promise<AdminResponse> {
    const adminResponse = await apiClient.get<AdminResponse>(
      UNIDASH_API_ROUTES.admin.getBySession
    );

    return adminResponse;
  }
}
