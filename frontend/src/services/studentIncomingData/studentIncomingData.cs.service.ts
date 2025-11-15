import { UNIDASH_API_ROUTES } from "@unidash/routes/unidashApi.routes";
import { apiClient } from "@unidash/lib/apiClient";
import { PaginationDto } from "@unidash/api/dtos/pagination.dto";
import { StudentIncomingDataParamsBuilder } from "./studentIncomingDataParams.builder";
import {
  FilterStudentIncomingDataDto,
  RegisterStudentIncomingDataDto,
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

    const StudentIncomingDataResponse =
      await apiClient.get<StudentIncomingDataResponse>(
        `${UNIDASH_API_ROUTES.studentIncomingData.getAll}${courseId}`,
        {
          params,
        }
      );

    return StudentIncomingDataResponse;
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
    const StudentIncomingDataResponse = await apiClient.post<void>(
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

    return StudentIncomingDataResponse;
  }

  static async delete(studentIncomingDataId: string): Promise<void> {
    const StudentIncomingDataResponse = await apiClient.delete<void>(
      `${UNIDASH_API_ROUTES.studentIncomingData.delete}${studentIncomingDataId}`
    );

    return StudentIncomingDataResponse;
  }
}
