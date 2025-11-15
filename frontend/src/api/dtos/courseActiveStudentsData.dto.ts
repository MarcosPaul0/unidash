import { Validator } from "@unidash/utils/validator.util";
import z from "zod";
import { SEMESTER } from "./courseStudentsData.dto";

const courseActiveStudentsByIngressDataDtoSchema = z.object({
  ingressYear: z
    .transform(Number)
    .pipe(z.number().int().min(0).max(new Date().getFullYear())),
  numberOfStudents: z.transform(Number).pipe(z.number().int().min(0).max(1000)),
});

export const courseActiveStudentsDataDtoSchema = z.object({
  year: z
    .transform(Number)
    .pipe(z.number().int().min(0).max(new Date().getFullYear())),
  semester: z.enum(SEMESTER),
  activeStudentsByIngress: z.array(courseActiveStudentsByIngressDataDtoSchema),
});

export type RegisterCourseActiveStudentsDataDto = z.infer<
  typeof courseActiveStudentsDataDtoSchema
>;

export type UpdateCourseActiveStudentsDataDto = z.infer<
  typeof courseActiveStudentsDataDtoSchema
>;

export const filterCourseActiveStudentsDataDtoSchema = z
  .object({
    year: Validator.validateOptionalYear(),
    semester: z.enum(SEMESTER).optional(),
  })
  .optional();

export type FilterCourseActiveStudentsDataDto = z.infer<
  typeof filterCourseActiveStudentsDataDtoSchema
>;
