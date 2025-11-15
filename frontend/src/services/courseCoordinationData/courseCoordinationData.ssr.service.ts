import { UNIDASH_API_ROUTES } from "@unidash/routes/unidashApi.routes";
import { createApiSSRClient } from "@unidash/lib/apiClientSSR";
import { PaginationDto } from "@unidash/api/dtos/pagination.dto";
import { FilterCourseCoordinationDataDto } from "@unidash/api/dtos/courseCoordinationData.dto";
import {
  CourseCoordinationDataResponse,
  CourseCoordinationListDataResponse,
} from "@unidash/api/responses/courseCoordinationDataResponse.interface";
import { CourseCoordinationDataParamsBuilder } from "./courseCoordinationDataParams.builder";
import { redirect } from "next/navigation";
import { APP_ROUTES } from "@unidash/routes/app.routes";

export class CourseCoordinationDataSSRService {
  static async getAll(
    courseId: string,
    pagination?: PaginationDto,
    filters?: FilterCourseCoordinationDataDto
  ): Promise<CourseCoordinationListDataResponse> {
    const params = new CourseCoordinationDataParamsBuilder()
      .applyPagination(pagination)
      .applyFilters(filters)
      .build();

    const ssrApiClient = await createApiSSRClient();

    const courseCoordinationResponse =
      await ssrApiClient.get<CourseCoordinationListDataResponse>(
        `${UNIDASH_API_ROUTES.courseCoordinationData.getAll}${courseId}`,
        {
          params,
        }
      );

    if (courseCoordinationResponse === null) {
      redirect(APP_ROUTES.private.dashboard);
    }

    return courseCoordinationResponse;
  }

  static async getById(
    courseCoordinationDataId: string
  ): Promise<CourseCoordinationDataResponse> {
    const ssrApiClient = await createApiSSRClient();

    const courseCoordinationResponse =
      await ssrApiClient.get<CourseCoordinationDataResponse>(
        `${UNIDASH_API_ROUTES.courseCoordinationData.getById}${courseCoordinationDataId}`
      );

    if (courseCoordinationResponse === null) {
      redirect(APP_ROUTES.private.dashboard);
    }

    return courseCoordinationResponse;
  }
}
