import { UNIDASH_API_ROUTES } from "@unidash/routes/unidashApi.routes";
import { createApiSSRClient } from "@unidash/lib/apiClientSSR";
import { PaginationDto } from "@unidash/api/dtos/pagination.dto";
import { TeacherCourseParamsBuilder } from "./teacherCourseParams.builder";
import { TeachersByCourseResponse } from "@unidash/api/responses/teacherCourse.response";

export class TeacherCoursesSSRService {
  static async getAllByCourse(
    courseId: string,
    pagination?: PaginationDto
  ): Promise<TeachersByCourseResponse> {
    const params = new TeacherCourseParamsBuilder()
      .applyPagination(pagination)
      .build();

    const ssrApiClient = await createApiSSRClient();

    const teacherCoursesResponse =
      await ssrApiClient.get<TeachersByCourseResponse>(
        `${UNIDASH_API_ROUTES.teacherCourse.getAllByCourse}${courseId}`,
        {
          params,
        }
      );

    return teacherCoursesResponse;
  }
}
