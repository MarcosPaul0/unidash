import z from "zod";
import { SEMESTER } from "./courseStudentsData.dto";
import { Validator } from "@unidash/utils/validator.util";

export const courseTeacherWorkloadDataDtoSchema = z.object({
  year: z
    .transform(Number)
    .pipe(z.number().int().min(0).max(new Date().getFullYear())),
  semester: z.enum(SEMESTER),
  teacherId: z.uuid(),
  workloadInHours: z.transform(Number).pipe(z.number().int().min(0).max(10000)),
});

export type RegisterCourseTeacherWorkloadDataDto = z.infer<
  typeof courseTeacherWorkloadDataDtoSchema
>;

export type UpdateCourseTeacherWorkloadDataDto = z.infer<
  typeof courseTeacherWorkloadDataDtoSchema
>;

export const filterCourseTeacherWorkloadDataDtoSchema = z
  .object({
    year: Validator.validateOptionalYear(),
    semester: z.enum(SEMESTER).optional(),
  })
  .optional();

export type FilterCourseTeacherWorkloadDataDto = z.infer<
  typeof filterCourseTeacherWorkloadDataDtoSchema
>;
