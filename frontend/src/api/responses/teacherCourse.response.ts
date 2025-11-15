import { UserRole } from "./admin.response";

export const TEACHER_ROLE = {
  internshipManagerTeacher: "internshipManagerTeacher",
  courseManagerTeacher: "courseManagerTeacher",
  workCompletionManagerTeacher: "workCompletionManagerTeacher",
  complementaryActivitiesManagerTeacher:
    "complementaryActivitiesManagerTeacher",
  extensionsActivitiesManagerTeacher: "extensionsActivitiesManagerTeacher",
  normalTeacher: "normalTeacher",
} as const;

export type TeacherRole = (typeof TEACHER_ROLE)[keyof typeof TEACHER_ROLE];

export interface TeacherByCourseResponse {
  teacherCourses: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    isActive: string;
    accountActivatedAt: string;
    teacherRole: TeacherRole;
    teacherId: string;
    courseId: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface TeachersByCourseResponse {
  teacherCourses: TeacherByCourseResponse["teacherCourses"][];
  totalItems: number;
  totalPages: number;
}
