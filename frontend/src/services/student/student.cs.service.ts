import {
  RegisterStudentDto,
  UpdateStudentDto,
} from "@unidash/api/dtos/student.dto";
import { StudentResponse } from "@unidash/api/responses/student.response";
import { apiClient } from "@unidash/lib/apiClient";
import { UNIDASH_API_ROUTES } from "@unidash/routes/unidashApi.routes";

export class StudentCSService {
  static async getBySession(): Promise<StudentResponse> {
    const studentResponse = await apiClient.get<StudentResponse>(
      UNIDASH_API_ROUTES.student.getBySession
    );

    return studentResponse;
  }

  static async register(
    courseId: string,
    registerStudentDto: RegisterStudentDto
  ): Promise<void> {
    const courseResponse = await apiClient.post<void>(
      UNIDASH_API_ROUTES.student.register,
      {
        name: registerStudentDto.name,
        email: registerStudentDto.email,
        matriculation: registerStudentDto.matriculation,
        password: registerStudentDto.password,
        type: registerStudentDto.type,
        courseId,
      }
    );

    return courseResponse;
  }

  static async update(
    studentId: string,
    updateStudentDto: UpdateStudentDto
  ): Promise<void> {
    const courseResponse = await apiClient.patch<void>(
      `${UNIDASH_API_ROUTES.student.update}${studentId}`,
      {
        name: updateStudentDto.name,
        matriculation: updateStudentDto.matriculation,
        type: updateStudentDto.type,
      }
    );

    return courseResponse;
  }

  static async delete(studentId: string): Promise<void> {
    const courseResponse = await apiClient.delete<void>(
      `${UNIDASH_API_ROUTES.student.delete}${studentId}`
    );

    return courseResponse;
  }
}
