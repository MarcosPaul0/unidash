import { UNIDASH_API_ROUTES } from "@unidash/routes/unidashApi.routes";
import { createApiSSRClient } from "@unidash/lib/apiClientSSR";
import { CourseInternshipDataParamsBuilder } from "./courseInternshipDataParams.builder";
import { FilterCourseInternshipDataDto } from "@unidash/api/dtos/courseInternshipData.dto";
import { PaginationDto } from "@unidash/api/dtos/pagination.dto";
import {
  CourseInternshipDataResponse,
  CourseInternshipListDataResponse,
} from "@unidash/api/responses/courseInternshipDataResponse.interface";
import { redirect } from "next/navigation";
import { APP_ROUTES } from "@unidash/routes/app.routes";

export class CourseInternshipDataSSRService {
  static async getAll(
    courseId: string,
    pagination?: PaginationDto,
    filters?: FilterCourseInternshipDataDto
  ): Promise<CourseInternshipListDataResponse> {
    const params = new CourseInternshipDataParamsBuilder()
      .applyPagination(pagination)
      .applyFilters(filters)
      .build();

    const ssrApiClient = await createApiSSRClient();

    const courseInternshipResponse =
      await ssrApiClient.get<CourseInternshipListDataResponse>(
        `${UNIDASH_API_ROUTES.courseInternshipData.getAll}${courseId}`,
        {
          params,
        }
      );

    if (courseInternshipResponse === null) {
      redirect(APP_ROUTES.private.dashboard);
    }

    return courseInternshipResponse;
  }

  static async getById(
    courseInternshipDataId: string
  ): Promise<CourseInternshipDataResponse> {
    const ssrApiClient = await createApiSSRClient();

    const courseInternshipResponse =
      await ssrApiClient.get<CourseInternshipDataResponse>(
        `${UNIDASH_API_ROUTES.courseInternshipData.getById}${courseInternshipDataId}`
      );

    if (courseInternshipResponse === null) {
      redirect(APP_ROUTES.private.dashboard);
    }

    return courseInternshipResponse;
  }
}
