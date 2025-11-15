import z from "zod";
import { SEMESTER } from "./courseStudentsData.dto";
import { Validator } from "@unidash/utils/validator.util";

export const courseDepartureDataDtoSchema = z.object({
  year: z
    .transform(Number)
    .pipe(z.number().int().min(0).max(new Date().getFullYear())),
  semester: z.enum(SEMESTER),
  completed: z.transform(Number).pipe(z.number().int().min(0).max(1000)),
  maximumDuration: z.transform(Number).pipe(z.number().int().min(0).max(1000)),
  dropouts: z.transform(Number).pipe(z.number().int().min(0).max(1000)),
  transfers: z.transform(Number).pipe(z.number().int().min(0).max(1000)),
  withdrawals: z.transform(Number).pipe(z.number().int().min(0).max(1000)),
  removals: z.transform(Number).pipe(z.number().int().min(0).max(1000)),
  newExams: z.transform(Number).pipe(z.number().int().min(0).max(1000)),
  deaths: z.transform(Number).pipe(z.number().int().min(0).max(1000)),
});

export type RegisterCourseDepartureDataDto = z.infer<
  typeof courseDepartureDataDtoSchema
>;

export type UpdateCourseDepartureDataDto = z.infer<
  typeof courseDepartureDataDtoSchema
>;

export const filterCourseDepartureDataDtoSchema = z
  .object({
    year: Validator.validateOptionalYear(),
    semester: z.enum(SEMESTER).optional(),
  })
  .optional();

export type FilterCourseDepartureDataDto = z.infer<
  typeof filterCourseDepartureDataDtoSchema
>;
