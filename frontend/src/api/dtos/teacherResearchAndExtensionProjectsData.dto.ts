import z from "zod";
import { SEMESTER } from "./courseStudentsData.dto";
import { Validator } from "@unidash/utils/validator.util";

export const registerTeacherResearchAndExtensionProjectsDataDtoSchema =
  z.object({
    year: z
      .transform(Number)
      .pipe(z.number().int().min(0).max(new Date().getFullYear())),
    semester: z.enum(SEMESTER),
    extensionProjects: z
      .transform(Number)
      .pipe(z.number().int().min(0).max(1000)),
    researchProjects: z
      .transform(Number)
      .pipe(z.number().int().min(0).max(1000)),
  });

export type RegisterTeacherResearchAndExtensionProjectsDataDto = z.infer<
  typeof registerTeacherResearchAndExtensionProjectsDataDtoSchema
>;

export const filterTeacherResearchAndExtensionProjectsDataDtoSchema = z
  .object({
    year: Validator.validateOptionalYear(),
    semester: z.enum(SEMESTER).optional(),
  })
  .optional();

export type FilterTeacherResearchAndExtensionProjectsDataDto = z.infer<
  typeof filterTeacherResearchAndExtensionProjectsDataDtoSchema
>;
