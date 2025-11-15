import z from "zod";
import { SEMESTER } from "./courseStudentsData.dto";
import { Validator } from "@unidash/utils/validator.util";

export const courseExtensionActivitiesDataDtoSchema = z.object({
  year: z
    .transform(Number)
    .pipe(z.number().int().min(0).max(new Date().getFullYear())),
  semester: z.enum(SEMESTER),
  specialProjects: z.transform(Number).pipe(z.number().int().min(0).max(1000)),
  participationInCompetitions: z
    .transform(Number)
    .pipe(z.number().int().min(0).max(1000)),
  entrepreneurshipAndInnovation: z
    .transform(Number)
    .pipe(z.number().int().min(0).max(1000)),
  eventOrganization: z
    .transform(Number)
    .pipe(z.number().int().min(0).max(1000)),
  externalInternship: z
    .transform(Number)
    .pipe(z.number().int().min(0).max(1000)),
  cultureAndExtensionProjects: z
    .transform(Number)
    .pipe(z.number().int().min(0).max(1000)),
  semiannualProjects: z
    .transform(Number)
    .pipe(z.number().int().min(0).max(1000)),
  workNonGovernmentalOrganization: z
    .transform(Number)
    .pipe(z.number().int().min(0).max(1000)),
  juniorCompanies: z.transform(Number).pipe(z.number().int().min(0).max(1000)),
  provisionOfServicesWithSelfEmployedWorkers: z
    .transform(Number)
    .pipe(z.number().int().min(0).max(1000)),
});

export type RegisterCourseExtensionActivitiesDataDto = z.infer<
  typeof courseExtensionActivitiesDataDtoSchema
>;

export type UpdateCourseExtensionActivitiesDataDto = z.infer<
  typeof courseExtensionActivitiesDataDtoSchema
>;

export const filterCourseExtensionActivitiesDataDtoSchema = z
  .object({
    year: Validator.validateOptionalYear(),
    semester: z.enum(SEMESTER).optional(),
  })
  .optional();

export type FilterCourseExtensionActivitiesDataDto = z.infer<
  typeof filterCourseExtensionActivitiesDataDtoSchema
>;
