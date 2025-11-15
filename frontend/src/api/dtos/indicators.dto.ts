import { Validator } from "@unidash/utils/validator.util";
import z from "zod";
import { SEMESTER } from "./courseStudentsData.dto";

export const filterIndicatorsDtoSchema = z
  .object({
    yearFrom: Validator.validateYear(),
    yearTo: Validator.validateYear(),
    semester: z.enum(SEMESTER).nullable(),
  })
  .optional();

export type FilterIndicatorsDto = z.infer<typeof filterIndicatorsDtoSchema>;
