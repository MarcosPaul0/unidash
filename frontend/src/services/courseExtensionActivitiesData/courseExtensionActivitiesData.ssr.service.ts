import { UNIDASH_API_ROUTES } from "@unidash/routes/unidashApi.routes";
import { createApiSSRClient } from "@unidash/lib/apiClientSSR";
import { CourseExtensionActivitiesDataParamsBuilder } from "./courseExtensionActivitiesDataParams.builder";
import { FilterCourseExtensionActivitiesDataDto } from "@unidash/api/dtos/courseExtensionActivitiesData.dto";
import { PaginationDto } from "@unidash/api/dtos/pagination.dto";
import {
  CourseExtensionActivitiesDataResponse,
  CourseExtensionActivitiesListDataResponse,
} from "@unidash/api/responses/courseExtensionActivitiesDataResponse.interface";
import { redirect } from "next/navigation";
import { APP_ROUTES } from "@unidash/routes/app.routes";

export class CourseExtensionActivitiesDataSSRService {
  static async getAll(
    courseId: string,
    pagination?: PaginationDto,
    filters?: FilterCourseExtensionActivitiesDataDto
  ): Promise<CourseExtensionActivitiesListDataResponse> {
    const params = new CourseExtensionActivitiesDataParamsBuilder()
      .applyPagination(pagination)
      .applyFilters(filters)
      .build();

    const ssrApiClient = await createApiSSRClient();

    const courseExtensionActivitiesResponse =
      await ssrApiClient.get<CourseExtensionActivitiesListDataResponse>(
        `${UNIDASH_API_ROUTES.courseExtensionActivitiesData.getAll}${courseId}`,
        {
          params,
        }
      );

    if (courseExtensionActivitiesResponse === null) {
      redirect(APP_ROUTES.private.dashboard);
    }

    return courseExtensionActivitiesResponse;
  }

  static async getById(
    courseExtensionActivitiesDataId: string
  ): Promise<CourseExtensionActivitiesDataResponse> {
    const ssrApiClient = await createApiSSRClient();

    const courseExtensionActivitiesResponse =
      await ssrApiClient.get<CourseExtensionActivitiesDataResponse>(
        `${UNIDASH_API_ROUTES.courseExtensionActivitiesData.getById}${courseExtensionActivitiesDataId}`
      );

    if (courseExtensionActivitiesResponse === null) {
      redirect(APP_ROUTES.private.dashboard);
    }

    return courseExtensionActivitiesResponse;
  }
}
