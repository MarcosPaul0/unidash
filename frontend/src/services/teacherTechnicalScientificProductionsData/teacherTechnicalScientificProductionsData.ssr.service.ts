import { UNIDASH_API_ROUTES } from "@unidash/routes/unidashApi.routes";
import { createApiSSRClient } from "@unidash/lib/apiClientSSR";
import { TeacherTechnicalScientificProductionsDataParamsBuilder } from "./teacherTechnicalScientificProductionsDataParams.builder";
import { PaginationDto } from "@unidash/api/dtos/pagination.dto";
import { TeacherTechnicalScientificProductionsDataResponse } from "@unidash/api/responses/teacherTechnicalScientificProductionsDataResponse.interface";
import { FilterTeacherTechnicalScientificProductionsDataDto } from "@unidash/api/dtos/teacherTechnicalScientificProductionsData.dto";

export class TeacherTechnicalScientificProductionsDataSSRService {
  static async getAll(
    courseId: string,
    pagination?: PaginationDto,
    filters?: FilterTeacherTechnicalScientificProductionsDataDto
  ): Promise<TeacherTechnicalScientificProductionsDataResponse> {
    const params = new TeacherTechnicalScientificProductionsDataParamsBuilder()
      .applyPagination(pagination)
      .applyFilters(filters)
      .build();

    const ssrApiClient = await createApiSSRClient();

    const coursesResponse =
      await ssrApiClient.get<TeacherTechnicalScientificProductionsDataResponse>(
        `${UNIDASH_API_ROUTES.teacherTechnicalScientificProductionsData.getAll}${courseId}`,
        {
          params,
        }
      );

    return coursesResponse;
  }

  static async getAllForTeacher(
    pagination?: PaginationDto,
    filters?: FilterTeacherTechnicalScientificProductionsDataDto
  ): Promise<TeacherTechnicalScientificProductionsDataResponse> {
    const params = new TeacherTechnicalScientificProductionsDataParamsBuilder()
      .applyPagination(pagination)
      .applyFilters(filters)
      .build();

    const ssrApiClient = await createApiSSRClient();

    const coursesResponse =
      await ssrApiClient.get<TeacherTechnicalScientificProductionsDataResponse>(
        UNIDASH_API_ROUTES.teacherTechnicalScientificProductionsData
          .getAllForTeacher,
        {
          params,
        }
      );

    return coursesResponse;
  }
}
