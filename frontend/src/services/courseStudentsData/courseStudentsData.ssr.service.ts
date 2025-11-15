import { UNIDASH_API_ROUTES } from "@unidash/routes/unidashApi.routes";
import { createApiSSRClient } from "@unidash/lib/apiClientSSR";
import { CourseStudentsDataParamsBuilder } from "./courseStudentsDataParams.builder";
import { FilterCourseStudentsDataDto } from "@unidash/api/dtos/courseStudentsData.dto";
import { PaginationDto } from "@unidash/api/dtos/pagination.dto";
import {
  CourseStudentsDataResponse,
  CourseStudentsListDataResponse,
} from "@unidash/api/responses/courseStudentsDataResponse.interface";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { redirect } from "next/navigation";

export class CourseStudentsDataSSRService {
  static async getAll(
    courseId: string,
    pagination?: PaginationDto,
    filters?: FilterCourseStudentsDataDto
  ): Promise<CourseStudentsListDataResponse> {
    const params = new CourseStudentsDataParamsBuilder()
      .applyPagination(pagination)
      .applyFilters(filters)
      .build();

    const ssrApiClient = await createApiSSRClient();

    const courseStudentsResponse =
      await ssrApiClient.get<CourseStudentsListDataResponse>(
        `${UNIDASH_API_ROUTES.courseStudentsData.getAll}${courseId}`,
        {
          params,
        }
      );

    if (courseStudentsResponse === null) {
      redirect(APP_ROUTES.private.dashboard);
    }

    return courseStudentsResponse;
  }

  static async getById(
    courseStudentsDataId: string
  ): Promise<CourseStudentsDataResponse> {
    const ssrApiClient = await createApiSSRClient();

    const courseStudentsResponse =
      await ssrApiClient.get<CourseStudentsDataResponse>(
        `${UNIDASH_API_ROUTES.courseStudentsData.getById}${courseStudentsDataId}`
      );

    if (courseStudentsResponse === null) {
      redirect(APP_ROUTES.private.dashboard);
    }

    return courseStudentsResponse;
  }
}
