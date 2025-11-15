import { UNIDASH_API_ROUTES } from "@unidash/routes/unidashApi.routes";
import { apiClient } from "@unidash/lib/apiClient";
import {
  FilterCourseRegistrationLockDataDto,
  RegisterCourseRegistrationLockDataDto,
  UpdateCourseRegistrationLockDataDto,
} from "@unidash/api/dtos/courseRegistrationLockData.dto";
import { PaginationDto } from "@unidash/api/dtos/pagination.dto";
import { CourseRegistrationLockDataParamsBuilder } from "./courseRegistrationLockDataParams.builder";
import { CourseRegistrationLockListDataResponse } from "@unidash/api/responses/courseRegistrationLockDataResponse.interface";

export class CourseRegistrationLockDataCSService {
  static async getAll(
    courseId: string,
    pagination?: PaginationDto,
    filters?: FilterCourseRegistrationLockDataDto
  ): Promise<CourseRegistrationLockListDataResponse> {
    const params = new CourseRegistrationLockDataParamsBuilder()
      .applyPagination(pagination)
      .applyFilters(filters)
      .build();

    const courseRegistrationLockDataResponse =
      await apiClient.get<CourseRegistrationLockListDataResponse>(
        `${UNIDASH_API_ROUTES.courseRegistrationLockData.getAll}${courseId}`,
        {
          params,
        }
      );

    return courseRegistrationLockDataResponse;
  }

  static async register(
    courseId: string,
    registerCourseRegistrationLockDataDto: RegisterCourseRegistrationLockDataDto
  ): Promise<void> {
    const courseRegistrationLockDataResponse = await apiClient.post<void>(
      UNIDASH_API_ROUTES.courseRegistrationLockData.register,
      {
        courseId: courseId,
        year: registerCourseRegistrationLockDataDto.year,
        semester: registerCourseRegistrationLockDataDto.semester,
        difficultyInDiscipline:
          registerCourseRegistrationLockDataDto.difficultyInDiscipline,
        workload: registerCourseRegistrationLockDataDto.workload,
        teacherMethodology:
          registerCourseRegistrationLockDataDto.teacherMethodology,
        incompatibilityWithWork:
          registerCourseRegistrationLockDataDto.incompatibilityWithWork,
        lossOfInterest: registerCourseRegistrationLockDataDto.lossOfInterest,
        other: registerCourseRegistrationLockDataDto.other,
      }
    );

    return courseRegistrationLockDataResponse;
  }

  static async update(
    courseRegistrationLockDataId: string,
    updateCourseRegistrationLockDataDto: UpdateCourseRegistrationLockDataDto
  ): Promise<void> {
    const courseRegistrationLockDataResponse = await apiClient.patch<void>(
      `${UNIDASH_API_ROUTES.courseRegistrationLockData.update}${courseRegistrationLockDataId}`,
      {
        year: updateCourseRegistrationLockDataDto.year,
        semester: updateCourseRegistrationLockDataDto.semester,
        difficultyInDiscipline:
          updateCourseRegistrationLockDataDto.difficultyInDiscipline,
        workload: updateCourseRegistrationLockDataDto.workload,
        teacherMethodology:
          updateCourseRegistrationLockDataDto.teacherMethodology,
        incompatibilityWithWork:
          updateCourseRegistrationLockDataDto.incompatibilityWithWork,
        lossOfInterest: updateCourseRegistrationLockDataDto.lossOfInterest,
        other: updateCourseRegistrationLockDataDto.other,
      }
    );

    return courseRegistrationLockDataResponse;
  }

  static async delete(courseId: string): Promise<void> {
    const courseRegistrationLockDataResponse = await apiClient.delete<void>(
      `${UNIDASH_API_ROUTES.courseRegistrationLockData.delete}${courseId}`
    );

    return courseRegistrationLockDataResponse;
  }
}
