import { UNIDASH_API_ROUTES } from "@unidash/routes/unidashApi.routes";
import { createApiSSRClient } from "@unidash/lib/apiClientSSR";
import { CourseTeacherWorkloadDataParamsBuilder } from "./courseTeacherWorkloadDataParams.builder";
import { FilterCourseTeacherWorkloadDataDto } from "@unidash/api/dtos/courseTeacherWorkloadData.dto";
import { PaginationDto } from "@unidash/api/dtos/pagination.dto";
import {
  CourseTeacherWorkloadDataResponse,
  CourseTeacherWorkloadListDataResponse,
} from "@unidash/api/responses/courseTeacherWorkloadDataResponse.interface";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { redirect } from "next/navigation";

export class CourseTeacherWorkloadDataSSRService {
  static async getAll(
    courseId: string,
    pagination?: PaginationDto,
    filters?: FilterCourseTeacherWorkloadDataDto
  ): Promise<CourseTeacherWorkloadListDataResponse> {
    const params = new CourseTeacherWorkloadDataParamsBuilder()
      .applyPagination(pagination)
      .applyFilters(filters)
      .build();

    const ssrApiClient = await createApiSSRClient();

    const courseTeacherWorkloadResponse =
      await ssrApiClient.get<CourseTeacherWorkloadListDataResponse>(
        `${UNIDASH_API_ROUTES.courseTeacherWorkloadData.getAll}${courseId}`,
        {
          params,
        }
      );

    if (courseTeacherWorkloadResponse === null) {
      redirect(APP_ROUTES.private.dashboard);
    }

    return courseTeacherWorkloadResponse;
  }

  static async getById(
    courseTeacherWorkloadDataId: string
  ): Promise<CourseTeacherWorkloadDataResponse> {
    const ssrApiClient = await createApiSSRClient();

    const courseTeacherWorkloadResponse =
      await ssrApiClient.get<CourseTeacherWorkloadDataResponse>(
        `${UNIDASH_API_ROUTES.courseTeacherWorkloadData.getById}${courseTeacherWorkloadDataId}`
      );

    if (courseTeacherWorkloadResponse === null) {
      redirect(APP_ROUTES.private.dashboard);
    }

    return courseTeacherWorkloadResponse;
  }
}
