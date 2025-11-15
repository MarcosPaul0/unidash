import { UserRole } from "@unidash/api/responses/admin.response";
import { TeacherRole } from "@unidash/api/responses/teacherCourse.response";
import { useAuthStore } from "@unidash/store/auth.store";
import { useCourseStore } from "@unidash/store/course.store";

export function useCan(
  allowedRoles: UserRole[],
  allowedTeacherRoles?: TeacherRole[]
) {
  const { session, teacherCourses, isAuthenticated } = useAuthStore();
  const { activeCourse } = useCourseStore();

  if (!isAuthenticated) {
    return false;
  }

  const userRoleIsAllowed = allowedRoles.includes(session?.role as UserRole);

  if (!userRoleIsAllowed) {
    return false;
  }

  if (userRoleIsAllowed && session?.role === "admin") {
    return true;
  }

  const hasTeacherRolesToValidate = Boolean(
    allowedTeacherRoles && allowedTeacherRoles?.length > 0
  );

  if (!hasTeacherRolesToValidate) {
    return true;
  }

  if (!activeCourse) {
    return false;
  }

  const teacherCourse = teacherCourses.find(
    (currentTeacherCourse) => currentTeacherCourse.courseId === activeCourse.id
  );

  if (!teacherCourse) {
    return false;
  }

  const teacherRoleIsAllowed = allowedTeacherRoles!.includes(
    teacherCourse.teacherRole
  );

  return teacherRoleIsAllowed;
}
