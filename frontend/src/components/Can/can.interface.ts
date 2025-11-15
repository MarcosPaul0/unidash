import { UserRole } from "@unidash/api/responses/admin.response";
import { TeacherRole } from "@unidash/api/responses/teacherCourse.response";
import { ReactNode } from "react";

export interface CanProps {
  allowedRoles: UserRole[];
  allowedTeacherRoles?: TeacherRole[];
  children: ReactNode;
}
