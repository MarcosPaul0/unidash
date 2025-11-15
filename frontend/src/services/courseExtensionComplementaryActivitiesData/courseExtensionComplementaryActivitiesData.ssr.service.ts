import { UNIDASH_API_ROUTES } from "@unidash/routes/unidashApi.routes";
import { createApiSSRClient } from "@unidash/lib/apiClientSSR";
import { CourseExtensionComplementaryActivitiesDataParamsBuilder } from "./courseExtensionComplementaryActivitiesDataParams.builder";
import { FilterCourseExtensionComplementaryActivitiesDataDto } from "@unidash/api/dtos/courseExtensionComplementaryActivitiesData.dto";
import { PaginationDto } from "@unidash/api/dtos/pagination.dto";
import {
  CourseExtensionComplementaryActivitiesDataResponse,
  CourseExtensionComplementaryActivitiesListDataResponse,
} from "@unidash/api/responses/courseExtensionComplementaryActivitiesDataResponse.interface";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { redirect } from "next/navigation";

export class CourseExtensionComplementaryActivitiesDataSSRService {
  static async getAll(
    courseId: string,
    pagination?: PaginationDto,
    filters?: FilterCourseExtensionComplementaryActivitiesDataDto
  ): Promise<CourseExtensionComplementaryActivitiesListDataResponse> {
    const params = new CourseExtensionComplementaryActivitiesDataParamsBuilder()
      .applyPagination(pagination)
      .applyFilters(filters)
      .build();

    const ssrApiClient = await createApiSSRClient();

    const courseExtensionComplementaryActivitiesResponse =
      await ssrApiClient.get<CourseExtensionComplementaryActivitiesListDataResponse>(
        `${UNIDASH_API_ROUTES.courseExtensionComplementaryActivitiesData.getAll}${courseId}`,
        {
          params,
        }
      );

    if (courseExtensionComplementaryActivitiesResponse === null) {
      redirect(APP_ROUTES.private.dashboard);
    }

    return courseExtensionComplementaryActivitiesResponse;
  }

  static async getById(
    courseExtensionComplementaryActivitiesDataId: string
  ): Promise<CourseExtensionComplementaryActivitiesDataResponse> {
    const ssrApiClient = await createApiSSRClient();

    const courseExtensionComplementaryActivitiesResponse =
      await ssrApiClient.get<CourseExtensionComplementaryActivitiesDataResponse>(
        `${UNIDASH_API_ROUTES.courseExtensionComplementaryActivitiesData.getById}${courseExtensionComplementaryActivitiesDataId}`
      );

    if (courseExtensionComplementaryActivitiesResponse === null) {
      redirect(APP_ROUTES.private.dashboard);
    }

    return courseExtensionComplementaryActivitiesResponse;
  }
}
