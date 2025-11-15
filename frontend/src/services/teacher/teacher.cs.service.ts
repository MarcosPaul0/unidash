import { UNIDASH_API_ROUTES } from "@unidash/routes/unidashApi.routes";
import {
  TeacherResponse,
  TeachersResponse,
} from "../../api/responses/teacher.response";
import { apiClient } from "@unidash/lib/apiClient";
import {
  FilterTeachersDto,
  filterTeachersDtoSchema,
  RegisterTeacherDto,
  UpdateTeacherDto,
} from "@unidash/api/dtos/teacher.dto";
import {
  PaginationDto,
  paginationDtoSchema,
} from "@unidash/api/dtos/pagination.dto";
import { TeacherParamsBuilder } from "./teacherParams.builder";

export class TeacherCSService {
  static async getBySession(): Promise<TeacherResponse> {
    const teacherResponse = await apiClient.get<TeacherResponse>(
      UNIDASH_API_ROUTES.teacher.getBySession
    );

    return teacherResponse;
  }

  static async getAllOutsideCourse(
    courseId: string,
    pagination?: PaginationDto,
    filters?: FilterTeachersDto
  ): Promise<TeachersResponse> {
    const validatedPagination = paginationDtoSchema.parse(pagination);
    const validatedFilters = filterTeachersDtoSchema.parse(filters);

    const params = new TeacherParamsBuilder()
      .applyPagination(validatedPagination)
      .applyFilters(validatedFilters)
      .build();

    const teacherResponse = await apiClient.get<TeachersResponse>(
      `${UNIDASH_API_ROUTES.teacher.getAllOutsideOfCourse}${courseId}`,
      {
        params,
      }
    );

    return teacherResponse;
  }

  static async register(registerTeacherDto: RegisterTeacherDto): Promise<void> {
    const teacherResponse = await apiClient.post<void>(
      UNIDASH_API_ROUTES.teacher.register,
      {
        name: registerTeacherDto.name,
        email: registerTeacherDto.email,
        password: registerTeacherDto.password,
      }
    );

    return teacherResponse;
  }

  static async updateForAdmin(
    teacherId: string,
    updateTeacherDto: UpdateTeacherDto
  ): Promise<void> {
    const teacherResponse = await apiClient.patch<void>(
      `${UNIDASH_API_ROUTES.teacher.updateForAdmin}${teacherId}`,
      updateTeacherDto
    );

    return teacherResponse;
  }

  static async delete(teacherId: string): Promise<void> {
    const teacherResponse = await apiClient.delete<void>(
      `${UNIDASH_API_ROUTES.teacher.delete}${teacherId}`
    );

    return teacherResponse;
  }
}
