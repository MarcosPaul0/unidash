import { UNIDASH_API_ROUTES } from "@unidash/routes/unidashApi.routes";
import { apiClient } from "@unidash/lib/apiClient";
import { PaginationDto } from "@unidash/api/dtos/pagination.dto";
import { TeacherSupervisedCompletionWorkDataParamsBuilder } from "./teacherSupervisedCompletionWorkDataParams.builder";
import { TeacherSupervisedCompletionWorkDataResponse } from "@unidash/api/responses/teacherSupervisedCompletionWorkDataResponse.interface";
import {
  FilterTeacherSupervisedCompletionWorkDataDto,
  RegisterTeacherSupervisedCompletionWorkDataDto,
} from "@unidash/api/dtos/teacherSupervisedCompletionWorkData.dto";

export class TeacherSupervisedCompletionWorkDataCSService {
  static async getAll(
    courseId: string,
    pagination?: PaginationDto,
    filters?: FilterTeacherSupervisedCompletionWorkDataDto
  ): Promise<TeacherSupervisedCompletionWorkDataResponse> {
    const params = new TeacherSupervisedCompletionWorkDataParamsBuilder()
      .applyPagination(pagination)
      .applyFilters(filters)
      .build();

    const teacherSupervisedCompletionWorkDataResponse =
      await apiClient.get<TeacherSupervisedCompletionWorkDataResponse>(
        `${UNIDASH_API_ROUTES.teacherSupervisedCompletionWorkData.getAll}${courseId}`,
        {
          params,
        }
      );

    return teacherSupervisedCompletionWorkDataResponse;
  }

  static async register(
    courseId: string,
    teacherId: string,
    registerTeacherSupervisedCompletionWorkDataDto: RegisterTeacherSupervisedCompletionWorkDataDto
  ): Promise<void> {
    const TeacherSupervisedCompletionWorkDataResponse =
      await apiClient.post<void>(
        UNIDASH_API_ROUTES.teacherSupervisedCompletionWorkData.register,
        {
          courseId,
          teacherId,
          year: registerTeacherSupervisedCompletionWorkDataDto.year,
          semester: registerTeacherSupervisedCompletionWorkDataDto.semester,
          approved: registerTeacherSupervisedCompletionWorkDataDto.approved,
          failed: registerTeacherSupervisedCompletionWorkDataDto.failed,
        }
      );

    return TeacherSupervisedCompletionWorkDataResponse;
  }

  static async registerByTeacher(
    courseId: string,
    registerTeacherSupervisedCompletionWorkDataDto: RegisterTeacherSupervisedCompletionWorkDataDto
  ): Promise<void> {
    const TeacherSupervisedCompletionWorkDataResponse =
      await apiClient.post<void>(
        UNIDASH_API_ROUTES.teacherSupervisedCompletionWorkData
          .registerForTeacher,
        {
          courseId,
          year: registerTeacherSupervisedCompletionWorkDataDto.year,
          semester: registerTeacherSupervisedCompletionWorkDataDto.semester,
          approved: registerTeacherSupervisedCompletionWorkDataDto.approved,
          failed: registerTeacherSupervisedCompletionWorkDataDto.failed,
        }
      );

    return TeacherSupervisedCompletionWorkDataResponse;
  }

  static async delete(courseId: string): Promise<void> {
    const TeacherSupervisedCompletionWorkDataResponse =
      await apiClient.delete<void>(
        `${UNIDASH_API_ROUTES.teacherSupervisedCompletionWorkData.delete}${courseId}`
      );

    return TeacherSupervisedCompletionWorkDataResponse;
  }
}
