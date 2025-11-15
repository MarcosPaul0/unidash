import { UNIDASH_API_ROUTES } from "@unidash/routes/unidashApi.routes";
import { createApiSSRClient } from "@unidash/lib/apiClientSSR";
import { TeacherResearchAndExtensionProjectsDataParamsBuilder } from "./teacherResearchAndExtensionProjectsDataParams.builder";
import { PaginationDto } from "@unidash/api/dtos/pagination.dto";
import { TeacherResearchAndExtensionProjectsDataResponse } from "@unidash/api/responses/teacherResearchAndExtensionProjectsDataResponse.interface";
import { FilterTeacherResearchAndExtensionProjectsDataDto } from "@unidash/api/dtos/teacherResearchAndExtensionProjectsData.dto";

export class TeacherResearchAndExtensionProjectsDataSSRService {
  static async getAll(
    courseId: string,
    pagination?: PaginationDto,
    filters?: FilterTeacherResearchAndExtensionProjectsDataDto
  ): Promise<TeacherResearchAndExtensionProjectsDataResponse> {
    const params = new TeacherResearchAndExtensionProjectsDataParamsBuilder()
      .applyPagination(pagination)
      .applyFilters(filters)
      .build();

    const ssrApiClient = await createApiSSRClient();

    const coursesResponse =
      await ssrApiClient.get<TeacherResearchAndExtensionProjectsDataResponse>(
        `${UNIDASH_API_ROUTES.teacherResearchAndExtensionProjectsData.getAll}${courseId}`,
        {
          params,
        }
      );

    return coursesResponse;
  }

  static async getAllForTeacher(
    pagination?: PaginationDto,
    filters?: FilterTeacherResearchAndExtensionProjectsDataDto
  ): Promise<TeacherResearchAndExtensionProjectsDataResponse> {
    const params = new TeacherResearchAndExtensionProjectsDataParamsBuilder()
      .applyPagination(pagination)
      .applyFilters(filters)
      .build();

    const ssrApiClient = await createApiSSRClient();

    const coursesResponse =
      await ssrApiClient.get<TeacherResearchAndExtensionProjectsDataResponse>(
        UNIDASH_API_ROUTES.teacherResearchAndExtensionProjectsData
          .getAllForTeacher,
        {
          params,
        }
      );

    return coursesResponse;
  }
}
