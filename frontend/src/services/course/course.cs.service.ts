import { UNIDASH_API_ROUTES } from "@unidash/routes/unidashApi.routes";
import {
  FilterCoursesDto,
  filterCoursesDtoSchema,
  RegisterCourseDto,
  UpdateCourseDto,
} from "@unidash/api/dtos/course.dto";
import { apiClient } from "@unidash/lib/apiClient";
import { CoursesResponse } from "@unidash/api/responses/course.response";
import { CourseParamsBuilder } from "./courseParams.builder";

export class CourseCSService {
  static async getAll(filters?: FilterCoursesDto): Promise<CoursesResponse> {
    const validatedFilters = filterCoursesDtoSchema.parse(filters);

    const params = new CourseParamsBuilder()
      .applyFilters(validatedFilters)
      .build();

    const coursesResponse = await apiClient.get<CoursesResponse>(
      UNIDASH_API_ROUTES.course.getAll,
      {
        params,
      }
    );

    return coursesResponse;
  }

  static async getAllForGuest(
    filters?: FilterCoursesDto
  ): Promise<CoursesResponse> {
    const validatedFilters = filterCoursesDtoSchema.parse(filters);

    const params = new CourseParamsBuilder()
      .applyFilters(validatedFilters)
      .build();

    const coursesResponse = await apiClient.get<CoursesResponse>(
      UNIDASH_API_ROUTES.course.getAllForGuest,
      {
        params,
      }
    );

    return coursesResponse;
  }

  static async register(registerCourseDto: RegisterCourseDto): Promise<void> {
    const courseResponse = await apiClient.post<void>(
      UNIDASH_API_ROUTES.course.register,
      {
        name: registerCourseDto.name,
      }
    );

    return courseResponse;
  }

  static async update(
    courseId: string,
    updateCourseDto: UpdateCourseDto
  ): Promise<void> {
    const courseResponse = await apiClient.patch<void>(
      `${UNIDASH_API_ROUTES.course.update}${courseId}`,
      {
        name: updateCourseDto.name,
      }
    );

    return courseResponse;
  }

  static async delete(courseId: string): Promise<void> {
    const courseResponse = await apiClient.delete<void>(
      `${UNIDASH_API_ROUTES.course.delete}${courseId}`
    );

    return courseResponse;
  }
}
