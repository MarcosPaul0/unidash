import { UNIDASH_API_ROUTES } from "@unidash/routes/unidashApi.routes";
import { apiClient } from "@unidash/lib/apiClient";
import {
  FilterCourseCompletionWorkDataDto,
  RegisterCourseCompletionWorkDataDto,
  UpdateCourseCompletionWorkDataDto,
} from "@unidash/api/dtos/courseCompletionWorkData.dto";
import { PaginationDto } from "@unidash/api/dtos/pagination.dto";
import { CourseCompletionWorkDataParamsBuilder } from "./courseCompletionWorkDataParams.builder";
import { CourseCompletionWorkDataListResponse } from "@unidash/api/responses/courseCompletionWorkDataResponse.interface";

export class CourseCompletionWorkDataCSService {
  static async getAll(
    courseId: string,
    pagination?: PaginationDto,
    filters?: FilterCourseCompletionWorkDataDto
  ): Promise<CourseCompletionWorkDataListResponse> {
    const params = new CourseCompletionWorkDataParamsBuilder()
      .applyPagination(pagination)
      .applyFilters(filters)
      .build();

    const courseCompletionWorkDataResponse =
      await apiClient.get<CourseCompletionWorkDataListResponse>(
        `${UNIDASH_API_ROUTES.courseCompletionWorkData.getAll}${courseId}`,
        {
          params,
        }
      );

    return courseCompletionWorkDataResponse;
  }

  static async register(
    courseId: string,
    registerCourseCompletionWorkDataDto: RegisterCourseCompletionWorkDataDto
  ): Promise<void> {
    const courseCompletionWorkDataResponse = await apiClient.post<void>(
      UNIDASH_API_ROUTES.courseCompletionWorkData.register,
      {
        courseId: courseId,
        year: registerCourseCompletionWorkDataDto.year,
        semester: registerCourseCompletionWorkDataDto.semester,
        abandonments: registerCourseCompletionWorkDataDto.abandonments,
        defenses: registerCourseCompletionWorkDataDto.defenses,
        enrollments: registerCourseCompletionWorkDataDto.enrollments,
      }
    );

    return courseCompletionWorkDataResponse;
  }

  static async update(
    courseCompletionWorkDataId: string,
    updateCourseCompletionWorkDataDto: UpdateCourseCompletionWorkDataDto
  ): Promise<void> {
    const courseCompletionWorkDataResponse = await apiClient.patch<void>(
      `${UNIDASH_API_ROUTES.courseCompletionWorkData.update}${courseCompletionWorkDataId}`,
      {
        year: updateCourseCompletionWorkDataDto.year,
        semester: updateCourseCompletionWorkDataDto.semester,
        abandonments: updateCourseCompletionWorkDataDto.abandonments,
        defenses: updateCourseCompletionWorkDataDto.defenses,
        enrollments: updateCourseCompletionWorkDataDto.enrollments,
      }
    );

    return courseCompletionWorkDataResponse;
  }

  static async delete(courseId: string): Promise<void> {
    const courseCompletionWorkDataResponse = await apiClient.delete<void>(
      `${UNIDASH_API_ROUTES.courseCompletionWorkData.delete}${courseId}`
    );

    return courseCompletionWorkDataResponse;
  }
}
