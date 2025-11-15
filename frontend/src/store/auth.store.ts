import { AdminResponse } from "@unidash/api/responses/admin.response";
import { StudentResponse } from "@unidash/api/responses/student.response";
import { TeacherResponse } from "@unidash/api/responses/teacher.response";
import { create } from "zustand";

type Admin = AdminResponse["admin"];
type Teacher = TeacherResponse["teacher"];
type Student = StudentResponse["student"];

export type Session = Admin | Teacher | Student | null;

interface AuthStore {
  session: Session | null;
  teacherCourses: TeacherResponse["teacherCourses"];
  isAuthenticated: boolean;
  setSession: (
    session: Session | null,
    teacherCourses: TeacherResponse["teacherCourses"]
  ) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  session: null,
  teacherCourses: [],
  isAuthenticated: false,
  setSession: (user, teacherCourses) =>
    set({ session: user, teacherCourses, isAuthenticated: true }),
  clearSession: () => set({ session: null, isAuthenticated: false }),
}));
