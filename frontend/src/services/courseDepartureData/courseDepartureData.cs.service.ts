import { UNIDASH_API_ROUTES } from "@unidash/routes/unidashApi.routes";
import { apiClient } from "@unidash/lib/apiClient";
import {
  FilterCourseDepartureDataDto,
  RegisterCourseDepartureDataDto,
  UpdateCourseDepartureDataDto,
} from "@unidash/api/dtos/courseDepartureData.dto";
import { PaginationDto } from "@unidash/api/dtos/pagination.dto";
import { CourseDepartureDataParamsBuilder } from "./courseDepartureDataParams.builder";
import { CourseDepartureListDataResponse } from "@unidash/api/responses/courseDepartureDataResponse.interface";

export class CourseDepartureDataCSService {
  static async getAll(
    courseId: string,
    pagination?: PaginationDto,
    filters?: FilterCourseDepartureDataDto
  ): Promise<CourseDepartureListDataResponse> {
    const params = new CourseDepartureDataParamsBuilder()
      .applyPagination(pagination)
      .applyFilters(filters)
      .build();

    const courseDepartureDataResponse =
      await apiClient.get<CourseDepartureListDataResponse>(
        `${UNIDASH_API_ROUTES.courseDepartureData.getAll}${courseId}`,
        {
          params,
        }
      );

    return courseDepartureDataResponse;
  }

  static async register(
    courseId: string,
    registerCourseDepartureDataDto: RegisterCourseDepartureDataDto
  ): Promise<void> {
    const courseDepartureDataResponse = await apiClient.post<void>(
      UNIDASH_API_ROUTES.courseDepartureData.register,
      {
        courseId: courseId,
        year: registerCourseDepartureDataDto.year,
        semester: registerCourseDepartureDataDto.semester,
        completed: registerCourseDepartureDataDto.completed,
        maximumDuration: registerCourseDepartureDataDto.maximumDuration,
        dropouts: registerCourseDepartureDataDto.dropouts,
        transfers: registerCourseDepartureDataDto.transfers,
        withdrawals: registerCourseDepartureDataDto.withdrawals,
        removals: registerCourseDepartureDataDto.removals,
        newExams: registerCourseDepartureDataDto.newExams,
        deaths: registerCourseDepartureDataDto.deaths,
      }
    );

    return courseDepartureDataResponse;
  }

  static async update(
    courseDepartureDataId: string,
    updateCourseDepartureDataDto: UpdateCourseDepartureDataDto
  ): Promise<void> {
    const courseDepartureDataResponse = await apiClient.patch<void>(
      `${UNIDASH_API_ROUTES.courseDepartureData.update}${courseDepartureDataId}`,
      {
        year: updateCourseDepartureDataDto.year,
        semester: updateCourseDepartureDataDto.semester,
        completed: updateCourseDepartureDataDto.completed,
        maximumDuration: updateCourseDepartureDataDto.maximumDuration,
        dropouts: updateCourseDepartureDataDto.dropouts,
        transfers: updateCourseDepartureDataDto.transfers,
        withdrawals: updateCourseDepartureDataDto.withdrawals,
        removals: updateCourseDepartureDataDto.removals,
        newExams: updateCourseDepartureDataDto.newExams,
        deaths: updateCourseDepartureDataDto.deaths,
      }
    );

    return courseDepartureDataResponse;
  }

  static async delete(courseId: string): Promise<void> {
    const courseDepartureDataResponse = await apiClient.delete<void>(
      `${UNIDASH_API_ROUTES.courseDepartureData.delete}${courseId}`
    );

    return courseDepartureDataResponse;
  }
}
