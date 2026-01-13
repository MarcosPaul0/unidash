import z from "zod";
import { SEMESTER } from "./courseStudentsData.dto";
import { Validator } from "@unidash/utils/validator.util";

export const courseCoordinationDataDtoSchema = z.object({
  year: z
    .transform(Number)
    .pipe(z.number().int().min(0).max(new Date().getFullYear())),
  semester: z.enum(SEMESTER),
  servicesRequestsBySystem: z
    .transform(Number)
    .pipe(z.number().int().min(0).max(1000)),
  servicesRequestsByEmail: z
    .transform(Number)
    .pipe(z.number().int().min(0).max(1000)),
  resolutionActions: z
    .transform(Number)
    .pipe(z.number().int().min(0).max(1000)),
  administrativeDecisionActions: z
    .transform(Number)
    .pipe(z.number().int().min(0).max(1000)),
  meetingsByBoardOfDirectors: z
    .transform(Number)
    .pipe(z.number().int().min(0).max(1000)),
  meetingsByUndergraduateChamber: z
    .transform(Number)
    .pipe(z.number().int().min(0).max(1000)),
  meetingsByCourseCouncil: z
    .transform(Number)
    .pipe(z.number().int().min(0).max(1000)),
  meetingsByNde: z.transform(Number).pipe(z.number().int().min(0).max(1000)),
  academicActionPlans: z
    .string()
    .refine((value) => value.length === 0 || value.length >= 10, {
      message: "Deve conter no mínimo 10 caracteres",
    })
    .max(360)
    .optional(),
  administrativeActionPlans: z
    .string()
    .refine((value) => value.length === 0 || value.length >= 10, {
      message: "Deve conter no mínimo 10 caracteres",
    })
    .max(360)
    .optional(),
});

export type RegisterCourseCoordinationDataDto = z.infer<
  typeof courseCoordinationDataDtoSchema
>;

export type UpdateCourseCoordinationDataDto = z.infer<
  typeof courseCoordinationDataDtoSchema
>;

export const filterCourseCoordinationDataDtoSchema = z
  .object({
    year: Validator.validateYear(),
    yearFrom: Validator.validateYear(),
    yearTo: Validator.validateYear(),
    semester: z.enum(SEMESTER).nullable(),
  })
  .optional();

export type FilterCourseCoordinationDataDto = z.infer<
  typeof filterCourseCoordinationDataDtoSchema
>;
