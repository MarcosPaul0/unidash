import { UNIDASH_API_ROUTES } from "@unidash/routes/unidashApi.routes";
import { apiClient } from "@unidash/lib/apiClient";
import {
  FilterCourseInternshipDataDto,
  RegisterCourseInternshipDataDto,
} from "@unidash/api/dtos/courseInternshipData.dto";
import { PaginationDto } from "@unidash/api/dtos/pagination.dto";
import { CourseInternshipDataParamsBuilder } from "./courseInternshipDataParams.builder";
import { CourseInternshipListDataResponse } from "@unidash/api/responses/courseInternshipDataResponse.interface";

export class CourseInternshipDataCSService {
  static async getAll(
    courseId: string,
    pagination?: PaginationDto,
    filters?: FilterCourseInternshipDataDto
  ): Promise<CourseInternshipListDataResponse> {
    const params = new CourseInternshipDataParamsBuilder()
      .applyPagination(pagination)
      .applyFilters(filters)
      .build();

    const courseInternshipDataResponse =
      await apiClient.get<CourseInternshipListDataResponse>(
        `${UNIDASH_API_ROUTES.courseInternshipData.getAll}${courseId}`,
        {
          params,
        }
      );

    return courseInternshipDataResponse;
  }

  static async register(
    courseId: string,
    registerCourseInternshipDataDto: RegisterCourseInternshipDataDto
  ): Promise<void> {
    const courseInternshipDataResponse = await apiClient.post<void>(
      UNIDASH_API_ROUTES.courseInternshipData.register,
      {
        courseId: courseId,
        year: registerCourseInternshipDataDto.year,
        semester: registerCourseInternshipDataDto.semester,
        studentMatriculation:
          registerCourseInternshipDataDto.studentMatriculation,
        enterpriseCnpj: registerCourseInternshipDataDto.enterpriseCnpj,
        role: registerCourseInternshipDataDto.role,
        conclusionTimeInDays:
          registerCourseInternshipDataDto.conclusionTimeInDays,
        employmentType: registerCourseInternshipDataDto.employmentType,
        cityId: registerCourseInternshipDataDto.cityId,
        advisorId: registerCourseInternshipDataDto.advisorId,
      }
    );

    return courseInternshipDataResponse;
  }

  static async update(
    courseInternshipDataId: string,
    registerCourseInternshipDataDto: RegisterCourseInternshipDataDto
  ): Promise<void> {
    const courseInternshipDataResponse = await apiClient.patch<void>(
      `${UNIDASH_API_ROUTES.courseInternshipData.update}${courseInternshipDataId}`,
      {
        year: registerCourseInternshipDataDto.year,
        semester: registerCourseInternshipDataDto.semester,
        studentMatriculation:
          registerCourseInternshipDataDto.studentMatriculation,
        enterpriseCnpj: registerCourseInternshipDataDto.enterpriseCnpj,
        role: registerCourseInternshipDataDto.role,
        conclusionTimeInDays:
          registerCourseInternshipDataDto.conclusionTimeInDays,
        employmentType: registerCourseInternshipDataDto.employmentType,
        cityId: registerCourseInternshipDataDto.cityId,
        advisorId: registerCourseInternshipDataDto.advisorId,
      }
    );

    return courseInternshipDataResponse;
  }

  static async delete(courseId: string): Promise<void> {
    const courseInternshipDataResponse = await apiClient.delete<void>(
      `${UNIDASH_API_ROUTES.courseInternshipData.delete}${courseId}`
    );

    return courseInternshipDataResponse;
  }
}
