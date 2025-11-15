import { UNIDASH_API_ROUTES } from "@unidash/routes/unidashApi.routes";
import {
  TeacherResponse,
  TeachersResponse,
} from "../../api/responses/teacher.response";
import { createApiSSRClient } from "@unidash/lib/apiClientSSR";
import { PaginationDto } from "@unidash/api/dtos/pagination.dto";
import {
  FilterTeachersDto,
  filterTeachersDtoSchema,
} from "@unidash/api/dtos/teacher.dto";
import { TeacherParamsBuilder } from "./teacherParams.builder";
import { redirect } from "next/navigation";
import { APP_ROUTES } from "@unidash/routes/app.routes";

export class TeacherSSRService {
  static async getBySession(): Promise<TeacherResponse> {
    const ssrApiClient = await createApiSSRClient();

    const teacherResponse = await ssrApiClient.get<TeacherResponse>(
      UNIDASH_API_ROUTES.teacher.getBySession
    );

    return teacherResponse;
  }

  static async getAll(
    pagination?: PaginationDto,
    filters?: FilterTeachersDto
  ): Promise<TeachersResponse> {
    const validatedFilters = filterTeachersDtoSchema.parse(filters);

    const params = new TeacherParamsBuilder()
      .applyPagination(pagination)
      .applyFilters(validatedFilters)
      .build();

    const ssrApiClient = await createApiSSRClient();

    const teacherResponse = await ssrApiClient.get<TeachersResponse>(
      UNIDASH_API_ROUTES.teacher.getAll,
      {
        params,
      }
    );

    if (teacherResponse === null) {
      redirect(APP_ROUTES.private.dashboard);
    }

    return teacherResponse;
  }

  static async getById(teacherId: string): Promise<TeacherResponse> {
    const ssrApiClient = await createApiSSRClient();

    const teacherResponse = await ssrApiClient.get<TeacherResponse>(
      `${UNIDASH_API_ROUTES.teacher.getById}${teacherId}`
    );

    if (teacherResponse === null) {
      redirect(APP_ROUTES.private.dashboard);
    }

    return teacherResponse;
  }
}
