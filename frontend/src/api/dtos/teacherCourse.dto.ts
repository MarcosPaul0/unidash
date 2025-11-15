import { z } from "zod";
import { TEACHER_ROLE } from "../responses/teacherCourse.response";
export const setTeacherCourseDtoSchema = z.object({
  courseId: z.uuid(),
  teacherId: z.uuid(),
  teacherRole: z.enum(TEACHER_ROLE),
});

export type SetTeacherCourseDto = z.infer<typeof setTeacherCourseDtoSchema>;
