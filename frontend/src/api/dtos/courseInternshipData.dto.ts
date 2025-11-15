import z from "zod";
import { SEMESTER } from "./courseStudentsData.dto";
import { Validator } from "@unidash/utils/validator.util";

export const EMPLOYMENT_TYPE = {
  employmentContract: "employmentContract",
  independentContractor: "independentContractor",
  internship: "internship",
} as const;

export type EmploymentType =
  (typeof EMPLOYMENT_TYPE)[keyof typeof EMPLOYMENT_TYPE];

export const courseInternshipDataDtoSchema = z.object({
  year: z
    .transform(Number)
    .pipe(z.number().int().min(0).max(new Date().getFullYear())),
  semester: z.enum(SEMESTER),
  studentMatriculation: z.string().min(10).max(10),
  enterpriseCnpj: z.string().min(14).max(14),
  role: z.string().min(1).max(60),
  conclusionTimeInDays: z
    .transform(Number)
    .pipe(z.number().int().min(0).max(1000)),
  employmentType: z.enum(EMPLOYMENT_TYPE),
  cityId: z.uuid(),
  advisorId: z.uuid(),
});

export type RegisterCourseInternshipDataDto = z.infer<
  typeof courseInternshipDataDtoSchema
>;

export type UpdateCourseInternshipDataDto = z.infer<
  typeof courseInternshipDataDtoSchema
>;

export const filterCourseInternshipDataDtoSchema = z
  .object({
    year: Validator.validateOptionalYear(),
    semester: z.enum(SEMESTER).optional(),
  })
  .optional();

export type FilterCourseInternshipDataDto = z.infer<
  typeof filterCourseInternshipDataDtoSchema
>;
