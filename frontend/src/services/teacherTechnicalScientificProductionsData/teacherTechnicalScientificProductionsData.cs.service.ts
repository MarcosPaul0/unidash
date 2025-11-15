import { UNIDASH_API_ROUTES } from "@unidash/routes/unidashApi.routes";
import { apiClient } from "@unidash/lib/apiClient";
import { PaginationDto } from "@unidash/api/dtos/pagination.dto";
import { TeacherTechnicalScientificProductionsDataParamsBuilder } from "./teacherTechnicalScientificProductionsDataParams.builder";
import { TeacherTechnicalScientificProductionsDataResponse } from "@unidash/api/responses/teacherTechnicalScientificProductionsDataResponse.interface";
import {
  FilterTeacherTechnicalScientificProductionsDataDto,
  RegisterTeacherTechnicalScientificProductionsDataDto,
} from "@unidash/api/dtos/teacherTechnicalScientificProductionsData.dto";

export class TeacherTechnicalScientificProductionsDataCSService {
  static async getAll(
    courseId: string,
    pagination?: PaginationDto,
    filters?: FilterTeacherTechnicalScientificProductionsDataDto
  ): Promise<TeacherTechnicalScientificProductionsDataResponse> {
    const params = new TeacherTechnicalScientificProductionsDataParamsBuilder()
      .applyPagination(pagination)
      .applyFilters(filters)
      .build();

    const teacherTechnicalScientificProductionsDataResponse =
      await apiClient.get<TeacherTechnicalScientificProductionsDataResponse>(
        `${UNIDASH_API_ROUTES.teacherTechnicalScientificProductionsData.getAll}${courseId}`,
        {
          params,
        }
      );

    return teacherTechnicalScientificProductionsDataResponse;
  }

  static async register(
    teacherId: string,
    registerTeacherTechnicalScientificProductionsDataDto: RegisterTeacherTechnicalScientificProductionsDataDto
  ): Promise<void> {
    const TeacherTechnicalScientificProductionsDataResponse =
      await apiClient.post<void>(
        UNIDASH_API_ROUTES.teacherTechnicalScientificProductionsData.register,
        {
          teacherId,
          year: registerTeacherTechnicalScientificProductionsDataDto.year,
          semester:
            registerTeacherTechnicalScientificProductionsDataDto.semester,
          periodicals:
            registerTeacherTechnicalScientificProductionsDataDto.periodicals,
          congress:
            registerTeacherTechnicalScientificProductionsDataDto.congress,
          booksChapter:
            registerTeacherTechnicalScientificProductionsDataDto.booksChapter,
          programs:
            registerTeacherTechnicalScientificProductionsDataDto.programs,
          abstracts:
            registerTeacherTechnicalScientificProductionsDataDto.abstracts,
        }
      );

    return TeacherTechnicalScientificProductionsDataResponse;
  }

  static async registerByTeacher(
    registerTeacherTechnicalScientificProductionsDataDto: RegisterTeacherTechnicalScientificProductionsDataDto
  ): Promise<void> {
    const TeacherTechnicalScientificProductionsDataResponse =
      await apiClient.post<void>(
        UNIDASH_API_ROUTES.teacherTechnicalScientificProductionsData
          .registerForTeacher,
        {
          year: registerTeacherTechnicalScientificProductionsDataDto.year,
          semester:
            registerTeacherTechnicalScientificProductionsDataDto.semester,
          periodicals:
            registerTeacherTechnicalScientificProductionsDataDto.periodicals,
          congress:
            registerTeacherTechnicalScientificProductionsDataDto.congress,
          booksChapter:
            registerTeacherTechnicalScientificProductionsDataDto.booksChapter,
          programs:
            registerTeacherTechnicalScientificProductionsDataDto.programs,
          abstracts:
            registerTeacherTechnicalScientificProductionsDataDto.abstracts,
        }
      );

    return TeacherTechnicalScientificProductionsDataResponse;
  }

  static async delete(courseId: string): Promise<void> {
    const TeacherTechnicalScientificProductionsDataResponse =
      await apiClient.delete<void>(
        `${UNIDASH_API_ROUTES.teacherTechnicalScientificProductionsData.delete}${courseId}`
      );

    return TeacherTechnicalScientificProductionsDataResponse;
  }
}
