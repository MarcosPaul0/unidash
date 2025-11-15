import {
  CourseResponse,
  CoursesResponse,
} from "@unidash/api/responses/course.response";
import { create } from "zustand";

interface CourseStore {
  courses: CoursesResponse["courses"];
  activeCourse: CourseResponse["course"] | null;
  setCourses: (courses: CoursesResponse["courses"]) => void;
  setActiveCourse: (course: CourseResponse["course"]) => void;
  clearActiveCourse: () => void;
}

export const useCourseStore = create<CourseStore>((set) => ({
  courses: [],
  activeCourse: null,
  setCourses: (courses: CoursesResponse["courses"]) => set({ courses }),
  setActiveCourse: (course) => set({ activeCourse: course }),
  clearActiveCourse: () => set({ activeCourse: null }),
}));
