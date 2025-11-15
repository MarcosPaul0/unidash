import z from "zod";
import { SEMESTER } from "./courseStudentsData.dto";
import { Validator } from "@unidash/utils/validator.util";

export const courseCompletionWorkDataDtoSchema = z.object({
  year: z
    .transform(Number)
    .pipe(z.number().int().min(0).max(new Date().getFullYear())),
  semester: z.enum(SEMESTER),
  enrollments: z.transform(Number).pipe(z.number().int().min(0).max(1000)),
  defenses: z.transform(Number).pipe(z.number().int().min(0).max(1000)),
  abandonments: z.transform(Number).pipe(z.number().int().min(0).max(1000)),
});

export type RegisterCourseCompletionWorkDataDto = z.infer<
  typeof courseCompletionWorkDataDtoSchema
>;

export type UpdateCourseCompletionWorkDataDto = z.infer<
  typeof courseCompletionWorkDataDtoSchema
>;

export const filterCourseCompletionWorkDataDtoSchema = z
  .object({
    year: Validator.validateOptionalYear(),
    semester: z.enum(SEMESTER).optional(),
  })
  .optional();

export type FilterCourseCompletionWorkDataDto = z.infer<
  typeof filterCourseCompletionWorkDataDtoSchema
>;
