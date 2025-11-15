import z from "zod";
import { SEMESTER } from "./courseStudentsData.dto";
import { Validator } from "@unidash/utils/validator.util";

export const courseExtensionComplementaryActivitiesDataDtoSchema = z.object({
  year: z
    .transform(Number)
    .pipe(z.number().int().min(0).max(new Date().getFullYear())),
  semester: z.enum(SEMESTER),
  culturalActivities: z
    .transform(Number)
    .pipe(z.number().int().min(0).max(1000)),
  sportsCompetitions: z
    .transform(Number)
    .pipe(z.number().int().min(0).max(1000)),
  awardsAtEvents: z.transform(Number).pipe(z.number().int().min(0).max(1000)),
  studentRepresentation: z
    .transform(Number)
    .pipe(z.number().int().min(0).max(1000)),
  participationInCollegiateBodies: z
    .transform(Number)
    .pipe(z.number().int().min(0).max(1000)),
});

export type RegisterCourseExtensionComplementaryActivitiesDataDto = z.infer<
  typeof courseExtensionComplementaryActivitiesDataDtoSchema
>;

export type UpdateCourseExtensionComplementaryActivitiesDataDto = z.infer<
  typeof courseExtensionComplementaryActivitiesDataDtoSchema
>;

export const filterCourseExtensionComplementaryActivitiesDataDtoSchema = z
  .object({
    year: Validator.validateOptionalYear(),
    semester: z.enum(SEMESTER).optional(),
  })
  .optional();

export type FilterCourseExtensionComplementaryActivitiesDataDto = z.infer<
  typeof filterCourseExtensionComplementaryActivitiesDataDtoSchema
>;
