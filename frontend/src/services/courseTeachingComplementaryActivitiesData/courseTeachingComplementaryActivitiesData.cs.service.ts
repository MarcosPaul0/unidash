import { UNIDASH_API_ROUTES } from "@unidash/routes/unidashApi.routes";
import { apiClient } from "@unidash/lib/apiClient";
import {
  FilterCourseTeachingComplementaryActivitiesDataDto,
  RegisterCourseTeachingComplementaryActivitiesDataDto,
  UpdateCourseTeachingComplementaryActivitiesDataDto,
} from "@unidash/api/dtos/courseTeachingComplementaryActivitiesData.dto";
import { PaginationDto } from "@unidash/api/dtos/pagination.dto";
import { CourseTeachingComplementaryActivitiesDataParamsBuilder } from "./courseTeachingComplementaryActivitiesDataParams.builder";
import { CourseTeachingComplementaryActivitiesListDataResponse } from "@unidash/api/responses/courseTeachingComplementaryActivitiesDataResponse.interface";

export class CourseTeachingComplementaryActivitiesDataCSService {
  static async getAll(
    courseId: string,
    pagination?: PaginationDto,
    filters?: FilterCourseTeachingComplementaryActivitiesDataDto
  ): Promise<CourseTeachingComplementaryActivitiesListDataResponse> {
    const params = new CourseTeachingComplementaryActivitiesDataParamsBuilder()
      .applyPagination(pagination)
      .applyFilters(filters)
      .build();

    const courseTeachingComplementaryActivitiesDataResponse =
      await apiClient.get<CourseTeachingComplementaryActivitiesListDataResponse>(
        `${UNIDASH_API_ROUTES.courseTeachingComplementaryActivitiesData.getAll}${courseId}`,
        {
          params,
        }
      );

    return courseTeachingComplementaryActivitiesDataResponse;
  }

  static async register(
    courseId: string,
    registerCourseTeachingComplementaryActivitiesDataDto: RegisterCourseTeachingComplementaryActivitiesDataDto
  ): Promise<void> {
    const courseTeachingComplementaryActivitiesDataResponse =
      await apiClient.post<void>(
        UNIDASH_API_ROUTES.courseTeachingComplementaryActivitiesData.register,
        {
          courseId: courseId,
          year: registerCourseTeachingComplementaryActivitiesDataDto.year,
          semester:
            registerCourseTeachingComplementaryActivitiesDataDto.semester,
          subjectMonitoring:
            registerCourseTeachingComplementaryActivitiesDataDto.subjectMonitoring,
          sponsorshipOfNewStudents:
            registerCourseTeachingComplementaryActivitiesDataDto.sponsorshipOfNewStudents,
          providingTraining:
            registerCourseTeachingComplementaryActivitiesDataDto.providingTraining,
          coursesInTheArea:
            registerCourseTeachingComplementaryActivitiesDataDto.coursesInTheArea,
          coursesOutsideTheArea:
            registerCourseTeachingComplementaryActivitiesDataDto.coursesOutsideTheArea,
          electivesDisciplines:
            registerCourseTeachingComplementaryActivitiesDataDto.electivesDisciplines,
          complementaryCoursesInTheArea:
            registerCourseTeachingComplementaryActivitiesDataDto.complementaryCoursesInTheArea,
          preparationForTest:
            registerCourseTeachingComplementaryActivitiesDataDto.preparationForTest,
        }
      );

    return courseTeachingComplementaryActivitiesDataResponse;
  }

  static async update(
    updateCourseTeachingComplementaryActivitiesDataId: string,
    updateCourseTeachingComplementaryActivitiesDataDto: UpdateCourseTeachingComplementaryActivitiesDataDto
  ): Promise<void> {
    const courseTeachingComplementaryActivitiesDataResponse =
      await apiClient.patch<void>(
        `${UNIDASH_API_ROUTES.courseTeachingComplementaryActivitiesData.update}${updateCourseTeachingComplementaryActivitiesDataId}`,
        {
          year: updateCourseTeachingComplementaryActivitiesDataDto.year,
          semester: updateCourseTeachingComplementaryActivitiesDataDto.semester,
          subjectMonitoring:
            updateCourseTeachingComplementaryActivitiesDataDto.subjectMonitoring,
          sponsorshipOfNewStudents:
            updateCourseTeachingComplementaryActivitiesDataDto.sponsorshipOfNewStudents,
          providingTraining:
            updateCourseTeachingComplementaryActivitiesDataDto.providingTraining,
          coursesInTheArea:
            updateCourseTeachingComplementaryActivitiesDataDto.coursesInTheArea,
          coursesOutsideTheArea:
            updateCourseTeachingComplementaryActivitiesDataDto.coursesOutsideTheArea,
          electivesDisciplines:
            updateCourseTeachingComplementaryActivitiesDataDto.electivesDisciplines,
          complementaryCoursesInTheArea:
            updateCourseTeachingComplementaryActivitiesDataDto.complementaryCoursesInTheArea,
          preparationForTest:
            updateCourseTeachingComplementaryActivitiesDataDto.preparationForTest,
        }
      );

    return courseTeachingComplementaryActivitiesDataResponse;
  }

  static async delete(courseId: string): Promise<void> {
    const courseTeachingComplementaryActivitiesDataResponse =
      await apiClient.delete<void>(
        `${UNIDASH_API_ROUTES.courseTeachingComplementaryActivitiesData.delete}${courseId}`
      );

    return courseTeachingComplementaryActivitiesDataResponse;
  }
}
