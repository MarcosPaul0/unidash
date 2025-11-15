import z from "zod";
import { SEMESTER } from "./courseStudentsData.dto";
import { Validator } from "@unidash/utils/validator.util";

export const registerTeacherSupervisedCompletionWorkDataDtoSchema = z.object({
  year: z
    .transform(Number)
    .pipe(z.number().int().min(0).max(new Date().getFullYear())),
  semester: z.enum(SEMESTER),
  approved: z.transform(Number).pipe(z.number().int().min(0).max(1000)),
  failed: z.transform(Number).pipe(z.number().int().min(0).max(1000)),
});

export type RegisterTeacherSupervisedCompletionWorkDataDto = z.infer<
  typeof registerTeacherSupervisedCompletionWorkDataDtoSchema
>;

export const filterTeacherSupervisedCompletionWorkDataDtoSchema = z
  .object({
    year: Validator.validateOptionalYear(),
    semester: z.enum(SEMESTER).optional(),
  })
  .optional();

export type FilterTeacherSupervisedCompletionWorkDataDto = z.infer<
  typeof filterTeacherSupervisedCompletionWorkDataDtoSchema
>;
