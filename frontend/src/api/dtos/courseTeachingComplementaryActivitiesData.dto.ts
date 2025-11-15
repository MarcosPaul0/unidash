import z from "zod";
import { SEMESTER } from "./courseStudentsData.dto";
import { Validator } from "@unidash/utils/validator.util";

export const courseTeachingComplementaryActivitiesDataDtoSchema = z.object({
  year: z
    .transform(Number)
    .pipe(z.number().int().min(0).max(new Date().getFullYear())),
  semester: z.enum(SEMESTER),
  subjectMonitoring: z
    .transform(Number)
    .pipe(z.number().int().min(0).max(1000)),
  sponsorshipOfNewStudents: z
    .transform(Number)
    .pipe(z.number().int().min(0).max(1000)),
  providingTraining: z
    .transform(Number)
    .pipe(z.number().int().min(0).max(1000)),
  coursesInTheArea: z.transform(Number).pipe(z.number().int().min(0).max(1000)),
  coursesOutsideTheArea: z
    .transform(Number)
    .pipe(z.number().int().min(0).max(1000)),
  electivesDisciplines: z
    .transform(Number)
    .pipe(z.number().int().min(0).max(1000)),
  complementaryCoursesInTheArea: z
    .transform(Number)
    .pipe(z.number().int().min(0).max(1000)),
  preparationForTest: z
    .transform(Number)
    .pipe(z.number().int().min(0).max(1000)),
});

export type RegisterCourseTeachingComplementaryActivitiesDataDto = z.infer<
  typeof courseTeachingComplementaryActivitiesDataDtoSchema
>;

export type UpdateCourseTeachingComplementaryActivitiesDataDto = z.infer<
  typeof courseTeachingComplementaryActivitiesDataDtoSchema
>;

export const filterCourseTeachingComplementaryActivitiesDataDtoSchema = z
  .object({
    year: Validator.validateOptionalYear(),
    semester: z.enum(SEMESTER).optional(),
  })
  .optional();

export type FilterCourseTeachingComplementaryActivitiesDataDto = z.infer<
  typeof filterCourseTeachingComplementaryActivitiesDataDtoSchema
>;
