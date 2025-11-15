import { UNIDASH_API_ROUTES } from "@unidash/routes/unidashApi.routes";
import { TeachersByCourseResponse } from "@unidash/api/responses/teacherCourse.response";
import {
  SetTeacherCourseDto,
  setTeacherCourseDtoSchema,
} from "@unidash/api/dtos/teacherCourse.dto";
import { apiClient } from "@unidash/lib/apiClient";

export class TeacherCourseCSService {
  static async setTeacherCourse(
    setTeacherCourseDto: SetTeacherCourseDto
  ): Promise<void> {
    const setTeacherCourse =
      setTeacherCourseDtoSchema.parse(setTeacherCourseDto);

    await apiClient.patch<TeachersByCourseResponse>(
      UNIDASH_API_ROUTES.teacherCourse.set,
      setTeacherCourse
    );
  }

  static async delete(teacherCourseId: string): Promise<void> {
    const teacherCourseResponse = await apiClient.delete<void>(
      `${UNIDASH_API_ROUTES.teacherCourse.delete}${teacherCourseId}`
    );

    return teacherCourseResponse;
  }
}
