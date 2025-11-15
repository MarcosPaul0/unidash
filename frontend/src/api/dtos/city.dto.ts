import z from "zod";

export const filterCityDtoSchema = z
  .object({
    name: z.string().min(2).max(200).optional(),
  })
  .optional();

export type FilterCityDto = z.infer<typeof filterCityDtoSchema>;
