import { AdminResponse } from "@unidash/api/responses/admin.response";
import { createApiSSRClient } from "@unidash/lib/apiClientSSR";
import { UNIDASH_API_ROUTES } from "@unidash/routes/unidashApi.routes";

export class AdminSSRService {
  public static async getBySession(): Promise<AdminResponse> {
    const ssrApiClient = await createApiSSRClient();

    const adminResponse = await ssrApiClient.get<AdminResponse>(
      UNIDASH_API_ROUTES.admin.getBySession
    );

    return adminResponse;
  }
}
