import { UNIDASH_API_ROUTES } from "@unidash/routes/unidashApi.routes";
import { createApiSSRClient } from "@unidash/lib/apiClientSSR";
import { TeacherSupervisedCompletionWorkDataParamsBuilder } from "./teacherSupervisedCompletionWorkDataParams.builder";
import { PaginationDto } from "@unidash/api/dtos/pagination.dto";
import { TeacherSupervisedCompletionWorkDataResponse } from "@unidash/api/responses/teacherSupervisedCompletionWorkDataResponse.interface";
import { FilterTeacherSupervisedCompletionWorkDataDto } from "@unidash/api/dtos/teacherSupervisedCompletionWorkData.dto";

export class TeacherSupervisedCompletionWorkDataSSRService {
  static async getAll(
    courseId: string,
    pagination?: PaginationDto,
    filters?: FilterTeacherSupervisedCompletionWorkDataDto
  ): Promise<TeacherSupervisedCompletionWorkDataResponse> {
    const params = new TeacherSupervisedCompletionWorkDataParamsBuilder()
      .applyPagination(pagination)
      .applyFilters(filters)
      .build();

    const ssrApiClient = await createApiSSRClient();

    const coursesResponse =
      await ssrApiClient.get<TeacherSupervisedCompletionWorkDataResponse>(
        `${UNIDASH_API_ROUTES.teacherSupervisedCompletionWorkData.getAll}${courseId}`,
        {
          params,
        }
      );

    return coursesResponse;
  }
}
