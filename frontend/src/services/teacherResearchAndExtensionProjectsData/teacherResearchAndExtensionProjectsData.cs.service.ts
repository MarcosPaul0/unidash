import { UNIDASH_API_ROUTES } from "@unidash/routes/unidashApi.routes";
import { apiClient } from "@unidash/lib/apiClient";
import { PaginationDto } from "@unidash/api/dtos/pagination.dto";
import { TeacherResearchAndExtensionProjectsDataParamsBuilder } from "./teacherResearchAndExtensionProjectsDataParams.builder";
import { TeacherResearchAndExtensionProjectsDataResponse } from "@unidash/api/responses/teacherResearchAndExtensionProjectsDataResponse.interface";
import {
  FilterTeacherResearchAndExtensionProjectsDataDto,
  RegisterTeacherResearchAndExtensionProjectsDataDto,
} from "@unidash/api/dtos/teacherResearchAndExtensionProjectsData.dto";

export class TeacherResearchAndExtensionProjectsDataCSService {
  static async getAll(
    courseId: string,
    pagination?: PaginationDto,
    filters?: FilterTeacherResearchAndExtensionProjectsDataDto
  ): Promise<TeacherResearchAndExtensionProjectsDataResponse> {
    const params = new TeacherResearchAndExtensionProjectsDataParamsBuilder()
      .applyPagination(pagination)
      .applyFilters(filters)
      .build();

    const teacherResearchAndExtensionProjectsDataResponse =
      await apiClient.get<TeacherResearchAndExtensionProjectsDataResponse>(
        `${UNIDASH_API_ROUTES.teacherResearchAndExtensionProjectsData.getAll}${courseId}`,
        {
          params,
        }
      );

    return teacherResearchAndExtensionProjectsDataResponse;
  }

  static async register(
    teacherId: string,
    registerTeacherResearchAndExtensionProjectsDataDto: RegisterTeacherResearchAndExtensionProjectsDataDto
  ): Promise<void> {
    const TeacherResearchAndExtensionProjectsDataResponse =
      await apiClient.post<void>(
        UNIDASH_API_ROUTES.teacherResearchAndExtensionProjectsData.register,
        {
          teacherId,
          year: registerTeacherResearchAndExtensionProjectsDataDto.year,
          semester: registerTeacherResearchAndExtensionProjectsDataDto.semester,
          extensionProjects:
            registerTeacherResearchAndExtensionProjectsDataDto.extensionProjects,
          researchProjects:
            registerTeacherResearchAndExtensionProjectsDataDto.researchProjects,
        }
      );

    return TeacherResearchAndExtensionProjectsDataResponse;
  }

  static async registerByTeacher(
    registerTeacherResearchAndExtensionProjectsDataDto: RegisterTeacherResearchAndExtensionProjectsDataDto
  ): Promise<void> {
    const TeacherResearchAndExtensionProjectsDataResponse =
      await apiClient.post<void>(
        UNIDASH_API_ROUTES.teacherResearchAndExtensionProjectsData
          .registerForTeacher,
        {
          year: registerTeacherResearchAndExtensionProjectsDataDto.year,
          semester: registerTeacherResearchAndExtensionProjectsDataDto.semester,
          extensionProjects:
            registerTeacherResearchAndExtensionProjectsDataDto.extensionProjects,
          researchProjects:
            registerTeacherResearchAndExtensionProjectsDataDto.researchProjects,
        }
      );

    return TeacherResearchAndExtensionProjectsDataResponse;
  }

  static async delete(courseId: string): Promise<void> {
    const TeacherResearchAndExtensionProjectsDataResponse =
      await apiClient.delete<void>(
        `${UNIDASH_API_ROUTES.teacherResearchAndExtensionProjectsData.delete}${courseId}`
      );

    return TeacherResearchAndExtensionProjectsDataResponse;
  }
}
