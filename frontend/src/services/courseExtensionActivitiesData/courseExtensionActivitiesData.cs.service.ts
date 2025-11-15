import { UNIDASH_API_ROUTES } from "@unidash/routes/unidashApi.routes";
import { apiClient } from "@unidash/lib/apiClient";
import {
  FilterCourseExtensionActivitiesDataDto,
  RegisterCourseExtensionActivitiesDataDto,
  UpdateCourseExtensionActivitiesDataDto,
} from "@unidash/api/dtos/courseExtensionActivitiesData.dto";
import { PaginationDto } from "@unidash/api/dtos/pagination.dto";
import { CourseExtensionActivitiesDataParamsBuilder } from "./courseExtensionActivitiesDataParams.builder";
import { CourseExtensionActivitiesListDataResponse } from "@unidash/api/responses/courseExtensionActivitiesDataResponse.interface";

export class CourseExtensionActivitiesDataCSService {
  static async getAll(
    courseId: string,
    pagination?: PaginationDto,
    filters?: FilterCourseExtensionActivitiesDataDto
  ): Promise<CourseExtensionActivitiesListDataResponse> {
    const params = new CourseExtensionActivitiesDataParamsBuilder()
      .applyPagination(pagination)
      .applyFilters(filters)
      .build();

    const courseExtensionActivitiesDataResponse =
      await apiClient.get<CourseExtensionActivitiesListDataResponse>(
        `${UNIDASH_API_ROUTES.courseExtensionActivitiesData.getAll}${courseId}`,
        {
          params,
        }
      );

    return courseExtensionActivitiesDataResponse;
  }

  static async register(
    courseId: string,
    registerCourseExtensionActivitiesDataDto: RegisterCourseExtensionActivitiesDataDto
  ): Promise<void> {
    const courseExtensionActivitiesDataResponse = await apiClient.post<void>(
      UNIDASH_API_ROUTES.courseExtensionActivitiesData.register,
      {
        courseId: courseId,
        year: registerCourseExtensionActivitiesDataDto.year,
        semester: registerCourseExtensionActivitiesDataDto.semester,
        specialProjects:
          registerCourseExtensionActivitiesDataDto.specialProjects,
        participationInCompetitions:
          registerCourseExtensionActivitiesDataDto.participationInCompetitions,
        entrepreneurshipAndInnovation:
          registerCourseExtensionActivitiesDataDto.entrepreneurshipAndInnovation,
        eventOrganization:
          registerCourseExtensionActivitiesDataDto.eventOrganization,
        externalInternship:
          registerCourseExtensionActivitiesDataDto.externalInternship,
        cultureAndExtensionProjects:
          registerCourseExtensionActivitiesDataDto.cultureAndExtensionProjects,
        semiannualProjects:
          registerCourseExtensionActivitiesDataDto.semiannualProjects,
        workNonGovernmentalOrganization:
          registerCourseExtensionActivitiesDataDto.workNonGovernmentalOrganization,
        juniorCompanies:
          registerCourseExtensionActivitiesDataDto.juniorCompanies,
        provisionOfServicesWithSelfEmployedWorkers:
          registerCourseExtensionActivitiesDataDto.provisionOfServicesWithSelfEmployedWorkers,
      }
    );

    return courseExtensionActivitiesDataResponse;
  }

  static async update(
    courseExtensionActivitiesDataId: string,
    updateCourseExtensionActivitiesDataDto: UpdateCourseExtensionActivitiesDataDto
  ): Promise<void> {
    const courseExtensionActivitiesDataResponse = await apiClient.patch<void>(
      `${UNIDASH_API_ROUTES.courseExtensionActivitiesData.update}${courseExtensionActivitiesDataId}`,
      {
        year: updateCourseExtensionActivitiesDataDto.year,
        semester: updateCourseExtensionActivitiesDataDto.semester,
        specialProjects: updateCourseExtensionActivitiesDataDto.specialProjects,
        participationInCompetitions:
          updateCourseExtensionActivitiesDataDto.participationInCompetitions,
        entrepreneurshipAndInnovation:
          updateCourseExtensionActivitiesDataDto.entrepreneurshipAndInnovation,
        eventOrganization:
          updateCourseExtensionActivitiesDataDto.eventOrganization,
        externalInternship:
          updateCourseExtensionActivitiesDataDto.externalInternship,
        cultureAndExtensionProjects:
          updateCourseExtensionActivitiesDataDto.cultureAndExtensionProjects,
        semiannualProjects:
          updateCourseExtensionActivitiesDataDto.semiannualProjects,
        workNonGovernmentalOrganization:
          updateCourseExtensionActivitiesDataDto.workNonGovernmentalOrganization,
        juniorCompanies: updateCourseExtensionActivitiesDataDto.juniorCompanies,
        provisionOfServicesWithSelfEmployedWorkers:
          updateCourseExtensionActivitiesDataDto.provisionOfServicesWithSelfEmployedWorkers,
      }
    );

    return courseExtensionActivitiesDataResponse;
  }

  static async delete(courseId: string): Promise<void> {
    const courseExtensionActivitiesDataResponse = await apiClient.delete<void>(
      `${UNIDASH_API_ROUTES.courseExtensionActivitiesData.delete}${courseId}`
    );

    return courseExtensionActivitiesDataResponse;
  }
}
