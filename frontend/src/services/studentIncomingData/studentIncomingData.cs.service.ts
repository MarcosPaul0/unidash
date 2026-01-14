import { UNIDASH_API_ROUTES } from "@unidash/routes/unidashApi.routes";
import { apiClient } from "@unidash/lib/apiClient";
import { PaginationDto } from "@unidash/api/dtos/pagination.dto";
import { StudentIncomingDataParamsBuilder } from "./studentIncomingDataParams.builder";
import {
  FilterStudentIncomingDataDto,
  RegisterStudentIncomingDataDto,
  RegisterStudentIncomingFromEmailDataDto,
} from "@unidash/api/dtos/studentIncomingData.dto";
import {
  CheckIncomingStudentRespondedResponse,
  StudentIncomingDataResponse,
} from "@unidash/api/responses/studentIncomingDataResponse.interface";

export class StudentIncomingDataCSService {
  static async getAll(
    courseId: string,
    pagination?: PaginationDto,
    filters?: FilterStudentIncomingDataDto
  ): Promise<StudentIncomingDataResponse> {
    const params = new StudentIncomingDataParamsBuilder()
      .applyPagination(pagination)
      .applyFilters(filters)
      .build();

    const studentIncomingDataResponse =
      await apiClient.get<StudentIncomingDataResponse>(
        `${UNIDASH_API_ROUTES.studentIncomingData.getAll}${courseId}`,
        {
          params,
        }
      );

    return studentIncomingDataResponse;
  }

  static async checkIncomingStudentResponded(): Promise<CheckIncomingStudentRespondedResponse> {
    const checkIncomingStudentRespondedResponse =
      await apiClient.get<CheckIncomingStudentRespondedResponse>(
        UNIDASH_API_ROUTES.studentIncomingData.checkResponded
      );

    return checkIncomingStudentRespondedResponse;
  }

  static async register(
    registerStudentIncomingDataDto: RegisterStudentIncomingDataDto
  ): Promise<void> {
    const studentIncomingDataResponse = await apiClient.post<void>(
      UNIDASH_API_ROUTES.studentIncomingData.register,
      {
        year: registerStudentIncomingDataDto.year,
        semester: registerStudentIncomingDataDto.semester,
        workExpectation: registerStudentIncomingDataDto.workExpectation,
        englishProficiencyLevel:
          registerStudentIncomingDataDto.englishProficiencyLevel,
        currentEducation: registerStudentIncomingDataDto.currentEducation,
        nocturnalPreference: registerStudentIncomingDataDto.nocturnalPreference,
        knowRelatedCourseDifference:
          registerStudentIncomingDataDto.knowRelatedCourseDifference,
        readPedagogicalProject:
          registerStudentIncomingDataDto.readPedagogicalProject,
        affinityByDisciplines:
          registerStudentIncomingDataDto.affinityByDisciplines,
        assets: registerStudentIncomingDataDto.assets,
        courseChoiceReasons: registerStudentIncomingDataDto.courseChoiceReasons,
        hobbyOrHabits: registerStudentIncomingDataDto.hobbyOrHabits,
        technologies: registerStudentIncomingDataDto.technologies,
        universityChoiceReasons:
          registerStudentIncomingDataDto.universityChoiceReasons,
        cityId: registerStudentIncomingDataDto.cityId,
      }
    );

    return studentIncomingDataResponse;
  }

  static async registerFromEmail(
    incomingStudentToken: string,
    registerStudentIncomingFromEmailDataDto: RegisterStudentIncomingFromEmailDataDto
  ): Promise<void> {
    const studentIncomingDataResponse = await apiClient.post<void>(
      `${UNIDASH_API_ROUTES.studentIncomingData.registerFromEmail}${incomingStudentToken}`,
      {
        workExpectation:
          registerStudentIncomingFromEmailDataDto.workExpectation,
        englishProficiencyLevel:
          registerStudentIncomingFromEmailDataDto.englishProficiencyLevel,
        currentEducation:
          registerStudentIncomingFromEmailDataDto.currentEducation,
        nocturnalPreference:
          registerStudentIncomingFromEmailDataDto.nocturnalPreference,
        knowRelatedCourseDifference:
          registerStudentIncomingFromEmailDataDto.knowRelatedCourseDifference,
        readPedagogicalProject:
          registerStudentIncomingFromEmailDataDto.readPedagogicalProject,
        affinityByDisciplines:
          registerStudentIncomingFromEmailDataDto.affinityByDisciplines,
        assets: registerStudentIncomingFromEmailDataDto.assets,
        courseChoiceReasons:
          registerStudentIncomingFromEmailDataDto.courseChoiceReasons,
        hobbyOrHabits: registerStudentIncomingFromEmailDataDto.hobbyOrHabits,
        technologies: registerStudentIncomingFromEmailDataDto.technologies,
        universityChoiceReasons:
          registerStudentIncomingFromEmailDataDto.universityChoiceReasons,
        cityId: registerStudentIncomingFromEmailDataDto.cityId,
      }
    );

    return studentIncomingDataResponse;
  }

  static async delete(studentIncomingDataId: string): Promise<void> {
    const studentIncomingDataResponse = await apiClient.delete<void>(
      `${UNIDASH_API_ROUTES.studentIncomingData.delete}${studentIncomingDataId}`
    );

    return studentIncomingDataResponse;
  }
}
