import { UNIDASH_API_ROUTES } from "@unidash/routes/unidashApi.routes";
import { apiClient } from "@unidash/lib/apiClient";
import {
  FilterCourseTeacherWorkloadDataDto,
  RegisterCourseTeacherWorkloadDataDto,
  UpdateCourseTeacherWorkloadDataDto,
} from "@unidash/api/dtos/courseTeacherWorkloadData.dto";
import { PaginationDto } from "@unidash/api/dtos/pagination.dto";
import { CourseTeacherWorkloadDataParamsBuilder } from "./courseTeacherWorkloadDataParams.builder";
import { CourseTeacherWorkloadListDataResponse } from "@unidash/api/responses/courseTeacherWorkloadDataResponse.interface";

export class CourseTeacherWorkloadDataCSService {
  static async getAll(
    courseId: string,
    pagination?: PaginationDto,
    filters?: FilterCourseTeacherWorkloadDataDto
  ): Promise<CourseTeacherWorkloadListDataResponse> {
    const params = new CourseTeacherWorkloadDataParamsBuilder()
      .applyPagination(pagination)
      .applyFilters(filters)
      .build();

    const courseTeacherWorkloadDataResponse =
      await apiClient.get<CourseTeacherWorkloadListDataResponse>(
        `${UNIDASH_API_ROUTES.courseTeacherWorkloadData.getAll}${courseId}`,
        {
          params,
        }
      );

    return courseTeacherWorkloadDataResponse;
  }

  static async register(
    courseId: string,
    registerCourseTeacherWorkloadDataDto: RegisterCourseTeacherWorkloadDataDto
  ): Promise<void> {
    const courseTeacherWorkloadDataResponse = await apiClient.post<void>(
      UNIDASH_API_ROUTES.courseTeacherWorkloadData.register,
      {
        courseId: courseId,
        year: registerCourseTeacherWorkloadDataDto.year,
        semester: registerCourseTeacherWorkloadDataDto.semester,
        teacherId: registerCourseTeacherWorkloadDataDto.teacherId,
        workloadInHours: registerCourseTeacherWorkloadDataDto.workloadInHours,
      }
    );

    return courseTeacherWorkloadDataResponse;
  }

  static async update(
    updateCourseTeacherWorkloadDataId: string,
    updateCourseTeacherWorkloadDataDto: UpdateCourseTeacherWorkloadDataDto
  ): Promise<void> {
    const courseTeacherWorkloadDataResponse = await apiClient.patch<void>(
      `${UNIDASH_API_ROUTES.courseTeacherWorkloadData.update}${updateCourseTeacherWorkloadDataId}`,
      {
        year: updateCourseTeacherWorkloadDataDto.year,
        semester: updateCourseTeacherWorkloadDataDto.semester,
        teacherId: updateCourseTeacherWorkloadDataDto.teacherId,
        workloadInHours: updateCourseTeacherWorkloadDataDto.workloadInHours,
      }
    );

    return courseTeacherWorkloadDataResponse;
  }

  static async delete(courseId: string): Promise<void> {
    const courseTeacherWorkloadDataResponse = await apiClient.delete<void>(
      `${UNIDASH_API_ROUTES.courseTeacherWorkloadData.delete}${courseId}`
    );

    return courseTeacherWorkloadDataResponse;
  }
}
