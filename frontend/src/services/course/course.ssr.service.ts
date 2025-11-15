import { UNIDASH_API_ROUTES } from "@unidash/routes/unidashApi.routes";
import { createApiSSRClient } from "@unidash/lib/apiClientSSR";
import { CourseParamsBuilder } from "./courseParams.builder";
import {
  FilterCoursesDto,
  filterCoursesDtoSchema,
} from "@unidash/api/dtos/course.dto";
import {
  CourseResponse,
  CoursesResponse,
} from "@unidash/api/responses/course.response";

export class CourseSSRService {
  static async getAll(filters?: FilterCoursesDto): Promise<CoursesResponse> {
    const validatedFilters = filterCoursesDtoSchema.parse(filters);

    const params = new CourseParamsBuilder()
      .applyFilters(validatedFilters)
      .build();

    const ssrApiClient = await createApiSSRClient();

    const coursesResponse = await ssrApiClient.get<CoursesResponse>(
      UNIDASH_API_ROUTES.course.getAll,
      {
        params,
      }
    );

    return coursesResponse;
  }

  static async getById(id: string): Promise<CourseResponse> {
    const ssrApiClient = await createApiSSRClient();

    const courseResponse = await ssrApiClient.get<CourseResponse>(
      `${UNIDASH_API_ROUTES.course.getById}${id}`
    );

    return courseResponse;
  }
}
