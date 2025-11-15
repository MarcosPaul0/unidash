import { UNIDASH_API_ROUTES } from "@unidash/routes/unidashApi.routes";
import { apiClient } from "@unidash/lib/apiClient";
import { IndicatorsParamsBuilder } from "./indicatorsParams.builder";
import {
  CourseActivitiesIndicatorsResponse,
  CourseCoordinationIndicatorsResponse,
  CourseIndicatorsResponse,
  CourseInternshipIndicatorsResponse,
  CourseStudentIncomingIndicatorsResponse,
  CourseTeacherProductionsIndicatorsResponse,
  CourseWorkCompletionIndicatorsResponse,
} from "@unidash/api/responses/indicators.response";
import { FilterIndicatorsDto } from "@unidash/api/dtos/indicators.dto";

export class IndicatorsCSService {
  static async getCoordinationIndicators(
    courseId: string,
    filters?: FilterIndicatorsDto
  ): Promise<CourseCoordinationIndicatorsResponse> {
    const params = new IndicatorsParamsBuilder().applyFilters(filters).build();

    const courseCoordinationIndicatorsResponse =
      await apiClient.get<CourseCoordinationIndicatorsResponse>(
        `${UNIDASH_API_ROUTES.indicators.getCoordinationIndicators}${courseId}`,
        {
          params,
        }
      );

    return courseCoordinationIndicatorsResponse;
  }

  static async getCourseIndicators(
    courseId: string,
    filters?: FilterIndicatorsDto
  ): Promise<CourseIndicatorsResponse> {
    const params = new IndicatorsParamsBuilder().applyFilters(filters).build();

    const courseCoordinationIndicatorsResponse =
      await apiClient.get<CourseIndicatorsResponse>(
        `${UNIDASH_API_ROUTES.indicators.getCourseIndicators}${courseId}`,
        {
          params,
        }
      );

    return courseCoordinationIndicatorsResponse;
  }

  static async getCompletionWorkIndicators(
    courseId: string,
    filters?: FilterIndicatorsDto
  ): Promise<CourseWorkCompletionIndicatorsResponse> {
    const params = new IndicatorsParamsBuilder().applyFilters(filters).build();

    const courseCoordinationIndicatorsResponse =
      await apiClient.get<CourseWorkCompletionIndicatorsResponse>(
        `${UNIDASH_API_ROUTES.indicators.getCompletionWorkIndicators}${courseId}`,
        {
          params,
        }
      );

    return courseCoordinationIndicatorsResponse;
  }

  static async getActivitiesIndicators(
    courseId: string,
    filters?: FilterIndicatorsDto
  ): Promise<CourseActivitiesIndicatorsResponse> {
    const params = new IndicatorsParamsBuilder().applyFilters(filters).build();

    const courseCoordinationIndicatorsResponse =
      await apiClient.get<CourseActivitiesIndicatorsResponse>(
        `${UNIDASH_API_ROUTES.indicators.getActivitiesIndicators}${courseId}`,
        {
          params,
        }
      );

    return courseCoordinationIndicatorsResponse;
  }

  static async getInternshipIndicators(
    courseId: string,
    filters?: FilterIndicatorsDto
  ): Promise<CourseInternshipIndicatorsResponse> {
    const params = new IndicatorsParamsBuilder().applyFilters(filters).build();

    const courseInternshipIndicatorsResponse =
      await apiClient.get<CourseInternshipIndicatorsResponse>(
        `${UNIDASH_API_ROUTES.indicators.getInternshipIndicators}${courseId}`,
        {
          params,
        }
      );

    return courseInternshipIndicatorsResponse;
  }

  static async getTeacherProductionsIndicators(
    courseId: string,
    filters?: FilterIndicatorsDto
  ): Promise<CourseTeacherProductionsIndicatorsResponse> {
    const params = new IndicatorsParamsBuilder().applyFilters(filters).build();

    const courseTeacherProductionsIndicatorsResponse =
      await apiClient.get<CourseTeacherProductionsIndicatorsResponse>(
        `${UNIDASH_API_ROUTES.indicators.getTeacherProductionsIndicators}${courseId}`,
        {
          params,
        }
      );

    return courseTeacherProductionsIndicatorsResponse;
  }

  static async getStudentIncomingIndicators(
    courseId: string,
    filters?: FilterIndicatorsDto
  ): Promise<CourseStudentIncomingIndicatorsResponse> {
    const params = new IndicatorsParamsBuilder().applyFilters(filters).build();

    const courseStudentIncomingIndicatorsResponse =
      await apiClient.get<CourseStudentIncomingIndicatorsResponse>(
        `${UNIDASH_API_ROUTES.indicators.getStudentIncomingIndicators}${courseId}`,
        {
          params,
        }
      );

    return courseStudentIncomingIndicatorsResponse;
  }
}
