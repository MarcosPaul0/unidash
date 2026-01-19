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
    const studentResponse = await apiClient.post<void>(
      UNIDASH_API_ROUTES.student.register,
      {
        name: registerStudentDto.name,
        email: registerStudentDto.email,
        matriculation: registerStudentDto.matriculation,
        type: registerStudentDto.type,
        courseId,
      }
    );

    return studentResponse;
  }

  static async update(
    studentId: string,
    updateStudentDto: UpdateStudentDto
  ): Promise<void> {
    const studentResponse = await apiClient.patch<void>(
      `${UNIDASH_API_ROUTES.student.update}${studentId}`,
      {
        name: updateStudentDto.name,
        matriculation: updateStudentDto.matriculation,
        type: updateStudentDto.type,
      }
    );

    return studentResponse;
  }

  static async delete(studentId: string): Promise<void> {
    const studentResponse = await apiClient.delete<void>(
      `${UNIDASH_API_ROUTES.student.delete}${studentId}`
    );

    return studentResponse;
  }

  static async uploadIncomingStudentsPdf(
    incomingStudentsDto: FormData,
    onUploadProgress: (progress: number) => void
  ): Promise<void> {
    const studentsResponse = await apiClient.upload<void>(
      UNIDASH_API_ROUTES.student.uploadIncomingStudentsPdf,
      incomingStudentsDto,
      onUploadProgress
    );

    return studentsResponse;
  }
}
