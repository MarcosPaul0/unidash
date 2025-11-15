import { UNIDASH_API_ROUTES } from "@unidash/routes/unidashApi.routes";
import { createApiSSRClient } from "@unidash/lib/apiClientSSR";
import { CourseTeachingComplementaryActivitiesDataParamsBuilder } from "./courseTeachingComplementaryActivitiesDataParams.builder";
import { FilterCourseTeachingComplementaryActivitiesDataDto } from "@unidash/api/dtos/courseTeachingComplementaryActivitiesData.dto";
import { PaginationDto } from "@unidash/api/dtos/pagination.dto";
import {
  CourseTeachingComplementaryActivitiesDataResponse,
  CourseTeachingComplementaryActivitiesListDataResponse,
} from "@unidash/api/responses/courseTeachingComplementaryActivitiesDataResponse.interface";
import { redirect } from "next/navigation";
import { APP_ROUTES } from "@unidash/routes/app.routes";

export class CourseTeachingComplementaryActivitiesDataSSRService {
  static async getAll(
    courseId: string,
    pagination?: PaginationDto,
    filters?: FilterCourseTeachingComplementaryActivitiesDataDto
  ): Promise<CourseTeachingComplementaryActivitiesListDataResponse> {
    const params = new CourseTeachingComplementaryActivitiesDataParamsBuilder()
      .applyPagination(pagination)
      .applyFilters(filters)
      .build();

    const ssrApiClient = await createApiSSRClient();

    const courseTeachingComplementaryActivitiesResponse =
      await ssrApiClient.get<CourseTeachingComplementaryActivitiesListDataResponse>(
        `${UNIDASH_API_ROUTES.courseTeachingComplementaryActivitiesData.getAll}${courseId}`,
        {
          params,
        }
      );

    if (courseTeachingComplementaryActivitiesResponse === null) {
      redirect(APP_ROUTES.private.dashboard);
    }

    return courseTeachingComplementaryActivitiesResponse;
  }

  static async getById(
    courseTeachingComplementaryActivitiesDataId: string
  ): Promise<CourseTeachingComplementaryActivitiesDataResponse> {
    const ssrApiClient = await createApiSSRClient();

    const courseTeachingComplementaryActivitiesResponse =
      await ssrApiClient.get<CourseTeachingComplementaryActivitiesDataResponse>(
        `${UNIDASH_API_ROUTES.courseTeachingComplementaryActivitiesData.getById}${courseTeachingComplementaryActivitiesDataId}`
      );

    if (courseTeachingComplementaryActivitiesResponse === null) {
      redirect(APP_ROUTES.private.dashboard);
    }

    return courseTeachingComplementaryActivitiesResponse;
  }
}
