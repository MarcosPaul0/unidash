import { UNIDASH_API_ROUTES } from "@unidash/routes/unidashApi.routes";
import { createApiSSRClient } from "@unidash/lib/apiClientSSR";
import { CourseActiveStudentsDataParamsBuilder } from "./courseActiveStudentsDataParams.builder";
import { FilterCourseActiveStudentsDataDto } from "@unidash/api/dtos/courseActiveStudentsData.dto";
import { PaginationDto } from "@unidash/api/dtos/pagination.dto";
import {
  CourseActiveStudentsDataListResponse,
  CourseActiveStudentsDataResponse,
} from "@unidash/api/responses/courseActiveStudentsDataResponse.interface";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { redirect } from "next/navigation";

export class CourseActiveStudentsDataSSRService {
  static async getAll(
    courseId: string,
    pagination?: PaginationDto,
    filters?: FilterCourseActiveStudentsDataDto
  ): Promise<CourseActiveStudentsDataListResponse> {
    const params = new CourseActiveStudentsDataParamsBuilder()
      .applyPagination(pagination)
      .applyFilters(filters)
      .build();

    const ssrApiClient = await createApiSSRClient();

    const courseActiveStudentsResponse =
      await ssrApiClient.get<CourseActiveStudentsDataListResponse>(
        `${UNIDASH_API_ROUTES.courseActiveStudentsData.getAll}${courseId}`,
        {
          params,
        }
      );

    if (courseActiveStudentsResponse === null) {
      redirect(APP_ROUTES.private.dashboard);
    }

    return courseActiveStudentsResponse;
  }

  static async getById(
    courseActiveStudentsDataId: string
  ): Promise<CourseActiveStudentsDataResponse> {
    const ssrApiClient = await createApiSSRClient();

    const courseActiveStudentsResponse =
      await ssrApiClient.get<CourseActiveStudentsDataResponse>(
        `${UNIDASH_API_ROUTES.courseActiveStudentsData.getById}${courseActiveStudentsDataId}`
      );

    if (courseActiveStudentsResponse === null) {
      redirect(APP_ROUTES.private.dashboard);
    }

    return courseActiveStudentsResponse;
  }
}
