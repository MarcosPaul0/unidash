import { AuthDto } from "@unidash/api/dtos/auth.dto";
import { USER_ROLE, UserRole } from "@unidash/api/responses/admin.response";
import {
  AuthResponse,
  SessionResponse,
} from "@unidash/api/responses/auth.response";
import { apiClient } from "@unidash/lib/apiClient";
import { UNIDASH_API_ROUTES } from "@unidash/routes/unidashApi.routes";
import { AdminCSService } from "../admin/admin.cs.service";
import { StudentCSService } from "../student/student.cs.service";
import { TeacherCSService } from "../teacher/teacher.cs.service";

export class AuthCSService {
  static async auth(authenticateDto: AuthDto): Promise<AuthResponse> {
    const authResponse = await apiClient.post<AuthResponse>(
      UNIDASH_API_ROUTES.auth.login,
      authenticateDto
    );

    return authResponse;
  }

  static async validateSession(): Promise<void> {
    await apiClient.get(UNIDASH_API_ROUTES.auth.validateSession);
  }

  static async getSessionByRole(role: UserRole): Promise<SessionResponse> {
    if (role === USER_ROLE.teacher) {
      const teacherResponse = await TeacherCSService.getBySession();

      return {
        session: teacherResponse.teacher,
        teacherCourses: teacherResponse.teacherCourses,
      };
    }

    if (role === USER_ROLE.student) {
      const studentResponse = await StudentCSService.getBySession();

      return {
        session: studentResponse.student,
        teacherCourses: [],
      };
    }

    if (role === USER_ROLE.admin) {
      const adminResponse = await AdminCSService.getBySession();

      return {
        session: adminResponse.admin,
        teacherCourses: [],
      };
    }

    return {
      session: null,
      teacherCourses: [],
    };
  }
}
