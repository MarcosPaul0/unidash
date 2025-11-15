import { AuthDto } from "@unidash/api/dtos/auth.dto";
import { USER_ROLE, UserRole } from "@unidash/api/responses/admin.response";
import { AuthResponse } from "@unidash/api/responses/auth.response";
import { apiClient } from "@unidash/lib/apiClient";
import { UNIDASH_API_ROUTES } from "@unidash/routes/unidashApi.routes";
import { Session } from "@unidash/store/auth.store";
import { AdminSSRService } from "../admin/admin.ssr.service";
import { StudentSSRService } from "../student/student.ssr.service";
import { TeacherSSRService } from "../teacher/teacher.ssr.service";

export class AuthSSRService {
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

  static async getSessionByRole(role: UserRole): Promise<Session> {
    const SSR_SESSION = {
      [USER_ROLE.admin]: async () => {
        const adminResponse = await AdminSSRService.getBySession();

        return adminResponse.admin;
      },
      [USER_ROLE.student]: async () => {
        const studentResponse = await StudentSSRService.getBySession();

        return studentResponse.student;
      },
      [USER_ROLE.teacher]: async () => {
        const teacherResponse = await TeacherSSRService.getBySession();

        return teacherResponse.teacher;
      },
    };

    const user: Session = await SSR_SESSION[role]();

    return user;
  }
}
