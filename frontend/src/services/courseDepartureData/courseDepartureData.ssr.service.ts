import { UNIDASH_API_ROUTES } from "@unidash/routes/unidashApi.routes";
import { createApiSSRClient } from "@unidash/lib/apiClientSSR";
import { CourseDepartureDataParamsBuilder } from "./courseDepartureDataParams.builder";
import { FilterCourseDepartureDataDto } from "@unidash/api/dtos/courseDepartureData.dto";
import { PaginationDto } from "@unidash/api/dtos/pagination.dto";
import {
  CourseDepartureDataResponse,
  CourseDepartureListDataResponse,
} from "@unidash/api/responses/courseDepartureDataResponse.interface";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { redirect } from "next/navigation";

export class CourseDepartureDataSSRService {
  static async getAll(
    courseId: string,
    pagination?: PaginationDto,
    filters?: FilterCourseDepartureDataDto
  ): Promise<CourseDepartureListDataResponse> {
    const params = new CourseDepartureDataParamsBuilder()
      .applyPagination(pagination)
      .applyFilters(filters)
      .build();

    const ssrApiClient = await createApiSSRClient();

    const courseDepartureResponse =
      await ssrApiClient.get<CourseDepartureListDataResponse>(
        `${UNIDASH_API_ROUTES.courseDepartureData.getAll}${courseId}`,
        {
          params,
        }
      );

    if (courseDepartureResponse === null) {
      redirect(APP_ROUTES.private.dashboard);
    }

    return courseDepartureResponse;
  }

  static async getById(
    courseDepartureDataId: string
  ): Promise<CourseDepartureDataResponse> {
    const ssrApiClient = await createApiSSRClient();

    const courseDepartureResponse =
      await ssrApiClient.get<CourseDepartureDataResponse>(
        `${UNIDASH_API_ROUTES.courseDepartureData.getById}${courseDepartureDataId}`
      );

    if (courseDepartureResponse === null) {
      redirect(APP_ROUTES.private.dashboard);
    }

    return courseDepartureResponse;
  }
}
