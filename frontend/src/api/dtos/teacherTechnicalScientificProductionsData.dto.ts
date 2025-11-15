import z from "zod";
import { SEMESTER } from "./courseStudentsData.dto";
import { Validator } from "@unidash/utils/validator.util";

export const registerTeacherTechnicalScientificProductionsDataDtoSchema =
  z.object({
    year: z
      .transform(Number)
      .pipe(z.number().int().min(0).max(new Date().getFullYear())),
    semester: z.enum(SEMESTER),
    periodicals: z.transform(Number).pipe(z.number().int().min(0).max(1000)),
    congress: z.transform(Number).pipe(z.number().int().min(0).max(1000)),
    booksChapter: z.transform(Number).pipe(z.number().int().min(0).max(1000)),
    programs: z.transform(Number).pipe(z.number().int().min(0).max(1000)),
    abstracts: z.transform(Number).pipe(z.number().int().min(0).max(1000)),
  });

export type RegisterTeacherTechnicalScientificProductionsDataDto = z.infer<
  typeof registerTeacherTechnicalScientificProductionsDataDtoSchema
>;

export const filterTeacherTechnicalScientificProductionsDataDtoSchema = z
  .object({
    year: Validator.validateOptionalYear(),
    semester: z.enum(SEMESTER).optional(),
  })
  .optional();

export type FilterTeacherTechnicalScientificProductionsDataDto = z.infer<
  typeof filterTeacherTechnicalScientificProductionsDataDtoSchema
>;
