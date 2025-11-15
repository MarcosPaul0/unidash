import { Session } from "@unidash/store/auth.store";
import { TeacherRole } from "./teacherCourse.response";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface SessionResponse {
  session: Session;
  teacherCourses: {
    id: string;
    teacherRole: TeacherRole;
    teacherId: string;
    courseId: string;
    createdAt: string;
    updatedAt: string;
  }[];
}
