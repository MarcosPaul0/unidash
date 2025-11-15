import { UNIDASH_API_ROUTES } from "@unidash/routes/unidashApi.routes";
import { apiClient } from "@unidash/lib/apiClient";
import { CourseActiveStudentsDataParamsBuilder } from "./courseActiveStudentsDataParams.builder";
import {
  FilterCourseActiveStudentsDataDto,
  RegisterCourseActiveStudentsDataDto,
  UpdateCourseActiveStudentsDataDto,
} from "@unidash/api/dtos/courseActiveStudentsData.dto";
import { PaginationDto } from "@unidash/api/dtos/pagination.dto";
import { CourseActiveStudentsDataListResponse } from "@unidash/api/responses/courseActiveStudentsDataResponse.interface";

export class CourseActiveStudentsDataCSService {
  static async getAll(
    courseId: string,
    pagination?: PaginationDto,
    filters?: FilterCourseActiveStudentsDataDto
  ): Promise<CourseActiveStudentsDataListResponse> {
    const params = new CourseActiveStudentsDataParamsBuilder()
      .applyPagination(pagination)
      .applyFilters(filters)
      .build();

    const courseActiveStudentsDataResponse =
      await apiClient.get<CourseActiveStudentsDataListResponse>(
        `${UNIDASH_API_ROUTES.courseActiveStudentsData.getAll}${courseId}`,
        {
          params,
        }
      );

    return courseActiveStudentsDataResponse;
  }

  static async register(
    courseId: string,
    registerCourseActiveStudentsDataDto: RegisterCourseActiveStudentsDataDto
  ): Promise<void> {
    const courseActiveStudentsDataResponse = await apiClient.post<void>(
      UNIDASH_API_ROUTES.courseActiveStudentsData.register,
      {
        courseId: courseId,
        year: registerCourseActiveStudentsDataDto.year,
        semester: registerCourseActiveStudentsDataDto.semester,
        activeStudentsByIngress:
          registerCourseActiveStudentsDataDto.activeStudentsByIngress,
      }
    );

    return courseActiveStudentsDataResponse;
  }

  static async update(
    courseActiveStudentsDataId: string,
    updateCourseActiveStudentsDataDto: UpdateCourseActiveStudentsDataDto
  ): Promise<void> {
    const courseActiveStudentsDataResponse = await apiClient.patch<void>(
      `${UNIDASH_API_ROUTES.courseActiveStudentsData.update}${courseActiveStudentsDataId}`,
      {
        year: updateCourseActiveStudentsDataDto.year,
        semester: updateCourseActiveStudentsDataDto.semester,
        activeStudentsByIngress:
          updateCourseActiveStudentsDataDto.activeStudentsByIngress,
      }
    );

    return courseActiveStudentsDataResponse;
  }

  static async delete(courseId: string): Promise<void> {
    const courseActiveStudentsDataResponse = await apiClient.delete<void>(
      `${UNIDASH_API_ROUTES.courseActiveStudentsData.delete}${courseId}`
    );

    return courseActiveStudentsDataResponse;
  }
}
