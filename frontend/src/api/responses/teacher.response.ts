import { UserRole } from "./admin.response";
import { SessionResponse } from "./auth.response";

export interface TeacherResponse {
  teacher: {
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    accountActivatedAt?: string | null;
    createdAt: string;
    updatedAt?: string | null;
    isActive: boolean;
  };
  teacherCourses: SessionResponse["teacherCourses"];
}

export interface TeachersResponse {
  teachers: TeacherResponse["teacher"][];
  totalItems: number;
  totalPages: number;
}
