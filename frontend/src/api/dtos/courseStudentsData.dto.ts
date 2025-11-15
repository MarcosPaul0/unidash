import { Validator } from "@unidash/utils/validator.util";
import z from "zod";

export const SEMESTER = {
  first: "first",
  second: "second",
} as const;

export type Semester = (typeof SEMESTER)[keyof typeof SEMESTER];

export const courseStudentsDataDtoSchema = z.object({
  year: z
    .transform(Number)
    .pipe(z.number().int().min(0).max(new Date().getFullYear())),
  semester: z.enum(SEMESTER),
  entrants: z.transform(Number).pipe(z.number().int().min(0).max(1000)),
  vacancies: z.transform(Number).pipe(z.number().int().min(0).max(1000)),
  subscribers: z.transform(Number).pipe(z.number().int().min(0).max(1000)),
});

export type RegisterCourseStudentsDataDto = z.infer<
  typeof courseStudentsDataDtoSchema
>;

export type UpdateCourseStudentsDataDto = z.infer<
  typeof courseStudentsDataDtoSchema
>;

export const filterCourseStudentsDataDtoSchema = z
  .object({
    year: Validator.validateOptionalYear(),
    semester: z.enum(SEMESTER).optional(),
  })
  .optional();

export type FilterCourseStudentsDataDto = z.infer<
  typeof filterCourseStudentsDataDtoSchema
>;
